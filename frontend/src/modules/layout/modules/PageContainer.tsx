import React from "react";
import Container from "@mui/material/Container";

interface PageContainerProps {
  children: JSX.Element | JSX.Element[] | string;
  textAlignment?: "center" | "left" | "right";
}

export default function PageContainer({
  children,
  textAlignment,
}: PageContainerProps) {
  const PageContainerStyle = {
    p: {
      xs: 2,
      sm: 6,
      md: 8,
    },
    textAlign: textAlignment ?? "left",
  };
  return <Container sx={PageContainerStyle}>{children}</Container>;
}
