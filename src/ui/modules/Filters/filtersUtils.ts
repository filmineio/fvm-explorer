import { Router } from "next/router";
import { FilterState } from "@/ui/state/types/AppState";
import { Network } from "@/enums/Network";
import { Entity } from "@/enums/Entity";
import { isEnum } from "@/utils/isEnum";
import { updateRouteState } from "@/ui/utils/updateRouteState";
import { toHex } from "@/utils/hex";

export const getData =
  (push: Router["push"], filters: FilterState) =>
    (data?: number | Network | Entity) => {
      if (isEnum(Network, data)) return updateRouteState(push, { ...filters, network: data as Network });
      else if (isEnum(Entity, data))
        return updateRouteState(push, {
          ...filters,
          filteredBy: data as Entity,
        });

      const page = typeof data === "number" ? data : filters.page;

      updateRouteState(push, {
        ...filters,
        page,
        advancedFilter: filters.advancedFilter
          ? (toHex(JSON.stringify(filters.advancedFilter)) as never)
          : undefined,
      });
    };