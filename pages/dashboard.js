import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import GainersAndLosers from '../components/GainersAndLosers';
import BottomNav from '../components/BottomNav';
import { auth, db } from "../firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";

import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import Link from 'next/link';

import WatchList from "../components/WatchList";

const Dashboard = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [userWatchList, setUserWatchList] = useState([])

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    const userDoc = querySnapshot.docs.find((doc) => doc.data().phoneNumber === user.phoneNumber)
    const userWatchListArray = (userDoc.data().watchList)
    setUserWatchList(userWatchListArray)
  }

  useEffect(() => {
    getData()
  }, [])

  if(!auth.currentUser) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>Please sign in and try again.</p>
        <Link href="/" className="underline">Go to sign in page</Link>
      </div>
    )
  }

  return (
    <div className="bg-explore-gray h-screen">
      <div className="bg-white">
        <div className="flex flex-row justify-between items-center py-3 px-3">
          <h1 className="text-explore-blue font-extrabold text-3xl">
            Dashboard
          </h1>
          {openSearch ? (
            <RiCloseLine size="1.5em" onClick={() => setOpenSearch(false)} className="cursor-pointer" />
          ) : (
            <FiSearch
              size="1.5em"
              onClick={() => {
                setOpenSearch(true);
              }}
              className="cursor-pointer"
            />
          )}
        </div>
        {openSearch ? (
          <div>
            <p className="font-bold text-gray-400 px-3 mb-3">
              Choose your interests to follow and trade on your terms.
            </p>
            <Search userWatchList={userWatchList} setUserWatchList={setUserWatchList} />
          </div>
        ) : null}
        {!openSearch && (
          <>
            <GainersAndLosers colLimit={1} seeAll={true} backButton={false} />
            <WatchList userWatchList={userWatchList}limit={3} seeAll={true} />
            <BottomNav activePage='dashboard' />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
