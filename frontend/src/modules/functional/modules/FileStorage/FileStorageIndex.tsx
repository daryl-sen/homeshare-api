import React, { useState } from "react";
import PageContainer from "../../../layout/modules/PageContainer";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SummaryTab from "./tabs/SummaryTab";
import PhotosAndVideosTab from "./tabs/PhotosAndVideosTab";
import FilesTab from "./tabs/FilesTab";

const tabsStyle = { backgroundColor: "#e6e6e6" };

const renderTab = (selectedTabIndex: number) => {
  switch (selectedTabIndex) {
    case 0:
      return <SummaryTab />;
    case 1:
      return <PhotosAndVideosTab />;
    case 2:
      return <FilesTab />;
    default:
      // TODO set default tab based on user preference
      return <SummaryTab />;
  }
};

export default function FileStorage() {
  const [selectedTabInxex, setSelectedTabInxex] = useState<number>(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setSelectedTabInxex(newValue);

  return (
    <>
      <Tabs
        value={selectedTabInxex}
        onChange={handleTabChange}
        centered
        sx={tabsStyle}
      >
        <Tab label={"Summary"} />
        <Tab label={"Photos"} />
        <Tab label={"Files"} />
      </Tabs>
      <PageContainer>
        <Grid container>
          <Grid item sx={{ width: "50px" }}>
            <CloudCircleIcon sx={{ mr: 2 }} fontSize={"large"} />
          </Grid>
          <Grid item xs>
            <Typography variant={"h1"}>File Storage</Typography>
          </Grid>
        </Grid>
        {renderTab(selectedTabInxex)}
      </PageContainer>
    </>
  );
}
