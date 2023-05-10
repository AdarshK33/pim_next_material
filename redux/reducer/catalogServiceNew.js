import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  GET_ALL_PRODUCT_LIST_LOADING,
  GET_ALL_PRODUCT_LIST_SUCCESS,
  GET_ALL_PRODUCT_LIST_FAILURE,
  BULK_UPLOAD_LOADING,
  BULK_UPLOAD_SUCCESS,
  BULK_UPLOAD_FAILURE,
  GET_PRODUCT_DETAILS_LOADING,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,
  attributeGet: {},
  getAllProducts: {},
  bulkUpload: {},
  productPimCodeData: {},

  // refreshToken:{}
};
const catalogServiceNewReducer = (state = initialState, action) => {
  // console.log("hello loginReducer called",action)
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
        getAllProducts: action.payload,
        error: {},
      };
    case GET_ALL_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        getAllProducts: [],
        error: action,
      };

    case BULK_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkUpload: action.payload,
        error: {},
      };
    case BULK_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        bulkUpload: [],
        error: action,
      };

    case GET_PRODUCT_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productPimCodeData: action.payload,
        error: {},
      };
    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        productPimCodeData: [],
        error: action,
      };
    case ADD_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        catagories: action.payload,
        error: {},
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,

        error: action.err,
      };

    default:
      return state;
  }
};

export default catalogServiceNewReducer;
