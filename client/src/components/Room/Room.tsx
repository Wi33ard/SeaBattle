import { Dispatch, SetStateAction } from 'react';
import { USERS_ONLINE } from "../../store/const";
import './style/Room.css';

interface IRoomProps {
  join: Dispatch<SetStateAction<boolean>>
}

const Room: React.FC<IRoomProps> = ({ join }) => {
  return (
    <div className="room">
      <h2>Room #33</h2>
      <table className="table">
        <tr className="header">
          <th>player</th>
          <th>rating</th>
        </tr>
        {USERS_ONLINE.map((user) => (
          <tr className="row" onClick={() => join(true)}>
            <td>{user.name}</td>
            <td>{user.rating}</td>
          </tr>
        ))}

      </table>
    </div>
  )
}

export default Room;
