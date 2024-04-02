// src/App.tsx
import React from 'react';
import './App.css'; // Import the main stylesheet for global styles specific to your app

// Import the CryptoConverter component, which presumably handles the main functionality
import CryptoConverter from './components/CryptoConverter';

// The App component is the root component for your React application
function App() {
  // No need for useState here unless you are managing state at the App level
  // This can include things like theme settings, user authentication status, etc.

  // The return statement renders your CryptoConverter component within a div container
  // You could add additional components or features here as your app grows
  return (
    <div className="app-container">
      <CryptoConverter />
    </div>
  );
}

// The export statement makes the App component importable in other files, like index.js or index.tsx
export default App;
