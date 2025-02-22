export enum CellState {
  Unknown = -1,
  Empty,
  Occupied,
  Damaged
};

export enum GameStatus {
  Created,
  Active,
  Ended,
  Paused,
};

export type User = {
  username: string;
  email: string;
}

export enum Orientation {
  Horizontal= 'horizontal',
  Vertical= 'vertical',
};
