import RecentSearchItem from 'components/RecentSearchItem/RecentSearchItem';
import React, { FC } from 'react';

const RecentSearchList: FC = () => {
  return (
    <div className="RecentSearchListContainer  flex gap-4 mx-5 my-3 ">
      <RecentSearchItem />
      <RecentSearchItem />
      <RecentSearchItem />
    </div>
  );
};

export default RecentSearchList;
