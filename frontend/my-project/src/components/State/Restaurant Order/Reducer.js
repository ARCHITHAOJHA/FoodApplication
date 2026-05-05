
import {
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    GET_RESTAURANTS_ORDER_FAILURE,
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_SUCCESS
} from "./ActionType.js";

const initialState = {
    loading : false,
    error : null,
    orders: []
};

const restaurantOrdersReducer = (state = initialState,action) => {
    switch(action.type){
        case GET_RESTAURANTS_ORDER_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            };
        case GET_RESTAURANTS_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.payload
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            const updatedOrder = state.orders.map((order) => 
                order.id === action.payload.id?action.payload:order
            );
            return{
                ...state,
                loading: false,
                orders:updatedOrder
            };
        case GET_RESTAURANTS_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default restaurantOrdersReducer;