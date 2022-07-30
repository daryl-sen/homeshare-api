import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: "1.5em",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        sx: {
          height: "100%",
          backgroundColor: "#e0e0e0",
        },
        disableGutters: true,
        maxWidth: false,
      },
    },
    MuiDrawer: {
      defaultProps: {
        PaperProps: {
          sx: {
            background: "#ffffff",
          },
        },
      },
    },
  },
});
