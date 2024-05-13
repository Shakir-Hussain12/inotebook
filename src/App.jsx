import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import NoteState from './context/notes/noteState';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
