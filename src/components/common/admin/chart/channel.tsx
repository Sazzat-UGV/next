"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

type ChartData = {
  day: string
  count: number
}

type ChannelChartProps = {
  item: ChartData[]
}

export default function ChannelChart({ item }: ChannelChartProps) {
  const chartConfig = {
    channels: {
      label: "Channels",
      color: "#ffe2e2", // Light pink color
    },
  }

  const chartData = item?.length
    ? item.map((entry) => ({
        day: entry?.day || "Unknown",  // Ensure day is always a string
        channels: entry?.count || 0,  // Default count to 0
      }))
    : []

  return (
    <div className="bg-white p-3 rounded-xl">
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis domain={[0, 100]} tickCount={6} tickLine={false} axisLine={false} tickMargin={8} />
          <Area
            dataKey="channels"
            type="natural"
            fill="#ffe2e2" // Area fill color
            stroke="#ff7f7f" // A slightly darker pink for the stroke (optional)
            strokeWidth={2}
            dot={{
              fill: "#fff", // White dot
              stroke: "#ff7f7f", // Darker pink border for the dot
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              fill: "#fff",
              stroke: "#ff7f7f",
              strokeWidth: 2,
              r: 6,
            }}
          />
          <ChartLegend content={<ChartLegendContent />} className="-translate-y-2" />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
