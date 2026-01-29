import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        // Use the login endpoint to verify credentials
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!response.ok) {
          // Invalid credentials
          throw new Error("Invalid credentials.");
        }

        const authData = await response.json();

        if (!authData || !authData.token) {
          throw new Error("Invalid credentials.");
        }
        
        // Return user object with backend token
        return {
          id: authData.userId.toString(),
          email: authData.email,
          token: authData.token,
          userId: authData.userId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // On initial sign-in, fetch backend JWT token
      if (account && user) {
        try {
          if (account.provider === "google") {
            // Google OAuth - call alignUser
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API}/alignUser`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  googleId: account.providerAccountId,
                  email: user.email,
                  name: user.name,
                  profileImageUrl: user.image,
                }),
              }
            );
            if (response.ok) {
              const authData = await response.json();
              token.backendToken = authData.token;
              token.userId = authData.userId;
            }
          } else if (account.provider === "credentials") {
            // Credentials login - token already received in authorize
            token.backendToken = user.token;
            token.userId = user.userId;
          }
        } catch (error) {
          console.error("Error fetching backend token:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.backendToken = token.backendToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/profile";
    },
  },
});
