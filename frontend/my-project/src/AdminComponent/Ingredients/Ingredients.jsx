import React from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Card, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import IngredientTable from './IngredientTable';
import IngredientCategoryTable from './IngredientsCategory';
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm';
import CreateIngredientForm from './CreateIngredientForm';
import { createIngredient, createIngredientCategory, getIngredientCategory, getIngredientsOfRestaurant } from '../../components/State/Ingredients/Action';

export default function Ingredients() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const restaurantId = useSelector((store) => store.restaurant.usersRestaurant?.id) || localStorage.getItem('activeRestaurantId');
    const categories = useSelector((store) => store.ingredients.Category);
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const [ingredientError, setIngredientError] = React.useState('');
    const [ingredientSuccess, setIngredientSuccess] = React.useState('');
    const [categoryError, setCategoryError] = React.useState('');
    const [categorySuccess, setCategorySuccess] = React.useState('');

    React.useEffect(() => {
        if (!restaurantId || !jwt) return;

        const categoryBackupKey = `ingredient_category_backup_${restaurantId}`;
        const rawCategoryBackup = localStorage.getItem(categoryBackupKey);
        if (rawCategoryBackup) {
            try {
                const backup = JSON.parse(rawCategoryBackup);
                if (Array.isArray(backup) && backup.length > 0) {
                    dispatch({
                        type: 'GET_INGREDIENT_CATEGORY_SUCCESS',
                        payload: backup,
                    });
                }
            } catch (error) {
                console.log('Failed to hydrate ingredient category backup', error);
            }
        }

        const backupKey = `ingredient_backup_${restaurantId}`;
        const rawBackup = localStorage.getItem(backupKey);
        if (rawBackup) {
            try {
                const backup = JSON.parse(rawBackup);
                if (Array.isArray(backup) && backup.length > 0) {
                    dispatch({
                        type: 'GET_INGREDIENTS',
                        payload: backup,
                    });
                }
            } catch (error) {
                console.log('Failed to hydrate ingredient backup', error);
            }
        }

        dispatch(getIngredientCategory({ id: restaurantId, jwt }));
        dispatch(getIngredientsOfRestaurant({ id: restaurantId, jwt }));
    }, [dispatch, jwt, restaurantId]);

    const handleCreateCategory = async (name) => {
        if (!name || !restaurantId || !jwt) {
            setCategoryError('Missing required information');
            return;
        }
        try {
            setCategoryError('');
            setCategorySuccess('');
            await dispatch(createIngredientCategory({ data: { name, restaurantId }, jwt }));
            setCategorySuccess('Category created successfully');
            setTimeout(() => setCategorySuccess(''), 3000);
        } catch (error) {
            const msg = error.response?.data?.message || error.message || 'Failed to create category';
            setCategoryError(msg);
            console.error('Create category error:', error);
        }
    };

    const handleCreateIngredient = async ({ name, categoryId }) => {
        if (!name || !categoryId || !restaurantId || !jwt) {
            setIngredientError('Missing required information');
            return;
        }
        const selectedCategory = categories.find((item) => String(item.id) === String(categoryId));
        const payload = { name, categoryId, categoryName: selectedCategory?.name, restaurantId };
        console.log('Creating ingredient - payload:', payload);
        try {
            setIngredientError('');
            setIngredientSuccess('');
            const result = await dispatch(createIngredient({ data: payload, jwt }));
            console.log('Create ingredient result:', result);
            setIngredientSuccess('Ingredient created successfully');
            dispatch(getIngredientsOfRestaurant({ id: restaurantId, jwt }));
            setTimeout(() => setIngredientSuccess(''), 3000);
        } catch (error) {
            const msg = error.response?.data?.message || error.message || 'Failed to create ingredient';
            setIngredientError(msg);
            console.error('Create ingredient error:', error);
        }
    };

    return (
        <div className='px-2'>
            <Grid container spacing={2} sx={{ marginBottom: '0.5rem' }}>
                <Grid item xs={12} lg={6}>
                    <Card className='p-5'>
                        <Typography variant='h6' sx={{ paddingBottom: '1rem' }}>Add Ingredient Category</Typography>
                        {categoryError && <Alert severity='error' sx={{ marginBottom: '1rem' }}>{categoryError}</Alert>}
                        {categorySuccess && <Alert severity='success' sx={{ marginBottom: '1rem' }}>{categorySuccess}</Alert>}
                        <CreateIngredientCategoryForm onCreate={handleCreateCategory} />
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card className='p-5'>
                        <Typography variant='h6' sx={{ paddingBottom: '1rem' }}>Add Ingredient</Typography>
                        {ingredientError && <Alert severity='error' sx={{ marginBottom: '1rem' }}>{ingredientError}</Alert>}
                        {ingredientSuccess && <Alert severity='success' sx={{ marginBottom: '1rem' }}>{ingredientSuccess}</Alert>}
                        {categories.length === 0 ? (
                            <Alert severity='info'>Create at least one ingredient category first.</Alert>
                        ) : (
                            <CreateIngredientForm categories={categories} onCreate={handleCreateIngredient} />
                        )}
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <IngredientTable />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <IngredientCategoryTable />
                </Grid>
            </Grid>
        </div>
    );
}
