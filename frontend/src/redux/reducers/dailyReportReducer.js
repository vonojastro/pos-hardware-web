import {
  DAILYREPORT_ADD_REQUEST,
  DAILYREPORT_ADD_SUCCESS,
  DAILYREPORT_LIST_FAIL,
  DAILYREPORT_LIST_REQUEST,
  DAILYREPORT_LIST_SUCCESS,
} from "../constants/dailyReportConstants";

export const getDailyreportReducer = (state = { dailyreport: [] }, action) => {
  switch (action.type) {
    case DAILYREPORT_LIST_REQUEST:
      return {
        loading: true,
      };
    case DAILYREPORT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyreport: action.payload,
      };
    case DAILYREPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addDailyreportReducer = (
  state = { totalIn: [], totalOut: [] },
  action
) => {
  switch (action.type) {
    case DAILYREPORT_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DAILYREPORT_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        dailyreport: action.payload,
      };
    case DAILYREPORT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
