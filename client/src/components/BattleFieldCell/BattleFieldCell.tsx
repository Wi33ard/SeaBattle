import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import './styles/BattleFieldCell.css';

export enum CellState {
  Empty,
  Full,
  Damaged
}
interface BattleFieldCellProps {
  index: Number,
  cellState: CellState
}

const gameId = "63f878715dd768d0a905ce7e";
const userId = "63f878005dd768d0a905ce7d"
const SET_CELL_STATUS = gql`
  mutation SetCellStatus($gameId: String!, $userId: String!, $index: Int!, $state: Int!) {
    updateFieldState (
      gameId: $gameId,
      userId: $userId,
      index: $index,
      state: $state
    )
  }
`;

export const BattleFieldCell: React.FC<BattleFieldCellProps> = ({ index, cellState }) => {
  const [updateFieldState, { data, loading, error }] = useMutation(SET_CELL_STATUS);

  if (loading) console.log('Loading...');
  if (error) console.log(`Submission error! ${error.message}`);
  if (data) console.log('data: ', data);

  const handleUpdateState = useCallback(() => {
    const newState = cellState === CellState.Full ? CellState.Empty: CellState.Full;
    updateFieldState({ variables: { gameId, userId, index, state: newState } });
  }, [cellState, index, updateFieldState]);

  return (
    <div
      onClick={handleUpdateState}
      className={`battle-field-cell ${cellState === CellState.Full ? 'occupiedField' : ''}`}
    />
  )
}