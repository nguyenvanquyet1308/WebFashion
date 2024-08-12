import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './HeaderAdmin.scss';
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const HeaderAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();


    const handleLogout = () => {
        //  Cookies.remove("jwtToken", { path: '/' }); // xóa token khỏi cookie
        Cookies.remove('jwtToken');
        console.log("logout");
        toast.success("Logout thành công");
        navigate("/login");
        navigate(0)
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <div className="wrapper">
                <aside id="sidebar" className={`js-sidebar ${collapsed ? 'collapsed' : ''}`}>
                    <div className="sidebar-item">
                        <Link to={'/admin/products'} >  Manage Product</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to={'/admin/category'} >  Manage Category</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to={'/admin/user'} >  Manage Customer</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to={'/admin/orders'} >  Manage Orders</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to={'/admin/SecurityUser'} > Manage Security User</Link>
                    </div>
                    <div className="sidebar-item">
                        <Link to={'/admin/statistical'} >Manage Statistical</Link>
                    </div>
                </aside>
                <div className="main">
                    <nav className="navbar navbar-expand px-3 border-bottom">
                        <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse navbar">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                                        <img className='iconUser' src="./images/user.jpg" alt="Profile" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a href="/" className="dropdown-item">Home</a>
                                        <a href="#" className="dropdown-item">Setting</a>
                                        <a className="dropdown-item" onClick={handleLogout} >Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main className="content px-3 py-2">
                        <div className="container">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default HeaderAdmin;
