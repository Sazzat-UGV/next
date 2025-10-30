import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Month mapping
const reverseMonthMap: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

// Chart config (only views)
const chartConfig = {
  views: { label: "Views", color: "#8979FF" },
} satisfies ChartConfig;

type Point = { date: number; views: number };

interface CharProps {
  analytics: any[];
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: any;
}

export function ChartAreaOverView2({ analytics, className, type }: CharProps) {
  const [chartData, setChartData] = React.useState<Point[]>([]);
  const chartType: "monthly" | "yearly" = type?.type ?? "monthly";
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  React.useEffect(() => {
    if (!analytics || analytics.length === 0) return;

    let month = currentMonth;
    let year = currentYear;

    if (type?.month && typeof type.month === "string") {
      const found = Object.entries(reverseMonthMap).find(
        ([_, name]) => name === type.month
      );
      if (found) month = Number(found[0]);
    }

    if (type?.year) {
      year = type.year;
    }

    let combined: Point[] = [];

    if (chartType === "yearly") {
      combined = analytics.map((entry: any, i: number) => {
        const date = new Date(year, i, 1).getTime();
        return {
          date,
          views: Number(entry.total_watch ?? 0),
        };
      });
    } else {
      combined = analytics.map((entry: any) => {
        const date = new Date(year, month - 1, entry.day).getTime();
        return {
          date,
          views: Number(entry.total_watch ?? 0),
        };
      });
    }

    const validData = combined
      .filter((point) => !isNaN(point.date))
      .sort((a, b) => a.date - b.date);

    setChartData(validData);
  }, [analytics, chartType, type, currentMonth, currentYear]);

  const formatTick = (ts: number) => {
    const d = new Date(ts);
    if (isNaN(d.getTime())) return "Invalid";
    return chartType === "yearly"
      ? reverseMonthMap[d.getMonth() + 1] || "?"
      : d.getDate().toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !label || isNaN(label)) return null;
    const d = new Date(label);
    const formattedLabel =
      chartType === "yearly"
        ? `${reverseMonthMap[d.getMonth() + 1]} ${d.getFullYear()}`
        : `${d.getDate()} ${
            reverseMonthMap[d.getMonth() + 1]
          } ${d.getFullYear()}`;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
        <div className="font-medium">{formattedLabel}</div>
        <div className="text-gray-700">
          Views: <span className="font-semibold">{payload[0]?.value}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card className={cn("p-0 shadow-none border-[1px] mt-2", className)}>
        <CardContent className="p-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full pb-4"
          >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillviews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-views)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-views)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                type="number"
                scale="time"
                domain={
                  chartType === "yearly"
                    ? [
                        new Date(currentYear, 0, 1).getTime(),
                        new Date(currentYear, 11, 31).getTime(),
                      ]
                    : ["auto", "auto"]
                }
                tickMargin={8}
                minTickGap={32}
                tickLine={false}
                axisLine={false}
                interval={0}
                tickFormatter={formatTick}
                padding={{ left: 10, right: 10 }}
                allowDuplicatedCategory={false}
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Area
                dataKey="views"
                type="natural"
                fill="url(#fillviews)"
                stroke="var(--color-views)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
