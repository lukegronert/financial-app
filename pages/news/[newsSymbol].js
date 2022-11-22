import React from 'react';
import News from '../../components/News';
import appleNews from '../../mockData/AppleNews';

const news = () => {
  return (
    <News newsData={appleNews} limit={appleNews.length} seeAll={false} backButton={true} />
  )
}

export default news;