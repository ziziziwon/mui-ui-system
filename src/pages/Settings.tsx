import { useMemo, useState } from "react";
import {
  Button,
  Chip,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import TaskTimeline from "../components/TaskTimeline";

type View = "list" | "board" | "timeline";

export default function Settings() {
  const [view, setView] = useState<View>("timeline");
  const [cursor, setCursor] = useState<Date>(new Date());

  const monthLabel = useMemo(
    () => cursor.toLocaleDateString(undefined, { year: "numeric", month: "long" }),
    [cursor]
  );

  const prevMonth = () => setCursor(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCursor(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="pl-20 min-h-screen bg-soft">
      {/* 상단 바 (겹침 방지: flex-wrap + 좌/우 그룹 분리) */}
      <div className="sticky top-0 z-10 backdrop-blur bg-[var(--bg-soft)]/70">
        <div className="px-6 py-4 flex items-center gap-3 flex-wrap">
          {/* 왼쪽 그룹 */}
          <div className="flex items-center gap-3 min-w-0">
            <Typography variant="h4" className="!text-2xl !font-extrabold">
              Task Preview
            </Typography>

            <ToggleButtonGroup
              size="small"
              value={view}
              exclusive
              onChange={(_, v) => v && setView(v)}
              color="primary"
              sx={{ "& .MuiToggleButton-root": { textTransform: "none", borderRadius: 9999, px: 1.5 } }}
            >
              <ToggleButton value="list">List</ToggleButton>
              <ToggleButton value="board">Board</ToggleButton>
              <ToggleButton value="timeline">Timeline</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* 오른쪽 그룹 */}
          <div className="ml-0 flex items-center gap-3 shrink-0">
            <Button variant="contained" startIcon={<AddRounded />} sx={{ borderRadius: 9999, px: 2.5 }}>
              Add Task
            </Button>

            <div className="flex items-center gap-1 rounded-2xl bg-paper shadow-card px-3 py-1.5 shrink-0">
              <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10" onClick={prevMonth} aria-label="prev">
                <ChevronLeftRounded fontSize="small" />
              </button>
              <div className="text-sm whitespace-nowrap">{monthLabel}</div>
              <KeyboardArrowDownRounded fontSize="small" className="opacity-70" />
              <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10" onClick={nextMonth} aria-label="next">
                <ChevronRightRounded fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 본문: 좌측 사이드 + 타임라인 */}
      <div className="px-6 pb-10 grid grid-cols-12 gap-6">
        {/* 좌측 사이드 */}
        <Paper elevation={0} className="col-span-12 md:col-span-3 rounded-2xl bg-paper shadow-card p-4">
          <div className="space-y-3">
            {[
              { label: "To Do", active: true, count: 8 },
              { label: "Doing", active: false, count: 4 },
              { label: "Done", active: false, count: 12 },
            ].map(({ label, active, count }) => (
              <button
                key={label}
                className={`w-full flex items-center justify-between rounded-2xl px-5 py-4 text-sm transition
                ${active ? "bg-indigo-500 text-white" : "bg-tile text-foreground hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                <span>{label}</span>
                <Chip
                  size="small"
                  label={count}
                  className={active ? "!text-indigo-50 !bg-white/20" : "opacity-70"}
                />
              </button>
            ))}
          </div>
        </Paper>

        {/* 타임라인 */}
        <div className="col-span-12 md:col-span-9">
          <TaskTimeline
            startHour={9}
            endHour={17}
            hourHeight={90}
            tracks={1}
            datePills={["29","30","01","02","03","04","05","06","07","08","09","10","11","12","14"]}
            activeDate="02"
          />
        </div>
      </div>
    </div>
  );
}
