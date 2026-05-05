import {
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_SUCCESS,
    GET_INGREDIENTS,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    UPDATE_STOCK,
} from "./ActionType";

const normalizeList = (payload, keyCandidates = []) => {
    if (Array.isArray(payload)) return payload;

    if (payload && typeof payload === "object") {
        for (const key of [...keyCandidates, "data", "items", "content", "results"]) {
            if (Array.isArray(payload[key])) return payload[key];
        }
    }

    return [];
};

const initialState = {
    ingredients: [],
    update:  null,
    Category:[],
};

export const ingredientReducer = (state = initialState,action) => {
    switch(action.type) {
        case GET_INGREDIENTS:
            return{
                ...state,
                ingredients: normalizeList(action.payload, ["ingredients"]),
            };
        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return{
                ...state,
                Category: normalizeList(action.payload, ["category", "categories"]),
            };
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            if (!action.payload || typeof action.payload !== "object") {
                return state;
            }
            return{
                ...state,
                Category: [...state.Category,action.payload],
            };
        case CREATE_INGREDIENT_SUCCESS:
            if (!action.payload || typeof action.payload !== "object") {
                return state;
            }
            return{
                ...state,
                ingredients:[...state.ingredients,action.payload],
            };
        case UPDATE_STOCK:
            return{
                ...state,
                update: action.payload,
                ingredients: normalizeList(state.ingredients).map((item) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    }

                    const nextInStock = typeof action.payload.inStock === "boolean"
                        ? action.payload.inStock
                        : !item.inStock;

                    return {
                        ...item,
                        ...action.payload,
                        inStock: nextInStock,
                    };
                }),
            };
        default:
            return state;

    }
};

export default ingredientReducer;
