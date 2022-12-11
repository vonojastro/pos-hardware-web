import axios from "axios";
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_RESET, ADD_PRODUCT_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "../constants/productsConstant";

export const getProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get("/api/products");
    
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

export const addProductAction =
  ( productName,
    brand,
    description,
    supplier,
    totalCost,
    costPerUnit,
    retailPrice,
    wholesalePrice,
    qty,
    unit,
    storageLocation) => async (dispatch) => {
    try {

      dispatch({
        type: ADD_PRODUCT_REQUEST,
      });

      const { data } = await axios.post("/api/products", {
        productName,
        brand,
        description,
        supplier,
        totalCost,
        costPerUnit,
        retailPrice,
        wholesalePrice,
        qty,
        unit,
        storageLocation,
      });

      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: data,
      });

    

    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };