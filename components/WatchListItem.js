import React from "react";
import { AiFillStar } from "react-icons/ai";
import { SlOptionsVertical } from 'react-icons/sl';

const WatchListItem = ({ symbol, changePercentage, value }) => {
  return (
    <div className="flex flex-row w-full gap-3 justify-between bg-white rounded-lg p-2">
        <div className="flex flex-row place-self-start gap-3">
            <AiFillStar size="1.25rem" className="text-orange-500 self-center" />
            <div className="flex flex-col">
                <p className="font-bold text-explore-blue">{symbol}</p>
                <span>{`${changePercentage}%`}</span>
            </div>
        </div>
      <div className="flex-1 self-center text-center">
        GRAPH
      </div>
      <div className="place-self-end flex flex-row self-center items-center gap-3">
        <p className="font-bold text-explore-blue">{`$${value}`}</p>
        <SlOptionsVertical className="text-gray-400" />
      </div>
    </div>
  );
};

export default WatchListItem;
