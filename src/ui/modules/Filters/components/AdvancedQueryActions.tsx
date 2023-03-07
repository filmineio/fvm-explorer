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
        "flex justify-between transform -translate-y-12 max-w-2xl w-full"
      }
    >
      {/*<button className="w-52 border-2 border-blue-400 text-blue-400 uppercase rounded  bg-black px-2 py-1">*/}
      {/*  Collapse Query*/}
      {/*</button>*/}
      <span />
      <div className={"flex gap-5"}>
        <button
          className="btn border-2 bg-slate border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
          onClick={addGroup}
        >
          ADD GROUP
        </button>
        <button
          className="btn bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
          onClick={search}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};