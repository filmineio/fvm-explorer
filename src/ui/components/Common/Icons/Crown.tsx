import React, {FC} from "react";

const Crown: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#F0A108"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7l2 13h14l2-13-5 3-4-6-4 6-5-3z"
      />
      <circle
        cx="12"
        cy="14"
        r="2"
        stroke="#F0A108"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default Crown;
