import React, { useState } from "react";
import { auth } from "../firebase/clientApp";
// import { getDocs, collection } from "firebase/firestore";
import BackButton from "./BackButton";
import SeeAll from "./SeeAll";
import WatchListItem from "./WatchListItem";
import BottomNav from "./BottomNav";

const WatchList = ({ limit, seeAll, backButton, userWatchList }) => {
  // const [watchList, setWatchList] = useState([]);
  const user = auth.currentUser;

  // const getData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"))
  //   const userDoc = querySnapshot.docs.find((doc) => doc.data().phoneNumber === user.phoneNumber)
  //   const userWatchList = (userDoc.data().watchList)
  //   setWatchList(userWatchList)
  // }

  // useEffect(() => {
  //   getData()
  // }, [])


  return (
    <>
      <div className="flex flex-col px-3 bg-explore-gray">
        {backButton && <BackButton />}
        <div className="flex flex-row justify-between items-center py-2">
          <h2 className="text-xl font-extrabold text-explore-blue">
            Your Watchlist
          </h2>
          {seeAll && <SeeAll path="/watchList/userId" />}
        </div>
        <div className="flex flex-col gap-3 mb-32">
          {userWatchList?.map((item, i) => {
            if (i < limit) {
              return (
                <WatchListItem instrumentSymbol={item} key={i}/>
              );
            }
          })}
        </div>
      </div>
      <BottomNav activePage="portfolio" />
    </>
  );
};

export default WatchList;
