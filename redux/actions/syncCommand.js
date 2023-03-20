import {
  BULK_LISTING_DATA_LOADING,
  BULK_LISTING_DATA_SUCCESS,
  BULK_LISTING_DATA_FAILURE,
  GET_BRAND_DATA_LOADING,
  GET_BRAND_DATA_SUCCESS,
  GET_BRAND_DATA_FAILURE,
  UPDATE_BRAND_DATA_LOADING,
  UPDATE_BRAND_DATA_SUCCESS,
  UPDATE_BRAND_DATA_FAILURE,
} from "../types/types";
import { client } from "../../utils/axios";

export const bulkListingDataLoading = () => {
  return {
    type: BULK_LISTING_DATA_LOADING,
  };
};
export const bulkListingDataSuccess = (data) => {
  return {
    type: BULK_LISTING_DATA_SUCCESS,
    payload: data,
  };
};
export const bulkListingDataFailure = (error) => {
  return {
    type: BULK_LISTING_DATA_FAILURE,
    payload: error,
  };
};




export const bulkListingApi = (info) => {

  const data = {
    pageNumber:info?.pageNumber,
    pageSize: info.pageSize,
  }


// console.log("hello  bulkListingApi called", data);
return (dispatch) => {
    dispatch(bulkListingDataLoading("BULK....", "BULK"));
    client
      .post("/api/syncCommand/bulkLisitng", data)
      .then((response) => {
        console.log("----------BLUK-----", response);
       
        if (response.status === 201) {
           console.log("BLUK==>", response.data.result);
          dispatch(
            bulkListingDataSuccess(
              response.data.result,
              "Bluck Lisitng Successfully",
              "BLUK LISITNG"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log("error caught in -> actions/syncCommand/bulkListingApi", err);
        
        dispatch(
          bulkListingDataFailure(err, "Something went wrong", "BULK LISTING")
        );
      });
  };
};


