import React from 'react';
import GainersAndLosers from '../components/GainersAndLosers';
import gainersData from '../mockData/gainers';
import losersData from '../mockData/losers';

const gainersAndLosers = () => {
  return (
    <GainersAndLosers gainersData={gainersData} losersData={losersData} colLimit={gainersData.length} seeAll={false} backButton={true} />
  )
}

export default gainersAndLosers