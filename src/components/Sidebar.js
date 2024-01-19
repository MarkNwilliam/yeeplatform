import React from 'react';
import { XMarkIcon, HomeIcon, MagnifyingGlassIcon, BookOpenIcon, SpeakerWaveIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const currentYear = new Date().getFullYear();
  return (
    <aside className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out bg-white w-64 z-20 shadow overflow-y-auto`}>
            <div className="flex justify-end p-2 lg:hidden">
                <button onClick={() => setSidebarOpen(false)}>
                    <XMarkIcon className="h-8 w-8 text-yellow-600" />
                </button>
            </div>
      {/* Logo */}
      <div className="flex justify-center p-6">
        <img src="/Y.webp" alt="Logo" className="h-16 w-16" />
      </div>
      <nav className="flex flex-col justify-between h-full">
        <Link to="/" className="flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline">
          <HomeIcon className="h-6 w-6 mr-3 text-yellow-600" /> Home
        </Link>
        <Link to="/search" className="flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline">
          <MagnifyingGlassIcon className="h-6 w-6 mr-3 text-yellow-600" /> Search
        </Link>
        <Link to="/ebooks" className="flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline">
          <BookOpenIcon className="h-6 w-6 mr-3 text-yellow-600" /> Ebooks
        </Link>
        <Link to="/audiobooks" className="flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline">
          <SpeakerWaveIcon className="h-6 w-6 mr-3 text-yellow-600" /> Audiobooks
        </Link>
        <Link to="/audiochapters" className="flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline">
          <SpeakerWaveIcon className="h-6 w-6 mr-3 text-yellow-600" /> Audio Chapters
        </Link>
        <Link to="/chapters" className="flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline">
          <DocumentTextIcon className="h-6 w-6 mr-3 text-yellow-600" /> Chapters
        </Link>
        {/* Add more links as needed */}
       {/* Footer with Yellow Line */}
       <div className="bg-white py-4 mt-4" style={{ borderTop: '4px solid #FFDE59' }}>
                    <p className="text-center text-sm text-gray-600">
                        &copy; {currentYear} @yeeplatform
                    </p>
                </div>
      </nav>
    </aside>
  );
}

export default Sidebar;



