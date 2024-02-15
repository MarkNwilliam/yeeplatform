import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Scontent from "../components/Scontent";
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Head from 'next/head'
import Button from '@mui/material/Button';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import MPopper from "../components/MPopper.js"
import MList from "../subcomponents/MList.js"
import { useWindowWidth } from '@react-hook/window-size';
import Barlist from "../subcomponents/Barlist.js";
import { logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';


const drawerWidth = 240;

 function Search(props) {

  const width = useWindowWidth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
 
  React.useEffect(() => {
    // Log event when the Search page is loaded
    logEvent('SearchPageLoaded', { page: 'Search' });
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