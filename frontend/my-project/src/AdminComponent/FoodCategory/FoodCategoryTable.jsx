import React from "react";
import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useSelector } from "react-redux";

export default function FoodCategoryTable({ categories: categoriesProp }) {
  const storeCategories = useSelector((store) => store.restaurant.categories);
  const categories = Array.isArray(categoriesProp) ? categoriesProp : storeCategories;
  const categoryRows = Array.isArray(categories) ? categories : [];

  return (
    <Box>
      <Card className='p-5'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryRows.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
