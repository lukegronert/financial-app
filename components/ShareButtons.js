import React from "react";
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
} from "next-share";

const ShareButtons = ({ instrumentSymbol }) => {
  return (
    <div className="flex flex-col absolute top-14 right-1.5">
      <FacebookShareButton
        url={"https://financial-app-etsh.vercel.app/"}
        quote={
          `Check out how ${instrumentSymbol} is doing on Financial-App!`
        }
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LineShareButton
        url={"https://financial-app-etsh.vercel.app/"}
        title={
          `Check out how ${instrumentSymbol} is doing on Financial-App!`
        }
      >
        <LineIcon size={32} round />
      </LineShareButton>
      <RedditShareButton
        url={"https://financial-app-etsh.vercel.app/"}
        title={
          `Check out how ${instrumentSymbol} is doing on Financial-App!`
        }
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton
        url={"https://financial-app-etsh.vercel.app/"}
        title={
          `Check out how ${instrumentSymbol} is doing on Financial-App!`
        }
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={"https://financial-app-etsh.vercel.app/"}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
