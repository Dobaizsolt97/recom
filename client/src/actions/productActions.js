import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
} from "../constants/productConstants";
import Axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    console.log("fetching all items");
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const { data } = await Axios.get("/api/products");
    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
    console.log("dispatched all items");
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listProductsDetails = (id) => async (dispatch) => {
  try {
    console.log("fetching product details");
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });
    const { data } = await Axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data,
    });
    console.log("dispatched the detail data");
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
