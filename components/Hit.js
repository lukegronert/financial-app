import React from "react";
import { useRouter } from "next/navigation";

const ExploreInstrumentDetail = ({ hit }) => {
  const router = useRouter();

  const onFollowClick = (e) => {
    e.stopPropagation();
    // Add item to watchList and change color and text
  };

  return (
    <div
      className="flex flex-col w-full h-full justify-between gap-1 cursor-pointer"
      onClick={() => router.push(`/instruments/${hit.name}/${hit.symbol}`)}
    >
      {/* Adds logo centered in circle border as shown in challenge pictures */}
      {/* <div className="flex justify-center items-center self-center rounded-full border h-16 w-16 p-3 mb-2">
            <div className="h-10 w-10 flex justify-center items-center">
                <img src={logo.src} alt={`${name} logo`} className="max-h-10 w-10" />
          </div>
      </div> */}
      <p className="font-extrabold text-lg text-explore-blue flex-1">
        {hit.name.length > 25 ? `${hit.name.slice(0, 25)}...` : hit.name}
      </p>
      <p>{hit.symbol}</p>
      <button
        className="bg-explore-blue text-white font-bold self-center w-10/12 p-2 rounded-lg hover:bg-white hover:border hover:outline-explore-blue h-content hover:text-explore-blue"
        onClick={onFollowClick}
      >
        Follow
      </button>
    </div>
  );
};

export default ExploreInstrumentDetail;
