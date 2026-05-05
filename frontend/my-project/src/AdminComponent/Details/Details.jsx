import React from "react";
import { Alert, Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurant } from "../../components/State/Restaurant/Action";

const initialValues = {
	name: "",
	description: "",
	cuisineType: "",
	openingHours: "Mon-Sun : 9am - 10pm",
	streetAddress: "",
	city: "",
	stateProvince: "",
	postalCode: "",
	country: "",
	email: "",
	mobile: "",
	instagram: "",
	twitter: "",
	imageUrl: "",
};

export const Details = () => {
	const dispatch = useDispatch();
	const jwt = localStorage.getItem("jwt");
	const usersRestaurant = useSelector((store) => store.restaurant.usersRestaurant);
	const [values, setValues] = React.useState(initialValues);

	const handleChange = (e) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!jwt) return;

		const payload = {
			name: values.name,
			description: values.description,
			cuisineType: values.cuisineType,
			openingHours: values.openingHours,
			address: {
				streetAddress: values.streetAddress,
				city: values.city,
				stateProvince: values.stateProvince,
				postalCode: values.postalCode,
				country: values.country,
			},
			contactInformation: {
				email: values.email,
				mobile: values.mobile,
				instagram: values.instagram,
				twitter: values.twitter,
			},
			images: values.imageUrl ? [values.imageUrl] : [],
		};

		dispatch(createRestaurant({ data: payload, token: jwt }));
		setValues(initialValues);
	};

	return (
		<div className='px-2 space-y-4'>
			<Card className='p-5'>
				<Typography variant='h5' sx={{ paddingBottom: "0.75rem" }}>
					Restaurant Setup
				</Typography>
				{!usersRestaurant ? (
					<Alert severity='info'>Complete this step first. After saving details, you can add menu items, categories, ingredients, and events.</Alert>
				) : (
					<Alert severity='success'>Restaurant profile is ready. You can continue with menu, category, ingredients, and events.</Alert>
				)}
			</Card>

			{!usersRestaurant && (
				<Card className='p-5'>
					<Typography variant='h6' sx={{ paddingBottom: "1rem" }}>
						Add Restaurant Details
					</Typography>
					<Box component='form' onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextField fullWidth required name='name' label='Restaurant Name' value={values.name} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth required name='cuisineType' label='Cuisine Type' value={values.cuisineType} onChange={handleChange} />
							</Grid>
							<Grid item xs={12}>
								<TextField fullWidth name='description' label='Description' value={values.description} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth name='openingHours' label='Opening Hours' value={values.openingHours} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth name='imageUrl' label='Cover Image URL' value={values.imageUrl} onChange={handleChange} />
							</Grid>
							<Grid item xs={12}>
								<TextField fullWidth required name='streetAddress' label='Street Address' value={values.streetAddress} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth required name='city' label='City' value={values.city} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={3}>
								<TextField fullWidth required name='stateProvince' label='State' value={values.stateProvince} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={3}>
								<TextField fullWidth required name='postalCode' label='Postal Code' value={values.postalCode} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth required name='country' label='Country' value={values.country} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth required name='email' label='Email' value={values.email} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth required name='mobile' label='Mobile' value={values.mobile} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth name='instagram' label='Instagram URL' value={values.instagram} onChange={handleChange} />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField fullWidth name='twitter' label='Twitter URL' value={values.twitter} onChange={handleChange} />
							</Grid>
							<Grid item xs={12}>
								<Button type='submit' variant='contained'>Save Restaurant</Button>
							</Grid>
						</Grid>
					</Box>
				</Card>
			)}

			{usersRestaurant && (
				<Card>
					<CardContent>
						<Typography variant='h6'>{usersRestaurant.name}</Typography>
						<Typography sx={{ color: "text.secondary" }}>{usersRestaurant.cuisineType}</Typography>
						<Typography sx={{ marginTop: "0.5rem" }}>{usersRestaurant.description}</Typography>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default Details;
