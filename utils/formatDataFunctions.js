const formatLocalUSD = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const formatLocalPercentage = (value) => {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

export { formatLocalUSD, formatLocalPercentage };
