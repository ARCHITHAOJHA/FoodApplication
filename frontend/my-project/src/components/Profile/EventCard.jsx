import React from "react";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

export const EventCard = ({ event, onDelete }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${event.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // update UI after delete
      if (onDelete) onDelete(event.id);

    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <Card sx={{ width: 345 }}>

      {/* ✅ Dynamic Image */}
      <CardMedia
        sx={{ height: 180 }}
        image={event.imageUrl || "https://via.placeholder.com/300"}
      />

      <CardContent>

        {/* ✅ Event Name */}
        <Typography variant='h5'>
          {event.eventName}
        </Typography>

        {/* ✅ Location */}
        <Typography variant='body2'>
          📍 {event.location}
        </Typography>

      </CardContent>

      <CardActions>

        {/* ✅ Delete Button */}
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
};
