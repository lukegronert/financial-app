import React, { useEffect } from 'react';

const ExploreInstrumentDetail = ({ hit }) => {

  return (
    <div className="flex flex-col w-full h-full justify-between">
        {/* <div className="flex justify-center items-center self-center rounded-full border h-16 w-16 p-3 mb-2">
            <div className="h-10 w-10 flex justify-center items-center">
                <img src={logo.src} alt={`${name} logo`} className="max-h-10 w-10" />
            </div>
        </div> */}
        <p className="font-extrabold text-xl text-explore-blue">{hit.name}</p>
        <button className="bg-explore-blue text-white font-bold self-center w-10/12 p-2 rounded-lg">Follow</button>
    </div>
  )
}

export default ExploreInstrumentDetail