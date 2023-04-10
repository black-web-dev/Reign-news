import React, { useCallback, useState } from 'react';
import AnyWhereClick from './AnyWhereClick';
import 'font-awesome/css/font-awesome.min.css';
export interface DropDownOption {
  value: string;
  label?: string;
  icon?: string;
}

interface OptionProps {
  item: DropDownOption;
}
interface Props {
  options: DropDownOption[];
  selected: number;
  selectionChanged?: (index: number) => void;
}

function Option({ item }: OptionProps) {
  return (
    <div className="cursor-pointer flex items-center font-roboto text-gray-200 px-2">
      {item.icon && <img className="mr-2" src={item.icon} alt={item.value} />}
      <span>{item.label || item.value}</span>
    </div>
  );
}

export default function DropdownList({ options, selected, selectionChanged }: Props) {
  const [opened, setOpened] = useState(false);
  const handleClose = useCallback(() => setOpened(false), []);

  return (
    <AnyWhereClick onClick={handleClose}>
      <div className="relative w-full sm:w-60">
        <div className="flex justify-between border border-gray-100 rounded p-2" onClick={() => setOpened(!opened)}>
          <Option item={options[selected]} />
          <div className="flex-0 flex items-center justify-center text-lg">
            {opened ? <i className="fa fa-angle-up"></i> : <i className="fa fa-angle-down"></i>}
          </div>
        </div>
        {opened && (
          <div className="w-full sm:w-60 absolute bg-white border-b-2 border-gray-800">
            {options.map((option, index) => {
              if (option.value) {
                return (
                  <div
                    key={index}
                    className="py-4 p-2"
                    onClick={() => {
                      selectionChanged && selectionChanged(index);
                      setOpened(false);
                    }}
                  >
                    <Option item={option} />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </AnyWhereClick>
  );
}
