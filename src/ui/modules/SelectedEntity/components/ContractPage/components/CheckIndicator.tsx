export const CheckIndicator = ({
  state,
}: {
  state: "disabled" | "checked" | "none";
}) => {
  switch (state) {
    case "disabled":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_8270_18354)">
            <rect width="24" height="24" rx="4" fill="#292E42" />
            <path
              d="M8 12L11 15L16 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_8270_18354">
              <rect width="24" height="24" rx="4" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "checked":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_8270_18348)">
            <rect width="24" height="24" rx="4" fill="#59A9FF4d" />
            <g clipPath="url(#clip1_8270_18348)">
              <rect width="24" height="24" rx="4" fill="#0576F0" />
              <path
                d="M8 12L11 15L16 9"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_8270_18348">
              <rect width="24" height="24" rx="4" fill="white" />
            </clipPath>
            <clipPath id="clip1_8270_18348">
              <rect width="24" height="24" rx="4" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "none":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_8270_18348)">
            <rect width="24" height="24" rx="4" />
            <g clipPath="url(#clip1_8270_18348)">
              <rect
                width="24"
                height="24"
                rx="4"
                fill="#292E42"
                stroke={"#59A9FF"}
                strokeWidth={"2px"}
              />
            </g>
          </g>
        </svg>
      );
  }
};
