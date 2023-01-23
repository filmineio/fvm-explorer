import { formatTime } from "../formatTime";

describe("formatTime", () => {
  it('should return "N/A" for invalid dates', () => {
    expect(formatTime("invalid")).toEqual("N/A");
  });

  it('should return "Not Available" for undefined dates', () => {
    expect(formatTime(undefined)).toEqual("Not Available");
  });

  it("should correctly format valid dates", () => {
    expect(formatTime("2022-12-21T00:00:00")).toEqual("Dec 21, 22, 12:00 AM");
  });

  it("should handle dates with timezones", () => {
    expect(formatTime("2022-12-21T00:00:00-06:00")).toEqual(
      "Dec 21, 22, 07:00 AM"
    );
    expect(formatTime("2022-12-21T00:00:00+01:00")).toEqual(
      "Dec 21, 22, 12:00 AM"
    );
  });

  it("should handle dates with seconds", () => {
    expect(formatTime("2022-12-21T00:00:30")).toEqual("Dec 21, 22, 12:00 AM");
  });

  it("should handle dates with milliseconds", () => {
    expect(formatTime("2022-12-21T00:00:00.000")).toEqual(
      "Dec 21, 22, 12:00 AM"
    );
  });
});
