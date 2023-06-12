import {
  ATTRIBUTE_LIST_LOADING,
  ATTRIBUTE_LIST_SUCCESS,
  ATTRIBUTE_LIST_FAILURE,
  GET_ALL_PRODUCT_LIST_LOADING,
  GET_ALL_PRODUCT_LIST_SUCCESS,
  GET_ALL_PRODUCT_COUNT_SUCCESS,
  GET_ALL_PRODUCT_LIST_FAILURE,
  BULK_UPLOAD_LOADING,
  BULK_UPLOAD_SUCCESS,
  BULK_UPLOAD_FAILURE,
  GET_PRODUCT_DETAILS_LOADING,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  CREATE_ATTRIBUTE_SET_LOADING,
  CREATE_ATTRIBUTE_SET_SUCCESS,
  CREATE_ATTRIBUTE_SET_FAILURE,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  PUBLISH_CATALOG_REQUEST,
  PUBLISH_CATALOG_SUCCESS,
  PUBLISH_CATALOG_FAILURE,
  PRODUCT_UPDATE_DATA_LOADING,
  PRODUCT_UPDATE_DATA_SUCCESS,
  PRODUCT_UPDATE_DATA_FAILURE,
  ATTRIBUTE_SET_DETAILS_DATA_LOADING,
  ATTRIBUTE_SET_DETAILS_DATA_SUCCESS,
  ATTRIBUTE_SET_DETAILS_DATA_FAILURE,
  BULK_LIST_DATA_LOADING,
  BULK_LIST_DATA_SUCCESS,
  BULK_LIST_DATA_FAILURE,
  MEDIA_LISTING_LOADING,
  MEDIA_LISTING_SUCCESS,
  MEDIA_LISTING_FAILURE,
  GET_CATEGORIES_LIST_DATA_LOADING,
  GET_CATEGORIES_LIST_DATA_SUCCESS,
  GET_CATEGORIES_LIST_DATA_FAILURE,
  CATEGORY_UPDATE_DATA_LOADING,
  CATEGORY_UPDATE_DATA_SUCCESS,
  CATEGORY_UPDATE_DATA_FAILURE,
  MEDIA_UPLOAD_LOADING,
  MEDIA_UPLOAD_SUCCESS,
  MEDIA_UPLOAD_FAILURE,
  PRODUCT_SEARCH_DATA_LOADING,
  PRODUCT_SEARCH_DATA_SUCCESS,
  PRODUCT_SEARCH_DATA_FAILURE,
  BULK_EXPORT_DATA_LOADING,
  BULK_EXPORT_DATA_SUCCESS,
  BULK_EXPORT_DATA_FAILURE,
  ATTRIBUTE_SET_UPDATE_DATA_LOADING,
  ATTRIBUTE_SET_UPDATE_DATA_SUCCESS,
  ATTRIBUTE_SET_UPDATE_DATA_FAILURE,
  ATTRIBUTE_SET_GET_BY_ID_DATA_LOADING,
  ATTRIBUTE_SET_GET_BY_ID_DATA_SUCCESS,
  ATTRIBUTE_SET_GET_BY_ID_DATA_FAILURE,
} from "../types/types";

const initialState = {
  loading: false,
  attributeGet: {},
  getAllProducts: [],
  productCount: [],
  bulkUpload: {},
  productPimCodeData: {},
  publishProduct: [],
  createAttributeSet: {},
  productUpdate: {},
  attributeSetData: {},
  bulkData: {},
  mediaData: {},
  categoryList: {},
  categoryUpdate: {},
  catagoriesAdd: {},
  mediaUpload: {},
  productSearch: [],
  bulkExport: {},

  // refreshToken:{}
};
const catalogServiceNewReducer = (state = initialState, action) => {
  // console.log("hello search called", action);
  switch (action.type) {
    case ATTRIBUTE_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        attributeGet: action.payload,
        error: {},
      };
    case ATTRIBUTE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        attributeGet: [],
        error: action,
      };

    case GET_ALL_PRODUCT_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllProducts: action.payload,
        error: {},
      };
    case GET_ALL_PRODUCT_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        productCount: action.payload,
        error: {},
      };

    case GET_ALL_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        getAllProducts: [],
        error: action,
      };

    case BULK_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkUpload: action.payload,
        error: {},
      };
    case BULK_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        bulkUpload: [],
        error: action,
      };

    case GET_PRODUCT_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productPimCodeData: action.payload,
        error: {},
      };
    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        productPimCodeData: [],
        error: action,
      };
    case ADD_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        catagoriesAdd: action.payload,
        error: {},
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        catagoriesAdd: [],
        error: action,
      };

    case CREATE_ATTRIBUTE_SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ATTRIBUTE_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        createAttributeSet: action.payload,
        error: {},
      };
    case CREATE_ATTRIBUTE_SET_FAILURE:
      return {
        ...state,
        loading: false,
        createAttributeSet: [],
        error: action,
      };
    case PUBLISH_CATALOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_UPDATE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PUBLISH_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        publishProduct: action.payload,
        error: {},
      };
    case PUBLISH_CATALOG_FAILURE:
      return {
        ...state,
        loading: false,
        publishProduct: [],
        error: action,
      };

    case PRODUCT_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        productUpdate: action.payload,
        error: {},
      };
    case PRODUCT_UPDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        productUpdate: [],
        error: action,
      };
    case ATTRIBUTE_SET_DETAILS_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE_SET_DETAILS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        attributeSetData: action.payload,
        error: {},
      };
    case ATTRIBUTE_SET_DETAILS_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        attributeSetData: [],
        error: action,
      };
    case BULK_LIST_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BULK_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkData: action.payload,
        error: {},
      };
    case BULK_LIST_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        bulkData: [],
        error: action,
      };
    case MEDIA_LISTING_LOADING:
      return {
        ...state,
        loading: true,
      };

    case MEDIA_LISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        mediaData: action.payload,
        error: {},
      };
    case MEDIA_LISTING_FAILURE:
      return {
        ...state,
        loading: false,
        mediaData: [],
      };

    case GET_CATEGORIES_LIST_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryList: action.payload,
        error: {},
      };
    case GET_CATEGORIES_LIST_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        categoryList: [],
        error: action,
      };
    case CATEGORY_UPDATE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryUpdate: action.payload,
        error: {},
      };
    case CATEGORY_UPDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        categoryUpdate: [],
        error: action,
      };

    case MEDIA_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MEDIA_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        mediaUpload: action.payload,
        error: {},
      };
    case MEDIA_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        mediaUpload: [],
        error: action,
      };
    case PRODUCT_SEARCH_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        productSearch: action.payload,
        error: {},
      };
    case PRODUCT_SEARCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        productSearch: [],
        error: action,
      };

    case BULK_EXPORT_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BULK_EXPORT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        bulkExport: action.payload,
        error: {},
      };
    case BULK_EXPORT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        bulkExport: [],
        error: action,
      };
    default:
      return state;
  }
};

export default catalogServiceNewReducer;
