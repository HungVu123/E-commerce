import {
  CREATE_MSG_REQUEST,
  CREATE_MSG_SUCCESS,
  CREATE_MSG_FAIL,
  GET_MSG_REQUEST,
  GET_MSG_SUCCESS,
  GET_MSG_FAIL,
  CLEAR_ERRORS,
} from "../constants/messageConstants";
import axios from "axios";

// Send Msg
export const addMsg = (from, to, message) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MSG_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/addmsg`,
      { from, to, message },
      config
    );

    dispatch({ type: CREATE_MSG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_MSG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Msg
export const getAllMsg = (from, to) => async (dispatch) => {
  try {
    dispatch({ type: GET_MSG_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/getmsg`,
      { from, to },
      config
    );

    dispatch({ type: GET_MSG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MSG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
