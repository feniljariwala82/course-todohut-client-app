import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
} from "@mui/material";
import { showToast } from "components/Toast";
import ListItem from "components/tasks/ListItem";
import { useDestroyMutation, useIndexQuery } from "features/tasks/tasksApi";
import { useState } from "react";

const Index = () => {
  const { data, isLoading } = useIndexQuery("Tasks");
  const [destroy] = useDestroyMutation();
  // states
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>();
  const [error, setError] = useState("");

  const destroyHandler = (id: number) => {
    const task = data.find((item: any) => item.id === id);
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const destroyTaskHandler = async () => {
    try {
      const { message } = await destroy(selectedTask.id).unwrap();
      showToast(message, "success");
      handleClose();
    } catch (error: any) {
      setError(error.data);
    }
  };

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return (
    <Container sx={{ my: 4 }}>
      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <></>
      )}

      {data.length ? (
        <Grid container spacing={2}>
          {data.map((task: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
              <ListItem {...task} onDeleteCallback={destroyHandler} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="error">No tasks found!</Alert>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the task with title "
            {selectedTask?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={destroyTaskHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Index;
