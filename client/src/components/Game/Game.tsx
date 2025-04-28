import { useMutation } from '@apollo/client';
import GameStateInfo from './GameStateInfo';
import ShipsPanel from '../ShipsPanel/ShipsPanel';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { CellState } from '../../types';
import { SET_CELL_STATUS } from '../../graphql/mutations';
import { useOverlapCollisionDetection } from '../../utils/customCollisionDetection';
import { start } from '../../store/gameSlice';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import PerformancePanel from '../PerformancePanel';
import { removeShip, TDeckCount } from '../../store/pierSlice';
import GameArea from '../GameArea/GameArea';
import { Header } from '../Header/Header';
import './styles/Game.css';


export const Game = () => {
  const [updateFieldState] = useMutation(SET_CELL_STATUS);
  const dispatch = useAppDispatch();

  function handleDragEnd(event: DragEndEvent) {
    if (event.collisions) {
      const deckCount = event.active.id;

      for (let collision of event.collisions) {
        const [dispositionId, index] = collision.id.toString().split('-');
          updateFieldState({ variables: { dispositionId, index: Number(index), state: CellState.Occupied } });
      }

      dispatch(removeShip(deckCount as TDeckCount));
    }
  }

  function startGame() {
    dispatch(start());
  }

  return (
    <div className='main'>
      {/* <Header /> */}
      <GameStateInfo />

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={useOverlapCollisionDetection}
      >
        <GameArea />
        <ShipsPanel />
        <PerformancePanel />
      </DndContext>

      <div className='toolbar'>
        <button onClick={startGame}>Start</button>
      </div>
    </div>
  )
}
