import React, { ReactNode, useEffect } from 'react';

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export default function AnyWhereClick({ onClick, children }: Props) {
  useEffect(() => {
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [onClick]);
  return (
    <div className="w-full sm:w-0" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
}
