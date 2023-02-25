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
            className="absolute right-1 -top-1.5 cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }}
          >
            <span className="text-yellow font-bold text-sm font-space z-10 bg-black p-2 rounded bg-slate">
              Copy
            </span>
          </div>
        </CopyToClipboard>
      )}
    </div>
  );
};