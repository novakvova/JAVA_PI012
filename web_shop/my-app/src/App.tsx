import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import DefaultLayout from './components/containers/default';
import LoginPage from './components/auth/login';
import NotFoundPage from './components/notFound';
import ProductListPage from './components/products/list';
import ProductItemPage from './components/products/item';
import AdminLayout from './components/containers/admin';
import AdminCategoryCreatePage from './components/admin/categories/create';
import AdminProductCreatePage from './components/admin/products/create';
import AdminCategoriesPage from './components/admin/categories/list';
import AdminProductListPage from './components/admin/products/list';
import AdminProductEditPage from './components/admin/products/edit';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<Home/> }/>
        <Route path="login" element={<LoginPage/> }/>
        <Route path="products/list" element={<ProductListPage/> }/>
        <Route path="products/view/:id" element={<ProductItemPage/> }/>
        <Route path="*" element={<NotFoundPage/> }/>
      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminCategoriesPage />}/>
        <Route path="categories/create" element={<AdminCategoryCreatePage/> }/>

        <Route path="products/list" element={<AdminProductListPage/> }/>
        <Route path="products/create" element={<AdminProductCreatePage/> }/>
        <Route path="products/edit/:id" element={<AdminProductEditPage/> }/>
      </Route>

    </Routes>
      
    </>
  );
}

export default App;
