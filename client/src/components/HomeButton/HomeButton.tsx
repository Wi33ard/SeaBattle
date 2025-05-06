import React from "react";
import './styles/HomeButton.css';
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  }

  return (
    <button
      className="home-button"
      onClick={handleNavigateHome}
    >
      ⚓
    </button>
  )
}

export default HomeButton;