import dynamic from "next/dynamic";
import { MonacoEditorProps } from "react-monaco-editor";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export const Editor = (p: MonacoEditorProps) => {
  return <MonacoEditor {...p} />;
};