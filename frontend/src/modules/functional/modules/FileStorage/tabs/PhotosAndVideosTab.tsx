import React from "react";
import Grid from "@mui/material/Grid";
import MediaSection from "../submodules/MediaSection";
import Typography from "@mui/material/Typography";

export default function PhotosAndVideosTab() {
  return (
    <>
      <Typography>Sorted by Upload Date</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MediaSection name={"Jul 31"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MediaSection name={"Jul 30"} />
        </Grid>
      </Grid>
    </>
  );
}
