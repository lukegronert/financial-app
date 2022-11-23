import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chart from "./Chart";
import News from "./News";
import BackButton from "./BackButton";

import { LineWave } from "react-loader-spinner";

import { getData } from '../utils/apiFunctions';

import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

import appleNews from "../mockData/AppleNews";

const InstrumentDetail = () => {
  const [displayData, setDisplayData] = useState({
    currentValue: 0,
    changeValue: 0,
    changePercentage: 0,
    chartData: null,
    plusMinus: '',
  });
  const [timeButtonSelected, setTimeButtonSelected] = useState('1d');

  const router = useRouter();
  const { instrumentName, instrumentSymbol } = router.query;

  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: [`${instrumentSymbol}`],
    queryFn: () => getData(instrumentSymbol, timeButtonSelected === '1d' || timeButtonSelected === '5d' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_WEEKLY'),
  });
  
  useEffect(() => {
    if(!isLoading) {
      getDisplayData();
    }
  }, [data])

  const getDisplayData = () => {
    const dataArray = Object.entries(data[(`Time Series (${timeButtonSelected === '1d' || timeButtonSelected === '5d' ? '30min' : ''})`)]);
    console.log(dataArray)
    const currentValue = Number(dataArray[0][1]['4. close']).toFixed(2);
    console.log(currentValue);
    if(timeButtonSelected === '1d') {
      const mostRecentDayArray = dataArray.filter((item) => item[0].slice(0,10) === dataArray[0][0].slice(0,10))
      console.log('day array',mostRecentDayArray)
      let changeValue = (((currentValue - mostRecentDayArray[mostRecentDayArray.length - 1][1]["4. close"]) *
        100) / 100).toFixed(2);
      changeValue = changeValue.toString().replace('-','');
      console.log('changeval', changeValue)
      let changePercentage = ((Number(changeValue) / Number(currentValue)) * 100).toFixed(2);
      changePercentage = changePercentage.toString().replace('-','');
      console.log('change%', changePercentage);
      let plusMinus;
      changeValue > 0 ? plusMinus = '+' : plusMinus = '-';
      setDisplayData({
        currentValue,
        changeValue,
        changePercentage,
        chartData: mostRecentDayArray,
        plusMinus
      })
    }
  }

  const newsData = appleNews;
  
  const timeButtonList = [
    {
      text: "1d",
    },
    {
      text: "5d",
    },
    {
      text: "30d",
    },
    {
      text: "90d",
    },
    {
      text: "6m",
    },
    {
      text: "1y",
    },
    {
      text: "All",
    },
  ];
  
  const onTimeButtonClick = (e) => {
    const activeStyles = ["active", "bg-explore-blue", "text-white"];
    if (!e.target.classList.contains("active")) {
      let activeButton = document.querySelector(".active");
      activeButton.classList.remove(...activeStyles);
      e.currentTarget.classList.add(...activeStyles);
      setTimeButtonSelected(e.target.textContent)
    }
  };

  if(isError) {
    return <div>No API calls</div>
  }

  return !isLoading ? (
    <div className="bg-gradient-to-t from-explore-gray w-max h-screen">
      <div className="w-full px-3">
        <div className="flex flex-row w-full justify-between items-center py-3">
          <BackButton />
          <div className="flex flex-row gap-2">
            <AiFillStar size="1.25rem" className="text-orange-500" />
            <FiShare size="1.25rem" className="text-gray-800" />
          </div>
        </div>
        <div>
          <p className="text-gray-400 font-bold text-sm py-1">
            {instrumentSymbol}
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-explore-blue py-1 w-screen">
            {instrumentName}
          </h1>
        </div>
        <div className="flex flex-row items-center pb-2 gap-2">
        <span className="text-gray-700 text-lg font-semibold">{`$${displayData.currentValue}`}</span>
         {displayData.plusMinus === "+" ? (
              <span className="text-xs font-bold text-green-400 bg-green-100 p-1 rounded-md">{`${displayData.plusMinus}${displayData.changePercentage}%`}</span>
            ) : (
              <span className="text-xs font-bold text-red-400 bg-red-100 p-1 rounded-md">{`${displayData.plusMinus}${displayData.changePercentage}%`}</span>
            )}
            <span className="text-xs text-gray-400 font-bold">{`${displayData.plusMinus}$${displayData.changeValue}`}</span>
          </div>
          <div className="flex flex-row justify-evenly items-center py-3">
            {timeButtonList.map((button) => {
              if (button.text === "1d") {
                return (
                  <button
                    className="w-3/4 p-1 active bg-explore-blue text-white rounded-xl"
                    onClick={onTimeButtonClick}
                    key={button.text}
                  >
                    {button.text}
                  </button>
                );
              } else {
                return (
                  <button
                    className="w-3/4 p-1 rounded-xl"
                    onClick={onTimeButtonClick}
                    key={button.text}
                  >
                    {button.text}
                  </button>
                );
              }
            })}
          </div>
          {displayData.chartData !== null ? (
            <Chart chartData={displayData.chartData} plusMinus={displayData.plusMinus} className="mx-auto" />
          ) : (
            <div>Loading...</div>
          )}
        <div className="flex justify-center mt-3">
          <button className="p-3 mb-5 text-lg font-bold text-white bg-blue-600 w-full rounded-lg">
            Follow
          </button>
        </div>
      </div>
      <News newsData={newsData} limit={5} seeAll={true} />
    </div>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center">
      <LineWave
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        visible={true}
      />
    </div>
  )
};

export default InstrumentDetail;
