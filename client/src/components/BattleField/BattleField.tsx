import React, { useEffect } from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { BattleFieldCell, CellState } from '../BattleFieldCell/BattleFieldCell';
import HorizontalScale from './components/HorizontalScale/HorizontalScale';
import VerticalScale from './components/VerticalScale/VerticalScale';
import './styles/BattleField.css';

interface Disposition {
  userId: string,
  gameId: string,
  fields: Number[],
}

interface BattleFieldProps {
  dispositionId: string
}

const GET_DISPOSITION = gql`
  query getDisposition($id: ID!) {
    disposition(_id: $id) {
      userId
      gameId
      fields
    }
  }
`;

const DISPOSITION_UPDATED_SUBSCRIPTION = gql`
  subscription DispositionUpdated($id: ID!) {
    dispositionUpdated(_id: $id) {
      gameId
      userId
      fields
    }
  }
`;

export const BattleField: React.FC<BattleFieldProps> = ({ dispositionId }) => {
  const { loading, error, data, refetch } = useQuery<{disposition: Disposition}>(GET_DISPOSITION, { variables: { id: dispositionId }});
  const { data: updatedData } = useSubscription(DISPOSITION_UPDATED_SUBSCRIPTION, { variables: { id: dispositionId }});
  console.log(data);
  console.log("updatedData: ", updatedData);

  useEffect(() => {
    refetch({ id: dispositionId })
  }, [dispositionId, refetch, updatedData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='battle-field-container'>
      <HorizontalScale />
      <VerticalScale />
      <div className='battle-field'>
        { data?.disposition?.fields.map((field, index) => {
          return <BattleFieldCell key={index} index={index} cellState={field as CellState} dispositionId={dispositionId} />
        })}
      </div>
      <button onClick={() => refetch({ id: dispositionId })}>refresh</button>
    </div>
  )
}