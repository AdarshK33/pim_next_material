import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  GET_ALL_PRODUCT_LIST_LOADING,
  GET_ALL_PRODUCT_LIST_SUCCESS,
  GET_ALL_PRODUCT_LIST_FAILURE,
  BULK_UPLOAD_LOADING,
  BULK_UPLOAD_SUCCESS,
  BULK_UPLOAD_FAILURE,
  GET_PRODUCT_DETAILS_LOADING,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_CATEGORIES_DATA_LOADING,
  GET_CATEGORIES_DATA_SUCCESS,
  GET_CATEGORIES_DATA_FAILURE,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../types/types";

import { client } from "../../utils/axios";
import { uploadClient } from "../../utils/axios";
import { toast } from "react-toastify";

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

export const getAllProductListLoading = () => {
  return {
    type: GET_ALL_PRODUCT_LIST_LOADING,
  };
};
export const getAllProductListSuccess = (data) => {
  return {
    type: GET_ALL_PRODUCT_LIST_SUCCESS,
    payload: data,
  };
};
export const getAllProductListFailure = (error) => {
  return {
    type: GET_ALL_PRODUCT_LIST_FAILURE,
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

export const getProductDetailsLoading = () => {
  return {
    type: GET_PRODUCT_DETAILS_LOADING,
  };
};
export const getProductDetailsSuccess = (data) => {
  return {
    type: GET_PRODUCT_DETAILS_SUCCESS,
    payload: data,
  };
};
export const getProductDetailsFailure = (error) => {
  return {
    type: GET_PRODUCT_DETAILS_FAILURE,
    payload: error,
  };
};

export const getCategoriesLoading = () => {
  return {
    type: GET_CATEGORIES_DATA_LOADING,
  };
};
export const getCategoriesSuccess = (data) => {
  return {
    type: GET_CATEGORIES_DATA_SUCCESS,
    payload: data,
  };
};
export const getCategoriesFailure = (error) => {
  return {
    type: GET_CATEGORIES_DATA_FAILURE,
    payload: error,
  };
};

export const addCategoryLoading = () => {
  return {
    type: ADD_CATEGORY_LOADING,
  };
};
export const addCategorySuccess = (data) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: data,
  };
};
export const addCategoryFailure = (error) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    payload: error,
  };
};

export const revalidateDataLoading = () => {
  return {
    type: REVALIDATE_DATA_LOADING,
  };
};
export const revalidateDataSuccess = (data) => {
  return {
    type: REVALIDATE_DATA_SUCCESS,
    payload: data,
  };
};
export const revalidateDataFailure = (error) => {
  return {
    type: REVALIDATE_DATA_FAILURE,
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
        // console.log(" getAttributeListApi response", response);

        if (response?.data.statusCode === 200) {
          // console.log("API SUCCESS2", response.data);
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

export const getAllProductListApi = (pageNo, pageSize, status) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
    status: status,
  };
  return (dispatch) => {
    dispatch(getAllProductListLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalogServiceNew/allProducts", data)
      .then((response) => {
        // console.log(" getAttributeListApi response", response);

        if (response?.data.statusCode === 200) {
          dispatch(getAllProductListSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log(
          "actions/catalogServiceNew/GET ALL Product LIST =>FAILURE",
          err
        );
        dispatch(getAllProductListFailure(err));
      });
  };
};

export const bulkUploadApi = (data) => {
  // const data = {
  //   formData: formData,
  //   configData: configData,
  // };
  console.log("hello   called", data);
  return (dispatch) => {
    dispatch(bulkUploadDataLoading("BULK....", "UPLOAD"));
    uploadClient
      .post("/api/catalogServiceNew/bulkUpload", data)
      .then((response) => {
        console.log("---------bulkUpload------", response); // result = true; // if (response.status === 200) { // toast.info("User Create Successfully !!!"); // console.log("user ==>", response.data.result);
        dispatch(
          bulkUploadDataSuccess("bulkUpload Successfully", "bulkUpload ")
        ); // } else throw new Error("");
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

export const productDetailsApi = (PimCode) => {
  const data = {
    PimCode: PimCode,
  };
  return (dispatch) => {
    dispatch(getProductDetailsLoading("PRODUCT....", "DETAILS"));
    client
      .post("/api/catalogServiceNew/productDetails", data)
      .then((response) => {
        // console.log("---------PRODUCT DETAILS------", response); // result = true; // if (response.status === 200) { // toast.info("User Create Successfully !!!"); // console.log("user ==>", response.data.result);
        dispatch(getProductDetailsSuccess(response.data.result)); // } else throw new Error("");
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/productDetailApi",
          err
        );

        dispatch(getProductDetailsFailure(err));
      });
  };
};

export const getCategoriesApi = () => {
  return (dispatch) => {
    dispatch(getCategoriesLoading("Categories....", "Loading!"));
    client
      .get("/api/catalogQuery/allCategories")
      .then((response) => {
        console.log(" categories response=>", response);
        dispatch(getCategoriesSuccess(response.data));
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log("error caught in -> api/v1/catalog/category", err);
        dispatch(getCategoriesFailure(err));
      });
  };
};

export const addCategoryApi = (data) => {
  console.log("hello   called", data);
  return (dispatch) => {
    dispatch(addCategoryLoading("Categories....", "Loading!"));
    client
      .post("/api/catalogServiceNew/addcategory", data)
      .then((response) => {
        console.log(" csdxfsdf", response);

        dispatch(addCategorySuccess(response.data));
        toast.info("Category Added Successfully !!!");
      })
      .catch((err) => {
        toast.error("Category Not Added!!!");
        console.log("error caught in -> api/v1/catalog/category", err);
        dispatch(addCategoryFailure(err));
      });
  };
};

export const revalidateApis = (info) => {
  console.log("hello  revalidateApis info", info);
  const data = {
    modelCode: info?.PimCodeId,
    attributeSetId: info.attributeSetId,
    comments: info.comment,
  };
  // console.log("hello  revalidateApis data", data);

  return (dispatch) => {
    dispatch(revalidateDataLoading("BRAND....", "BRAND"));
    client
      .post("/api/catalogServiceNew/revalidate", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          // toast.info("Comment Updated Successfully !!!");

          dispatch(
            revalidateDataSuccess(
              response.data,
              " Comment Successfully",
              "Comment UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        // toast.error("Comment update Failed!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/revalidateApis",
          err
        );
        dispatch(
          revalidateDataFailure(err, "Something went wrong", "Comment UPDATE")
        );
      });
  };
};
