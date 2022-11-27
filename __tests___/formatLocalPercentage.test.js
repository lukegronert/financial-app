const formatLocalPercentage = (value) => {
  return value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

test("Takes in 0.25 and returns 25.00%", () => {
  expect(formatLocalPercentage(0.25)).toBe("25.00%");
});

test("Takes in -0.9999 and returns -99.99%", () => {
  expect(formatLocalPercentage(-0.9999)).toBe("-99.99%");
});

test("Takes in 1.56666 and returns 156.67%", () => {
  expect(formatLocalPercentage(1.56666)).toBe("156.67%");
});
