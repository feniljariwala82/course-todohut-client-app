import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import PriorityChip from "components/tasks/PriorityChip";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  description: string;
  priority: string;
  onDeleteCallback: (id: number) => void;
}

const ListItem = ({
  title,
  description,
  priority,
  id,
  onDeleteCallback,
}: Props) => {
  const navigate = useNavigate();

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
    <Card>
      <CardContent>
        <Typography variant="body1" fontWeight={"bold"} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {truncateTextAfterWords(description, 10)}
        </Typography>
        <PriorityChip priority={priority} />
      </CardContent>
      <CardActions>
        <IconButton color="info" onClick={() => navigate(`/tasks/${id}`)}>
          <RemoveRedEye />
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => navigate(`/tasks/${id}/edit`)}
        >
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDeleteCallback(id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ListItem;
