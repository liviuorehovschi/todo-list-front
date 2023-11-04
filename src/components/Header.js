// Header.js
import React from 'react';
import './CSS/Header.css';
import { TbLogout } from 'react-icons/tb';

function Header() {
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <header className="header">
      <h1>Bikini Bottom To-Do List</h1>
      <button onClick={handleLogout} className="logout-button">
        <TbLogout />
      </button>
    </header>
  );
}

export default Header;
