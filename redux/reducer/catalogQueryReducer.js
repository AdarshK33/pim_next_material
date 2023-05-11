import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  GET_ALL_PRODUCT_LIST_LOADING,
  GET_ALL_PRODUCT_LIST_SUCCESS,
  GET_ALL_PRODUCT_LIST_FAILURE,
  GET_CATEGORIES_DATA_LOADING,
  GET_CATEGORIES_DATA_SUCCESS,
  GET_CATEGORIES_DATA_FAILURE,
  REVALIDATE_DATA_LOADING,
  REVALIDATE_DATA_SUCCESS,
  REVALIDATE_DATA_FAILURE,
  STATUS_DATA_LOADING,
  STATUS_DATA_SUCCESS,
  STATUS_DATA_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,
  catagories: {},
  attributeGet: {},
  allProductGet: {},
  createComment: {},
  statusChanged: {},
  // refreshToken:{}
};
const catalogQueryReducer = (state = initialState, action) => {
  // console.log("hello createComment called", action);
  switch (action.type) {
    case ATTRIBUTE_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        attributeGet: action.payload,
        error: {},
      };
    case ATTRIBUTE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        attributeGet: [],
        error: action,
      };
    case GET_ALL_PRODUCT_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        allProductGet: action.payload,
        error: {},
      };
    case GET_ALL_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        allProductGet: [],
        error: action,
      };
    case GET_CATEGORIES_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        catagories: action.payload,
        error: {},
      };
    case GET_CATEGORIES_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err,
      };
    case REVALIDATE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REVALIDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        createComment: action.payload,
        error: {},
      };
    case REVALIDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        createComment: [],
        error: action,
      };
    case STATUS_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STATUS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        statusChanged: action.payload,
        error: {},
      };
    case STATUS_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        statusChanged: [],
        error: action,
      };
    default:
      return state;
  }
};

export default catalogQueryReducer;
