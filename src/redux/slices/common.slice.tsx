import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isOpenMainMenu: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsOpenMainMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpenMainMenu = action.payload;
    },
  },
});
export const { setIsOpenMainMenu } = commonSlice.actions;

export default commonSlice.reducer;
