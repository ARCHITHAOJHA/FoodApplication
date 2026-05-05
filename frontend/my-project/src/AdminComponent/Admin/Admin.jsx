import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { RestaurantDashboard } from "../Dashboard/Dashboard";
import { Orders } from "../Orders/Orders";
import { Menu } from "../Menu/Menu";
import { FoodCategory } from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import { Events } from "../Event/Event";
import Details from "../Details/Details";
import { getRestaurantsCategory } from "../../components/State/Restaurant/Action";
import { fetchRestaurantsOrder } from "../../components/State/Restaurant Order/Action";

export const Admin = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector((store) => store.restaurant);
    const restaurantId = restaurant.usersRestaurant?.id;
    const hasRestaurant = Boolean(restaurantId);
    const hasCategories = restaurant.categories.length > 0;

    const handleClose = () => {
    };

    useEffect(() => {
        if (!jwt || !restaurantId) return;

        dispatch(getRestaurantsCategory({ jwt, restaurantId }));
        dispatch(fetchRestaurantsOrder({
            jwt,
            restaurantId,
        }));
    }, [dispatch, jwt, restaurantId]);

    return (
        <div>
            <div className='lg:flex justify-between'>
                <div>
                    <AdminSidebar handleClose={handleClose} />
                </div>
                <div className='lg:w-[80%]'>
                    <Routes>
                        <Route path='/' element={hasRestaurant ? <RestaurantDashboard /> : <Navigate to='/admin/restaurant/details' replace />} />
                        <Route path='/order' element={hasRestaurant ? <Orders /> : <Navigate to='/admin/restaurant/details' replace />} />
                        <Route path='/menu' element={hasRestaurant ? <Menu /> : <Navigate to='/admin/restaurant/details' replace />} />
                        <Route path='/category' element={hasRestaurant ? <FoodCategory /> : <Navigate to='/admin/restaurant/details' replace />} />
                        <Route path='/ingredients' element={hasRestaurant && hasCategories ? <Ingredients /> : <Navigate to={hasRestaurant ? '/admin/restaurant/category' : '/admin/restaurant/details'} replace />} />
                        <Route path='/event' element={hasRestaurant ? <Events /> : <Navigate to='/admin/restaurant/details' replace />} />
                        <Route path='/details' element={<Details />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
