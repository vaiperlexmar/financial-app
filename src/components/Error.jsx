import { Typography } from "@mui/material";

function Error({ children, isVisible, animationClass }) {
  return (
    <div
      className={`error ${!isVisible ? "hidden" : ""} ${
        animationClass ? "fade-in" : "fade-out"
      }`}
    >
      <Typography align="center" variant="body1" component="p">
        {children}
      </Typography>
    </div>
  );
}

export default Error;
