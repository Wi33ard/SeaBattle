import React from 'react';
import { BattleFieldCell } from '../BattleFieldCell/BattleFieldCell';
import './styles/BattleField.css';

export const BattleField = () => {
  const fields = Array(100).fill(0);

  return (
    <div className='battle-field'>
      { fields.map((field, index) => {
        return <BattleFieldCell key={index} />
      })}
    </div>
  )
}