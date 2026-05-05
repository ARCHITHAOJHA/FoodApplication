import React from "react";
import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateMenuItemsAvailability } from "../../components/State/Menu/Action";

export default function MenuTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const items = useSelector((store) => store.menu.menuItems);

  const handleToggleAvailability = (foodId) => {
    if (!jwt) return;
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  return (
    <Box>
      <Card className='p-5'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <Chip
                      size='small'
                      color={item.available ? "success" : "default"}
                      label={item.available ? "Available" : "Unavailable"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size='small' variant='outlined' onClick={() => handleToggleAvailability(item.id)}>
                      {item.available ? "Mark unavailable" : "Mark available"}
                    </Button>
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
