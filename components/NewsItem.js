import React from "react";
import { BsDot } from "react-icons/bs";
import Link from "next/link";

const NewsTab = ({ data }) => {
  const timeNow = new Date();
  const timePublished = data.time_published;
  const timePublishedYear = timePublished.slice(0, 4);
  const timePublishedMonth = timePublished.slice(4, 6);
  const timePublishedDay = timePublished.slice(6, 8);
  const timePublishedHour = timePublished.slice(9, 11);
  const timePublishedMinute = timePublished.slice(11, 13);
  const timePublishedSeconds = timePublished.slice(13, 15);
  const timePublishedDate = new Date(
    `${timePublishedYear}-${timePublishedMonth}-${timePublishedDay}T${timePublishedHour}:${timePublishedMinute}:${timePublishedSeconds}Z`
  );
  const timeDifference = Math.floor(
    (timeNow - timePublishedDate) / 1000 / 60 / 60
  );
  // const timePublished = data.time_published.slice(9,15)
  // const timeNow = new Date().toJSON().slice(11, 19).replace(':','').replace(':','')
  // const timeSinceHours = timeNow.slice(0,2) - timePublished.slice(0,2);

  return (
    <Link href={data.url}>
      <div className="w-full flex flex-row items-centers border rounded-lg p-2">
        <div className="flex justify-center items-center self-center rounded-full border h-16 w-16 p-3">
          <div className="h-10 w-10 flex justify-center items-center text-center">
            <img
              src={data.banner_image}
              height={50}
              className="max-h-10 w-10"
            />
          </div>
        </div>
        <div>
          <p className="text-explore-blue font-bold">
            {data.title.length > 70
              ? `${data.title.slice(0, 70)}...`
              : data.title}
          </p>
          <div className="flex flex-row items-center text-gray-400 font-semibold text-sm grow">
            <span>{data.source}</span>
            <BsDot size="1.5rem" />
            <span>{timeDifference}h ago</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsTab;
