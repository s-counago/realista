#!/bin/bash

# Development environment starter script for Realista project
# This script starts both frontend and backend services

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Realista Development Environment...${NC}\n"

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
BACKEND_DIR="$SCRIPT_DIR/backend"

# Check if directories exist
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}Error: frontend/ directory not found!${NC}"
    exit 1
fi

if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}Error: backend/ directory not found!${NC}"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Start Frontend
echo -e "${GREEN}📦 Starting Frontend (npm run dev)...${NC}"
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!
echo -e "Frontend started with PID: $FRONTEND_PID\n"

# Open VS Code in frontend directory
if command_exists code; then
    echo -e "${GREEN}💻 Opening VS Code in frontend/...${NC}"
    code . &
else
    echo -e "${RED}Warning: VS Code (code) not found in PATH${NC}"
fi

# Start Docker Compose (Database)
echo -e "${GREEN}🐳 Starting Docker Compose (Database)...${NC}"
cd "$BACKEND_DIR"
docker compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to start Docker Compose${NC}"
    kill $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}⏳ Waiting for database to be ready...${NC}"
# Wait for the database to be healthy (adjust timeout as needed)
TIMEOUT=60
ELAPSED=0
while [ $ELAPSED -lt $TIMEOUT ]; do
    # Check if all containers are healthy or running
    if docker compose ps | grep -q "Up"; then
        echo -e "${GREEN}✅ Database is ready!${NC}\n"
        sleep 2  # Give it a couple more seconds to be fully ready
        break
    fi
    sleep 2
    ELAPSED=$((ELAPSED + 2))
    echo -n "."
done

if [ $ELAPSED -ge $TIMEOUT ]; then
    echo -e "\n${RED}Warning: Database health check timed out. Proceeding anyway...${NC}\n"
fi

# Start Backend
echo -e "${GREEN}☕ Starting Backend (Spring Boot)...${NC}"
./mvnw spring-boot:run &
BACKEND_PID=$!
echo -e "Backend started with PID: $BACKEND_PID\n"

# Open IntelliJ IDEA
echo -e "${GREEN}🧠 Opening IntelliJ IDEA...${NC}"
if command_exists idea; then
    idea "$BACKEND_DIR" &
elif command_exists intellij-idea-community; then
    intellij-idea-community "$BACKEND_DIR" &
elif command_exists intellij; then
    intellij "$BACKEND_DIR" &
elif [ -d "/Applications/IntelliJ IDEA.app" ]; then
    # macOS
    open -a "IntelliJ IDEA" "$BACKEND_DIR" &
elif [ -f "/usr/local/bin/idea.sh" ]; then
    /usr/local/bin/idea.sh "$BACKEND_DIR" &
else
    echo -e "${RED}Warning: IntelliJ IDEA not found. Please open it manually.${NC}"
fi

echo -e "\n${BLUE}✅ Development environment started!${NC}"
echo -e "${BLUE}Frontend PID: $FRONTEND_PID${NC}"
echo -e "${BLUE}Backend PID: $BACKEND_PID${NC}"
echo -e "\n${BLUE}To stop all processes, run:${NC}"
echo -e "kill $FRONTEND_PID $BACKEND_PID"
echo -e "\n${BLUE}Or press Ctrl+C and run:${NC}"
echo -e "./stop-dev.sh"

# Save PIDs to a file for easy cleanup
echo "$FRONTEND_PID" > "$SCRIPT_DIR/.dev-pids"
echo "$BACKEND_PID" >> "$SCRIPT_DIR/.dev-pids"

# Wait for user interrupt
trap "echo -e '\n${BLUE}Shutting down...${NC}'; kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; exit" INT TERM

# Keep script running
wait