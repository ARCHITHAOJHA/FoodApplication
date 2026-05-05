import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEventAction } from "../../components/State/Restaurant/Action";

const initialValues = {
  eventName: "",
  imageUrl: "",
  location: ""
};

export const CreateEvent = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jwt) {
      setError("User not authenticated");
      return;
    }

    if (!formValues.eventName || !formValues.location) {
      setError("Event Name and Location are required");
      return;
    }

    try {
      setError("");

      await dispatch(
        createEventAction({
          data: {
            eventName: formValues.eventName,
            imageUrl: formValues.imageUrl,
            location: formValues.location
          },
          jwt
        })
      );

      setSuccess("Event created successfully 🎉");

      // reset form
      setFormValues(initialValues);

      // redirect after 1.5 sec
      setTimeout(() => {
        navigate("/events");
      }, 1500);

    } catch (err) {
      setSuccess("");
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create event"
      );
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">

      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>

          <Typography variant="h5" align="center" gutterBottom>
            Create Event
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} mt={1}>

              <Grid item xs={12}>
                <TextField
                  name="eventName"
                  label="Event Name"
                  fullWidth
                  value={formValues.eventName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="imageUrl"
                  label="Image URL"
                  fullWidth
                  value={formValues.imageUrl}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  fullWidth
                  value={formValues.location}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Create Event
                </Button>
              </Grid>

            </Grid>
          </form>

        </CardContent>
      </Card>

    </Box>
  );
};
