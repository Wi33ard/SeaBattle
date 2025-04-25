import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TDeckCount = '1' | '2' | '3' | '4';

export interface IPierState {
  ships: {
    1: number,
    2: number,
    3: number,
    4: number,
  }
};

const initialState: IPierState = {
  ships: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  }
}

export const pierSlice = createSlice({
  name: 'pier',
  initialState,
  reducers: {
    removeShip: (state, action: PayloadAction<TDeckCount>) => {
      state.ships[action.payload]--;
    },
    addShip: (state, action: PayloadAction<TDeckCount>) => {
      state.ships[action.payload]++;
    },
  },
});

export const { removeShip, addShip } = pierSlice.actions;

export default pierSlice.reducer;
