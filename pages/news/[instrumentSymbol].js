import React from 'react';
import NewsList from '../../components/NewsList';
import { useRouter } from 'next/router';

const News = () => {
  const router = useRouter();
  const { instrumentSymbol } = router.query;
  return (
    <News limit={50} seeAll={false} backButton={true} instrumentSymbol={instrumentSymbol} />
  )
}

export default News;