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
      className="bg-transparent font-roboto text-blue-400 text-sm font-normal leading-normal select-text outline-none cursor-pointer"
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