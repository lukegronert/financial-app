import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserWatchList } from "../utils/firestoreClient";
import { auth } from "../firebase/clientApp";

import { TailSpin } from "react-loader-spinner";
import BackButton from "./BackButton";
import SeeAll from "./SeeAll";
import WatchListItem from "./WatchListItem";
import BottomNav from "./BottomNav";

const WatchList = ({ limit, seeAll, backButton }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`userWatchList`],
    queryFn: () => getUserWatchList(),
  });

  const user = auth.currentUser;

  // Check for user, if user does not exist, return empty component
  if (!user) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="#09183d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div
        className={`${
          !seeAll ? `h-screen overflow-auto pb-28` : ``
        } bg-explore-gray flex flex-col px-3 `}
      >
        {backButton && <BackButton />}
        <div className="flex flex-row justify-between items-center py-2">
          <h2 className="text-xl font-extrabold text-explore-blue">
            Your Watchlist
          </h2>
          {seeAll && <SeeAll path="/watchList" />}
        </div>
        <div className="flex flex-col gap-3">
          {data.map((item, i) => {
            if (i < limit) {
              return (
                <WatchListItem
                  instrumentSymbol={item}
                  key={i}
                  userWatchList={data}
                />
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
