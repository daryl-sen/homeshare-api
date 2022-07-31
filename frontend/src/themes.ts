import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "1.8em",
      marginBottom: 8,
    },
    // used for appbar header
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
