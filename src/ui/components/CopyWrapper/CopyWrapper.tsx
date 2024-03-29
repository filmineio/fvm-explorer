import { PropsWithChildren, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import { cb } from "@/utils/cb";

export const CopyWrapper = ({
  data,
  children,
}: PropsWithChildren<{ data: string }>) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={cb(setVisible, true)}
      onMouseLeave={cb(setVisible, false)}
    >
      {children}

      {visible && (
        <CopyToClipboard
          text={data || ""}
          onCopy={cb(toast.info, "Copied to clipboard", {})}
        >
          <div
            className="absolute -right-3 -top-0.5 cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }}
          >
            <span className="bg-body text-blue-400 font-bold text-14 font-roboto z-10 p-2 rounded-4">
              Copy
            </span>
          </div>
        </CopyToClipboard>
      )}
    </div>
  );
};