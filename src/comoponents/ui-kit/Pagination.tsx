import React, { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { range } from '../../utils';
import 'font-awesome/css/font-awesome.min.css';

interface Props {
  className: string;
  page: number;
  maxPage: number;
  pageChanged: (page: number) => void;
}

export default function Pagination({ className, page, pageChanged, maxPage }: Props) {
  const pageDiff = isMobile ? 2 : 4;
  const min = Math.max(0, page - pageDiff);
  const max = Math.min(page + pageDiff, maxPage - 1);
  const pages = range(min, max);

  const handleClick = useCallback(
    (page: number) => {
      pageChanged(page);
    },
    [pageChanged],
  );

  const handlePreClick = useCallback(() => {
    const prevPage: number = Math.max(0, page - 1);
    handleClick(prevPage);
  }, [page, handleClick]);

  const handleNextClick = useCallback(() => {
    const nextPage: number = Math.min(maxPage - 1, page + 1);
    handleClick(nextPage);
  }, [page, maxPage, handleClick]);

  return (
    <div className={className + ' flex justify-center items-center text-tiny'}>
      <div
        className="cursor-pointer w-8 h-8 flex justify-center items-center font-roboto text-gray-500 text-center border rounded border-gray-800 m-1 md:m-2 "
        onClick={handlePreClick}
      >
        <i className="fa fa-angle-left"></i>
      </div>
      {pages.map(p => (
        <div
          key={p}
          onClick={() => handleClick(p)}
          className={
            'cursor-pointer w-8 h-8 flex justify-center items-center font-roboto text-gray-500 text-center border rounded border-gray-800 m-1 md:m-2 ' +
            (p === page ? 'bg-primary border-primary text-white' : '')
          }
        >
          {p + 1}
        </div>
      ))}
      <div
        className="cursor-pointer w-8 h-8 flex justify-center items-center font-roboto text-gray-500 text-center border rounded border-gray-800 m-1 md:m-2 "
        onClick={handleNextClick}
      >
        <i className="fa fa-angle-right"></i>
      </div>
    </div>
  );
}
