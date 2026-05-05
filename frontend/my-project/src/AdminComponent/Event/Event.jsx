import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  getRestaurantsEvents
} from "../../components/State/Restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const initialValues = {
  name: "",
  image: "",
  location: ""
};

export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialValues);
  const [submitError, setSubmitError] = React.useState("");
  const [submitSuccess, setSubmitSuccess] = React.useState("");

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const restaurant = useSelector((store) => store.restaurant);
  const restaurantId =
    restaurant.usersRestaurant?.id || restaurant.usersRestaurants?.id;
  const restaurantError = restaurant.error;

  // ✅ Fetch events
  React.useEffect(() => {
    if (!jwt || !restaurantId) return;
    dispatch(getRestaurantsEvents({ restaurantId, jwt }));
  }, [dispatch, jwt, restaurantId]);

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jwt) {
      setSubmitError("User not authenticated.");
      return;
    }

    try {
      setSubmitError("");

      await dispatch(
        createEventAction({
          data: {
            eventName: formValues.name,
            imageUrl: formValues.image,
            location: formValues.location
          },
          jwt
        })
      );

      setSubmitSuccess("Event created successfully 🎉");
      setOpen(false);
      setFormValues(initialValues);

      // refresh events
      dispatch(getRestaurantsEvents({ restaurantId, jwt }));
    } catch (error) {
      setSubmitSuccess("");
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create event"
      );
    }
  };

  return (
    <div className="p-5">
      {/* Alerts */}
      {restaurantError && (
        <Alert severity="error" sx={{ marginBottom: "1rem" }}>
          {restaurantError}
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {submitSuccess}
        </Alert>
      )}

      {/* Create Button */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create New Event
      </Button>

      {/* Events Grid */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {(restaurant.restaurantsEvents ?? []).map((eventItem) => (
          <Grid item xs={12} sm={6} md={4} key={eventItem.id}>
            <Card>

              {/* ✅ Image */}
              <img
                src={
                  eventItem.imageUrl ||
                  "https://via.placeholder.com/300"
                }
                alt={eventItem.eventName}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              <CardContent>
                {/* ✅ Name */}
                <Typography variant="h6">
                  {eventItem.eventName}
                </Typography>

                {/* ✅ Location */}
                <Typography color="text.secondary">
                  📍 {eventItem.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  label="Event Name"
                  fullWidth
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      name: e.target.value
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  fullWidth
                  value={formValues.image}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      image: e.target.value
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Location"
                  fullWidth
                  value={formValues.location}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      location: e.target.value
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  Save Event
                </Button>
              </Grid>

            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};