import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './gameSlice';
import authReducer from './authSlice';
import performanceReducer from './performanceSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    performance: performanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;