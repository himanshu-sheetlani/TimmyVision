import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", uploads: 12 },
  { day: "Tue", uploads: 18 },
  { day: "Wed", uploads: 25 },
  { day: "Thu", uploads: 20 },
  { day: "Fri", uploads: 15 },
  { day: "Sat", uploads: 30 },
  { day: "Sun", uploads: 22 },
];

const chartConfig = {
  uploads: {
    label: "Uploads",
    color: "hsl(210, 100%, 60%)", // bright blue for dark theme
  },
};

export function UploadTrendBarChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} stroke="#2a2a2a" />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fill: "#aaa" }}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
          content={<ChartTooltipContent className="text-white" />}
        />
        <Bar dataKey="uploads" fill="hsl(210, 100%, 60%)" radius={6} />
      </BarChart>
    </ChartContainer>
  );
}
