import React, { useEffect } from 'react';

import Bbar from "../subcomponents/Bbar.js"
import Phero from "../components/Phero.js"
import Plist from "../components/Plist"
import Pricingtable from "../components/Pricingtable"
import Footer from "../components/Footer.js"
import { analytics , logEvent } from '../firebase.js'
import { Helmet } from 'react-helmet';

export default function Premium() {

  useEffect(() => {
    logEvent(analytics,'page_view', { page: 'premium' });
  }, []);

  return (
    <>
 <Helmet>
  <title>Premium - Yee FM</title>
  <meta name="description" content="Check out our Yee FM plans and why you should support." />
  <meta name="keywords" content="Yee FM, premium, plans, support" />
  <link rel="icon" href="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:title" content="Premium - Yee FM" />
  <meta property="og:description" content="Check out our Yee FM plans and why you should support." />
  <meta property="og:image" content="https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp" />
  <meta property="og:url" content="https://www.yeefm.com/premium" />
</Helmet>

    
      <Bbar />
<Phero />
      <Plist/>
      <Pricingtable />
      <Footer/>
    </>
  );
}
