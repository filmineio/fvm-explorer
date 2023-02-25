import { useMemo, useReducer } from "react";

import { EventEntryRow } from "@/ui/modules/SelectedEntity/components/TransactionPage/components/EventEntryRow";

import { Event } from "@/types/data/Event";

export const EventPresenter = ({ event }: { event: Event }) => {
  const [visible, toggle] = useReducer((p) => !p, false);

  const entries: Event["entries"] = useMemo(
    () => JSON.parse(event.entries as unknown as string),
    [event.entries]
  );

  return (
    <div
      className={
        "bg-slate text-left text-sm  text-white font-space tracking-wider font-light  whitespace-nowrap rounded"
      }
    >
      <div className={"flex px-6 py-6"}>
        <div className={"flex-1"}>Event {event.order}</div>
        <div className={"text-center w-96"}>t0{event.emitter}</div>
        <div
          className={"flex-1 text-right text-yellow cursor-pointer"}
          onClick={toggle}
        >
          {visible ? "Hide Entries" : "Show Entries"}
        </div>
      </div>
      {visible && (
        <div className="px-6 py-12 rounded-br-lg mb-2.5 -mt-5 rounded-bl-lg shadow-lg bg-slate">
          <div className="border border-body mb-4"></div>
          <p className="text-left text-lg	font-roboto font-bold leading-5	mb-3 text-white">
            Entries{" "}
          </p>
          <table className="min-w-full">
            <tbody>
              {entries.map((entry) => (
                <EventEntryRow
                  key={`${entry.Key}-${entry.Value}`}
                  entry={entry}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};