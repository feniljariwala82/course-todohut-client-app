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
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const formik: any = useFormik({
    initialValues: {
      email: "fenil@email.com",
      password: "12345678",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values).unwrap();
        dispatch(loginAction());
        navigate("tasks");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container>
      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={12} sm={8} md={4}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {/* @ts-ignore */}
          {isError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {/* @ts-ignore */}
              {error.data}
            </Alert>
          ) : (
            <></>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              name="email"
              sx={{ mb: 2 }}
              fullWidth
              required
              defaultValue={"fenil@email.com"}
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
              defaultValue={"12345678"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mr: 2 }}
              disabled={isLoading}
            >
              Login
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              disabled={isLoading}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
