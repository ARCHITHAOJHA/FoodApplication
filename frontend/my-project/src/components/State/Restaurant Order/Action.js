import {
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_SUCCESS,
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_FAILURE,
    GET_RESTAURANTS_ORDER_SUCCESS,
} from "./ActionType.js";

import { api } from "../../config/api.js";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

            const response = await api.put(
                `/api/admin/orders/${orderId}/${orderStatus}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            const updatedOrder = response.data;

            console.log("updated order", updatedOrder);

            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload: updatedOrder,
            });
        } catch (error) {
            console.log("catch error", error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
        }
    };
};

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

            const { data } = await api.get(
                `/api/admin/order/restaurant/${restaurantId}`,
                {
                    params: { order_status: orderStatus },
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("restaurants orders-------", data);
            dispatch({
                type: GET_RESTAURANTS_ORDER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, error });
        }
    };
};

