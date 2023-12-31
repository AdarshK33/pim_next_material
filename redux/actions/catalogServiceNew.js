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
  CREATE_ATTRIBUTE_SET_LOADING,
  CREATE_ATTRIBUTE_SET_SUCCESS,
  CREATE_ATTRIBUTE_SET_FAILURE,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  REVALIDATE_DATA_LOADING,
  REVALIDATE_DATA_SUCCESS,
  REVALIDATE_DATA_FAILURE,
  STATUS_DATA_LOADING,
  STATUS_DATA_SUCCESS,
  STATUS_DATA_FAILURE,
  PUBLISH_CATALOG_REQUEST,
  PUBLISH_CATALOG_SUCCESS,
  PUBLISH_CATALOG_FAILURE,
  PRODUCT_UPDATE_DATA_LOADING,
  PRODUCT_UPDATE_DATA_SUCCESS,
  PRODUCT_UPDATE_DATA_FAILURE,
  ATTRIBUTE_SET_DETAILS_DATA_LOADING,
  ATTRIBUTE_SET_DETAILS_DATA_SUCCESS,
  ATTRIBUTE_SET_DETAILS_DATA_FAILURE,
  BULK_LIST_DATA_LOADING,
  BULK_LIST_DATA_SUCCESS,
  BULK_LIST_DATA_FAILURE,
  MEDIA_LISTING_LOADING,
  MEDIA_LISTING_SUCCESS,
  MEDIA_LISTING_FAILURE,
  GET_CATEGORIES_LIST_DATA_LOADING,
  GET_CATEGORIES_LIST_DATA_SUCCESS,
  GET_CATEGORIES_LIST_DATA_FAILURE,
  CATEGORY_UPDATE_DATA_LOADING,
  CATEGORY_UPDATE_DATA_SUCCESS,
  CATEGORY_UPDATE_DATA_FAILURE,
  MEDIA_UPLOAD_LOADING,
  MEDIA_UPLOAD_SUCCESS,
  MEDIA_UPLOAD_FAILURE,
  PRODUCT_SEARCH_DATA_LOADING,
  PRODUCT_SEARCH_DATA_SUCCESS,
  PRODUCT_SEARCH_DATA_FAILURE,
  BULK_EXPORT_DATA_LOADING,
  BULK_EXPORT_DATA_SUCCESS,
  BULK_EXPORT_DATA_FAILURE,
  ATTRIBUTE_SET_UPDATE_DATA_LOADING,
  ATTRIBUTE_SET_UPDATE_DATA_SUCCESS,
  ATTRIBUTE_SET_UPDATE_DATA_FAILURE,
  ATTRIBUTE_SET_GET_BY_ID_DATA_LOADING,
  ATTRIBUTE_SET_GET_BY_ID_DATA_SUCCESS,
  ATTRIBUTE_SET_GET_BY_ID_DATA_FAILURE,
  CREATE_ONLINE_CATEGORY_DATA_LOADING,
  CREATE_ONLINE_CATEGORY_DATA_SUCCESS,
  CREATE_ONLINE_CATEGORY_DATA_FAILURE,
  UPDATE_ONLINE_CATEGORY_DATA_LOADING,
  UPDATE_ONLINE_CATEGORY_DATA_SUCCESS,
  UPDATE_ONLINE_CATEGORY_DATA_FAILURE,
  ONLINE_CATEGORY_DATA_LOADING,
  ONLINE_CATEGORY_DATA_SUCCESS,
  ONLINE_CATEGORY_DATA_FAILURE,
  ATTRIBUTE_SEARCH_DATA_LOADING,
  ATTRIBUTE_SEARCH_DATA_FAILURE
} from "../types/types";

import { client } from "../../utils/axios";
import { uploadClient } from "../../utils/axios";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

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

