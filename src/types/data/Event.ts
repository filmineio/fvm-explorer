export type Entry = {
  Flags: number;
  Key: string;
  Value: string;
};

export type Event = {
  messageCid: string;
  eventsRoot: string;
  emitter: number;
  entries: Entry[];
  order: number;
};
