// import axios from "axios";
// import { loginError, loginStart, loginSuccess } from "./customerSlice";
// import { toast } from "react-toastify";

// export const loginCustomer = async (customer, dispatch, callbackSuccess) => {
//     dispatch(loginStart());
//     try {
//         const response = await axios.post("http://localhost:8080/api/login/loginUser", customer, {
//             withCredentials: true
//         });
//         toast.success("Đăng nhập thành công");
//         callbackSuccess();
//         dispatch(loginSuccess(response.data));
//     } catch (error) {
//         console.log("Lỗi ngya đây ");
//         toast.error("Tài khoản và mật khâu không chính xác !")
//         dispatch(loginError());
//     }
// }
