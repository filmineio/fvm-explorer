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
    <div className="flex justify-between gap-5 py-5">
      <div className="flex items-center flex-1 justify-center bg-slate rounded-base">
        <div className="input-group relative flex md:flex-wrap gap-4 items-stretch w-full rounded">
          <Input
            className="xl:w-96 form-control relative flex-auto min-w-0 block w-full px-5 py-4 text-sm font-medium text-white bg-slate rounded-base transition ease-in-out m-0 focus:text-white focus:border-0 focus:outline-none outline-none"
            placeholder="Search"
            handleChange={handleChange}
            value={state.filterValue}
          />
        </div>
      </div>
      <button
        className="border-2 border-blue-400 px-6.5 py-3.75 font-bold text-blue-400 uppercase rounded-base ml-3"
        onClick={onClick}
      >
        SEARCH
      </button>
    </div>
  );
};