import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "2em",
      marginBottom: "1em",
    },
    h2: {
      fontSize: "1.5em",
      marginBottom: "0.5em",
      fontWeight: "strong",
    },
    h3: {
      fontSize: "1.2em",
      marginBottom: "1em",
    },
    body1: {
      marginBottom: "0.5em",
    },
    // used for appbar header
    subtitle1: {
      fontSize: "1.5em",
    },
    subtitle2: {
      fontSize: "0.8em",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        sx: {
          minHeight: "100%",
          backgroundColor: "#ffffff",
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
    MuiPaper: {
      defaultProps: {
        sx: {
          p: 2,
        },
      },
    },
    MuiDivider: {
      defaultProps: {
        sx: {
          mt: 1,
          mb: 1,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        sx: {
          p: 0,
        },
      },
    },
  },
});
