import {
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
    error: {},
};
const onBoardQueryReducer = (state = initialState, action) => {
    // console.log("hello onBoardQueryReducer reducer called",action)
    switch (action.type) {

        case GET_BRAND_BYID_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_BRAND_BYID_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                brandByIdData:action,
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
                channelByIdData:action,
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
                MarketplaceData:action,
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
                    channelsData:action,
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
                    countryData:action,
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