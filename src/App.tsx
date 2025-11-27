// src/App.tsx
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppRoutes from "./AppRoutes";

type Props = { mode: "light" | "dark"; onToggle: () => void };

export default function App({ mode, onToggle }: Props) {
  return (
    <div className="min-h-screen bg-soft">
      <div className="fixed top-4 right-16 z-50">
        <IconButton onClick={onToggle} aria-label="toggle theme">
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>
      <AppRoutes />
    </div>
  );
}
