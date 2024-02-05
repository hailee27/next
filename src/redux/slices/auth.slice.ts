import { User } from '@/types/auth.type';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../endpoints/auth';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, actions) {
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
    setUser(state, actions) {
      state.user = actions?.payload;
    },
    tokenReceived(state, actions) {
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
    logout: (state) => {
      state.accessToken = initialState?.accessToken;
      state.refreshToken = initialState?.refreshToken;
      state.user = initialState?.user;
    },
    setSession(state, actions) {
      state.user = actions?.payload?.user;
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.me.matchPending, () => {})
      .addMatcher(authApi.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addMatcher(authApi.endpoints.me.matchRejected, () => {});
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

export const { setAuth, setUser, tokenReceived, logout, setSession } = authSlice.actions;
