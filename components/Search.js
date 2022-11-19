import React from 'react'
import ExploreInstrumentDetail from './ExploreInstrumentDetail';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/satellite.css';

import { RiCloseLine } from 'react-icons/ri'

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
  );

const Search = ({ setOpenSearch, title }) => {
  return (
    <div className="bg-white rounded-t-xl">
        <div className="flex flex-row justify-between items-center py-3 px-3">
            <h1 className="text-explore-blue font-extrabold text-3xl">
                {title}
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
  )
}

export default Search;