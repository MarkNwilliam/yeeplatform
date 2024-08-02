"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[1469,5016,5399],{90594:(e,t,s)=>{s.d(t,{A:()=>m});var a=s(65043),o=s(26600),r=s(90035),n=s(88861),l=s(11906),c=s(96446),i=s(28883),d=s(81637),u=s(12220),h=s(70579);const m=function(e){const{onClose:t,open:s,type:m,_id:p,userEmail:g,setSnackbarMessage:f}=e,[x,b]=a.useState(""),[y,v]=a.useState(5),[j,w]=(0,a.useState)(null),[k,N]=(0,a.useState)(!1),[A,S]=(0,a.useState)(!1),C=()=>{k||(f("Working on it..."),t())};return(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/user/".concat(g,"/").concat(m,"/").concat(p,"/reviews"));if(!e.ok)throw new Error("HTTP error! status: ".concat(e.status));const t=await e.json();t&&t.length>0&&w(t[0])}catch(e){}})()}),[]),(0,a.useEffect)((()=>{j&&(b(j.comment),v(j.rating))}),[j]),(0,h.jsxs)(r.A,{onClose:C,open:s,children:[(0,h.jsx)(o.A,{children:"Add a Review"}),(0,h.jsxs)(c.A,{p:1,children:[(0,h.jsx)(i.A,{name:"simple-controlled",value:y,onChange:(e,t)=>{v(t)}}),(0,h.jsx)(n.A,{autoFocus:!0,margin:"dense",id:"review",label:"Your Review",type:"text",fullWidth:!0,value:x,onChange:e=>{b(e.target.value)}}),(0,h.jsx)(l.A,{onClick:()=>{j?(async()=>{N(!0),f("Updating review...");const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/user/".concat(g,"/").concat(m,"/").concat(p,"/review/").concat(j._id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({rating:y,comment:x})});await e.json(),e.ok?(f("Review updated successfully"),S(!0),N(!1)):(f("Failed to update review"),S(!0),N(!1)),S(!0),N(!1)})():(async()=>{N(!0),f("Posting review...");try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/".concat(m),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({audiobookId:p,userEmail:g,rating:y,comment:x})}),t=await e.json();"User has already reviewed this audiobook"===t.message?(f(t.message),S(!0),N(!1)):f("Review posted successfully"),S(!0)}catch(e){f("Failed to post review"),S(!0),N(!1)}N(!1)})(),C()},color:"primary",children:"Submit"}),(0,h.jsx)(l.A,{onClick:async()=>{f("Deleting review..."),N(!0);try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/user/".concat(g,"/").concat(m,"/").concat(p,"/review/").concat(j._id),{method:"DELETE"});await e.json();e.ok?(f("Review deleted successfully"),S(!0),C(),N(!1)):(f("Failed to delete review"),S(!0),N(!1)),S(!0)}catch(e){f("Failed to delete review"),S(!0)}N(!1)},color:"secondary",children:"Delete Review"})]}),(0,h.jsx)(u.A,{open:k,children:(0,h.jsx)(d.A,{color:"inherit"})})]})}},14878:(e,t,s)=>{s.d(t,{A:()=>u});s(65043);var a=s(73216),o=s(35801),r=s(85883),n=s(43867),l=s(50419),c=s(52907),i=s(68016),d=s(70579);const u=e=>{let{open:t,onClose:s}=e;const u=(0,a.Zp)();return(0,d.jsxs)(o.A,{open:t,onClose:s,children:[(0,d.jsx)(r.A,{children:"Login Required"}),(0,d.jsx)(n.A,{children:(0,d.jsx)(l.A,{children:"Please log in to add a review."})}),(0,d.jsxs)(c.A,{children:[(0,d.jsx)(i.A,{onClick:s,color:"primary",children:"Close"}),(0,d.jsx)(i.A,{onClick:()=>{u("/login")},color:"primary",variant:"outlined",children:"Log In"})]})]})}},35016:(e,t,s)=>{s.r(t),s.d(t,{AuthContext:()=>n,AuthProvider:()=>c,default:()=>i,useAuth:()=>l});var a=s(65043),o=s(53536),r=s(70579);const n=(0,a.createContext)();function l(){return a.useContext(n)}function c(e){let{children:t}=e;const[l,c]=(0,a.useState)(!1),[i,d]=(0,a.useState)(null),[u,h]=(0,a.useState)(!0),[m,p]=(0,a.useState)((()=>JSON.parse(localStorage.getItem("isVerified"))||!1)),g=(0,a.useCallback)((0,o.debounce)((async e=>{if(e&&e.uid)try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/isAuthor/".concat(e.uid));if(t.ok){const e=await t.json();c(e.isAuthor)}}catch(t){}}),15e3),[]),f=(0,a.useCallback)((async(e,t)=>{const{auth:a,signInWithEmailAndPassword:o}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399));try{var r;const s=await o(a,e,t);d(s.user);const n=(null===(r=s.user)||void 0===r?void 0:r.emailVerified)||!1;p(n),localStorage.setItem("isVerified",n.toString())}catch(n){}}),[]),x=(0,a.useCallback)((async()=>{const{auth:e,signInWithPopup:t,GoogleAuthProvider:a}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399)),o=new a;try{var r;const s=await t(e,o);d(s.user);const a=(null===(r=s.user)||void 0===r?void 0:r.emailVerified)||!1;p(a),localStorage.setItem("isVerified",a.toString())}catch(n){}}),[]),b=(0,a.useCallback)((async()=>{const{auth:e,signOut:t}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399));try{await t(e),d(null),c(!1)}catch(a){}}),[]);(0,a.useEffect)((()=>{(async()=>{const{auth:e,onAuthStateChanged:t}=await Promise.all([s.e(2813),s.e(2548),s.e(5399)]).then(s.bind(s,5399)),a=t(e,(async e=>{d(e),h(!1),e&&(p(e.emailVerified),localStorage.setItem("isVerified",e.emailVerified.toString()))}))})()}),[]),(0,a.useEffect)((()=>{i&&g(i)}),[i,g]);const y={user:i,isAuthor:l,loading:u,isVerified:m,login:f,logout:b,loginWithGoogle:x};return(0,r.jsx)(n.Provider,{value:y,children:t})}const i=c},5399:(e,t,s)=>{s.d(t,{$s:()=>o.$s,Cg:()=>d,GoogleAuthProvider:()=>r.HF,auth:()=>c,onAuthStateChanged:()=>r.hg,signInWithEmailAndPassword:()=>r.x9,signInWithPopup:()=>r.df,signOut:()=>r.CI,zS:()=>i});var a=s(37064),o=s(82413),r=s(32813);const n={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let l,c,i;(async()=>{if(!l){l=(0,a.Wp)(n),c=(0,r.xI)(l);await(0,o.TT)()&&(i=(0,o.P5)(l))}})();const d=(e,t)=>{i&&(0,o.$s)(i,e,t)}},35755:(e,t,s)=>{s.r(t),s.d(t,{default:()=>v});var a=s(65043),o=s(73216),r=s(28883),n=s(29402),l=s(5399),c=s(41591),i=s(10611),d=s(63336),u=s(59135),h=s(90594),m=s(35016),p=s(14878),g=s(18729),f=s(17392),x=s(74802),b=s(11906),y=s(70579);const v=()=>{const{id:e}=(0,o.g)(),t=(0,o.Zp)(),[s,v]=(0,a.useState)(null),[j,w]=(0,a.useState)(!0),[k,N]=(0,a.useState)(null),[A,S]=(0,a.useState)([]),[C,I]=(0,a.useState)([]),[_,z]=(0,a.useState)(2),[P,E]=(0,a.useState)(1),[L,D]=(0,a.useState)(1),[T,R]=(0,a.useState)(!1),[O,V]=(0,a.useState)(!1),{user:F}=(0,m.useAuth)(),[W,B]=a.useState(!1),[$,M]=(0,a.useState)(""),G="https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",H=(0,a.useCallback)((e=>e.split(".").pop()),[]),U=(0,a.useCallback)((async()=>{try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/ebook/".concat(e,"/reviews?page=").concat(P,"&limit=2")),s=await t.json();S(s)}catch(t){N(t.message)}}),[e,P]),J=(0,a.useCallback)((async t=>{try{const s=await fetch("https://yeeplatformbackend.azurewebsites.net/category/ebook/".concat(t[0],"?page=").concat(L,"&limit=10")),a=await s.json();I(a.filter((t=>t._id!==e)))}catch(s){N(s.message)}}),[e,L]);(0,a.useEffect)((()=>{$&&B(!0),(async()=>{try{const t=fetch("https://yeeplatformbackend.azurewebsites.net/getEbook/".concat(e)),[s]=await Promise.all([t]).then((e=>Promise.all(e.map((e=>e.json())))));v(s),U(),J(s.categories),(0,l.$s)(l.zS,"".concat(s.title," visited"))}catch(t){N(t.message)}finally{w(!1)}})()}),[e,U,l.zS,J]);const Y=(0,a.useCallback)((()=>{t("/")}),[t]),Z=(0,a.useCallback)((()=>{if(!s)return;const a=H(s.ebookUrl||s.ebookurl||s.ebook_url||"");"pdf"===a?((0,l.$s)(l.zS,"pdf opened"),t("/ebooks/".concat(e,"/read"))):"epub"===a&&((0,l.$s)(l.zS,"epub opened"),t("/ebooks/epub/".concat(e)))}),[s,e,H,l.$s,t]),q=async e=>{R(!1),B(!0);try{await U()}catch(k){}},K=(e,t)=>{"clickaway"!==t&&B(!1)},X=(0,y.jsxs)(a.Fragment,{children:[(0,y.jsx)(b.A,{color:"secondary",size:"small",onClick:q,children:"CLOSE"}),(0,y.jsx)(f.A,{size:"small","aria-label":"close",color:"inherit",onClick:K,children:(0,y.jsx)(x.A,{fontSize:"small"})})]}),Q=(0,a.useMemo)((()=>s?(0,y.jsxs)(c.m,{children:[(0,y.jsx)("title",{children:s.title||"Ebook Details - Yee FM"}),(0,y.jsx)("meta",{name:"description",content:s.description}),(0,y.jsx)("link",{rel:"icon",href:s.coverImage_optimized_url||s.coverImage||s.coverimage||s.cover_url||G}),(0,y.jsx)("meta",{property:"og:image",content:s.coverImage_optimized_url||s.coverImage||s.coverimage||G})]}):null),[s,G]);return j?(0,y.jsx)(i.A,{className:"text-yellow-500 animate-pulse flex justify-center items-center h-screen",color:"secondary"}):k?(0,y.jsxs)("div",{className:"flex justify-center items-center h-screen text-red-500",children:["Error: ",k]}):(0,y.jsxs)("div",{className:"container mx-auto p-4",children:[Q,(0,y.jsx)("button",{onClick:Y,className:"mb-4 text-blue-600 hover:text-blue-800",children:"\u2190 Back"}),(0,y.jsxs)("div",{className:"flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-lg shadow",children:[(0,y.jsx)("div",{className:"w-full lg:w-1/4 p-4",children:(0,y.jsx)("img",{src:s.coverImage_optimized_url||s.coverImage||s.coverimage||s.cover_url||G,alt:s.title,onClick:Z,className:"rounded-lg shadow-xl mx-auto",style:{maxWidth:"100%",height:"auto"}})}),(0,y.jsxs)("div",{className:"w-full lg:w-3/4 lg:ml-6 p-4",children:[(0,y.jsx)("h1",{className:"text-3xl font-bold mb-2 text-center lg:text-left ",children:s.title}),(0,y.jsxs)("p",{className:"text-sm text-gray-600 text-center lg:text-left mb-4",children:["Published on: ",new Date(s.publishedDate).toLocaleDateString()]}),(0,y.jsx)(r.A,{name:"read-only",value:s.ratings||0,readOnly:!0}),(0,y.jsxs)("div",{className:"mt-4",children:[(0,y.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Description"}),(0,y.jsx)("p",{className:"text-gray-700",children:s.description})]}),(0,y.jsxs)("div",{className:"mt-6",children:[(0,y.jsx)("h3",{className:"text-lg font-semibold",children:"Details"}),(0,y.jsxs)("div",{className:"space-y-2",children:[(0,y.jsxs)("div",{className:"flex items-center text-center",children:[(0,y.jsx)("span",{className:"font-semibold mr-2",children:"Author:"}),(0,y.jsx)("span",{children:Array.isArray(s.authors)?s.authors.join(", "):s.authors})]}),(0,y.jsxs)("div",{className:"flex items-center text-center",children:[(0,y.jsx)("span",{className:"font-semibold mr-2",children:"ISBN:"}),(0,y.jsx)("span",{children:s.ISBN||"N/A"})]}),(0,y.jsxs)("div",{className:"flex items-center text-center",children:[(0,y.jsx)("span",{className:"font-semibold mr-2",children:"Categories:"}),(0,y.jsx)("span",{children:s.categories.join(", ")})]})]})]}),(0,y.jsx)("button",{onClick:Z,className:"mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",children:"Read Book"}),(0,y.jsxs)("div",{className:"mt-6 relative p-4",children:[(0,y.jsx)("h3",{className:"text-lg font-semibold",children:"Reviews"}),(0,y.jsx)("button",{className:"text-blue-500 px-4 py-2 rounded absolute top-0 right-0",onClick:()=>{F?R(!0):V(!0)},children:"Add Review"}),F&&(0,y.jsx)(h.A,{open:T,onClose:q,type:"ebook",userEmail:F.email,_id:e,setSnackbarMessage:M}),(0,y.jsx)(p.A,{open:O,onClose:()=>{V(!1)}}),A.reviews&&A.reviews.length>0?A.reviews.slice(0,_).map(((e,t)=>(0,y.jsxs)(d.A,{elevation:3,className:"mt-4 p-4 border border-gray-200 rounded-lg relative",children:[(0,y.jsx)(r.A,{name:"read-only",value:e.rating||0,readOnly:!0}),(0,y.jsx)("p",{className:"text-gray-800",children:e.comment}),(0,y.jsx)("p",{className:"text-blue-500 absolute top-2 right-2 text-sm",children:new Date(e.createdAt).toLocaleDateString()})]},t))):(0,y.jsx)("p",{children:"No reviews yet."}),(0,y.jsx)("div",{className:"flex justify-center p-4",children:(0,y.jsx)(u.A,{count:A.totalPages,page:P,onChange:(e,t)=>{E(t)},variant:"outlined",color:"primary"})})]})]})]}),(0,y.jsxs)("div",{className:"mt-8",children:[(0,y.jsx)("h3",{className:"text-lg font-semibold",children:"Related Books"}),(0,y.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:C.length>0?C.map(((e,s)=>(0,y.jsx)(n.A,{title:e.title,coverImage:e.coverImage_optimized_url||e.coverImage||e.coverimage||G,author:Array.isArray(e.authors)?e.authors.join(", "):e.authors,publishedDate:e.publishedDate,description:e.description,onClick:()=>t("/ebook/".concat(e._id))},s))):(0,y.jsx)("p",{children:"No related books found."})}),(0,y.jsx)("div",{className:"flex justify-center p-4",children:(0,y.jsx)(u.A,{count:10,page:L,onChange:(e,t)=>{D(t)},variant:"outlined",color:"primary"})})]}),(0,y.jsx)(g.A,{open:W,autoHideDuration:2e3,onClose:K,message:$,action:X})]})}},29402:(e,t,s)=>{s.d(t,{A:()=>l});s(65043);var a=s(35475),o=s(28883),r=s(9634),n=(s(73812),s(70579));const l=function(e){let{title:t,coverImage:s,itemType:l,itemId:c,rating:i}=e;const d="https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",u=e=>{e.target.src=d};return(0,n.jsxs)("div",{className:"rounded overflow-hidden shadow-lg bg-white w-full",children:[(0,n.jsx)("div",{className:"aspect-w-16 aspect-h-25 overflow-hidden",children:(()=>{switch(l){case"audiobook":return(0,n.jsx)("a",{href:"/audiobooks/".concat(c),children:(0,n.jsx)(r.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"audiochapter":return(0,n.jsx)("a",{href:"/audiochapters/".concat(c),children:(0,n.jsx)(r.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"Text":case"notes":case"chapters":return(0,n.jsx)(a.N_,{to:"/chapters/".concat(c),children:(0,n.jsx)(r.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"ebook":return(0,n.jsx)(a.N_,{to:"/ebooks/".concat(c),children:(0,n.jsx)(r.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});default:return(0,n.jsx)(r.LazyLoadImage,{className:"object-cover w-full h-full",src:s||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})}})()}),(0,n.jsxs)("div",{className:"px-3 py-1",children:[(0,n.jsx)("div",{className:"font-bold text-md mb-1 line-clamp-2",children:t}),(0,n.jsx)(o.A,{name:"read-only",value:i,readOnly:!0,size:"small"})]}),(0,n.jsx)("div",{className:"px-3 pb-1 flex justify-center",children:(()=>{const e="bg-transparent text-yellow-500 font-bold py-2 px-4 rounded border border-yellow-500 focus:outline-none focus:border-none focus:ring ring-transparent no-underline transition-all duration-300 hover:bg-yellow-500 hover:text-red hover:border-yellow-500 hover:scale-105";switch(l){case"audiobook":return(0,n.jsx)("a",{href:"/audiobooks/".concat(c),className:e,children:"Listen"});case"audiochapter":return(0,n.jsx)("a",{href:"/audiochapters/".concat(c),className:e,children:"Listen"});case"Text":case"Chapters":case"chapter":case"chapters":case"Chapter":return(0,n.jsx)(a.N_,{to:"/chapters/".concat(c),className:e,children:"Chapter"});case"notes":case"PDF":return(0,n.jsx)(a.N_,{to:"/notespdf/".concat(c),className:e,children:"read"});case"ebook":return(0,n.jsx)(a.N_,{to:"/ebooks/".concat(c),className:"no-underline ".concat(e),children:"Book"});default:return null}})()})]})}}}]);
//# sourceMappingURL=1469.4d07df0c.chunk.js.map