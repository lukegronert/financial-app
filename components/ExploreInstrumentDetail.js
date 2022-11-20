import React from 'react';

const ExploreInstrumentDetail = ({ hit }) => {

  return (
    <div className="flex flex-col w-full h-full justify-between gap-1">
        {/* Adds logo centered in circle border as shown in challenge pictures */}
        {/* <div className="flex justify-center items-center self-center rounded-full border h-16 w-16 p-3 mb-2">
              <div className="h-10 w-10 flex justify-center items-center">
                  <img src={logo.src} alt={`${name} logo`} className="max-h-10 w-10" />
            </div>
        </div> */}
        <p className="font-extrabold text-lg text-explore-blue flex-1">{hit.name.length > 25 ? `${hit.name.slice(0,25)}...` : hit.name}</p>
        <p>{hit.symbol}</p>
        <button className="bg-explore-blue text-white font-bold self-center w-10/12 p-2 rounded-lg">Follow</button>
    </div>
  )
}

export default ExploreInstrumentDetail