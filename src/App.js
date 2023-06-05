import logo from './logo.svg';
import React,  { Fragment , useState, useEffect} from 'react';
import './App.css';
import Home from "./pages/home";
import Chapters from "./pages/Chapters";
import Audiobooks from "./pages/Audiobooks";
import Ebooks from "./pages/Ebooks";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import LoadingScreen from "./components/loadingscreen";
import Scontent from "./components/Scontent";
import Intro from "./components/intro";
import News from "./components/DNews";
import DNft from "./components/DNft";
import { Helmet } from 'react-helmet';
import Upload from "./components/DUpload";
import DStats from "./components/DStats";
import DSupport from "./components/DSupport";
import DWrite from "./components/DWrite";
import DAudio from "./components/DAudio";
import DProfile from "./components/DProfile";
import Support from "./pages/Support";
import Premium from "./pages/Premium";
import AccountPage from './pages/AccountPage.js';
import Mybooks from './components/Mybooks';
import MyAudios from './components/MyAudios';
import MyChapters from './components/MyChapters';
import AudiobookDetail from './components/AudiobookDetail';
import EbookDetails from './components/EbookDetails';
import ChapterDetail from "./components/ChapterDetail";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 2000);
  }, []);


  return (


    <div className="App">

<Helmet>
        <link rel="icon" type="image/png" href="Y.png" />
      </Helmet>

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
        
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/my-account" element={<AccountPage />} />
        <Route path="/Signin" element={<Signin />}/>
        <Route path="/Dashboard" element={<Dashboard />}>
        <Route path="Audio" element={<DAudio />}/>
        <Route path="MyBooks" index element={<Mybooks />} />
        <Route path="Nfts" element={<DNft />}/>
        <Route path="News" element={<News />}/>
        <Route path="Upload" element={<Upload />}/>
        <Route path="Statistics" element={<DStats />}/>
        <Route path="Write" element={<DWrite />}/>
        <Route path="Profile" element={<DProfile />}/>
        <Route path="MyChapters" index element = {<MyChapters />} />
        <Route path="MyAudios" index element = {<MyAudios />} />
        <Route path="AuthorSupport" element={<DSupport />}/>
</Route>
     
      <Route path="/Support" element={<Support />}/>

      <Route path="/Premium" element={<Premium />}/>
    </Routes>
  </BrowserRouter>
): (
    <LoadingScreen />
  )}
    </div>
  );
}

export default App;
