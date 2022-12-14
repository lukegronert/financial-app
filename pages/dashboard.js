import React, { useState } from "react";
import Search from "../components/Search";
import GainersAndLosers from "../components/GainersAndLosers";
import BottomNav from "../components/BottomNav";
import { auth } from "../firebase/clientApp";

import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

import WatchList from "../components/WatchList";

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
            <button onClick={() => setOpenSearch(false)}>
              <span className="sr-only">Close search</span>
              <RiCloseLine size="1.5em" />
            </button>
          ) : (
            <button
              onClick={() => {
                setOpenSearch(true);
              }}
            >
              <span className="sr-only">Open search</span>
              <FiSearch size="1.5em" />
            </button>
          )}
        </div>
        {openSearch && (
          <div>
            <p className="font-bold text-gray-400 px-3 mb-3">
              Choose your interests to follow and trade on your terms.
            </p>
            <Search />
          </div>
        )}
        {!openSearch && (
          <>
            <GainersAndLosers colLimit={1} seeAll={true} backButton={false} />
            <WatchList limit={3} seeAll={true} />
            <BottomNav />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
