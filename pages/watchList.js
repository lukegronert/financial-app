import React from "react";
import WatchList from "../components/WatchList";

const WatchListPage = () => {
  return <WatchList limit={50} seeAll={false} backButton={true} />;
};

export default WatchListPage;
