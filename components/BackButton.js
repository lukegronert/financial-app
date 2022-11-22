import React from "react";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';

const backButton = () => {
    const router = useRouter();
  return (
    <div>
      <IoIosArrowRoundBack
        size="2rem"
        className="text-gray-800 cursor-pointer"
        onClick={() => router.back()}
      />
    </div>
  );
};

export default backButton;
