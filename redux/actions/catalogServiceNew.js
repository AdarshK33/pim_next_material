import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  BULK_UPLOAD_LOADING,
  BULK_UPLOAD_SUCCESS,
  BULK_UPLOAD_FAILURE,
} from "../types/types";

import { client } from "../../utils/axios";
import { uploadClient } from "../../utils/axios";

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

export const bulkUploadDataLoading = () => {
  return {
    type: BULK_UPLOAD_LOADING,
  };
};
export const bulkUploadDataSuccess = (data) => {
  return {
    type: BULK_UPLOAD_SUCCESS,
    payload: data,
  };
};
export const bulkUploadDataFailure = (error) => {
  return {
    type: BULK_UPLOAD_FAILURE,
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

export const bulkUploadApi = (data) => {
  // const data = {
  //   formData: formData,
  //   configData: configData,
  // };
  console.log("hello   called", data);
  return (dispatch) => {
    dispatch(bulkUploadDataLoading("BULK....", "UPLOAD"));
    uploadClient
      .post("/api/catalogServiceNew/bulkUpload", data)
      .then((response) => {
        console.log("---------bulkUpload------", response);
        // result = true;
        // if (response.status === 200) {
        // toast.info("User Create Successfully !!!");
        // console.log("user ==>", response.data.result);
        dispatch(
          bulkUploadDataSuccess("bulkUpload Successfully", "bulkUpload ")
        );
        // } else throw new Error("");
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/BulkUploadApi",
          err
        );

        dispatch(
          bulkUploadDataFailure(err, "Something went wrong", "BulkUploadApi")
        );
      });
  };
};
