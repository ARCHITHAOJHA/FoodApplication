import React, { useEffect } from "react";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllRestaurantById } from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const RestaurantDetails = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector((store) => store.restaurant);
    const menuItems = useSelector((store) => store.menu.menuItems);
    const { id, city } = useParams();

    useEffect(() => {
        if (!id) return;
        dispatch(getAllRestaurantById({ jwt, id }));
        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: id,
            vegetarian: false,
            nonVeg: false,
            seasonal: false,
            foodCategory: "",
        }));
    }, [dispatch, id, jwt]);

    const currentRestaurant = restaurant.restaurant;

    return (
        <div className="px-5 lg:px-20">
            <section>
                <h3 className="text-gray-500 py-2 mt-10">Home / {city || "restaurant"}</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img
                            className="w-full h-[40vh] object-cover"
                            src={currentRestaurant?.images?.[1]}
                            alt="restaurant"
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <img
                            className="w-full h-[40vh] object-cover"
                            src={currentRestaurant?.images?.[0]}
                            alt="restaurant"
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <img
                            className="w-full h-[40vh] object-cover"
                            src="https://images.pexels.com/photos/11368919/pexels-photo-11368919.jpeg"
                            alt="restaurant"
                        />
                    </Grid>
                </Grid>
                <div className="pt-3 pb-5">
                    <h1 className="text-4xl font-semibold">{currentRestaurant?.name}</h1>
                    <p className="text-gray-500 mt-1">{currentRestaurant?.description}</p>
                    <div className="space-y-3 mt-3">
                        <p className="text-gray-500 flex items-center gap-3">
                            <LocationOnIcon />
                            <span>{currentRestaurant?.address?.city || "Mumbai, Maharashtra"}</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-3">
                            <CalendarTodayIcon />
                            <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 lg:w-[20%] filter" />
                <div className="space-y-5 lg:w-[80%] lg:pl-10">
                    <Typography variant="h6" className="text-gray-500">Food Items</Typography>
                    <Grid container spacing={2}>
                        {menuItems.map((item) => (
                            <Grid item xs={12} md={6} lg={4} key={item.id}>
                                <Card>
                                    <img
                                        className="w-full h-44 object-cover"
                                        src={item.images?.[0] || currentRestaurant?.images?.[0]}
                                        alt={item.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography sx={{ color: "text.secondary" }}>{item.description}</Typography>
                                        <Typography sx={{ marginTop: "0.5rem", fontWeight: 700 }}>Rs. {item.price}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </section>
        </div>
    );
};

export default RestaurantDetails;
