import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

import data from "../mockData/IBMIntraDay";

const InstrumentDetail = () => {
  const [plusMinus, setPlusMinus] = useState("+");
  const [changePercentage, setChangePercentage] = useState(null);

  const router = useRouter();
  const { instrumentName, instrumentSymbol } = router.query;

  const timeData = Object.entries(data["Time Series (30min)"]);
  console.log(timeData)
  console.log(timeData[0][0].split(" ")[0]);
  const dayData = Object.values(timeData).filter(
    (obj) => obj[0].split(" ")[0] === timeData[0][0].split(" ")[0]
  );
  console.log("day data", dayData);
  const currentValue = Number(dayData[0][1]["4. close"]).toFixed(2);
  const changeValue = (
    ((currentValue - Number(dayData[dayData.length - 1][1]["4. close"])) *
      100) /100).toFixed(2);

  const getChangePercentage = () => {
    let change = ((changeValue / currentValue) * 100).toFixed(2);
    change.replace('-', '');
    setChangePercentage(change)
  }

  console.log("current", currentValue);
  console.log("changeValue", changeValue);
  console.log("differencePercentage", changePercentage);

  useEffect(() => {
    if(changeValue > 0) {
        setPlusMinus('-')
    }
    getChangePercentage()
  }, [])
  
  return (
    <div>
      <div>
        <div>
          <div>
            <IoIosArrowRoundBack />
          </div>
          <div>
            <AiFillStar />
            <FiShare />
          </div>
        </div>
        <div>
          <p>{instrumentSymbol}</p>
        </div>
        <div>
          <h1>{instrumentName}</h1>
        </div>
        <div>
          <span>{`$${currentValue}`}</span>
          <span>{`${plusMinus} ${changePercentage}%`}</span>
          <span>{`${plusMinus} $${changeValue}`}</span>
        </div>
        <div>
          <button>1d</button>
          <button>5d</button>
          <button>30d</button>
          <button>90d</button>
          <button>6m</button>
          <button>1y</button>
          <button>All</button>
        </div>
        <div>GRAPH</div>
        <div>
          <button>FOLLOW</button>
        </div>
      </div>
      <div>
        <div>
          <p>News</p>
          <span>
            See all
            <IoIosArrowRoundForward />
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
