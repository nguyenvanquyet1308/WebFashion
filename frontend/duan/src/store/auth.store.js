import { getUserInfo, login } from "apis";
import { toast } from "react-toastify";
import { create } from "zustand";

const showNotification = (type, message) => {
    toast[type](message);
};

export const useAuthStore = create((set) => ({
    userInfo: {
        data: null,
        isLoading: false,
        error: null,
    },
    dataLogin: {
        isLoading: false,
        error: null,
    },
    // fetch user info
    fetchUserInfo: async () => {
        set(() => ({
            userInfo: {
                isLoading: true,
                error: null,
            },
        }));
        try {
            const response = await getUserInfo();
            console.log("🚀 ~ fetchUserInfo: ~ response:", response)
            set(() => ({
                userInfo: {
                    data: response,
                    isLoading: false,
                    error: null,
                },
            }));
            showNotification("success", `Chào mừng ${response.username}`);
        } catch (error) {
            set(() => ({
                userInfo: {
                    isLoading: false,
                    error: error.message,
                },
            }));
        }    
    },

    /// login 
    loginRequest: async (dataPayload, navigate) => {
        set((state) => ({
            dataLogin: {
                isLoading: true,
                error: null,
            },
        }));
        try {
            const response = await login(dataPayload);
            set((state) => ({
                userInfo: {
                    data: response,
                    isLoading: false,
                    error: null,
                },
                dataLogin: {
                    isLoading: false,
                    error: null,
                },
            }));
            showNotification("success", "Đăng nhập thành công.");
            navigate("/");  
        } catch (error) {
            console.log("🚀 ~ loginRequest: ~ error:", error);
            set((state) => ({
                dataLogin: {
                    isLoading: false,
                    error: error.message,
                },
            }));
            showNotification("error", "Tài khoản hoặc mật khẩu sai");
        }
    },



}));