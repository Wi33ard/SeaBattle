import React from "react";
import './styles/GameStateInfo.css';
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { GameStatus } from "../../types";

const GameStateInfo = () => {
  const status = useAppSelector((state) => state.game.status);

  return (
    <div className="game-state-info">
      status: {GameStatus[status].toLowerCase()}
    </div>
  )
}

export default GameStateInfo;