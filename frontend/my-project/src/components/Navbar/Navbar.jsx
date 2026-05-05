import React from 'react';
import { Avatar, Badge, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

export const Navbar = () => {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const isAuthenticated = Boolean(auth.user || auth.jwt || localStorage.getItem('jwt'));

    const handleAvatarClick = () => {
        if (auth.user?.role === 'ROLE_RESTAURANT_OWNER') {
            navigate('/admin/restaurant');
            return;
        }

        navigate('/my-profile');
    };

    const avatarLetter = auth.user?.fullName?.[0]?.toUpperCase() || 'U';

    const handleCartClick = () => {
        if (!isAuthenticated) {
            navigate('/account/login');
            return;
        }

        navigate('/cart');
    };

    return (
        <div className='px-5 sticky top -0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={() => navigate('/')} className='logo font-semibold text-gray-300 text-2xl'>
                    Foodzzz
                </li>
            </div>

            <div className='flex items-center space-x-2 lg:space-x-10'>
                <IconButton onClick={() => navigate('/')}>
                    <SearchIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
            </div>

            <div>
                {auth.user ? (
                    <Avatar onClick={handleAvatarClick} sx={{ bgcolor: 'white', color: pink.A400, cursor: 'pointer' }}>
                        {avatarLetter}
                    </Avatar>
                ) : (
                    <IconButton onClick={() => navigate('/account/login')}>
                        <Person />
                    </IconButton>
                )}
            </div>

            <div>
                <IconButton onClick={handleCartClick}>
                    <Badge color='primary' badgeContent={3}>
                        <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                    </Badge>
                </IconButton>
            </div>
        </div>
    );
};
