import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import NavigationButton from "./submodules/NavigationButton";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

interface MainDrawerProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export default function MainDrawer({ isOpen, setIsOpen }: MainDrawerProps) {
  return (
    <Drawer open={isOpen} onClose={setIsOpen}>
      <Stack
        p={2}
        sx={{ height: "100%" }}
        justifyContent={"center"}
        divider={<Divider />}
      >
        <Typography
          sx={{
            textAlign: "right",
            mb: 2,
            fontWeight: "bold",
            fontSize: "1.8em",
          }}
        >
          Applications
        </Typography>
        <NavigationButton icon={<HomeIcon />}>Dashboard</NavigationButton>
        <NavigationButton icon={<CloudCircleIcon />}>
          File Storage
        </NavigationButton>
        <NavigationButton icon={<ContentPasteIcon />}>
          Clipboard
        </NavigationButton>
        <NavigationButton icon={<VpnKeyIcon />}>Passwords</NavigationButton>
        <NavigationButton icon={<PlaylistAddCheckIcon />}>
          Todo
        </NavigationButton>
      </Stack>
    </Drawer>
  );
}
