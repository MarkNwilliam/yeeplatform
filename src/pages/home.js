import React, { useState, useRef , useEffect } from 'react';
import { Routes, Route, Link, useNavigate , useLocation } from 'react-router-dom';
import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
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
import AudioChapters from './AudioChapters';
import { logFirebaseEvent } from '../firebase.js';
import PointsTourGuide from '../constants/PointsTourGuide.js';
import Swal from 'sweetalert2';
import axios from 'axios';

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(''); // New state variable
    const [runTour, setRunTour] = useState(true);
    const [userPoints, setUserPoints] = useState(0);
    const menuIconRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout, isAuthor } = useAuth(); // Use the useAuth function

    
    useEffect(() => {
        logFirebaseEvent('page_view', { page_path: '/Home' });
        // Fetch user points when component mounts
        if (user) {
            fetchUserPoints();
        }
    }, [user]); // Trigger useEffect when user changes

      const fetchUserPoints = async () => {
        try {
            const response = await axios.get(`https://yeeplatformbackend.azurewebsites.net/getUserPoints/${user.firebaseId}`); // Fetch user points using the API endpoint
            setUserPoints(response.data.points); // Set user points in state
        } catch (error) {
            console.error('Error fetching user points:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure you want to log out?",
                text: "You will be logged out of your account.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FFD700", // Yellow color
                cancelButtonColor: "#FF8C00", // DarkOrange color
                confirmButtonText: "Yes, log me out",
                cancelButtonText: "No, cancel",
                showClass: {
                    popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                    `
                },
                hideClass: {
                    popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                    `
                },
            });
    
            if (result.isConfirmed) {
                await logout();
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Signed out successfully",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#fff', 
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer);
                        toast.addEventListener('mouseleave', Swal.resumeTimer);
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "An error occurred while logging out.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
                background: '#FF8C00' // DarkOrange color
            });
        }
    };

    const handleMyAccountClick = () => {
        // Navigate to the dashboard if the user is an author, otherwise go to the account page
        if (isAuthor) {
            navigate('/dashboard');
        } else {
            navigate('/myaccount');
        }
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setSidebarOpen(false); // Close the sidebar when a new section is selected
    };

    // Function to toggle menu popup
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">



            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleSectionClick={handleSectionClick} selectedSection={selectedSection} />
            <PointsTourGuide runTour={runTour} setRunTour={setRunTour} />
            <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex justify-between items-center p-4 text-white z-10" style={{ backgroundColor: '#FFDE59' }}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`focus:outline-none lg:hidden ${sidebarOpen ? 'hidden' : ''}`}>
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      <div className="flex items-center justify-center ml-auto">
        {/* Show user points if user is logged in */}
        {user && (
          <div className="mr-4 text-white user-points">{`Points: ${userPoints}`}</div>
        )}

        {/* Conditional rendering of authentication buttons */}
        {user ? (
          <>
            <button onClick={handleMyAccountClick} className="px-3 py-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black no-underline hover:scale-110">My Account</button>
            <button onClick={handleLogout} className="px-3 py-2 ml-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black hover:scale-110">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black no-underline hover:scale-110">Login</Link>
            <Link to="/signup" className="px-3 py-2 ml-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-black no-underline hover:scale-110">Signup</Link>
          </>
        )}
      </div>

      <div className="hidden lg:flex items-center ml-auto">
        <Dbarlist />
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none ml-4" ref={menuIconRef}>
        <EllipsisVerticalIcon className="h-6 w-6 text-white" />
      </button>
    </header>

                {/* Menu popup */}
                {menuOpen && <MPopper open={menuOpen} anchorRef={menuIconRef.current} handleClose={() => setMenuOpen(false)} handleListKeyDown={() => { }} />}

                <main className="flex-1 overflow-y-auto p-2">
                    <Routes>
                        <Route path="/" index element={<Intro />} />
                        <Route path="home" index element={<Intro />} />
                        <Route path="search" element={<Scontent />} />
                        <Route path="ebooks" element={<Ebooks />} />
                        <Route path="ebooks/:id" element={<EbookDetails />} />
                        <Route path="audiobooks" element={<Audiobooks />} />
                        <Route path="audiobooks/:id" element={<AudiobookDetail />} />
                        <Route path="chapters/:id" element={<ChapterDetail />} />
                        <Route path="chapters" element={<Chapters />} />
                        <Route path="audiochapters" element={<AudioChapters />} />
                    </Routes>
                    <Footer />
                </main>

            </div>
        </div>
    );
}

export default Home;
