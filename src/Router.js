import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import MainPage from './pages/Main';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import KakaoLoginPage from './pages/KakaoLogin';
import ProductsPage from './pages/Products';
import ProductPage from './pages/Product';
import BasketsPage from './pages/Baskets';
import NotFoundPage from './pages/NotFound';

import CreateProduct from './pages/CreateProduct';
import Layout from './components/Layout/Layout';

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Header username={user?.name} />
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/kakao" element={<KakaoLoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/baskets" element={<BasketsPage />} />
          <Route path="/create" element={<CreateProduct />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
