import React, { useEffect } from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { BattleFieldCell } from '../BattleFieldCell/BattleFieldCell';
import HorizontalScale from './components/HorizontalScale/HorizontalScale';
import VerticalScale from './components/VerticalScale/VerticalScale';
import { DISPOSITION_UPDATED_SUBSCRIPTION, GET_DISPOSITION } from '../../graphql/queries';
import { CellState } from '../../types';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import './styles/BattleField.css';

interface Disposition {
  userId: string,
  gameId: string,
  fields: Number[],
}

interface BattleFieldProps {
  dispositionId: string
}

export const BattleField: React.FC<BattleFieldProps> = ({ dispositionId }) => {
  const { loading, error, data, refetch } = useQuery<{disposition: Disposition}>(GET_DISPOSITION, { variables: { id: dispositionId }});
  const { data: updatedData } = useSubscription(DISPOSITION_UPDATED_SUBSCRIPTION, { variables: { id: dispositionId }});
  const myDispositionId = useAppSelector((state) => state.game.myDispositionId);
  const isMyDisposition = dispositionId === myDispositionId;
  // console.log(data);
  // console.log("updatedData: ", updatedData);
  console.log("BattleField");

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
          return (
            <BattleFieldCell
              key={index}
              index={index}
              cellState={field as CellState}
              dispositionId={dispositionId}
              isMyDisposition={isMyDisposition}
            />
          )
        })}
      </div>
      {/* <button onClick={() => refetch({ id: dispositionId })}>refresh</button> */}
    </div>
  )
}