import axios from "axios";
import { getInfoUserRequest , getInfoUserSuccess, getInfoUserError } from "../redux/customerSlice"
import { toast } from "react-toastify";

export const getCurrent = async ({dispatch}) => {
    dispatch(getInfoUserRequest());
    try {
        const response = await axios.get("http://localhost:8080/api/login/getCurrent", {
            withCredentials  : true
        })
        console.log("🚀 ~ getCurrent ~ response:", response)
        dispatch(getInfoUserSuccess({data : response.data}))
    } catch (error) {
        dispatch(getInfoUserError({error}))
    }
}