import { cb } from "@/utils/cb";

export const AdvancedFilterToggle = ({
  checked,
  toggle,
  label,
}: {
  checked: boolean;
  toggle: (value: boolean) => void;
  label: string;
}) => {
  return (
    <div className={"md:w-full sm:w-full"}>
      <div className="flex justify-center items-center">
        <div className="flex gap-2 items-center form-check form-switch pl-2.5">
          <span className="inline-block text-label form-check-label text-14 mr-4">{label}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="advancedFilters"
              checked={checked}
              onChange={cb(toggle, !checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 outline-none bg-gray-200 peer-focus:outline-none rounded-40 bg-body peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-label after:rounded-40 after:h-5 after:w-5 after:transition-all peer-checked:after:bg-blue-400"></div>
          </label>
        </div>
      </div>
    </div>
  );
};