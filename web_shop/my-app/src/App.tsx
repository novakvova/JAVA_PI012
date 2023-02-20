import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import DefaultLayout from './components/containers/default';
import LoginPage from './components/auth/login';
import NotFoundPage from './components/notFound';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<Home/> }/>
        <Route path="login" element={<LoginPage/> }/>

        <Route path="*" element={<NotFoundPage/> }/>
      </Route>
    </Routes>
      
    </>
  );
}

export default App;
