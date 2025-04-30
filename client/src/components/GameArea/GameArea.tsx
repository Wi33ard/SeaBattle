import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BattleField } from '../BattleField/BattleField';
import { GET_DISPOSITIONS } from '../../graphql/queries';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { useCollisions } from '../../utils/hooks/useCollisions';
import { setMyDispositionId } from '../../store/gameSlice';
import { useParams } from 'react-router-dom';

const GameArea = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_DISPOSITIONS, { variables: { gameId: id }});
  const { isDragging } = useCollisions();
  
  useEffect(() => {
    if (data?.dispositions?.[0]?.id) {
      dispatch(setMyDispositionId(data.dispositions[0].id));
    }
  }, [data?.dispositions?.[0]?.id, dispatch]); // eslint-disable-line

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
  if (error) return <p>Error : {error.message}</p>;
  
  return (
    <div className='battle-fields'>
      <BattleField dispositionId={data.dispositions[0].id} />
      <BattleField dispositionId={data.dispositions[1].id} />
    </div>
  )
}

export default GameArea;
