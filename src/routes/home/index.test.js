import { toTitleCase, isValidInput } from "./index";

describe("Home Module Tests", () => {
  let actual;
  let expected;

  describe("toTitleCase", () => {
    test("it converts text to upper case", () => {
      actual = toTitleCase("nAmaSte");
      expected = "Namaste";
      expect(actual).toEqual(expected);
    });
  });

  describe("isValidInput", () => {
    test("it returns true for non-empty input", () => {
      actual = isValidInput("hello");
      expected = true;
      expect(actual).toEqual(expected);
    });

    test("it returns false for empty input", () => {
      actual = isValidInput("");
      expected = false;
      expect(actual).toEqual(expected);
    });

    test("it returns false for null input", () => {
      actual = isValidInput(null);
      expected = false;
      expect(actual).toEqual(expected);
    });

    test("it returns false for undefined input", () => {
      actual = isValidInput(undefined);
      expected = false;
      expect(actual).toEqual(expected);
    });
  });
});
