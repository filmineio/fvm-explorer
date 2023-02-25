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
          <label
            className="inline-block text-label form-check-label text-14 lowercase translate-y-0.5"
            htmlFor="advancedFilters"
          >
            {label}
          </label>
          <input
            className="form-check-input appearance-none w-10 rounded-full float-left h-5 align-top bg-label bg-no-repeat checked:bg-blue-400 bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            id="advancedFilters"
            checked={checked}
            onChange={cb(toggle, !checked)}
          />
        </div>
      </div>
    </div>
  );
};