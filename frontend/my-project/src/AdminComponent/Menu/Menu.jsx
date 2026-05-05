import React from "react"
import { Alert, Card, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { createMenuItem, getMenuItemsByRestaurantId } from "../../components/State/Menu/Action"
import MenuTable from "./MenuTable"
import CreateMenuForm from "./CreateMenuForm"

export const Menu = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurantEntity = useSelector((store) => store.restaurant.usersRestaurant || store.restaurant.usersRestaurants);
    const restaurantId = restaurantEntity?.id || localStorage.getItem("activeRestaurantId");
    const categories = useSelector((store) => store.restaurant.categories);
    const [submitError, setSubmitError] = React.useState("");
    const [submitSuccess, setSubmitSuccess] = React.useState("");

    React.useEffect(() => {
        if (!jwt || !restaurantId) return;

        const backupKey = `menu_backup_${restaurantId}`;
        const rawBackup = localStorage.getItem(backupKey);
        if (rawBackup) {
            try {
                const backup = JSON.parse(rawBackup);
                if (Array.isArray(backup) && backup.length > 0) {
                    dispatch({
                        type: "GET_MENU_BY_RESTAURANT_ID_SUCCESS",
                        payload: backup,
                    });
                }
            } catch (error) {
                console.log("Failed to hydrate menu backup", error);
            }
        }

        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId,
            vegetarian: false,
            nonVeg: false,
            seasonal: false,
            foodCategory: "",
        }));
    }, [dispatch, jwt, restaurantId]);

    const handleCreateMenu = async (menu) => {
        if (!jwt || !restaurantId) {
            setSubmitError("Restaurant details are missing. Please complete Details first.");
            setSubmitSuccess("");
            return false;
        }

        const vegetarian = menu.type === "VEG";
        const nonVeg = menu.type === "NON_VEG";
        const seasonal = menu.type === "SEASONAL";
        const foodCategory = menu.foodCategory?.trim();

        const payload = {
            name: menu.name,
            description: menu.description,
            price: menu.price,
            images: menu.images,
            restaurantId,
            vegetarian,
            nonVeg,
            seasonal,
        };

        if (foodCategory) {
            payload.foodCategory = foodCategory;
        }

        try {
            setSubmitError("");
            await dispatch(createMenuItem({
                menu: payload,
                jwt,
            }));

            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId,
                vegetarian: false,
                nonVeg: false,
                seasonal: false,
                foodCategory: "",
            }));

            setSubmitSuccess("Menu item saved successfully.");
            return true;
        } catch (error) {
            setSubmitSuccess("");
            setSubmitError(error.response?.data?.message || error.message || "Failed to save menu item.");
            return false;
        }
    };

    return (
        <div className='px-2'>
            <Card className='p-5 mb-4'>
                <Typography variant='h6' sx={{ paddingBottom: '1rem' }}>
                    Add Menu Item
                </Typography>
                {submitError && <Alert severity='error' sx={{ marginBottom: '1rem' }}>{submitError}</Alert>}
                {submitSuccess && <Alert severity='success' sx={{ marginBottom: '1rem' }}>{submitSuccess}</Alert>}
                <CreateMenuForm categories={categories} onCreate={handleCreateMenu} />
            </Card>
            <MenuTable/>
        </div>
    )
}