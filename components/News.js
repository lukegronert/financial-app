import React from "react";
import NewsTab from "./NewsTab";
import SeeAll from "./SeeAll";

const News = ({ newsData, limit, seeAll }) => {
  return (
    <>
      <div className="mt-10 bg-white p-3 w-full flex flex-col">
        <p className="w-1/6 border-b border-4 self-center rounded-xl"></p>
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-extrabold text-explore-blue">News</p>
          {seeAll && <SeeAll />}
        </div>
        <div className="flex flex-col p-3 w-full">
          {newsData.map((data, i) => {
            while (i < limit) {
              return <NewsTab data={data} key={data.title} />;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default News;
