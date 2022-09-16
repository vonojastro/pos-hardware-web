import {
  TRANSACTIONS_FAIL,
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_SUCCESS,
  TRANSACTION_ADD_FAIL,
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_RESET,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
} from "../constants/transactionsConstants";

export const getTransactionsReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        success: true,
        transactions: action.payload,
      };
    case TRANSACTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTransactionReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case TRANSACTION_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload,
      };
    case TRANSACTION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload,
      };
    case TRANSACTION_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TRANSACTION_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteTransactionReducer = (state = {}, action) => {
  switch (action.payload) {
    case TRANSACTION_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TRANSACTION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
