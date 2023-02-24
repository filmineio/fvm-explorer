import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useEffect } from "react";

import { SearchFeedback } from "@/ui/components/SearchFeedback";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { EventPresenter } from "@/ui/modules/SelectedEntity/components/TransactionPage/components/EventPresenter";

import { useQuery } from "@/ui/external/data";

import { Event } from "@/types/data/Event";


export const TransactionEvents = ({
  cid,
  network,
  eventsRoot,
}: {
  cid: string;
  eventsRoot: string;
  network: Network;
}) => {
  const { get, loading, error, data } = useQuery<Event>();

  useEffect(() => {
    get(Entity.Event, {
      network,
      pagination: { limit: 100, offset: 0 },
      order: ["order", "ASC"],
      query: { messageCid: { is: cid }, eventsRoot: { is: eventsRoot } },
    });
  }, []);

  if (loading)
    return (
      <div className="flex flex-col text-label">
        <Spinner />
      </div>
    );

  if (error || data.length === 0)
    return (
      <div className="flex flex-col">
        <SearchFeedback kind={Entity.Event} error={!!error} />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full ">
          <div className="overflow-hidden">
            <div
              className={
                "bg-body border-0 rounded-l-lg uppercase text-left border-0 t text-sm font-bold text-white px-6 py-5 flex justify-between"
              }
            >
              <div className={"flex-1"}>Event</div>
              <div className={"text-center w-96"}>Actor ID</div>
              <div className={"flex-1 text-right"}>Entries</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        {data.map((r) => (
          <EventPresenter key={r.order} event={r} />
        ))}
      </div>
    </div>
  );
};