import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import DefaultLayout from './components/containers/default';
import LoginPage from './components/auth/login';
import NotFoundPage from './components/notFound';
import CategoryCreatePage from './components/categories/create';
import ProductCreatePage from './components/products/create';
import ProductListPage from './components/products/list';
import ProductEditPage from './components/products/edit';
import ProductItemPage from './components/products/item';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<Home/> }/>
        <Route path="login" element={<LoginPage/> }/>
        <Route path="categories/create" element={<CategoryCreatePage/> }/>

        <Route path="products/create" element={<ProductCreatePage/> }/>
        <Route path="products/edit/:id" element={<ProductEditPage/> }/>
        <Route path="products/list" element={<ProductListPage/> }/>
        <Route path="products/view/:id" element={<ProductItemPage/> }/>

        <Route path="*" element={<NotFoundPage/> }/>
      </Route>
    </Routes>
      
    </>
  );
}

export default App;
