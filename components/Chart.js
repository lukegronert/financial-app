import { AreaChart, Area, CartesianGrid, YAxis } from "recharts";

function Chart({ chartData }) {
  // Grab the lowest number and highest number from chartData
  const chartLow = Math.min(
    ...chartData.map((data) => Number(data["4. close"]))
  );
  const chartHigh = Math.max(
    ...chartData.map((data) => Number(data["4. close"]))
  );

  // Subtract 5% from chartLow and round up to the nearest 10
  const yAxisLow = Math.ceil((chartLow - chartLow / 20) / 10) * 10;
  // Add 5% to chartigh and round down to the nearest 10
  const yAxisHigh = Math.floor((chartHigh + chartLow / 20) / 10) * 10;

  return (
    <AreaChart
      width={730}
      height={250}
      data={chartData}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <YAxis dataKey="4. close" domain={[yAxisLow, yAxisHigh]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Area
        type="linear"
        dataKey="4. close"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
}

export default Chart;
