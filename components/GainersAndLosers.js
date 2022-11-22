import React from "react";
import SeeAll from "./SeeAll";
import GainerLoserItem from "./GainerLoserItem";
import BackButton from "./BackButton";

const GainersAndLosers = ({ gainersData, losersData, colLimit, seeAll, backButton }) => {
  return (
    <div className="px-3 w-full flex flex-col bg-explore-gray">
      {backButton && (
        <BackButton />
      )}
      <div className="flex flex-row justify-between items-center py-2">
        <p className="text-xl font-extrabold text-explore-blue">Gainers and Losers</p>
        {seeAll && <SeeAll path="/gainersAndLosers" />}
      </div>
      <div className="grid grid-cols-2 gap-2 bg-explore-gray justify-evenly">
        <div className="gap-2 grid auto-rows-fr">
          {gainersData.map((gainer, i) => {
            if (i < colLimit) {
              return <GainerLoserItem status="gainer" data={gainer} key={gainer.name} />;
            }
          })}
        </div>
        <div className="gap-2 grid auto-rows-fr">
          {losersData.map((loser, i) => {
            if (i < colLimit) {
              return <GainerLoserItem status="loser" data={loser} key={loser.name} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GainersAndLosers;
