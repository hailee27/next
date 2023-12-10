/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process?.env?.NEXT_PUBLIC_TWITTER_CLIENT_ID_KEY ?? '',
      clientSecret: process?.env?.NEXT_PUBLIC_TWITTER_CLIENT_ID_KEY_SECRET ?? '',
      version: '2.0',
    }),
    // TwitterProvider({
    //   clientId: process?.env?.NEXT_PUBLIC_TWITTER_API_KEY ?? '',
    //   clientSecret: process?.env?.NEXT_PUBLIC_TWITTER_API_SECRET_KEY ?? '',
    // }),
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log(session, token, user);
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};
export default NextAuth(authOptions);
