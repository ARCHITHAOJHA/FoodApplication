import React from "react";
import { Avatar, AvatarGroup, Box, Button, Card, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../components/State/Restaurant Order/Action";

export default function OrderTable({ filterValue = "ALL" }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((store) => store.restaurant);
  const orders = useSelector((store) => store.restaurantOrder.orders);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);

  React.useEffect(() => {
    if (!jwt || !restaurant.usersRestaurant?.id) return;

    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,
      orderStatus: filterValue,
    }));
  }, [dispatch, jwt, restaurant.usersRestaurant?.id, filterValue]);

  const handleOpenMenu = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleChangeStatus = (status) => {
    if (!selectedOrderId || !jwt) {
      handleCloseMenu();
      return;
    }

    dispatch(updateOrderStatus({ orderId: selectedOrderId, orderStatus: status, jwt }));
    handleCloseMenu();
  };

  return (
    <Box>
      <Card className='p-5'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer?.fullName || order.customerName || "Customer"}</TableCell>
                  <TableCell>
                    <AvatarGroup max={3}>
                      {(order.items || []).map((item) => (
                        <Avatar
                          key={item.id || item.food?.id || item.food?.name}
                          src={item.food?.images?.[0]}
                          alt={item.food?.name || "food"}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell><Chip label={order.status || "PENDING"} size='small' /></TableCell>
                  <TableCell>
                    <Button size='small' onClick={(e) => handleOpenMenu(e, order.id)}>Change</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleChangeStatus("PENDING")}>PENDING</MenuItem>
          <MenuItem onClick={() => handleChangeStatus("COMPLETED")}>COMPLETED</MenuItem>
        </Menu>
      </Card>
    </Box>
  );
}
