// Sidebar.tsx
import { Avatar, Tooltip } from "@mui/material";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import GridViewRounded from "@mui/icons-material/GridViewRounded";
import AssessmentRounded from "@mui/icons-material/AssessmentRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import BadgeRounded from "@mui/icons-material/BadgeRounded";
import { NavLink } from "react-router-dom";
import React from "react";

const IconBtn = ({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    className={[
      "h-10 w-10 grid place-items-center rounded-xl transition-colors",
      active
        ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10"
        : "text-muted hover:text-indigo-500 hover:bg-tile",
    ].join(" ")}
    aria-pressed={active}
  >
    {children}
  </button>
);

/** 내부 라우트는 <NavLink>, 외부 URL은 <a>로 자동 분기 */
function NavIcon({
  to,
  title,
  end = false,
  children,
  newTab = true,
}: {
  to: string;            // "/mui" 같은 내부 경로 또는 "https://..." 외부 URL
  title: string;
  end?: boolean;
  children: React.ReactNode;
  newTab?: boolean;      // 외부 링크 새 탭 열기 (기본 true)
}) {
  const isExternal = /^https?:\/\//i.test(to);

  return (
    <Tooltip title={title} placement="right">
      <span>
        {isExternal ? (
          <a
            href={to}
            className="no-underline"
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
            aria-label={title}
          >
            {/* 외부 링크는 isActive 개념이 없으니 기본 버튼 */}
            <IconBtn>{children}</IconBtn>
          </a>
        ) : (
          <NavLink to={to} end={end} className="no-underline" aria-label={title}>
            {({ isActive }) => <IconBtn active={isActive}>{children}</IconBtn>}
          </NavLink>
        )}
      </span>
    </Tooltip>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="
        fixed inset-y-0 left-0 w-20
        bg-paper shadow-card
        flex flex-col items-center py-6 gap-6
      "
    >
      {/* 홈 아이콘 */}
      <NavLink to="/mui" end className="no-underline" aria-label="Home">
        {({ isActive }) => (
          <div
            className={[
              "w-12 h-12 rounded-full grid place-items-center transition-colors",
              isActive ? "bg-indigo-600" : "bg-indigo-500",
            ].join(" ")}
          >
            <InsightsRounded sx={{ color: "#fff" }} />
          </div>
        )}
      </NavLink>

      {/* 아이콘 메뉴 */}
      <nav className="flex flex-col gap-2">
        <NavIcon to="/mui" title="Dashboard" end>
          <GridViewRounded />
        </NavIcon>

        <NavIcon to="/analytics" title="Analytics">
          <AssessmentRounded />
        </NavIcon>

        <NavIcon to="/calendar" title="Calendar">
          <CalendarMonthRounded />
        </NavIcon>

        <NavIcon to="/settings" title="Settings">
          <SettingsRounded />
        </NavIcon>

        {/* 🔗 외부 링크 예시: 새 탭으로 포트폴리오 열기 */}
        <NavIcon
          to="https://jjw0144.mycafe24.com/myportfolio/"
          title="Portfolio"
          newTab={false}
        >
          <BadgeRounded />
        </NavIcon>
      </nav>

      <div className="mt-auto">
        <Avatar src="https://i.pravatar.cc/100" />
      </div>
    </aside>
  );
}
