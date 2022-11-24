import React from "react";
import { useQuery } from '@tanstack/react-query';
import { getNewsData } from "../utils/apiQueries";
import { TailSpin } from "react-loader-spinner";
import NewsItem from "./NewsItem";
import SeeAll from "./SeeAll";
import BackButton from "./BackButton";

const News = ({ limit, seeAll, backButton, instrumentSymbol }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`${instrumentSymbol}news`],
    queryFn: () => getNewsData(instrumentSymbol)
  })

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="#09183d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data)
  const newsData = data['feed']

  return (
    <div>
      {backButton && (
        <BackButton />
      )}
      <div className="bg-white flex flex-col justify-start">
        {seeAll && (
          <p className="w-1/6 border-b border-4 self-center rounded-xl"></p>
        )}
        <div className="flex flex-row justify-between items-center py-2 px-2">
          <p className="text-xl font-extrabold text-explore-blue p-3">News</p>
          {seeAll && <SeeAll path={`news/${instrumentSymbol}`} />}
        </div>
        <div className="grid grid-cols-1 gap-3 items-center w-screen mx-auto">
          {newsData ? (
            newsData.map((data, i) => {
              while (i < limit) {
                return <NewsItem data={data} key={data.title} />;
              }
            })
          ) : (
            <div className="h-80 flex flex-col items-center">
              <p>No news to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
