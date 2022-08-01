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

const captionStyle = {};

function ImagePlaceholder() {
  return (
    <div
      style={{
        backgroundColor: "red",
        width: "100%",
        aspectRatio: "4/3",
      }}
    />
  );
}

export default function GalleryModal() {
  const handleDeleteTag = () => {
    console.log("delete tag");
  };

  const handleCloseModal = () => {
    console.log("closing modal");
  };

  return (
    <Dialog open={true} fullWidth maxWidth={"md"} PaperProps={{ sx: { p: 0 } }}>
      <ImagePlaceholder />
      <Stack
        direction={"row"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
        sx={{ p: 2 }}
      >
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
        <Stack spacing={3} direction={"row"}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <ButtonGroup variant={"contained"}>
            <IconButton>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleCloseModal}>
              <ClearIcon />
            </IconButton>
          </ButtonGroup>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
