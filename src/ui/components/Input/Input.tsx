import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { onChange } from "@/utils/unpack";

type InputProps = {
  label?: string;
  icon?: JSX.Element;
  placeholder?: string;
  value?: string;
  handleChange: (e: string) => void;
  valid?: boolean;
  iconPosition?: "left" | "right";
};

const Input = ({
  label,
  icon,
  placeholder,
  value,
  handleChange,
  valid,
  className,
  iconPosition = "left",
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  InputProps) => {
  return (
    <div {...rest} className={"w-full"}>
      {label && (
        <label className="block mb-2 text-white uppercase">{label}</label>
      )}
      <div className="relative w-full">
        {!!icon && (
          <div
            className={classNames(
              `absolute inset-y-0 flex items-center pl-3 pointer-events-none h-10 top-1.5`,
              {
                "right-5": iconPosition === "right",
                "left-0": iconPosition === "left",
              }
            )}
          >
            {icon}
          </div>
        )}
        <input
          type="text"
          className={classNames({
            [className || ""]: !!className,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange(handleChange)}
        />
      </div>
    </div>
  );
};

export default Input;