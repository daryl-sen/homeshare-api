import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import UsageSummary from "../submodules/UsageSummary";

export default function SummaryTab() {
  return (
    <Grid container spacing={4} alignItems={"center"}>
      <Grid item md={6} xs={12}>
        <Typography variant={"h2"}>Save or Share</Typography>
        <Typography variant={"body1"}>
          Offload your files into the local cloud and free up precious storage
          on your computer! If you choose to, you can share files with other
          users on your local network.
        </Typography>
        <Typography variant={"body1"}>
          Uploaded photos can be directly previewed on the cloud, while other
          files and documents must be downloaded to your computer. Video
          previews coming soon!
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <UsageSummary />
      </Grid>
    </Grid>
  );
}
