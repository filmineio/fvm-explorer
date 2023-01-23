import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Entry } from "@/types/data/Event";

export const EventEntryRow = ({ entry }: { entry: Entry }) => {
  return (
    <tr className={"max-w-xl"}>
      <td className="text-Crusta text-sm font-normal font-mono1 text-left ">
        {entry.Key}
      </td>
      <td>
        {/* TODO Only Data can be decoded so UI must be changed */}
        {/*<select className=" text-yellow font-sans1 select-text border-none focus:outline-none focus:border-none bg-inherit  caret-yellow text-sm	font-semibold tracking-wide	cursor-pointer">*/}
        {/*  <option className="text-gray-dark">String</option>*/}
        {/*  <option className="text-gray-dark">Address</option>*/}
        {/*  <option className="text-gray-dark">UInt256</option>*/}
        {/*</select>*/}
      </td>
      <td className="text-white text-sm font-normal font-mono1 text-left relative">
        <CopyWrapper data={entry.Value}>
          <div className={"max-w-7xl truncate cursor-pointer"}>
            {entry.Value}
          </div>
        </CopyWrapper>
      </td>
    </tr>
  );
};