import { useIndexQuery } from "features/tasks/tasksApi";

const Index = () => {
  const { data, isLoading } = useIndexQuery("Tasks");

  console.log(isLoading);
  console.log(data);

  return <div>Tasks Index</div>;
};

export default Index;
