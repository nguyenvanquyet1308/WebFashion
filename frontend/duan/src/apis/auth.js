import axios from "config/axios";


export const login = (data) =>
    axios({
        url: "/login/loginUser",
        method: "post",
        data,
        withCredentials: true,
    });

export const getUserInfo = () =>
    axios({
        url: "/login/getCurrent",
        method: "get",
        withCredentials: true,
    });