import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/Main/MainPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import ProductPage from './pages/Product/ProductPage';
import ProductsPage from './pages/Products/ProductsPage';
import BasketsPage from './pages/Baskets/BasketsPage';

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Header username={user?.name} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/baskets" element={<BasketsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
