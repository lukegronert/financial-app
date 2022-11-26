import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGainersData, getLosersData } from "../utils/apiQueries";

import SeeAll from "./SeeAll";
import GainerLoserItem from "./GainerLoserItem";
import BackButton from "./BackButton";

import { TailSpin } from "react-loader-spinner";

const GainersAndLosers = ({ colLimit, seeAll, backButton }) => {
  const {
    isLoading: gainersIsLoading,
    isError: gainersIsError,
    data: gainersData,
    error: gainersError,
  } = useQuery({
    queryKey: [`gainers`],
    queryFn: () => getGainersData(),
  });

  const {
    isLoading: losersIsLoading,
    isError: losersIsError,
    data: losersData,
    error: losersError,
  } = useQuery({
    queryKey: [`losers`],
    queryFn: () => getLosersData(),
  });

  if (gainersIsLoading || losersIsLoading) {
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

  if (gainersIsError) {
    return <span>Error: {gainersError.message}</span>;
  } else if (losersIsError) {
    return <span>Error: {losersError.message}</span>;
  }

  if (gainersData["Error Message"]) {
    console.log(gainersData["Error Message"]);
  } else if (losersData["Error Message"]) {
    console.log(losersData["Error Message"]);
  }

  return (
    <div className="px-3 w-full flex flex-col bg-explore-gray">
      {backButton && <BackButton />}
      <div className="flex flex-row justify-between items-center py-2">
        <p className="text-xl font-extrabold text-explore-blue">
          Gainers and Losers
        </p>
        {seeAll && <SeeAll path="/gainersAndLosers" />}
      </div>
      <div className="grid grid-cols-2 gap-2 bg-explore-gray justify-evenly">
        <div className="gap-2 grid auto-rows-fr">
          {gainersData.map !== undefined &&
            gainersData.map((gainer, i) => {
              if (i < colLimit) {
                return <GainerLoserItem data={gainer} key={gainer.name} />;
              }
            })}
        </div>
        <div className="gap-2 grid auto-rows-fr">
          {losersData.map !== undefined &&
            losersData.map((loser, i) => {
              if (i < colLimit) {
                return <GainerLoserItem data={loser} key={loser.name} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default GainersAndLosers;
