import { Typography } from "@mui/material";
import { PropsWithChildren, useState, React } from "react";

interface ErrorElProps {
  isVisible: boolean;
  animationClass: boolean;
  children: React.ReactNode;
}

function ErrorEl({
  isVisible,
  animationClass,
  children,
}: PropsWithChildren<ErrorElProps>) {
  if (!isVisible) return null;

  return (
    <div className={`error ${animationClass ? "fade-in" : "fade-out"}`}>
      <Typography align="center" variant="body1" component="p">
        {children}
      </Typography>
    </div>
  );
}

export default ErrorEl;
