import { useQuery } from '@apollo/client';
import { BattleField } from '../BattleField/BattleField';
import GameStateInfo from './GameStateInfo';
import { Header } from '../Header/Header';
import { GET_DISPOSITIONS } from '../../graphql/queries';
import ShipsPanel from '../ShipsPanel/ShipsPanel';
import {DndContext, DragStartEvent} from '@dnd-kit/core';
import './styles/Game.css';


export const Game = () => {
  const { loading, error, data } = useQuery(GET_DISPOSITIONS);
  console.log(data);

  function handleDragStart(event: DragStartEvent) {
    console.log('Drag started', event);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
 
  return (
    <div className='main'>
      {/* <Header /> */}
      <GameStateInfo />

      <DndContext onDragStart={handleDragStart}>
        <div className='battle-fields'>
          <BattleField dispositionId={data.dispositions[0].id} />
          <BattleField dispositionId={data.dispositions[1].id} />
        </div>
        <ShipsPanel />
      </DndContext>

      <div className='toolbar'>
        <button onClick={() =>{}}>Start</button>
      </div>
    </div>
  )
}
