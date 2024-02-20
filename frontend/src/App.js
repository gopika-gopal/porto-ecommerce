import './App.css';
import Login from './components/Login';
import ForgotPassword from './components/forgot-password';
import SignUp from './components/SignUp';
import Home from './components/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import OrderSummary from './components/OrderSummary';
import ProductCatalogue from './components/productCatalogue';
import ProductDetails from './components/ProductDetails'
import ShoppingCart from './components/ShoppingCart';
/*eslint-enable no-unused-vars*/

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/product-catalogue" element={<ProductCatalogue />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
