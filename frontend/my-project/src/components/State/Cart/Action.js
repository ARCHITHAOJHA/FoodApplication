import {api} from "../../config/api";

import{
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS,
    REMOVE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
} from "./ActionTypes";




/* ================= FIND CART ================= */
export const findCartAction = (token) => async (dispatch) => {
  dispatch({ type: FIND_CART_REQUEST });

  if (!token) {
    dispatch({
      type: FIND_CART_FAILURE,
      payload: "Missing auth token",
    });
    return;
  }

  try {
    const { data } = await api.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: FIND_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* ================= CLEAR CART ================= */
export const clearCartAction = (token) => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });

  try {
    const { data } = await api.delete("/api/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: CLEAR_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* ============ GET ALL CART ITEMS ============== */
export const getAllCartItemsAction = (token) => async (dispatch) => {
  dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });

  try {
    const { data } = await api.get("/api/cart/items", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: GET_ALL_CART_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_ITEMS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* ============== ADD ITEM TO CART ============== */
export const addItemToCartAction = (cartItem, token) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await api.post("/api/cart/add", cartItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* ============== UPDATE CART ITEM ============== */
export const updateCartItemAction =
  (cartItemId, updatedData, token) => async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });

    try {
      const { data } = await api.put(
        `/api/cart/item/${cartItemId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: UPDATE_CARTITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CARTITEM_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

/* ============== REMOVE CART ITEM ============== */
export const removeCartItemAction =
  (cartItemId, token) => async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });

    try {
      const { data } = await api.delete(
        `/api/cart/item/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: REMOVE_CARTITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_CARTITEM_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
