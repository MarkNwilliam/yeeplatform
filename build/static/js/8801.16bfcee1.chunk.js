"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[8801,5016,5399],{69319:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var a=s(65043),o=s(29402),n=s(5202),r=s(66360),i=s(81637),l=s(67254),c=s(70579);function d(){const[e,t]=(0,a.useState)([]),[s,d]=(0,a.useState)(1),[u,h]=(0,a.useState)(100),[m,p]=(0,a.useState)(""),[x,f]=(0,a.useState)(!0);(0,a.useEffect)((()=>{g()}),[s]);const g=async()=>{f(!0);try{const e=m?"https://yeeplatformbackend.azurewebsites.net/search?term=".concat(m,"&page=").concat(s,"&limit=15"):"https://yeeplatformbackend.azurewebsites.net/getallcontent?page=".concat(s,"&limit=15"),a=await fetch(e);if(!a.ok)throw new Error("Data fetching failed with status: ".concat(a.status));const o=await a.json();t(o.data),h(Math.ceil(o.totalItems/15))}catch(e){}f(!1)},b=(e,t)=>{d(t)};return(0,c.jsxs)("div",{className:"flex flex-col items-center p-4",children:[(0,c.jsxs)("div",{className:"mb-4 flex flex-col sm:flex-row items-center",children:[(0,c.jsx)("input",{type:"text",placeholder:"Search for content...",value:m,onChange:e=>{p(e.target.value)},className:"p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 mb-2 sm:mb-0",style:{width:"100%",maxWidth:"300px"}}),(0,c.jsxs)("button",{onClick:()=>{g()},className:"ml-0 sm:ml-2 p-3 border border-gray-300 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex items-center justify-center",style:{minWidth:"100px"},children:[(0,c.jsx)(r.A,{})," "]})]}),(0,c.jsx)(n.A,{totalPages:u,currentPage:s,onChange:b}),(0,c.jsx)("div",{className:"p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:x?(0,c.jsx)(i.A,{lassName:"text-yellow-500 animate-pulse",color:"inherit"}):e.length>0?e.map(((e,t)=>(0,c.jsx)(o.A,{title:e.title,coverImage:e.coverImage_optimized_url||e.coverimage_optimized_url||e.coverImage||e.thumbnailUrl||e.cover_url||e.coverimage,itemType:e.type||"unknown",itemId:e._id,rating:e.rating},t))):(0,c.jsx)("div",{className:"flex justify-center items-center w-full",children:(0,c.jsx)(l.A,{severity:"warning",className:"w-full",children:"No results were found for your search. Please check your spelling or search for another term"})})}),(0,c.jsx)(n.A,{totalPages:u,currentPage:s,onChange:b})]})}},35016:(e,t,s)=>{s.r(t),s.d(t,{AuthContext:()=>r,AuthProvider:()=>l,default:()=>c,useAuth:()=>i});var a=s(65043),o=s(53536),n=s(70579);const r=(0,a.createContext)();function i(){return a.useContext(r)}function l(e){let{children:t}=e;const[i,l]=(0,a.useState)(!1),[c,d]=(0,a.useState)(null),[u,h]=(0,a.useState)(!0),[m,p]=(0,a.useState)((()=>JSON.parse(localStorage.getItem("isVerified"))||!1)),x=(0,a.useCallback)((0,o.debounce)((async e=>{if(e&&e.uid)try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/isAuthor/".concat(e.uid));if(t.ok){const e=await t.json();l(e.isAuthor)}}catch(t){}}),15e3),[]),f=(0,a.useCallback)((async(e,t)=>{const{auth:a,signInWithEmailAndPassword:o}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399));try{var n;const s=await o(a,e,t);d(s.user);const r=(null===(n=s.user)||void 0===n?void 0:n.emailVerified)||!1;p(r),localStorage.setItem("isVerified",r.toString())}catch(r){}}),[]),g=(0,a.useCallback)((async()=>{const{auth:e,signInWithPopup:t,GoogleAuthProvider:a}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399)),o=new a;try{var n;const s=await t(e,o);d(s.user);const a=(null===(n=s.user)||void 0===n?void 0:n.emailVerified)||!1;p(a),localStorage.setItem("isVerified",a.toString())}catch(r){}}),[]),b=(0,a.useCallback)((async()=>{const{auth:e,signOut:t}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399));try{await t(e),d(null),l(!1)}catch(a){}}),[]);(0,a.useEffect)((()=>{(async()=>{const{auth:e,onAuthStateChanged:t}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399)),a=t(e,(async e=>{d(e),h(!1),e&&(p(e.emailVerified),localStorage.setItem("isVerified",e.emailVerified.toString()))}))})()}),[]),(0,a.useEffect)((()=>{c&&x(c)}),[c,x]);const w={user:c,isAuthor:i,loading:u,isVerified:m,login:f,logout:b,loginWithGoogle:g};return(0,n.jsx)(r.Provider,{value:w,children:t})}const c=l},5399:(e,t,s)=>{s.d(t,{$s:()=>o.$s,Cg:()=>d,GoogleAuthProvider:()=>n.HF,auth:()=>l,onAuthStateChanged:()=>n.hg,signInWithEmailAndPassword:()=>n.x9,signInWithPopup:()=>n.df,signOut:()=>n.CI,zS:()=>c});var a=s(37064),o=s(82413),n=s(32813);const r={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let i,l,c;(async()=>{if(!i){i=(0,a.Wp)(r),l=(0,n.xI)(i);await(0,o.TT)()&&(c=(0,o.P5)(i))}})();const d=(e,t)=>{c&&(0,o.$s)(c,e,t)}},98801:(e,t,s)=>{s.r(t),s.d(t,{default:()=>O});var a=s(65043),o=s(73216),n=s(35475),r=s(79265),i=s(22315),l=s(77591),c=s(55501),d=s(7449),u=s(97463),h=s(75990),m=s(42704),p=s(70579);const x=function(e){let{sidebarOpen:t,setSidebarOpen:s,handleSectionClick:a,selectedSection:o}=e;const r=(new Date).getFullYear();return(0,p.jsxs)("aside",{className:"fixed inset-y-0 left-0 transform ".concat(t?"translate-x-0":"-translate-x-full"," lg:relative lg:translate-x-0 transition duration-200 ease-in-out bg-white w-64 z-20 shadow overflow-y-auto"),children:[(0,p.jsx)("div",{className:"flex justify-end p-2 lg:hidden",children:(0,p.jsx)("button",{onClick:()=>s(!1),children:(0,p.jsx)(l.A,{className:"h-8 w-8 text-yellow-600"})})}),(0,p.jsx)("div",{className:"flex justify-center p-6",children:(0,p.jsx)("img",{src:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp",alt:"Logo",className:"h-16 w-16 hover:scale-110 transition-transform duration-300"})}),(0,p.jsxs)("nav",{className:"flex flex-col justify-between h-full",children:[(0,p.jsxs)(n.N_,{to:"/",onClick:()=>a("/"),className:"flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline",children:[(0,p.jsx)(c.A,{className:"h-6 w-6 mr-3 text-yellow-600"})," Home"]}),(0,p.jsxs)(n.N_,{to:"/search",onClick:()=>a("search"),className:"flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline",children:[(0,p.jsx)(d.A,{className:"h-6 w-6 mr-3 text-yellow-600"})," Search"]}),(0,p.jsxs)(n.N_,{to:"/ebooks",onClick:()=>a("ebooks"),className:"flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline",children:[(0,p.jsx)(u.A,{className:"h-6 w-6 mr-3 text-yellow-600"})," Ebooks"]}),(0,p.jsxs)(n.N_,{to:"/audiobooks",onClick:()=>a("audiobooks"),className:"flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline",children:[(0,p.jsx)(h.A,{className:"h-6 w-6 mr-3 text-yellow-600"})," Audiobooks"]}),(0,p.jsxs)(n.N_,{to:"/audiochapters",onClick:()=>a("audiochapters"),className:"flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline",children:[(0,p.jsx)(h.A,{className:"h-6 w-6 mr-3 text-yellow-600"})," Audio Chapters"]}),(0,p.jsxs)(n.N_,{to:"/chapters",onClick:()=>a("chapters"),className:"flex items-center py-3 px-4 rounded transition duration-200 hover:bg-yellow-500 hover:text-white text-gray-700 no-underline",children:[(0,p.jsx)(m.A,{className:"h-6 w-6 mr-3 text-yellow-600"})," Chapters"]}),(0,p.jsx)("div",{className:"bg-white py-4 mt-4",style:{borderTop:"4px solid #FFDE59"},children:(0,p.jsxs)("p",{className:"text-center text-sm text-gray-600",children:["\xa9 ",r," @yeeplatform"]})})]})]})};var f=s(49385),g=(s(89661),s(85632)),b=s(9634),w=(s(73812),s(86213));function y(){const[e,t]=(0,a.useState)([]);(0,a.useEffect)((()=>{w.A.get("https://yeeplatformbackend.azurewebsites.net/category/ebook/textbook?page=10&limit=5").then((e=>{const s=e.data.map((e=>({id:e._id,src:e.coverImageMediumUrl||e.coverImage,alt:e.title,caption:e.title,description:e.authors.join(", "),link:e.ebookUrl})));t(s)})).catch((e=>console.error(e)))}),[]);const s=(0,g.Ub)({query:"(min-device-width: 1224px)"}),o=(0,g.Ub)({query:"(min-device-width: 768px) and (max-device-width: 1224px)"}),r=((0,g.Ub)({query:"(max-device-width: 767px)"}),s?"500px":o?"350px":"200px");return(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:(0,p.jsx)(f.A,{className:"p-4",style:{maxHeight:r,overflow:"hidden",backgroundColor:"#f5f5f5"},children:e&&e.map((e=>(0,p.jsx)(f.A.Item,{interval:5e3,children:(0,p.jsxs)(n.N_,{to:"/ebooks/".concat(e.id),children:[(0,p.jsx)(b.LazyLoadImage,{className:"d-block w-100",src:e.src,alt:e.alt,style:{maxHeight:"500px",objectFit:"contain"},width:"100%",height:500,effect:"blur"}),(0,p.jsxs)(f.A.Caption,{style:{color:"#333333",textShadow:"2px 2px 4px rgba(0, 0, 0, 0.5)"},children:[(0,p.jsx)("h3",{style:{fontSize:"1.5em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:e.caption}),(0,p.jsx)("p",{style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:e.description})]})]})},e.id)))})})}var j=s(41591),v=s(39336),k=s(85865);function N(){const e=[{name:"Ebooks and Magazines",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/stories.jpeg",description:"Ordinary ebooks and magazines \ud83d\udcda",id:1,link:"/ebooks"},{name:"Audio books",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/life.jpeg",description:"Just audiobooks \ud83c\udfa7",id:2,link:"/audiobooks"},{name:"Audio chapters",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/roma.jpeg",description:"Chapters in audio form \ud83c\udfb5",id:3,link:"/audiochapters"},{name:"Chapters",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/others.jpeg",description:"Chapters written to the whole book \ud83d\udcd6",id:4,link:"/chapters"}],t=(0,a.useMemo)((()=>e),[e]);return(0,p.jsxs)("div",{children:[(0,p.jsxs)(j.m,{children:[(0,p.jsx)("title",{children:"Home - Yee FM"}),(0,p.jsx)("meta",{name:"description",content:"Explore a wide range of content on Yee FM, including audiobooks, ebooks, magazines, comics, and more. Enjoy personalized recommendations and curated playlists."}),(0,p.jsx)("meta",{name:"keywords",content:"Yee FM, music, audiobooks, ebooks, magazines, comics, entertainment, streaming, recommendations, playlists"}),(0,p.jsx)("link",{rel:"icon",href:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,p.jsx)("meta",{property:"og:image",content:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,p.jsx)("meta",{property:"og:type",content:"website"}),(0,p.jsx)("meta",{property:"og:title",content:"Home - Yee FM"}),(0,p.jsx)("meta",{property:"og:description",content:"Explore a wide range of content on Yee FM, including music, audiobooks, ebooks, magazines, comics, and more. Enjoy personalized recommendations and curated playlists."}),(0,p.jsx)("meta",{property:"og:url",content:"https://www.yeefm.com/home"})]}),(0,p.jsxs)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:[(0,p.jsx)(v.A,{children:(0,p.jsx)(k.A,{variant:"h5",gutterBottom:!0,className:"p-4",children:"Top reads"})}),(0,p.jsx)(y,{}),(0,p.jsx)(v.A,{children:(0,p.jsx)(k.A,{variant:"h5",gutterBottom:!0,className:"p-4",children:"Explore Our Categories"})}),(0,p.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4",children:t&&t.map((e=>(0,p.jsx)(n.N_,{to:e.link,className:"no-underline",children:(0,p.jsxs)("div",{className:"bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer",children:[(0,p.jsx)(b.LazyLoadImage,{className:"w-full h-36 object-cover",alt:e.name,height:144,src:e.pic,width:"100%",effect:"blur"}),(0,p.jsxs)("div",{className:"p-4",children:[(0,p.jsx)("h5",{className:"text-lg font-semibold mb-2",children:e.name}),(0,p.jsx)("p",{className:"text-sm text-gray-600",children:e.description})]})]})},e.id)))})]})]})}var S=s(69319),C=s(35016),z=s(5399);const A=(0,a.lazy)((()=>s.e(5588).then(s.bind(s,35588)))),I={FINISHED:"finished",SKIPPED:"skipped"};const _=function(e){let{runTour:t,setRunTour:s}=e;const[o,n]=(0,a.useState)(!1),[r,i]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{localStorage.getItem("tourCompleted")&&n(!0)}),[]),(0,a.useEffect)((()=>{const e=setTimeout((()=>{i(!0)}),1e3);return()=>clearTimeout(e)}),[]),o||!r?null:(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:(0,p.jsx)(A,{steps:[{target:".points-info",content:"Earn points by reading! You can use these points to access premium content for free."},{target:".user-points",content:"Here you can see your total points. that you earn after reading and listening to your content \ud83d\ude0a"}],run:t,callback:e=>{let{status:t}=e;[I.FINISHED,I.SKIPPED].includes(t)&&(s(!1),localStorage.setItem("tourCompleted","true"))}})})},P=()=>{(0,a.useEffect)((()=>{const e=localStorage.getItem("notificationPermission"),t=localStorage.getItem("nextAskDate");(!e||!t||new Date>new Date(t))&&Notification.requestPermission().then((e=>{if(localStorage.setItem("notificationPermission",e),"granted"!==e){const e=new Date;e.setDate(e.getDate()+7),localStorage.setItem("nextAskDate",e.toString())}}))}),[])},E=(0,a.lazy)((()=>Promise.all([s.e(5073),s.e(4972)]).then(s.bind(s,34972)))),F=(0,a.lazy)((()=>s.e(5975).then(s.bind(s,5975)))),L=(0,a.lazy)((()=>s.e(1921).then(s.bind(s,51921)))),D=(0,a.lazy)((()=>s.e(834).then(s.bind(s,10834)))),M=(0,a.lazy)((()=>s.e(9804).then(s.bind(s,69804)))),T=(0,a.lazy)((()=>Promise.all([s.e(5363),s.e(5622),s.e(5560)]).then(s.bind(s,65560)))),B=(0,a.lazy)((()=>s.e(7355).then(s.bind(s,37355))));const O=function(){const[e,t]=(0,a.useState)(!1),[l,c]=(0,a.useState)(!1),[d,u]=(0,a.useState)(""),[h,m]=(0,a.useState)(!0),f=(0,a.useRef)(null),g=(0,o.Zp)(),{user:b,logout:w,isAuthor:y}=(0,C.useAuth)();P();const j=function(e){const[t,o]=(0,a.useState)(0),n=(0,a.useMemo)((()=>e?"https://yeeplatformbackend.azurewebsites.net/getUserPoints/".concat(e.firebaseId):null),[e]);return(0,a.useEffect)((()=>{(async()=>{if(n)try{const e=await s.e(8821).then(s.bind(s,8821)),t=await e.get(n);o(t.data.points)}catch(e){}})()}),[n]),t}(b);return(0,a.useEffect)((()=>{(0,z.Cg)("page_view",{page_path:"/Home"})}),[]),(0,p.jsxs)("div",{className:"flex h-screen bg-gray-100",children:[(0,p.jsx)(x,{sidebarOpen:e,setSidebarOpen:t,handleSectionClick:e=>{u(e),t(!1)},selectedSection:d}),(0,p.jsx)(_,{runTour:h,setRunTour:m}),(0,p.jsxs)("div",{className:"flex-1 flex flex-col overflow-hidden",children:[(0,p.jsxs)("header",{className:"flex justify-between items-center p-4 text-black z-10",style:{backgroundColor:"#FFD700"},children:[(0,p.jsx)("button",{onClick:()=>t(!e),className:"focus:outline-none lg:hidden ".concat(e?"hidden":""),children:(0,p.jsx)(r.A,{className:"h-6 w-6 text-black"})}),(0,p.jsxs)("div",{className:"flex items-center justify-center ml-auto",children:[b&&(0,p.jsx)("div",{className:"mr-4 text-black user-points",children:"Points: ".concat(j)}),b?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("button",{onClick:()=>{g(y?"/dashboard":"/myaccount")},className:"px-3 py-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black no-underline hover:scale-110",children:"My Account"}),(0,p.jsx)("button",{onClick:async()=>{try{const e=(await s.e(64).then(s.t.bind(s,30064,23))).default;(await e.fire({title:"Are you sure you want to log out?",text:"You will be logged out of your account.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#FFD700",cancelButtonColor:"#FF8C00",confirmButtonText:"Yes, log me out",cancelButtonText:"No, cancel",showClass:{popup:"animate__animated animate__fadeInUp animate__faster"},hideClass:{popup:"animate__animated animate__fadeOutDown animate__faster"}})).isConfirmed&&(await w(),e.fire({toast:!0,position:"top-end",icon:"success",title:"Signed out successfully",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,background:"#fff",didOpen:t=>{t.addEventListener("mouseenter",e.stopTimer),t.addEventListener("mouseleave",e.resumeTimer)}}))}catch(e){(await s.e(64).then(s.t.bind(s,30064,23))).default.fire({title:"Error",text:"An error occurred while logging out.",icon:"error",showConfirmButton:!1,timer:3e3,background:"#FF8C00"})}},className:"px-3 py-2 ml-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black hover:scale-110",children:"Logout"})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(n.N_,{to:"/login",className:"px-3 py-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black no-underline hover:scale-110",children:"Login"}),(0,p.jsx)(n.N_,{to:"/signup",className:"px-3 py-2 ml-2 border border-black rounded text-black hover:bg-yellow-300 hover:text-black no-underline hover:scale-110",children:"Signup"})]})]}),(0,p.jsx)("div",{className:"hidden lg:flex items-center ml-auto",children:(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:(0,p.jsx)(M,{})})}),(0,p.jsx)("button",{onClick:()=>c(!l),className:"lg:hidden focus:outline-none ml-4",ref:f,children:(0,p.jsx)(i.A,{className:"h-6 w-6 text-black"})})]}),l&&(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:(0,p.jsx)(T,{open:l,anchorRef:f.current,handleClose:()=>c(!1),handleListKeyDown:()=>{}})}),(0,p.jsxs)("main",{className:"flex-1 overflow-y-auto p-2",children:[(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:(0,p.jsxs)(o.BV,{children:[(0,p.jsx)(o.qh,{path:"/",index:!0,element:(0,p.jsx)(N,{})}),(0,p.jsx)(o.qh,{path:"home",index:!0,element:(0,p.jsx)(N,{})}),(0,p.jsx)(o.qh,{path:"search",element:(0,p.jsx)(S.default,{})}),(0,p.jsx)(o.qh,{path:"ebooks",element:(0,p.jsx)(E,{})}),(0,p.jsx)(o.qh,{path:"audiobooks",element:(0,p.jsx)(F,{})}),(0,p.jsx)(o.qh,{path:"chapters",element:(0,p.jsx)(L,{})}),(0,p.jsx)(o.qh,{path:"audiochapters",element:(0,p.jsx)(B,{})})]})}),(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("div",{children:"Loading..."}),children:(0,p.jsx)(D,{})})]})]})]})}},29402:(e,t,s)=>{s.d(t,{A:()=>i});s(65043);var a=s(35475),o=s(28883),n=s(9634),r=(s(73812),s(70579));const i=function(e){let{title:t,coverImage:s,itemType:i,itemId:l,rating:c}=e;const d="https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",u=e=>{e.target.src=d};return(0,r.jsxs)("div",{className:"rounded overflow-hidden shadow-lg bg-white w-full",children:[(0,r.jsx)("div",{className:"aspect-w-16 aspect-h-25 overflow-hidden",children:(()=>{switch(i){case"audiobook":return(0,r.jsx)("a",{href:"/audiobooks/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"audiochapter":return(0,r.jsx)("a",{href:"/audiochapters/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"Text":case"notes":case"chapters":return(0,r.jsx)(a.N_,{to:"/chapters/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"ebook":return(0,r.jsx)(a.N_,{to:"/ebooks/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});default:return(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})}})()}),(0,r.jsxs)("div",{className:"px-3 py-1",children:[(0,r.jsx)("div",{className:"font-bold text-md mb-1 line-clamp-2",children:t}),(0,r.jsx)(o.A,{name:"read-only",value:c,readOnly:!0,size:"small"})]}),(0,r.jsx)("div",{className:"px-3 pb-1 flex justify-center",children:(()=>{const e="bg-transparent text-yellow-500 font-bold py-2 px-4 rounded border border-yellow-500 focus:outline-none focus:border-none focus:ring ring-transparent no-underline transition-all duration-300 hover:bg-yellow-500 hover:text-red hover:border-yellow-500 hover:scale-105";switch(i){case"audiobook":return(0,r.jsx)("a",{href:"/audiobooks/".concat(l),className:e,children:"Listen"});case"audiochapter":return(0,r.jsx)("a",{href:"/audiochapters/".concat(l),className:e,children:"Listen"});case"Text":case"Chapters":case"chapter":case"chapters":case"Chapter":return(0,r.jsx)(a.N_,{to:"/chapters/".concat(l),className:e,children:"Chapter"});case"notes":case"PDF":return(0,r.jsx)(a.N_,{to:"/notespdf/".concat(l),className:e,children:"read"});case"ebook":return(0,r.jsx)(a.N_,{to:"/ebooks/".concat(l),className:"no-underline ".concat(e),children:"Book"});default:return null}})()})]})}},5202:(e,t,s)=>{s.d(t,{A:()=>r});s(65043);var a=s(59135),o=s(88911),n=s(70579);const r=e=>{let{totalPages:t,currentPage:s,onChange:r}=e;return(0,n.jsx)(o.A,{spacing:2,alignItems:"center",className:"w-full py-4",children:(0,n.jsx)(a.A,{count:t,page:s,onChange:r,sx:{"& .MuiPaginationItem-root":{color:"#FFDE59"},"& .Mui-selected":{backgroundColor:"#FFDE59",color:"white"},"& .MuiPaginationItem-root:hover":{backgroundColor:"#fdd835",color:"white"},"& .MuiPaginationItem-ellipsis":{color:"black"},"& .Mui-focusVisible":{backgroundColor:"#FFDE59",color:"white"},"& .MuiPaginationItem-root.Mui-selected:hover, & .MuiPaginationItem-root.Mui-selected.Mui-focusVisible":{backgroundColor:"#FFDE59",color:"white"}}})})}}}]);
//# sourceMappingURL=8801.16bfcee1.chunk.js.map