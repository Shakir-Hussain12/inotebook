import { Router } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Home />
      </Router>
    </>
  );
}

export default App;
