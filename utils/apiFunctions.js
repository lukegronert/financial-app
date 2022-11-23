const getData = async (instrumentSymbol, interval ) => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${instrumentSymbol}&interval=${interval}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
    );
    console.log(response)
    return response.json();
  };

export {
    getData
}