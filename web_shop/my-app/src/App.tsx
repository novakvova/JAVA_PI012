import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import DefaultLayout from './components/containers/default';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<Home/> }/>
      </Route>
    </Routes>
      
    </>
  );
}

export default App;
