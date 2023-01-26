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
        <div className="form-check form-switch flex gap-2">
          <label
            className="form-check-label inline-block text-gray-light uppercase text-sm transform translate-y-0.5"
            htmlFor="advancedFilters"
          >
            {label}
          </label>
          <input
            className="form-check-input appearance-none w-10 rounded-full float-left h-5 align-top bg-lightgray bg-no-repeat checked:bg-yellow  bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
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