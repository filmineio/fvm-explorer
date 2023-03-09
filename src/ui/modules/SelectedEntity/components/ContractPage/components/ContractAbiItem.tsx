import { isEmpty } from "ramda";
import JSONPretty from "react-json-pretty";
import { AbiItem } from "web3-utils";

export const ContractAbiItem = ({
  item: { name, type, anonymous, stateMutability, inputs, outputs, ...rest },
}: {
  item: AbiItem;
}) => {
  return (
    <div
      className={
        "px-4 flex flex-col gap-2 border-b border-b-secondary-900 py-2 pb-8 text-sm"
      }
    >
      <div className={"flex justify-between"}>
        <div className={"flex gap-2 text-secondary"}>
          <span className={"text-primary"}>Name: </span>
          {name || "N/A"}
        </div>
        <div className={"flex gap-2 text-secondary"}>
          <span className={"text-primary"}>Type: </span>
          {type || "N/A"}
        </div>
      </div>
      <div className={"flex justify-between"}>
        <div className={"flex gap-2 text-secondary"}>
          <span className={"text-primary"}>State Mutability: </span>
          {stateMutability || "N/A"}
        </div>
        <div className={"flex gap-2 text-secondary"}>
          <span className={"text-primary"}>Is Anonymous: </span>
          {anonymous ? "true" : "false"}
        </div>
      </div>
      {!isEmpty(rest) && (
        <div className={"flex flex-col gap-2 text-secondary"}>
          <span className={"text-primary"}>Info: </span>{" "}
          <code className={"text-secondary"}>{JSON.stringify(rest)}</code>
        </div>
      )}

      {!!inputs?.length && (
        <div className={"flex gap-2 flex-col text-secondary"}>
          <div className={"text-primary"}>Inputs:</div>
          {inputs.map((inp, i) => (
            <div key={i} className={"pl-4 text-xs"}>
              <JSONPretty
                keyStyle={"color:rgb(59 130 246 / 0.5)"}
                data={JSON.stringify(inp)}
              ></JSONPretty>
            </div>
          ))}
        </div>
      )}

      {!!outputs?.length && (
        <div className={"flex gap-2 flex-col text-secondary"}>
          <div className={"text-primary"}>Outputs:</div>
          {outputs.map((inp, i) => (
            <div key={i} className={"pl-4 text-xs"}>
              <JSONPretty
                keyStyle={"color:rgb(59 130 246 / 0.5)"}
                data={JSON.stringify(inp)}
              ></JSONPretty>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};