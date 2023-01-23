export const FilterActionButton = (props: { onClick: () => void }) => {
  return (
    <button
      className="flex items-center justify-center w-8 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
      onClick={props.onClick}
    >
      <svg
        className="absolute text-white h-6 w-6 mt-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};
