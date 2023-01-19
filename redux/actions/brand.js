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
import { client } from "../../utils/axios";


export const createBrandDataLoading = () => {
    return {
        type: CREATE_BRAND_DATA_LOADING
    };
};
export const createBrandDataSuccess = (data) => {
    return {
        type: CREATE_BRAND_DATA_SUCCESS,
        payload: data,
    };
};
export const createBrandDataFailure = (error) => {
    return {
        type: CREATE_BRAND_DATA_FAILURE,
        payload: error,
    };
};



export const getBrandDataLoading = () => {
    return {
        type: GET_BRAND_DATA_LOADING
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


export const updateBrandDataLoading = () => {
    return {
        type: UPDATE_BRAND_DATA_LOADING
    };
};
export const updateBrandDataSuccess = (data) => {
    return {
        type: UPDATE_BRAND_DATA_SUCCESS,
        payload: data,
    };
};
export const updateBrandDataFailure = (error) => {
    return {
        type: UPDATE_BRAND_DATA_FAILURE,
        payload: error,
    };
};

export const createBrandApi = (data) => {
    // console.log("hello  brandPageApi called",data)
    return (dispatch) => {
        dispatch(createBrandDataLoading('BRAND....', 'BRAND'));
        client
            .post("/api/onboard/createBrand",data)
        .then((response) => {
                if (response.status === 200) {
                    console.log("BrandGreat==>", response.data);
                    dispatch(createBrandDataSuccess(response.data, 'Brand Create Successfully', 'BRAND CREATE'));
                } else throw new Error("")
            })
            .catch((err) => {
                console.log("error caught in -> actions/brand/brand", err);
                dispatch(createBrandDataFailure(err, 'Something went wrong', 'BRAND CREATE'));
            });
    };
};

export const getBrandApi = () => {
  
    return (dispatch) => {
      dispatch(getBrandDataLoading('BRAND....', 'BRAND'));
      client.get("/api/onboard/getBrand")
        .then((response) => {
          console.log("api response",response)
        //   console.log(response)
          if (response?.data?.statusCode === 200) {
              console.log("API SUCCESS2", response.data.result);
            dispatch(getBrandDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/brand/brand GET =>FAILURE", err);
          dispatch(getBrandDataFailure(err));
        });
    };
  };

export const updateBrandApi = (data) => {
    // console.log("hello  brandPageApi called",data)
    return (dispatch) => {
        dispatch(updateBrandDataLoading('BRAND....', 'BRAND'));
        client
            .post("/api/onboard/updateBrand",data)
        .then((response) => {
                if (response.status === 200) {
                    console.log("BrandGreat==>", response.data);
                    dispatch(updateBrandDataSuccess(response.data, 'Brand Update Successfully', 'BRAND UPDATE'));
                } else throw new Error("")
            })
            .catch((err) => {
                console.log("error caught in -> actions/brand/brand", err);
                dispatch(updateBrandDataFailure(err, 'Something went wrong', 'BRAND UPDATE'));
            });
    };
};
  