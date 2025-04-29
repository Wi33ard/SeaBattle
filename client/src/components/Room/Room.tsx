import { Dispatch, SetStateAction, useEffect, useState, MouseEvent } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { CREATE_GAME, DELETE_GAME } from '../../graphql/mutations';
import { GET_GAMES } from '../../graphql/queries';
import { GAME_CREATED_SUBSCRIPTION, GAME_DELETED_SUBSCRIPTION } from '../../graphql/subscriptions';
import { Game } from '../../types';
import './style/Room.css';

interface IRoomProps {
  join: Dispatch<SetStateAction<boolean>>
}

const Room: React.FC<IRoomProps> = ({ join }) => {
  const { data, refetch } = useQuery<{games: Game[]}>(GET_GAMES);
  const [createGame] = useMutation(CREATE_GAME);
  const [deleteGame] = useMutation(DELETE_GAME);
  const { data: gameCreated } = useSubscription<{gameCreated: Game}>(GAME_CREATED_SUBSCRIPTION);
  const { data: deletedData } = useSubscription<{gameDeleted: string}>(GAME_DELETED_SUBSCRIPTION);
  const [games, setGames] = useState<Game[]>([]);

  // console.log('games: ', games);

  useEffect(() => {
    if (data?.games) {
      setGames(data.games);
    }
  }, [data?.games]);

  useEffect(() => {
    refetch();
  }, [gameCreated?.gameCreated.id]);

  useEffect(() => {
    console.log(deletedData);
    setGames(prev => prev.filter((game) => game.id !== deletedData?.gameDeleted))
  }, [deletedData]);

  const handleCreateGame = () => {
    createGame({ variables: { userId: '63f874a55dd768d0a905ce77' }});
  };

  const handleDeleteGame = (event: MouseEvent<HTMLSpanElement>, id: string) => {
    event.stopPropagation();
    deleteGame({ variables: { id }});
  }

  return (
    <div className="room">
      <h2>Room #33</h2>
      <table className="table">
        <thead>
          <tr className="header">
            <th>player</th>
            <th>rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games?.map((game) => (
            <tr className="row" onClick={() => join(true)} key={game.id}>
              <td>{game?.user1?.name}</td>
              <td>{game?.user1?.rating}</td>
              <td><span onClick={(e) => handleDeleteGame(e, game.id)}>❌</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateGame}>create</button>
    </div>
  )
}

export default Room;
