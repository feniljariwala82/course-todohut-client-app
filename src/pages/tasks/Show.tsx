import { LinearProgress } from "@mui/material";
import { useShowQuery } from "features/tasks/tasksApi";
import { useParams } from "react-router-dom";

const Show = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowQuery(id);

  if (isLoading) {
    return <LinearProgress color="primary" />;
  }

  return <div>{data.title}</div>;
};

export default Show;
