import React from "react";
import GainersAndLosers from "../components/GainersAndLosers";

const gainersAndLosers = () => {
  return <GainersAndLosers colLimit={30} seeAll={false} backButton={true} />;
};

export default gainersAndLosers;
