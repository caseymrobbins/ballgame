// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from '../features/teams/teamsSlice';
import playersReducer from '../features/players/playersSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    players: playersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
