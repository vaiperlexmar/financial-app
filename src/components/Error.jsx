import { Typography } from "@mui/material";
import { useEffect } from "react";

// TO-DO Доделать ошибку
function Error({ children, isVisible }) {
  return (
    <div className={`error ${!isVisible ? "hidden" : ""}`}>
      <Typography align="center" variant="body1" component="p">
        {children}
      </Typography>
    </div>
  );
}

export default Error;
