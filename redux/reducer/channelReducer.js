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
  ADD_MASTER_ATTRIBUTE_LOADING,
  ADD_MASTER_ATTRIBUTE_SUCCESS,
  ADD_MASTER_ATTRIBUTE_FAILURE,
  CHANNEL_ATTRIBUTE_UPDATE_DATA_LOADING,
  CHANNEL_ATTRIBUTE_UPDATE_DATA_SUCCESS,
  CHANNEL_ATTRIBUTE_UPDATE_DATA_FAILURE,
} from "../types/types";
const initialState = {
  loading: false,
  channelCreate: {},
  channelGet: {},
  channelUpdate: {},
  channelAttribute: {},
  channelMapping: {},
  error: {},
  getChannelAttribute: [],
  channelAttributeCreate: {},
  masterAttribute: [],
  updateChannelAttribute: {},
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
    case GET_CHANNEL_ATTRIBUTE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CHANNEL_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        channelAttribute: action.payload,
        error: {},
      };
    case GET_CHANNEL_ATTRIBUTE_FAILURE:
      return {
        ...state,
        loading: false,
        channelAttribute: [],
        error: action.payload,
      };

    case CHANNEL_MAPPING_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CHANNEL_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        channelMapping: action.payload,
        error: {},
      };
    case CHANNEL_MAPPING_FAILURE:
      return {
        ...state,
        loading: false,
        channelMapping: [],
        error: action.payload,
      };
    case GET_CHANNEL_ATTRIBUTE:
      return {
        ...state,
        getChannelAttribute: action.payload,
      };
    case CREATE_CHANNEL_ATTRIBUT_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CHANNEL_ATTRIBUT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        channelAttributeCreate: action,
        error: {},
      };
    case CREATE_CHANNEL_ATTRIBUTE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        channelAttributeCreate: [],
        error: action,
      };
    case ADD_MASTER_ATTRIBUTE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_MASTER_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        masterAttribute: action.payload,
        error: {},
      };
    case ADD_MASTER_ATTRIBUTE_FAILURE:
      return {
        ...state,
        loading: false,
        masterAttribute: [],
        error: action.payload,
      };

    case CHANNEL_ATTRIBUTE_UPDATE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_ATTRIBUTE_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        updateChannelAttribute: action.payload,
        error: {},
      };
    case CHANNEL_ATTRIBUTE_UPDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        updateChannelAttribute: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default channelReducer;
