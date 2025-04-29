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
  id?: string;
  name: string;
  email: string;
  rating?: number;
}

export enum Orientation {
  Horizontal= 'horizontal',
  Vertical= 'vertical',
};

export type Game = {
  id: string,
  user1: User,
  user2: User,
}

export type Disposition = {
  userId: string,
  gameId: string,
  fields: Number[],
}
