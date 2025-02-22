import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SET_CELL_STATUS } from '../../graphql/mutations';
import { CellState } from '../../types';
import { useDroppable } from '@dnd-kit/core';
import './styles/BattleFieldCell.css';

interface BattleFieldCellProps {
  index: number,
  cellState: CellState,
  dispositionId: string,
}

export const BattleFieldCell: React.FC<BattleFieldCellProps> = ({ index, cellState, dispositionId }) => {
  const [updateFieldState, { data, loading, error }] = useMutation(SET_CELL_STATUS);

  const {isOver, setNodeRef} = useDroppable({
    id: `${dispositionId}-${index}`,
  });

  const style = {
    background: isOver ? 'green' : undefined,
  };

  useEffect(() => {
    if (isOver) {
      console.log('index: ', index);
      console.log('isOver: ', isOver);
    }
  }, [isOver]);

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
      ref={setNodeRef}
      onClick={handleUpdateState}
      className={`battle-field-cell ${getStyleName(cellState)}`}
      style={style}
    />
  )
}