import React from "react";
import Search from "../components/Search";
import { useRouter } from 'next/router';
import { auth } from "../firebase/clientApp";
import Link from "next/link";

import { RiCloseLine } from "react-icons/ri";

const Explore = () => {
  const router = useRouter();

  if(!auth.currentUser) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>Please sign in and try again.</p>
        <Link href="/" className="underline">Go to sign in page</Link>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-explore-gray">
      <div className="bg-white rounded-t-lg">
        <div className="flex flex-row justify-between items-center py-3 px-3">
          <h1 className="text-explore-blue font-extrabold text-3xl">Welcome!</h1>
          <RiCloseLine size="1.5em" onClick={() => router.push('/dashboard')} className="cursor-pointer" />
        </div>
        <p className="font-bold text-gray-400 px-3 mb-3">
          Choose your interests to follow and trade on your terms.
        </p>
        <Search />
      </div>
    </div>
  );
};

export default Explore;
