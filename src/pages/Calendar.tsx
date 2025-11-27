// src/pages/Calendar.tsx
import { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

type View = "day" | "week" | "month" | "year";

type EventTag = {
  day: number;
  label: string;
  color: "teal" | "pink" | "orange";
};

// 데모 이벤트
const DEMO_EVENTS: EventTag[] = [
  { day: 2, label: "Free day", color: "teal" },
  { day: 2, label: "Party Time", color: "pink" },
  { day: 16, label: "Victory day", color: "orange" },
  { day: 25, label: "Christmas Day", color: "teal" },
];

const PEOPLE = [
  { name: "Eddie Lobanovskiy", email: "labanovskiy@gmail.com", img: "https://i.pravatar.cc/48?img=12" },
  { name: "Alexey Stave", email: "alexeyst@gmail.com", img: "https://i.pravatar.cc/48?img=15" },
  { name: "Anton Tkachev", email: "tkacheveanton@gmail.com", img: "https://i.pravatar.cc/48?img=18" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 해당 월의 6x7 셀 매트릭스(이전/다음 월 포함)
function getMonthMatrix(d: Date) {
  const year = d.getFullYear();
  const month = d.getMonth();
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 이전 월 말일
  const prevDays = new Date(year, month, 0).getDate();

  const cells: { day: number; inMonth: boolean }[] = [];
  // 이전 월 채우기
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, inMonth: false });
  }
  // 이번 달
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true });
  // 다음 달
  while (cells.length < 42) cells.push({ day: cells.length - (startDay + daysInMonth) + 1, inMonth: false });

  // 6주로 분할
  const rows: typeof cells[] = [];
  for (let r = 0; r < 6; r++) rows.push(cells.slice(r * 7, r * 7 + 7));
  return rows;
}

