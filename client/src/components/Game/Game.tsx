import React from 'react';
import { BattleField } from '../BattleField/BattleField';
import { gql, useQuery } from '@apollo/client';
import GameStateInfo from './GameStateInfo';
import './styles/Game.css';


const GET_DISPOSITIONS = gql`
  query getDispositions {
    dispositions {
      id
      userId
      gameId
      fields
    }
  }
`;

export const Game = () => {
  const { loading, error, data } = useQuery(GET_DISPOSITIONS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
 
  return (
    <div className='main'>
      <GameStateInfo />
      <div className='battle-fields'>
        <BattleField dispositionId={data.dispositions[0].id} />
        <BattleField dispositionId={data.dispositions[1].id} />
      </div>
      <div className='toolbar'>
        <button onClick={() =>{}}>Start</button>
      </div>
    </div>
  )
}
