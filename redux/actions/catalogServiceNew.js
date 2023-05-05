import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  GET_ALL_PRODUCT_LOADING,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
} from "../types/types";

import { client } from "../../utils/axios";
// import { toast } from "react-toastify";

export const attributeListLoading = () => {
  return {
    type: ATTRIBUTE_LIST_LOADING,
  };
};
export const attributeListSuccess = (data) => {
  return {
    type: ATTRIBUTE_LIST_SUCCESS,
    payload: data,
  };
};
export const attributeListFailure = (error) => {
  return {
    type: ATTRIBUTE_LIST_FAILURE,
    payload: error,
  };
};

export const allProductLoading = () => {
  return {
    type: GET_ALL_PRODUCT_LOADING,
  };
};
export const allProductSuccess = (data) => {
  return {
    type: GET_ALL_PRODUCT_SUCCESS,
    payload: data,
  };
};
export const allProductFailure = (error) => {
  return {
    type: GET_ALL_PRODUCT_FAILURE,
    payload: error,
  };
};

export const getAttributeListApi = (pageNo, pageSize) => {
  const data = {
    page_No: pageNo,
    page_size: pageSize,
  };
  return (dispatch) => {
    dispatch(attributeListLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalogServiceNew/attributeList", data)
      .then((response) => {
        console.log(" getAttributeListApi response", response);

        if (response?.data.statusCode === 200) {
          console.log("API SUCCESS2", response.data);
          dispatch(attributeListSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log(
          "actions/catalogServiceNew/GET ATTRIBUTE LIST =>FAILURE",
          err
        );
        dispatch(attributeListFailure(err));
      });
  };
};


export const getAllProductsApi = (pageNo, pageSize, productStatus) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
    sortBy: "updatedAt",
    productStatus: productStatus,
  };
  console.log("data",data);
  return (dispatch) => {
    dispatch(allProductLoading("ALLPRODUCT....", "ALLPRODUCT"));
    client
      .post("/api/catalogServiceNew/allProducts", data)
      .then((response) => {
        console.log(" getAllProductApi response", response);

        if (response?.data.statusCode === 200) {
          console.log("API SUCCESS2", response.data);
          dispatch(allProductSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log(
          "actions/catalogServiceNew/GET ALLPRODUCT =>FAILURE",
          err
        );
        dispatch(allProductFailure(err));
      });
  };
};
