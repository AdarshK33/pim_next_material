import {

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
import { client } from "../../utils/axios";


export const getChannelsDataLoading = () => {
    return {
        type: GET_CHANNELS_DATA_LOADING
    };
};
export const getChannelsDataSuccess = (data) => {
    return {
        type: GET_CHANNELS_DATA_SUCCESS,
        payload: data,
    };
};
export const getChannelsDataFailure = (error) => {
    return {
        type: GET_CHANNELS_DATA_FAILURE,
        payload: error,
    };
};

export const getCountryDataLoading = () => {
    return {
        type: GET_COUNTRY_DATA_LOADING
    };
};
export const getCountryDataSuccess = (data) => {
    return {
        type: GET_COUNTRY_DATA_SUCCESS,
        payload: data,
    };
};
export const getCountryDataFailure = (error) => {
    return {
        type: GET_COUNTRY_DATA_FAILURE,
        payload: error,
    };
};

export const getMarketplaceDataLoading = () => {
    return {
        type: GET_MARKETPLACE_DATA_LOADING
    };
};
export const getMarketplaceDataSuccess = (data) => {
    return {
        type: GET_MARKETPLACE_DATA_SUCCESS,
        payload: data,
    };
};
export const getMarketplaceDataFailure = (error) => {
    return {
        type: GET_MARKETPLACE_DATA_FAILURE,
        payload: error,
    };
};




export const getMarketplaceApi = () => {
    return (dispatch) => {
      dispatch(getMarketplaceDataLoading('MARKETPLACE....', 'MARKETPLACE'));
      client.get("/api/onboardQuery/getMarketplace")
        .then((response) => {
          console.log("api response",response)
        //   console.log(response)
          if (response?.data?.statusCode === 200) {
              console.log("API SUCCESS2", response.data.result);
            dispatch(getMarketplaceDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/onbaordQuery GET MARKETPLACE =>FAILURE", err);
          dispatch(getMarketplaceDataFailure(err));
        });
    };
  };

export const getCountryApi = () => {
    return (dispatch) => {
      dispatch(getCountryDataLoading('COUNTRY....', 'COUNTRY'));
      client.get("/api/onboardQuery/getCountry")
        .then((response) => {
          console.log("api response",response)
        //   console.log(response)
          if (response?.data?.statusCode === 200) {
              console.log("API SUCCESS2", response.data.result);
            dispatch(getCountryDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET COUNTRY =>FAILURE", err);
          dispatch(getCountryDataFailure(err));
        });
    };
  };


export const getChannelsApi = () => {
    return (dispatch) => {
      dispatch(getChannelsDataLoading('CHANNELS....', 'CHANNELS'));
      client.get("/api/onboardQuery/getChannels")
        .then((response) => {
          console.log("api response",response)
        //   console.log(response)
          if (response?.data?.statusCode === 200) {
              console.log("API SUCCESS2", response.data.result);
            dispatch(getChannelsDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET CHANNELS =>FAILURE", err);
          dispatch(getChannelsDataFailure(err));
        });
    };
  };


