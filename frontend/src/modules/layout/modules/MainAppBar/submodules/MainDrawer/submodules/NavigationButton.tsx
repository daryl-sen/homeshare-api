import React from "react";
import Button from "@mui/material/Button";

interface NavigationButtonProps {
  children: string;
  icon: JSX.Element;
}

export default function NavigationButton({
  children,
  icon,
}: NavigationButtonProps) {
  return (
    <Button
      endIcon={icon}
      sx={{ justifyContent: "flex-end", fontSize: "1.5em" }}
    >
      {children}
    </Button>
  );
}
