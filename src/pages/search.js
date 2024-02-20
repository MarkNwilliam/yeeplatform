import * as React from 'react';

import Scontent from "../components/Scontent";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useWindowWidth } from '@react-hook/window-size';

import { analytics,logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';


const drawerWidth = 240;

 function Search(props) {

  const width = useWindowWidth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  React.useEffect(() => {
    // Log event when the Search page is loaded
    logEvent(analytics,'SearchPageLoaded', { page: 'Search' });
  }, []);
  
  

    return (
      <ThemeProvider>

<Helmet>
  <title>Search - Yee FM</title>
  <meta name="description" content="Explore and discover content on Yee FM. Find articles, podcasts, music, and more." />
  <meta name="keywords" content="Yee FM, search, explore, discover, articles, podcasts, music" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:title" content="Search - Yee FM" />
  <meta property="og:description" content="Explore and discover content on Yee FM. Find articles, podcasts, music, and more." />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:url" content="https://www.yeefm.com/search" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Search - Yee FM" />
  <meta name="twitter:description" content="Explore and discover content on Yee FM. Find articles, podcasts, music, and more." />
  <meta name="twitter:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
</Helmet>


  

    <Scontent/>


   
 </ThemeProvider>
    );
  }

  
export default Search