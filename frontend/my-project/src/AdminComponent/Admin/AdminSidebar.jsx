import React from "react";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../components/State/Authentication/Action";

const menu = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { title: "Orders", icon: <ShoppingBagIcon />, path: "/order" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "FoodCategory", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
    { title: "Events", icon: <EventIcon />, path: "/event" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSidebar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasRestaurant = Boolean(useSelector((store) => store.restaurant.usersRestaurant));

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
            handleClose?.();
            return;
        }

        if (!hasRestaurant && item.path !== "/details") {
            navigate("/admin/restaurant/details");
            handleClose?.();
            return;
        }

        navigate(`/admin/restaurant${item.path}`);
        handleClose?.();
    };

    return (
        <Drawer
            onClose={handleClose}
            variant={isSmallScreen ? "temporary" : "permanent"}
            open
            anchor="left"
            sx={{ zIndex: 1 }}
        >
            <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
                {menu.map((item, index) => (
                    <React.Fragment key={item.title}>
                        <div
                            className='px-5 flex items-center gap-5 cursor-pointer'
                            onClick={() => handleNavigate(item)}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {index !== menu.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </Drawer>
    );
};
