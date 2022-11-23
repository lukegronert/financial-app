const formatLocalUSD = (value) => {
  // using undefined formats the number using the browser's locale settings
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  // a user in Germany will see 25,95 $
  // while a user in the US will see $25.95
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

const formatLocalPercentage = (value) => {
  return value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

export {
    formatLocalUSD,
    formatLocalPercentage
}
