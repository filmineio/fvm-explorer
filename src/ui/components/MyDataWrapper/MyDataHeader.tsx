import { MyDataKind } from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";
import { UserMenu } from "@/ui/components/UserMenu/UserMenu";

import { useStore } from "@/ui/state/Store";

import { Maybe } from "@/types/Maybe";
import LogoDevStorage from "@/ui/components/Common/Icons/LogoDevStorage";

export const MyDataHeader = ({
  kind,
  activeEntity,
}: {
  kind: MyDataKind;
  activeEntity: Maybe<string>;
}) => {
  const {
    state: { user },
  } = useStore();

  return (
    <div className="flex md:pr-10 z-10 top-0 left-0 right-0 border-b-2 border-body min-h-[80px]">
      <div className="z-10 flex items-center mr-10 w-[70px] justify-center border-r-2 border-body flex-shrink-0">
        <LogoDevStorage />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="list ">
          <ul className="flex flex-wrap text-sm font-medium text-center">
            <li className="dromenu mr-2 flex items-center relative">
              <span className="navbar-burger inline-flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6.31641"
                    y="6.31592"
                    width="3.55556"
                    height="3.55556"
                    rx="1.4"
                    fill="#596184"
                  />
                  <rect
                    x="6.31641"
                    y="11.6494"
                    width="3.55556"
                    height="3.55556"
                    rx="1.4"
                    fill="#596184"
                  />
                  <rect
                    x="11.6504"
                    y="6.31592"
                    width="3.55556"
                    height="3.55556"
                    rx="1.4"
                    fill="#596184"
                  />
                  <rect
                    x="11.6504"
                    y="11.6494"
                    width="6.22222"
                    height="6.22222"
                    rx="1.4"
                    fill="#596184"
                  />
                </svg>
              </span>
              <div className="inline-flex items-center py-4 px-0 gap-2 text-blue-400 text-12">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.01195 6.33325L5.33301 4.01219L3.01195 1.69114"
                    stroke="#292E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {kind === MyDataKind.Projects ? "My Projects" : "My Queries"}
              </div>
            </li>
            {activeEntity && (
              <li className="mr-2 flex items-center relative">
                <div className="inline-flex items-center py-4 px-0 gap-2 text-blue-400">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.01195 6.33325L5.33301 4.01219L3.01195 1.69114"
                      stroke="#292E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {activeEntity}
                </div>
              </li>
            )}
          </ul>
        </div>

        <UserMenu user={user} />
      </div>
    </div>
  );
};