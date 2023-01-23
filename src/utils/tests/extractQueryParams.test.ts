import { extractQueryParams } from "../extractQueryParams";

test("extractQueryParams should handle empty values", () => {
  // @ts-ignore
  expect(extractQueryParams(undefined)).toEqual({});
  expect(extractQueryParams("")).toEqual({});
});

test("extractQueryParams should handle value conversion", () => {
  const mockSearchString =
    "?param=1&param2=ok&param3=test,test&param4=null&param5";
  expect(extractQueryParams(mockSearchString)).toEqual({
    param: 1,
    param2: "ok",
    param3: ["test", "test"],
    param4: null,
  });
});

test("extractQueryParams should handle dry run", () => {
  const mockSearchString =
    "?param=1&param2=ok&param3=test,test&param4=null&param5";
  expect(extractQueryParams(mockSearchString, true)).toEqual({
    param: "1",
    param2: "ok",
    param3: "test,test",
    param4: "null",
  });
});
