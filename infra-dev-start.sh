#!/bin/bash

# Simplified development environment starter script for Realista project
# This script starts frontend, backend, and database without opening IDEs

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Realista Services (Frontend + Backend + Database)...${NC}\n"

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

# Start Frontend
echo -e "${GREEN}📦 Starting Frontend (npm run dev)...${NC}"
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!
echo -e "Frontend started with PID: $FRONTEND_PID\n"

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

echo -e "\n${BLUE}✅ All services started!${NC}"
echo -e "${BLUE}Frontend PID: $FRONTEND_PID${NC}"
echo -e "${BLUE}Backend PID: $BACKEND_PID${NC}"
echo -e "${BLUE}Database: Running in Docker${NC}"
echo -e "\n${BLUE}To stop all services, run:${NC}"
echo -e "./stop-dev.sh"
echo -e "\n${BLUE}Or press Ctrl+C to stop (then run ./stop-dev.sh to clean up Docker)${NC}"

# Save PIDs to a file for easy cleanup
echo "$FRONTEND_PID" > "$SCRIPT_DIR/.dev-pids"
echo "$BACKEND_PID" >> "$SCRIPT_DIR/.dev-pids"

# Wait for user interrupt
trap "echo -e '\n${BLUE}Shutting down...${NC}'; kill $FRONTEND_PID $BACKEND_PID 2>/dev/null; exit" INT TERM

# Keep script running
wait
