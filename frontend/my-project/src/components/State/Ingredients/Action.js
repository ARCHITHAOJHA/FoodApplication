import{
    CREATE_INGREDIENT_SUCCESS,
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENTS,
    UPDATE_STOCK,
} from "./ActionType";

import {api} from "../../config/api";

const getIngredientBackupKey = (restaurantId) => `ingredient_backup_${restaurantId}`;
const getIngredientCategoryBackupKey = (restaurantId) => `ingredient_category_backup_${restaurantId}`;

const readIngredientBackup = (restaurantId) => {
    try {
        const raw = localStorage.getItem(getIngredientBackupKey(restaurantId));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("reading ingredient backup failed", error);
        return [];
    }
};

const writeIngredientBackup = (restaurantId, items) => {
    try {
        localStorage.setItem(getIngredientBackupKey(restaurantId), JSON.stringify(items));
    } catch (error) {
        console.log("writing ingredient backup failed", error);
    }
};

const readIngredientCategoryBackup = (restaurantId) => {
    try {
        const raw = localStorage.getItem(getIngredientCategoryBackupKey(restaurantId));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("reading ingredient category backup failed", error);
        return [];
    }
};

const writeIngredientCategoryBackup = (restaurantId, items) => {
    try {
        localStorage.setItem(getIngredientCategoryBackupKey(restaurantId), JSON.stringify(items));
    } catch (error) {
        console.log("writing ingredient category backup failed", error);
    }
};

const normalizeCreatedIngredient = (responseData, requestData) => {
    if (responseData && typeof responseData === "object" && !Array.isArray(responseData)) {
        return {
            ...responseData,
            name: responseData.name ?? requestData.name,
            category: responseData.category ?? {
                id: requestData.categoryId,
                name: requestData.categoryName ?? responseData.category?.name ?? "",
            },
        };
    }

    return {
        id: responseData?.id ?? Date.now(),
        name: requestData.name,
        category: {
            id: requestData.categoryId,
            name: requestData.categoryName ?? "",
        },
        inStock: responseData?.inStock ?? true,
    };
};

export const getIngredientsOfRestaurant = ({id,jwt}) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `/api/admin/ingredients/restaurant/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }

            );

                let payload = response.data;
                if (!Array.isArray(payload) || payload.length === 0) {
                    const backup = readIngredientBackup(id);
                    if (backup.length > 0) {
                        console.log("using ingredient backup", backup);
                        payload = backup;
                    }
                }

            console.log("get all ingredients",response.data);
            dispatch({
                type: GET_INGREDIENTS,
                payload,
            });
        }
        catch (error) {
            console.log("error",error);

        }

    };
};

export const createIngredient = ({data,jwt}) => {
    return async (dispatch) => {
        try {
            const response = await api.post(
                `/api/admin/ingredients`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }

            );
            console.log("create  ingredients",response.data);
            const createdIngredient = normalizeCreatedIngredient(response.data, data);
            console.log("normalized ingredient", createdIngredient);

            const restaurantId = data?.restaurantId;
            if (restaurantId) {
                const existing = readIngredientBackup(restaurantId);
                const nextItems = existing.some((item) => item.id === createdIngredient.id)
                    ? existing
                    : [...existing, createdIngredient];
                writeIngredientBackup(restaurantId, nextItems);
                console.log("ingredient backup saved", nextItems);
            }

            dispatch({
                type:CREATE_INGREDIENT_SUCCESS,
                payload: createdIngredient,
            });
            return createdIngredient;
        }
        catch (error) {
            console.log("error",error);
            throw error;
        }

    };
};

export const createIngredientCategory = ({data,jwt}) => {
    console.log("data",data,"jwt",jwt);
    return async (dispatch) => {
        try {
            const response = await api.post(
                `/api/admin/ingredients/category`, data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }

            );
            console.log("create  ingredients category",response.data);
            const createdCategory = response.data && typeof response.data === "object"
                ? response.data
                : { id: Date.now(), name: data?.name };

            const restaurantId = data?.restaurantId;
            if (restaurantId) {
                const existing = readIngredientCategoryBackup(restaurantId);
                const nextItems = existing.some((item) => item.id === createdCategory.id)
                    ? existing
                    : [...existing, createdCategory];
                writeIngredientCategoryBackup(restaurantId, nextItems);
                console.log("ingredient category backup saved", nextItems);
            }

            dispatch({
                type:CREATE_INGREDIENT_CATEGORY_SUCCESS,
                payload: createdCategory,
            });
            return createdCategory;
        }
        catch (error) {
            console.log("error",error);
            throw error;
        }

    };
};

export const getIngredientCategory = ({id,jwt}) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `/api/admin/ingredients/restaurants/${id}/category`, 
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }

            );
            console.log("get ingredients category",response.data);

            let payload = response.data;
            if (!Array.isArray(payload) || payload.length === 0) {
                const backup = readIngredientCategoryBackup(id);
                if (backup.length > 0) {
                    console.log("using ingredient category backup", backup);
                    payload = backup;
                }
            }

            dispatch({
                type:GET_INGREDIENT_CATEGORY_SUCCESS,
                payload,
            });
        }
        catch (error) {
            console.log("error",error);

        }

    };
};



export const updateStockOfIngredient = ({id,jwt}) => {
    return async (dispatch) => {
        try {
            const {data} = await api.put(
                `/api/admin/ingredients/${id}/stock`, {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }

            );
            const payload = data && typeof data === "object"
                ? data
                : { id, rawResponse: data };
            console.log("update ingredients stock", payload);
            dispatch({
                type:UPDATE_STOCK,
                payload,
            });
            return payload;
        }
        catch (error) {
            console.log("error",error);
            throw error;

        }

    };
};



