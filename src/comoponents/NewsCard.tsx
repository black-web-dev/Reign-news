import React, { useMemo } from 'react';
interface Props {
  author: string;
  title: string;
  url: string;
  createdAt: Date;
  starred: boolean;
  toggleStar: () => void;
}

export default function NewsCard({ author, title, url, createdAt, starred, toggleStar }: Props) {
  const hours = useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - new Date(createdAt).getTime();
    const h = Math.floor(diff / 3600000);
    if (h === 0) {
      return 'less than 1';
    }
    return h;
  }, [createdAt]);
  return (
    <div
      className="cursor-pointer flex justify-between items-center rounded px-5 py-6 border border-gray-700 group hover:border-gray-400/40"
      onClick={() => {
        url && window.open(url, '_blank');
      }}
    >
      <div className="flex-grow">
        <div className="flex items-center">
          <img className="mr-2 group-hover:opacity-40" src="/icons/time.png" alt="time" />
          <p className="text-tiny text-gray-600 group-hover:text-gray-600/40">
            {hours} hours ago by {author}
          </p>
        </div>
        <p className="mt-2 font-medium font-roboto text-gray-400 group-hover:text-gray-400/40">
          {title || '(No title)'}
        </p>
      </div>
      <div onClick={e => e.stopPropagation()}>
        <img
          className="cursor-pointer hover:scale-125 transition-all group-hover:opacity-40"
          onClick={toggleStar}
          src={`/icons/${starred ? 'star-filled' : 'star'}.png`}
          alt="star"
        />
      </div>
    </div>
  );
}
