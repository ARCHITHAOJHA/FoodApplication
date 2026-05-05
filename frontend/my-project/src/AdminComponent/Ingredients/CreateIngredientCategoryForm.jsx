import React from "react";
import { Box, Button, TextField } from "@mui/material";

const CreateIngredientCategoryForm = ({ onCreate }) => {
  const [name, setName] = React.useState("");

  return (
    <Box component='form' onSubmit={(e) => { e.preventDefault(); onCreate?.(name); setName(""); }} className='space-y-4'>
      <TextField fullWidth label='Ingredient Category' value={name} onChange={(e) => setName(e.target.value)} />
      <Button type='submit' variant='contained' fullWidth>Create</Button>
    </Box>
  );
};

export default CreateIngredientCategoryForm;
