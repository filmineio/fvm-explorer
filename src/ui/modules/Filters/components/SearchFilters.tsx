import Input from "@/ui/components/Input/Input";

import { FilterState } from "@/ui/state/types/AppState";

export const SearchFilters = ({
  handleChange,
  state,
  onClick,
}: {
  handleChange: (v: string) => void;
  state: FilterState;
  onClick: () => void;
}) => {
  return (
    <div className="flex justify-between gap-5 p-5">
      <div className="flex items-center flex-1 justify-center bg-gray-dark rounded-lg">
        <div className="input-group relative flex md:flex-wrap gap-4 items-stretch w-full rounded py-2 px-3">
          <Input
            className="xl:w-96 form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-medium font-mono1 text-white bg-gray-dark rounded transition ease-in-out m-0 focus:text-white focus:border-0 focus:outline-none outline-none"
            placeholder="Search"
            handleChange={handleChange}
            value={state.filterValue}
          />
        </div>
      </div>
      <button
        className="w-40 border-2 border-yellow text-yellow uppercase rounded mx-3 my-0.5"
        onClick={onClick}
      >
        SEARCH
      </button>
    </div>
  );
};