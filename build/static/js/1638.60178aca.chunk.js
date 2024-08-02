"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[1638,5016,5399],{90594:(e,t,a)=>{a.d(t,{A:()=>m});var s=a(65043),o=a(26600),n=a(90035),r=a(88861),i=a(11906),l=a(96446),c=a(28883),d=a(81637),u=a(12220),h=a(70579);const m=function(e){const{onClose:t,open:a,type:m,_id:p,userEmail:g,setSnackbarMessage:f}=e,[x,b]=s.useState(""),[y,w]=s.useState(5),[j,v]=(0,s.useState)(null),[k,N]=(0,s.useState)(!1),[A,S]=(0,s.useState)(!1),C=()=>{k||(f("Working on it..."),t())};return(0,s.useEffect)((()=>{(async()=>{try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/user/".concat(g,"/").concat(m,"/").concat(p,"/reviews"));if(!e.ok)throw new Error("HTTP error! status: ".concat(e.status));const t=await e.json();t&&t.length>0&&v(t[0])}catch(e){}})()}),[]),(0,s.useEffect)((()=>{j&&(b(j.comment),w(j.rating))}),[j]),(0,h.jsxs)(n.A,{onClose:C,open:a,children:[(0,h.jsx)(o.A,{children:"Add a Review"}),(0,h.jsxs)(l.A,{p:1,children:[(0,h.jsx)(c.A,{name:"simple-controlled",value:y,onChange:(e,t)=>{w(t)}}),(0,h.jsx)(r.A,{autoFocus:!0,margin:"dense",id:"review",label:"Your Review",type:"text",fullWidth:!0,value:x,onChange:e=>{b(e.target.value)}}),(0,h.jsx)(i.A,{onClick:()=>{j?(async()=>{N(!0),f("Updating review...");const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/user/".concat(g,"/").concat(m,"/").concat(p,"/review/").concat(j._id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({rating:y,comment:x})});await e.json(),e.ok?(f("Review updated successfully"),S(!0),N(!1)):(f("Failed to update review"),S(!0),N(!1)),S(!0),N(!1)})():(async()=>{N(!0),f("Posting review...");try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/".concat(m),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({audiobookId:p,userEmail:g,rating:y,comment:x})}),t=await e.json();"User has already reviewed this audiobook"===t.message?(f(t.message),S(!0),N(!1)):f("Review posted successfully"),S(!0)}catch(e){f("Failed to post review"),S(!0),N(!1)}N(!1)})(),C()},color:"primary",children:"Submit"}),(0,h.jsx)(i.A,{onClick:async()=>{f("Deleting review..."),N(!0);try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/user/".concat(g,"/").concat(m,"/").concat(p,"/review/").concat(j._id),{method:"DELETE"});await e.json();e.ok?(f("Review deleted successfully"),S(!0),C(),N(!1)):(f("Failed to delete review"),S(!0),N(!1)),S(!0)}catch(e){f("Failed to delete review"),S(!0)}N(!1)},color:"secondary",children:"Delete Review"})]}),(0,h.jsx)(u.A,{open:k,children:(0,h.jsx)(d.A,{color:"inherit"})})]})}},14878:(e,t,a)=>{a.d(t,{A:()=>u});a(65043);var s=a(73216),o=a(35801),n=a(85883),r=a(43867),i=a(50419),l=a(52907),c=a(68016),d=a(70579);const u=e=>{let{open:t,onClose:a}=e;const u=(0,s.Zp)();return(0,d.jsxs)(o.A,{open:t,onClose:a,children:[(0,d.jsx)(n.A,{children:"Login Required"}),(0,d.jsx)(r.A,{children:(0,d.jsx)(i.A,{children:"Please log in to add a review."})}),(0,d.jsxs)(l.A,{children:[(0,d.jsx)(c.A,{onClick:a,color:"primary",children:"Close"}),(0,d.jsx)(c.A,{onClick:()=>{u("/login")},color:"primary",variant:"outlined",children:"Log In"})]})]})}},35016:(e,t,a)=>{a.r(t),a.d(t,{AuthContext:()=>r,AuthProvider:()=>l,default:()=>c,useAuth:()=>i});var s=a(65043),o=a(53536),n=a(70579);const r=(0,s.createContext)();function i(){return s.useContext(r)}function l(e){let{children:t}=e;const[i,l]=(0,s.useState)(!1),[c,d]=(0,s.useState)(null),[u,h]=(0,s.useState)(!0),[m,p]=(0,s.useState)((()=>JSON.parse(localStorage.getItem("isVerified"))||!1)),g=(0,s.useCallback)((0,o.debounce)((async e=>{if(e&&e.uid)try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/isAuthor/".concat(e.uid));if(t.ok){const e=await t.json();l(e.isAuthor)}}catch(t){}}),15e3),[]),f=(0,s.useCallback)((async(e,t)=>{const{auth:s,signInWithEmailAndPassword:o}=await Promise.all([a.e(2813),a.e(2548),a.e(5399)]).then(a.bind(a,5399));try{var n;const a=await o(s,e,t);d(a.user);const r=(null===(n=a.user)||void 0===n?void 0:n.emailVerified)||!1;p(r),localStorage.setItem("isVerified",r.toString())}catch(r){}}),[]),x=(0,s.useCallback)((async()=>{const{auth:e,signInWithPopup:t,GoogleAuthProvider:s}=await Promise.all([a.e(2813),a.e(2548),a.e(5399)]).then(a.bind(a,5399)),o=new s;try{var n;const a=await t(e,o);d(a.user);const s=(null===(n=a.user)||void 0===n?void 0:n.emailVerified)||!1;p(s),localStorage.setItem("isVerified",s.toString())}catch(r){}}),[]),b=(0,s.useCallback)((async()=>{const{auth:e,signOut:t}=await Promise.all([a.e(2813),a.e(2548),a.e(5399)]).then(a.bind(a,5399));try{await t(e),d(null),l(!1)}catch(s){}}),[]);(0,s.useEffect)((()=>{(async()=>{const{auth:e,onAuthStateChanged:t}=await Promise.all([a.e(2813),a.e(2548),a.e(5399)]).then(a.bind(a,5399)),s=t(e,(async e=>{d(e),h(!1),e&&(p(e.emailVerified),localStorage.setItem("isVerified",e.emailVerified.toString()))}))})()}),[]),(0,s.useEffect)((()=>{c&&g(c)}),[c,g]);const y={user:c,isAuthor:i,loading:u,isVerified:m,login:f,logout:b,loginWithGoogle:x};return(0,n.jsx)(r.Provider,{value:y,children:t})}const c=l},5399:(e,t,a)=>{a.d(t,{$s:()=>o.$s,Cg:()=>d,GoogleAuthProvider:()=>n.HF,auth:()=>l,onAuthStateChanged:()=>n.hg,signInWithEmailAndPassword:()=>n.x9,signInWithPopup:()=>n.df,signOut:()=>n.CI,zS:()=>c});var s=a(37064),o=a(82413),n=a(32813);const r={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let i,l,c;(async()=>{if(!i){i=(0,s.Wp)(r),l=(0,n.xI)(i);await(0,o.TT)()&&(c=(0,o.P5)(i))}})();const d=(e,t)=>{c&&(0,o.$s)(c,e,t)}},47058:(e,t,a)=>{a.r(t),a.d(t,{default:()=>w});var s=a(65043),o=a(73216),n=a(28883),r=a(29402),i=a(5399),l=a(41591),c=a(10611),d=a(63336),u=a(59135),h=a(90594),m=a(35016),p=a(14878),g=a(18729),f=a(17392),x=a(74802),b=a(11906),y=a(70579);const w=()=>{const{id:e}=(0,o.g)(),t=(0,o.Zp)(),[a,w]=(0,s.useState)(null),[j,v]=(0,s.useState)(!0),[k,N]=(0,s.useState)(null),[A,S]=(0,s.useState)([]),[C,I]=(0,s.useState)(2),[_,z]=(0,s.useState)(1),[P,L]=(0,s.useState)(1),[E,T]=(0,s.useState)([]),[D,F]=(0,s.useState)(!1),[O,V]=(0,s.useState)(!1),{user:W}=(0,m.useAuth)(),[R,Y]=s.useState(!1),[B,M]=(0,s.useState)(""),$="https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",G=(0,s.useCallback)((async()=>{try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/reviews/audiobook/".concat(e,"/reviews?page=").concat(_,"&limit=2")),a=await t.json();T(a)}catch(t){N(t.message)}}),[e,_]),H=(0,s.useCallback)((async t=>{try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/getallaudiobooks?page=3&limit=10"),a=await t.json();S(a.data.filter((t=>t._id!==e)))}catch(a){N(a.message)}}),[e,P]);(0,s.useEffect)((()=>{B&&Y(!0),(async()=>{try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/getAudiobook/".concat(e)),[a]=await Promise.all([t]).then((e=>Promise.all(e.map((e=>e.json())))));w(a),G(),H(a.categories),(0,i.$s)("audiobook_detail_fetched",{audiobookId:e})}catch(t){N(t.message)}finally{v(!1)}})()}),[e,G,H,B]);const U=()=>{t("/audiobooklisten/".concat(e,"/listen")),(0,i.$s)(i.zS,"audiobook_detail_listen_clicked",{audiobookId:e})};if(j)return(0,y.jsx)(c.A,{className:"text-yellow-500 flex justify-center items-center h-screen"});const J=e=>{F(!1),Y(!0),G()},Z=(e,t)=>{"clickaway"!==t&&Y(!1)},q=(0,y.jsxs)(s.Fragment,{children:[(0,y.jsx)(b.A,{color:"secondary",size:"small",onClick:J,children:"CLOSE"}),(0,y.jsx)(f.A,{size:"small","aria-label":"close",color:"inherit",onClick:Z,children:(0,y.jsx)(x.A,{fontSize:"small"})})]});return(0,y.jsxs)("div",{className:"container mx-auto p-4",children:[(0,y.jsxs)(l.m,{children:[(0,y.jsxs)("title",{children:[a.title," - Yee FM"]}),(0,y.jsx)("meta",{name:"description",content:a.description}),(0,y.jsx)("meta",{name:"keywords",content:a.keywords||a.genre||a.categories||"audiobook, Yee FM, reading, literature"}),(0,y.jsx)("link",{rel:"icon",href:a.coverImage||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,y.jsx)("meta",{property:"og:title",content:"".concat(a.title," - Yee FM")}),(0,y.jsx)("meta",{property:"og:description",content:a.description}),(0,y.jsx)("meta",{property:"og:image",content:a.coverImage||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,y.jsx)("meta",{property:"og:type",content:"audiobook"}),(0,y.jsx)("meta",{property:"og:url",content:window.location.href}),(0,y.jsx)("meta",{property:"og:audio",content:a.audioUrl}),(0,y.jsx)("meta",{property:"og:audio:type",content:"audio/mpeg"})]}),(0,y.jsx)("button",{onClick:()=>{t("/audiobooks"),(0,i.$s)(i.zS,"audiobook_detail_back_clicked",{audiobookId:e})},className:"mb-4 text-blue-600 hover:text-blue-800",children:"\u2190 Back"}),(0,y.jsxs)("div",{className:"flex flex-col lg:flex-row items-center lg:items-start bg-white rounded-lg shadow",children:[(0,y.jsx)("div",{className:"w-full lg:w-1/4 p-4",children:(0,y.jsx)("img",{src:a.coverImage&&a.coverImage.endsWith("undefined")?$:a.coverImage||$,alt:a.title,onClick:U,className:"rounded-lg shadow-xl mx-auto",style:{maxWidth:"100%",height:"auto"}})}),(0,y.jsxs)("div",{className:"w-full lg:w-3/4 lg:ml-6",children:[(0,y.jsx)("h1",{className:"text-3xl font-bold mb-2 text-center lg:text-left",children:a.title||"N/A"}),(0,y.jsxs)("p",{className:"text-sm text-gray-600 text-center lg:text-left mb-4",children:["Published on: ",new Date(a.publishedDate||"N/A").toLocaleDateString()]}),(0,y.jsx)(n.A,{name:"read-only",value:a.ratings||0,readOnly:!0})," ",(0,y.jsxs)("div",{className:"mt-4",children:[(0,y.jsx)("h2",{className:"text-xl font-semibold mb-2",children:"Description"}),(0,y.jsx)("p",{className:"text-gray-700",children:a.description||"N/A"})]}),(0,y.jsxs)("div",{className:"mt-6",children:[(0,y.jsx)("h3",{className:"text-lg font-semibold",children:"Details"}),(0,y.jsxs)("div",{className:"space-y-2",children:[(0,y.jsxs)("div",{className:"flex items-center text-center",children:[(0,y.jsx)("span",{className:"font-semibold mr-2",children:"Author:"}),(0,y.jsx)("span",{children:a.author||"N/A"})]}),(0,y.jsxs)("div",{className:"flex items-center text-center",children:[(0,y.jsx)("span",{className:"font-semibold mr-2",children:"ISBN:"}),(0,y.jsx)("span",{children:a.ISBN||"N/A"})]}),(0,y.jsxs)("div",{className:"flex items-center text-center",children:[(0,y.jsx)("span",{className:"font-semibold mr-2",children:"Categories:"}),(0,y.jsx)("span",{children:a.categories?a.categories.join(", "):"N/A"})]})]})]}),(0,y.jsx)("button",{onClick:U,className:"mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",children:"Listen"}),(0,y.jsxs)("div",{className:"mt-6 relative p-4",children:[(0,y.jsx)("h3",{className:"text-lg font-semibold",children:"Reviews"}),(0,y.jsx)("button",{className:"text-blue-500 px-4 py-2 rounded absolute top-0 right-0",onClick:()=>{W?F(!0):V(!0)},children:"Add Review"}),W&&(0,y.jsx)(h.A,{open:D,onClose:J,type:"audiobook",userEmail:W.email,_id:e,setSnackbarMessage:M}),(0,y.jsx)(p.A,{open:O,onClose:()=>{V(!1)}}),E.reviews&&E.reviews.length>0?E.reviews.slice(0,C).map(((e,t)=>(0,y.jsxs)(d.A,{elevation:3,className:"mt-4 p-4 border border-gray-200 rounded-lg relative",children:[(0,y.jsx)(n.A,{name:"read-only",value:e.rating||0,readOnly:!0}),(0,y.jsx)("p",{className:"text-gray-800",children:e.comment}),(0,y.jsx)("p",{className:"text-blue-500 absolute top-2 right-2 text-sm",children:new Date(e.createdAt).toLocaleDateString()})]},t))):(0,y.jsx)("p",{children:"No reviews yet."}),(0,y.jsx)("div",{className:"flex justify-center p-4",children:(0,y.jsx)(u.A,{count:E.totalPages,page:_,onChange:(e,t)=>{z(t)},variant:"outlined",color:"primary"})})]})]})]}),(0,y.jsxs)("div",{className:"mt-8",children:[(0,y.jsx)("h3",{className:"text-lg font-semibold",children:"Listen"}),(0,y.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:A.length>0?A.map(((e,t)=>(0,y.jsx)(r.A,{title:e.title,coverImage:e.coverImage,itemType:e.type,itemId:e._id,rating:e.rating},t))):(0,y.jsx)("p",{children:"No related content found."})}),(0,y.jsx)("div",{className:"flex justify-center p-4",children:(0,y.jsx)(u.A,{count:10,page:P,onChange:(e,t)=>{L(t)},variant:"outlined",color:"primary"})})]}),(0,y.jsx)(g.A,{open:R,autoHideDuration:2e3,onClose:Z,message:B,action:q})]})}},29402:(e,t,a)=>{a.d(t,{A:()=>i});a(65043);var s=a(35475),o=a(28883),n=a(9634),r=(a(73812),a(70579));const i=function(e){let{title:t,coverImage:a,itemType:i,itemId:l,rating:c}=e;const d="https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",u=e=>{e.target.src=d};return(0,r.jsxs)("div",{className:"rounded overflow-hidden shadow-lg bg-white w-full",children:[(0,r.jsx)("div",{className:"aspect-w-16 aspect-h-25 overflow-hidden",children:(()=>{switch(i){case"audiobook":return(0,r.jsx)("a",{href:"/audiobooks/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:a||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"audiochapter":return(0,r.jsx)("a",{href:"/audiochapters/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:a||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"Text":case"notes":case"chapters":return(0,r.jsx)(s.N_,{to:"/chapters/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:a||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});case"ebook":return(0,r.jsx)(s.N_,{to:"/ebooks/".concat(l),children:(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:a||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})});default:return(0,r.jsx)(n.LazyLoadImage,{className:"object-cover w-full h-full",src:a||d||"https://yeeplatformstorage.blob.core.windows.net/assets/images/yeeplatform_book_cover.png",alt:t,loading:"lazy",effect:"blur",onError:u})}})()}),(0,r.jsxs)("div",{className:"px-3 py-1",children:[(0,r.jsx)("div",{className:"font-bold text-md mb-1 line-clamp-2",children:t}),(0,r.jsx)(o.A,{name:"read-only",value:c,readOnly:!0,size:"small"})]}),(0,r.jsx)("div",{className:"px-3 pb-1 flex justify-center",children:(()=>{const e="bg-transparent text-yellow-500 font-bold py-2 px-4 rounded border border-yellow-500 focus:outline-none focus:border-none focus:ring ring-transparent no-underline transition-all duration-300 hover:bg-yellow-500 hover:text-red hover:border-yellow-500 hover:scale-105";switch(i){case"audiobook":return(0,r.jsx)("a",{href:"/audiobooks/".concat(l),className:e,children:"Listen"});case"audiochapter":return(0,r.jsx)("a",{href:"/audiochapters/".concat(l),className:e,children:"Listen"});case"Text":case"Chapters":case"chapter":case"chapters":case"Chapter":return(0,r.jsx)(s.N_,{to:"/chapters/".concat(l),className:e,children:"Chapter"});case"notes":case"PDF":return(0,r.jsx)(s.N_,{to:"/notespdf/".concat(l),className:e,children:"read"});case"ebook":return(0,r.jsx)(s.N_,{to:"/ebooks/".concat(l),className:"no-underline ".concat(e),children:"Book"});default:return null}})()})]})}}}]);
//# sourceMappingURL=1638.60178aca.chunk.js.map