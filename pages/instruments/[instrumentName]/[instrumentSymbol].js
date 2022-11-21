import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import InstrumentDetail from "../../../components/InstrumentDetail";

const DynamicInstrumentDetail = dynamic(
  () => import("../../../components/InstrumentDetail"),
  {
    ssr: false,
  }
);

const InstrumentId = () => {
  return (
    <div>
      <Suspense fallback={`Loading...`}>
        <DynamicInstrumentDetail />
      </Suspense>
    </div>
  );
};

export default InstrumentId;
