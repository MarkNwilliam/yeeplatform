import React,  {  useState, useEffect, Suspense, lazy} from 'react';
import './App.css';
import OfflineStatus from './components/OfflineStatus';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';

const ProtectedRouteWrapper = lazy(() => import('./contexts/ProtectedRoute'));
//const Home = lazy(() => import('./pages/home'));
import Home from './pages/home';
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
const ChapterDetail = lazy(() => import('./components/ChapterDetail'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Welcome = lazy(() => import('./pages/Welcome'));
const ItemDetailPage = lazy(() => import('./pages/ItemDetailPage'));
const AudiobookDetailPage = lazy(() => import('./pages/AudiobookDetailPage'));
const AudioChapterdetail = lazy(() => import('./pages/AudioChapterdetail'));
const ChapterDetailPage = lazy(() => import('./pages/ChapterDetailPage'));
const EbookDetailPage = lazy(() => import('./pages/EbookDetailPage'));
const EbookReaderPage = lazy(() => import('./pages/EbookReaderPage'));
const Chapterreader = lazy(() => import('./pages/Chapterreader'));
const AudioChapterListen = lazy(() => import('./pages/Audiochapterlisten'));
const AudiobookListen = lazy(() => import('./pages/Audiobooklisten'));
const AudioChapters = lazy(() => import('./pages/AudioChapters'));
const EbookViewer = lazy(() => import('./pages/EpubViewer'));
const Notespdf = lazy(() => import('./pages/notespdf'));

import { elb } from '@elbwalker/walker.js';
import destinationAPI from '@elbwalker/destination-web-api';



import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {



  const [loading, setLoading] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const queryClient = new QueryClient();

  const config = {
    custom: {
      url: 'https://httpbin.org/anything',
    },
  };

  elb('walker destination', destinationAPI, config);

  useEffect(() => {
    function updateOnlineStatus() {
      setOnlineStatus(navigator.onLine);
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);


    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!onlineStatus) {
    return <OfflineStatus />;
  }


  return (

    <QueryClientProvider client={queryClient}>
    <div className="App">

<Helmet>
        <link rel="icon"  href="Y.webp" />
      </Helmet>

      <Suspense fallback={<p>Loading...</p>}>


        <BrowserRouter>
    <Routes>
    
        <Route path ="/*" element={<Home />}>
          <Route path="search" element={<Scontent />}/>
          <Route path="home" element={<Home />}/>
          <Route path="ebooks" element={<Ebooks />} />
          <Route path="audiobooks" element={<Audiobooks />}/>  
          <Route path="items/:id" element={<ItemDetailPage />} />
          <Route path="chapters" element={<Chapters />} />
          <Route path="audiochapters" element={<AudioChapters />} />
         
         
        </Route>

        <Route path="ebooks/:id" element={<EbookDetailPage />} />
        <Route path="ebooks/:id/read" element={<ProtectedRouteWrapper> <EbookReaderPage /> </ProtectedRouteWrapper>} />
        <Route path="/ebooks/epub/:id" element={<ProtectedRouteWrapper> <EbookViewer /> </ProtectedRouteWrapper>} />
        <Route path="audiochapterlisten/:id/listen" element={<ProtectedRouteWrapper> <AudioChapterListen /> </ProtectedRouteWrapper>} />

       
        <Route path="/audiobooklisten/:id/listen" element={<ProtectedRouteWrapper> <AudiobookListen /> </ProtectedRouteWrapper>} />

        <Route path="chapters/:id/read" element={<ProtectedRouteWrapper> <Chapterreader /> </ProtectedRouteWrapper>} />


        <Route path="/notespdf/:id" element={<Notespdf />} />


        <Route path="/audiobooks/:id" element={<AudiobookDetailPage />} />
        <Route path="/audiochapters/:id" element={<AudioChapterdetail />} />
        <Route path="chapters/:id" element={<ChapterDetailPage />} />
        <Route path="ebooks/:id" element={<EbookDetailPage />} />
        <Route path="/verify-email" element={<VerifyEmail />}/>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/myaccount" element={<AccountPage />} />
        <Route path="/Signin" element={<Signin />}/>
        <Route path="/login" element={<Signin />}/>
        <Route path="/login" element={<Signin />}/>


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
      
      <Route path="/Permium" element={<Premium />}/>
    </Routes>
  </BrowserRouter>

  </Suspense>
    </div>

    </QueryClientProvider>
  );
}

export default App;
