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

// Define month mapping
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

// Chart configuration
const chartConfig = {
  like: { label: "Likes", color: "#8979FF" },
  views: { label: "Views", color: "#8979FF" },
  dislike: { label: "Dislikes", color: "#8979FF" },
} satisfies ChartConfig;

type Point = { date: number; views: number; like: number; dislike: number };

const monthMap: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function buildTimestamp(
  unit: number,
  chartType: "monthly" | "yearly",
  month: number,
  year: number
): number {
  if (chartType === "monthly") {
    return new Date(year, month - 1, unit).getTime(); // daily
  }
  return new Date(year, unit - 1, 1).getTime(); // monthly
}

interface CharProps {
  analytics: {
    views: any[];
    likes: any[];
    dislikes: any[];
  };
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: any;
}

export function ChartAreaOverView({
  children,
  analytics,
  isActive = true,
  className,
  type,
}: CharProps) {
  const [status, setStatus] = React.useState<"Views" | "Likes" | "Dislikes">(
    "Views"
  );
  const [chartData, setChartData] = React.useState<Point[]>([]);

  const chartType: "monthly" | "yearly" | "custom" = type?.type ?? "monthly";
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  React.useEffect(() => {
    if (!analytics) return;

    let combined: Point[] = [];
    let month = currentMonth;
    let year = currentYear;

    if (chartType === "custom") {
      month = monthMap[type?.month] ?? currentMonth;
      year = type?.year ?? currentYear;
    }

    if (chartType === "yearly") {
      combined = Array.from({ length: 12 }, (_, i) => {
        const monthIndex = i + 1;
        const viewMatch = analytics.views?.find(
          (v) => monthMap[v.month] === monthIndex
        );
        const likeMatch = analytics.likes?.find(
          (l) => monthMap[l.month] === monthIndex
        );
        const dislikeMatch = analytics.dislikes?.find(
          (d) => monthMap[d.month] === monthIndex
        );

        return {
          date: buildTimestamp(monthIndex, "yearly", month, year),
          views: Number(viewMatch?.total_watch ?? 0),
          like: Number(likeMatch?.total_liked ?? likeMatch?.total_likes ?? 0),
          dislike: Number(dislikeMatch?.total_dislikes ?? 0),
        };
      });
    } else {
      combined = (analytics?.views ?? []).map((v) => {
        const day = v?.day;
        const likeMatch = analytics?.likes?.find((l) => l.day === day);
        const dislikeMatch = analytics?.dislikes?.find((d) => d.day === day);

        return {
          date: buildTimestamp(day, "monthly", month, year),
          views: Number(v?.total_watch ?? 0),
          like: Number(likeMatch?.total_liked ?? likeMatch?.total_likes ?? 0),
          dislike: Number(dislikeMatch?.total_dislikes ?? 0),
        };
      });
    }

    combined = combined
      .filter((point) => !isNaN(point.date))
      .map((point) => ({
        ...point,
        views: point.views || 0,
        like: point.like || 0,
        dislike: point.dislike || 0,
      }));

    combined.sort((a, b) => a.date - b.date);
    setChartData(combined);
  }, [analytics, chartType, type, currentMonth, currentYear]);

  const activeKey =
    status === "Views" ? "views" : status === "Likes" ? "like" : "dislike";

  const formatTick = (ts: number) => {
    if (!ts || isNaN(ts)) return "Invalid";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return "Invalid";
    return chartType === "yearly"
      ? reverseMonthMap[d.getMonth() + 1] || "Invalid"
      : `${d.getDate()}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0 || !label || isNaN(label))
      return null;

    const value = payload[0]?.value ?? 0;
    const d = new Date(label);
    const formattedLabel =
      chartType === "yearly"
        ? `${reverseMonthMap[d.getMonth() + 1]}`
        : `${d.getDate()} ${reverseMonthMap[d.getMonth() + 1]}`;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
        <div className="font-medium">{formattedLabel}</div>
        <div className="text-gray-700">
          {status}: <span className="font-semibold">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isActive && (
        <>
          <h1 className="text-center text-base  lg:text-2xl font-semibold my-6 lg:my-10">
            Overall statistics of your channel
          </h1>

          <div className="flex justify-between border-b border-gray-200">
            <div>
              {(["Views", "Likes", "Dislikes"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={cn(
                    "cursor-pointer px-6 py-2 text-sm font-medium text-[#333] border-b-2 border-transparent focus:outline-none",
                    status === item && "!border-reds"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            {children}
          </div>
        </>
      )}

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
                <linearGradient id="filllike" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-like)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-like)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
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
                <linearGradient id="filldislike" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-dislike)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-dislike)"
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

              {activeKey === "views" && (
                <Area
                  dataKey="views"
                  type="natural"
                  fill="url(#fillviews)"
                  stroke="var(--color-views)"
                  stackId="a"
                />
              )}
              {activeKey === "like" && (
                <Area
                  dataKey="like"
                  type="natural"
                  fill="url(#filllike)"
                  stroke="var(--color-like)"
                  stackId="a"
                />
              )}
              {activeKey === "dislike" && (
                <Area
                  dataKey="dislike"
                  type="natural"
                  fill="url(#filldislike)"
                  stroke="var(--color-dislike)"
                  stackId="a"
                />
              )}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
