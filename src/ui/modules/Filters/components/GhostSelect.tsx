import { onChange } from "@/utils/unpack";
import Select from 'react-select';
import SelectOption from "@/ui/components/Select/SelectOption";
import clsx from "clsx";

export type GhostSelectT = <T extends string = string>(props: {
  value: T;
  values: { value: T; label: string }[];
  onChange: (v: string) => void;
  selectType?: 'transparent' | 'field';
}) => JSX.Element;

export const GhostSelect: GhostSelectT = ({
  value,
  values,
  onChange: change,
  selectType,
}) => {
  const handleOnChange = (e: any) => {
    change(e.value);
  }
  return (
    <>
      <Select
        className={clsx('react-select', {'transparent': selectType === 'transparent'})}
        classNamePrefix="react-select"
        options={values}
        onChange={handleOnChange}
        value={values.find(
          (option) => option.value === value,
          )}
        isSearchable={false}
        isClearable={false}
        components={{
          IndicatorSeparator: () => null,
          // @ts-ignore
          Option: SelectOption,
        }}
        menuIsOpen
      />
    </>
  );
};