import { useMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CampaignPage() {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { data } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/sign-in/campaign-creator');
    }
  }, [accessToken]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);
  return <div>CampaignPage</div>;
}

export default CampaignPage;
