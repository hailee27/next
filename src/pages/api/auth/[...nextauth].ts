import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // TwitterProvider({
    //   clientId: process?.env?.NEXT_PUBLIC_TWITTER_CLIENT_ID_KEY ?? '',
    //   clientSecret: process?.env?.NEXT_PUBLIC_TWITTER_CLIENT_ID_KEY_SECRET ?? '',
    //   version: '2.0',
    //   authorization: {
    //     url: 'https://twitter.com/i/oauth2/authorize',
    //     params: {
    //       scope: 'users.read like.read list.read tweet.read tweet.write follows.read follows.write like.write',
    //     },
    //   },
    // }),
    TwitterProvider({
      clientId: process?.env?.NEXT_PUBLIC_TWITTER_API_KEY ?? '',
      clientSecret: process?.env?.NEXT_PUBLIC_TWITTER_API_SECRET_KEY ?? '',
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile }: any) {
  //     console.log('1', user, '2', account, '3', profile);
  //     return true;
  //   },
  //   async jwt({ token, account, profile }: any) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     // if (account) {
  //     //   token.accessToken = account?.access_token ?? '';
  //     //   token.id = account?.providerAccountId ?? '';
  //     // }
  //     console.log(' 4 account', account, '5 profile', profile, '6 token', token);

  //     return token;
  //   },
  //   async session({ session, token, user }: any) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     // console.log('session', session, 'token', token, 'user', user);
  //     session.accessToken = token.accessToken;
  //     session.user.id = token.id;

  //     return session;
  //   },
  // },
};
export default NextAuth(authOptions);
