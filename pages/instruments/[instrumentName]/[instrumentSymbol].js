import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";

import InstrumentDetail from "../../../components/InstrumentDetail";

const InstrumentId = () => {
  const [userWatchList, setUserWatchList] = useState([]);
  const user = auth.currentUser;

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
    <div>
      <InstrumentDetail userWatchList={userWatchList} setUserWatchList={setUserWatchList} />
    </div>
  );
};

export default InstrumentId;
