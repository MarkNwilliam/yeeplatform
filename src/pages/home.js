import React, { useState, useRef } from 'react';
import { Routes, Route , Link, useNavigate} from 'react-router-dom';
import { Bars3Icon, EllipsisVerticalIcon  } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import Intro from "../components/intro";
import Scontent from "../components/Scontent";
import EbookDetails from "../components/EbookDetails";
import AudiobookDetail from "../components/AudiobookDetail";
import ChapterDetail from "../components/ChapterDetail";
import Ebooks from "./Ebooks";
import Audiobooks from "./Audiobooks";
import Chapters from "./Chapters";
import Footer from '../components/Footer';
import Dbarlist from '../subcomponents/Dbarlist';
import MPopper from '../components/MPopper';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuIconRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout, isAuthor } = useAuth(); // Use the useAuth function

  const handleLogout = () => {
    logout(); // Logout function from AuthContext
  };

  
  const handleMyAccountClick = () => {
    // Navigate to the dashboard if the user is an author, otherwise go to the account page
    if (isAuthor) {
      navigate('/dashboard');
    } else {
      navigate('/myaccount');
    }
  };

   // Function to toggle menu popup
   const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
      <header className="flex justify-between items-center p-4 text-white z-10" style={{ backgroundColor: '#FFDE59' }}>
          {/* Hamburger Icon */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`focus:outline-none lg:hidden ${sidebarOpen ? 'hidden' : ''}`}>
            <Bars3Icon className="h-6 w-6 text-white" />
          </button>

          {/* Authentication Buttons */}
          <div className="flex items-center justify-center ml-auto">
            {user ? (
              <>
                <button onClick={handleMyAccountClick} className="px-3 py-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black no-underline">My Account</button>
                <button onClick={handleLogout} className="px-3 py-2 ml-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black no-underline">Login</Link>
                <Link to="/signup" className="px-3 py-2 ml-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black no-underline">Signup</Link>
              </>
            )}
          </div>

          {/* Right-aligned Dbarlist */}
          <div className="hidden lg:flex items-center ml-auto">
            <Dbarlist />
          </div>

          {/* Menu icon for smaller screens with added margin-left */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none ml-4" ref={menuIconRef}>
            <EllipsisVerticalIcon className="h-6 w-6 text-white" />
          </button>
        </header>

        {/* Menu popup */}
        {menuOpen && <MPopper open={menuOpen} anchorRef={menuIconRef.current} handleClose={() => setMenuOpen(false)} handleListKeyDown={() => {}} />}

        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" index element={<Intro />} />
            <Route path="search" element={<Scontent />} />
            <Route path="ebooks" element={<Ebooks />} />
            <Route path="ebooks/:id" element={<EbookDetails />} />
            <Route path="audiobooks" element={<Audiobooks />} />
            <Route path="audiobooks/:id" element={<AudiobookDetail />} />
            <Route path="chapters/:id" element={<ChapterDetail />} />
            <Route path="chapters" element={<Chapters />} />
          </Routes>
          <Footer />
        </main>
      
      </div>
    </div>
  );
}

export default Home;
