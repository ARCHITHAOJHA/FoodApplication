import {api} from "../../config/api";


import{
    CREATE_MENU_FAILURE,
    CREATE_MENU_REQUEST,
    CREATE_MENU_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_MENU_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";



export const createMenuItem = ({menu,jwt}) => {
    return async (dispatch) => {
        dispatch({type: CREATE_MENU_REQUEST});
        try{
            const {data} = await api.post("/api/admin/food",menu,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },    
            });
            console.log("created menu",data);
            dispatch({type:CREATE_MENU_SUCCESS,payload: data});

            try {
                const rid = menu?.restaurantId;
                if (rid) {
                    const key = `menu_backup_${rid}`;
                    const raw = localStorage.getItem(key);
                    const list = raw ? JSON.parse(raw) : [];
                    // Append returned item if not already present by id
                    const exists = list.some((it) => it.id === data.id);
                    if (!exists) {
                        list.push(data);
                        localStorage.setItem(key, JSON.stringify(list));
                        console.log(`menu backup saved to ${key}:`, list);
                    }
                }
            } catch (err) {
                console.log('menu backup save failed', err);
            }
            return data;
        }
        catch (error){
            console.log("catch error",error);
            const message = error.response?.data?.message || error.message || "Failed to create menu item";
            dispatch({type:CREATE_MENU_FAILURE,payload:message});
            throw error;
        }
        
    };
};



export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({type: GET_MENU_BY_RESTAURANT_ID_REQUEST});
        try{
            const params = {};

            if (reqData.vegetarian === true) {
                params.vegetarian = true;
            }

            if (reqData.nonVeg === true) {
                params.nonVeg = true;
            }

            if (reqData.seasonal === true) {
                params.seasonal = true;
            }

            if (reqData.foodCategory && reqData.foodCategory.trim()) {
                params.food_category = reqData.foodCategory.trim();
            }

            const config = { params };

            if (reqData.jwt) {
                config.headers = {
                    Authorization: `Bearer ${reqData.jwt}`,
                };
            }

            const {data} = await api.get(
                `/api/food/restaurants/${reqData.restaurantId}`,
                config
            );
            console.log(" menu items by restaurants",data);
            
            // If backend returned empty or non-array, try local backup
            let payload = data;
            if (!Array.isArray(data) || data.length === 0) {
                console.log('Backend returned empty/invalid data, checking localStorage backup...');
                try {
                    const key = `menu_backup_${reqData.restaurantId}`;
                    const raw = localStorage.getItem(key);
                    if (raw) {
                        const backup = JSON.parse(raw);
                        if (Array.isArray(backup) && backup.length > 0) {
                            console.log(`Using local backup from ${key}:`, backup);
                            payload = backup;
                        } else {
                            console.log(`Backup at ${key} is empty or invalid`);
                        }
                    } else {
                        console.log(`No backup found at ${key}`);
                    }
                } catch (err) {
                    console.log('reading menu backup failed', err);
                }
            }

            dispatch({type:GET_MENU_BY_RESTAURANT_ID_SUCCESS,payload: payload});
        }
        catch (error){
            console.log("catch error",error);
            dispatch({type:GET_MENU_BY_RESTAURANT_ID_FAILURE,payload:error});
        }
        
    };
};



export const searchMenuItem = ({keyword , jwt}) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.get(
                `/api/food/search?name=${keyword}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },    
            });
            console.log("data.......",data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload: data});
        }
        catch (error){
            console.log("catch error",error);
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error});
        }
        
    };
};


/*export const getAllIngredientsOfMenuItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type: });
        try{
            const {data} = await api.get(
                `api/food/restaurant/${reqData.restaurantId}`,{
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },    
            });
            console.log("menu item by restaurants",data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload: data});
        }
        catch (error){
            console.log("catch error",error);
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error});
        }
        
    };
};*/



export const updateMenuItemsAvailability = ({foodId , jwt}) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try{
            const {data} = await api.put(
                `/api/admin/food/${foodId}`,{}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },    
            });
            console.log("update menu item availability",data);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload: data});
        }
        catch (error){
            console.log("catch error",error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error});
        }
        
    };
};



export const deleteFoodAction = ({foodId , jwt}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_MENU_ITEM_REQUEST});
        try{
            const {data} = await api.delete(
                `/api/admin/food/${foodId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },    
            });
            console.log("delete food",data);
            dispatch({type:DELETE_MENU_ITEM_SUCCESS,payload: data});
        }
        catch (error){
            dispatch({type:DELETE_MENU_ITEM_FAILURE,payload:error});
        }
        
    };
};
