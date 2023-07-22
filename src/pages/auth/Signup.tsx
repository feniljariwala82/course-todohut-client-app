import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSignupMutation } from "features/auth/authApi";
import { Formik } from "formik";
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

  // on submit handler
  const onFormSubmitHandler = async (values: any) => {
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
  };

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

          {/* form starts */}
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onFormSubmitHandler}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="First Name"
                  variant="filled"
                  type="text"
                  name="firstName"
                  sx={{ mb: 2 }}
                  fullWidth
                  required
                  defaultValue={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.firstName && Boolean(errors.firstName)) ||
                    Boolean(formErrors.firstName)
                  }
                  helperText={
                    (touched.firstName && errors.firstName) ||
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
                  defaultValue={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.lastName && Boolean(errors.lastName)) ||
                    Boolean(formErrors.lastName)
                  }
                  helperText={
                    (touched.lastName && errors.lastName) || formErrors.lastName
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
                  defaultValue={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.email && Boolean(errors.email)) ||
                    Boolean(formErrors.email)
                  }
                  helperText={
                    (touched.email && errors.email) || formErrors.email
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
                  defaultValue={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.password && Boolean(errors.password)) ||
                    Boolean(formErrors.password)
                  }
                  helperText={
                    (touched.password && errors.password) || formErrors.password
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading || isSubmitting}
                  sx={{ mr: 2 }}
                >
                  Signup
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  disabled={isLoading || isSubmitting}
                  onClick={() => navigate("/", { replace: true })}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
          {/* form ends */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
