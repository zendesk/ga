import * as parser from "../src/junit-test-result-parser";

describe("JUnit Test Result Parser", () => {
  it("should return input for now", () => {
    expect(parser.parse("input")).toEqual("input");
  });
});
