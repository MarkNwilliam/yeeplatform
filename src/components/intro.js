import React from 'react';
import { Link } from 'react-router-dom';
import IntroCarousel from "./IntroCarousel";
import { Helmet } from 'react-helmet';
export default function Intro() {
    const categories = [
        {
            name: "Ebooks and Magazines",
            pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/stories.jpg',
            description: "Ordinary ebooks and magazines 📚",
            id: 1,
            link: "/ebooks"
        },
        {
            name: "Audio books",
            pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/life.jpg',
            description: "Just audiobooks 🎧",
            id: 2,
            link: "/audiobooks"
        },
        {
            name: "Audio chapters",
            pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/roma.jpg',
            description: "Chapters in audio form 🎵",
            id: 3,
            link: "/audiochapters"
        },
        {
            name: "Chapters",
            pic: 'https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/others.jpg',
            description: "Chapters written to the whole book 📖",
            id: 4,
            link: "/chapters"
        }
    ];

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
            <IntroCarousel />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {categories.map((data) => (
                    <Link to={data.link} key={data.id} className="no-underline">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img
                                src={data.pic}
                                alt={data.name}
                                className="w-full h-36 object-cover"
                            />
                            <div className="p-4">
                                <h5 className="text-lg font-semibold mb-2">{data.name}</h5>
                                <p className="text-sm text-gray-600">{data.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    );
}