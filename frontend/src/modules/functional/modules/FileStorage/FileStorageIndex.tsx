import PageContainer from "../../../layout/modules/PageContainer";
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";

const statsHeaderStyle = {
  fontSize: "1em",
  fontWeight: "light",
  textAlign: "center",
  mb: 0,
};

const statsValueStyle = {
  fontSize: "3em",
  fontWeight: "bold",
  textAlign: "center",
  mb: 0,
};

const statsUnitStyle = {
  textAlign: "center",
};

export default function FileStorage() {
  return (
    <PageContainer>
      <Grid container>
        <Grid item sx={{ width: "50px" }}>
          <CloudCircleIcon sx={{ mr: 2 }} fontSize={"large"} />
        </Grid>
        <Grid item xs>
          <Typography variant={"h1"}>File Storage</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems={"center"}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Storage Stats
            </Typography>
            <Grid container spacing={1} alignItems={"center"}>
              <Grid item xs={4}>
                <Typography sx={statsHeaderStyle}>
                  Capacity Used <br />
                  (Your Files)
                </Typography>
                <Typography sx={statsValueStyle}>99</Typography>
                <Typography sx={statsUnitStyle}>GB</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={statsHeaderStyle}>
                  Capacity Remaining <br />
                  (Your Limit)
                </Typography>
                <Typography sx={statsValueStyle}>200</Typography>
                <Typography sx={statsUnitStyle}>GB</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={statsHeaderStyle}>
                  Capacity Remaining <br />
                  (System Limit)
                </Typography>
                <Typography sx={statsValueStyle}>200</Typography>
                <Typography sx={statsUnitStyle}>GB</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="subtitle2">
              Note: All calculations are based on files that have been indexed
              by this service, and total capacity is defined by the
              administrator. Actual values may differ.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
