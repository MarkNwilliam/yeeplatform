"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[6151,5399],{70360:(e,t,n)=>{n.d(t,{X:()=>o});const o=["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Democratic Republic of the Congo","Republic of the Congo","Cote d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"]},5399:(e,t,n)=>{n.d(t,{$s:()=>i.$s,Cg:()=>d,GoogleAuthProvider:()=>a.HF,auth:()=>l,onAuthStateChanged:()=>a.hg,signInWithEmailAndPassword:()=>a.x9,signInWithPopup:()=>a.df,signOut:()=>a.CI,zS:()=>u});var o=n(37064),i=n(82413),a=n(32813);const r={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let s,l,u;(async()=>{if(!s){s=(0,o.Wp)(r),l=(0,a.xI)(s);await(0,i.TT)()&&(u=(0,i.P5)(s))}})();const d=(e,t)=>{u&&(0,i.$s)(u,e,t)}},17638:(e,t,n)=>{function o(e){switch(e){case"auth/user-not-found":return"No user found with this email.";case"auth/wrong-password":return"Incorrect password.";case"auth/user-disabled":return"This user has been disabled.";case"auth/too-many-requests":return"Too many unsuccessful login attempts. Please try again later.";case"auth/email-already-in-use":return"The email address is already in use by another account.";case"auth/invalid-email":return"The email address is not valid.";case"auth/operation-not-allowed":return"Signing in with this method is not allowed.";case"auth/account-exists-with-different-credential":return"An account already exists with the same email address but different sign-in credentials.";case"auth/auth-domain-config-required":return"An auth domain configuration is required.";case"auth/credential-already-in-use":return"This credential is already associated with a different user account.";case"auth/operation-not-supported-in-this-environment":return"This operation is not supported in the environment this application is running on.";case"auth/timeout":return"The operation has timed out.";case"auth/missing-android-pkg-name":return"An Android Package Name must be provided if the Android App is required to be installed.";case"auth/missing-continue-uri":return"A continue URL must be provided in the request.";case"auth/missing-ios-bundle-id":return"An iOS Bundle ID must be provided if an App Store ID is provided.";case"auth/invalid-continue-uri":return"The continue URL provided in the request is invalid.";case"auth/unauthorized-continue-uri":return"The domain of the continue URL is not whitelisted.";case"auth/invalid-dynamic-link-domain":return"The dynamic link domain is not valid.";default:return"An unknown error occurred."}}n.d(t,{u:()=>o})},96151:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var o=n(65043),i=n(5399),a=n(30064),r=n.n(a),s=n(32813),l=n(85369),u=n(73216),d=n(35475),c=n(90221),h=n(70360),p=n(17638),m=n(41591),f=n(54314),g=n(66491),y=n(70579);const w=function(){const[e,t]=(0,o.useState)(""),[n,a]=(0,o.useState)(""),[w,b]=(0,o.useState)(""),[v,x]=(0,o.useState)(""),[k,C]=(0,o.useState)(""),j=(0,u.Zp)(),[S,N]=(0,o.useState)(!1),[T,A]=(0,o.useState)(""),[W,Y]=(0,o.useState)(!1),[P,z]=(0,o.useState)(!1);(0,o.useEffect)((()=>{(0,i.Cg)("page_view",{page_path:"/Signup"})}),[]);const I=async e=>{try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await t.json();if(!t.ok)throw new Error(n.message)}catch(t){r().fire({icon:"error",title:"Error",text:t.message})}};return(0,y.jsxs)("div",{className:"min-h-screen flex items-center justify-center bg-yellow-200 p-4 md:p-0",children:[(0,y.jsxs)(m.m,{children:[(0,y.jsx)("title",{children:"Sign Up - Yee FM"}),(0,y.jsx)("meta",{name:"description",content:"Sign up for a new account on Yee FM."}),(0,y.jsx)("meta",{name:"keywords",content:"Yee FM, sign up, register, new account, join"}),(0,y.jsx)("link",{rel:"icon",href:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,y.jsx)("meta",{property:"og:image",content:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,y.jsx)("meta",{property:"og:type",content:"website"}),(0,y.jsx)("meta",{property:"og:title",content:"Sign Up - Yee FM"}),(0,y.jsx)("meta",{property:"og:description",content:"Sign up for a new account on Yee FM."}),(0,y.jsx)("meta",{property:"og:url",content:"https://www.yeefm.com/signup"})]}),(0,y.jsxs)("div",{className:"max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md",children:[(0,y.jsxs)("div",{className:"text-center",children:[(0,y.jsx)(c.NEn,{className:"text-gray-700 text-2xl cursor-pointer mb-4",onClick:()=>j("/ebooks")}),(0,y.jsx)("img",{src:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp",alt:"Platform logo",loading:"lazy",className:"mx-auto h-16 w-auto mb-2"}),(0,y.jsx)("h2",{className:"text-2xl font-bold text-gray-800",children:"Sign Up"}),(0,y.jsxs)("p",{className:"mt-2 text-gray-600",children:["Already have an account?"," ",(0,y.jsx)(d.N_,{to:"/signin",className:"text-indigo-500 hover:text-indigo-700 underline",children:"Sign In"})]})]}),(0,y.jsxs)("button",{onClick:async()=>{if(navigator.onLine)if(S)try{r().fire({title:"Signing up with Google...",allowEscapeKey:!1,allowOutsideClick:!1,willOpen:()=>{r().showLoading()}});const e=new s.HF,t=await(0,s.df)(i.auth,e);if(!t)return void r().fire({icon:"error",title:"Error",html:'Popup blocked. Please allow popups for this site in your browser settings. <a href="https://www.google.com/search?q=how+to+allow+popups+in+my+browser" target="_blank">Learn More</a>'});const n=t.user,o={username:n.displayName,email:n.email,profileImage:n.photoURL,dateJoined:Date.now(),googleId:n.uid,firebaseId:n.uid,authProvider:"google",preferredReadingMode:"LTR",emailVerified:n.emailVerified,settings:{receiveEmailUpdates:!0,receiveNotifications:!0,darkMode:!1},isAuthor:!1};localStorage.setItem("tempUserData",JSON.stringify(o)),await I(o),r().fire({icon:"success",title:"Welcome to YeePlatform!",text:"\ud83c\udf89",timer:2e3,showConfirmButton:!1}),j("/home")}catch(e){const t=(0,p.u)(e.code);r().fire({icon:"error",title:"Error",text:t})}else r().fire({icon:"error",title:"Oops...",text:"You must agree to the terms and conditions to sign up."});else r().fire({icon:"error",title:"Error",text:"No internet connection"})},className:"w-full py-2 px-4 mb-6 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center",children:[(0,y.jsx)(l.DSS,{className:"mr-2"}),"Continue with Google"]}),(0,y.jsxs)("form",{onSubmit:async t=>{if(t.preventDefault(),!e||!w||!v||!k)return void r().fire({icon:"error",title:"Error",text:"Please fill in all fields"});if(!S)return void r().fire({icon:"error",title:"Error",text:"You must agree to the terms and conditions to register."});if(v!==k)return void r().fire({icon:"error",title:"Error",text:"Passwords do not match"});if((await(0,s.Wm)(i.auth,w)).length>0)r().fire({icon:"error",title:"Error",text:"This email address is already in use."});else try{r().fire({title:"Signing up...",allowEscapeKey:!1,allowOutsideClick:!1,willOpen:()=>{r().showLoading()}});const{user:t}=await(0,s.eJ)(i.auth,w,v);await(0,s.gA)(t).then((()=>{})),r().fire({icon:"info",title:"Verify Your Email",text:"A verification email has been sent. Please check your inbox and verify your email address."});const n={username:e,email:w,password:v,dateJoined:Date.now(),preferredReadingMode:"LTR",firebaseId:t.uid,authProvider:"emailandpassword",emailVerified:t.emailVerified,settings:{receiveEmailUpdates:!0,receiveNotifications:!0,darkMode:!1},isAuthor:!1};await t.getIdToken().then((e=>{localStorage.setItem("userToken",e)})),await I(n),j("/verify-email")}catch(n){const e=(0,p.u)(n.code);r().fire({icon:"error",title:"Error",text:e})}},className:"space-y-4",autoComplete:"off",children:[(0,y.jsx)("input",{type:"text",id:"name",name:"name",placeholder:"Full Name",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>t(e.target.value)}),(0,y.jsx)("input",{type:"tel",id:"phone",name:"phone",placeholder:"Phone Number",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>a(e.target.value)}),(0,y.jsx)("input",{type:"email",id:"email",name:"email",placeholder:"Email Address",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>b(e.target.value)}),(0,y.jsxs)("select",{id:"country",name:"country",value:T,required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>A(e.target.value),children:[(0,y.jsx)("option",{value:"",disabled:!0,children:"Select your Country"}),Array.isArray(h.X)&&h.X.map(((e,t)=>(0,y.jsx)("option",{value:e,children:e},t)))]}),(0,y.jsxs)("div",{className:"flex w-full",children:[(0,y.jsx)("input",{type:W?"text":"password",id:"password",name:"password",placeholder:"Password",minLength:"6",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>{x(e.target.value)}}),(0,y.jsx)("button",{onClick:()=>{Y(!W)},className:"bg-gray-200 rounded-r-lg p-2 hover:bg-gray-300",children:W?(0,y.jsx)(f.A,{className:"h-5 w-5 text-gray-500"}):(0,y.jsx)(g.A,{className:"h-5 w-5 text-gray-500"})})]}),(0,y.jsxs)("div",{className:"flex w-full",children:[(0,y.jsx)("input",{type:P?"text":"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirm Password",minLength:"6",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>{C(e.target.value)}}),(0,y.jsx)("button",{onClick:()=>{z(!P)},className:"bg-gray-200 rounded-r-lg p-2 hover:bg-gray-300",children:P?(0,y.jsx)(f.A,{className:"h-5 w-5 text-gray-500"}):(0,y.jsx)(g.A,{className:"h-5 w-5 text-gray-500"})})]}),(0,y.jsx)("button",{type:"submit",className:"w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-700",children:"Sign Up"}),(0,y.jsxs)("div",{className:"flex items-center",children:[(0,y.jsx)("input",{type:"checkbox",className:"form-checkbox h-5 w-5 text-indigo-500",checked:S,onChange:e=>N(e.target.checked)}),(0,y.jsxs)("label",{className:"ml-2 text-sm text-gray-600",children:["I agree to the terms  ,",(0,y.jsx)("button",{onClick:()=>{r().fire({icon:"info",title:" Terms and Conditions",html:'\n          <h2><strong>Terms and Conditions</strong></h2>\n\n          <p>Welcome to yeefm!</p>\n          \n          <p>These terms and conditions outline the rules and regulations for the use of Yee technologies\'s Website, located at www.yeefm.com.</p>\n          \n          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use yeefm if you do not agree to take all of the terms and conditions stated on this page.</p>\n          \n          <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company\'s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of ug. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>\n          \n          <h3><strong>Cookies</strong></h3>\n          \n          <p>We employ the use of cookies. By accessing yeefm, you agreed to use cookies in agreement with the Yee technologies\'s Privacy Policy. </p>\n          \n          <p>Most interactive websites use cookies to let us retrieve the user\'s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>\n          \n          <h3><strong>License</strong></h3>\n          \n          <p>Unless otherwise stated, Yee technologies and/or its licensors own the intellectual property rights for all material on yeefm. All intellectual property rights are reserved. You may access this from yeefm for your own personal use subjected to restrictions set in these terms and conditions.</p>\n          \n          <p>You must not:</p>\n          <ul>\n              <li>Republish material from yeefm</li>\n              <li>Sell, rent or sub-license material from yeefm</li>\n              <li>Reproduce, duplicate or copy material from yeefm</li>\n              <li>Redistribute content from yeefm</li>\n          </ul>\n          \n          <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsandconditionsgenerator.com/">Free Terms and Conditions Generator</a>.</p>\n          \n          <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Yee technologies does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Yee technologies,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Yee technologies shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>\n          \n          <p>Yee technologies reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>\n          \n          <p>You warrant and represent that:</p>\n          \n          <ul>\n              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>\n              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>\n              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>\n              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>\n          </ul>\n          \n          <p>You hereby grant Yee technologies a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>\n          \n          <h3><strong>Hyperlinking to our Content</strong></h3>\n          \n          <p>The following organizations may link to our Website without prior written approval:</p>\n          \n          <ul>\n              <li>Government agencies;</li>\n              <li>Search engines;</li>\n              <li>News organizations;</li>\n              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>\n              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>\n          </ul>\n          \n          <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party\'s site.</p>\n          \n          <p>We may consider and approve other link requests from the following types of organizations:</p>\n          \n          <ul>\n              <li>commonly-known consumer and/or business information sources;</li>\n              <li>dot.com community sites;</li>\n              <li>associations or other groups representing charities;</li>\n              <li>online directory distributors;</li>\n              <li>internet portals;</li>\n              <li>accounting, law and consulting firms; and</li>\n              <li>educational institutions and trade associations.</li>\n          </ul>\n          \n          <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Yee technologies; and (d) the link is in the context of general resource information.</p>\n          \n          <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party\'s site.</p>\n          \n          <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Yee technologies. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>\n          \n          <p>Approved organizations may hyperlink to our Website as follows:</p>\n          \n          <ul>\n              <li>By use of our corporate name; or</li>\n              <li>By use of the uniform resource locator being linked to; or</li>\n              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party\'s site.</li>\n          </ul>\n          \n          <p>No use of Yee technologies\'s logo or other artwork will be allowed for linking absent a trademark license agreement.</p>\n          \n          <h3><strong>iFrames</strong></h3>\n          \n          <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>\n          \n          <h3><strong>Content Liability</strong></h3>\n          \n          <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>\n          \n          <h3><strong>Reservation of Rights</strong></h3>\n          \n          <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it\'s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>\n          \n          <h3><strong>Removal of links from our website</strong></h3>\n          \n          <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>\n          \n          <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>\n          \n          <h3><strong>Disclaimer</strong></h3>\n          \n          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>\n          \n          <ul>\n              <li>limit or exclude our or your liability for death or personal injury;</li>\n              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>\n              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>\n              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>\n          </ul>\n          \n          <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>\n          \n          <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>\n          '})},className:"text-indigo-500 underline focus:outline-none",children:"Terms and Conditions"}),", to receive marketing emails, newsletters, promotions, and updates."]})]})]})]})]})}}}]);
//# sourceMappingURL=6151.930700ef.chunk.js.map