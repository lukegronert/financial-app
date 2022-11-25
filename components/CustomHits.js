import { connectHits } from 'react-instantsearch-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserWatchList } from '../utils/firestoreClient';

import { TailSpin } from 'react-loader-spinner';

const Hits = ({ hits, HitComponent }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`userWatchList`],
    queryFn: () => getUserWatchList(),
  });

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="#09183d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
  <ol className="grid grid-cols-2 auto-rows-fr gap-3 w-full">
    {hits.map(hit => (
      <HitComponent key={hit.objectID} hit={hit} userWatchList={data} />
    ))}
  </ol>
);
}

const CustomHits = connectHits(Hits);

export default CustomHits;