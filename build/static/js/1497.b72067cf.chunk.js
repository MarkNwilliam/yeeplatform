"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[1497],{51497:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var o=a(72791),s=a(66331),n=a(70711),l=a(80184);function r(){const[e,t]=(0,o.useState)([]),[a,r]=(0,o.useState)(1),[c,i]=(0,o.useState)(100),[d,g]=(0,o.useState)(""),[u,h]=(0,o.useState)(!0);(0,o.useEffect)((()=>{m()}),[a,d]);const m=async()=>{h(!0);try{const e=d?"http://localhost:3000/search?term=".concat(d,"&page=").concat(a,"&limit=15"):"http://localhost:3000/getallcontent?page=".concat(a,"&limit=15"),o=await fetch(e);if(!o.ok)throw new Error("Data fetching failed with status: ".concat(o.status));const s=await o.json();console.log("Response data:",s),t(s.data),i(Math.ceil(s.totalItems/15))}catch(e){console.error("Error fetching data:",e)}h(!1)},p=(e,t)=>{r(t)};return(0,l.jsxs)("div",{className:"flex flex-col items-center p-4",children:[(0,l.jsxs)("div",{className:"mb-4 flex items-center",children:[(0,l.jsx)("input",{type:"text",placeholder:"Search for content...",value:d,onChange:e=>{g(e.target.value)},className:"p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200",style:{width:"300px"}}),(0,l.jsx)("button",{onClick:()=>{m()},className:"ml-2 p-3 border border-gray-300 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300",style:{minWidth:"100px"},children:"Search"})]}),(0,l.jsx)(n.Z,{totalPages:c,currentPage:a,onChange:p}),(0,l.jsx)("div",{className:"p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:u?(0,l.jsx)("p",{className:"text-yellow-500 animate-pulse",children:"Loading content..."}):e.map(((e,t)=>(0,l.jsx)(s.Z,{title:e.title,coverImage:e.thumbnailUrl||e.coverImage||e.coverimage,itemType:e.type||"unknown",itemId:e._id,rating:e.rating},t)))}),(0,l.jsx)(n.Z,{totalPages:c,currentPage:a,onChange:p})]})}}}]);
//# sourceMappingURL=1497.b72067cf.chunk.js.map