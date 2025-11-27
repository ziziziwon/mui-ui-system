import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Portpolio from "./pages/Portpolio";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* pathless 부모 + Outlet 렌더 */}
      <Route element={<MainLayout />}>
        <Route path="/mui" index element={<Dashboard />} />           
        <Route path="analytics" element={<Analytics />} />
        <Route path="calendar" element={<Calendar />} />  
        <Route path="settings" element={<Settings />} /> 
        <Route path= "portfolio" element={<Portpolio />} />
        {/* 레이아웃 범위 내 캐치 (선택) */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* 최종 캐치 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
