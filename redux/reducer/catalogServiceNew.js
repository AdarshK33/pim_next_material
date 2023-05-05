import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  GET_ALL_PRODUCT_LOADING,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,

  attributeGet: {},
  getAllProducts: {},

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

    case GET_ALL_PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllProducts: action.payload,
        error: {},
      };
    case GET_ALL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        getAllProducts: [],
        error: action,
      };

    default:
      return state;
  }
};

export default catalogServiceNewReducer;
