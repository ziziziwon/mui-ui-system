import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export type Mode = "light" | "dark";

export const buildTheme = (mode: Mode) => {
  let theme = createTheme({
    palette: mode === "light"
      ? {
          mode: "light",
          primary:  { main: "#6366f1" },            // indigo-500
          secondary:{ main: "#10b981" },            // emerald-500
          background:{ default: "#f6f7fb", paper: "#ffffff" },
        }
      : {
          mode: "dark",
          primary:  { main: "#8b9cff" },            // indigo-300
          secondary:{ main: "#34d399" },            // emerald-400
          background:{ default: "#0b1220", paper: "#0f172a" },
        },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { textTransform: "none" } } },
      MuiCard:   { styleOverrides: { root: { borderRadius: 16, boxShadow: mode==="light" ? "0 6px 20px rgba(0,0,0,.06)" : "0 10px 30px rgba(0,0,0,.35)" } } },
    },
  });

  return responsiveFontSizes(theme);
};
