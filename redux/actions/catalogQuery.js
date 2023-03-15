import {

    GET_ALL_PRODUCT_DATA_LOADING,
    GET_ALL_PRODUCT_DATA_SUCCESS,
    GET_ALL_PRODUCT_DATA_FAILURE,

    GET_ATTRIBUTES_DATA_LOADING, //pass BRAND NAME
    GET_ATTRIBUTES_DATA_SUCCESS,
    GET_ATTRIBUTES_DATA_FAILURE,

    GET_CATEGORIES_DATA_LOADING ,
    GET_CATEGORIES_DATA_SUCCESS,
    GET_CATEGORIES_DATA_FAILURE,
  
    GET_ATTRIBUTES_BYID_DATA_LOADING,
    GET_ATTRIBUTES_BYID_DATA_SUCCESS,
    GET_ATTRIBUTES_BYID_DATA_FAILURE,
    
    GET_ATTRIBUTES_GROUP_DATA_LOADING,
    GET_ATTRIBUTES_GROUP_DATA_SUCCESS,
    GET_ATTRIBUTES_GROUP_DATA_FAILURE,

    GET_PRODUCT_PIM_MODEL_CODE_LOADING,
    GET_PRODUCT_PIM_MODEL_CODE_SUCCESS,
    GET_PRODUCT_PIM_MODEL_CODE_FAILURE,

  

} from "../types/types";
import { client } from "../../utils/axios";

export const getAllProductDataLoading = () => {
  return {
    type: GET_ALL_PRODUCT_DATA_LOADING,
  };
};
export const getAllProductDataSuccess = (data) => {
  return {
    type: GET_ALL_PRODUCT_DATA_SUCCESS,
    payload: data,
  };
};
export const getAllProductDataFailure = (error) => {
  return {
    type: GET_ALL_PRODUCT_DATA_FAILURE,
    payload: error,
  };
};


export const getAttributesDataLoading = () => {
  return {
      type: GET_ATTRIBUTES_DATA_LOADING
  };
};
export const getAttributesDataSuccess = (data) => {
  return {
      type: GET_ATTRIBUTES_DATA_SUCCESS,
      payload: data,
  };
};
export const getAttributesDataFailure = (error) => {
  return {
      type: GET_ATTRIBUTES_DATA_FAILURE,
      payload: error,
  };
};


export const getCategoriesDataLoading = () => {
  return {
      type: GET_CATEGORIES_DATA_LOADING
  };
};
export const getCategoriesDataSuccess = (data) => {
  return {
      type: GET_CATEGORIES_DATA_SUCCESS,
      payload: data,
  };
};
export const getCategoriesDataFailure = (error) => {
  return {
      type: GET_CATEGORIES_DATA_FAILURE,
      payload: error,
  };
};

export const getAttributesByIdDataLoading = () => {
  return {
      type: GET_ATTRIBUTES_BYID_DATA_LOADING
  };
};
export const getAttributesByIdDataSuccess = (data) => {
  return {
      type: GET_ATTRIBUTES_BYID_DATA_SUCCESS,
      payload: data,
  };
};
export const getAttributesByIdDataFailure = (error) => {
  return {
      type: GET_ATTRIBUTES_BYID_DATA_FAILURE,
      payload: error,
  };
};


export const getAttributesGroupDataLoading = () => {
  return {
      type: GET_ATTRIBUTES_GROUP_DATA_LOADING
  };
};
export const getAttributesGroupDataSuccess = (data) => {
  return {
      type: GET_ATTRIBUTES_GROUP_DATA_SUCCESS,
      payload: data,
  };
};
export const getAttributesGroupDataFailure = (error) => {
  return {
      type: GET_ATTRIBUTES_GROUP_DATA_FAILURE,
      payload: error,
  };
};


export const getProductPimCodeDataLoading = () => {
  return {
    type: GET_PRODUCT_PIM_MODEL_CODE_LOADING,
  };
};
export const getProductPimCodeDataSuccess = (data) => {
  return {
    type: GET_PRODUCT_PIM_MODEL_CODE_SUCCESS,
    payload: data,
  };
};
export const getProductPimCodeDataFailure = (error) => {
  return {
    type: GET_PRODUCT_PIM_MODEL_CODE_FAILURE,
    payload: error,
  };
};



