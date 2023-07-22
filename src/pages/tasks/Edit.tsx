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
import { showToast } from "components/Toast";
import { useShowQuery, useUpdateMutation } from "features/tasks/tasksApi";
import { Formik } from "formik";
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
  const [update] = useUpdateMutation();
  // states
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // on submit handler
  const onFormSubmitHandler = async (values: any) => {
    try {
      const result = await update({
        ...values,
        id: id!,
      }).unwrap();
      showToast(result.message, "success");
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

          {/* form starts */}
          <Formik
            initialValues={{
              title: data.title,
              description: data.description,
              priority: data.priority,
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
                  // @ts-ignore
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
                  // @ts-ignore
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
                  color="success"
                  sx={{ mr: 2 }}
                  disabled={isLoading || isSubmitting}
                  endIcon={<EditIcon />}
                >
                  Update
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

export default Edit;
