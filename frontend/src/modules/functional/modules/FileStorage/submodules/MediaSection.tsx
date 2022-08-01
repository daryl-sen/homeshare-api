import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MediaThumbnail from "./MediaThumbnail";
import { MediaTabContextProvider } from "../contexts/MediaTabContextProvider";

import Stack from "@mui/material/Stack";
interface MediaSectionProps {
  name: string;
}

// TODO clarify mediaItems type
const renderMediaThumbnails = (mediaItems: string[]) => {
  return mediaItems.map((item) => <MediaThumbnail key={item} />);
};

export default function MediaSection({ name }: MediaSectionProps) {
  return (
    <MediaTabContextProvider>
      <Stack sx={{ mt: 2, mb: 2 }}>
        <Typography variant={"h2"}>{name}</Typography>
        <Grid container spacing={2}>
          {renderMediaThumbnails(["file 1", "file 2"])}
        </Grid>
      </Stack>
    </MediaTabContextProvider>
  );
}
