import {
  TRANSACTIONS_FAIL,
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_SUCCESS,
  TRANSACTION_ADD_FAIL,
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
} from "../constants/transactionsConstants";
import axios from "axios";

export const getTransactionList = () => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTIONS_REQUEST,
    });

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/transactions`);

    dispatch({
      type: TRANSACTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTransactionDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/transactions/${id}`);

    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTransaction =
  (name, amount, description, category, fee, isIn, isPaid) => async (dispatch) => {
    try {
      dispatch({
        type: TRANSACTION_ADD_REQUEST,
      });

      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/transactions`, {
        name,
        amount,
        description,
        category,
        fee,
        isIn,
        isPaid
      });

      dispatch({
        type: TRANSACTION_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
    });

    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/transactions/${id}`);

    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
