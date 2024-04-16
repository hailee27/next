import HomePage from '@/components/Home';

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   const apiRequest: ListCampaignParams = {
//     skip: 0,
//     take: HOME_PAGINATION_PAGE_SIZE,
//     token: 'user',
//   };

//   const { data: campaignsOrderByViews } = await store.dispatch(
//     CampaignApi.endpoints.getListCampaign.initiate({
//       ...apiRequest,
//       orderBy: JSON.stringify({
//         totalViews: 'desc',
//       }),
//     })
//   );

//   const { data: campaignsOrderByStartTime } = await store.dispatch(
//     CampaignApi.endpoints.getListCampaign.initiate({
//       ...apiRequest,
//       orderBy: JSON.stringify({
//         startTime: 'desc',
//       }),
//     })
//   );

//   const { data: campaignsOrderByTotalPrizeValue } = await store.dispatch(
//     CampaignApi.endpoints.getListCampaign.initiate({
//       ...apiRequest,
//       orderBy: JSON.stringify({
//         totalPrizeValue: 'desc',
//       }),
//     })
//   );

//   return {
//     props: {
//       campaignsOrderByViews: campaignsOrderByViews?.campaigns ?? null,
//       campaignsOrderByStartTime: campaignsOrderByStartTime?.campaigns ?? null,
//       campaignsOrderByTotalPrizeValue: campaignsOrderByTotalPrizeValue?.campaigns ?? null,
//     },
//   };
// });

export default function Home() {
  return <HomePage />;
}
