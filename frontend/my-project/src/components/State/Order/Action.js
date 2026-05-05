import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,

  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_USERS_ORDERS_FAILURE,

  GET_USERS_NOTIFICATION_REQUEST,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_NOTIFICATION_FAILURE,
} from "./ActionType";

import { api } from "../../config/api";

/* ============== CREATE ORDER ============== */
export const createOrderAction = (orderData, token) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post("/api/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(data.payment_url){
      window.location.href = data.payment_url;

    }
    console.log("Order created:", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* ============ GET USER ORDERS ============== */
export const getUsersOrdersAction = (token) => async (dispatch) => {
  dispatch({ type: GET_USERS_ORDERS_REQUEST });

  try {
    const { data } = await api.get("/api/orders/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: GET_USERS_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_ORDERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const getUsersNotificationAction = (token) => async (dispatch) => {
  dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });

  try {
    const { data } = await api.get("/api/notifications/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_USERS_NOTIFICATION_SUCCESS,
      payload: data,
    });

    console.log("User Notifications:", data);
  } catch (error) {
    dispatch({
      type: GET_USERS_NOTIFICATION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
