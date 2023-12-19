import { User } from '@/types/auth.type';
import { createSlice } from '@reduxjs/toolkit';

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
      state.user = actions?.payload?.user;
      state.accessToken = actions?.payload?.accessToken;
      state.refreshToken = actions?.payload?.refreshToken;
    },
    setUser(state, actions) {
      state.user = actions?.payload?.user;
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
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

export const { setAuth, setUser, tokenReceived, logout } = authSlice.actions;
