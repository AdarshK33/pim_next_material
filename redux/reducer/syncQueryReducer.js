import {

    GET_TEMPLATE_DATA_LOADING,
  GET_TEMPLATE_DATA_SUCCESS,
  GET_TEMPLATE_DATA_FAILURE,
 
 
} from "../types/types";
const initialState = {
    loading: false,
    templateData: {},
    error: {},
};
const syncQueryReducer = (state = initialState, action) => {
    //console.log("hello syncQueryReducer reducer called",action.payload)
    switch (action.type) {
        case  GET_TEMPLATE_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case  GET_TEMPLATE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                templateData:action.payload,
                error: {},
            };
        case  GET_TEMPLATE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                templateData: [],
            error: action,
        };

           default:
            return state;
    }
};



export default syncQueryReducer ;