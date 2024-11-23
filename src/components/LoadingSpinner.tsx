import { CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <div className="loading">
      <CircularProgress className="loading__spinner" />
    </div>
  );
}
