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
        "bg-body_opacity-50 text-left text-14  text-white tracking-wider font-light leading-normal  whitespace-nowrap rounded"
      }
    >
      <div className={"flex px-6 py-6"}>
        <div className={"flex-1"}>Event {event.order}</div>
        <div className={"text-center w-96"}>t0{event.emitter}</div>
        <div
          className={"flex-1 text-14 leading-4 font-bold text-right text-blue-400 cursor-pointer"}
          onClick={toggle}
        >
          {visible ? "Hide Entries" : "Show Entries"}
        </div>
      </div>
      {visible && (
        <div className="px-6 py-12 rounded-br-lg mb-2.5 -mt-5 rounded-4 shadow-lg bg-body_opacity-50">
          <div className="border border-body mb-4"></div>
          <p className="text-left text-18	font-bold leading-compact	mb-3 text-white">
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