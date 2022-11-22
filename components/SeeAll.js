import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from 'next/router';

const SeeAll = ({ path }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center text-blue-600 font-bold text-sm" onClick={() => router.push(`/${path}`)}>
      <span>See all</span>
      <IoIosArrowRoundForward size="1.25em" />
    </div>
  );
};

export default SeeAll;
