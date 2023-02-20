import { client } from "../../utils/axios";

import {
  INIT_APP_FAILURE,
  INIT_APP_SUCCESS,
  SET_EMAIL,
} from "../types/types";


export const initAppSuccess = (data) => {
  return {
    type: INIT_APP_SUCCESS,
    payload: data,
  };
};

export const initAppFailure = (error) => {
  return {
    type: INIT_APP_FAILURE,
    payload: error,
  };
};

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    email
  }
}

export const initApplication = (values, stars, id) => {
  return (dispatch) => {
    client
      .get("/api/init")
      .then((response) => {
        console.log("init api response: ", response);
        dispatch(initAppSuccess(response.data));
      })
      .catch((err) => {
        console.log("init api FAILURE", err);
        dispatch(initAppFailure(err));
      });
  };
};
