import React from 'react';
import News from '../../components/News';
import { useRouter } from 'next/router';

const news = () => {
  const router = useRouter();
  const { instrumentSymbol } = router.query;
  return (
    <News limit={50} seeAll={false} backButton={true} instrumentSymbol={instrumentSymbol} />
  )
}

export default news;