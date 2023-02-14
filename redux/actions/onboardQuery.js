import {

  GET_BRAND_DROPDOWN_DATA_LOADING,
  GET_BRAND_DROPDOWN_DATA_SUCCESS,
  GET_BRAND_DROPDOWN_DATA_FAILURE,
  
    GET_CHANNEL_BYID_DATA_LOADING,
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
    
    GET_BRAND_DATA_LOADING,
    GET_BRAND_DATA_SUCCESS,
    GET_BRAND_DATA_FAILURE,

} from "../types/types";
import { client } from "../../utils/axios";

export const getBrandDataLoading = () => {
  return {
    type: GET_BRAND_DATA_LOADING,
  };
};
export const getBrandDataSuccess = (data) => {
  return {
    type: GET_BRAND_DATA_SUCCESS,
    payload: data,
  };
};
export const getBrandDataFailure = (error) => {
  return {
    type: GET_BRAND_DATA_FAILURE,
    payload: error,
  };
};



export const getBrandDropdownDataLoading = () => {
  return {
    type: GET_BRAND_DROPDOWN_DATA_LOADING,
  };
};
export const getBrandDropdownSuccess = (data) => {
  return {
    type: GET_BRAND_DROPDOWN_DATA_SUCCESS,
    payload: data,
  };
};
export const getBrandDropdownFailure = (error) => {
  return {
    type: GET_BRAND_DROPDOWN_DATA_FAILURE,
    payload: error,
  };
};





export const getBrandByIdDataLoading = () => {
  return {
      type: GET_BRAND_BYID_DATA_LOADING
  };
};
export const getBrandByIdDataSuccess = (data) => {
  return {
      type: GET_BRAND_BYID_DATA_SUCCESS,
      payload: data,
  };
};
export const getBrandByIdDataFailure = (error) => {
  return {
      type: GET_BRAND_BYID_DATA_FAILURE,
      payload: error,
  };
};

export const getChannelByIdDataLoading = () => {
  return {
      type: GET_CHANNEL_BYID_DATA_LOADING
  };
};
export const getChannelByIdDataSuccess = (data) => {
  return {
      type: GET_CHANNEL_BYID_DATA_SUCCESS,
      payload: data,
  };
};
export const getChannelByIdDataFailure = (error) => {
  return {
      type: GET_CHANNEL_BYID_DATA_FAILURE,
      payload: error,
  };
};



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
  // console.log("hello action",data)
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
          if (response?.status === 200) {
              console.log("API SUCCESS2", response.data);
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
          console.log("hello api response",response.status)
        //   console.log(response)
          if (response?.status === 200 ) {
              console.log("hello API SUCCESS2", response);
            dispatch(getCountryDataSuccess(response.data));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET COUNTRY =>FAILURE", err);
          dispatch(getCountryDataFailure(err));
        });
    };
  };

export const getBrandDropdownApi = () => {
    return (dispatch) => {
      dispatch(getBrandDropdownDataLoading('GET BRAND....', 'DROPDOWN'));
      client.get("/api/onboardQuery/getBrandDropdown")
        .then((response) => {
          console.log("hello getbrandDropdown",response)
        //   console.log(response)
          if (response?.status === 200 ) {
              console.log("hello API status getbrandDropdown", response);
            dispatch(getBrandDropdownSuccess(response.data));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET BRAND => DROPDOWN FAILURE", err);
          dispatch(getBrandDropdownFailure(err));
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

export const getChannelByIdApi = (data) => {
    return (dispatch) => {
      dispatch(getChannelByIdDataLoading('CHANNEL BY ID....', 'CHANNEL BY ID'));
      client.get("/api/onboardQuery/getChannelById",data)
        .then((response) => {
          console.log("api response",response)
        //   console.log(response)
          if (response?.data?.statusCode === 200) {
              console.log("API SUCCESS2", response.data.result);
            dispatch(getChannelByIdDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET CHANNEL BY ID =>FAILURE", err);
          dispatch(getChannelByIdDataFailure(err));
        });
    };
  };

export const getBrandByIdApi = (brandId) => {
  const data = {
    brandId: brandId
  }

  // console.log("hello redux getBrandByIdApi",data)
    return (dispatch) => {
      dispatch(getBrandByIdDataLoading('BRAND BY ID....', 'BRAND BY ID'));
      client
      .post("/api/onboardQuery/getBrandById",data)
      .then((response) => {
          console.log("api response",response)
        //   console.log(response)
          if (response?.status=== 200) {
              console.log("API SUCCESS2", response.data.result);
            dispatch(getBrandByIdDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET BRAND BY ID =>FAILURE", err);
          dispatch(getBrandByIdDataFailure(err));
        });
    };
  };

export const getBrandListApi = (pageNumber,pageSize) => {

  
  const data = {
    pageNumber: pageNumber,
    pageSize: pageSize
  }

  // console.log("hello action data ",data)
    return (dispatch) => {
      dispatch(getBrandDataLoading("BRAND....", "BRAND"));
      client
        .post("/api/onboardQuery/getBrand",data)
        .then((response) => {
        // console.log("api response", response);
        if (response?.status === 200) {
            // console.log("API SUCCESS2", response.data.result);
            dispatch(getBrandDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/brand/brand GET =>FAILURE", err);
          dispatch(getBrandDataFailure(err));
        });
    };
  };
