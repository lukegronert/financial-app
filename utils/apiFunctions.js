const getData = async (instrumentSymbol, timeSeries ) => {
  let interval = '';
  if(timeSeries === 'TIME_SERIES_INTRADAY') {
    interval = '&interval=30min'
  }
    const response = await fetch(
      `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${instrumentSymbol}${interval}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
    );
    console.log(response)
    return response.json();
  };

export {
    getData
}