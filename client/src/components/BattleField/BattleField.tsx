import React from 'react';
import { BattleFieldCell } from '../BattleFieldCell/BattleFieldCell';
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
  const fields = Array(100).fill(0);
  console.log("BattleField, disposition: ", disposition);

  return (
    <div className='battle-field'>
      { fields.map((field, index) => {
        return <BattleFieldCell key={index} index={index} fieldState={{ isOccupied : disposition?.fields ? !!disposition?.fields[index]: false }} />
      })}
    </div>
  )
}