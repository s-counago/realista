import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let user = null;

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

        user = await response.json();

        if (!user) {
          throw new Error("Invalid credentials.");
        }
        // return user object with their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.id = account.providerAccountId; // This is the Google ID
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/profile";
    },
  },
});
