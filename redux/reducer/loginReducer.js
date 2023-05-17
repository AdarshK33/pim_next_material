import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_AT,
  USER_LOGIN_RT,
  USER_ROLE,
  USER_BRAND,
  USER_EMAIL,
  GET_USER_LIST_DATA_LOADING,
  GET_USER_LIST_DATA_SUCCESS,
  GET_USER_LIST_DATA_FAILURE,
  GET_ROLE_DATA_LOADING,
  GET_ROLE_DATA_SUCCESS,
  GET_ROLE_DATA_FAILURE,
  CREATE_USER_DATA_LOADING,
  CREATE_USER_DATA_SUCCESS,
  CREATE_USER_DATA_FAILURE,
  GET_ROLES_PRIVILEGE_LOADING,
  GET_ROLES_PRIVILEGE_SUCCESS,
  GET_ROLES_PRIVILEGE_FAILURE,
  MY_PROFILE_DATA_LOADING,
  MY_PROFILE_DATA_SUCCESS,
  MY_PROFILE_DATA_FAILURE,
  UPDATE_USER_DATA_LOADING,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  GET_USER_BY_ID_LOADING,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  FILTER_USER_LOADING,
  FILTER_USER_SUCCESS,
  FILTER_USER_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,
  isLogin: {}, //storing status login time 201 //logout time 0
  error: {},
  loginUser: {},
  userEmail: [],
  userRole: [],
  userBrand: [],
  userGet: {},
  roleGet: {},
  newUser: {},
  rolePrivilege: {},
  myProfile: {},
  updateUser: {},
  getByIdUser: {},
  getIdUser: {},
  filterUser:{},
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
        isLogin: action.payload,
        error: {},
      };
    case USER_ROLE:
      return {
        ...state,
        loading: false,
        userRole: action.payload,
        error: {},
      };
    case USER_BRAND:
      return {
        ...state,
        loading: false,
        userBrand: action.payload,
        error: {},
      };
    case USER_EMAIL:
      return {
        ...state,
        loading: false,
        userEmail: action.payload,
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
    case GET_USER_LIST_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userGet: action.payload,
        error: {},
      };
    case GET_USER_LIST_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        userGet: [],
        error: action,
      };

    case GET_ROLE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ROLE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        roleGet: action.payload,
        error: {},
      };
    case GET_ROLE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        roleGet: [],
        error: action,
      };

    case CREATE_USER_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        newUser: action.payload,
        error: {},
      };
    case CREATE_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        newUser: [],
        error: action,
      };

    case GET_ROLES_PRIVILEGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ROLES_PRIVILEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        rolePrivilege: action.payload,
        error: {},
      };
    case GET_ROLES_PRIVILEGE_FAILURE:
      return {
        ...state,
        loading: false,
        rolePrivilege: [],
        error: action,
      };
    case MY_PROFILE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MY_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        myProfile: action.payload,
        error: {},
      };
    case MY_PROFILE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        myProfile: [],
        error: action,
      };
    case UPDATE_USER_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUser: action.payload,
        error: {},
      };
    case UPDATE_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        updateUser: [],
        error: action,
      };

    case GET_USER_BY_ID_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        getIdUser: action.payload,
        error: {},
      };
    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        getIdUser: [],
        error: action,
      };

      case FILTER_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FILTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        filterUser: action.payload,
        error: {},
      };
    case FILTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        filterUser: [],
        error: action,
      };

    default:
      return state;
  }
};

export default loginReducer;
