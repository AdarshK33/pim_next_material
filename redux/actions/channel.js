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
  GET_CHANNEL_ATTRIBUTE_LOADING,
  GET_CHANNEL_ATTRIBUTE_SUCCESS,
  GET_CHANNEL_ATTRIBUTE_FAILURE,
  CHANNEL_MAPPING_LOADING,
  CHANNEL_MAPPING_SUCCESS,
  CHANNEL_MAPPING_FAILURE,
  GET_CHANNEL_ATTRIBUTE,
  CREATE_CHANNEL_ATTRIBUT_DATA_LOADING,
  CREATE_CHANNEL_ATTRIBUT_DATA_SUCCESS,
  CREATE_CHANNEL_ATTRIBUTE_DATA_FAILURE,
} from "../types/types";
import { client } from "../../utils/axios";

export const getChannelAttributes = (page, data) => {
  return {
    type: GET_CHANNEL_ATTRIBUTE,
    payload: {
      page,
      data,
    },
  };
};

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

export const getChannelAttributeLoading = () => {
  return {
    type: GET_CHANNEL_ATTRIBUTE_LOADING,
  };
};
export const getChannelAttributeSuccess = (data) => {
  return {
    type: GET_CHANNEL_ATTRIBUTE_SUCCESS,
    payload: data,
  };
};
export const getChannelAttributeFailure = (error) => {
  return {
    type: GET_CHANNEL_ATTRIBUTE_FAILURE,
    payload: error,
  };
};

export const channelMappingLoading = () => {
  return {
    type: CHANNEL_MAPPING_LOADING,
  };
};
export const channelMappingSuccess = (data) => {
  return {
    type: CHANNEL_MAPPING_SUCCESS,
    payload: data,
  };
};
export const channelMappingFailure = (error) => {
  return {
    type: CHANNEL_MAPPING_FAILURE,
    payload: error,
  };
};

export const createChannelAttributesDataLoading = () => {
  return {
    type: CREATE_CHANNEL_ATTRIBUT_DATA_LOADING,
  };
};
export const createChannelAttributesDataSuccess = (data) => {
  return {
    type: CREATE_CHANNEL_ATTRIBUT_DATA_SUCCESS,
    payload: data,
  };
};
export const createChannelAttributesDataFailure = (error) => {
  return {
    type: CREATE_CHANNEL_ATTRIBUTE_DATA_FAILURE,
    payload: error,
  };
};

export const createChannelApi = (data) => {
  return (dispatch) => {
    dispatch(createChannelDataLoading("Channel....", "Channel"));
    client
      .post("/api/catalogServiceNew/createChannels", data)
      .then((response) => {
        // result = true;
        if (response.status === 201) {
          dispatch(createChannelDataSuccess(response.data.result));
        } else throw new Error("");
      })
      .catch((err) => {
        dispatch(createChannelDataFailure(err));
      });
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
    channelId: info?.channelId,
    // channelName: info.channelName,
    description: info.channelDescription,
    // countryName: info.countryName,
    // brandName: info.brandName,
    // marketplaceName: info.marketplaceName
  };
  // console.log("hello  updateChannelApi called",info)

  return (dispatch) => {
    dispatch(updateChannelDataLoading("Channel....", "Channel"));
    client
      .post("/api/channel/updateChannel", data)
      .then((response) => {
        if (response.status === 200) {
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
        dispatch(
          updateChannelDataFailure(
            err,
            "Something went wrong",
            "Channel UPDATE"
          )
        );
      });
  };
};

export const getChannelListApi = (pageNo, pageSize) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
  };

  // console.log("hello action data ",data)
  return (dispatch) => {
    dispatch(getChannelDataLoading("Channel....", "Channel"));

    client
      .post("/api/catalogServiceNew/getChannels", data)
      .then((response) => {
        // console.log("api response", response);
        if (response?.status === 200) {
          // console.log("API SUCCESS2", response.data.result);
          dispatch(getChannelDataSuccess(response.data.result));
        }
      })
      .catch((err) => {
        dispatch(getChannelDataFailure(err));
      });
  };
};

export const channelAttributeApiList = (
  channelFilter,
  pageNumber,
  pageSize
) => {
  const data = {
    channelFilter: channelFilter,
    pageNo: pageNumber,
    pageSize: pageSize,
  };

  return (dispatch) => {
    dispatch(getChannelAttributeLoading("loading...", "channel"));
    client
      .post("/api/channel/channelAttribute", data)
      .then((response) => {
        if (response?.status === 200) {
          dispatch(getChannelAttributeSuccess(response.data.result));
        }
      })
      .catch((err) => {
        dispatch(getChannelAttributeFailure(err));
      });
  };
};

export const channelMappingApi = (channel, data) => {
  return (dispatch) => {
    dispatch(channelMappingLoading("loading...", "channel"));
    client
      .post("/api/channel/channelMapping", data)
      .then((response) => {
        if (response?.status === 200) {
          dispatch(channelMappingSuccess(response.data.result));
          dispatch(channelAttributeApiList(channel, 0, 5));
        }
      })
      .catch((err) => {
        dispatch(channelMappingFailure(err));
      });
  };
};

export const createChannelAttributesApi = (info) => {
  const data = {
    keyName: info.keyName,
    channelId: info.channelId,
    inputType: "text",
    mandatory: true,
    readOnly: true,
    aliasKeyName: info.keyName,
    structureType: "ARRAY",
  };
  return (dispatch) => {
    dispatch(createChannelAttributesDataLoading("....Channel", "Attributes"));
    client
      .post("/api/catalogServiceNew/addChannelAttributes", data)
      .then((response) => {
        // result = true;
        if (response) {
          dispatch(createChannelAttributesDataSuccess(response.data.result));
        } else throw new Error("");
      })
      .catch((err) => {
        dispatch(createChannelAttributesDataFailure(err));
      });
  };
};
