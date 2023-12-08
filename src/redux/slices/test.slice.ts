import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  test: 'test',
};

const testSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    },
  },
});
export const { updateTest } = testSlice.actions;

export default testSlice.reducer;
