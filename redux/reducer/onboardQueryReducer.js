import {

    GET_BRAND_DROPDOWN_DATA_LOADING,
    GET_BRAND_DROPDOWN_DATA_SUCCESS,
    GET_BRAND_DROPDOWN_DATA_FAILURE,
    
    GET_BRAND_DATA_LOADING,
    GET_BRAND_DATA_SUCCESS,
    GET_BRAND_DATA_FAILURE,

    GET_CHANNEL_BYID_DATA_LOADING ,
    GET_CHANNEL_BYID_DATA_SUCCESS,
    GET_CHANNEL_BYID_DATA_FAILURE,

    GET_BRAND_BYID_DATA_LOADING ,
    GET_BRAND_BYID_DATA_SUCCESS,
    GET_BRAND_BYID_DATA_FAILURE,

    GET_MARKETPLACE_DATA_LOADING ,
    GET_MARKETPLACE_DATA_SUCCESS,
    GET_MARKETPLACE_DATA_FAILURE,
    
    GET_CHANNELS_DATA_LOADING ,
    GET_CHANNELS_DATA_SUCCESS,
    GET_CHANNELS_DATA_FAILURE,

    GET_COUNTRY_DATA_LOADING ,
    GET_COUNTRY_DATA_SUCCESS,
    GET_COUNTRY_DATA_FAILURE,
 
} from "../types/types";
const initialState = {
    loading: false,
    countryData: {},
    MarketplaceData:{},
    channelsData:{},
    channelByIdData:{},
    brandByIdData:{},
    brandGet:{},
    brandDropdownGet:{},
    error: {},
};
const onBoardQueryReducer = (state = initialState, action) => {
    //console.log("hello onBoardQueryReducer reducer called",action.payload)
    switch (action.type) {
        case  GET_BRAND_DROPDOWN_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case  GET_BRAND_DROPDOWN_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                brandDropdownGet:action.payload,
                error: {},
            };
        case  GET_BRAND_DROPDOWN_DATA_FAILURE:
            return {
                ...state,
                loading: false,
            brandDropdownGet: [],
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
                brandGet:action.payload,
                error: {},
            };
        case  GET_BRAND_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                brandGet: [],
                error: action,
            };
        case GET_BRAND_BYID_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_BRAND_BYID_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                brandByIdData:action.payload,
                error: {},
            };
        case GET_BRAND_BYID_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                brandByIdData: [],
                error: action,
            };

        case GET_CHANNEL_BYID_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_CHANNEL_BYID_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                channelByIdData:action.payload,
                error: {},
            };
        case GET_CHANNEL_BYID_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                channelByIdData: [],
                error: action,
            };

        case GET_MARKETPLACE_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_MARKETPLACE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                MarketplaceData:action.payload,
                error: {},
            };
        case GET_MARKETPLACE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                MarketplaceData: [],
                error: action,
            };
            case  GET_CHANNELS_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
            case  GET_CHANNELS_DATA_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    channelsData:action.payload,
                    error: {},
                };
            case  GET_CHANNELS_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                channelsData: [],
                error: action,
            };
            case  GET_COUNTRY_DATA_LOADING:
                return {
                    ...state,
                    loading: true,
                };
            case  GET_COUNTRY_DATA_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    countryData:action.payload,
                    error: {},
                };
            case  GET_COUNTRY_DATA_FAILURE:
                return {
                    ...state,
                    loading: false,
                    countryData: [],
                    error: action,
                };
        default:
            return state;
    }
};



export default onBoardQueryReducer;