export const getAllProductApi = (pageNo,pageSize) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize

  }
    return (dispatch) => {
      dispatch(getAllProductDataLoading('PRODUCTs....', 'PRODUCTs'));
      client.post("/api/catalogQuery/getAllProducts",data)
        .then((response) => {
          // console.log("  response",response)
        //   console.log(response)
          if (response?.data.statusCode === 200) {
              console.log("API SUCCESS2", response.data);
            dispatch(getAllProductDataSuccess(response.data.result));
          }
        })
        .catch((err) => {
          console.log("actions/catalogQuery/GET ALL PRODUCTs =>FAILURE", err);
          dispatch(getAllProductDataFailure(err));
        });
    };
  };


export const getAttributesApi = () => {
    return (dispatch) => {
      dispatch(getAttributesDataLoading('ATTRIBUTE....', 'ATTRIBUTE'));
      client.get("/api/catalogQuery/getAttributes")
        .then((response) => {
          console.log("hello api response",response.status)
        //   console.log(response)
          if (response?.status === 200 ) {
              console.log("hello API SUCCESS2", response);
            dispatch(getAttributesDataSuccess(response.data));
          }
        })
        .catch((err) => {
          console.log("actions/catalogQuery/ GET ATTRIBUTE =>FAILURE", err);
          dispatch(getAttributesDataFailure(err));
        });
    };
  };

export const getCategoriesApis = (brandName) => {
  const data = {
    brandName: brandName
  }
    return (dispatch) => {
      dispatch(getCategoriesDataLoading('CATEGORIES....', 'CATEGORIES'));
      client.post("/api/catalogQuery/getCategories",data)
        .then((response) => {
          // console.log("api response",response.status)
        //   console.log(response)
          if (response?.status === 200) {
              // console.log("API SUCCESS2", response.data);
            dispatch(getCategoriesDataSuccess(response.data));
          }
        })
        .catch((err) => {
          console.log("actions/onboardQuery/ GET CHANNELS =>FAILURE", err);
          dispatch(getCategoriesDataFailure(err));
        });
    };
  };


export const getAttributesByIdApis = (attributeId) => {
    // console.log("hello getAttributesByIdApis",channelId)
    const data = {
      attributeId: attributeId
    }
  
      return (dispatch) => {
        dispatch(getAttributesByIdDataLoading('ATTRIBUTE BY ID....', 'ATTRIBUTE BY ID'));
        client.post("/api/catalogQuery/getAttributesById",data)
          .then((response) => {
            // console.log("api response",response)
          //   console.log(response)
            if (response?.data?.statusCode === 200) {
                // console.log("API SUCCESS2", response.data.result);
              dispatch(getAttributesByIdDataSuccess(response.data.result));
            }
          })
          .catch((err) => {
            console.log("actions/catalogQuery/ GET ATTRIBUTE BY ID =>FAILURE", err);
            dispatch(getAttributesByIdDataFailure(err));
          });
      };
    };

export const getAttributesGroupApis = (groupId) => {
  const data = {
    groupId: groupId
  }

      return (dispatch) => {
        dispatch(getAttributesGroupDataLoading('ATTRIBUTE GROUP....', 'ATTRIBUTE GROUP'));
        client.post("/api/catalogQuery/attributeGroup",data)
          .then((response) => {
            console.log("api response",response)
          //   console.log(response)
            if (response?.data?.statusCode === 200) {
                console.log("API SUCCESS2", response.data.result);
              dispatch(getAttributesGroupDataSuccess(response.data.result));
            }
          })
          .catch((err) => {
            console.log("actions/catalogQuery/ GET ATTRIBUTE GROUP =>FAILURE", err);
            dispatch(getAttributesGroupDataFailure(err));
          });
      };
    };
    
export const getProductPimCodeApi = (pim_model_code) => {
  const data = {
    pim_model_code: pim_model_code
  }
  return (dispatch) => {
    dispatch(getProductPimCodeDataLoading('PRODUCTs PIM CODE....', 'PRODUCTs PIM CODE'));
    client.post("/api/catalogQuery/getProductPimCode",data)
      .then((response) => {
        console.log("api response",response)
      //   console.log(response)
        if (response?.status === 200) {
            console.log("API SUCCESS2", response.data);
          dispatch(getProductPimCodeDataSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log("actions/catalogQuery/GET PRODUCTs PIM CODE =>FAILURE", err);
        dispatch(getProductPimCodeDataFailure(err));
      });
  };
};






