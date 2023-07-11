import { multiply } from "../src/main";

test("should be multiply values", () => {
  const value = multiply(4);
  expect(value).toEqual(8);
});
