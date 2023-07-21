import { Chip } from "@mui/material";

interface Props {
  priority: string;
}

const PriorityChip = ({ priority }: Props) => {
  switch (priority) {
    case "important":
      return <Chip label={priority} color="success" className="capitalize" />;

    case "urgent":
      return <Chip label={priority} color="error" className="capitalize" />;

    case "future_scope":
      return <Chip label="Future Scope" color="info" className="capitalize" />;

    case "unimportant":
      return <Chip label={priority} color="secondary" className="capitalize" />;

    default:
      return <Chip label={priority} color="primary" className="capitalize" />;
  }
};

export default PriorityChip;
