import { auth } from "../../auth";

/**
 * Make an authenticated API request to the backend.
 * Automatically includes Authorization header with JWT token.
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = await auth();

  if (!session?.user?.backendToken) {
    throw new Error("No authentication token available");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${session.user.backendToken}`,
    "Content-Type": "application/json",
  };

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}${endpoint}`, {
    ...options,
    headers,
  });
}

/**
 * Get the current user's backend token from session.
 * Use this in client components.
 */
export function getAuthToken(session: any): string | null {
  return session?.user?.backendToken || null;
}
