import classNames from "classnames";
import { useMemo } from "react";

export const TransactionStatus = (props: { exitCode: number }) => {
  const exitCode = useMemo(() => +props.exitCode, [props.exitCode]);

  return (
    <div
      className={classNames(
        "flex items-center gap-1.5 font-roboto text-xs font-bold leading-compact mt-1.5",
        {
          "text-blue-400": exitCode === 0,
          "text-label": exitCode !== 0,
        }
      )}
    >
      {exitCode === 0 ? "successful" : "reverted"}
    </div>
  );
};