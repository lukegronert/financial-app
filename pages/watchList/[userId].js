import React from 'react';
import WatchList from '../../components/WatchList';


const UserId = () => {
  return (
    <WatchList limit={userWatchList.length-1} seeAll={false} backButton={true}  />
  )
}

export default UserId;