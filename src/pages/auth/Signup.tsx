import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSignupMutation } from "features/auth/authApi";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import parseFormErrors from "utils/errors/parseFormErrors";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  firstName: Yup.string()
    .max(50, "First name should be maximum 50 characters long")
    .required("First name is required"),
  lastName: Yup.string()
    .max(50, "Last name should be maximum 50 characters long")
    .required("Last name is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  // states
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  // form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signup(values).unwrap();
        navigate("/");
      } catch (error: any) {
        if (error.data.errors) {
          const errors = parseFormErrors(error.data.errors);
          setFormErrors(errors);
        } else {
          setError(error.data);
        }
      }
    },
  });

  return (
    <Container>
      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={12} sm={8} md={4}>
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            <></>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="First Name"
              variant="filled"
              type="text"
              name="firstName"
              sx={{ mb: 2 }}
              fullWidth
              required
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.firstName &&
                  Boolean(formik.errors.firstName)) ||
                Boolean(formErrors.firstName)
              }
              helperText={
                (formik.touched.firstName && formik.errors.firstName) ||
                formErrors.firstName
              }
            />
            <TextField
              label="Last Name"
              variant="filled"
              type="text"
              name="lastName"
              sx={{ mb: 2 }}
              fullWidth
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.lastName && Boolean(formik.errors.lastName)) ||
                Boolean(formErrors.lastName)
              }
              helperText={
                (formik.touched.lastName && formik.errors.lastName) ||
                formErrors.lastName
              }
            />
            <TextField
              label="Email"
              variant="filled"
              type="email"
              name="email"
              sx={{ mb: 2 }}
              fullWidth
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.email && Boolean(formik.errors.email)) ||
                Boolean(formErrors.email)
              }
              helperText={
                (formik.touched.email && formik.errors.email) ||
                formErrors.email
              }
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              name="password"
              sx={{ mb: 2 }}
              fullWidth
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.password && Boolean(formik.errors.password)) ||
                Boolean(formErrors.password)
              }
              helperText={
                (formik.touched.password && formik.errors.password) ||
                formErrors.password
              }
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ mr: 2 }}
            >
              Signup
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              disabled={isLoading}
              onClick={() => navigate("/", { replace: true })}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
