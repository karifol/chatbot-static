import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from "chart.js";

// ここで必要なコンポーネントを全部 register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, // Pie/Donut 用
  Title,
  Tooltip,
  Legend
);

interface ChartMessageProps {
  chart: {
    chartType: "bar" | "line" | "pie";
    data: any;
    options: any;
  };
}

const ChartMessage = ({ chart }: ChartMessageProps | { chart: string | object }) => {
  const chartData = typeof chart === "string" ? JSON.parse(chart) : chart;
  if (!chartData || !chartData.chartType || !chartData.data) {
    return <div>Invalid chart data</div>;
  }
  switch (chartData.chartType) {
    case "bar":
      return <Bar data={chartData.data} options={chartData.options} />;
    case "line":
      return <Line data={chartData.data} options={chartData.options} />;
    case "pie":
      return <Pie data={chartData.data} options={chartData.options} />;
    default:
      return null;
  }
}

export default ChartMessage