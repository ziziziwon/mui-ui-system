import { useMemo, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Chip,
  ChipProps,
  IconButton,
  Paper,
} from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import RadioButtonUncheckedRounded from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

type Priority = "Low" | "High" | "Medium";
type Status = "On Track" | "At Risk" | "Blocked";

export type Task = {
  id: string;
  title: string;
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
  members: string[];
  priority: Priority;
  status: Status;
  done?: boolean;
  track?: number; // 겹칠 때 세로 열
};

const DEMO_TASKS: Task[] = [
  {
    id: "t1",
    title: "Graphic Design",
    start: "09:10",
    end: "10:00",
    members: ["https://i.pravatar.cc/32?img=12","https://i.pravatar.cc/32?img=15","https://i.pravatar.cc/32?img=18"],
    priority: "Low",
    status: "On Track",
    done: false,
    track: 0,
  },
  {
    id: "t2",
    title: "Dashboard Design",
    start: "11:10",
    end: "12:30",
    members: ["https://i.pravatar.cc/32?img=20","https://i.pravatar.cc/32?img=14","https://i.pravatar.cc/32?img=23"],
    priority: "High",
    status: "On Track",
    done: true,
    track: 0,
  },
  {
    id: "t3",
    title: "Logo Design",
    start: "13:10",
    end: "14:15",
    members: ["https://i.pravatar.cc/32?img=33","https://i.pravatar.cc/32?img=39","https://i.pravatar.cc/32?img=41"],
    priority: "High",
    status: "On Track",
    done: true,
    track: 0,
  },
  {
    id: "t4",
    title: "Web Design",
    start: "15:20",
    end: "16:40",
    members: ["https://i.pravatar.cc/32?img=5","https://i.pravatar.cc/32?img=7","https://i.pravatar.cc/32?img=9"],
    priority: "Medium",
    status: "On Track",
    done: false,
    track: 0,
  },
];

export type TaskTimelineProps = {
  startHour?: number;   // 24h
  endHour?: number;     // 24h
  tasks?: Task[];
  hourHeight?: number;  // px per hour
  tracks?: number;      // 열 개수
  datePills?: string[]; // 상단 날짜 pills
  activeDate?: string;  // 강조 날짜
};

function toMin(s: string) {
  const [hh, mm] = s.split(":").map(Number);
  return hh * 60 + mm;
}

export default function TaskTimeline({
  startHour = 9,
  endHour = 18,
  tasks = DEMO_TASKS,
  hourHeight = 96,
  tracks = 1,
  datePills = ["29","30","01","02","03","04","05","06","07","08","09","10","11","12","14"],
  activeDate = "02",
}: TaskTimelineProps) {
  // 체크 토글용 내부 상태
  const [items, setItems] = useState<Task[]>(tasks);
  const toggleDone = (id: string) =>
    setItems(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const startMin = startHour * 60;
  const endMin = endHour * 60;
  const totalMin = endMin - startMin;
  const totalHeight = totalMin * (hourHeight / 60);

  const hours = useMemo(
    () => Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i),
    [startHour, endHour]
  );

  const laneWidth = `${100 / tracks}%`;

  return (
    <Paper elevation={0} className="rounded-2xl bg-paper shadow-card overflow-hidden">
      {/* 상단 날짜 pills */}
      <div className="px-6 py-3 flex items-center gap-2 border-b border-black/5 dark:border-white/10 overflow-x-auto">
        {datePills.map((d, i) => (
          <div
            key={d + i}
            className={`text-xs px-3 py-1 rounded-md select-none whitespace-nowrap ${
              d === activeDate ? "bg-indigo-500 text-white font-semibold" : "text-muted"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 타임라인 본문: 좌측 시간축 + 우측 캔버스 */}
      <div className="grid" style={{ gridTemplateColumns: "88px 1fr" }}>
        {/* 좌측 시간 라벨 */}
        <div className="relative" style={{ height: totalHeight }}>
          {hours.map((h, idx) => {
            const top = idx * hourHeight;
            return (
              <div key={h} className="absolute left-0 right-0" style={{ top }}>
                <div className="h-px bg-black/5 dark:bg-white/10" />
                <div className="text-[11px] text-muted mt-2 pl-3 select-none">
                  {String(((h + 11) % 12) + 1).padStart(2, "0")}:00 {h < 12 ? "AM" : "PM"}
                </div>
              </div>
            );
          })}
        </div>

        {/* 우측 캔버스 */}
        <div className="relative" style={{ height: totalHeight, paddingRight: 24 }}>
          {/* 시간 그리드 */}
          {hours.map((h) => {
            const top = (h - startHour) * hourHeight;
            return (
              <div
                key={`grid-${h}`}
                className="absolute left-0 right-0 h-px bg-black/5 dark:bg-white/10"
                style={{ top }}
              />
            );
          })}

          {/* 태스크 카드 */}
          {items.map((t) => {
            const top = (toMin(t.start) - startMin) * (hourHeight / 60);
            const height = Math.max(64, (toMin(t.end) - toMin(t.start)) * (hourHeight / 60));
            const leftPct = `calc(${laneWidth} * ${t.track ?? 0})`;

            const pri: { chip: ChipProps["color"] } =
              t.priority === "High"
                ? { chip: "info" }
                : t.priority === "Low"
                ? { chip: "secondary" }
                : { chip: "warning" };

            return (
              <div
                key={t.id}
                className="absolute"
                style={{ top, left: leftPct, width: `calc(${laneWidth} - 24px)` }}
              >
                <Paper
                  elevation={0}
                  className={`rounded-xl shadow-card ${t.done ? "opacity-80" : ""}`}
                  sx={{
                       px: 4,
                        py: 3,
                        height,
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        // ↓↓↓ 세로 가운데 정렬 추가
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 1.5, // 줄 사이 간격 (theme.spacing 단위)
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <IconButton size="small" onClick={() => toggleDone(t.id)} aria-label="toggle done">
                        {t.done ? (
                          <CheckCircleRounded fontSize="small" className="text-indigo-500" />
                        ) : (
                          <RadioButtonUncheckedRounded fontSize="small" className="text-muted" />
                        )}
                      </IconButton>
                      <div className={`text-sm font-medium truncate ${t.done ? "line-through text-muted" : ""}`}>
                        {t.title}
                      </div>
                    </div>
                    <IconButton size="small">
                      <MoreHorizRounded fontSize="small" />
                    </IconButton>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <AvatarGroup max={4} total={t.members.length}>
                      {t.members.slice(0, 4).map((src, i) => (
                        <Avatar key={i} src={src} sx={{ width: 24, height: 24 }} />
                      ))}
                    </AvatarGroup>

                    <Chip
                      size="small"
                      label={t.priority}
                      color={pri.chip}
                      variant="outlined"
                      sx={{ height: 24, "& .MuiChip-label": { px: 1, fontSize: 12 }, borderColor: "transparent" }}
                    />
                    <Chip
                      size="small"
                      label={t.status}
                      color="warning"
                      sx={{ height: 24, "& .MuiChip-label": { px: 1, fontSize: 12 } }}
                    />
                  </div>
                </Paper>
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}
