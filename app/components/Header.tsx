import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
    }}>
      <div className="logo" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#007bff',
      }}>
        Starsoup
      </div>
      <button style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }} onClick={() => alert('Sign Up clicked')}>
        Sign Up
      </button>
    </header>
  );
};

export default Header;