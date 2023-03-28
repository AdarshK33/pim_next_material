import {
  BULK_LISTING_DATA_LOADING,
  BULK_LISTING_DATA_SUCCESS,
  BULK_LISTING_DATA_FAILURE,
 
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




export const bulkListingApi = (pageNumber,pageSize,toDate,fromDate) => {


  // console.log(pageNumber,pageSize,toDate,fromDate,"bulkListingApi")
  const data = {
    pageNumber:pageNumber,
    pageSize: pageSize,
    startDate: fromDate,
    endDate: toDate
  }


// console.log("hello  bulkListingApi called", data);
return (dispatch) => {
    dispatch(bulkListingDataLoading("BULK....", "BULK"));
    client
      .post("/api/syncCommand/blukListing", data)
      .then((response) => {
        // console.log("----------BLUK-----", response);
       
        if (response.status === 200) {
          //  console.log("BLUK==>", response.data);
          dispatch(
            bulkListingDataSuccess(
              response.data,
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


