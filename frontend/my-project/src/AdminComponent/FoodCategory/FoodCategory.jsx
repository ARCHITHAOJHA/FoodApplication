import React from 'react'
import { Card, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CreateFoodCategoryForm from './CreateFoodCategoryForm'
import FoodCategoryTable from './FoodCategoryTable'
import { createCategoryAction, getRestaurantsCategory } from '../../components/State/Restaurant/Action'

export const FoodCategory = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const restaurantId = useSelector((store) => store.restaurant.usersRestaurant?.id) || localStorage.getItem('activeRestaurantId');
    const categories = useSelector((store) => store.restaurant.categories);

    React.useEffect(() => {
        if (!jwt || !restaurantId) return;

        const backupKey = `food_category_backup_${restaurantId}`;
        const rawBackup = localStorage.getItem(backupKey);
        if (rawBackup) {
            try {
                const backup = JSON.parse(rawBackup);
                if (Array.isArray(backup) && backup.length > 0) {
                    dispatch({
                        type: 'GET_RESTAURANTS_CATEGORY_SUCCESS',
                        payload: backup,
                    });
                }
            } catch (error) {
                console.log('Failed to hydrate food category backup', error);
            }
        }

        dispatch(getRestaurantsCategory({ jwt, restaurantId }));
    }, [dispatch, jwt, restaurantId]);

    const handleCreateCategory = (name) => {
        if (!name || !jwt || !restaurantId) return;

        dispatch(createCategoryAction({
            reqData: { name, restaurantId },
            jwt,
        }));
    };

    return (
        <div className='px-2 space-y-4'>
            <Card className='p-5'>
                <Typography variant='h6' sx={{ paddingBottom: '1rem' }}>
                    Add Category
                </Typography>
                <CreateFoodCategoryForm onCreate={handleCreateCategory} />
            </Card>
            <FoodCategoryTable categories={categories} />
        </div>
    )
}