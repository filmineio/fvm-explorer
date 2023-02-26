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
      <div className="flex items-center flex-1 justify-center bg-slate rounded-4">
        <div className="input-group relative flex md:flex-wrap gap-4 items-stretch w-full rounded-4 border-none"> {/* border-2 border-transparent hover:border-label focus:border-yellow */}
          <Input
            className="xl:w-96 form-control relative flex-auto bg-slate block w-full px-5 py-4 text-14 font-medium font-roboto text-white transition ease-in-out m-0 rounded-4 outline-none border-2 border-body hover:border-label focus:border-label"
            placeholder="Search"
            handleChange={handleChange}
            value={state.filterValue}
          />
        </div>
      </div>
      <button
        className="border-2 border-blue-400 px-7 py-3.75 font-bold text-blue-400 uppercase rounded-4 ml-3"
        onClick={onClick}
      >
        SEARCH
      </button>
    </div>
  );
};