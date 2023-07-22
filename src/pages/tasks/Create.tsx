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
import { showToast } from "components/Toast";
import { useStoreMutation } from "features/tasks/tasksApi";
import { Formik } from "formik";
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

  // on submit handler
  const onFormSubmitHandler = async (values: any) => {
    try {
      const { message } = await store(values).unwrap();
      showToast(message, "success");
      navigate("/tasks");
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

          {/* form starts */}
          <Formik
            initialValues={{
              title: "",
              description: "",
              priority: "",
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
                  label="Title"
                  variant="filled"
                  type="title"
                  name="title"
                  sx={{ mb: 2 }}
                  fullWidth
                  required
                  defaultValue={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.title && Boolean(errors.title)) ||
                    Boolean(formErrors.title)
                  }
                  helperText={
                    (touched.title && errors.title) || formErrors.title
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
                  defaultValue={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    (touched.description && Boolean(errors.description)) ||
                    Boolean(formErrors.description)
                  }
                  helperText={
                    (touched.description && errors.description) ||
                    formErrors.description
                  }
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="priority"
                    name="priority"
                    sx={{ mb: 2 }}
                    required
                    defaultValue={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      (touched.priority && Boolean(errors.priority)) ||
                      Boolean(formErrors.priority)
                    }
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
                  disabled={isLoading || isSubmitting}
                  endIcon={<AddCircle />}
                >
                  Create
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

export default Create;
