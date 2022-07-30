import * as React from "react";
import Drawer from "@mui/material/Drawer";

interface MainDrawerProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export default function MainDrawer({ isOpen, setIsOpen }: MainDrawerProps) {
  return (
    <div>
      <Drawer open={isOpen} onClose={setIsOpen}>
        Drawer content
      </Drawer>
    </div>
  );
}
