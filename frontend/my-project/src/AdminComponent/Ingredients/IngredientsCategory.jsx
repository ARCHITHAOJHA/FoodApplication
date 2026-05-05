import React from "react";
import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useSelector } from "react-redux";

export default function IngredientCategoryTable() {
  const rows = useSelector((store) => store.ingredients.Category);
  const categoryRows = Array.isArray(rows) ? rows : [];

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
