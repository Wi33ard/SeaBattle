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
  cellState: CellState,
  dispositionId: string,
}

const SET_CELL_STATUS = gql`
  mutation SetCellStatus($dispositionId: ID!, $index: Int!, $state: Int!) {
    updateFieldState (
      dispositionId: $dispositionId,
      index: $index,
      state: $state
    )
  }
`;

export const BattleFieldCell: React.FC<BattleFieldCellProps> = ({ index, cellState, dispositionId }) => {
  const [updateFieldState, { data, loading, error }] = useMutation(SET_CELL_STATUS);

  if (loading) console.log('Loading...');
  if (error) console.log(`Submission error! ${error.message}`);
  if (data) console.log('data: ', data);

  const handleUpdateState = useCallback(() => {
    const newState = cellState === CellState.Occupied ? CellState.Empty: CellState.Occupied;
    updateFieldState({ variables: { dispositionId, index, state: newState } });
  }, [cellState, dispositionId, index, updateFieldState]);

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