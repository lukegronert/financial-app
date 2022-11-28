import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";

const SeeAll = ({ path }) => {
  const router = useRouter();
  return (
    <Link
      className="flex flex-row items-center text-blue-600 font-bold text-sm cursor-pointer"
      href={`${path}`}
    >
      <span>See all</span>
      <IoIosArrowRoundForward size="1.25em" />
    </Link>
  );
};

export default SeeAll;
