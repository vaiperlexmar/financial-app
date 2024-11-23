import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface ErrorProps {
  isVisible: boolean;
  animationClass: boolean;
}

function ErrorEl({
  children,
  isVisible,
  animationClass,
}: PropsWithChildren<ErrorProps>) {
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

export default ErrorEl;
