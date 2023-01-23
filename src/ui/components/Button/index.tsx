import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  colorScheme?: "primary" | "black" | "default";
  buttonType?: "outline" | "fill" | "no-border";
  size?: "xs" | "md" | "base";
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  isFullWidth?: boolean;
};

const Button = ({
  children,
  size = "base",
  colorScheme = "default",
  buttonType = "outline",
  rightIcon,
  leftIcon,
  isFullWidth,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames(``, {
        [className || ""]: !!className,
      })}
    >
      {leftIcon}
      <span
        className={classNames("font-medium", {
          "text-sm": size === "md",
          "text-xs": size === "xs",
        })}
      >
        {children}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
