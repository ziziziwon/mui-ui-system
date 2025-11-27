// src/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-soft">
      <Sidebar />
      <main>

        <Outlet />
      </main>
    </div>
  );
}
