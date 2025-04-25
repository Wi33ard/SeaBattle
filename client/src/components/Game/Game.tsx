import { useMutation, useQuery } from '@apollo/client';
import { BattleField } from '../BattleField/BattleField';
import GameStateInfo from './GameStateInfo';
import { Header } from '../Header/Header';
import { GET_DISPOSITIONS } from '../../graphql/queries';
import ShipsPanel from '../ShipsPanel/ShipsPanel';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { CellState } from '../../types';
import { SET_CELL_STATUS } from '../../graphql/mutations';
import { useOverlapCollisionDetection } from '../../utils/customCollisionDetection';
import { useEffect } from 'react';
import { setMyDispositionId, start } from '../../store/gameSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { reset } from '../../store/performanceSlice';
import PerformancePanel from '../PerformancePanel';
import { removeShip, TDeckCount } from '../../store/pierSlice';
import './styles/Game.css';


export const Game = () => {
  const { loading, error, data } = useQuery(GET_DISPOSITIONS);
  const [updateFieldState] = useMutation(SET_CELL_STATUS);
  const dispatch = useAppDispatch();
  
  // console.log("Game");
  // console.log(data);
  
  useEffect(() => {
    if (data?.dispositions?.[0]?.id) {
      dispatch(setMyDispositionId(data.dispositions[0].id))
    }
  }, [data?.dispositions?.[0]?.id]);

  function handleDragStart(event: DragStartEvent) {
    // console.log('%c Drag started: ', 'background: lightgreen; color: black', event);
    // dispatch(reset);
  }

  function handleDragEnd(event: DragEndEvent) {
    // console.log('%c Drag ended: ', 'background: red; color: white', event);
    // console.log('%c Time elapsed: ', 'background: red; color: white', elapsedTime + " ms");
    // console.log('%c Time avg: ', 'background: red; color: white', elapsedTime / count);

    if (event.collisions) {
      const deckCount = event.active.id;

      for (let collision of event.collisions) {
        const [dispositionId, index] = collision.id.toString().split('-');
          updateFieldState({ variables: { dispositionId, index: Number(index), state: CellState.Occupied } });
      }

      dispatch(removeShip(deckCount as TDeckCount));
    }
  }

  function handleDragOver(event: DragOverEvent) {
    // console.log('%cDrag over: ', 'background: red; color: white', event.over?.id);
    // console.table(event.active.rect.current);
    // console.table(event.over?.rect);
  }

  function startGame() {
    dispatch(start());
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='main'>
      {/* <Header /> */}
      <GameStateInfo />

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={useOverlapCollisionDetection}
      >
        <div className='battle-fields'>
          <BattleField dispositionId={data.dispositions[0].id} />
          <BattleField dispositionId={data.dispositions[1].id} />
        </div>
        <ShipsPanel />
        <PerformancePanel />
      </DndContext>

      <div className='toolbar'>
        <button onClick={startGame}>Start</button>
      </div>
    </div>
  )
}
