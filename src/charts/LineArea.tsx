// LineArea.tsx
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { alpha, useTheme } from "@mui/material/styles";
import "../charts/register";

export default function LineArea() {
  const t = useTheme();

  const cfg = useMemo(() => {
    const strokeGradient = (chart: any) => {
      const { ctx, chartArea } = chart;
      if (!chartArea) return t.palette.primary.main;
      const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
      g.addColorStop(0, "#60a5fa");
      g.addColorStop(0.5, "#a78bfa");
      g.addColorStop(1, "#f472b6");
      return g;
    };

    const fillGradient = (chart: any) => {
      const { ctx, chartArea } = chart;
      if (!chartArea) return "transparent";
      const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      g.addColorStop(0, alpha("#60a5fa", 0.35));
      g.addColorStop(1, "transparent");
      return g;
    };

    return {
      data: {
        labels: ["10am","11am","12pm","01am","02am","03am","04am","06am","07am"],
        datasets: [{
          label: "Sales",
          data: [55,35,58,30,50,20,38,60,72],
          borderColor: (ctx: any) => strokeGradient(ctx.chart),
          borderWidth: 3,
          backgroundColor: (ctx: any) => fillGradient(ctx.chart),
          fill: true,
          pointBackgroundColor: "#fff",
          pointBorderColor: t.palette.primary.main,
          pointRadius: 4,
          tension: 0.35,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { intersect: false, mode: "index" as const },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            // ⬇️ 여기만 핵심
            min: 0,
            max: 80,
            ticks: {
              stepSize: 20,   // 0,20,40,60,80
              precision: 0,
            },
            grid: { color: alpha("#000", 0.06) },
          },
        },
      },
    };
  }, [t]);

  return <div style={{ height: 260 }}><Line data={cfg.data} options={cfg.options as any} /></div>;
}
