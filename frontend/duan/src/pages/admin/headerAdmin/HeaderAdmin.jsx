import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './HeaderAdmin.scss';
import { Link, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const HeaderAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);

    const customer = useSelector((state) => state.customer.userInfo.data)

    


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
                        <span >Manage Oders</span>
                    </div>
                    <div className="sidebar-item">
                    <Link to={'/admin/SecurityUser'} >  Security User</Link>
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
                                            <a href="#" className="dropdown-item">Profile</a>
                                            <a href="#" className="dropdown-item">Setting</a>
                                         <Link to="/login"><a className="dropdown-item">Logout</a></Link>   
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
