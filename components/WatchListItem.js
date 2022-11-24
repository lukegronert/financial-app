import React from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import Link from "next/link";

import { getTimeData } from "../utils/apiQueries";
import {
  formatLocalPercentage,
  formatLocalUSD,
} from "../utils/formatDataFunctions";

import { TailSpin } from "react-loader-spinner";
import { AiFillStar } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";

const WatchListItem = ({ instrumentSymbol }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`${instrumentSymbol}1d`],
    queryFn: () => getTimeData(instrumentSymbol, "1d"),
  });

  if (isLoading) {
    return (
      <div className="w-screen flex justify-center items-center">
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

  console.log("DATA", data);

  if (data.Note) {
    return <div>No more API calls.</div>;
  }

  const dataKeys = Object.keys(data);

  const chartData = Object.entries(data[dataKeys[1]]).filter(
    (item) =>
      item[0].slice(0, 10) ===
      Object.entries(data[dataKeys[1]])[0][0].slice(0, 10)
  );

  const currentValue = Number(chartData[0][1]["4. close"]);

  const changeValue = Number(
    ((currentValue - chartData[chartData.length - 1][1]["4. close"]) * 100) /
      100
  );

  const changePercentage = changeValue / currentValue;

  return (
    <Link href={`instruments/noName/${instrumentSymbol}`}>
      <div className="flex flex-row w-full gap-3 justify-between bg-white rounded-lg p-2">
        <div className="flex flex-row place-self-start gap-3">
          <AiFillStar size="1.25rem" className="text-orange-500 self-center" />
          <div className="flex flex-col">
            <p className="font-bold text-explore-blue">{instrumentSymbol}</p>
            <span>{formatLocalPercentage(changePercentage)}</span>
          </div>
        </div>
        <div className="flex-1 self-center flex justify-center items-center">
          <Chart
            chartData={chartData}
            changePercentage={changePercentage}
            height={50}
            width={100}
            size="small"
          />
        </div>
        <div className="place-self-end flex flex-row self-center items-center gap-3">
          <p className="font-bold text-explore-blue">
            {formatLocalUSD(changeValue)}
          </p>
          <SlOptionsVertical className="text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default WatchListItem;
