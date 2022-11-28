import { formatLocalPercentage } from "../../utils/formatDataFunctions";

test("Takes in 0.25 and returns 25.00%", () => {
  expect(formatLocalPercentage(0.25)).toBe("25.00%");
});

test("Takes in -0.9999 and returns -99.99%", () => {
  expect(formatLocalPercentage(-0.9999)).toBe("-99.99%");
});

test("Takes in 1.56666 and returns 156.67%", () => {
  expect(formatLocalPercentage(1.56666)).toBe("156.67%");
});

test("Takes in 1 and returns 100.00%", () => {
  expect(formatLocalPercentage(1)).toBe("100.00%");
});

test("Takes in 0.00009 and returns 0.01%", () => {
  expect(formatLocalPercentage(0.00009)).toBe("0.01%");
});

test("Takes in -0.00017 and returns -0.002%", () => {
  expect(formatLocalPercentage(-0.00017)).toBe("-0.02%");
});
