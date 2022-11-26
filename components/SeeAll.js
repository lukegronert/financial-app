import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/router";

const SeeAll = ({ path, dataCy }) => {
  const router = useRouter();
  return (
    <button
      className="flex flex-row items-center text-blue-600 font-bold text-sm cursor-pointer"
      onClick={() => router.push(`/${path}`)}
      data-cy={dataCy}
    >
      <span>See all</span>
      <IoIosArrowRoundForward size="1.25em" />
    </button>
  );
};

export default SeeAll;
