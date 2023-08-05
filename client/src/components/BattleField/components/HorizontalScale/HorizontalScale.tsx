import React from "react";
import './styles/HorizontalScale.css';

const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

const HorizontalScale: React.FC = () => {
  return (
    <div className="hs-container">
      { letters.map((letter, index) => <span className="scale-letter" key={index}>{letter}</span>)}
    </div>
  )
}

export default HorizontalScale;