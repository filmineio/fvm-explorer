import { PAGE_SIZE } from "@/constants/pagination";

export const getZeroIndexOffset = (page = 1) => {
  return ((page > 0 ? page : 1) - 1) * PAGE_SIZE;
};