import React from 'react';
import WatchList from '../../components/WatchList';


const UserId = () => {
  return (
    <WatchList limit={50} seeAll={false} backButton={true}  />
  )
}

export default UserId;