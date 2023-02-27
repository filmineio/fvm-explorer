import classNames from "classnames";
import React, { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div
      className={classNames(
        "modal fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-popupbg backdrop-blur-lg z-40 opacity-1"
      )}
    >
      <div
        className={classNames(
          "py-10 transition-all max-w-3xl h-screen container px-0 relative items-center justify-center flex"
        )}
      >
        <div className="relative flex flex-col mx-auto w-full rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;