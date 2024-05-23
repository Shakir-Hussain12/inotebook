import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import NoteState from './context/notes/noteState';
import Authenticate from './pages/Authenticate';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
            )}
            />
            <Route
              path="/about"
              element={(
                <PrivateRoute>
                  <About />
                </PrivateRoute>
            )}
            />
            <Route path="/auth" element={<Authenticate />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
