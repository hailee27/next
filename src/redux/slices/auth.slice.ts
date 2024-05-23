/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Person } from '../endpoints/auth';

// import { authApi } from '../endpoints/auth';

// import { User } from '@/types/auth.type';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  teacher?: Person | null;
  student?: Person | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  teacher: null,
  student: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, actions: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
    setTeacher(state, actions) {
      state.teacher = actions?.payload;
    },
    setStudent(state, actions) {
      state.student = actions?.payload;
    },
    tokenReceived(state, actions) {
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
    logout: (state) => {
      state.accessToken = initialState?.accessToken;
      state.refreshToken = initialState?.refreshToken;
      state.teacher = initialState?.teacher;
      state.student = initialState?.student;
    },
    setSession(state, actions) {
      state.teacher = actions?.payload?.teacher;
      state.student = actions?.payload?.student;
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(authApi.endpoints.me.matchPending, () => {})
  //     .addMatcher(authApi.endpoints.me.matchFulfilled, (state, { payload }) => {
  //       state.user = payload;
  //     })
  //     .addMatcher(authApi.endpoints.me.matchRejected, () => {});
  // },
});

const authReducer = authSlice.reducer;

export default authReducer;

export const { setAuth, setStudent, setTeacher, tokenReceived, logout, setSession } = authSlice.actions;
