import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_AT,
    USER_LOGIN_RT,
    USER_ROLE,
    USER_BRAND,
    USER_EMAIL
} from "../types/types";

const initialState = {
    loading: false,
    isLogin: {}, //storing status login time 201 //logout time 0
    error: {},
    loginUser:{},
    userEmail:[],
    userRole:[],
    userBrand:[],
    // accessToken:{},
    // refreshToken:{}
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
                isLogin:action.payload,
                error: {},
            };
        case USER_ROLE:
                return {
                    ...state,
                    loading: false,
                    userRole:action.payload,
                    error: {},
                };
        case USER_BRAND:
                    return {
                        ...state,
                        loading: false,
                        userBrand:action.payload,
                        error: {},
                    };
        case USER_EMAIL:
                        return {
                            ...state,
                            loading: false,
                        userEmail:action.payload,
                            error: {},
                        };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isLogin: [],
                error: action,
            };
        // case USER_LOGIN_AT:
        //         return {
        //             ...state,
        //             loading: false,
        //             accessToken:action.at,
        //             error: {},
        //         }; 
        // case USER_LOGIN_RT:
                    // return {
                    //     ...state,
                    //     loading: false,
                    //     refreshToken:action.rt,
                    //     error: {},
                    // };              
        default:
            return state;
    }
};



export default  loginReducer;