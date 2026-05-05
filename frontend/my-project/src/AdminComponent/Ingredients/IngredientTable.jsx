import React from "react";
import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateStockOfIngredient } from "../../components/State/Ingredients/Action";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";

export default function IngredientTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredientRows = Array.isArray(ingredients) ? ingredients : [];

  const getStatusLabel = (item) => (item.inStock ? "Accessible" : "No Access");
  const getToggleLabel = (item) => (item.inStock ? "Remove access" : "Grant access");
  const getCategoryLabel = (item) =>
    item.category?.name ||
    item.categoryName ||
    item.ingredientCategory?.name ||
    item.ingredientCategoryName ||
    item.category?.categoryName ||
    "-";

  return (
    <Box>
      <Card className='p-5'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientRows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{getCategoryLabel(item)}</TableCell>
                  <TableCell>{getStatusLabel(item)}</TableCell>
                  <TableCell>
                    <Tooltip title={getToggleLabel(item)}>
                      <Button
                        size='small'
                        variant='outlined'
                        icon={item.inStock ? <BlockIcon /> : <CheckCircleOutlineIcon />}
                        onClick={() => dispatch(updateStockOfIngredient({ id: item.id, jwt }))}
                        sx={{ minWidth: '40px', padding: '6px' }}
                      >
                        {item.inStock ? <BlockIcon /> : <CheckCircleOutlineIcon />}
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
