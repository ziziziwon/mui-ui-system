import Sidebar from "../layout/Sidebar";
import { IconButton } from "@mui/material";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import LineArea from "../charts/LineArea";
import Donut from "../charts/Donut";
import RecentOrders from "../sections/RecentOrders";
import TopProducts from "../sections/TopProducts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-soft">
      <Sidebar />
      <main className="pl-20">
        {/* 상단바 */}
        <div className="sticky top-0 z-10 backdrop-blur flex items-center justify-between px-6 py-4
                        bg-[var(--bg-soft)]/70">
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <IconButton><NotificationsNoneRounded /></IconButton>
        </div>

        <div className="px-6 pb-10 space-y-6">
         {/* KPI 4개 (미니 버전) */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    { title: "Save Products",  value: "178+", emoji: "💙", delta: +12 },
    { title: "Stock Products", value: "20+",  emoji: "🟡", delta: -8  },
    { title: "Sales Products", value: "190+", emoji: "🟠", delta: +18 },
    { title: "Job Application", value: "12+", emoji: "🟣", delta: +4  },
  ].map((k, i) => {
    const up = k.delta >= 0;
    return (
      <div
        key={i}
        className="
          bg-paper rounded-2xl shadow-card p-5
          transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-lg
          hover:ring-1 hover:ring-black/5 dark:hover:ring-white/10
        "
      >
        {/* 상단: 이모지 배지 + 작은 증감 */}
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-tile text-lg">
            {k.emoji}
          </div>
          <span
            className={`
              text-xs font-medium px-2 py-0.5 rounded-md
              ${up ? "text-emerald-600 bg-emerald-500/10"
                   : "text-rose-600 bg-rose-500/10"}
            `}
          >
            {up ? "+" : ""}{k.delta}%
          </span>
        </div>

        {/* 값 & 타이틀 */}
        <div className="mt-3 text-2xl font-extrabold tracking-tight">{k.value}</div>
        <div className="text-muted text-sm mt-1">{k.title}</div>
      </div>
    );
  })}
</section>

          {/* Reports + Analytics */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-paper rounded-2xl shadow-card p-4 lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold">Reports</h2>
                <button className="text-muted">⋯</button>
              </div>
              <LineArea />
            </div>

            <div className="bg-paper rounded-2xl shadow-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold">Analytics</h2>
                <button className="text-muted">⋯</button>
              </div>
              <Donut />
            </div>
          </section>

          {/* 테이블 & 리스트 */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>
            <TopProducts />
          </section>
        </div>
      </main>
    </div>
  );
}
