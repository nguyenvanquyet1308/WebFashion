import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Cookies from 'js-cookie';

import "../header/Header.scss";
import { toast } from 'react-toastify';
import { useAuthStore } from 'store/auth.store';

const Header = () => {
    const { userInfo } = useAuthStore()
    const navigate = useNavigate();


    const handleLogout = () => {
        Cookies.remove('jwtToken');
        console.log("logout");
        toast.success("Logout thành công");
        navigate(0);
    };

    const isAdmin =  userInfo.data && userInfo.data.roleNames && userInfo.data.roleNames.some(role => role === 'ADMIN');

    return (
        <>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <a className="navbar-brand">Fashion Store</a>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/shoppingCart">
                                <img src="./images/add-to-cart.svg" className='cart' alt="" />
                            </Link>
                        </li>
                        {
                            userInfo.data ?
                                (
                                    <li>
                                        <div className="navbar-collapse navbar">
                                            <ul className="navbar-nav">
                                                <li className="nav-item dropdown">
                                                    <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                                                        <img className='iconUser' src="./images/user.jpg" alt="Profile" />
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                                        <a href="#" className="dropdown-item">Setting</a>
                                                        <a href="#" className="dropdown-item" onClick={handleLogout}>Logout</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )
                                :
                                (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" style={{marginTop:"10px",fontSize: "15px"}}>Login</Link>
                                    </li>
                                )
                        }

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Header;