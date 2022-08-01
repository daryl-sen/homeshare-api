import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

const mediaThumbnailStyle = {
  p: 0,
};

const mediaThumbnailCaptionStyle = {
  fontSize: "0.8 em",
  p: 1,
  pb: 0,
};

export default function MediaThumbnail() {
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

  return (
    <>
      <Grid item sx={{ width: "200px", aspectRatio: "4/3" }}>
        <Card sx={mediaThumbnailStyle}>
          {renderPreview()}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography sx={mediaThumbnailCaptionStyle}>File Name</Typography>
            <IconButton size={"small"} sx={{ ml: 2, mr: 0 }}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Card>
      </Grid>
    </>
  );
}
