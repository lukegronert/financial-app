import { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, YAxis, ResponsiveContainer } from "recharts";

function Chart({ chartData, changePercentage, height, width, size }) {
  const [chartDisplayData, setChartDisplayData] = useState({
    chartDataValueArray: null,
    yAxisHigh: null,
    yAxisLow: null,
  });
  const [color, setColor] = useState(null);

  useEffect(() => {
    const chartDataValArray = chartData.map((data) => data[1]).reverse();
    const chartValues = chartDataValArray.map((item) =>
      Number(item["4. close"])
    );

    const chartLow = Math.min(...chartValues);
    const chartHigh = Math.max(...chartValues);

    const yAxisLow = Math.floor(chartLow);
    const yAxisHigh = Math.ceil(chartHigh);

    setChartDisplayData({
      chartDataValueArray: chartDataValArray,
      yAxisHigh,
      yAxisLow,
    });

    if (changePercentage > 0) {
      setColor("#4ade80");
    } else {
      setColor("#ef4444");
    }
  }, [chartData]);

  return (
    <ResponsiveContainer height={height} width={width}>
      <AreaChart
        data={chartDisplayData.chartDataValueArray}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          {size === 'small' ? (
            <></>
          )  : (
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>

          )}
        </defs>
        {size === "small" ? (
          <></>
        ) : (
          <>
            <YAxis
              dataKey="4. close"
              domain={[chartDisplayData.yAxisLow, chartDisplayData.yAxisHigh]}
            />
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
