/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, combineReducers, configureStore, Reducer, ThunkAction } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  Persistor,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { createWrapper } from 'next-redux-wrapper';
import { api } from './api';
import testSlice from './slices/test.slice';
import authSlice from './slices/auth.slice';
import commonSlice from './slices/common.slice';

const rootReducer = combineReducers({
  common: commonSlice,
  test: testSlice,
  auth: authSlice,
  [api.reducerPath]: api.reducer,
});

const makeConfiguredStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

export const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  }
  const persistConfig = {
    key: 'root',
    storage: createWebStorage('local'),
    whitelist: ['auth'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store: any & { persistorData: Persistor } = makeConfiguredStore(persistedReducer);

  store.persistorData = persistStore(store);

  return store;
};

export const wrapper = createWrapper(makeStore, {
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<AppStore['dispatch']>;
