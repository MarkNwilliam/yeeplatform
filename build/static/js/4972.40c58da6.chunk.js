"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[4972],{34972:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var a=s(65043),o=s(29402),r=s(60573),n=s(2253),i=s(41591),c=s(66360),l=s(70579);function d(){const[e,t]=(0,a.useState)([]),[s,d]=(0,a.useState)(1),[m,g]=(0,a.useState)(100),[u,h]=(0,a.useState)(""),[p,b]=(0,a.useState)(!0);(0,a.useEffect)((()=>{(0,n.$s)(n.zS,"Ebooks visited"),f()}),[s,u]);const f=async()=>{b(!0);try{const e=u?"https://yeeplatformbackend.azurewebsites.net/search/ebooks?title=".concat(u,"&page=").concat(s,"&limit=15"):"https://yeeplatformbackend.azurewebsites.net/getallebooks?page=".concat(s,"&limit=15"),a=await fetch(e);if(!a.ok)throw new Error("Data fetching failed with status: ".concat(a.status));const o=await a.json();console.log("Response data:",o),o&&o.data?Array.isArray(o.data)?(t(o.data),g(Math.ceil(o.totalItems/15))):(t([o.data]),g(1)):(t([]),g(0))}catch(e){console.error("Error fetching data:",e)}b(!1)},x=(e,t)=>{d(t)};return(0,l.jsxs)("div",{className:"flex flex-col items-center p-4",children:[(0,l.jsxs)(i.m,{children:[(0,l.jsx)("title",{children:"Ebooks - Yee FM"}),(0,l.jsx)("meta",{name:"description",content:"Search and show ebooks on Yee FM. Find your favorite books and start reading now!"}),(0,l.jsx)("meta",{name:"keywords",content:"Yee FM, ebooks, search, show, reading, literature, digital library"}),(0,l.jsx)("link",{rel:"icon",href:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,l.jsx)("meta",{property:"og:title",content:"Ebooks - Yee FM"}),(0,l.jsx)("meta",{property:"og:description",content:"Search and show ebooks on Yee FM. Find your favorite books and start reading now!"}),(0,l.jsx)("meta",{property:"og:image",content:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,l.jsx)("meta",{property:"og:url",content:"https://www.yeefm.com/ebooks"}),(0,l.jsx)("meta",{property:"og:type",content:"website"})]}),(0,l.jsxs)("div",{className:"mb-4 flex flex-col sm:flex-row items-center",children:[(0,l.jsx)("input",{type:"text",placeholder:"Search for ebooks...",value:u,onChange:e=>{h(e.target.value)},className:"p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 mb-2 sm:mb-0",style:{width:"100%",maxWidth:"300px"}}),(0,l.jsxs)("button",{onClick:()=>{console.log("Search Term:",u),f()},className:"ml-0 sm:ml-2 p-3 border border-gray-300 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex items-center justify-center",style:{minWidth:"100px"},children:[(0,l.jsx)(c.A,{})," "]})]}),(0,l.jsx)(r.A,{totalPages:m,currentPage:s,onChange:x}),(0,l.jsx)("div",{className:"p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:p?(0,l.jsx)("p",{className:"text-yellow-500 animate-pulse",children:"Loading ebooks..."}):e.map(((e,t)=>(0,l.jsx)(o.A,{title:e.title,coverImage:e.coverImage||e.thumbnailUrl||e.coverImage||e.coverimage,itemType:"ebook",itemId:e._id,rating:e.rating},t)))}),(0,l.jsx)(r.A,{totalPages:m,currentPage:s,onChange:x})]})}}}]);
//# sourceMappingURL=4972.40c58da6.chunk.js.map