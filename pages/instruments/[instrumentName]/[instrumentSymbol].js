import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";

import InstrumentDetail from "../../../components/InstrumentDetail";

const InstrumentId = () => {
  const user = auth.currentUser;

  if(!auth.currentUser) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>Please sign in and try again.</p>
        <Link href="/" className="underline">Go to sign in page</Link>
      </div>
    )
  }
  
  return (
    <div>
      <InstrumentDetail />
    </div>
  );
};

export default InstrumentId;
