import React, { useState } from 'react';
import ExploreInstrumentDetail from '../components/ExploreInstrumentDetail';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/satellite.css';

import { RiCloseLine } from 'react-icons/ri'
import { FiSearch } from 'react-icons/fi'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
);

const Explore = () => {
  const [openSearch, setOpenSearch] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-explore-gray">
      {openSearch ? (
        <div className="bg-white rounded-t-xl">
          <div className="flex flex-row justify-between items-center py-3 px-3 rounded-t-xl">
            <h1 className="text-explore-blue font-extrabold text-3xl">
              Welcome!
            </h1>
            <RiCloseLine size='1.5em' onClick={() => setOpenSearch(false)} />
          </div>
          <p className="font-bold text-gray-400 px-3 mb-3">Choose your interests to follow and trade on your terms.</p>
          <InstantSearch searchClient={searchClient} indexName="financial-instruments">
            <SearchBox className="mb-3 px-3" />
            <div className="bg-explore-gray grow w-screen">
              <div className="h-full text-center p-3">
                <Hits hitComponent={ExploreInstrumentDetail} />
              </div>
            </div>
          </InstantSearch>
        </div>
      ) : (
        <div className="bg-white rounded-t-xl">
          <div className="flex flex-row justify-between items-center py-3 px-3 rounded-t-xl">
              <h1 className="text-explore-blue font-extrabold text-3xl">
                Dashboard
              </h1>
              <FiSearch size='1.5em' onClick={() => setOpenSearch(true)} />
            </div>
        </div>
      )}
      {/* <div className="h-screen">
        <div className="grid grid-cols-2 gap-4 justify-center items-center flex-wrap h-full p-3">
          {dummyData.map((brand) => (
            <div className="basis-1/2 flex justify-center items-center text-center h-full rounded-lg bg-white" key={brand.name}>
              <ExploreInstrumentDetail name={brand.name} logo={brand.logo} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default Explore