import { CustomSelect } from "@/ui/components/Select/Select";

import { AdvancedFilterToggle } from "@/ui/modules/Filters/components/AdvancedFilterToggle";
import {
  availableFilters,
  availableNetworks,
} from "@/ui/modules/Filters/state/state";

import { FilterState } from "@/ui/state/types/AppState";

import { cb } from "@/utils/cb";


export const FiltersHeader = ({
  state,
  checked,
  toggle,
  search,
  showOnlyNetwork = false,
}: {
  state: FilterState;
  checked: boolean;
  toggle: (v: boolean) => void;
  search: (v: string) => void;
  showOnlyNetwork?: boolean;
}) => {
  if (showOnlyNetwork) {
    return (
      <div className="flex">
        <CustomSelect
          value={state.network}
          onChange={search}
          values={availableNetworks}
          selectType="transparent"
        />
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-space text-28 font-bold leading-compact text-white">
        Filecoin contracts explorer
      </h1>
      <div className="flex flex-1 justify-end items-center flex-wrap gap-5">
        <div className="flex gap-3 mr-5 items-center">
          <span className="inline-block text-label form-check-label text-14 font-medium">
            search in
          </span>
          <div className="w-36">
            <CustomSelect
              value={state.filteredBy}
              onChange={search}
              values={availableFilters}
              selectType="transparent"
            />
          </div>
        </div>
        <AdvancedFilterToggle
          checked={checked}
          toggle={cb(toggle, !checked)}
          label="advanced search"
        />
      </div>
    </div>
  );
};