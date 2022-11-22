import React, { useEffect, useState } from "react";

const gainerLoser = ({ data, status }) => {
    const [change, setChange] = useState(null);
    const [changePercentage, setChangePercentage] = useState(null);
    console.log(data)
    // changePercentage = changePercentage.toString().replace('-','');

    useEffect(() => {
        let changePercentageWithMinus = Number(data.changesPercentage).toFixed(2);
        setChangePercentage(changePercentageWithMinus.toString().replace('-',''))
      if(data.change) {;
        setChange(Number(data.change).toFixed(2));
      } else {
        let changeWithMinus = data.changes.toFixed(2);
        setChange(changeWithMinus.toString().replace('-',''))
      }
      console.log('change', change)
    }, [])
    

  return (
    <div className="flex flex-col flex-1 justify-evenly bg-white rounded-xl p-2 gap-1">
      {status === "gainer" ? (
        <>
          <h2 className="flex-1 text-explore-blue font-extrabold">{data.name}</h2>
          <span className="text-explore-blue font-bold">{`$${data.price}`}</span>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-green-400 bg-green-100 font-bold text-sm px-1 py-0.5 rounded-md">{`+ ${changePercentage}`}</span>
            <span className="text-gray-400 font-bold text-sm">{`$${change}`}</span>
          </div>
        </>
      ) : (
        <>
          <h2 className="flex-1 text-explore-blue font-extrabold w-full h-full">{data.companyName}</h2>
          <span className="text-explore-blue font-bold">{`$${data.price}`}</span>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-red-400 bg-red-100 font-bold text-sm px-1 py-0.5 rounded-md">{`- ${changePercentage}`}</span>
            <span className="text-gray-400 font-bold text-sm">{`- $${change}`}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default gainerLoser;
