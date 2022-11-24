import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

const ShareButtons = () => {
  return (
    <div className="flex flex-col absolute top-10 w-full right-2 items-end">
      <FacebookShareButton
        url={'https://financial-app-etsh.vercel.app/'}
        quote={'Financial-app is a great place to keep track of financial data!'} >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LineShareButton
        url={'https://financial-app-etsh.vercel.app/'}
        title={'Financial-app is a great place to keep track of financial data!'} >
        <LineIcon size={32} round />
      </LineShareButton>
      <RedditShareButton
        url={'https://financial-app-etsh.vercel.app/'}
        title={'Financial-app is a great place to keep track of financial data!'} >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton
        url={'https://financial-app-etsh.vercel.app/'}
        title={'Financial-app is a great place to keep track of financial data!'} >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={'https://financial-app-etsh.vercel.app/'}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  )
}

export default ShareButtons