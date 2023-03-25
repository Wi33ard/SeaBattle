import React from 'react';
import { BattleField } from '../BattleField/BattleField';
import { gql, useQuery, useSubscription } from '@apollo/client';
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

const DISPOSITION_UPDATED_SUBSCRIPTION = gql`
  subscription DispositionUpdated {
    dispositionUpdated {
      gameId
      userId
      fields
    }
  }
`;

export const Game = () => {
  const { loading, error, data } = useQuery(GET_DISPOSITIONS);
  const { data: updatedData } = useSubscription(DISPOSITION_UPDATED_SUBSCRIPTION, {});
  console.log("updatedData: ", updatedData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
 
  return (
    <>
      <div className='main'>
        <BattleField disposition={updatedData?.dispositionUpdated ?? data.dispositions[0]} />
        <BattleField disposition={updatedData?.dispositionUpdated ?? data.dispositions[1]} />
      </div>
    </>
  )
}