import classNames from "classnames";
import { range } from "ramda";
import { useMemo } from "react";

import { cb } from "@/utils/cb";

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
  const pages = useMemo(() => {
    if (totalPages > 10) {
      return totalPages - page < 10
        ? range(totalPages - 10, totalPages)
        : page === 1
        ? range(page, page + 10)
        : range(page - 1, page + 9);
    }

    return range(1, totalPages);
  }, [totalPages, page]);

  if (totalPages < 2) {
    return <></>;
  }

  return (
    <div className="py-7 space-y-5">
      <div className="flex justify-end">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li
              className="m-1 page-item cursor-pointer"
              onClick={cb(paginate, page - 1)}
            >
              <span
                className="page-link background-color: transparent;
            relative block py-1.5 px-3 border-0  outline-none transition-all duration-300 rounded text-white hover:text-white  focus:shadow-none"
                aria-label="Next"
              >
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
            {pages.map((p) => (
              <li
                className=" m-1 page-item cursor-pointer"
                key={p}
                onClick={cb(paginate, p)}
              >
                <span
                  className={classNames(
                    "page-link relative block py-1.5 px-3 border-0  outline-none transition-all duration-300 rounded text-white hover:text-white  focus:shadow-none",
                    {
                      "bg-lightgray": page === p,
                      "bg-gray-dark": p !== p,
                    }
                  )}
                >
                  {p}
                </span>
              </li>
            ))}

            <li
              className="m-1 page-item cursor-pointer"
              onClick={cb(paginate, page + 1)}
            >
              <span
                className="page-link background-color: transparent;
              relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300  text-white hover:text-white  focus:shadow-none"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={"text-lightgray w-full text-right transform -translate-y-6"}
      >
        of <span className={"text-yellow"}>{totalPages}</span> pages
      </div>
    </div>
  );
};