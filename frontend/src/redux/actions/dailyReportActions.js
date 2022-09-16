import {
  DAILYREPORT_LIST_FAIL,
  DAILYREPORT_LIST_REQUEST,
  DAILYREPORT_LIST_SUCCESS,
} from "../constants/dailyReportConstants";
import axios from "axios";

export const getDailyreportList = () => async (dispatch) => {
  try {
    dispatch({
      type: DAILYREPORT_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/dailyreport");
    console.log(data);
    dispatch({
      type: DAILYREPORT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DAILYREPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDailyReport = (totalIn, totalOut) => async (dispatch) => {
  try {
    dispatch({
      type: DAILYREPORT_LIST_REQUEST,
    });

    const { data } = await axios.post("/api/dailyreport", {
      totalIn,
      totalOut,
    });

    dispatch({
      type: DAILYREPORT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DAILYREPORT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
