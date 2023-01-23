import { delay } from "../delay";

describe("delay", () => {
  it("should return a promise that resolves after the specified delay time", async () => {
    const startTime = Date.now();
    await delay(500);
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(500);
  });

  it("should use a default delay time of 300ms if none is provided", async () => {
    const startTime = Date.now();
    await delay();
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(300);
  });
});
