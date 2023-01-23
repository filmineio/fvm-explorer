import { authPageReducer } from "./state";

describe("authPageReducer", () => {
  it("should return the initial state", () => {
    const initialState = { email: "", modalVisible: false, emailValid: true };
    // @ts-ignore
    expect(authPageReducer(initialState, undefined)).toEqual(initialState);
  });

  it("should handle boolean values", () => {
    const initialState = { email: "", modalVisible: false, emailValid: true };
    const expectedState = { email: "", modalVisible: true, emailValid: true };
    expect(authPageReducer(initialState, true)).toEqual(expectedState);
  });

  it("should handle string values", () => {
    const initialState = { email: "", modalVisible: false, emailValid: true };
    const expectedState = {
      email: "test@example.com",
      modalVisible: false,
      emailValid: true,
    };
    expect(authPageReducer(initialState, "test@example.com")).toEqual(
      expectedState
    );
  });

  it("should return the initial state for invalid values", () => {
    const initialState = { email: "", modalVisible: false, emailValid: true };
    // @ts-ignore
    expect(authPageReducer(initialState, {})).toEqual(initialState);
    // @ts-ignore
    expect(authPageReducer(initialState, 123)).toEqual(initialState);
  });

  it("should accumulate state changes over time", () => {
    const initialState = { email: "", modalVisible: false, emailValid: true };
    const intermediateState = authPageReducer(initialState, "test@exampl");
    const finalState = authPageReducer(intermediateState, true);
    expect(finalState).toEqual({
      email: "test@exampl",
      modalVisible: true,
      emailValid: false,
    });
  });
});
