import React from "react";
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../State/Authentication/Action";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
};

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);

    const handleSubmit = (values) => {
        dispatch(RegisterUser({
            userData: {
                name: values.fullName,
                email: values.email,
                password: values.password,
                role: values.role,
            },
            navigate,
        }));
    };

    return (
        <div>
            <Typography variant="h5" className="text-center">
                Register
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    {auth.error && (
                        <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                            {auth.error}
                        </Alert>
                    )}
                    <Field
                        as={TextField}
                        name="fullName"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-simple-select-label">Role</InputLabel>
                        <Field
                            as={Select}
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                            label="Role"
                            name="role"
                        >
                            <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                            <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                        </Field>
                    </FormControl>
                    <Button
                        sx={{ mt: 2, padding: "1rem" }}
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={auth.isLoading}
                    >
                        Register
                    </Button>
                </Form>
            </Formik>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?
            </Typography>
            <Button size="small" onClick={() => navigate("/account/login")}>
                Login
            </Button>
        </div>
    );
};
