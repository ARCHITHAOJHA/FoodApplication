import React from "react";
import { Box, Button, TextField } from "@mui/material";

const CreateFoodCategoryForm = ({ onCreate }) => {
  const [name, setName] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate?.(name);
    setName("");
  };

  return (
    <Box component='form' onSubmit={handleSubmit} className='space-y-4'>
      <TextField fullWidth label='Category Name' value={name} onChange={(e) => setName(e.target.value)} />
      <Button type='submit' variant='contained' fullWidth>Create Category</Button>
    </Box>
  );
};

export default CreateFoodCategoryForm;
