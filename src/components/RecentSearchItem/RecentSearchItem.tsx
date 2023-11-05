import React, { FC } from 'react';

const RecentSearchItem: FC = () => {
  return (
    <div className="RecentSearchItem">
      <button className="rounded-lg bg-slate-300 dark:bg-neutral-700 overflow-hidden flex-1 p-3 hover:bg-slate-400 dark:hover:bg-neutral-600 transition-colors duration-300 ease-in-out">
        <div className="ItemWrapper flex-col justify-between">
          <div className="location pb-1 mb-3">
            <p className='text-start text-sm'>Ho Chi Minh</p>
          </div>
          <div className="time">
            <p className='text-start text-sm'>8 tháng 11 2023 - 9 tháng 11 2023</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default RecentSearchItem;
