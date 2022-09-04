import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/Main';
import NotFoundPage from './pages/NotFound';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProductPage from "./pages/Product";

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Header username={user?.name} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
