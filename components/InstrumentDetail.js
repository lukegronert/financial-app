import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import Chart from "./Chart";
import NewsTab from './NewsTab';

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

import data from "../mockData/IBMIntraDay";
import appleNews from '../mockData/AppleNews';

const InstrumentDetail = () => {
  const [plusMinus, setPlusMinus] = useState("+");
  const [changePercentage, setChangePercentage] = useState(null);

  const router = useRouter();
  const { instrumentName, instrumentSymbol } = router.query;

  const timeData = Object.entries(data["Time Series (30min)"]);

  const dayData = Object.values(timeData).filter(
    (obj) => obj[0].split(" ")[0] === timeData[0][0].split(" ")[0]
  );

  const currentValue = Number(dayData[0][1]["4. close"]).toFixed(2);
  const changeValue = (
    ((currentValue - Number(dayData[dayData.length - 1][1]["4. close"])) *
      100) /
    100
  ).toFixed(2);

  const getChangePercentage = () => {
    let change = ((changeValue / currentValue) * 100).toFixed(2);
    change.replace("-", "");
    setChangePercentage(change);
  };

  const onTimeButtonClick = (e) => {
    const activeStyles = ['active', 'bg-explore-blue', 'text-white']
    if(!e.target.classList.contains('active')){
        let activeButton = document.querySelector('.active')
        activeButton.classList.remove(...activeStyles)
        e.currentTarget.classList.add(...activeStyles)
    }
  }

  const chartData = dayData.map((arr) => arr[1]).reverse();

  const newsData = appleNews['feed'];
  
  const timeButtonList = [
    {
        text: '1d',
    },
    {
        text: '5d',
    },
    {
        text: '30d',
    },
    {
        text: '90d',
    },
    {
        text: '6m',
    },
    {
        text: '1y',
    },
    {
        text: 'All',
    },
  ]

    let changePercentageStyling;
    const getChangePercentageStyling = () => {
        if(plusMinus === '+') {
            changePercentageStyling = 'text-xs font-bolder text-green-100 bg-green-400'
        } else {
            changePercentageStyling = 'text-xs font-bolder text-red-100 bg-red-400'
        }
    }

  useEffect(() => {
    if (changeValue > 0) {
      setPlusMinus("-");
    }
    getChangePercentage();
    getChangePercentageStyling();
  }, []);

  return (
    <div className="bg-gradient-to-t from-explore-gray w-max h-screen">
      <div className="w-full px-3">
        <div className="flex flex-row w-full justify-between items-center py-3">
          <div>
            <IoIosArrowRoundBack size="2rem" className="text-gray-800 cursor-pointer" onClick={() => router.back()} />
          </div>
          <div className="flex flex-row gap-2">
            <AiFillStar size="1.25rem" className="text-orange-500" />
            <FiShare size="1.25rem" className="text-gray-800" />
          </div>
        </div>
        <div>
          <p className="text-gray-400 font-bold text-sm py-1">{instrumentSymbol}</p>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-explore-blue py-1">{instrumentName}</h1>
        </div>
        <div className="flex flex-row items-center pb-2 gap-2">
          <span className="text-gray-700 text-lg font-semibold">{`$${currentValue}`}</span>
          {plusMinus === '+' ? (
            <span className="text-xs font-bold text-green-400 bg-green-100 p-1 rounded-md">{`${plusMinus}${changePercentage}%`}</span>
          ) : (
            <span className="text-xs font-bold text-red-400 bg-red-100 p-1 rounded-md">{`${plusMinus}${changePercentage}%`}</span>
          )}
          <span className="text-xs text-gray-400 font-bold">{`${plusMinus}$${changeValue}`}</span>
        </div>
        <div className="flex flex-row justify-evenly items-center">
          {timeButtonList.map((button) => {
            if(button.text === '1d') {
                return (
                    <button className="w-3/4 p-2 active bg-explore-blue text-white" onClick={onTimeButtonClick} key={button.text}>{button.text}</button>
                )
            } else {
                return (
                    <button className="w-3/4 p-2" onClick={onTimeButtonClick} key={button.text}>{button.text}</button>
                )
            }
          })}
        </div>
        <Chart chartData={chartData} />
        <div className="flex justify-center mt-3">
            <button className="p-3 text-lg font-bold text-white bg-blue-600 w-full rounded-lg">Follow</button>
        </div>
      </div>
      <div className="mt-10 bg-white p-3 w-full flex flex-col">
        <p className="w-1/6 border-b border-4 self-center rounded-xl"></p>
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-extrabold text-explore-blue">News</p>
            <div className="flex flex-row items-center text-blue-600 font-bold text-sm">
                <span>See all</span>
                <IoIosArrowRoundForward size="1.25em" />
            </div>
        </div>
        <div className="flex flex-col p-3 w-full">
            {newsData.map((data, i) => {
                while(i < 5) {
                    return (
                        <NewsTab data={data} key={data.title} />
                    )
                }
            })}
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
