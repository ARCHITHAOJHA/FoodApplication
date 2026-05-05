import { API_URL, api } from "../../config/api";
import {
  ADD_TO_FAVOURITE_FAILURE,
  ADD_TO_FAVOURITE_REQUEST,
  ADD_TO_FAVOURITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import axios from "axios";

const getErrorMessage = (error, fallback) => {
  if (error?.response?.status === 409) {
    return "Email already registered. Please login or use a different email.";
  }
  return error?.response?.data?.message || error?.message || fallback;
};

export const RegisterUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    reqData.navigate("/");
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: getErrorMessage(error, "Registration failed") });
  }
};

export const LoginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    reqData.navigate("/");
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: getErrorMessage(error, "Login failed") });
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  if (!jwt) {
    dispatch({ type: GET_USER_FAILURE, payload: "Missing auth token" });
    return;
  }

  try {
    const { data } = await api.get(`/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: getErrorMessage(error, "Failed to fetch user profile") });
  }
};

export const addToFavourites = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVOURITE_REQUEST });
  try {
    const { data } = await api.put(`/auth/restaurants/${restaurantId}/add-favourite`, {}, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_TO_FAVOURITE_FAILURE, payload: getErrorMessage(error, "Failed to update favourites") });
  }
};

export const logout = () => async (dispatch) => {
  const keysToRemove = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key && !key.startsWith("menu_backup_")) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
  dispatch({ type: LOGOUT });
};
