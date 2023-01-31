import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from "../types/types";

import { client } from "../../utils/axios";


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

export const userLoginApi = (data) => {
    // console.log("hello  userLoginApi called",data)
    return (dispatch) => {
        dispatch(userLoginLoading('LOGIN....', 'LOGIN'));
        client
            .post("/api/auth/userLogin",data)
        .then((response) => {
                if (response.status === 200) {
                    console.log("Login post==>", response.data);
                    dispatch(userLoginSuccess(response.data, 'Login Post Successfully', 'LOGIN POST'));
                } else throw new Error("")
            })
            .catch((err) => {
                console.log("error caught in -> actions/login", err);
                dispatch(userLoginFailure(err, 'Something went wrong', 'LOGIN POST'));
            });
    };
};
  