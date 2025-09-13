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

// ✅ Detection result distribution data
const chartData = [
  { result: "Real", count: 40, fill: "#22C55E" }, // green-500
  { result: "Fake", count: 35, fill: "#EF4444" }, // red-500
  { result: "Processing", count: 25, fill: "#EAB308" }, // yellow-500
];

const chartConfig = {
  count: {
    label: "Detection Count",
  },
  Real: {
    label: "Real",
    color: "#22C55E",
  },
  Fake: {
    label: "Fake",
    color: "#EF4444",
  },
  Processing: {
    label: "Processing",
    color: "#EAB308",
  },
};

function DetectionResultsPie() {
  return (
    <Card className="flex flex-col bg-transparent border-none text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Detection Results</CardTitle>
        <CardDescription className="text-zinc-400">
          Breakdown of analysis outcomes
        </CardDescription>
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
            <Pie data={chartData} dataKey="count" label nameKey="result" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-green-400">
          Detection accuracy improving this week{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-zinc-500 leading-none">
          Showing distribution of results
        </div>
      </CardFooter>
    </Card>
  );
}

export default DetectionResultsPie;