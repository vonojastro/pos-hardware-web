import axios from "axios";
import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "../constants/productsConstant";

export const getProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);

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
  (
    productName,
    brand,
    description,
    supplier,
    totalCost,
    costPerUnit,
    retailPrice,
    wholesalePrice,
    stock,
    unit,
    storageLocation
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PRODUCT_REQUEST,
      });

      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products`, {
        productName,
        brand,
        description,
        supplier,
        totalCost,
        costPerUnit,
        retailPrice,
        wholesalePrice,
        stock,
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

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductAction =
  ({
    _id,
    productName,
    brand,
    description,
    supplier,
    totalCost,
    costPerUnit,
    retailPrice,
    wholesalePrice,
    stock,
    unit,
    storageLocation,
  }) =>
  async (dispatch) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/products/`, {
        _id,
        productName,
        brand,
        description,
        supplier,
        totalCost,
        costPerUnit,
        retailPrice,
        wholesalePrice,
        stock,
        unit,
        storageLocation,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
