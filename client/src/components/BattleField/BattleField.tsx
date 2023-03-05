import React from 'react';
import { BattleFieldCell, CellState } from '../BattleFieldCell/BattleFieldCell';
import './styles/BattleField.css';

interface Disposition {
  userId: string,
  gameId: string,
  fields: Number[],
}

interface BattleFieldProps {
  disposition?: Disposition
}

export const BattleField: React.FC<BattleFieldProps> = ({ disposition }) => {
  console.log("BattleField, disposition: ", disposition);

  return (
    <div className='battle-field'>
      { disposition?.fields.map((field, index) => {
        return <BattleFieldCell key={index} index={index} cellState={field as CellState} />
      })}
    </div>
  )
}