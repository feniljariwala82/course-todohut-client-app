import { AddCircle } from "@mui/icons-material";
import {
  Alert,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useStoreMutation } from "features/tasks/tasksApi";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Create = () => {
  const navigate = useNavigate();
  const [store, { isLoading }] = useStoreMutation();
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
        await store(values).unwrap();
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

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link to="/tasks">Tasks</Link>
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>

      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={12} sm={8} md={4}>
          <Typography variant="h4" gutterBottom>
            Create Task
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
              endIcon={<AddCircle />}
            >
              Create
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Create;
