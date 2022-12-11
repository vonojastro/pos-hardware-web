import axios from "axios";
import { GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "../constants/productsConstant";

export const getProductsAction = (query) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get("/api/products", query);
    
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};