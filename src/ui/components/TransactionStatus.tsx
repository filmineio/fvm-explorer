import classNames from "classnames";
import { useMemo } from "react";

export const TransactionStatus = (props: { exitCode: number }) => {
  const exitCode = useMemo(() => +props.exitCode, [props.exitCode]);

  return (
    <div
      className={classNames(
        "font-bold text-xs leading-4 font-space flex items-center gap-1.5",
        {
          "text-yellow": exitCode === 0,
          "text-red-400 ": exitCode !== 0,
        }
      )}
    >
      <div
        className={classNames("w-2.5 h-2.5 rounded-base", {
          "bg-yellow": exitCode === 0,
          "bg-red-400": exitCode !== 0,
        })}
      />
      {exitCode === 0 ? "successful" : "reverted"}
    </div>
  );
};