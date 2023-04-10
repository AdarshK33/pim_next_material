import {
  CREATE_BRAND_DATA_LOADING,
  CREATE_BRAND_DATA_SUCCESS,
  CREATE_BRAND_DATA_FAILURE,
  GET_BRAND_DATA_LOADING,
  GET_BRAND_DATA_SUCCESS,
  GET_BRAND_DATA_FAILURE,
  UPDATE_BRAND_DATA_LOADING,
  UPDATE_BRAND_DATA_SUCCESS,
  UPDATE_BRAND_DATA_FAILURE,
} from "../types/types";
import { client } from "../../utils/axios";
import { toast } from "react-toastify";

export const createBrandDataLoading = () => {
  return {
    type: CREATE_BRAND_DATA_LOADING,
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


export const updateBrandDataLoading = () => {
  return {
    type: UPDATE_BRAND_DATA_LOADING,
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
// console.log("hello  brandPageApi called", data);
return (dispatch) => {
    dispatch(createBrandDataLoading("BRAND....", "BRAND"));
    client
      .post("/api/onboard/createBrand", data)
      .then((response) => {
        // console.log("-------CREATE--------", response);
        if (response.data.statusCode === 201) {
          toast.info("Brand Name added Successfully !!!");
          // console.log("BrandGreat==>", response.data.result);
          dispatch(
            createBrandDataSuccess(
              response.data.statusCode,
              "Brand Create Successfully",
              "BRAND CREATE"
            )
          );
        } 
        else{
          toast.error("Brand Failed!!!");
          //  throw new Error("");
        }
      })
      .catch((err) => {
        toast.error("Brand Failed!!!");
        console.log("error caught in -> actions/brand/create", err);
        dispatch(
          createBrandDataFailure(err, "Something went wrong", "BRAND CREATE")
        );
      });
  };
};



export const updateBrandApi = (info) => {
  //console.log("hello  brandupdateApi info",info)
  const data = {
        brandId:info?.brandId,
        brandName: info.brandName,
        description:info.description,
        contactPerson: info.contactPerson,
        emailId: info.emailId,
        mobile: info.mobile
  }
 // console.log("hello  brandupdateApi data",data)

  return (dispatch) => {
    dispatch(updateBrandDataLoading("BRAND....", "BRAND"));
    client
      .post("/api/onboard/updateBrand", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          // console.log("BrandGreat==>", response.data);
          dispatch(
            updateBrandDataSuccess(
              response.data,
              "Brand Update Successfully",
              "BRAND UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log("error caught in -> actions/brand/update", err);
        dispatch(
          updateBrandDataFailure(err, "Something went wrong", "BRAND UPDATE")
        );
      });
  };
};
