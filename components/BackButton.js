import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <span className="sr-only">Back</span>
      <IoIosArrowRoundBack size="2rem" className="text-gray-800" />
    </button>
  );
};

export default BackButton;
