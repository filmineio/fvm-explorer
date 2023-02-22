import { FC } from 'react';
import { components, OptionProps } from 'react-select';
import clsx from 'clsx';
const { Option } = components;

export type SelectOptionProps = OptionProps & {
  data: { label: string; value: string };
};

const SelectOption: FC<SelectOptionProps> = (props) => {
  const { data, isSelected } = props;

  return (
    <div className="react-select-option-wrapper">
      <Option
        {...props}
        className={clsx('select-option', {
          selected: isSelected,
        })}
      >
        {data.label}
      </Option>
    </div>
  );
};
export default SelectOption;
