import {
    CREATE_BULK_DATA_LOADING,
    CREATE_BULK_DATA_SUCCESS,
    CREATE_BULK_DATA_FAILURE
} from "../types/types";
const initialState = {
    loading: false,
    bulkCreate: {},
    error: {},
};
const bulkReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BULK_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CREATE_BULK_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                bulkCreate: action,
                error: {},
            };
        case CREATE_BULK_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                bulkCreate: [],
                error: action,
            };
        default:
            return state;
    }
};



export default bulkReducer;