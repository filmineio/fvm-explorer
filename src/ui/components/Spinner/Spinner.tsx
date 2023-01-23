export const Spinner = ({ inline }: { inline?: boolean }) => {
  if (inline)
    return (
      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
    );

  return (
    <div
      className={
        "w-full h-full backdrop-blur-2xl flex justify-center items-center p-80"
      }
    >
      <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full" />
    </div>
  );
};
