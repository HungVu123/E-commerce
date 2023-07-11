import {
  CREATE_MSG_REQUEST,
  CREATE_MSG_SUCCESS,
  CREATE_MSG_FAIL,
  GET_MSG_REQUEST,
  GET_MSG_SUCCESS,
  GET_MSG_FAIL,
  CLEAR_ERRORS,
} from "../constants/messageConstants";

export const newMessageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case CREATE_MSG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_MSG_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    case CREATE_MSG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getMessageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case GET_MSG_REQUEST:
      return {
        loading: true,
        messages: [],
      };

    case GET_MSG_SUCCESS:
      return {
        loading: false,
        messages: action.payload,
      };

    case GET_MSG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
