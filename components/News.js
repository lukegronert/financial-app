import React from "react";
import NewsItem from "./NewsItem";
import SeeAll from "./SeeAll";
import BackButton from "./BackButton";

const News = ({ newsData, limit, seeAll, backButton }) => {
  return (
    <div className="p-3 w-full bg-white">
      {backButton && (
        <BackButton />
      )}
      <div className="bg-white flex flex-col justify-start">
        {seeAll && (
          <p className="w-1/6 border-b border-4 self-center rounded-xl"></p>
        )}
        <div className="flex flex-row justify-between items-center py-2 px-2">
          <p className="text-xl font-extrabold text-explore-blue">News</p>
          {seeAll && <SeeAll path='/news/apple' />}
        </div>
        <div className="flex flex-col gap-3 items-center mx-auto">
          {newsData.map((data, i) => {
            while (i < limit) {
              return <NewsItem data={data} key={data.title} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
