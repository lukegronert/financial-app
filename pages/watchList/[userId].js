import React from 'react';
import WatchList from '../../components/WatchList';

const userId = () => {
  return (
    <WatchList limit={10} seeAll={false} backButton={true}  />
  )
}

export default userId;