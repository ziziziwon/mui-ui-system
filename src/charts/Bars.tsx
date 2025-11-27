import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { alpha, useTheme } from "@mui/material/styles";
import type { ChartData, ChartOptions } from "chart.js";
import "../charts/register";

export function TinyBars({ series }: { series: number[] }) {
  const t = useTheme();
  const primary = t.palette.primary.main;
  const label = t.palette.text.secondary;
  const grid = t.palette.mode === "dark" ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)";

  const data: ChartData<"bar"> = useMemo(() => ({
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      data: series,
      backgroundColor: alpha(primary, 0.35),
      borderColor: primary,
      borderWidth: 1,
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 24,
    }],
  }), [series, primary]);

  const options: ChartOptions<"bar"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false }, // ← 문자열이 아니라 리터럴 타입으로 인식
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: label } },
      y: {
        beginAtZero: true,
        ticks: { color: label, stepSize: 50 }, 
        grid: { color: grid },
      },
    },
  }), [label, grid]);

  return (
    <div style={{ height: 220 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
