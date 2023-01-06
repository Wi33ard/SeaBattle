import React from 'react';
import { BattleField } from '../BattleField/BattleField';
import { UsersList } from '../UsersList/UsersList';
import './styles/Game.css';


export const Game = () => {
  return (
    <>
      <div className='main'>
        <BattleField />
        <BattleField />
        <UsersList />    
      </div>
    </>
  )
}