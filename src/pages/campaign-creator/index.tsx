import React, { useEffect } from 'react';
import { useMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import CampainListPage from './list';

function CampaignCreatorPage() {
  const { data } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);
  return <CampainListPage />;
}

export default CampaignCreatorPage;
