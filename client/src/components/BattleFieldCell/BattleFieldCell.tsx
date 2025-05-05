import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { MAKE_SHOT, SET_CELL_STATUS } from '../../graphql/mutations';
import { CellState } from '../../types';
import { useDroppable } from '@dnd-kit/core';
import { useCollisions } from '../../utils/hooks/useCollisions';
import './styles/BattleFieldCell.css';

interface BattleFieldCellProps {
  index: number,
  cellState: CellState,
  dispositionId: string,
  isMyDisposition?: boolean,
}

export const BattleFieldCell: React.FC<BattleFieldCellProps> = ({ 
  index, 
  cellState, 
  dispositionId,
  isMyDisposition
}) => {
  const [updateFieldState, { data, loading, error }] = useMutation(SET_CELL_STATUS);
  const [ makeShot ] = useMutation(MAKE_SHOT);
  const { collisions, isDragging } = useCollisions();
  const id = `${dispositionId}-${index}`;

  const {isOver, setNodeRef} = useDroppable({
    id,
    disabled: !isMyDisposition,
  });

  // Check if this cell is in the collisions array
  const isInCollisions = collisions.some(collision => collision.id === id);
  
  // Use either isOver from useDroppable or isInCollisions
  const showIsOver = isOver || (isDragging && isInCollisions);

  const getStyleName = useCallback((cellState: CellState) => {
    switch(cellState) {
      case CellState.Empty:
        return 'emptyField';
      case CellState.Occupied:
        return isMyDisposition ? 'occupiedField' : 'emptyField';
      case CellState.Damaged:
        return 'damagedField';
      default:
        return 'unknownField';
    }
  }, []);

  const handleCellClick = useCallback(() => {
    if (isMyDisposition) {
      const newState = cellState === CellState.Occupied ? CellState.Empty : CellState.Occupied;
      updateFieldState({ variables: { dispositionId, index, state: newState } });
    } else {
      makeShot({ variables: { dispositionId, index } });
    }    
  }, [cellState, dispositionId, index, isMyDisposition, makeShot, updateFieldState]);

  if (loading) {
    return (
      <div className='battle-field-cell' />
    )
  }

  return (
    <div
      ref={setNodeRef}
      onClick={handleCellClick}
      className={`battle-field-cell ${getStyleName(cellState)} ${showIsOver ? 'is-over' : ''}`}
      data-is-over={showIsOver}
    >
      {/* {index} */}
    </div>
  )
}