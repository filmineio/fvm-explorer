import { transformer } from "@/ui/state/utils/transformer";

import { cb } from "@/utils/cb";

export const setDataReceivedFromServer = cb(
  transformer("data", "receivedServerData"),
  Date.now()
);