import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";
import WatchList from '../../components/WatchList';


const UserId = () => {
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
  return (
    <WatchList limit={userWatchList.length-1} seeAll={false} backButton={true} userWatchList={userWatchList}  />
  )
}

export default UserId;