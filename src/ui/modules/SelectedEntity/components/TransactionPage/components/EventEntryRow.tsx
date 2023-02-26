import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Entry } from "@/types/data/Event";

export const EventEntryRow = ({ entry }: { entry: Entry }) => {
  return (
    <tr className={"max-w-xl"}>
      <td className="text-Crusta text-14 font-normal font-space text-left ">
        {entry.Key}
      </td>
      <td>
        {/* TODO Only Data can be decoded so UI must be changed */}
        {/*<select className=" text-blue-400 select-text border-none focus:outline-none focus:border-none bg-inherit  caret-blue-400 text-14	font-semibold tracking-wide	cursor-pointer">*/}
        {/*  <option className="text-slate">String</option>*/}
        {/*  <option className="text-slate">Address</option>*/}
        {/*  <option className="text-slate">UInt256</option>*/}
        {/*</select>*/}
      </td>
      <td className="text-white text-14 font-normal font-space text-left relative">
        <CopyWrapper data={entry.Value}>
          <div className={"max-w-7xl truncate cursor-pointer"}>
            {entry.Value}
          </div>
        </CopyWrapper>
      </td>
    </tr>
  );
};