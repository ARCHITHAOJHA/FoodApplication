import React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const CreateIngredientForm = ({ categories = [], onCreate }) => {
  const [name, setName] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const categoryOptions = Array.isArray(categories) ? categories : [];

  return (
    <form onSubmit={(e) => { e.preventDefault(); onCreate?.({ name, categoryId }); setName(""); setCategoryId(""); }}>
      <TextField fullWidth margin='normal' label='Ingredient Name' value={name} onChange={(e) => setName(e.target.value)} />
      <FormControl fullWidth margin='normal'>
        <InputLabel id='ingredient-category-label'>Category</InputLabel>
        <Select labelId='ingredient-category-label' label='Category' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categoryOptions.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Button type='submit' variant='contained' fullWidth>Create Ingredient</Button>
    </form>
  );
};

export default CreateIngredientForm;
