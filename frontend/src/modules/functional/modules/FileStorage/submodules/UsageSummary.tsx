import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

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

export default function UsageSummary() {
  return (
    <Paper>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Storage Stats
      </Typography>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item xs={12} sm={4}>
          <Typography sx={statsHeaderStyle}>
            Capacity Used <br />
            (Your Files)
          </Typography>
          <Typography sx={statsValueStyle}>99</Typography>
          <Typography sx={statsUnitStyle}>GB</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography sx={statsHeaderStyle}>
            Capacity Remaining <br />
            (Your Limit)
          </Typography>
          <Typography sx={statsValueStyle}>200</Typography>
          <Typography sx={statsUnitStyle}>GB</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
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
        Note: All calculations are based on files that have been indexed by this
        service, and total capacity is defined by the administrator. Actual
        values may differ.
      </Typography>
    </Paper>
  );
}
