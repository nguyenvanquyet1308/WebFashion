import axios from "axios";
import { loginError, loginStart, loginSuccess } from "./customerSlice";
import { toast } from "react-toastify";

export const loginCustomer = async (customer, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const response = await axios.post("http://localhost:8080/api/login/loginUser", customer, {
            withCredentials: true
        });
        navigate("/")
        toast.success("Đăng nhập thành công");
        dispatch(loginSuccess(response.data));
                   
    } catch (error) {
        dispatch(loginError());
    }
}
