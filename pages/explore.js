import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { useRouter } from 'next/router';
import { auth, db } from "../firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";

import { RiCloseLine } from "react-icons/ri";

const Explore = () => {
  const [userWatchList, setUserWatchList] = useState([]);

  const router = useRouter();

  const user = auth.currentUser;

  if(!auth.currentUser) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>Please sign in and try again.</p>
        <a href="/" className="underline">Go to sign in page</a>
      </div>
    )
  }

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    const userDoc = querySnapshot.docs.find((doc) => doc.data().phoneNumber === user.phoneNumber)
    const userWatchListArray = (userDoc.data().watchList)
    setUserWatchList(userWatchListArray)
  }

  useEffect(() => {
    getData()
  }, [])

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
        <Search userWatchList={userWatchList} setUserWatchList={setUserWatchList} />
      </div>
    </div>
  );
};

export default Explore;
