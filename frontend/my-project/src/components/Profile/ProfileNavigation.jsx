import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../State/Authentication/Action";

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <AddReaction /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Notifications", icon: <NotificationsIcon /> },
    { title: "Logout", icon: <LogoutIcon /> },
];

export const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
            handleClose?.();
            return;
        }

        navigate(`/my-profile/${item.title.toLowerCase()}`);
        handleClose?.();
    };

    return (
        <div>
            <Drawer
                variant="permanent"
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                anchor='left'
                sx={{ zIndex: 1, position: "sticky" }}
            >
                <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16">
                    {menu.map((item, index) => (
                        <React.Fragment key={item.title}>
                            <div className="px-5 flex items-center space-x-5 cursor-pointer" onClick={() => handleNavigate(item)}>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {index !== menu.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

