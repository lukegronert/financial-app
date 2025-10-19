const getTimeData = async (instrumentSymbol, timeRange) => {
  let timeSeries;
  if (timeRange === "1d" || timeRange === "5d") {
    timeSeries = "TIME_SERIES_INTRADAY";
  } else if (timeRange === "30d") {
    timeSeries = "TIME_SERIES_WEEKLY";
  } else if (
    timeRange === "90d" ||
    timeRange === "6m" ||
    timeRange === "1y" ||
    timeRange === "All"
  ) {
    timeSeries = "TIME_SERIES_MONTHLY";
  }
  let interval = "";
  if (timeRange === "1d" || timeRange === "5d") {
    interval = "&interval=30min";
  }
  const response = await fetch(
    `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${instrumentSymbol}${interval}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
  );
  console.log(response.json());
  return response.json();
};

const getNewsData = async (instrumentSymbol) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${instrumentSymbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
  );
  return response.json();
};

const getGainersData = async () => {
  const response = await fetch(
    `https://financialmodelingprep.com/stable/biggest-gainers?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
  );
  return response.json();
};

const getLosersData = async () => {
  const response = await fetch(
    `https://financialmodelingprep.com/stable/biggest-losers?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY}`
  );
  return response.json();
};

export { getTimeData, getNewsData, getGainersData, getLosersData };
