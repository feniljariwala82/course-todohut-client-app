import { Edit as EditIcon } from "@mui/icons-material";
import {
  Alert,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useShowQuery, useUpdateMutation } from "features/tasks/tasksApi";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parseFormErrors from "utils/errors/parseFormErrors";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title can not be longer than 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(400, "Description can not be longer than 400 characters"),
  priority: Yup.string().required("Priority is required"),
});

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useShowQuery(id);
  const [update, { isLoading: formLoading }] = useUpdateMutation();
  // states
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  // form validation
  const formik: any = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await update({
          ...values,
          id: id!,
        }).unwrap();
        navigate("/tasks");
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

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link to="/tasks">Tasks</Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>

      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={12} sm={8} md={4}>
          <Typography variant="h4" gutterBottom>
            Edit Task
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
              label="Title"
              variant="filled"
              type="text"
              name="title"
              sx={{ mb: 2 }}
              fullWidth
              required
              defaultValue={data.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.title && Boolean(formik.errors.title)) ||
                Boolean(formErrors.title)
              }
              helperText={
                (formik.touched.title && formik.errors.title) ||
                formErrors.title
              }
            />
            <TextField
              label="Description"
              variant="filled"
              type="text"
              name="description"
              multiline
              rows={4}
              sx={{ mb: 2 }}
              fullWidth
              required
              defaultValue={data.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.description &&
                  Boolean(formik.errors.description)) ||
                Boolean(formErrors.description)
              }
              helperText={
                (formik.touched.description && formik.errors.description) ||
                formErrors.description
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="priority"
                name="priority"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  (formik.touched.priority &&
                    Boolean(formik.errors.priority)) ||
                  Boolean(formErrors.priority)
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value={"important"}>Important</MenuItem>
                <MenuItem value={"unimportant"}>Unimportant</MenuItem>
                <MenuItem value={"future_scope"}>Future Scope</MenuItem>
                <MenuItem value={"urgent"}>Urgent</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{ mr: 2 }}
              disabled={isLoading}
              endIcon={<EditIcon />}
            >
              Update
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Edit;
