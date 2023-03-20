import {
  BULK_LISTING_DATA_LOADING,
  BULK_LISTING_DATA_SUCCESS,
  BULK_LISTING_DATA_FAILURE,
} from "../types/types";
const initialState = {
  loading: false,
  bulkListData: {},
  error: {},
};
const syncCommandReducer = (state = initialState, action) => {
  // console.log("hello CHANNEL reducer called",action)
  switch (action.type) {
    case BULK_LISTING_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BULK_LISTING_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkListData: action.payload,
        error: {},
      };
    case BULK_LISTING_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        bulkListData: [],
        error: action,
      };
   default:
      return state;
  }
};

export default syncCommandReducer;
