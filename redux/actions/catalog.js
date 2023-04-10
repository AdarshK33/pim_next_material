
import {
    CREATE_CATEGORY_DATA_LOADING,
    CREATE_CATEGORY_DATA_SUCCESS,
    CREATE_CATEGORY_DATA_FAILURE,
    UPDATE_CATEGORY_DATA_LOADING ,
    UPDATE_CATEGORY_DATA_SUCCESS,
    UPDATE_CATEGORY_DATA_FAILURE ,
    ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_LOADING,
    ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_SUCCESS,
    ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_FAILURE,
    ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_LOADING,
    ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_SUCCESS,
    ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_FAILURE,
    CREATE_GROUP_DATA_LOADING,
    CREATE_GROUP_DATA_SUCCESS,
    CREATE_GROUP_DATA_FAILURE
  } from "../types/types";
  import { client } from "../../utils/axios";
import { toast } from "react-toastify";

  
  export const createCategoryDataLoading = () => {
    return {
      type: CREATE_CATEGORY_DATA_LOADING,
    };
  };
  export const createCategoryDataSuccess = (data) => {
    return {
      type: CREATE_CATEGORY_DATA_SUCCESS,
      payload: data,
    };
  };
  export const createCategoryDataFailure = (error) => {
    return {
      type: CREATE_CATEGORY_DATA_FAILURE,
      payload: error,
    };
  };


  export const updateCategoryDataLoading = () => {
    return {
      type: UPDATE_CATEGORY_DATA_LOADING,
    };
  };
  export const updateCategoryDataSuccess = (data) => {
    return {
      type: UPDATE_CATEGORY_DATA_SUCCESS,
      payload: data,
    };
  };
  export const updateCategoryDataFailure = (error) => {
    return {
      type:  UPDATE_CATEGORY_DATA_FAILURE,
      payload: error,
    };
  };


    
  export const createGroupDataLoading = () => {
    return {
      type: CREATE_GROUP_DATA_LOADING,
    };
  };
  export const createGroupDataSuccess = (data) => {
    return {
      type: CREATE_GROUP_DATA_SUCCESS,
      payload: data,
    };
  };
  export const createGroupDataFailure = (error) => {
    return {
      type: CREATE_GROUP_DATA_FAILURE,
      payload: error,
    };
  };

      
  export const createAttributeDataLoading = () => {
    return {
      type: ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_LOADING,
    };
  };
  export const createAttributeDataSuccess = (data) => {
    return {
      type: ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_SUCCESS,
      payload: data,
    };
  };
  export const createAttributeDataFailure = (error) => {
    return {
      type: ATTRIBUTE_CREATE_GROUP_BY_ID_DATA_FAILURE,
      payload: error,
    };
  };
  


        
  export const updateAttributeDataLoading = () => {
    return {
      type: ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_LOADING,
    };
  };
  export const updateAttributeDataSuccess = (data) => {
    return {
      type: ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_SUCCESS,
      payload: data,
    };
  };
  export const updateAttributeDataFailure = (error) => {
    return {
      type: ATTRIBUTE_UPDATE_GROUP_BY_ID_DATA_FAILURE,
      payload: error,
    };
  };
  
  





  


  export const createCategoryApi = (data) => {
    // console.log("hello   called", data);
    return (dispatch) => {
      dispatch(createCategoryDataLoading("CATEGORY....", "CATEGORY"));
      client
        .post("/api/catalog/createCategory", data)
        .then((response) => {
          // console.log("---------------", response.status);
          if (response.status === 200) {
          toast.info("Category Added Successfully !!!");

            // console.log("API category==>", response.data.result);
            dispatch(
              createCategoryDataSuccess(
                response.data.result,
                "Category Create Successfully",
                "CATEGORY CREATE"
              )
            );
          } else throw new Error("");
        })
        .catch((err) => {
          toast.error("Category Failed!!!");
          console.log("error caught in -> actions/category/createCategoryApi", err);
          dispatch(
          createCategoryDataFailure(err, "Something went wrong", "CATEGORY CREATE")
          );
        });
    };
  };
  
  export const updateCategoryApi = (info) => {
    // console.log("hello  updateCategoryApi info",info)
    const data = {
      categoryId:info?.categoryId,
          name: info.name,
    }
   
    return (dispatch) => {
      dispatch(updateCategoryDataLoading("CATEGORY....", "CATEGORY"));
      client
        .post("/api/catalog/updateCategory", data)
        .then((response) => {
          console.log("rrrrrr",response)
          if (response.status === 200) {
            toast.info("Category Update Successfully !!!");
            // console.log("BrandGreat==>", response.data);
            dispatch(
              updateCategoryDataSuccess(
                response.data,
                "Ctegory Update Successfully",
                "CATEGORY UPDATE"
              )
            );
          } else throw new Error("");
        })
        .catch((err) => {
          toast.error("Category Failed!!!");

          console.log("error caught in -> actions/catalog/updateCategoryApi", err);
          dispatch(
            updateCategoryDataFailure(err, "Something went wrong", "CATEGORY UPDATE")
          );
        });
    };
  };
  




export const createGroupApi = (data) => {
    // console.log("hello   called", data);
    return (dispatch) => {
      dispatch(createGroupDataLoading("GROUP....", "GROUP"));
      client
        .post("/api/catalog/createGroup", data)
        .then((response) => {
          // console.log("---------------", response.status);
          if (response.status === 200) {
            // console.log("API category==>", response.data.result);
            dispatch(
              createGroupDataSuccess(
                response.data.result,
                "Group Create Successfully",
                " GROUP"
              )
            );
          } else throw new Error("");
        })
        .catch((err) => {
          console.log("error caught in -> actions/catalog/createGroupApi", err);
          dispatch(
            createGroupDataFailure(err, "Something went wrong", "GROUP CREATE")
          );
        });
    };
  };



  

export const createAttributeApi = (data) => {
  // console.log("hello   called", data);
  return (dispatch) => {
    dispatch(createAttributeDataLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalog/createAttribute", data)
      .then((response) => {
        // console.log("---------------", response.status);
        if (response.status === 200) {
          // console.log("API category==>", response.data.result);
          dispatch(
            createAttributeDataSuccess(
              response.data.result,
              "Attribute Create Successfully",
              "ATTRIBUTE "
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log("error caught in -> actions/catalog/createAttributeApi", err);
        dispatch(
          createAttributeDataFailure(err, "Something went wrong", "ATTRIBUTE CREATE")
        );
      });
  };
};
export const updateAttributeApi = (data) => {
  //console.log("hello  updateAttributeApi info",info)
  // const data = {
  //       brandId:info?.brandId,
  //       brandName: info.brandName,
  //       description:info.description,
  //       contactPerson: info.contactPerson,
  //       emailId: info.emailId,
  //       mobile: info.mobile
  // }
 
  return (dispatch) => {
    dispatch(updateAttributeDataLoading("ATTRIBUTE....", "ATTRIBUTE"));
    client
      .post("/api/catalog/updateCategory", data)
      .then((response) => {
        // console.log("rrrrrr",response)
        if (response.status === 200) {
          // console.log("BrandGreat==>", response.data);
          dispatch(
            updateAttributeDataSuccess(
              response.data,
              "Attribute Update Successfully",
              "ATTRIBUTE UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log("error caught in -> actions/catalog/updateAttributeApi", err);
        dispatch(
          updateAttributeDataFailure(err, "Something went wrong", "ATTRIBUTE UPDATE")
        );
      });
  };
};




