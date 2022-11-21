import React from "react";
import { useRouter } from "next/router";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

const InstrumentDetail = () => {
  const router = useRouter();
  const { instrumentName, instrumentSymbol } = router.query;

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
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
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
