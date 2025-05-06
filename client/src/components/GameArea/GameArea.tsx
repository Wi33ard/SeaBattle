import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { BattleField } from '../BattleField/BattleField';
import { GET_DISPOSITIONS } from '../../graphql/queries';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { useCollisions } from '../../utils/hooks/useCollisions';
import { setMyDispositionId } from '../../store/gameSlice';
import { useParams } from 'react-router-dom';
import { Disposition } from '../../types';

const GameArea = () => {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_DISPOSITIONS, { variables: { gameId: id }});
  const { isDragging } = useCollisions();
  const [myDisposition, setMyDisposition] = useState<Disposition>();
  const [opponentDisposition, setOpponentDisposition] = useState<Disposition>();

  console.log('userId: ', userId);
  console.log('data: ', data);
  console.log('myDisposition: ', myDisposition);
  console.log('opponentDisposition: ', opponentDisposition);
  
  useEffect(() => {
    if (data && data?.dispositions?.[0]?.userId === userId) {
      setMyDisposition(data.dispositions[0]);
      setOpponentDisposition(data.dispositions[1]);
      dispatch(setMyDispositionId(data.dispositions[0].id));
    } else if (data && data?.dispositions?.[1]?.userId === userId) {
      setMyDisposition(data.dispositions[1]);
      setOpponentDisposition(data.dispositions[0]);
      dispatch(setMyDispositionId(data.dispositions[1].id));
    }
  }, [data, dispatch, userId]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isDragging) {
        console.log(event.key);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDragging]);

  if (loading) return <p>Loading...</p>;
  if (error || !myDisposition?.id || !opponentDisposition?.id) return <p>Error : {error?.message}</p>;
  
  return (
    <div className='battle-fields'>
      <BattleField dispositionId={myDisposition?.id} />
      <BattleField dispositionId={opponentDisposition?.id} />
    </div>
  )
}

export default GameArea;
