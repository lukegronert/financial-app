import React, { useState } from "react";
import Search from "../components/Search";
import { useRouter } from 'next/navigation';

import { RiCloseLine } from "react-icons/ri";

const Explore = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col bg-explore-gray">
      <div className="bg-white rounded-t-lg">
        <div className="flex flex-row justify-between items-center py-3 px-3">
          <h1 className="text-explore-blue font-extrabold text-3xl">Welcome!</h1>
          <RiCloseLine size="1.5em" onClick={() => router.push('/dashboard')} />
        </div>
        <p className="font-bold text-gray-400 px-3 mb-3">
          Choose your interests to follow and trade on your terms.
        </p>
        <Search />
      </div>
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
  );
};

export default Explore;
