import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_ROLE,
    USER_BRAND,
    USER_EMAIL,

} from "../types/types";

import { client } from "../../utils/axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

export const userLoginLoading = () => {
    return {
        type: USER_LOGIN_LOADING
    };
};
export const userLoginSuccess = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data,
    };
};
export const userLoginFailure = (error) => {
    return {
        type: USER_LOGIN_FAILURE,
        payload: error,
    };
};

export const userRole = (data) => {
    return {
        type: USER_ROLE,
        payload: data,
    };
};
export const userBrand = (data) => {
    return {
        type: USER_BRAND,
        payload: data,
    };
};
export const userEmail = (data) => {
    return {
        type: USER_EMAIL,
        payload: data,
    };
};

export const userLoginApi = (data) => {
    // console.log("hello  userLoginApi called",data)
    return (dispatch) => {
        dispatch(userLoginLoading('LOGIN....', 'LOGIN'));
        client
            .post("/api/login/userLogin",data)
        .then((response) => {
            console.log("hello userLoginApi",response)
            toast.info("Login Successfully !!!");
                if (response?.data?.statusCode === 201) {
                  
                    console.log("hello Login post==>", response.data);
                    dispatch(userLoginSuccess(response?.data?.statusCode, 'Login Post Successfully', 'LOGIN POST'));
                    dispatch(userRole(response?.data?.result?.role, 'Login role saved Successfully', 'LOGIN DETAILS'));
                    dispatch(userBrand(response?.data?.result?.brand, 'Login brand saved Successfully', 'LOGIN DETAILS'));
                    dispatch(userEmail(response?.data?.result?.email, 'Login email saved Successfully', 'LOGIN DETAILS'));



                    // navigate('/dashboard/dashboard');
                } else throw new Error("")
            })
            .catch((err) => {
                toast.error("User Not Found!!!");
                console.log("error caught in -> actions/login", err);
                dispatch(userLoginFailure(err, 'Something went wrong', 'LOGIN POST'));
            });
    };
};
  