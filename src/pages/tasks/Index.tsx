import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useIndexQuery } from "features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useIndexQuery("Tasks");

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  // function to truncate the text after a specific word count
  const truncateTextAfterWords = (text: string, wordCount: number) => {
    const words = text.split(" ");
    if (words.length > wordCount) {
      text = words.slice(0, wordCount).join(" ") + "...";
      return text;
    }
    return text;
  };

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={2}>
        {data.map((task: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="body1" fontWeight={"bold"} gutterBottom>
                  {task.title}
                </Typography>
                <Typography variant="body2">
                  {truncateTextAfterWords(task.description, 10)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="info"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <RemoveRedEye />
                </IconButton>
                <IconButton color="warning">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;
