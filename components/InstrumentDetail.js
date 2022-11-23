import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Chart from "./Chart";
import News from "./News";
import BackButton from "./BackButton";

import { getData } from '../utils/apiFunctions';

import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

import appleNews from "../mockData/AppleNews";
import { RiDatabaseLine } from "react-icons/ri";

const InstrumentDetail = () => {
  const [plusMinus, setPlusMinus] = useState("+");
  const [chartData, setChartData] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const dataArrayRef = useRef([])
  const [currentValue, setCurrentValue] = useState(0);
  const currentValueRef = useRef(0);
  const [changeValue, setChangeValue] = useState(0);
  const changeValueRef = useRef(0);
  const [changePercentage, setChangePercentage] = useState(0);
  const changePercentageRef = useRef(0);
  const [mostRecentDayArray, setMostRecentDayArray] = useState([]);
  const mostRecentDayArrayRef = useRef([]);

  const router = useRouter();
  const { instrumentName, instrumentSymbol } = router.query;

  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: [`${instrumentSymbol}`],
    queryFn: () => getData(instrumentSymbol, '30min'),
  }, {
    cacheTime: 1800
  });
  
  useEffect(() => {
    if(!isLoading) {
      getCurrentValue()
      getChangeValue()
      getChangePercentageValue()
    }
  }, [isSuccess])

    // const timeObjArrayVal = Object.entries(data['Time Series (30min)']);
    const getCurrentValue = () => {
      dataArrayRef.current = Object.entries(data['Time Series (30min)']);
      console.log(dataArrayRef.current)
      setDataArray(dataArrayRef.current);
      const currentVal = dataArrayRef.current[0][1]['4. close'];
      const currentValToTwoDecimals = Number(currentVal).toFixed(2)
      currentValueRef.current = currentValToTwoDecimals;
      setCurrentValue(currentValueRef.current)
    }
  
    const getChangeValue = () => {
      mostRecentDayArrayRef.current = dataArrayRef.current.filter((item) => item[0].slice(0,10) === dataArrayRef.current[0][0].slice(0,10))
      console.log(mostRecentDayArrayRef)
      setMostRecentDayArray(mostRecentDayArrayRef.current)
      const changeVal = (
        ((currentValue - mostRecentDayArrayRef.current[mostRecentDayArrayRef.current.length - 1][1]["4. close"]) *
          100) /
        100
      ).toFixed(2);
      changeValueRef.current = changeVal;
      setChangeValue(changeValueRef.current)
    };
  
    const getChangePercentageValue = () => {
      let changePercentVal = ((Number(changeValue) / Number(currentValue)) * 100).toFixed(2);
      let changePercentValString = changePercentVal.toString().replace("-", "");
      changePercentageRef.current = changePercentValString;
      setChangePercentage(changePercentageRef.current);
    };

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
    }
  };

  useEffect(() => {
      if (changePercentage.current > 0) {
        setPlusMinus("-");
    }
  }, []);
  {
    isLoading && <div>Loading...</div>;
  }
  return (
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
          <h1 className="text-2xl font-extrabold text-explore-blue py-1">
            {instrumentName}
          </h1>
        </div>
        <div className="flex flex-row items-center pb-2 gap-2">
        <span className="text-gray-700 text-lg font-semibold">{`$${currentValue}`}</span>
         {plusMinus === "+" ? (
              <span className="text-xs font-bold text-green-400 bg-green-100 p-1 rounded-md">{`${plusMinus}${changePercentage}%`}</span>
            ) : (
              <span className="text-xs font-bold text-red-400 bg-red-100 p-1 rounded-md">{`${plusMinus}${changePercentage}%`}</span>
            )}
            <span className="text-xs text-gray-400 font-bold">{`${plusMinus}$${changeValue}`}</span>
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
          {/* {!isLoading && <Chart chartData={chartData} />} */}
        <div className="flex justify-center mt-3">
          <button className="p-3 mb-5 text-lg font-bold text-white bg-blue-600 w-full rounded-lg">
            Follow
          </button>
        </div>
      </div>
      <News newsData={newsData} limit={5} seeAll={true} />
    </div>
  );
};

export default InstrumentDetail;
