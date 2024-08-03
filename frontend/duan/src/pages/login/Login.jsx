import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import "./Login.scss";
import { useDispatch } from "react-redux";
import { loginCustomer } from "../../components/redux/apiRequest";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [customer, setCustomer] = useState(null); 
    const navigate = useNavigate();
    const dispath = useDispatch();

    
    const handleReduxlogin = (e) => {
        const newCustomer={
           email: email,
           password: password
        }
        loginCustomer(newCustomer,dispath,navigate)
    }


    // const handleCheckLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.get("http://localhost:8080/api/login/authenticate", {
    //             params: { email, password }
    //         });

    //         setCustomer(response.data); 
    //         localStorage.setItem("customer", JSON.stringify(response.data));
    //         console.log("Customer data:", response.data);
    //         toast.success("Đăng nhập thành công!"); 

          
    //         setTimeout(() => {
    //             navigate("/");
    //         }, 2000);
    //     } catch (error) {
    //         console.error("Lỗi đăng nhập:", error);
    //         toast.error("Tài khoản hoặc mật khẩu không chính xác !"); 
    //     }
    // }
    return (
        <>
            <div className="form">
                <div className="login col-md-6">
                    <form onSubmit={handleReduxlogin}>
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="pwd"
                                placeholder="Enter password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-check mb-3">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btnSubmit btn-primary"
                        >
                            Submit
                        </button>
                        <br />
                        <a href="" className="dangky">Đăng ký?</a>

                        <ToastContainer />
                    </form>
                </div>
            </div>


        </>
    );
}

export default Login;
