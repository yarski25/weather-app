import { createTheme, Theme } from "@mui/material/styles";
import { blue, grey, purple } from "@mui/material/colors";
import { OverridesStyleRules } from "@mui/material/styles/overrides";
import { PaletteMode } from "@mui/material";

// colors
// most expensive

// YInMn Blue
// #2E5090
// Lapis Lazuli
// #26619C
// Tyrian Purple
// #66023C

// combinations
// Mauve, sapphire and powder blue
// #d9a5b3, #1868ae, #c6d7eb

// Raspberry and shades of blue
// #8a307f, #79a7d3, #6883bc

// Sea-foam, salmon and navy
// #aed6dc, #ff9a8d, #4a536b

type CustomComponentProps = {
  color?: "primary" | "secondary";
  backgroundColor?: string;
  //variant?: "outlined";
};

type CustomComponentClassKey = "root";

declare module "@mui/material/styles" {
  interface Components {
    StyledBox?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledBox", Theme>
      >;
    };
    StyledCard?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCard", Theme>
      >;
    };
    StyledCardContent?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCardContent", Theme>
      >;
    };
    StyledCardMedia?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCardMedia", Theme>
      >;
    };
    StyledCardActions?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCardActions", Theme>
      >;
    };
  }
}

// theme construction
export const theme = createTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: purple[50],
      main: purple[500],
      dark: purple[700],
    },
    background: {
      paper: blue[200],
      default: blue[200],
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
  },
  components: {
    // Name of the component
    // MyCard: {},
    // MyCardComponent: {
    //   defaultProps: {
    //     color: "primary",
    //   },
    // },
    // MyComponent: {
    //   // defaultProps: {
    //   //   color: "inherit",
    //   // },
    //   styleOverrides: {
    //     // root: (props) => ({
    //     //   ...(props.color !== "primary" && { borderRadius: "16px" }),
    //     // }),
    //     // color: "red",
    //     //borderRadius: "16px",
    //     // padding: 16,
    //   },
    // },
    // StyledCard: {
    //   defaultProps: {
    //     variant: "outlined",
    //   },
    // },
    MuiTextField: {
      defaultProps: {
        sx: {
          backgroundColor: "secondary",
          //border: "3px solid #001d3d",
        },
        InputLabelProps: {
          sx: {
            color: "#003566",
            textTransform: "capitalize",
          },
        },
        InputProps: {
          sx: {
            "&:hover fieldset": {
              border: "2px solid blue!important",
              borderRadius: 0,
            },
            "&:focus-within fieldset, &:focus-visible fieldset": {
              border: "4px solid red!important",
            },
          },
        },
        inputProps: {
          sx: {
            color: "black",
            paddingLeft: "1em",
            fontSize: "1.2em",
          },
        },
        FormHelperTextProps: {
          sx: {
            color: "red",
          },
        },
      },
    },
  },
});

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: purple[200],
          },
          divider: purple[200],
          background: {
            default: purple[50],
            paper: purple[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: purple[300],
          },
          divider: grey[700],
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[900],
          },
        }),
  },
});
