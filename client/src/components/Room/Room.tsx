import { Dispatch, SetStateAction, useEffect, useState, MouseEvent } from 'react';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { CREATE_DISPOSITION, CREATE_GAME, DELETE_GAME } from '../../graphql/mutations';
import { GAME_CREATED_SUBSCRIPTION, GAME_DELETED_SUBSCRIPTION } from '../../graphql/subscriptions';
import { GET_GAMES } from '../../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../types';
import './style/Room.css';

interface IRoomProps {
  join?: Dispatch<SetStateAction<boolean>>
}

const Room: React.FC<IRoomProps> = ({ join }) => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data, refetch } = useQuery<{ games: Game[] }>(GET_GAMES);
  const [createGame] = useMutation(CREATE_GAME);
  const [deleteGame] = useMutation(DELETE_GAME);
  const [createDisposition] = useMutation(CREATE_DISPOSITION);
  const { data: gameCreated } = useSubscription<{ gameCreated: Game }>(GAME_CREATED_SUBSCRIPTION);
  const { data: deletedData } = useSubscription<{ gameDeleted: string }>(GAME_DELETED_SUBSCRIPTION);
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.games) {
      setGames(data.games);
    }
  }, [data?.games]);

  useEffect(() => {
    refetch();
  }, [gameCreated?.gameCreated.id, refetch]);

  useEffect(() => {
    console.log(deletedData);
    setGames(prev => prev.filter((game) => game.id !== deletedData?.gameDeleted))
  }, [deletedData]);

  const handleCreateGame = async () => {
    if (userId) {
      const game = await createGame({ variables: { userId } });
      console.log('new game: ', game);
      if (game.data?.createGame?.id) {
        await createDisposition({ variables: {
          gameId: game.data?.createGame?.id,
          userId,
        }});
      }
    }
  };

  const handleJoinGame = async (gameId: string) => {
    if (gameId) {
      // await createDisposition({ variables: {
      //   gameId,
      //   userId,
      // }});
    }
    navigate(`/game/${gameId}`);
  }

  const handleDeleteGame = (event: MouseEvent<HTMLSpanElement>, id: string) => {
    event.stopPropagation();
    deleteGame({ variables: { id } });
  }

  return (
    <div className="room">
      <h2>Room #33</h2>
      <div className='tableContainer'>
        <table className="table">
          <thead>
            <tr className="header">
              <th>id</th>
              <th>player</th>
              <th>rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games?.map((game) => (
              <tr className="row" onClick={() => handleJoinGame(game.id)} key={game.id}>
                <td>{game?.id.slice(-5)}</td>
                <td>{game?.user1?.name}</td>
                <td>{game?.user1?.rating}</td>
                <td><span onClick={(e) => handleDeleteGame(e, game.id)}>❌</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleCreateGame}>create</button>
    </div>
  )
}

export default Room;
