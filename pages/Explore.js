import React, { useState } from 'react';
import Search from '../components/Search';

import { FiSearch } from 'react-icons/fi'

const Explore = () => {
  const [openSearch, setOpenSearch] = useState(true);
  const [initialScreen, setInitialScreen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-explore-gray">
      {openSearch ? (
        <Search setOpenSearch={setOpenSearch} title={initialScreen ? 'Welcome!' : 'Dashboard'} />
      ) : (
        <div className="bg-white">
          <div className="flex flex-row justify-between items-center py-3 px-3 pb-20">
              <h1 className="text-explore-blue font-extrabold text-3xl">
                Dashboard
              </h1>
              <FiSearch
                size='1.5em'
                onClick={() => {
                  setOpenSearch(true)
                  setInitialScreen(false)
                  }
                }
               />
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