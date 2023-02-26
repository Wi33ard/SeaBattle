import React from 'react';
import { BattleField } from '../BattleField/BattleField';
import { UsersList } from '../UsersList/UsersList';
import { useQuery, gql } from '@apollo/client';
import './styles/Game.css';


const GET_DISPOSITIONS = gql`
  query getDispositions {
    dispositions {
      userId
      gameId
      fields
    }
  }
`;

export const Game = () => {
  const { loading, error, data } = useQuery(GET_DISPOSITIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
 
  return (
    <>
      <div className='main'>
        <BattleField disposition={data.dispositions[0]} />
        <BattleField />
        {/* <UsersList /> */}
      </div>
    </>
  )
}