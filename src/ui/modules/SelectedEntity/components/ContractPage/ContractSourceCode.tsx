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
    <div id="container">
      <Editor
        language="sol"
        theme="vs-dark"
        value={data?.replaceAll('    ', ' ') || ""}
        // height="300"
        options={{
          readOnly: true,
          contextmenu: false,
          scrollbar: {
            useShadows: false,
            horizontalScrollbarSize: 0,
            verticalScrollbarSize: 0,
          },
          minimap: {
            enabled: false,
            autohide: false,
          },
          tabSize: 2,
          autoIndent: "full",
          detectIndentation: true,
          formatOnType: true,
          formatOnPaste: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          scrollPredominantAxis: false,
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          overviewRulerLanes: 0,
          padding: {
            top: 15,
            bottom: 10,
          },
        }}
        editorDidMount={(newValue) => {
          const container = document.getElementById('container');
          const contentHeight = Math.min(10000, newValue.getContentHeight());
          if (container?.style.width) container.style.width = '100%';
          if (container?.style.height) container.style.height = `${contentHeight}px`;
          try {
            newValue.layout({ width: 400, height: contentHeight });
          } catch (e) {}
        }}
      />
    </div>
  );
};