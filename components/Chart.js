import { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, YAxis } from "recharts";

function Chart({ chartData, plusMinus }) {
  const [chartDisplayData, setChartDisplayData] = useState({
    chartDataValueArray: null,
    yAxisHigh: null,
    yAxisLow: null
  })
  const [color, setColor] = useState(null);

  console.log('chartData', chartData);

  useEffect(() => {
    const reverseChartData = chartData.reverse();
    const chartDataValArray = reverseChartData.map((data) => data[1]);
    const chartValues = chartDataValArray.map((item) => Number(item['4. close']));

    const chartLow = Math.min(...chartValues);
    const chartHigh = Math.max(...chartValues);

    const yAxisLow = Math.floor(chartLow);
    const yAxisHigh = Math.ceil(chartHigh);

    setChartDisplayData({
      chartDataValueArray: chartDataValArray,
      yAxisHigh,
      yAxisLow,
    })
    if(plusMinus === '+') {
      setColor("#4ade80")
    } else {
      setColor("#ccc")
    }
  }, [chartData])

  return (
    <AreaChart
      width={screen.width}
      height={(screen.height/3)}
      data={chartDisplayData.chartDataValueArray}
      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <YAxis
        dataKey="4. close"
        domain={[chartDisplayData.yAxisLow, chartDisplayData.yAxisHigh]}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Area
        type="linear"
        dataKey="4. close"
        stroke={color}
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
}

export default Chart;
