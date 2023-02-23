import classNames from "classnames";
import { max, min, range } from "ramda";
import { useMemo } from "react";

import { cb } from "@/utils/cb";
import ArrowChevronNext from "@/ui/components/Common/Icons/ArrowChevronNext";
import ArrowChevronPrevious from "@/ui/components/Common/Icons/ArrowChevronPrevious";

type PaginationProps = {
  paginate: (page: number) => void;
  page: number;
  pageSize: number;
  total: number;
};

export const Pagination = ({
  page,
  total,
  pageSize,
  paginate,
}: PaginationProps) => {
  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [pageSize, total]
  );

  const maxPages = 5;
  const maxPreviousPages = 2;

  const pages = useMemo(() => {
    if (totalPages > maxPages) {
      return totalPages - page < maxPages
        ? range(totalPages - maxPages, totalPages)
        : page <= maxPreviousPages
        ? range(1, maxPages + 1)
        : range(page - maxPreviousPages, page + maxPages - maxPreviousPages);
    }

    return range(1, totalPages);
  }, [totalPages, page]);

  if (totalPages < 2) {
    return <></>;
  }

  return (
    <div className="my-14">
      <div className="flex justify-end">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li
              className="flex mr-4 page-item cursor-pointer justify-center items-center"
              onClick={cb(paginate, max(page - 1, 1))}
            >
              <ArrowChevronPrevious/>
            </li>
            {pages.map((p) => (
              <li
                className="mx-1 page-item cursor-pointer"
                key={p}
                onClick={cb(paginate, p)}
              >
                {
                  page === p ?
                      <div className="page-link relative flex w-8 h-8 bg-blue-500 rounded-3 text-white text-pagination font-semibold justify-center items-center">
                        {p}
                      </div>:
                      <span className="page-link relative flex w-8 h-8 bg-transparent border-2 border-label rounded-3 text-white text-pagination font-semibold justify-center items-center hover:bg-body">
                        {p}
                      </span>
                }
              </li>
            ))}

            <li
              className="flex ml-4 page-item cursor-pointer justify-center items-center"
              onClick={cb(paginate, min(page + 1, totalPages))}
            >
              <ArrowChevronNext/>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};