import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

async function refreshAccessToken(token) {
  try {
    const url = "https://github.com/login/oauth/access_token";

    const bodyjson = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token && token.account.refresh_token,
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: bodyjson,
    });

    console.log(response);

    const refreshedTokens = await response.text();

    console.log("this is the refreshTOkne", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      account: {
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      }, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
      account &&
        ((token.account = account),
        (token.accessTokenExpires = Date.now() + account.expires_at * 1000),
        (token.refreshToken = account.refresh_token));
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.account = token.account;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
