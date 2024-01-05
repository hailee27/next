import { useMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function CampaignPage() {
  const { data } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);
  return <div>CampaignPage</div>;
}

export default CampaignPage;
