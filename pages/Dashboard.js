import React, { useState } from "react";
import Search from "../components/Search";
import GainersAndLosers from '../components/GainersAndLosers';

import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

import gainersData from '../mockData/gainers';
import losersData from '../mockData/losers';

const Dashboard = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="bg-explore-gray h-screen">
      <div className="bg-white">
        <div className="flex flex-row justify-between items-center py-3 px-3">
          <h1 className="text-explore-blue font-extrabold text-3xl">
            Dashboard
          </h1>
          {openSearch ? (
            <RiCloseLine size="1.5em" onClick={() => setOpenSearch(false)} />
          ) : (
            <FiSearch
              size="1.5em"
              onClick={() => {
                setOpenSearch(true);
              }}
            />
          )}
        </div>
        {openSearch ? (
          <div>
            <p className="font-bold text-gray-400 px-3 mb-3">
              Choose your interests to follow and trade on your terms.
            </p>
            <Search />
          </div>
        ) : null}
        {!openSearch && (
          <>
            <GainersAndLosers gainersData={gainersData} losersData={losersData} colLimit={1} seeAll={true} backButton={false} />
            
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
