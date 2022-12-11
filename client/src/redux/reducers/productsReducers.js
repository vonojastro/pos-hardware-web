import { GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "../constants/productsConstant";

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