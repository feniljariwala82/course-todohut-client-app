import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={12} sm={8} md={4}>
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
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
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
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
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Signup
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/login", { replace: true })}
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
