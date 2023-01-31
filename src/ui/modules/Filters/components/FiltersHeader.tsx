import { AdvancedFilterToggle } from "@/ui/modules/Filters/components/AdvancedFilterToggle";
import { GhostSelect } from "@/ui/modules/Filters/components/GhostSelect";
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
}: {
  state: FilterState;
  checked: boolean;
  toggle: (v: boolean) => void;
  search: (v: string) => void;
}) => {
  return (
    <div className={"flex justify-between items-center"}>
      <h3 className="text-2xl font-bold leading-8 text-gray-light">
        Filecoin contracts explorer
      </h3>

      <div className={"flex flex-1 justify-end items-center flex-wrap gap-5"}>
        <div className={"flex uppercase gap-2 mr-10"}>
          <span
            className={
              "form-check-label inline-block text-gray-light uppercase  text-sm"
            }
          >
            Search in{" "}
          </span>{" "}
          <GhostSelect
            value={state.filteredBy}
            onChange={search}
            values={availableFilters}
          />
        </div>

        <div className={"flex uppercase gap-2"}>
          <span
            className={
              "form-check-label inline-block text-gray-light uppercase text-sm"
            }
          >
            NETWORK{" "}
          </span>{" "}
          <GhostSelect
            value={state.network}
            onChange={search}
            values={availableNetworks}
          />
        </div>
        {!checked ? (
          <div />
        ) : (
          <AdvancedFilterToggle
            checked={checked}
            toggle={cb(toggle, !checked)}
            label={"Advanced Search"}
          />
        )}
      </div>
    </div>
  );
};