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

test("Takes in 1.50 and returns $1.50", () => {
  expect(formatLocalUSD(1.5)).toBe("$1.50");
});

test("Takes in -25.9544 and returns -$25.95", () => {
  expect(formatLocalUSD(-25.9544)).toBe("-$25.95");
});

test("Takes in 0.9827358925 and return $0.98", () => {
  expect(formatLocalUSD(0.9827358925)).toBe("$0.98");
});

test("Takes in 1 and returns $1.00", () => {
  expect(formatLocalUSD(1)).toBe("$1.00");
});
