import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Twitter = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === 'loading') && session?.user?.provider !== 'twitter') signIn('twitter');
    if (session?.user?.provider === 'twitter') {
      window.close();
    }
  }, [session, status]);

  return <div className="mt-[300px] flex justify-center items-center">Waiting a moment...</div>;
};

export default Twitter;
