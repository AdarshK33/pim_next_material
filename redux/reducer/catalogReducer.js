import {
    CREATE_CATEGORY_DATA_LOADING,
    CREATE_CATEGORY_DATA_SUCCESS,
    CREATE_CATEGORY_DATA_FAILURE,

    UPDATE_CATEGORY_DATA_LOADING ,
    UPDATE_CATEGORY_DATA_SUCCESS,
    UPDATE_CATEGORY_DATA_FAILURE ,

    ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_LOADING,
    ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_SUCCESS,
    ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_FAILURE,

    ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_LOADING,
    ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_SUCCESS,
    ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_FAILURE,

    CREATE_GROUP_DATA_LOADING,
    CREATE_GROUP_DATA_SUCCESS,
    CREATE_GROUP_DATA_FAILURE
 
} from "../types/types";
const initialState = {
    loading: false,
    categoryCreate: {},
    categoryUpdate:{},
    attributeGroupCreate:{},
    attributeGroupUpdate:{},
    groupCreate:{},
    error: {},
}; 
const catalogReducer = (state = initialState, action) => {
    // console.log("hello brand reducer called",action)
    switch (action.type) {
        case CREATE_CATEGORY_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CREATE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryCreate:action,
                error: {},
            };
        case CREATE_CATEGORY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                categoryCreate: [],
                error: action,
            };
            
        case  UPDATE_CATEGORY_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case  UPDATE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryUpdate:action,
                error: {},
            };
        case  UPDATE_CATEGORY_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                    categoryUpdate: [],
                    error: action,
                };

        case ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                attributeGroupCreate:action,
                error: {},
            };
        case ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        attributeGroupCreate: [],
                        error: action,
                    };
               

        case ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                attributeGroupUpdate:action,
                error: {},
            };
        case ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                attributeGroupUpdate: [],
                error: action,
            };
             
            
        case CREATE_GROUP_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CREATE_GROUP_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                groupCreate:action,
                error: {},
            };
        case CREATE_GROUP_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                groupCreate: [],
                error: action,
            };
          
        default:
            return state;
    }
};



export default catalogReducer;