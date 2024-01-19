import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const ShareBox = ({ shareUrl, selectedText }) => {
  const yeePlatformUrl = 'https://www.yeeplatform.com';
  const hashtags = 'YeePlatform'; // Add more hashtags as needed

  const shareText = `Check out this quote: "${selectedText}" from @YeePlatform! ${yeePlatformUrl} #${hashtags}`;

  return (
    <div className="share-box w-full max-w-md mx-auto p-4">
      <div className="share-header mb-4">
        <img src="/Y.webp" alt="YeePlatform Logo" className="logo w-12 h-auto" />
        <span className="share-title text-lg">Share this quote with friends:</span>
      </div>
      <div className="share-icons flex justify-center">
        <FacebookShareButton title="Test" url={shareUrl} quote={shareText}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareText}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={shareText}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={shareText}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject="Check out this quote" body={shareText}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareBox;
