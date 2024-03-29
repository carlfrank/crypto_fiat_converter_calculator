// src/App.tsx
import React from 'react';
import './App.css'; // Your custom styles for the app
import CryptoConverter from './components/CryptoConverter';

function App() {
  // No need for useState here unless you add other stateful components

  return (
    <div className="app-container">
      <CryptoConverter />
    </div>
  );
}

export default App;
