import React from 'react';

import Bbar from "../subcomponents/Bbar.js"
import Phero from "../components/Phero.js"
import Plist from "../components/Plist"
import Pricingtable from "../components/Pricingtable"
import Footer from "../components/Footer.js"
import { Helmet } from 'react-helmet';

export default function Premium() {
  return (
    <>
    
      <Bbar />
<Phero />
      <Plist/>
      <Pricingtable />
      <Footer/>
    </>
  );
}
