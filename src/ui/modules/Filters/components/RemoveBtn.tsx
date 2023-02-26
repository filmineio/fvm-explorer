import Garbage from "@/ui/components/Common/Icons/Garbage";

export const RemoveBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="ml-2 xs:mt-4 sm:mt-0">
      <button
        className="rounded-4 text-white bg-slate text-xs font-bold py-1.5 px-2"
        onClick={onClick}
      >
        <Garbage />
      </button>
    </div>
  );
};