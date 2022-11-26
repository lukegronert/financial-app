import React from "react";
import { useRouter } from "next/router";
import {
  formatLocalPercentage,
  formatLocalUSD,
} from "../utils/formatDataFunctions";

const GainerLoserItem = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col flex-1 justify-evenly bg-white rounded-xl p-2 gap-1 cursor-pointer"
      onClick={() => router.push(`/instruments/${data.name}/${data.symbol}`)}
    >
      <h2 className="flex-1 text-explore-blue font-extrabold w-full h-full">
        {data.name}
      </h2>
      <span className="text-explore-blue font-bold">
        {`$${data.price.toFixed(2)}`}
      </span>
      <div className="flex flex-row gap-2 items-center">
        <span
          className={`${
            data.change > 0
              ? "text-green-400 bg-green-100"
              : "text-red-400 bg-red-100"
          } px-1 py-0.5 rounded-md text-sm font-bold`}
        >
          {formatLocalPercentage(data.changesPercentage / 100)}
        </span>
        <span className="text-gray-400 font-bold text-sm">
          {formatLocalUSD(data.change)}
        </span>
      </div>
    </div>
  );
};

export default GainerLoserItem;
