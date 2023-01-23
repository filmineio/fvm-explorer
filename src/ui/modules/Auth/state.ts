import { lensPath, set } from "ramda";

export type AuthPageState = {
  email: string;
  modalVisible: boolean;
  emailValid?: boolean;
};

export type AuthStateReducer = (
  s: AuthPageState,
  v: string | boolean
) => AuthPageState;

export const validateEmail = (v: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);

export const authPageReducer: AuthStateReducer = (s, v) => {
  switch (typeof v) {
    case "boolean":
      return set(lensPath(["modalVisible"]), v)(s);
    case "string":
      return set(
        lensPath(["emailValid"]),
        validateEmail(v)
      )(set(lensPath(["email"]), v)(s));
    default:
      return s;
  }
};
export const initialAuthPageState: AuthPageState = {
  email: "",
  modalVisible: false,
  emailValid: false,
};