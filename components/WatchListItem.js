import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Chart from "./Chart";
import Link from "next/link";

import { getTimeData } from "../utils/apiQueries";
import {
  formatLocalPercentage,
  formatLocalUSD,
} from "../utils/formatDataFunctions";
import { updateUserWatchList } from "../utils/firestoreClient";

import { TailSpin } from "react-loader-spinner";
import { AiFillStar } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";

const WatchListItem = ({ instrumentSymbol, userWatchList }) => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`${instrumentSymbol}1d`],
    queryFn: () => getTimeData(instrumentSymbol, "1d"),
  });

  const {
    mutate,
    isLoading: mutationIsLoading,
    isError: mutationIsError,
    isSuccess: mutationIsSuccess,
  } = useMutation({
    mutationFn: ({ method, symbol }) => updateUserWatchList(method, symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userWatchList"] });
    },
  });

  const handleFollowClick = () => {
    if (userWatchList.includes(instrumentSymbol)) {
      mutate({ method: "remove", symbol: instrumentSymbol });
    } else {
      mutate({ method: "add", symbol: instrumentSymbol });
    }
  };

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

  if (data.Note) {
    return (
      <div>
        <p>{instrumentSymbol}</p>
        <p>No more API calls.</p>
      </div>
    );
  }

  const dataKeys = Object.keys(data);
  console.log(dataKeys);
  console.log(dataKeys.length);

  // Get array of today's data
  const chartData =
    dataKeys.length > 1
      ? Object.entries(data[dataKeys[1]]).filter(
          (item) =>
            item[0].slice(0, 10) ===
            Object.entries(data[dataKeys[1]])[0][0].slice(0, 10)
        )
      : null;

  const currentValue =
    dataKeys.length > 1 ? Number(chartData[0][1]["4. close"]) : null;

  // Subtract today's value from the last value
  const changeValue =
    dataKeys.length > 1
      ? Number(
          ((currentValue - chartData[chartData.length - 1][1]["4. close"]) *
            100) /
            100
        )
      : null;

  const changePercentage =
    dataKeys.length > 1 ? changeValue / currentValue : null;

  return (
    <Link href={`instruments/noName/${instrumentSymbol}`}>
      {dataKeys.length > 1 ? (
        <div className="flex flex-row w-full gap-3 justify-between bg-white rounded-lg p-2">
          <div className="flex flex-row place-self-start gap-3">
            {userWatchList && (
              <AiFillStar
                size="1.25rem"
                className="text-orange-500 cursor-pointer self-center"
                onClick={handleFollowClick}
              />
            )}
            <div className="flex flex-col">
              <p className="font-bold text-explore-blue">{instrumentSymbol}</p>
              <span
                className={`${
                  changePercentage > 0 ? "text-green-400" : "text-red-400"
                } text-sm font-bold`}
              >
                {formatLocalPercentage(changePercentage)}
              </span>
            </div>
          </div>
          <div className="flex-1 self-center flex justify-center items-center">
            <Chart
              chartData={chartData}
              changePercentage={changePercentage}
              height={50}
              width="50%"
              size="small"
            />
          </div>
          <div className="place-self-end flex flex-row self-center items-center gap-3">
            <p className="font-bold text-explore-blue">
              {formatLocalUSD(currentValue)}
            </p>
            <SlOptionsVertical className="text-gray-400" />
          </div>
        </div>
      ) : (
        "API out of calls"
      )}
    </Link>
  );
};

export default WatchListItem;
