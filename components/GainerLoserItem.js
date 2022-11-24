import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const GainerLoserItem = ({ data, status }) => {
  const [change, setChange] = useState(null);
  const [changePercentage, setChangePercentage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let changePercentageWithMinus = Number(data.changesPercentage).toFixed(2);
    let changePercentageWithoutMinus = changePercentageWithMinus
      .toString()
      .replace("-", "");
    setChangePercentage(changePercentageWithoutMinus);
    if (data.change) {
      let changeToTwoDecimals = Number(data.change).toFixed(2);
      setChange(changeToTwoDecimals);
    } else {
      let changeWithMinus = data.changes.toFixed(2);
      let changeWithoutMinus = changeWithMinus.toString().replace("-", "");
      setChange(changeWithoutMinus);
    }
    console.log("change", change);
  }, []);

  return (
    <div
      className="flex flex-col flex-1 justify-evenly bg-white rounded-xl p-2 gap-1 cursor-pointer"
      onClick={() => router.push(`/instruments/${data.name}/${data.symbol}`)}
    >
      <h2 className="flex-1 text-explore-blue font-extrabold w-full h-full">
        {data.name}
      </h2>
      <span className="text-explore-blue font-bold">{`$${data.price.toFixed(
        2
      )}`}</span>
      <div className="flex flex-row gap-2 items-center">
        {status === "gainer" ? (
          <>
            <span className="text-green-400 bg-green-100 font-bold text-sm px-1 py-0.5 rounded-md">{`+ ${changePercentage}`}</span>
            <span className="text-gray-400 font-bold text-sm">{`$${change}`}</span>
          </>
        ) : (
          <>
            <span className="text-red-400 bg-red-100 font-bold text-sm px-1 py-0.5 rounded-md">{`- ${changePercentage}`}</span>
            <span className="text-gray-400 font-bold text-sm">{`- $${change}`}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default GainerLoserItem;
