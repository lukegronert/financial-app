import React from 'react';
import { BsDot } from 'react-icons/bs';

const NewsTab = ({ data }) => {
    const timePublished = data.time_published.slice(9,15)
    const timeNow = new Date().toJSON().slice(11, 19).replace(':','').replace(':','')
    const timeSinceHours = `${timeNow.slice(0,2) - timePublished.slice(0,2)}`;

    console.log(timePublished)
    console.log(timeSinceHours);
  return (
    <div className="w-screen flex flex-row items-center h-1/5 border mx-3 rounded-lg">
        <div className="w-2/12 rounded-full border">
            <img src={data.banner_image} height={50} className="rounded-full p-1 object-cover w-auto" />
        </div>
        <div>
            <p className="text-explore-blue font-bold">{data.title.length > 70 ? `${data.title.slice(0,70)}...` : data.title}</p>
            <div className="flex flex-row items-center text-gray-400 font-semibold text-sm grow">
                <span>{data.source}</span>
                <BsDot size='1.5rem' />
                <span>{timeSinceHours}h ago</span>
            </div>
        </div>
    </div>
  )
}

export default NewsTab