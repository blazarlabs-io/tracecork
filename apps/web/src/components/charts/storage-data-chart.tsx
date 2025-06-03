"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import { StorageSensors } from "~/src/types/db";
import { Label } from "@repo/ui/components/ui/label";

const chartData = [{ date: "2024-04-01", humidity: 0, temperature: 0 }];
const chartConfig = {
  label: {
    label: "Date",
  },
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-1))",
  },
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-2))",
  },
  vibration: {
    label: "Vibration",
    color: "hsl(var(--chart-3))",
  },
  light: {
    label: "Light",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export type StorageDataChartProps = {
  data: any;
};

export const StorageDataChart = ({ data }: StorageDataChartProps) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("humidity");

  const [localChartData, setLocalChartData] = useState<StorageSensors[]>([]);

  function getTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const renameCreatedAtKey = (arr: any[]): StorageSensors[] => {
    return arr.map((item) => {
      let { created_at, ...rest } = item; // Destructure the object to get 'created_at' and the rest
      created_at = new Date(created_at);

      return { date: created_at, ...rest }; // Create a new object with 'date' instead of 'created_at'
    });
  };

  useEffect(() => {
    if (data) {
      // console.log(data);
      setLocalChartData(renameCreatedAtKey(data.data.splice(0, 200)));
    }
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Wine Storage</CardTitle>
          <CardDescription>
            Showing sensor data for the past 24 hours
          </CardDescription>
        </div>
        <div className="flex">
          {["humidity", "temperature", "light", "vibration"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={localChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid />
            <YAxis
              domain={[data.minValue[activeChart], data.maxValue[activeChart]]}
            />
            <XAxis
              dataKey="date"
              //   tickLine={false}
              //   axisLine={false}
              //   tickMargin={8}
              tickFormatter={(value: any) => {
                const date = new Date(value);
                const time = getTime(date);
                return `${time}`;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-[150px]" nameKey="views" />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
