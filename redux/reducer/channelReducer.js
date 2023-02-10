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
const initialState = {
  loading: false,
  channelCreate: {},
  channelGet: {},
  channelUpdate: {},
  error: {},
};
const channelReducer = (state = initialState, action) => {
  // console.log("hello CHANNEL reducer called",action)
  switch (action.type) {
    case CREATE_CHANNEL_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CHANNEL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        channelCreate: action,
        error: {},
      };
    case CREATE_CHANNEL_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        channelCreate: [],
        error: action,
      };
    case GET_CHANNEL_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CHANNEL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        channelGet: action.payload,
        error: {},
      };
    case GET_CHANNEL_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        channelGet: [],
        error: action,
      };
    case UPDATE_CHANNEL_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CHANNEL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        channelUpdate: action,
        error: {},
      };
    case UPDATE_CHANNEL_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        channelUpdate: [],
        error: action,
      };
    default:
      return state;
  }
};

export default channelReducer;
