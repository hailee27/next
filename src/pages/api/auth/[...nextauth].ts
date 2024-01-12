/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import DiscordProvider from 'next-auth/providers/discord';
import { discordProvider } from '@/utils/social-provider-configs/discord.provider';
import LineProvider from 'next-auth/providers/line';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: 'developer_clout',
  // site: process?.env?.NEXTAUTH_URL || 'http://localhost:3000',
  // pages: { signIn: '/auth/signin' },
  providers: [
    TwitterProvider({
      clientId: 'INGuSX5GyqypSrHclokya8WdT',
      clientSecret: 'BXv2Fi8DyVvCkKctIjDOtVM4XoviMVyS7WfYA80pjSgEjRQFBB',
    }),
    DiscordProvider({
      clientId: discordProvider.clientKey,
      clientSecret: discordProvider.clientKeySecret,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+guilds+email+connections+guilds.members.read+guilds.join',
    }),
    LineProvider({
      clientId: '2002706068',
      clientSecret: '41fc750b48d14a59528a8e45517db7ca',
    }),
    {
      id: 'tiktok',
      name: 'Tiktok',
      type: 'oauth',
      authorization: 'https://www.tiktok.com/v2/auth/authorize/',
      clientId: 'awkycd3ez80voj09',
      clientSecret: 'a13LFIfTa8mGERwQvKL9akJX1QWvfwYU',
      profile(profile) {
        return profile;
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (!token.account) token.account = account;
      if (!token.userProfile) token.userProfile = profile;
      return Promise.resolve(token);
    },
    async session({ session, token, user }: any) {
      session.user.userProfile = token?.userProfile ?? null;
      session.user.account = token?.account ?? null;
      return session;
    },
  },
};
export default NextAuth(authOptions);
