import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ token, user, account }) => {
      user && (token.user = user);
      account && (token.account = account);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.account = token.account;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
