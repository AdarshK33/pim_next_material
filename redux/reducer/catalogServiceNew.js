import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  BULK_UPLOAD_LOADING,
  BULK_UPLOAD_SUCCESS,
  BULK_UPLOAD_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,

  attributeGet: {},
  bulkUpload: {},

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

    default:
      return state;
  }
};

export default catalogServiceNewReducer;
