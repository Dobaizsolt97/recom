import {
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return {
        loading: true,
        product: {},
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCTS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCTS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
