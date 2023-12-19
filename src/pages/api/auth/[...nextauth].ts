/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import DiscordProvider from 'next-auth/providers/discord';
import { discordProvider } from '@/utils/social-provider-configs/discord.provider';
import LineProvider from 'next-auth/providers/line';

export const authOptions = {
  secret: process?.env?.NEXTAUTH_SECRET,
  providers: [
    TwitterProvider({
      clientId: process?.env?.NEXT_PUBLIC_TWITTER_API_KEY ?? '',
      clientSecret: process?.env?.NEXT_PUBLIC_TWITTER_API_SECRET_KEY ?? '',
    }),
    DiscordProvider({
      clientId: discordProvider.clientKey,
      clientSecret: discordProvider.clientKeySecret,
    }),
    LineProvider({
      clientId: '2002221153',
      clientSecret: '4190208119fdc2fbe69fb5d746d2c587',
    }),
    // {
    //   id: 'tiktok',
    //   name: 'TikTok',
    //   type: 'oauth',
    //   version: '2.0',
    //   clientId: 'awbyzlzclli6x43d',
    //   clientSecret: 'iz0zIpESP9JpRxueGqypBzTIO5xbLyfM',
    //   authorization: {
    //     url: 'https://www.tiktok.com/auth/authorize/',
    //     params: {
    //       scope: 'user.info.basic,video.list',
    //       response_type: 'code',
    //       client_key: 'awbyzlzclli6x43d',
    //       redirect_uri: 'https://03a9-14-248-82-148.ngrok-free.app/api/auth/callback/tiktok',
    //     },
    //   },
    //   token: {
    //     url: 'https://open-api.tiktok.com/oauth/access_token/',
    //     params: {
    //       client_key: 'awbyzlzclli6x43d',
    //       client_secret: 'iz0zIpESP9JpRxueGqypBzTIO5xbLyfM',
    //       grant_type: 'authorization_code',
    //     },
    //   },
    //   userinfo: 'https://open-api.tiktok.com/user/info/',
    //   profile(profile: any) {
    //     return {
    //       profile,
    //       id: profile.open_id,
    //     };
    //   },
    //   checks: ['state'],
    // },
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (!token.userProfile) token.userProfile = profile;
      return Promise.resolve(token);
    },
    async session({ session, token, user }: any) {
      session.user.userProfile = token?.userProfile ?? null;

      return session;
    },
  },
};
export default NextAuth(authOptions);
