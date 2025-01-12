import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from '../types';

export interface GameState {
  status: GameStatus|undefined,
};

const initialState: GameState = {
  status: undefined,
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
  },
});

// Action creators are generated for each case reducer function
export const { create, start, finish } = gameSlice.actions;

export default gameSlice.reducer;
