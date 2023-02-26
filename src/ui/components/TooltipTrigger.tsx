import { useState } from "react";

import { cb } from "@/utils/cb";

export const TooltipTrigger = ({ tooltip }: { tooltip: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={"relative cursor-pointer"}
      onMouseEnter={cb(setVisible, true)}
      onMouseLeave={cb(setVisible, false)}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1C10.0506 1 11.0909 1.20693 12.0615 1.60896C13.0321 2.011 13.914 2.60028 14.6569 3.34315C15.3997 4.08601 15.989 4.96793 16.391 5.93853C16.7931 6.90914 17 7.94943 17 9C17 10.0506 16.7931 11.0909 16.391 12.0615C15.989 13.0321 15.3997 13.914 14.6569 14.6569C13.914 15.3997 13.0321 15.989 12.0615 16.391C11.0909 16.7931 10.0506 17 9 17C6.87827 17 4.84344 16.1571 3.34315 14.6569C1.84285 13.1566 1 11.1217 1 9C1 6.87827 1.84285 4.84344 3.34315 3.34315C4.84344 1.84285 6.87827 1 9 1V1Z"
          stroke="#59A9FF4d"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.88862 13.4443C8.88862 13.3829 8.93836 13.3332 8.99973 13.3332C9.06109 13.3332 9.11084 13.3829 9.11084 13.4443C9.11084 13.5057 9.06109 13.5554 8.99973 13.5554C8.93836 13.5554 8.88862 13.5057 8.88862 13.4443Z"
          fill="#59A9FF4d"
          stroke="#59A9FF4d"
          strokeWidth="2"
        />
        <path
          d="M6.3335 7.22209C6.3335 6.76754 6.44969 6.32053 6.67104 5.92351C6.89239 5.5265 7.21155 5.19266 7.59821 4.95368C7.98488 4.71471 8.42621 4.57855 8.8803 4.55812C9.33439 4.53768 9.78617 4.63367 10.1927 4.83695C10.5993 5.04023 10.9471 5.34406 11.2033 5.71959C11.4594 6.09513 11.6152 6.52989 11.6561 6.98261C11.6969 7.43532 11.6213 7.89095 11.4365 8.30624C11.2517 8.72153 10.9638 9.08269 10.6002 9.35542C9.95305 9.84164 9.44461 9.88875 9.00016 10.7776"
          stroke="#59A9FF4d"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {visible && (
        <div className="absolute bg-black text-[0.6rem] py-2 px-4 rounded-4 min-w-[21rem] transform-none text-line">
          {tooltip}
        </div>
      )}
    </div>
  );
};