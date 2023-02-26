import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import './styles/BattleFieldCell.css';

interface FieldState {
  isOccupied: Boolean,
}
interface BattleFieldCellProps {
  index: Number,
  fieldState: FieldState
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

export const BattleFieldCell: React.FC<BattleFieldCellProps> = ({ index, fieldState }) => {
  const [updateFieldState, { data, loading, error }] = useMutation(SET_CELL_STATUS);

  if (loading) console.log('Loading...');
  if (error) console.log(`Submission error! ${error.message}`);

  const handleUpdateStatus = useCallback(() => {
    updateFieldState({ variables: { gameId, userId, index, state: 1 } });
  }, [index, updateFieldState]);

  return (
    <div
      onClick={handleUpdateStatus}
      className={`battle-field-cell ${fieldState.isOccupied ? 'occupiedField' : ''}`}
    />
  )
}