import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from '../types';

export interface IGameState {
  status: GameStatus | undefined,
  myDispositionId: string | undefined,
};

const initialState: IGameState = {
  status: undefined,
  myDispositionId: undefined,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    create: (state) => {
      state.status = GameStatus.Created;
    },
    start: (state) => {
      state.status = GameStatus.Active;
    },
    finish: (state) => {
      state.status = GameStatus.Ended;
    },
    setMyDispositionId: (state, payload) => {
      state.myDispositionId = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { create, start, finish, setMyDispositionId } = gameSlice.actions;

export default gameSlice.reducer;
