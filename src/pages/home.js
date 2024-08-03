import React, { useState, useRef, useEffect, Suspense, lazy, useMemo } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import Intro from "../components/intro";
import Scontent from "../components/Scontent";
import { useAuth } from '../contexts/AuthContext';
import { logFirebaseEvent } from '../firebase.js';
import PointsTourGuide from '../constants/PointsTourGuide.js';
import useNotificationPermission from '../hooks/useNotificationPermission';
//import Swal from 'sweetalert2';
// Lazy load components

const Ebooks = lazy(() => import("./Ebooks"));
const Audiobooks = lazy(() => import("./Audiobooks"));
const Chapters = lazy(() => import("./Chapters"));
const Footer = lazy(() => import('../components/Footer'));
const Dbarlist = lazy(() => import('../subcomponents/Dbarlist'));
const MPopper = lazy(() => import('../components/MPopper'));
const AudioChapters = lazy(() => import('./AudioChapters'));

function useUserPoints(user) {
    const [userPoints, setUserPoints] = useState(0);

    const userPointsURL = useMemo(() => {
        if (user) {
            return `https://yeeplatformbackend.azurewebsites.net/getUserPoints/${user.firebaseId}`;
        }
        return null;
    }, [user]);
    
    useEffect(() => {
        const fetchUserPoints = async () => {
            if (!userPointsURL) return;
    
            try {
                const axios = await import('axios');
                const response = await axios.get(userPointsURL);
                setUserPoints(response.data.points);
            } catch (error) {
                //console.error('Error fetching user points:', error);
            }
        };
    
        fetchUserPoints();
    }, [userPointsURL]);
    
    return userPoints;
}

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(''); 
    const [runTour, setRunTour] = useState(true);
    const menuIconRef = useRef(null);
    const navigate = useNavigate();

    const { user, logout, isAuthor } = useAuth(); 

    useNotificationPermission();

    const userPoints = useUserPoints(user);

    useEffect(() => {
        logFirebaseEvent('page_view', { page_path: '/Home' });
    }, []);

    const handleLogout = async () => {
        try {
            const module = await import('sweetalert2');
        const Swal = module.default;
       
            const result = await Swal.fire({
                title: "Are you sure you want to log out?",
                text: "You will be logged out of your account.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FFD700",
                cancelButtonColor: "#FF8C00",
                confirmButtonText: "Yes, log me out",
                cancelButtonText: "No, cancel",
                showClass: {
                    popup: `animate__animated animate__fadeInUp animate__faster`
                },
                hideClass: {
                    popup: `animate__animated animate__fadeOutDown animate__faster`
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
            const module = await import('sweetalert2');
        const Swal = module.default;
            Swal.fire({
                title: "Error",
                text: "An error occurred while logging out.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
                background: '#FF8C00'
            });
        }
    };

    const handleMyAccountClick = () => {
        navigate(isAuthor ? '/dashboard' : '/myaccount');
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                handleSectionClick={handleSectionClick} 
                selectedSection={selectedSection} 
            />
            <PointsTourGuide runTour={runTour} setRunTour={setRunTour} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 text-black z-10" style={{ backgroundColor: '#FFD700'}}>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`focus:outline-none lg:hidden ${sidebarOpen ? 'hidden' : ''}`}>
                        <Bars3Icon className="h-6 w-6 text-black" />
                    </button>

                    <div className="flex items-center justify-center ml-auto">
                        {user && (
                            <div className="mr-4 text-black user-points">{`Points: ${userPoints}`}</div>
                        )}
                        {user ? (
                            <>
                                <button onClick={handleMyAccountClick} className="px-3 py-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black no-underline hover:scale-110">My Account</button>
                                <button onClick={handleLogout} className="px-3 py-2 ml-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black hover:scale-110">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-3 py-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black no-underline hover:scale-110">Login</Link>
                                <Link to="/signup" className="px-3 py-2 ml-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black no-underline hover:scale-110">Signup</Link>
                            </>
                        )}
                    </div>

                    <div className="hidden lg:flex items-center ml-auto">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Dbarlist />
                        </Suspense>
                    </div>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none ml-4" ref={menuIconRef}>
                        <EllipsisVerticalIcon className="h-6 w-6 text-black" />
                    </button>
                </header>

                {menuOpen && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <MPopper open={menuOpen} anchorRef={menuIconRef.current} handleClose={() => setMenuOpen(false)} handleListKeyDown={() => { }} />
                    </Suspense>
                )}

                <main className="flex-1 overflow-y-auto p-2">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" index element={<Intro />} />
                            <Route path="home" index element={<Intro />} />
                            <Route path="search" element={<Scontent />} />
                            <Route path="ebooks" element={<Ebooks />} />
                            <Route path="audiobooks" element={<Audiobooks />} />
                            <Route path="chapters" element={<Chapters />} />
                            <Route path="audiochapters" element={<AudioChapters />} />
                        </Routes>
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Footer />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}

export default Home;
