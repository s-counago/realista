import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "ejemplo@dominio.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "************",
        },
      },
      async authorize(credentials, req) {
        return {
          name: "ejemplos@gmail.com",
          password: "test123",
        };
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
