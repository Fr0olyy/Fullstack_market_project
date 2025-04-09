import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import { App } from './App.tsx';
import { Login } from './pages/Login.tsx';
import { Favorites } from './pages/Favorites.tsx';
import Busket from './pages/Busket.tsx';
import { Register } from './pages/Register.tsx';
import './app.scss';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/Busket" element={<Busket />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
