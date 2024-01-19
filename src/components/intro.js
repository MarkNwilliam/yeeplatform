import React from 'react';
import IntroCarousel from "./IntroCarousel";


export default function intro() {

    const categories = [
        { name: "Stories",
        pic:'stories.jpg',
        description:"Adventure, Power and challenges 😁",
        id:1
        },
        { name: "Life",
        pic:'life.jpg',
        description:"Life improvement 😀",
        id:2
        },
        { name: "Romantic Stories",
        pic:'roma.jpg',
        description:"Stories of love 😍	",
        id:3
        },
        { 
            name: "Others",
            pic:'others.jpg',
            description:"A lot for you 😉",
            id:4
        }
    ]

    return (
        <div>
            <IntroCarousel />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {categories.map((data) => (
                    <div key={data.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
                ))}
            </div>
    
        </div>
    );
}