import {
  CREATE_CHANNEL_DATA_LOADING,
  CREATE_CHANNEL_DATA_SUCCESS,
  CREATE_CHANNEL_DATA_FAILURE,
  GET_CHANNEL_DATA_LOADING,
  GET_CHANNEL_DATA_SUCCESS,
  GET_CHANNEL_DATA_FAILURE,
  UPDATE_CHANNEL_DATA_LOADING,
  UPDATE_CHANNEL_DATA_SUCCESS,
  UPDATE_CHANNEL_DATA_FAILURE,
} from "../types/types";
import { client } from "../../utils/axios";

export const createChannelDataLoading = () => {
  return {
    type: CREATE_CHANNEL_DATA_LOADING,
  };
};
export const createChannelDataSuccess = (data) => {
  return {
    type: CREATE_CHANNEL_DATA_SUCCESS,
    payload: data,
  };
};
export const createChannelDataFailure = (error) => {
  return {
    type: CREATE_CHANNEL_DATA_FAILURE,
    payload: error,
  };
};

export const getChannelDataLoading = () => {
  return {
    type: GET_CHANNEL_DATA_LOADING,
  };
};
export const getChannelDataSuccess = (data) => {
  return {
    type: GET_CHANNEL_DATA_SUCCESS,
    payload: data,
  };
};
export const getChannelDataFailure = (error) => {
  return {
    type: GET_CHANNEL_DATA_FAILURE,
    payload: error,
  };
};

export const updateChannelDataLoading = () => {
  return {
    type: UPDATE_Channel_DATA_LOADING,
  };
};
export const updateChannelDataSuccess = (data) => {
  return {
    type: UPDATE_CHANNEL_DATA_SUCCESS,
    payload: data,
  };
};
export const updateChannelDataFailure = (error) => {
  return {
    type: UPDATE_CHANNEL_DATA_FAILURE,
    payload: error,
  };
};

export const createChannelApi = (data) => {
  let result = false;
  console.log("hello  ChannelPageApi called", data);
  return (dispatch) => {
    dispatch(createChannelDataLoading("Channel....", "Channel"));
    client
      .post("/api/onboard/addchannel", data)
      .then((response) => {
        console.log("---------------", response.status);
        result = true;
        if (response.status === 200) {
          console.log("ChannelGreat==>", response.data.result);
          dispatch(
            createChannelDataSuccess(
              response.data.result,
              "Channel Create Successfully",
              "Channel CREATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log("error caught in -> actions/Channel/Channel", err);
        result = false;
        dispatch(
          createChannelDataFailure(err, "Something went wrong", "Channel CREATE")
        );
      });

    return result;
  };
};

export const getChannelApi = () => {
  return (dispatch) => {
    dispatch(getChannelDataLoading("Channel....", "Channel"));
    client
      .get("/api/onboard/getChannel")
      .then((response) => {
        console.log("api response", response);
        //   console.log(response)
        if (response?.status === 200) {
          console.log("API SUCCESS2", response.data.result);
          dispatch(getChannelDataSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log("actions/Channel/Channel GET =>FAILURE", err);
        dispatch(getChannelDataFailure(err));
      });
  };
};

export const updateChannelApi = (data) => {
  // console.log("hello  ChannelPageApi called",data)
  return (dispatch) => {
    dispatch(updateChannelDataLoading("Channel....", "Channel"));
    client
      .post("/api/onboard/updateChannel", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("ChannelGreat==>", response.data);
          dispatch(
            updateChannelDataSuccess(
              response.data,
              "Channel Update Successfully",
              "Channel UPDATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        console.log("error caught in -> actions/Channel/Channel", err);
        dispatch(
          updateChannelDataFailure(err, "Something went wrong", "Channel UPDATE")
        );
      });
  };
};
