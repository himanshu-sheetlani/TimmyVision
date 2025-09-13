import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ✅ Dark theme colors (blue palette)
const chartData = [
  { type: "Text", count: 45, fill: "#60A5FA" }, // blue-400
  { type: "Image", count: 30, fill: "#2563EB" }, // blue-600
  { type: "Video", count: 25, fill: "#1E40AF" }, // blue-800
];

const chartConfig = {
  count: {
    label: "Analysis Count",
  },
  Text: {
    label: "Text",
    color: "#60A5FA",
  },
  Image: {
    label: "Image",
    color: "#2563EB",
  },
  Video: {
    label: "Video",
    color: "#1E40AF",
  },
};

function AnalysisDistributionPie() {
  return (
    <Card className="flex flex-col bg-transparent  text-white border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Analysis Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-white mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            {/* ✅ Tooltip styled for dark mode */}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="!bg-zinc-900 !border-zinc-700 !text-white"
                />
              }
            />
            <Pie data={chartData} dataKey="count" label nameKey="type" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-blue-400">
          Trending up by 12.5% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-zinc-500 leading-none">
          Showing total analyses by format
        </div>
      </CardFooter>
    </Card>
  );
}

export default AnalysisDistributionPie;
