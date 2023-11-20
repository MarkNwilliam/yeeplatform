import React,  {  useState, useEffect, Suspense, lazy} from 'react';
import './App.css';
import OfflineStatus from './components/OfflineStatus';
import LoadingScreen from "./components/loadingscreen";
import { Helmet } from 'react-helmet';
import ProtectedRouteWrapper from "./contexts/ProtectedRoute";

// Lazy-load the components
const Home = lazy(() => import('./pages/home'));
const Chapters = lazy(() => import('./pages/Chapters'));
const Audiobooks = lazy(() => import('./pages/Audiobooks'));
const Ebooks = lazy(() => import('./pages/Ebooks'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const Scontent = lazy(() => import('./components/Scontent'));
const Intro = lazy(() => import('./components/intro'));
const News = lazy(() => import('./components/DNews'));
const DNft = lazy(() => import('./components/DNft'));
const Upload = lazy(() => import('./components/DUpload'));
const DStats = lazy(() => import('./components/DStats'));
const DSupport = lazy(() => import('./components/DSupport'));
const DWrite = lazy(() => import('./components/DWrite'));
const DAudio = lazy(() => import('./components/DAudio'));
const DProfile = lazy(() => import('./components/DProfile'));
const Support = lazy(() => import('./pages/Support'));
const Premium = lazy(() => import('./pages/Premium'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const Mybooks = lazy(() => import('./components/Mybooks'));
const MyAudios = lazy(() => import('./components/MyAudios'));
const MyChapters = lazy(() => import('./components/MyChapters'));
const AudiobookDetail = lazy(() => import('./components/AudiobookDetail'));
const DAudioChapter = lazy(() => import('./components/DAudioChapter'));
const EbookDetails = lazy(() => import('./components/EbookDetails'));
const ChapterDetail = lazy(() => import('./components/ChapterDetail'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Welcome = lazy(() => import('./pages/Welcome'));


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    function updateOnlineStatus() {
      setOnlineStatus(navigator.onLine);
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    setTimeout(() => setLoading(true), 2000);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!onlineStatus) {
    return <OfflineStatus />;
  }


  return (


    <div className="App">

<Helmet>
        <link rel="icon"  href="Y.webp" />
      </Helmet>

      <Suspense fallback={<LoadingScreen />}>

{loading ? (
        <BrowserRouter>
    <Routes>
    
        <Route path ="/" element={<Home />}>
        <Route path="search" element={<Scontent />} />
          <Route path="home" element={<Intro />} />
          <Route path="ebooks" element={<Ebooks />} />
<Route path="ebooks/:id" element={<EbookDetails />} />
<Route path="chapters/:id" element={<ChapterDetail />} />
          <Route path="audiobooks" element={<Audiobooks />}/>
              <Route path="audiobooks/:id" element={<AudiobookDetail />} />
            
          <Route path="chapters" element={<Chapters />} />
        </Route>
        
        <Route path="/verify-email" element={<VerifyEmail />}/>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/my-account" element={<AccountPage />} />
        <Route path="/Signin" element={<Signin />}/>


        <Route path="/Dashboard/*" element={
        <ProtectedRouteWrapper>
        <Dashboard />
        </ProtectedRouteWrapper>
}>

        <Route path="Audio" element={<DAudio />}/>
        <Route path="MyBooks" index element={<Mybooks />} />
        <Route path="Nfts" element={<DNft />}/>
        <Route path="News" element={<News />}/>
        <Route path="Upload" element={<Upload />}/>
        <Route path="AudioChapter" element={<DAudioChapter />}/>
        <Route path="Statistics" element={<DStats />}/>
        <Route path="Write" element={<DWrite />}/>
        <Route path="Profile" element={<DProfile />}/>
        <Route path="MyChapters" index element = {<MyChapters />} />
        <Route path="MyAudios" index element = {<MyAudios />} />
        <Route path="AuthorSupport" element={<DSupport />}/>

</Route>
     
      <Route path="/Support" element={<Support />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/Welcome" element={<Welcome />}/>
      
      <Route path="/Premium" element={<Premium />}/>
    </Routes>
  </BrowserRouter>
): (
    <LoadingScreen />
  )}
  </Suspense>
    </div>
  );
}

export default App;
