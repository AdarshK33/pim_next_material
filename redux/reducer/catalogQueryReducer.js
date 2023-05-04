import {
  CATEGORY_DROPDOWN_LIST_LOADING,
  CATEGORY_DROPDOWN_LIST_SUCCESS,
  CATEGORY_DROPDOWN_LIST_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,

  categoryDropdown: [],

  // refreshToken:{}
};
const catalogQueryReducer = (state = initialState, action) => {
  // console.log("hello loginReducer called",action)
  switch (action.type) {
    case CATEGORY_DROPDOWN_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DROPDOWN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryDropdown: action.payload,
        error: {},
      };
    case CATEGORY_DROPDOWN_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        categoryDropdown: [],
        error: action,
      };

    default:
      return state;
  }
};

export default catalogQueryReducer;
