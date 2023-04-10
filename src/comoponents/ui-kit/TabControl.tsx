import React from 'react';

interface Props {
  labels: string[];
  selected: number;
  tabChanged?: (index: number) => void;
}

export default function TabControl({ labels, selected, tabChanged }: Props) {
  return (
    <div className="flex justify-center font-roboto font-medium leading-7">
      {labels.map((label, index) => (
        <div
          key={index}
          className={
            'w-24 cursor-pointer text-center rounded border ' +
            (selected === index ? 'border-primary text-primary ' : 'border-gray-800 text-gray-400 ') +
            (index === 0 ? 'rounded-r-none' : 'rounded-l-none')
          }
          onClick={() => tabChanged && tabChanged(index)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
