import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} data-cy="back-button">
      <IoIosArrowRoundBack size="2rem" className="text-gray-800" />
    </button>
  );
};

export default BackButton;
