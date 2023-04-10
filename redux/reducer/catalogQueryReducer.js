import {
    GET_ALL_PRODUCT_DATA_LOADING,
    GET_ALL_PRODUCT_DATA_SUCCESS,
    GET_ALL_PRODUCT_DATA_FAILURE,

    GET_ATTRIBUTES_DATA_LOADING, //pass BRAND NAME
    GET_ATTRIBUTES_DATA_SUCCESS,
    GET_ATTRIBUTES_DATA_FAILURE ,

    GET_CATEGORIES_DATA_LOADING ,
    GET_CATEGORIES_DATA_SUCCESS,
    GET_CATEGORIES_DATA_FAILURE,
  
    GET_ATTRIBUTES_BYID_DATA_LOADING,
    GET_ATTRIBUTES_BYID_DATA_SUCCESS,
    GET_ATTRIBUTES_BYID_DATA_FAILURE,
    
    GET_ATTRIBUTES_GROUP_DATA_LOADING,
    GET_ATTRIBUTES_GROUP_DATA_SUCCESS,
    GET_ATTRIBUTES_GROUP_DATA_FAILURE,

    GET_PRODUCT_PIM_MODEL_CODE_LOADING,
    GET_PRODUCT_PIM_MODEL_CODE_SUCCESS,
    GET_PRODUCT_PIM_MODEL_CODE_FAILURE,


} from "../types/types";
const initialState = {
    loading: false,
    allProductData: {},
    attributesData:{},
    categoriesData:[],

    attributesByIdData:{},
    attributesGroupData:{},
    productPimCodeData:{},
    error: {},
};
const catalogQueryReducer = (state = initialState, action) => {
    //console.log("hello onBoardQueryReducer reducer called",action.payload)
    switch (action.type) {
        case  GET_ALL_PRODUCT_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case  GET_ALL_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                allProductData:action.payload,
                error: {},
            };
        case  GET_ALL_PRODUCT_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                allProductData: [],
                error: action,
        };

        case  GET_ATTRIBUTES_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case  GET_ATTRIBUTES_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                attributesData:action.payload,
                error: {},
            };
        case  GET_ATTRIBUTES_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                    attributesData: [],
                    error: action,
            };
        case GET_CATEGORIES_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_CATEGORIES_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                categoriesData:action.payload,
                error: {},
            };
        case GET_CATEGORIES_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                categoriesData: [],
                error: action,
            };

        case GET_ATTRIBUTES_BYID_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_ATTRIBUTES_BYID_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                attributesByIdData:action.payload,
                error: {},
            };
        case GET_ATTRIBUTES_BYID_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                attributesByIdData: [],
                error: action,
            };

        case GET_ATTRIBUTES_GROUP_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_ATTRIBUTES_GROUP_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                attributesGroupData:action.payload,
                error: {},
            };
        case GET_ATTRIBUTES_GROUP_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                attributesGroupData: [],
                error: action,
            };
        case  GET_PRODUCT_PIM_MODEL_CODE_LOADING:
        return {
            ...state,
            loading: true,
        };
        case  GET_PRODUCT_PIM_MODEL_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                productPimCodeData:action.payload,
                error: {},
            };
        case  GET_PRODUCT_PIM_MODEL_CODE_FAILURE:
                return {
                    ...state,
                    loading: false,
                    productPimCodeData: [],
                   error: action,
            };
        default:
            return state;
    }
};



export default catalogQueryReducer;