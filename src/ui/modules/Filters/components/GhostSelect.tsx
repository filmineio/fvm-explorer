import { onChange } from "@/utils/unpack";

export type GhostSelectT = <T extends string = string>(props: {
  value: T;
  values: { value: T; label: string }[];
  onChange: (v: string) => void;
}) => JSX.Element;

export const GhostSelect: GhostSelectT = ({
  value,
  values,
  onChange: change,
}) => {
  return (
    <select
      className="text-yellow font-roboto select-text border-none focus:outline-none focus:border-none bg-inherit  caret-yellow text-sm	font-semibold tracking-wide	cursor-pointer"
      value={value}
      onChange={onChange(change)}
    >
      {values.map((v) => (
        <option className="text-slate" key={v.value} value={v.value}>
          {v.label}
        </option>
      ))}
    </select>
  );
};