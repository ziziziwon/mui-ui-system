import { Doughnut } from "react-chartjs-2";
import "../charts/register";

export default function Donut() {
  const data = {
    labels: ["Sale","Distribute","Return"],
    datasets: [{ data: [80,12,8], backgroundColor: ["#4f46e5","#f59e0b","#ef4444"], borderWidth: 0 }]
  };
  const options = { plugins: { legend: { display: false }}, cutout: "70%" } as any;
  return (
    <div className="relative h-64 grid place-items-center">
      <div className="w-48 h-48"><Doughnut data={data} options={options} /></div>
      <div className="absolute text-center">
        <div className="text-3xl font-extrabold">80%</div>
        <div className="text-gray-500 text-sm">Transactions</div>
      </div>
      <div className="absolute bottom-2 flex gap-3 text-xs text-gray-600">
        <LegendDot color="#4f46e5" label="Sale" />
        <LegendDot color="#f59e0b" label="Distribute" />
        <LegendDot color="#ef4444" label="Return" />
      </div>
    </div>
  );
}
function LegendDot({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{background:color}} />{label}</span>;
}
