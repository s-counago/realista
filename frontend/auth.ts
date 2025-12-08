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

        // logic to verify if the user exists
        user = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/getCredential/${credentials.email}`
          )
        ).json();

        console.log(user);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
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
