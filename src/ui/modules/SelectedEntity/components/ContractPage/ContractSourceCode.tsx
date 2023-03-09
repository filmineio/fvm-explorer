import { useEffect } from "react";

import { Editor } from "@/ui/components/Editor/Editor";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useWeb3Storage } from "@/ui/external/useWeb3Storage";

export const ContractSourceCode = ({ sourceCid }: { sourceCid: string }) => {
  const { retrieve, data, loading } = useWeb3Storage<string>();

  useEffect(() => {
    if (sourceCid) retrieve(sourceCid);
  }, [sourceCid]);

  if (loading) {
    return (
      <div className={"flex min-h-[600px]"}>
        <Spinner />
      </div>
    );
  }
  return (
    <div className={"flex flex-col"}>
      <Editor
        language={"sol"}
        theme={"vs-dark"}
        value={data || ""}
        height={600}
        options={{
          readOnly: true,
          minimap: {
            autohide: true,
          },
        }}
      />
    </div>
  );
};