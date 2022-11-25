import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/clientApp";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";

import InstrumentDetail from "../../../components/InstrumentDetail";

const InstrumentId = () => {
  const user = auth.currentUser;
  
  return (
    <div>
      <InstrumentDetail />
    </div>
  );
};

export default InstrumentId;
