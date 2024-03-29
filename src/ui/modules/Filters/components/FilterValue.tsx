export const FilterValue = ({ value }: { value: string }) => {
  return (
    <div className="rounded-4 flex items-center mr-1 bg-body">
      <div className="px-2 py-1 text-14 font-space font-medium text-white w-fit max-w-[100px] truncate">
        {value}
      </div>

      <div className="p-2 w-fit select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear">
        <svg
          width="10"
          height="10"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5745 1L1 12.5745"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
          <path
            d="M1.00024 1L12.5747 12.5745"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
