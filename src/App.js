import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage"

function App() {
  return (
    
    <div className="App">
      <a id='HackClubLogo' href="https://hackclub.com/">
      <img
        style={{
          position: 'fixed',
          top: 0,
          left: '10px',
          border: 0,
          width: '156px',
          zIndex: 999
        }}
        src="https://assets.hackclub.com/flag-orpheus-top.svg"
        alt="Hack Club"
      />
    </a>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
