import { configureStore } from '@reduxjs/toolkit';

import { movieReducer } from './movieSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer
  }
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
