import classNames from "classnames";
import Link from "next/link";

import { MyDataKind } from "@/ui/components/MyDataWrapper/MyDataWrapper";

export const MyDataSidebar = ({ kind }: { kind: MyDataKind }) => {
  return (
    <div className="border-r-2 w-[70px] fixed top-0 z-20 left-0 h-full border-gray-dark">
      <div className="logo py-3 px-5  border-gray-dark">
        <img src="/images/Vector.png" alt={"logo"} />
      </div>
      <div className="menu">
        <ul>
          <li
            className={classNames("p-3.5 cursor-pointer", {
              "border-l border-l-4 border-yellow": kind === MyDataKind.Projects,
            })}
          >
            <Link
              href="/me/projects"
              className=" block relative allmenu p-2 bg-gray-dark rounded-lg"
            >
              <svg
                width="26"
                height="22"
                viewBox="0 0 26 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 3C1.75 1.89543 2.64543 1 3.75 1H9.42963C10.0983 1 10.7228 1.3342 11.0937 1.8906L12.4063 3.8594C12.7772 4.4158 13.4017 4.75 14.0704 4.75H22.25C23.3546 4.75 24.25 5.64543 24.25 6.75V19C24.25 20.1046 23.3546 21 22.25 21H3.75C2.64543 21 1.75 20.1046 1.75 19V3Z"
                  fill={kind == MyDataKind.Projects ? "#D5FF64" : "#596184"}
                  stroke={kind == MyDataKind.Projects ? "#D5FF64" : "#596184"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </Link>
          </li>
          <li
            className={classNames("p-3.5 cursor-pointer", {
              "border-l border-l-4 border-yellow": kind === MyDataKind.Queries,
            })}
          >
            <Link
              href="/me/queries"
              className=" block relative allmenu p-2 bg-gray-dark rounded-lg"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 8.75C26.25 11.5114 21.2132 13.75 15 13.75C8.7868 13.75 3.75 11.5114 3.75 8.75C3.75 5.98858 8.7868 3.75 15 3.75C21.2132 3.75 26.25 5.98858 26.25 8.75Z"
                  fill={kind == MyDataKind.Queries ? "#D5FF64" : "#596184"}
                />
                <path
                  d="M26.25 8.75C26.25 11.5114 21.2132 13.75 15 13.75C8.7868 13.75 3.75 11.5114 3.75 8.75M26.25 8.75C26.25 5.98858 21.2132 3.75 15 3.75C8.7868 3.75 3.75 5.98858 3.75 8.75M26.25 8.75V13.75M3.75 8.75V15M3.75 15V21.25C3.75 23.6295 7.49003 25.6208 12.5 26.1261M3.75 15C3.75 17.3795 7.49003 19.3708 12.5 19.8761"
                  stroke={kind == MyDataKind.Queries ? "#D5FF64" : "#596184"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.9686 24.9686C24.1769 25.7603 23.0831 26.25 21.875 26.25C19.4588 26.25 17.5 24.2912 17.5 21.875C17.5 19.4588 19.4588 17.5 21.875 17.5C24.2912 17.5 26.25 19.4588 26.25 21.875C26.25 23.0831 25.7603 24.1769 24.9686 24.9686ZM24.9686 24.9686L27.5 27.5"
                  stroke={kind == MyDataKind.Queries ? "#D5FF64" : "#596184"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};