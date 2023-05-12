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
  CREATE_ATTRIBUTE_SET_LOADING,
  CREATE_ATTRIBUTE_SET_SUCCESS,
  CREATE_ATTRIBUTE_SET_FAILURE,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  PRODUCT_UPDATE_DATA_LOADING,
  PRODUCT_UPDATE_DATA_SUCCESS,
  PRODUCT_UPDATE_DATA_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,
  attributeGet: {},
  getAllProducts: {},
  bulkUpload: {},
  productPimCodeData: {},
  createAttributeSet: {},
  productUpdate: {},
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

    case CREATE_ATTRIBUTE_SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ATTRIBUTE_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        createAttributeSet: action.payload,
        error: {},
      };
    case CREATE_ATTRIBUTE_SET_FAILURE:
      return {
        ...state,
        loading: false,
        createAttributeSet: [],
        error: action,
      };
    case PRODUCT_UPDATE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        productUpdate: action.payload,
        error: {},
      };
    case PRODUCT_UPDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        productUpdate: [],
        error: action,
      };

    default:
      return state;
  }
};

export default catalogServiceNewReducer;
