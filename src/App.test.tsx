import { balanced } from "./App";

describe("Example test cases", () => {
  test("Should work on provided examples", () => {
    expect(balanced("a")).toBeTruthy();
    expect(balanced("ab")).toBeTruthy();
    expect(balanced("abc")).toBeTruthy();
    expect(balanced("abcb")).toBeFalsy();
    expect(balanced("Aaa")).toBeFalsy();
    expect(balanced("abcb*")).toBeFalsy();
    expect(balanced("abcb**")).toBeTruthy();
    expect(balanced("***********")).toBeTruthy();
    expect(balanced("")).toBeTruthy();
    expect(balanced("abbc****")).toBeTruthy();
  });
});
