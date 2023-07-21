import {
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import PriorityChip from "components/tasks/PriorityChip";
import { useShowQuery } from "features/tasks/tasksApi";
import { Link, useParams } from "react-router-dom";

const Show = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowQuery(id);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link to="/tasks">Tasks</Link>
        <Typography color="text.primary">Show</Typography>
      </Breadcrumbs>

      <Stack direction={"row"} justifyContent={"center"}>
        <div>
          <Card sx={{ width: 500 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Title
              </Typography>
              <Typography variant="body1" gutterBottom className="capitalize">
                {data.title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                {data.description}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Priority
              </Typography>
              <PriorityChip priority={data.priority} />
            </CardContent>
          </Card>
        </div>
      </Stack>
    </Container>
  );
};

export default Show;
