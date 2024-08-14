import React, { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import HomePages from './pages/home/HomePages';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Product from './pages/product/Product';
import ManageProduct from './pages/admin/manageProduct/ManageProduct';
import HeaderAdmin from './pages/admin/headerAdmin/HeaderAdmin';
import ManageCategory from './pages/admin/manageCategory/ManageCategory';
import ShoppingCart from './pages/cart/ShoppingCart';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ManagerUser from './pages/admin/manageUser/ManagerUser';
import SecurityUser from './pages/admin/SecurityUser/SecurityUser';
import PayCart from './pages/Pay/PayCart';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./PrivateRoute"
import Contact from './pages/contact/Contact';
import Register from './pages/register/Register';
import ManageOrders from 'pages/admin/manageOrders/ManageOrders';
import { useAuthStore } from 'store/auth.store';
import MangageStatistical from 'pages/admin/manageStatistical/ManageStatistical';

function App() {
  const location = useLocation();
  const { fetchUserInfo } = useAuthStore()

  useEffect(() => {
    const handleFetchUserInfo = async () => {
        await fetchUserInfo()
    }
    handleFetchUserInfo()
  }, []);
  const isAdminRoute = location.pathname.startsWith('/admin');


  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path='/' element={<HomePages />} />
        <Route path='/product' element={<Product />} />
        <Route path='/admin/*' element={
          <PrivateRoute>
            <HeaderAdmin />
          </PrivateRoute>
        }>
          <Route path='products' element={<ManageProduct />} />
          <Route path='category' element={<ManageCategory />} />
          <Route path='user' element={<ManagerUser />} />
          <Route path='orders' element={<ManageOrders></ManageOrders>} />
          <Route path='SecurityUser' element={<SecurityUser />} />
          <Route path='statistical' element={<MangageStatistical/>} />
        </Route>
        
        <Route path='/contact' element={<Contact></Contact>} />
        <Route path='/register' element={<Register></Register>} />
        <Route path='/login' element={<Login />} />
        <Route path='/shoppingCart' element={<ShoppingCart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/paycart' element={<PayCart />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
