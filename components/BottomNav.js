import React from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/clientApp";

import { ImArrowUp } from "react-icons/im";
import { FaRegUserCircle } from "react-icons/fa";

const BottomNav = () => {
  const router = useRouter();
  const user = auth.currentUser;

  // If no user, or user has not loaded yet, show an empty
  if (!user) {
    return <></>;
  }

  return (
    <div className="flex flex-row justify-evenly items-center gap-16 fixed bottom-0 bg-white w-screen text-gray-400 pb-6 pt-3">
      <button
        className={
          router.pathname === "/dashboard"
            ? "flex flex-col items-center cursor-pointer text-blue-600"
            : "flex flex-col items-center cursor-pointer"
        }
        onClick={() => router.push("/dashboard")}
      >
        <ImArrowUp size="1.25rem" />
        <span className="text-sm font-bold">Dashboard</span>
      </button>
      {user && (
        <button
          className={
            router.pathname === "/portfolio"
              ? "flex flex-col items-center cursor-pointer text-blue-600"
              : "flex flex-col items-center cursor-pointer"
          }
          onClick={(e) => router.push("/watchList/userId")}
        >
          <FaRegUserCircle size="1.25rem" />
          <span className="text-sm font-bold">Portfolio</span>
        </button>
      )}
    </div>
  );
};

export default BottomNav;
