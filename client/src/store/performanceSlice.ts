import { createSlice } from '@reduxjs/toolkit';

export interface IPerformanceState {
  elapsedTime: number,
  count: number,
};

const initialState: IPerformanceState = {
  elapsedTime: 0,
  count: 0,
};

export const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    addTime: (state, payload) => {
      state.elapsedTime += payload.payload;
      state.count++;
    },
    reset: (state, payload) => {
      state.elapsedTime = 0;
      state.count = 0;
    },
  },
});

export const { addTime, reset } = performanceSlice.actions;

export default performanceSlice.reducer;
