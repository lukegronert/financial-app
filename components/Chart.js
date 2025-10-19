import {
  AreaChart,
  Area,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function Chart({ chartData, changePercentage, height, width, size }) {
  const chartDataValueArray = chartData.map((data) => data[1]).reverse();
  const chartValues = chartDataValueArray.map((item) =>
    Number(item["4. close"])
  );

  const chartLow = Math.min(...chartValues);
  const chartHigh = Math.max(...chartValues);

  const yAxisLow = Math.floor(chartLow + 1);
  const yAxisHigh = Math.ceil(chartHigh + 1);

  const color = changePercentage > 0 ? "#4ade80" : "#ef4444";

  return (
    <ResponsiveContainer height={height} width={width}>
      <AreaChart
        data={chartDataValueArray}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          {size !== "small" && (
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          )}
        </defs>
        {size !== "small" && (
          <>
            <YAxis domain={[yAxisLow, yAxisHigh]} />
            <CartesianGrid strokeDasharray="3 3" />
          </>
        )}
        <Area
          type="linear"
          dataKey="4. close"
          stroke={color}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Chart;
