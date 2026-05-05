import React from "react";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const CreateMenuForm = ({ categories = [], onCreate }) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [itemType, setItemType] = React.useState("");
  const [foodCategory, setFoodCategory] = React.useState("");
  const [formError, setFormError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !itemType) {
      setFormError("Menu name, price and category type are required.");
      return;
    }

    setFormError("");
    const isSaved = await onCreate?.({
      name,
      description,
      price: Number(price),
      images: imageUrl ? [imageUrl] : [],
      type: itemType,
      foodCategory,
    });

    if (!isSaved) return;

    setName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setItemType("");
    setFoodCategory("");
  };

  return (
    <Box component='form' className='space-y-4 p-4' onSubmit={handleSubmit}>
      {formError && <Alert severity='warning'>{formError}</Alert>}
      <TextField fullWidth label='Menu Name' value={name} onChange={(e) => setName(e.target.value)} />
      <TextField fullWidth label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField fullWidth label='Image URL' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <TextField fullWidth type='number' label='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
      <FormControl fullWidth>
        <InputLabel id='menu-type-label'>Category</InputLabel>
        <Select
          labelId='menu-type-label'
          label='Category'
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
        >
          <MenuItem value='VEG'>Veg</MenuItem>
          <MenuItem value='NON_VEG'>Non-Veg</MenuItem>
          <MenuItem value='SEASONAL'>Seasonal</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='menu-food-category-label'>Food Category (Optional)</InputLabel>
        <Select
          labelId='menu-food-category-label'
          label='Food Category (Optional)'
          value={foodCategory}
          onChange={(e) => setFoodCategory(e.target.value)}
        >
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant='contained' type='submit'>Save</Button>
    </Box>
  );
};

export default CreateMenuForm;
