import React, { Suspense, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import IntroCarousel from "./IntroCarousel";
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Skeleton from '@mui/material/Skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Intro() {
    const fetchCategories = () =>
        new Promise((resolve) =>
            setTimeout(() => {
                resolve([
                    {
                        name: "Ebooks and Magazines",
                        pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/stories.jpeg',
                        description: "Ordinary ebooks and magazines 📚",
                        id: 1,
                        link: "/ebooks"
                    },
                    {
                        name: "Audio books",
                        pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/life.jpeg',
                        description: "Just audiobooks 🎧",
                        id: 2,
                        link: "/audiobooks"
                    },
                    {
                        name: "Audio chapters",
                        pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/roma.jpeg',
                        description: "Chapters in audio form 🎵",
                        id: 3,
                        link: "/audiochapters"
                    },
                    {
                        name: "Chapters",
                        pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/others.jpeg',
                        description: "Chapters written to the whole book 📖",
                        id: 4,
                        link: "/chapters"
                    }
                ]);
            }, 5000)
        );

    const { data: categories, isLoading } = useQuery('categories', fetchCategories);

    const memoizedCategories = useMemo(() => categories, [categories]);


    return (
        <div>
            <Helmet>
                <title>Home - Yee FM</title>
                <meta name="description" content="Explore a wide range of content on Yee FM, including audiobooks, ebooks, magazines, comics, and more. Enjoy personalized recommendations and curated playlists." />
                <meta name="keywords" content="Yee FM, music, audiobooks, ebooks, magazines, comics, entertainment, streaming, recommendations, playlists" />
                <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
                <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Home - Yee FM" />
                <meta property="og:description" content="Explore a wide range of content on Yee FM, including music, audiobooks, ebooks, magazines, comics, and more. Enjoy personalized recommendations and curated playlists." />
                <meta property="og:url" content="https://www.yeefm.com/home" />
            </Helmet>
            <Suspense fallback={<div>Loading...</div>}>
                <IntroCarousel />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {isLoading ? (
      Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <Skeleton variant="rectangular" width="100%" height={144} />
          <div className="p-4">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        </div>
      ))
    ) : (
              
                    memoizedCategories && memoizedCategories.map((data) => (
                        <Link to={data.link} key={data.id} className="no-underline">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                {isLoading ? (
                                    <Skeleton variant="rectangular" width="100%" height={144} />
                                ) : (
                                    <LazyLoadImage
                
                                        className="w-full h-36 object-cover"
                                        alt={data.name}
                                        height={144}
                                        src={data.pic}
                                        width="100%"
                                        effect="blur"
                                        
                                    />
                                )}
                                <div className="p-4">
                                    <h5 className="text-lg font-semibold mb-2">{data.name}</h5>
                                    <p className="text-sm text-gray-600">{data.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                    )}
                </div>
            </Suspense>
        </div>
    );
}



