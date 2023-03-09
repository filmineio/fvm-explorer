import classNames from "classnames";
import React, { FC, ReactNode, useEffect } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ children }) => {

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  })

  return (
    <div className="modal fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-popupbg backdrop-blur-lg z-40 opacity-1 flex">
      <div className="transition-all container px-0 relative my-auto">
        <div className="relative flex flex-col max-w-3xl mx-auto w-full rounded-lg py-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;