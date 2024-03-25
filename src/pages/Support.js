import React, { useState ,  useEffect  } from "react";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { logFirebaseEvent } from '../firebase.js';

const Item = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    logFirebaseEvent('page_view', { page_path: '/Support' });
  }, []);
  
    return (
      <div className="border rounded shadow-sm">

<Helmet>
  <title>Support - Yee FM</title>
  <meta name="description" content="Get support and assistance for Yee FM." />
  <meta name="keywords" content="Yee FM, support, assistance, help, contact" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Support - Yee FM" />
  <meta property="og:description" content="Get support and assistance for Yee FM." />
  <meta property="og:url" content="https://www.yeefm.com/support" />
</Helmet>

        <button
          type="button"
          aria-label="Open item"
          title="Open item"
          className="flex items-center justify-between w-full p-4 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-lg font-medium">{title}</p>
          <div className="flex items-center justify-center w-8 h-8 border rounded-full">
            <svg
              viewBox="0 0 24 24"
              className={`w-3 text-gray-600 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            >
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="2,7 12,17 22,7"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        {isOpen && (
          <div className="p-4 pt-0">
            <p className="text-gray-700">{children}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default function Support() {
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <Helmet>
  <title>Support - Yee FM</title>
  <meta name="description" content="Get support and assistance for Yee FM." />
  <meta name="keywords" content="Yee FM, support, assistance, help, contact" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Support - Yee FM" />
  <meta property="og:description" content="Get support and assistance for Yee FM." />
  <meta property="og:url" content="https://www.yeefm.com/support" />
</Helmet>

        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center">
            <a  className="mb-6 sm:mx-auto">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                <Link to = "/">
              <Avatar
 href = "/"s
 src="Y.webp"
 sx={{ width: 50, height: 50 }}
/>
</Link>
              </div>
            </a>
            <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs>
                      <pattern
                        id="ec5d8ef5-b853-4714-b94f-df28ec98eeb7"
                        x="0"
                        y="0"
                        width=".135"
                        height=".30"
                      >
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect
                      fill="url(#ec5d8ef5-b853-4714-b94f-df28ec98eeb7)"
                      width="52"
                      height="24"
                    />
                  </svg>
                  <span className="relative">We</span>
                </span>{' '}
                you to have a nice time 
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Our goal is to give you the power to access all the content you need and want 
              </p>
            </div>
          </div>
          <div className="space-y-4">
          <Item title="How long does the subscription last?">
            We offer daily, weekly, and monthly subscription plans. Choose the
            one that best suits your needs and enjoy unlimited access to our
            content.
          </Item>
          <Item title="How do I publish an ebook and audiobook?">
            To publish an ebook or audiobook, sign up as a content creator on
            our platform. You can then follow the steps to upload and publish
            your work.
          </Item>
          <Item title="How much do I earn from my content?">
            Earnings from your content depend on factors such as the number of
            subscribers, views, and downloads. We provide a fair revenue share
            model to ensure content creators are rewarded for their work.
          </Item>
          </div>
        </div>
      </div>
    );
  }