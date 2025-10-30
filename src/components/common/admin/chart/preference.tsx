"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export default function PreferenceChart({ item }: any) {
  const chartData = item?.map((data: any) => ({
    day: data?.day?.toString(),
    videos: data?.total_videos,
  }));

  const chartConfig = {
    videos: {
      label: "Videos",
      color: "hsl(350 80% 70%)", // A shade of red/pink
    },
  };

  return (
    <div className="bg-white p-3 rounded-xl">
      <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[0, 1000]}
          />
          <Bar
            dataKey="videos"
            fill="var(--color-videos)"
            radius={[4, 4, 0, 0]}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
