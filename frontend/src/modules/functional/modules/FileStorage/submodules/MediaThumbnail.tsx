import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useMediaTabContext } from "../contexts/MediaTabContextProvider";
import CardActionArea from "@mui/material/CardActionArea";

const mediaThumbnailStyle = {
  p: 0,
};

const mediaThumbnailCaptionStyle = {
  fontSize: "0.8 em",
  p: 1,
  pb: 0,
};

export default function MediaThumbnail() {
  const { openGalleryModal } = useMediaTabContext();

  const renderThumbnail = () => {
    return (
      <CardActionArea
        onClick={() => openGalleryModal("1")}
        sx={{
          width: "100%",
          height: "100px",
          backgroundColor: "red",
          aspectRatio: "4/3",
        }}
      ></CardActionArea>
    );
  };

  return (
    <>
      <Grid item sx={{ width: "200px", aspectRatio: "4/3" }}>
        <Card sx={mediaThumbnailStyle}>
          {renderThumbnail()}
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
