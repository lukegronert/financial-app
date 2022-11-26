import React from "react";
import CustomHits from "./CustomHits";
import Hit from "./Hit";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import "instantsearch.css/themes/reset.css";
import "instantsearch.css/themes/satellite.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const Search = () => {
  return (
    <div className="bg-white rounded-t-xl">
      <InstantSearch
        searchClient={searchClient}
        indexName="financial-instruments"
      >
        <SearchBox className="mb-3 px-3" data-cy="search" />
        <div className="bg-explore-gray grow w-screen">
          <div className="h-full text-center p-3">
            <CustomHits HitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
