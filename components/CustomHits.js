import { connectHits } from 'react-instantsearch-dom';

const Hits = ({ hits, HitComponent, userWatchList, setUserWatchList }) => (
  <ol className="grid grid-cols-2 auto-rows-fr gap-3 w-full">
    {hits.map(hit => (
      <HitComponent key={hit.objectID} hit={hit} userWatchList={userWatchList} setUserWatchList={setUserWatchList} />
    ))}
  </ol>
);

const CustomHits = connectHits(Hits);

export default CustomHits;