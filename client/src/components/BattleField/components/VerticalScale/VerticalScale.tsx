import React from "react";
import './styles/VerticalScale.css';

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const VerticalScale: React.FC = () => {
  return (
    <div className="vs-container">
      { digits.map(digit => <span className="scale-digit">{digit}</span>)}
    </div>
  )
}

export default VerticalScale;