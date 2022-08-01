import React from "react";
import Dialog from "@mui/material/Dialog";
import { Chip, Stack, Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { useMediaTabContext } from "../contexts/MediaTabContextProvider";

const captionStyle = {};

function ImagePlaceholder() {
  return (
    <CardMedia
      component={"div"}
      sx={{
        backgroundColor: "red",
        width: "100%",
        aspectRatio: "4/3",
      }}
    />
  );
}

export default function GalleryModal() {
  const { isGalleryModalOpen, closeGalleryModal } = useMediaTabContext();

  const handleDeleteTag = () => {
    console.log("delete tag");
  };

  return (
    <Dialog
      open={isGalleryModalOpen}
      fullWidth
      maxWidth={"md"}
      PaperProps={{ sx: { p: 0 } }}
      onClose={closeGalleryModal}
    >
      <ImagePlaceholder />
      <Grid
        container
        alignItems={"flex-end"}
        justifyContent={"space-between"}
        sx={{ p: 2 }}
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Stack>
            <Typography sx={captionStyle}>image_name.jpg</Typography>
            <Stack spacing={1} direction={"row"}>
              <Chip
                size={"small"}
                label={"tag 1"}
                deleteIcon={<ClearIcon fontSize={"small"} />}
                onDelete={handleDeleteTag}
              />
              <Chip
                size={"small"}
                label={"tag 2"}
                deleteIcon={<ClearIcon fontSize={"small"} />}
                onDelete={handleDeleteTag}
              />
              <Chip
                size={"small"}
                label={"tag 3"}
                deleteIcon={<ClearIcon fontSize={"small"} />}
                onDelete={handleDeleteTag}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack
            spacing={3}
            direction={"row"}
            sx={{
              justifyContent: {
                xs: "space-between",
                sm: "flex-end",
              },
            }}
          >
            <ButtonGroup variant={"contained"}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </ButtonGroup>
            <ButtonGroup variant={"contained"}>
              <IconButton>
                <CheckBoxOutlineBlankIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={closeGalleryModal}>
                <ClearIcon />
              </IconButton>
            </ButtonGroup>
          </Stack>
        </Grid>
      </Grid>
    </Dialog>
  );
}
