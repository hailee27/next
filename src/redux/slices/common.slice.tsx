import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MasterDataApi, MasterDataResponse } from '../endpoints/masterData';

interface CommonState {
  isOpenMainMenu: boolean;
  masterData: MasterDataResponse | null;
}

const initialState: CommonState = {
  isOpenMainMenu: false,
  masterData: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsOpenMainMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpenMainMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(MasterDataApi.endpoints.getMasterData.matchPending, () => {})
      .addMatcher(MasterDataApi.endpoints.getMasterData.matchFulfilled, (state, { payload }) => {
        state.masterData = payload;
      })
      .addMatcher(MasterDataApi.endpoints.getMasterData.matchRejected, () => {});
  },
});
export const { setIsOpenMainMenu } = commonSlice.actions;

export default commonSlice.reducer;
