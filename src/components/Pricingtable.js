import React from 'react';
import "tailwindcss/tailwind.css";
export default function Pricingtable() {
    return (
        <>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-amber-500">
            Our Pricing
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Transparent</span>
          </span>{' '}
          pricing. Pay as you grow.
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
  Discover a world of African content tailored to your preferences and budget. Our flexible subscription plans let you access a diverse range of ebooks and audiobooks while supporting your favorite creators.
</p>
      </div>
      <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">Daily</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">UGX1,000</div>
              <div className="text-gray-700">/day</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">24 hour access</div>
              <div className="text-gray-700">Access to free content</div>
              <div className="text-gray-700">Access all to features</div>
            </div>
          </div>
          <div>
            <a
            
              className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Subscirbe
            </a>
            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Terms and conditions apply.
            </p>
          </div>
        </div>
        <div className="relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow border-deep-purple-accent-400">
          <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
            <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-deep-purple-accent-400">
              Most Popular
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Monthly</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">UGX15,000</div>
              <div className="text-gray-700">/mo</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">Full month access</div>
              <div className="text-gray-700">Download</div>
              <div className="text-gray-700">Access to free content</div>
              <div className="text-gray-700">Access all to features</div>
            </div>
          </div>
          <div>
            <a
             
              className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Subscribe
            </a>
            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
            Terms and conditions apply.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">Weekly</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">UGX7,000</div>
              <div className="text-gray-700">/wk</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">7 day access</div>
              <div className="text-gray-700">Downloads</div>
              <div className="text-gray-700">Access to free content</div>
              <div className="text-gray-700">Access all to features</div>
            </div>
          </div>
          <div>
            <a
             
              className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
            >
              Subscribe
            </a>
            <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
            Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
    );
  };