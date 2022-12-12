import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "../constants/productsConstant";

export const getProductsReducer = (
    state = { products: [] },
    action
  ) => {
    switch (action.type) {
      case GET_PRODUCTS_REQUEST:
        return {
          loading: true,
        };
      case GET_PRODUCTS_SUCCESS:
        return {
          loading: false,
          success: true,
          products: action.payload,
        };
      case GET_PRODUCTS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_PRODUCT_REQUEST:
        return {
          loading: true,
          success: false
        };
      case ADD_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: true,
          product: action.payload,
        };
      case ADD_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };

  export const deleteProductReducer = (state = {}, action) => {
    switch (action.payload) {
      case DELETE_PRODUCT_REQUEST:
        return {
          loading: true,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case DELETE_PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  