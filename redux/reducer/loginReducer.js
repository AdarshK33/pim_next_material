import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from "../types/types";

const initialState = {
    loading: false,
    isLogin: {},
    error: {},
};
const loginReducer = (state = initialState, action) => {
    // console.log("hello loginReducer called",action)
    switch (action.type) {
        case USER_LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogin:action,
                error: {},
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isLogin: [],
                error: action,
            };      
        default:
            return state;
    }
};



export default  loginReducer;