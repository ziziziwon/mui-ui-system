// index.tsx
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { buildTheme, type Mode } from "./theme";
import { BrowserRouter } from "react-router-dom"; // ← 추가

function Root() {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("mode") as Mode) || "light");

  useEffect(() => {
    localStorage.setItem("mode", mode);
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 여기서 App을 라우터로 감싼다 */}
        <BrowserRouter>
          <App mode={mode} onToggle={() => setMode(m => (m === "light" ? "dark" : "light"))} />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
