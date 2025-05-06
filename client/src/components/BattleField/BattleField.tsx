import React, { useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { BattleFieldCell } from '../BattleFieldCell/BattleFieldCell';
import HorizontalScale from './components/HorizontalScale/HorizontalScale';
import VerticalScale from './components/VerticalScale/VerticalScale';
import { GET_DISPOSITION, GET_OWN_DISPOSITION } from '../../graphql/queries';
import { DISPOSITION_UPDATED_SUBSCRIPTION } from '../../graphql/subscriptions';
import { CellState, Disposition } from '../../types';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import './styles/BattleField.css';

interface BattleFieldProps {
  dispositionId: string
}

export const BattleField: React.FC<BattleFieldProps> = ({ dispositionId }) => {
  const username = useAppSelector((state) => state.auth.user?.name);
  const myDispositionId = useAppSelector((state) => state.game.myDispositionId);
  const isMyDisposition = dispositionId === myDispositionId;
  const getDispositionQuery = isMyDisposition ? GET_OWN_DISPOSITION : GET_DISPOSITION;
  const { loading, error, data, refetch } = useQuery<{ disposition : Disposition, ownDisposition : Disposition}>
    (getDispositionQuery, { variables: { id: dispositionId }});
  const { data: updatedData } = useSubscription(DISPOSITION_UPDATED_SUBSCRIPTION, { variables: { id: dispositionId }});
  const disposition = data?.ownDisposition ?? data?.disposition;

  console.log('data: ', data);

  useEffect(() => {
    refetch({ id: dispositionId })
  }, [dispositionId, refetch, updatedData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='battle-field-container'>
      { isMyDisposition && <span className='username'>{username}</span> }
      <HorizontalScale />
      <VerticalScale />
      <div className='battle-field'>
        { disposition?.fields.map((field, index) => {
          return (
            <BattleFieldCell
              key={`${disposition.id}-${index}`}
              index={index}
              cellState={field as CellState}
              dispositionId={dispositionId}
              isMyDisposition={isMyDisposition}
            />
          )
        })}
      </div>
    </div>
  )
}