function MonthTitle(d: Date) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function CalendarPage() {
  const [view, setView] = useState<View>("month");
  const [cursor, setCursor] = useState<Date>(new Date()); // 헤더에 표시/이동 기준
  const [selected, setSelected] = useState<number | null>(null);

  const matrix = useMemo(() => getMonthMatrix(cursor), [cursor]);
  const monthIndex = cursor.getMonth();
  const year = cursor.getFullYear();

  const eventsByDay = useMemo(() => {
    const map = new Map<number, EventTag[]>();
    DEMO_EVENTS.forEach((e) => {
      map.set(e.day, [...(map.get(e.day) || []), e]);
    });
    return map;
  }, []);

  const goPrevMonth = () => setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNextMonth = () => setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="pl-20 min-h-screen bg-soft">
      {/* 상단바 */}
<div className="sticky top-0 z-10 backdrop-blur bg-[var(--bg-soft)]/70 px-6 py-4">
  <div className="flex items-center justify-start gap-3">
    <Typography variant="h4" className="!text-2xl !font-extrabold"  >Calendar</Typography>

    <ToggleButtonGroup
      size="small"
      value={view}
      exclusive
      onChange={(_, v) => v && setView(v)}
      sx={{ "& .MuiToggleButton-root": { textTransform: "none", borderRadius: 2, px: 1.5 } }}
    >
      <ToggleButton value="day">Day</ToggleButton>
      <ToggleButton value="week">Week</ToggleButton>
      <ToggleButton value="month">Month</ToggleButton>
      <ToggleButton value="year">Year</ToggleButton>
    </ToggleButtonGroup>
  </div>
</div>


      {/* 본문 */}
      <div className="px-6 pb-10 grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* LEFT 패널 */}
        <div className="lg:col-span-1">
          <Paper className="bg-paper shadow-card rounded-2xl p-4 space-y-4" elevation={0}>
            <Button fullWidth startIcon={<AddRounded />} variant="contained" sx={{ borderRadius: 1 }}>
              Create Schedule
            </Button>

            {/* 미니 캘린더 */}
            <div className="rounded-2xl bg-tile p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{cursor.toLocaleDateString(undefined, { year: "numeric", month: "long" })}</div>
                <div className="flex gap-1">
                  <IconButton size="small" onClick={goPrevMonth}><ChevronLeftRounded fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={goNextMonth}><ChevronRightRounded fontSize="small" /></IconButton>
                </div>
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-muted mb-1">
                {WEEKDAYS.map((w) => <div key={w} className="py-1">{w[0]}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {matrix.flat().map((c, i) => {
                  const isToday =
                    c.inMonth &&
                    new Date().getFullYear() === year &&
                    new Date().getMonth() === monthIndex &&
                    new Date().getDate() === c.day;
                  return (
                    <button
                      key={i}
                      onClick={() => c.inMonth && setSelected(c.day)}
                      className={`mx-auto w-8 h-8 rounded-full grid place-items-center text-sm
                        ${c.inMonth ? "" : "text-muted"}
                        ${selected === c.day ? "bg-indigo-500 text-white" : isToday ? "ring-1 ring-indigo-400" : ""}
                      `}
                    >
                      {c.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* People */}
            <div>
              <div className="font-semibold mb-2">People</div>
              <TextField
                fullWidth
                size="small"
                placeholder="Search for People"
                InputProps={{
                  startAdornment: <SearchRounded className="text-muted mr-2" fontSize="small" />,
                }}
              />
              <div className="mt-3 space-y-2">
                {PEOPLE.map((p) => (
                  <div key={p.email} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-tile">
                    <Avatar src={p.img} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{p.name}</div>
                      <div className="text-xs text-muted truncate">{p.email}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button fullWidth variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
                My Schedule
              </Button>
            </div>
          </Paper>
        </div>

        {/* RIGHT: 메인 캘린더 */}
        <div className="lg:col-span-3">
          <Paper className="bg-paper shadow-card rounded-2xl p-4" elevation={0}>
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <Typography fontWeight={700}>{MonthTitle(cursor)}</Typography>
              <div className="flex gap-1">
                <Tooltip title="Prev month"><IconButton onClick={goPrevMonth}><ChevronLeftRounded /></IconButton></Tooltip>
                <Tooltip title="Next month"><IconButton onClick={goNextMonth}><ChevronRightRounded /></IconButton></Tooltip>
              </div>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 text-center text-sm text-muted pb-2">
              {WEEKDAYS.map((w) => <div key={w} className="py-1">{w}</div>)}
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-7 gap-[1px] rounded-xl overflow-hidden"
                 style={{ background: "var(--divider, rgba(0,0,0,0.06))" }}>
              {matrix.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const inMonth = cell.inMonth;
                  const day = cell.day;
                  const key = `${rIdx}-${cIdx}`;
                  const on = eventsByDay.get(day) || [];

                  return (
                    <div key={key} className="min-h-[120px] bg-paper p-2">
                      <div className={`text-center font-semibold ${inMonth ? "" : "text-muted"} ${selected === day ? "text-indigo-500" : ""}`}>
                        {String(day).padStart(2, "0")}
                      </div>

                      {/* 이벤트 태그 */}
                      <div className="mt-2 space-y-1">
                        {inMonth && on.slice(0, 3).map((ev, i) => (
                          <Chip
                            key={i}
                            size="small"
                            label={ev.label}
                            sx={{
                              height: 22,
                              borderRadius: 1,
                              color:
                                ev.color === "teal" ? "info.contrastText" :
                                ev.color === "pink" ? "secondary.contrastText" :
                                "warning.contrastText",
                              bgcolor:
                                ev.color === "teal" ? "info.main" :
                                ev.color === "pink" ? "secondary.main" :
                                "warning.main",
                              "& .MuiChip-label": { px: 1, fontSize: 12 },
                            }}
                          />
                        ))}
                        {inMonth && on.length > 3 && (
                          <Chip size="small" label="More" variant="outlined" sx={{ height: 22, borderRadius: 1 }} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
