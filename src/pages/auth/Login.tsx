import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { useLoginMutation } from "features/auth/authApi";
import { login as loginAction } from "features/auth/authSlice";
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
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  // states
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // on submit handler
  const onFormSubmitHandler = async (values: any) => {
    try {
      await login(values).unwrap();
      dispatch(loginAction());
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
            Login
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
            initialValues={{ email: "", password: "" }}
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
                  sx={{ mr: 2 }}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={() => navigate("/signup")}
                >
                  Signup
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

export default Login;
