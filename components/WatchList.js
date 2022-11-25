import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserWatchList } from "../utils/firestoreClient";
import BackButton from "./BackButton";
import SeeAll from "./SeeAll";
import WatchListItem from "./WatchListItem";
import BottomNav from "./BottomNav";

const WatchList = ({ limit, seeAll, backButton }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`userWatchList`],
    queryFn: () => getUserWatchList(),
  });

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
      <div className={!seeAll ? `flex flex-col px-3 bg-explore-gray h-screen` : `flex flex-col px-3 bg-explore-gray`}>
        {backButton && <BackButton />}
        <div className="flex flex-row justify-between items-center py-2">
          <h2 className="text-xl font-extrabold text-explore-blue">
            Your Watchlist
          </h2>
          {seeAll && <SeeAll path="watchList/userId" />}
        </div>
        <div className="flex flex-col gap-3 mb-32">
          {data.map((item, i) => {
            if (i < limit) {
              return (
                <WatchListItem instrumentSymbol={item} key={i} userWatchList={data} />
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
