import React from "react";
import Button from "@mui/material/Button";

interface NavigationButtonProps {
  children: string;
  icon: JSX.Element;
  handleClick: () => void;
}

export default function NavigationButton({
  children,
  icon,
  handleClick,
}: NavigationButtonProps) {
  return (
    <Button
      endIcon={icon}
      sx={{ justifyContent: "flex-end", fontSize: "1.2em" }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
