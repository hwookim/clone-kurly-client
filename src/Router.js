import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import MainPage from './pages/Main';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProductsPage from './pages/Products';
import ProductPage from './pages/Product';
import BasketsPage from './pages/Baskets';
import NotFoundPage from './pages/NotFound';

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Header username={user?.name} />
      <div className="layout">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/baskets" element={<BasketsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
