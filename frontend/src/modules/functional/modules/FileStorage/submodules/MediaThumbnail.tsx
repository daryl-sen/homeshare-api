import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface MediaThumbnailProps {
  fileName: string;
  fileSize: number;
  fileId: string;
}

const mediaThumbnailStyle = {
  p: 0,
};

const mediaThumbnailCaptionStyle = {
  fontSize: "0.8 em",
  p: 1,
};

const renderPreview = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "red",
        aspectRatio: "4/3",
      }}
    ></div>
  );
};

export default function MediaThumbnail() {
  return (
    <Grid item sx={{ width: "200px", aspectRatio: "4/3" }}>
      <Card sx={mediaThumbnailStyle}>
        {renderPreview()}
        <Typography sx={mediaThumbnailCaptionStyle}>File Name</Typography>
      </Card>
    </Grid>
  );
}
