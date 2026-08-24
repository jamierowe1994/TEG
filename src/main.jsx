import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Partnership from './pages/Partnership';
import Lettings from './pages/Lettings';
import './index.css';

// Standalone local build. Brand pages / partnership / vacancies get their
// own routes as they're designed; everything else falls back to the home page.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/partnership/lettings" element={<Lettings />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
