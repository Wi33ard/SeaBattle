import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import './styles/BattleFieldCell.css';

export enum CellState {
  Unknown = -1,
  Empty,
  Occupied,
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
    const newState = cellState === CellState.Occupied ? CellState.Empty: CellState.Occupied;
    updateFieldState({ variables: { gameId, userId, index, state: newState } });
  }, [cellState, index, updateFieldState]);

  const getStyleName = useCallback((cellState: CellState) => {
    switch(cellState) {
      case CellState.Empty:
        return 'emptyField';
      case CellState.Occupied:
        return 'occupiedField';
      case CellState.Damaged:
        return 'damagedField';
      default:
        return 'unknownField';
    }
  }, []);

  return (
    <div
      onClick={handleUpdateState}
      className={`battle-field-cell ${getStyleName(cellState)}`}
    />
  )
}