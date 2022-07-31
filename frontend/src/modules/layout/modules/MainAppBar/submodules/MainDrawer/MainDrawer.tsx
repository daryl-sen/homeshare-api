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
import { useNavigate } from "react-router-dom";

interface MainDrawerProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export default function MainDrawer({ isOpen, setIsOpen }: MainDrawerProps) {
  const navigate = useNavigate();

  return (
    <Drawer open={isOpen} onClose={setIsOpen}>
      <Stack p={2} sx={{ height: "100%" }} justifyContent={"center"}>
        <Typography
          sx={{
            textAlign: "right",
            mb: 2,
            fontSize: "1.2em",
          }}
        >
          APPLICATIONS
        </Typography>
        <Divider />
        <NavigationButton
          handleClick={() => {
            navigate("/");
            setIsOpen();
          }}
          icon={<HomeIcon />}
        >
          Dashboard
        </NavigationButton>
        <NavigationButton
          handleClick={() => {
            navigate("/file-storage");
            setIsOpen();
          }}
          icon={<CloudCircleIcon />}
        >
          File Storage
        </NavigationButton>
        <NavigationButton
          handleClick={() => {
            navigate("/shared-clipboard");
            setIsOpen();
          }}
          icon={<ContentPasteIcon />}
        >
          Clipboard
        </NavigationButton>
        <NavigationButton
          handleClick={() => {
            navigate("/password-manager");
            setIsOpen();
          }}
          icon={<VpnKeyIcon />}
        >
          Passwords
        </NavigationButton>
        <NavigationButton
          handleClick={() => {
            navigate("/todo");
            setIsOpen();
          }}
          icon={<PlaylistAddCheckIcon />}
        >
          Todo
        </NavigationButton>
      </Stack>
    </Drawer>
  );
}
