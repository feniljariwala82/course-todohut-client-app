import { Container, Grid, LinearProgress } from "@mui/material";
import ListItem from "components/tasks/ListItem";
import { useIndexQuery } from "features/tasks/tasksApi";

const Index = () => {
  const { data, isLoading } = useIndexQuery("Tasks");

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={2}>
        {data.map((task: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
            <ListItem {...task} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;
