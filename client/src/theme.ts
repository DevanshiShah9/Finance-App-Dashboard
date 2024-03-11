import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createContext, useCallback, useMemo, useState } from "react";

//dark to light
const darkBackgroundColors = {
  grey: {
    100: "#242427",
    200: "#48494e",
    300: "#6b6d74",
    400: "#8f929b",
    500: "#b3b6c2",
    600: "#c2c5ce",
    700: "#d1d3da",
    800: "#e1e2e7",
    900: "#f0f0f3",
  },
  primary: {
    100: "#043028",
    200: "#076050",
    300: "#0b8f78",
    400: "#0ebfa0",
    500: "#12efc8",
    600: "#41f2d3",
    700: "#71f5de",
    800: "#a0f9e9",
    900: "#d0fcf4",
  },
  secondary: {
    100: "#302411",
    200: "#614822",
    300: "#916c33",
    400: "#c29044",
    500: "#f2b455",
    600: "#f5c377",
    700: "#f7d299",
    800: "#fae1bb",
    900: "#fcf0dd",
  },
  tertiary: {
    // purple
    500: "#8884d8",
  }
};

//light to light
const lightBackgroundColors = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    100: "#d0fcf4",
    200: "#a0f9e9",
    300: "#71f5de",
    400: "#41f2d3",
    500: "#12efc8",
    600: "#0ebfa0",
    700: "#0b8f78",
    800: "#076050",
    900: "#043028",
  },
  secondary: {
    100: "#fcf0dd",
    200: "#fae1bb",
    300: "#f7d299",
    400: "#f5c377",
    500: "#f2b455",
    600: "#c29044",
    700: "#916c33",
    800: "#614822",
    900: "#302411",
  },
  tertiary: {
    // purple
    500: "#8884d8",
  }
};


export const tokens = (mode: string) => ({
  ...(mode === "dark" ? darkBackgroundColors : lightBackgroundColors),
});

export const themeSettings = (mode: string) => {
  const colors = tokens(mode); 
  return {
    palette: {
      mode: mode as PaletteMode,
      primary: {
        ...colors.primary,
        main: colors.primary[500],
        light: colors.primary[400],
      },
      secondary: {
        ...colors.secondary,
        main: colors.secondary[500],
      },
      tertiary: {
        ...colors.tertiary,
      },
      grey: {
        ...colors.grey,
        main: colors.grey[500],
      },
      background: {
        default: mode === "dark" ? "#1f2026" : "#ffffff",
      },
    },

    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 10,
      },
    },
  };
};




export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return { theme, toggleColorMode };
};
