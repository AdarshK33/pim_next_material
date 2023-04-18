import {
  GET_TEMPLATE_DATA_LOADING,
  GET_TEMPLATE_DATA_SUCCESS,
  GET_TEMPLATE_DATA_FAILURE,
 
} from "../types/types";
import { client } from "../../utils/axios";

export const getTemplateDataLoading = () => {
  return {
    type: GET_TEMPLATE_DATA_LOADING,
  };
};
export const getTemplateDataSuccess = (data) => {
  return {
    type: GET_TEMPLATE_DATA_SUCCESS,
    payload: data,
  };
};
export const getTemplateDataFailure = (error) => {
  return {
    type: GET_TEMPLATE_DATA_FAILURE,
    payload: error,
  };
};




export const getTemplateApi = () => {
  console.log("hello api called" )

  return (dispatch) => {
    dispatch(getTemplateDataLoading('TEMPLATE....', 'TEMPLATE'));
    client.get("/api/syncQuery/template")
      .then((response) => {
        console.log("hello api response",response)
      //   console.log(response)
        if (response?.status === 200 ) {
            // console.log("hello API SUCCESS2", response);
          dispatch(getTemplateDataSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log("actions/syncQuery/ GET template =>FAILURE", err);
        dispatch(getTemplateDataFailure(err));
      });
  };
}


