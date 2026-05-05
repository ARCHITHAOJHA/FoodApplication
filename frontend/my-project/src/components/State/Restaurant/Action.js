import { api } from "../../config/api";
import * as types from "./ActionTypess";

const getFoodCategoryBackupKey = (restaurantId) => `food_category_backup_${restaurantId}`;

const readFoodCategoryBackup = (restaurantId) => {
  try {
    const raw = localStorage.getItem(getFoodCategoryBackupKey(restaurantId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("reading food category backup failed", error);
    return [];
  }
};

const writeFoodCategoryBackup = (restaurantId, items) => {
  try {
    localStorage.setItem(getFoodCategoryBackupKey(restaurantId), JSON.stringify(items));
  } catch (error) {
    console.log("writing food category backup failed", error);
  }
};

export const getAllRestaurantsAction = (token) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_RESTAURANTS_REQUEST });
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const { data } = await api.get("/api/restaurants", config);
    dispatch({ type: types.GET_ALL_RESTAURANTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_ALL_RESTAURANTS_FAILURE, payload: error });
  }
};

export const getAllRestaurantById = ({ jwt, id }) => async (dispatch) => {
  dispatch({ type: types.GET_RESTAURANT_BY_ID_REQUEST });
  try {
    const config = jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : {};
    const { data } = await api.get(`/api/restaurants/${id}`, config);
    dispatch({ type: types.GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_RESTAURANT_BY_ID_FAILURE, payload: error });
  }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_RESTAURANTS_BY_USER_ID_REQUEST });
  if (!jwt) {
    dispatch({ type: types.GET_RESTAURANTS_BY_USER_ID_FAILURE, payload: "Missing auth token" });
    return;
  }

  try {
    const { data } = await api.get("/api/admin/restaurants/user", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.GET_RESTAURANTS_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_RESTAURANTS_BY_USER_ID_FAILURE, payload: error });
  }
};

export const createRestaurant = ({ data, token }) => async (dispatch) => {
  dispatch({ type: types.CREATE_RESTAURANT_REQUEST });
  try {
    const res = await api.post("/api/admin/restaurants", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: types.CREATE_RESTAURANT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.CREATE_RESTAURANT_FAILURE, payload: error });
  }
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {
  dispatch({ type: types.UPDATE_RESTAURANTS_REQUEST });
  try {
    const res = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.UPDATE_RESTAURANTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_RESTAURANTS_FAILURE, payload: error });
  }
};

export const deleteRestaurant = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: types.DELETE_RESTAURANT_REQUEST });
  try {
    await api.delete(`/api/admin/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
  } catch (error) {
    dispatch({ type: types.DELETE_RESTAURANT_FAILURE, payload: error });
  }
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: types.UPDATE_RESTAURANTS_STATUS_REQUEST });
  try {
    const res = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.UPDATE_RESTAURANTS_STATUS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_RESTAURANTS_STATUS_FAILURE, payload: error });
  }
};

export const createEventAction = ({ data, jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: types.CREATE_EVENTS_REQUEST });
  try {
    const res = await api.post(`/api/admin/events/restaurant/${restaurantId}`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.CREATE_EVENTS_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create event";
    dispatch({ type: types.CREATE_EVENTS_FAILURE, payload: message });
    throw error;
  }
};

export const getAllEvents = ({ jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_EVENTS_REQUEST });
  try {
    const res = await api.get(`/api/events`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.GET_ALL_EVENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.GET_ALL_EVENTS_FAILURE, payload: error });
  }
};

export const deleteEvents = ({ eventId, jwt }) => async (dispatch) => {
  dispatch({ type: types.DELETE_EVENTS_REQUEST });
  try {
    await api.delete(`/api/admin/events/${eventId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.DELETE_EVENTS_SUCCESS, payload: eventId });
  } catch (error) {
    dispatch({ type: types.DELETE_EVENTS_FAILURE, payload: error });
  }
};

export const getRestaurantsEvents = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_RESTAURANTS_EVENTS_REQUEST });
  try {
    const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: types.GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
  } catch (error) {
    console.error("getRestaurantsEvents error:", error.response || error);
    const message = error.response?.data?.message || error.message || error;
    dispatch({ type: types.GET_RESTAURANTS_EVENTS_FAILURE, payload: message });
  }
};

export const createCategoryAction = ({ reqData, jwt }) => async (dispatch) => {
  dispatch({ type: types.CREATE_CATEGORY_REQUEST });
  try {
    const res = await api.post(`/api/admin/category`, reqData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const category = res.data && typeof res.data === "object" ? res.data : { id: Date.now(), ...reqData };
    const restaurantId = reqData?.restaurantId;
    if (restaurantId) {
      const existing = readFoodCategoryBackup(restaurantId);
      const nextItems = existing.some((item) => item.id === category.id) ? existing : [...existing, category];
      writeFoodCategoryBackup(restaurantId, nextItems);
      console.log("food category backup saved", nextItems);
    }
    dispatch({ type: types.CREATE_CATEGORY_SUCCESS, payload: category });
    return category;
  } catch (error) {
    dispatch({ type: types.CREATE_CATEGORY_FAILURE, payload: error });
    throw error;
  }
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: types.GET_RESTAURANTS_CATEGORY_REQUEST });
  try {
    const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    let payload = res.data;
    if (!Array.isArray(payload) || payload.length === 0) {
      const backup = readFoodCategoryBackup(restaurantId);
      if (backup.length > 0) {
        console.log("using food category backup", backup);
        payload = backup;
      }
    }
    dispatch({ type: types.GET_RESTAURANTS_CATEGORY_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: types.GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
  }
};
