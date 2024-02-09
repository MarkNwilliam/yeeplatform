import { BoltIcon, 
    ChatBubbleBottomCenterTextIcon, 
    GlobeAltIcon, 
    ScaleIcon } from '@heroicons/react/24/outline'
import React from 'react';

const features = [
  {
    name: 'Extensive African Content',
    description:
      'Explore a vast collection of African ebooks, audiobooks, and other content from various genres, created by talented authors and artists from across the continent.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Affordable Subscription Plans',
    description:
      'Choose from our daily, weekly, or monthly subscription plans to access unlimited content at a fair price, with no hidden fees or charges.',
    icon: ScaleIcon,
  },
  {
    name: 'Seamless User Experience',
    description:
      'Enjoy a smooth and user-friendly platform designed for easy navigation, quick content discovery, and instant access to your favorite African stories.',
    icon: BoltIcon,
  },
  {
    name: 'Personalized Recommendations',
    description:
      'Receive tailored content suggestions based on your interests and preferences, so you can always find something new and exciting to read or listen to.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
]


export default function Plist() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Why go Premium</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            A better way to access Quality content
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
  YeePlatform empowers you to explore and enjoy diverse, high-quality content from African creators. Immerse yourself in a world of captivating stories, thought-provoking ideas, and inspiring voices.
</p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
