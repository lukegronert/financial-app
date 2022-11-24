import React from 'react';
import { BsDot } from 'react-icons/bs';
import Link from "next/link";

const NewsTab = ({ data }) => {
    const timePublished = data.time_published.slice(9,15)
    const timeNow = new Date().toJSON().slice(11, 19).replace(':','').replace(':','')
    const timeSinceHours = timeNow.slice(0,2) - timePublished.slice(0,2);
    

  return (
    <Link href={data.url}>
    <div className="w-screen h-max flex flex-row items-centers h-1/5 border rounded-lg p-2">
        <div className="flex justify-center items-center self-center rounded-full border h-16 w-16 p-3">
            <div className="h-10 w-10 flex justify-center items-center text-center">
                <img src={data.banner_image} height={50} className="max-h-10 w-10" />
            </div>
        </div>
        <div>
            <p className="text-explore-blue font-bold break-words">{data.title.length > 70 ? `${data.title.slice(0,70)}...` : data.title}</p>
            <div className="flex flex-row items-center text-gray-400 font-semibold text-sm grow">
                <span>{data.source}</span>
                <BsDot size='1.5rem' />
                <span>{timeSinceHours}h ago</span>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default NewsTab