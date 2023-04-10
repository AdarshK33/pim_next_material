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
    type: UPDATE_CHANNEL_DATA_LOADING,
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
  // let result = false;
  // console.log("hello  ChannelPageApi called", data);
  return (dispatch) => {
    dispatch(createChannelDataLoading("Channel....", "Channel"));
    client
      .post("/api/channel/createChannel", data)
      .then((response) => {
        console.log("---------------", response.status);
        // result = true;
        if (response.status === 201) {
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
        //result = false;
        dispatch(
          createChannelDataFailure(err, "Something went wrong", "Channel CREATE")
        );
      });

    // return result;
  };
};

// export const getChannelApi = () => {
//   return (dispatch) => {
//     dispatch(getChannelDataLoading("Channel....", "Channel"));
//     client
//       .get("/api/channel/getChannel")
//       .then((response) => {
//         console.log("api response", response);
//         //   console.log(response)
//         if (response?.status === 200) {
//           console.log("API SUCCESS2", response.data.result);
//           dispatch(getChannelDataSuccess(response.data.result));
//         }
//       })
//       .catch((err) => {
//         console.log("actions/Channel/Channel GET =>FAILURE", err);
//         dispatch(getChannelDataFailure(err));
//       });
//   };
// };

export const updateChannelApi = (info) => {

  const data = {
    channelId:info?.id,
    channelName: info.channelName,
    channelDescription:info.channelDescription,
    countryName: info.countryName,
    brandName: info.brandName,
    marketplaceName: info.marketplaceName
}
  // console.log("hello  updateChannelApi called",info)
  // console.log("hello  updateChannelApi data",data)

  return (dispatch) => {
    dispatch(updateChannelDataLoading("Channel....", "Channel"));
    client
      .post("/api/channel/updateChannel", data)
      .then((response) => {
        console.log("ChannelGreat==>", response);

        if (response.status === 200) {
          console.log("ChannelGreat data==>", response.data);
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
        console.log("error caught in -> actions/Channel/updateChannelApi", err);
        dispatch(
          updateChannelDataFailure(err, "Something went wrong", "Channel UPDATE")
        );
      });
  };
};


export const getChannelListApi = (pageNumber,pageSize) => {

  
  const data = {
    pageNumber: pageNumber,
    pageSize: pageSize
  }

  // console.log("hello action data ",data)
    return (dispatch) => {
    dispatch(getChannelDataLoading("Channel....", "Channel"));
     
      client
        .post("/api/onboardQuery/getChannelsList",data)
        .then((response) => {
        // console.log("api response", response);
        if (response?.status === 200) {
            // console.log("API SUCCESS2", response.data.result);
          dispatch(getChannelDataSuccess(response.data.result));
           
          }
        })
        .catch((err) => {
          console.log("actions/OnboardQuery/Channel GET LIST =>FAILURE", err);
                  dispatch(getChannelDataFailure(err));
        });
    };
  };