export const createAttributeSetLoading = () => {
  return {
    type: CREATE_ATTRIBUTE_SET_LOADING,
  };
};
export const createAttributeSetSuccess = (data) => {
  return {
    type: CREATE_ATTRIBUTE_SET_SUCCESS,
    payload: data,
  };
};
export const createAttributeSetFailure = (error) => {
  return {
    type: CREATE_ATTRIBUTE_SET_FAILURE,
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

export const statusDataLoading = () => {
  return {
    type: STATUS_DATA_LOADING,
  };
};
export const statusDataSuccess = (data) => {
  return {
    type: STATUS_DATA_SUCCESS,
    payload: data,
  };
};
export const statusDataFailure = (error) => {
  return {
    type: STATUS_DATA_FAILURE,
    payload: error,
  };
};

export const publishCatalogLoading = () => {
  return {
    type: PUBLISH_CATALOG_REQUEST,
  };
};
export const publishCatalogSuccess = (data) => {
  return {
    type: PUBLISH_CATALOG_SUCCESS,
    payload: data,
  };
};
export const publishCatalogFailure = (error) => {
  return {
    type: PUBLISH_CATALOG_FAILURE,
    payload: error,
  };
};
export const productUpdateDataLoading = () => {
  return {
    type: PRODUCT_UPDATE_DATA_LOADING,
  };
};
export const productUpdateDataSuccess = (data) => {
  return {
    type: PRODUCT_UPDATE_DATA_SUCCESS,
    payload: data,
  };
};
export const productUpdateDataFailure = (error) => {
  return {
    type: PRODUCT_UPDATE_DATA_FAILURE,
    payload: error,
  };
};

export const attributeSetDetailListLoading = () => {
  return {
    type: ATTRIBUTE_SET_DETAILS_DATA_LOADING,
  };
};
export const attributeSetDetailListSuccess = (data) => {
  return {
    type: ATTRIBUTE_SET_DETAILS_DATA_SUCCESS,
    payload: data,
  };
};
export const attributeSetDetailListFailure = (error) => {
  return {
    type: ATTRIBUTE_SET_DETAILS_DATA_FAILURE,
    payload: error,
  };
};

export const bulkDetailListLoading = () => {
  return {
    type: BULK_LIST_DATA_LOADING,
  };
};
export const bulkDetailListSuccess = (data) => {
  return {
    type: BULK_LIST_DATA_SUCCESS,
    payload: data,
  };
};
export const bulkDetailListFailure = (error) => {
  return {
    type: BULK_LIST_DATA_FAILURE,
    payload: error,
  };
};

export const mediaListingLoading = () => {
  return {
    type: MEDIA_LISTING_LOADING,
  };
};
export const mediaListingSuccess = (data) => {
  return {
    type: MEDIA_LISTING_SUCCESS,
    payload: data,
  };
};
export const mediaListingFailure = (error) => {
  return {
    type: MEDIA_LISTING_FAILURE,
    payload: error,
  };
};

export const getCategoriesListLoading = () => {
  return {
    type: GET_CATEGORIES_LIST_DATA_LOADING,
  };
};
export const getCategoriesListSuccess = (data) => {
  return {
    type: GET_CATEGORIES_LIST_DATA_SUCCESS,
    payload: data,
  };
};
export const getCategoriesListFailure = (error) => {
  return {
    type: GET_CATEGORIES_LIST_DATA_FAILURE,
    payload: error,
  };
};

export const categoryUpdateDataLoading = () => {
  return {
    type: CATEGORY_UPDATE_DATA_LOADING,
  };
};
export const categoryUpdateDataSuccess = (data) => {
  return {
    type: CATEGORY_UPDATE_DATA_SUCCESS,
    payload: data,
  };
};
export const categoryUpdateDataFailure = (error) => {
  return {
    type: CATEGORY_UPDATE_DATA_FAILURE,
    payload: error,
  };
};

export const mediaUploadDataLoading = () => {
  return {
    type: MEDIA_UPLOAD_LOADING,
  };
};
export const mediaUploadDataSuccess = (data) => {
  return {
    type: MEDIA_UPLOAD_SUCCESS,
    payload: data,
  };
};
export const mediaUploadDataFailure = (error) => {
  return {
    type: MEDIA_UPLOAD_FAILURE,
    payload: error,
  };
};

export const productSearchDataLoading = () => {
  return {
    type: PRODUCT_SEARCH_DATA_LOADING,
  };
};
export const productSearchDataSuccess = (data) => {
  return {
    type: PRODUCT_SEARCH_DATA_SUCCESS,
    payload: data,
  };
};
export const productSearchDataFailure = (error) => {
  return {
    type: PRODUCT_SEARCH_DATA_FAILURE,
    payload: error,
  };
};

export const bulkExportDataLoading = () => {
  return {
    type: BULK_EXPORT_DATA_LOADING,
  };
};

export const bulkExportDataSuccess = (data) => {
  return {
    type: BULK_EXPORT_DATA_SUCCESS,
    payload: data,
  };
};
export const bulkExportDataFailure = (error) => {
  return {
    type: BULK_EXPORT_DATA_FAILURE,
    payload: error,
  };
};

export const getByAttributeSetDataLoading = () => {
  return {
    type: ATTRIBUTE_SET_GET_BY_ID_DATA_LOADING,
  };
};
export const getByAttributeSetDataSuccess = (data) => {
  return {
    type: ATTRIBUTE_SET_GET_BY_ID_DATA_SUCCESS,
    payload: data,
  };
};
export const getByAttributeSetDataFailure = (error) => {
  return {
    type: ATTRIBUTE_SET_GET_BY_ID_DATA_FAILURE,
    payload: error,
  };
};

export const attributeSetUpdateDataLoading = () => {
  return {
    type: ATTRIBUTE_SET_UPDATE_DATA_LOADING,
  };
};
export const attributeSetUpdateDataSuccess = (data) => {
  return {
    type: ATTRIBUTE_SET_UPDATE_DATA_SUCCESS,
    payload: data,
  };
};
export const attributeSetUpdateDataFailure = (error) => {
  return {
    type: ATTRIBUTE_SET_UPDATE_DATA_FAILURE,
    payload: error,
  };
};

export const attributeSetDetailSearchLoading = () => {
  return {
    type: ATTRIBUTE_SEARCH_DATA_LOADING,
  };
};
export const attributeSetDetailSearchFailure = (error) => {
  return {
    type: ATTRIBUTE_SEARCH_DATA_FAILURE,
    payload: error,
  };
};




export const onlineCategoryListingLoading = () => {
  return {
    type: ONLINE_CATEGORY_DATA_LOADING,
  };
};
export const onlineCategoryListingSuccess = (data) => {
  return {
    type: ONLINE_CATEGORY_DATA_SUCCESS,
    payload: data,
  };
};
export const onlineCategoryListingFailure = (error) => {
  return {
    type: ONLINE_CATEGORY_DATA_FAILURE,
    payload: error,
  };
};


export const onlineCategoryUpdateLoading = () => {
  return {
    type: UPDATE_ONLINE_CATEGORY_DATA_LOADING,
  };
};
export const onlineCategoryUpdateSuccess = (data) => {
  return {
    type: UPDATE_ONLINE_CATEGORY_DATA_SUCCESS,
    payload: data,
  };
};
export const onlineCategoryUpdateFailure = (error) => {
  return {
    type: UPDATE_ONLINE_CATEGORY_DATA_FAILURE,
    payload: error,
  };
};


export const onlineCategoryCreateLoading = () => {
  return {
    type: CREATE_ONLINE_CATEGORY_DATA_LOADING,
  };
};
export const onlineCategoryCreateSuccess = (data) => {
  return {
    type: CREATE_ONLINE_CATEGORY_DATA_SUCCESS,
    payload: data,
  };
};
export const onlineCategoryCreateFailure = (error) => {
  return {
    type: CREATE_ONLINE_CATEGORY_DATA_FAILURE,
    payload: error,
  };
};


export const getAttributeListApi = (id, pageNo, pageSize) => {
  const data = {
    id: id,
    page_no: pageNo,
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

export const getAllProductListApi = (pageNo, pageSize, status, itemId) => {
  // if (itemId == null && itemId == undefined) {
  let data = {
    pageNo: pageNo,
    pageSize: pageSize,
    productStatus: status,
    // };
    // } else {
    //   data = {
    //     pageNo: pageNo,
    //     pageSize: pageSize,
    //     productStatus: status,
    //     itemId: [itemId],
    //   };
  };

  // console.log(data, "data here");
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
  //   formData: formData,
  //   configData: configData,
  // };
  // console.log("hello   called", data);
  return (dispatch) => {
    dispatch(bulkUploadDataLoading("BULK....", "UPLOAD"));
    uploadClient
      .post("/api/catalogServiceNew/bulkUpload", data)
      .then((response) => {
        toast.info("Bulk file uploaded successfully !!!");

        // console.log("---------bulkUpload------", response); // result = true; // if (response.status === 200) { // toast.info("User Create Successfully !!!"); // console.log("user ==>", response.data.result);
        dispatch(
          bulkUploadDataSuccess("bulkUpload Successfully", "bulkUpload ")
        ); // } else throw new Error("");
        dispatch(getBuilkDetailsListApi(0, 10));
      })
      .catch((err) => {
        console.log(
          "error caught in -> actions/catalogServiceNew/BulkUploadApi",
          err.response
        );
        toast.error(`${err?.response.data.detail}`)
        dispatch(
          bulkUploadDataFailure(err, "Something went wrong", "BulkUploadApi")
        );
      });
  };
};

export const mediaUploadApi = (data) => {
  // const data = {
  //   // pim_code: pim_code,
  //   formData: formData,
  // };
  // console.log("hello mediaUploadApi called", data);
  return (dispatch) => {
    dispatch(mediaUploadDataLoading("BULK....", "UPLOAD"));
    uploadClient
      .post("/api/catalogServiceNew/mediaUpload", data)
      .then((response) => {
        toast.info("Media file uploaded successfully !!!");

        // console.log("---------mediaUpload------", response); // result = true; // if (response.status === 200) { // toast.info("User Create Successfully !!!"); // console.log("user ==>", response.data.result);
        dispatch(
          mediaUploadDataSuccess(
            "Media Upload Successfully",
            "Media Upload ",
            response
          )
        ); // } else throw new Error("");
      })
      .catch((err) => {
        console.log(
          "error caught in -> actions/catalogServiceNew/MediaUploadApi",
          err
        );
        const { status = {} } = err?.response;
        if (status == 409) {
          toast.error("File already exists !!!");
        }
        if (status == 404) {
          toast.error("Access denied to upload file !!!");
        } else {
          toast.error("Media file upload failed !!!");
        }

        dispatch(
          mediaUploadDataFailure(err, "Something went wrong", "Media UploadApi")
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
      .get("/api/catalogServiceNew/dropdownCategories")
      .then((response) => {
        // console.log(" categories response=>", response);
        dispatch(getCategoriesSuccess(response.data));
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/getCategoriesApi",
          err
        );
        // console.log("error caught in -> api/v1/catalog/category", err);
        dispatch(getCategoriesFailure(err));
      });
  };
};

export const createAttributeSetApi = (info) => {
  // console.log("create attribute body", data);
  const data = {
    name: info.name,
    role: info.role,
    description: info.description,
    precedence: info.precedence,
    active: info.active,
    category: info.category,
  };
  return (dispatch) => {
    dispatch(createAttributeSetLoading("CREATE....", "ATTRIBUTE"));
    client
      .post("/api/catalogServiceNew/createAttribute", data)
      .then((response) => {
        // console.log("---------create attribute------", response);
        dispatch(createAttributeSetSuccess(response.data.result)); // } else throw new Error("");
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/create Attribute",
          err
        );

        dispatch(createAttributeSetFailure(err));
      });
  };
};
export const addCategoryApi = (data) => {
  // console.log("hello   called", data);
  return (dispatch) => {
    dispatch(addCategoryLoading("Categories....", "Loading!"));
    client
      .post("/api/catalogServiceNew/addcategory", data)

      .then(async (response) => {
        // console.log(" csdxfsdf", response);
        dispatch(addCategorySuccess(response.data));

        toast.info("Category Added Successfully !!!");
        dispatch(getCategoriesListApi());
      })
      .catch((err) => {
        toast.error("Category  failed!!!");

        dispatch(addCategoryFailure(err));
      });
  };
};

export const revalidateApis = (info) => {
  // console.log("hello  revalidateApis info", info);
  const data = {
    model_Code: info?.PimCodeId,
    attributeSetId: info.attributeSetId,
    // comments: info.comments,
    status: info.status,
  };
  // console.log("hello  revalidateApis data", data);

  return (dispatch) => {
    dispatch(revalidateDataLoading("BRAND....", "BRAND"));
    client
      .post("/api/catalogServiceNew/revalidate", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          toast.info("Revalidate status marked Successfully !!!");

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
        toast.error("Revalidate failed!!!");
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

export const statusChangedApis = (info) => {
  // console.log("hello  revalidateApis info", info);
  const data = {
    pimModelCode: info.pimModelCode,
    status: info.status,
  };
  // console.log("hello  revalidateApis data", data);

  return (dispatch) => {
    dispatch(statusDataLoading("STATUS....", "STATUS"));
    client
      .post("/api/catalogServiceNew/statusChanged", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          if (info?.status === "DRAFT") {
            toast.info("Product drafted successfully !!!");
          }
          if (info?.status === "READY_FOR_REVIEW") {
            toast.info("Product ready for review successfully !!!");
          }

          if (info?.status === "ACTIVATED") {
            toast.info("Product activated successfully !!!");
          }
          if (info?.status === "REVALIDATE") {
            toast.info("Product revalidated successfully !!!");
          }
          dispatch(
            statusDataSuccess(
              response.data,
              " status Successfully",
              "status UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("Status failed!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/revalidateApis",
          err
        );
        dispatch(
          statusDataFailure(err, "Something went wrong", "STATUS UPDATE")
        );
      });
  };
};


export const getCatalogPublishApi = (filetype, selectedItemIds, channelId) => {
  const data = {
    filetype,
    selectedItemIds,
    channelId,
  };
  return (dispatch) => {
    dispatch(publishCatalogLoading("PUBLISH....", "PUBLISH"));
    client
      .post("/api/catalogServiceNew/publishCatalog", data)
      .then((response) => {
        toast.info("Publish Successfully !!!");
        dispatch(publishCatalogSuccess(response.data, "PUBLISH SUCCESS"));
        // console.log("responsefrom", response);
      })
      .catch((err) => {
        toast.error("Publish Failed !!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/getCatalogPublish",
          err
        );
        dispatch({ type: PUBLISH_CATALOG_FAILURE, payload: err.message });
        dispatch(publishCatalogFailure(err, "Something went wrong", "PUBLISH"));
      });
  };
};

export const productUpdateApis = (data) => {
  // console.log("hello  revalidateApis info", info);
  // const data = {
  //   pimModelCode: info.pimModelCode,
  //   status: info.status,
  // };
  // console.log("hello  revalidateApis data", data);

  return (dispatch) => {
    dispatch(productUpdateDataLoading("STATUS....", "STATUS"));
    client
      .post("/api/catalogServiceNew/productUpdate", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          toast.info("Product updated successfully !!!");

          dispatch(
            productUpdateDataSuccess(
              response.data,
              " status Successfully",
              "status UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("Product updated failed!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/productUpdate",
          err
        );
        dispatch(
          productUpdateDataFailure(
            err,
            "Something went wrong",
            "product UPDATE"
          )
        );
      });
  };
};

export const getAttributeSetDetailsListApi = (Id, pageNo, pageSize) => {
  const data = {
    id: Id,
    pageNo: pageNo,
    pageSize: pageSize,
  };
  return (dispatch) => {
    dispatch(attributeSetDetailListLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalogServiceNew/attributeDetailsList", data)
      .then((response) => {
        // console.log(" getAttributeListApi response", response);

        if (response?.data.statusCode === 200) {
          // console.log("API SUCCESS2", response.data);
          dispatch(attributeSetDetailListSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log(
          "actions/catalogServiceNew/GET ATTRIBUTE LIST =>FAILURE",
          err
        );
        dispatch(attributeSetDetailListFailure(err));
      });
  };
};

export const getAttributeSetDetailsSearchApi = (Id, search, pageNo, pageSize) => {
  const data = {
    id: Id,
    search: search,
    pageNo: pageNo,
    pageSize: pageSize,
  };
  return (dispatch) => {
    dispatch(attributeSetDetailSearchLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalogServiceNew/attributeDetailsSearch", data)
      .then((response) => {
        // console.log(" getAttributeSetDetailsSearchApi response", response);

        if (response?.data.statusCode === 200) {
          // console.log("API SUCCESS2", response.data);
          dispatch(attributeSetDetailListSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log(
          "actions/catalogServiceNew/GET ATTRIBUTE SEARCH =>FAILURE",
          err
        );
        dispatch(attributeSetDetailSearchFailure(err));
      });
  };
};

export const getBuilkDetailsListApi = (pageNo, pageSize) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
  };
  return (dispatch) => {
    dispatch(bulkDetailListLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalogServiceNew/getBulkUpload", data)
      .then((response) => {
        // console.log(" bulkDetailListLoading response", response);

        if (response?.status === 200) {
          // console.log("hello API SUCCESS2", response.data);
          dispatch(bulkDetailListSuccess(response.data));
        }
      })
      .catch((err) => {
        console.log(
          "actions/catalogServiceNew/GET getBuilkDetailsListApi LIST =>FAILURE",
          err
        );
        dispatch(bulkDetailListFailure(err));
      });
  };
};

export const getMediaListingApi = (pageNo, pageSize, modelCode) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
    modelCode: modelCode,
  };
  return (dispatch) => {
    dispatch(mediaListingLoading("MEDIA....", "LISTING"));
    client
      .post("/api/catalogServiceNew/getMedia", data)
      .then((response) => {
        // console.log(" mediaListLoading response", response);

        if (response?.status === 200) {
          // console.log("mediaListingSuccess", response.data);
          dispatch(mediaListingSuccess(response.data));
        }
      })
      .catch((err) => {
        console.log(
          "error caught in -> redux/actions/catalogServiceNew/getMediaListingApi",
          err
        );
        // console.log("mediaListingFailure", err);
        dispatch(mediaListingFailure(err));
      });
  };
};

export const getCategoriesListApi = () => {
  return (dispatch) => {
    dispatch(getCategoriesListLoading("Categories List....", "Loading!"));
    client
      .get("/api/catalogServiceNew/categoryList")
      .then((response) => {
        // console.log("categories list response=>", response);
        dispatch(getCategoriesListSuccess(response.data));
      })
      .catch((err) => {
        console.log(
          "error caught in -> redux/actions/catalogServiceNew/getCategoriesListApi",
          err
        );
        dispatch(getCategoriesListFailure(err));
      });
  };
};

export const updateCategoryApis = (data) => {
  return (dispatch) => {
    dispatch(categoryUpdateDataLoading("STATUS....", "STATUS"));
    client
      .post("/api/catalogServiceNew/updateCategory", data)
      .then(async (response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          toast.info("Category updated successfully !!!");

          dispatch(
            categoryUpdateDataSuccess(
              response.data,
              " status Successfully",
              "status UPDATE"
            )
          );
          dispatch(getCategoriesListApi());
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("Category updated failed !!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/categoryUpdate",
          err
        );
        dispatch(
          categoryUpdateDataFailure(
            err,
            "Something went wrong",
            "category UPDATE"
          )
        );
      });
  };
};

export const productSearchApis = (status, key) => {
  const data = {
    productStatus: status,
    searchKey: key,
  };
  // console.log(data, "productSearch API");
  return (dispatch) => {
    dispatch(productSearchDataLoading("productSearch....", "productSearch"));
    client
      .post("/api/catalogServiceNew/productSearch", data)
      .then(async (response) => {
        // console.log("rrrrrr", response?.data?.result.totalElements);
        if (response.status === 200) {
          // toast.info("Product search  successfully !!!");
          // dispatch(productSearchDataSuccess(response?.data?.result));


          // console.log("search successfully");
          dispatch(getAllProductListSuccess(response?.data?.result));

        } else throw new Error("");
      })
      .catch((err) => {
        // toast.error("Category updated failed !!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/productSearch",
          err
        );
        dispatch(
          productSearchDataFailure(err, "Something went wrong", "productSearch")
        );
      });
  };
};

export const bulkExportApis = (id) => {
  let data = {
    batchDetailsId: id,
  };
  return (dispatch) => {
    dispatch(bulkExportDataLoading("EXPORT....", "EXPORT"));
    client
      .post("/api/catalogServiceNew/bulkExport", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          toast.info("Export successfully !!!");

          dispatch(
            bulkExportDataSuccess(
              response.data,
              " status Successfully",
              "status EXPORT"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("Export failed!!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/bulkExportApis",
          err
        );
        dispatch(bulkExportDataFailure(err, "Something went wrong", " EXPORT"));
      });
  };
};

export const getByAttributeSetApis = (id) => {
  let data = {
    attribute_set_id: id,
  };
  return (dispatch) => {
    dispatch(getByAttributeSetDataLoading("..GET BY ID..", "GET BY ID"));
    client
      .post("/api/catalogServiceNew/getByAttributeSet", data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            getByAttributeSetDataSuccess(
              response?.data?.result,
              " status Successfully",
              "status getByAttributeSet"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log(
          "error caught in -> actions/catalogServiceNew/getByAttributeSetApis",
          err
        );
        dispatch(
          getByAttributeSetDataFailure(
            err,
            "Something went wrong",
            " getByAttributeSet"
          )
        );
      });
  };
};

export const updateAttributeSetApis = (data) => {
  return (dispatch) => {
    dispatch(attributeSetUpdateDataLoading("UPDATE....", "UPDATE"));
    client
      .post("/api/catalogServiceNew/updateAttributeSet", data)
      .then(async (response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          toast.info("AttributeSet updated successfully !!!");

          dispatch(
            attributeSetUpdateDataSuccess(
              response.data,
              " status Successfully",
              "status UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("AttributeSet updated failed !!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/updateAttributeSetApis",
          err
        );
        dispatch(
          attributeSetUpdateDataFailure(
            err,
            "Something went wrong",
            "AttributeSet UPDATE"
          )
        );
      });
  };
};


export const getOnlineCategoriesApi = () => {
  return (dispatch) => {
    dispatch(onlineCategoryListingLoading("Categories....", "Loading!"));
    client
      .get("/api/catalogServiceNew/onlineCategoryList")
      .then((response) => {
        // console.log(" categories response=>", response);
        dispatch(onlineCategoryListingSuccess(response.data));
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log("error caught in -> error caught in -> actions/catalogServiceNew/getOnlineCategoriesApi ", err);
        dispatch(onlineCategoryListingFailure(err));
      });
  };
};

export const addOnlineCategoryApi = (data) => {
  // console.log("hello   called", data);
  return (dispatch) => {
    dispatch(onlineCategoryCreateLoading("Categories....", "Loading!"));
    client
      .post("/api/catalogServiceNew/addOnlineCategory", data)

      .then(async (response) => {
        // console.log(" csdxfsdf", response);
        dispatch(onlineCategoryCreateSuccess(response.data));

        toast.info("Online category added successfully !!!");
        dispatch(getOnlineCategoriesApi());
      })
      .catch((err) => {
        toast.error("Online category  failed!!!");

        dispatch(onlineCategoryCreateFailure(err));
      });
  };
};


export const updateOnlineCategoryApis = (data) => {
  return (dispatch) => {
    dispatch(onlineCategoryUpdateLoading("STATUS....", "STATUS"));
    client
      .post("/api/catalogServiceNew/updateOnlineCategory", data)
      .then(async (response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          toast.info("Category updated successfully !!!");

          dispatch(
            onlineCategoryUpdateSuccess(
              response.data,
              " status Successfully",
              "status UPDATE"
            )
          );
          dispatch(getOnlineCategoriesApi());
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("Online category updated failed !!!");
        console.log(
          "error caught in -> actions/catalogServiceNew/categoryUpdate",
          err
        );
        dispatch(
          onlineCategoryUpdateFailure(
            err,
            "Something went wrong",
            "Online category UPDATE"
          )
        );
      });
  };
};

