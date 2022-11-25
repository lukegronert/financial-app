import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Chart from "./Chart";
import NewsList from "./NewsList";
import BackButton from "./BackButton";
import ShareButtons from "./ShareButtons";
import { TailSpin } from "react-loader-spinner";

import { getTimeData } from "../utils/apiQueries";
import { getUserWatchList,updateUserWatchList } from "../utils/firestoreClient";
import {
  formatLocalPercentage,
  formatLocalUSD,
} from "../utils/formatDataFunctions";

import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

const InstrumentDetail = () => {
  const [selectedTimeButton, setSelectedTimeButton] = useState("1d");
  const [showShareButtons, setShowShareButtons] = useState(false);
  const router = useRouter();
  const { instrumentName, instrumentSymbol } = router.query;

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`${instrumentSymbol}${selectedTimeButton}`],
    queryFn: () => getTimeData(instrumentSymbol, selectedTimeButton),
  });

  const { isLoading: watchListIsLoading, isError: watchListIsError, data: userWatchList, error: watchListError } = useQuery({
    queryKey: [`userWatchList`],
    queryFn: () => getUserWatchList(),
  });

  const {mutate, isLoading: mutationIsLoading, isError: mutationIsError, isSuccess: mutationIsSuccess} = useMutation({
    mutationFn: ({method, symbol}) => updateUserWatchList(method, symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWatchList'] })
    },
  })

  const timeButtonList = ["1d", "5d", "30d", "90d", "6m", "1y", "All"];

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

  if (data.Note) {
    return (
      <div>
        <BackButton />
        <p>No more API calls.</p>
      </div>
    );
  }

  const dataKeys = Object.keys(data);

  const chartData =
    selectedTimeButton === "1d"
      ? Object.entries(data[dataKeys[1]]).filter(
          (item) =>
            item[0].slice(0, 10) ===
            Object.entries(data[dataKeys[1]])[0][0].slice(0, 10)
        )
      : selectedTimeButton === "5d"
      ? Object.entries(data[dataKeys[1]])
      : selectedTimeButton === "30d"
      ? Object.entries(data[dataKeys[1]]).filter(
          (item, i) => i < 28 && i % 7 === 0
        )
      : selectedTimeButton === "90d"
      ? Object.entries(data[dataKeys[1]]).filter((item, i) => i < 12)
      : selectedTimeButton === "1y"
      ? Object.entries(data[dataKeys[1]]).filter((item, i) => i < 12)
      : Object.entries(data[dataKeys[1]]);

  const currentValue = Number(chartData[0][1]["4. close"]);

  const changeValue = Number(
    ((currentValue - chartData[chartData.length - 1][1]["4. close"]) * 100) /
      100
  );

  const changePercentage =
    changeValue / chartData[chartData.length - 1][1]["4. close"];

  return (
    <div className="bg-gradient-to-t from-explore-gray w-full h-screen">
      {showShareButtons && <ShareButtons instrumentSymbol={instrumentSymbol} />}
      <div className="w-full p-3">
        <div className="flex flex-row w-full justify-between items-center py-3">
          <BackButton />
          <div className="flex flex-row gap-2">
            <AiFillStar
              size="1.25rem"
              className="text-orange-500 cursor-pointer"
              onClick={
                userWatchList.includes(instrumentSymbol)
                  ? () => mutate({method: "remove", symbol: instrumentSymbol})
                  : () => mutate({method:"add", symbol: instrumentSymbol})
              }
            />
            <FiShare
              size="1.25rem"
              className="text-gray-800 cursor-pointer"
              onClick={() => setShowShareButtons(!showShareButtons)}
            />
          </div>
        </div>
        <div>
          <p className="text-gray-400 font-bold text-sm py-1">
            {instrumentSymbol}
          </p>
        </div>
        {instrumentName === "noName" ? (
          <></>
        ) : (
          <div>
            <h1 className="text-2xl font-extrabold text-explore-blue py-1">
              {instrumentName}
            </h1>
          </div>
        )}
        <div className="flex flex-row items-center pb-2 gap-2">
          <span className="text-gray-700 text-lg font-semibold">
            {formatLocalUSD(currentValue)}
          </span>

          {changePercentage > 0 ? (
            <span className="text-xs font-bold text-green-400 bg-green-100 p-1 rounded-md">
              {formatLocalPercentage(changePercentage)}
            </span>
          ) : (
            <span className="text-xs font-bold text-red-400 bg-red-100 p-1 rounded-md">
              {formatLocalPercentage(changePercentage)}
            </span>
          )}

          <span className="text-xs text-gray-400 font-bold">
            {formatLocalUSD(changeValue)}
          </span>
        </div>
        <div className="flex flex-row justify-evenly items-center py-3">
          {timeButtonList.map((buttonText) => {
            return (
              <button
                className={
                  selectedTimeButton === buttonText
                    ? "w-3/4 p-1 bg-explore-blue text-white rounded-xl"
                    : "w-3/4 p-1 rounded-xl"
                }
                onClick={() => setSelectedTimeButton(buttonText)}
                key={buttonText}
              >
                {buttonText}
              </button>
            );
          })}
        </div>
        <div className="w-full flex flex-col items-align text-center justify-center">
          <Chart
            chartData={chartData}
            changePercentage={changePercentage}
            height={screen.height / 3}
            width="95%"
          />
        </div>
        <div className="flex justify-center mt-3">
          {userWatchList.includes(instrumentSymbol) ? (
            <button
              className="p-3 mb-5 text-lg font-bold bg-white border border-blue-600 text-blue-600 w-full rounded-lg cursor-pointer"
              onClick={() => mutate({method: "remove", symbol: instrumentSymbol})}
            >
              Followed
            </button>
          ) : (
            <button
              className="p-3 mb-5 text-lg font-bold text-white bg-blue-600 w-full rounded-lg cursor-pointer"
              onClick={() => mutate({method: "add", symbol: instrumentSymbol})}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <NewsList limit={5} seeAll={true} instrumentSymbol={instrumentSymbol} />
    </div>
  );
};

export default InstrumentDetail;
