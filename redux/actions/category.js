






import {
    CREATE_CATEGORY_DATA_LOADING,
    CREATE_CATEGORY_DATA_SUCCESS,
    CREATE_CATEGORY_DATA_FAILURE,

  } from "../types/types";
  import { client } from "../../utils/axios";
  
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
  
  
  // export const updateBrandDataLoading = () => {
  //   return {
  //     type: UPDATE_BRAND_DATA_LOADING,
  //   };
  // };
  // export const updateBrandDataSuccess = (data) => {
  //   return {
  //     type: UPDATE_BRAND_DATA_SUCCESS,
  //     payload: data,
  //   };
  // };
  // export const updateBrandDataFailure = (error) => {
  //   return {
  //     type: UPDATE_BRAND_DATA_FAILURE,
  //     payload: error,
  //   };
  // };
  
  export const createCategoryApi = (data) => {
    // console.log("hello   called", data);
    return (dispatch) => {
      dispatch(createBrandDataLoading("CATEGORY....", "CATEGORY"));
      client
        .post("/api/catalog/createCategory", data)
        .then((response) => {
          // console.log("---------------", response.status);
          if (response.status === 200) {
            console.log("API category==>", response.data.result);
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
          console.log("error caught in -> actions/category/create", err);
          dispatch(
            createCategoryDataFailure(err, "Something went wrong", "CATEGORY CREATE")
          );
        });
    };
  };
  
  
  
  // export const updateBrandApi = (info) => {
  //   //console.log("hello  brandupdateApi info",info)
  //   const data = {
  //         brandId:info?.brandId,
  //         brandName: info.brandName,
  //         description:info.description,
  //         contactPerson: info.contactPerson,
  //         emailId: info.emailId,
  //         mobile: info.mobile
  //   }
  //  // console.log("hello  brandupdateApi data",data)
  
  //   return (dispatch) => {
  //     dispatch(updateBrandDataLoading("BRAND....", "BRAND"));
  //     client
  //       .post("/api/onboard/updateBrand", data)
  //       .then((response) => {
  //         console.log("rrrrrr",response)
  //         if (response.status === 200) {
  //           console.log("BrandGreat==>", response.data);
  //           dispatch(
  //             updateBrandDataSuccess(
  //               response.data,
  //               "Brand Update Successfully",
  //               "BRAND UPDATE"
  //             )
  //           );
  //         } else throw new Error("");
  //       })
  //       .catch((err) => {
  //         console.log("error caught in -> actions/brand/update", err);
  //         dispatch(
  //           updateBrandDataFailure(err, "Something went wrong", "BRAND UPDATE")
  //         );
  //       });
  //   };
  // };
  
















