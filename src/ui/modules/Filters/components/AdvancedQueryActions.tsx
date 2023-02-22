export const AdvancedQueryActions = ({
  search,
  addGroup,
}: {
  search: () => void;
  addGroup: () => void;
}) => {
  return (
    <div
      className={
        "flex justify-between transform -translate-y-7 max-w-2xl w-full px-10"
      }
    >
      {/*<button className="w-52 border-2 border-yellow text-yellow uppercase rounded  bg-black px-2 py-1">*/}
      {/*  Collapse Query*/}
      {/*</button>*/}
      <span />
      <div className={"flex gap-5"}>
        <button
          className="w-52 border-2 border-yellow text-yellow uppercase bg-black rounded px-2 py-1"
          onClick={addGroup}
        >
          Add group
        </button>
        <button
          className="w-52 border-2 border-yellow bg-yellow text-slate uppercase rounded px-2 py-1"
          onClick={search}
        >
          Search
        </button>
      </div>
    </div>
  );
};
