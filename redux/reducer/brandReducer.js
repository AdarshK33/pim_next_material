import {
    CREATE_BRAND_DATA_LOADING,
    CREATE_BRAND_DATA_SUCCESS,
   CREATE_BRAND_DATA_FAILURE,
   GET_BRAND_DATA_LOADING,
   GET_BRAND_DATA_SUCCESS,
   GET_BRAND_DATA_FAILURE,
   UPDATE_BRAND_DATA_LOADING,
   UPDATE_BRAND_DATA_SUCCESS,
   UPDATE_BRAND_DATA_FAILURE
 
} from "../types/types";
const initialState = {
    loading: false,
    brandCreate: {},
    brandGet:{},
    brandUpdate:{},
    error: {},
};
const brandReducer = (state = initialState, action) => {
    // console.log("hello brand reducer called",action)
    switch (action.type) {
        case CREATE_BRAND_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CREATE_BRAND_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                brandCreate:action,
                error: {},
            };
        case CREATE_BRAND_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                brandCreate: [],
                error: action,
            };
            case  GET_BRAND_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
            case  GET_BRAND_DATA_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    brandGet:action,
                    error: {},
                };
            case  GET_BRAND_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                brandGet: [],
                error: action,
            };
            case  UPDATE_BRAND_DATA_LOADING:
                return {
                    ...state,
                    loading: true,
                };
            case  UPDATE_BRAND_DATA_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    brandUpdate:action,
                    error: {},
                };
            case  UPDATE_BRAND_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                    brandUpdate: [],
                    error: action,
                };
        default:
            return state;
    }
};



export default brandReducer;