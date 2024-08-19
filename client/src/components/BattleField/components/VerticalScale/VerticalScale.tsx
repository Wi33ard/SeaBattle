import React from "react";
import './styles/VerticalScale.css';

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const VerticalScale: React.FC = () => {
  return (
    <div className="vs-container">
      { digits.map((digit, index) => <span className="scale-digit" key={index}>{digit}</span>)}
    </div>
  )
}

export default VerticalScale;