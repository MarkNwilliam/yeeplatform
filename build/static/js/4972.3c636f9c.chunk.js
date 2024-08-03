"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[4972],{34972:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var a=s(65043),r=s(29402),o=s(5202),n=s(5399),i=s(41591),l=s(48625),c=s(66360),d=s(67254),u=s(17121),m=s(70579);function h(){const[e,t]=(0,a.useState)([]),[s,h]=(0,a.useState)(1),[g,f]=(0,a.useState)(100),[p,b]=(0,a.useState)(""),[x,w]=(0,a.useState)(!0),[y,j]=(0,a.useState)(null);(0,a.useEffect)((()=>{(0,n.$s)(n.zS,"Ebooks visited"),v()}),[s]);const v=async()=>{w(!0);try{const e=p?"https://yeeplatformbackend.azurewebsites.net/search/ebooks?title=".concat(p,"&page=").concat(s,"&limit=15"):"https://yeeplatformbackend.azurewebsites.net/getallebooks?page=".concat(s,"&limit=15"),a=await fetch(e);if(!a.ok)throw new Error("Data fetching failed with status: ".concat(a.status));const r=await a.json();r&&r.data?Array.isArray(r.data)?(t(r.data),f(Math.ceil(r.totalItems/15))):(t([r.data]),f(1)):(t([]),f(0))}catch(y){j(y)}w(!1)},k=(e,t)=>{h(t)};return(0,m.jsxs)("div",{className:"flex flex-col items-center p-4",children:[(0,m.jsxs)(i.m,{children:[(0,m.jsx)("title",{children:"Ebooks - Yee FM"}),(0,m.jsx)("meta",{name:"description",content:"Search and show ebooks on Yee FM. Find your favorite books and start reading now!"}),(0,m.jsx)("meta",{name:"keywords",content:"Yee FM, ebooks, search, show, reading, literature, digital library"}),(0,m.jsx)("link",{rel:"icon",href:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,m.jsx)("meta",{property:"og:title",content:"Ebooks - Yee FM"}),(0,m.jsx)("meta",{property:"og:description",content:"Search and show ebooks on Yee FM. Find your favorite books and start reading now!"}),(0,m.jsx)("meta",{property:"og:image",content:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,m.jsx)("meta",{property:"og:url",content:"https://www.yeefm.com/ebooks"}),(0,m.jsx)("meta",{property:"og:type",content:"website"})]}),(0,m.jsxs)("div",{className:"mb-4 flex flex-col sm:flex-row items-center",children:[(0,m.jsx)("input",{type:"text",placeholder:"Search for ebooks...",value:p,onChange:e=>{b(e.target.value)},className:"p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 mb-2 sm:mb-0",style:{width:"100%",maxWidth:"300px"}}),(0,m.jsx)("button",{onClick:()=>{h(1),v()},className:"ml-0 sm:ml-2 p-3 border border-gray-300 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex items-center justify-center",style:{minWidth:"100px"},children:(0,m.jsx)(c.A,{})}),y&&(0,m.jsx)("button",{onClick:()=>{h(1),v()},className:"ml-0 sm:ml-2 p-3 border border-gray-300 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center",style:{minWidth:"100px"},children:(0,m.jsx)(l.A,{})})]}),(0,m.jsx)(o.A,{totalPages:g,currentPage:s,onChange:k}),(0,m.jsx)("div",{className:"p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:x?Array.from({length:10}).map(((e,t)=>(0,m.jsxs)("div",{className:"bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer",children:[(0,m.jsx)(u.A,{variant:"rectangular",width:"200px",height:"144px"}),(0,m.jsxs)("div",{className:"p-4",children:[(0,m.jsx)(u.A,{variant:"text"}),(0,m.jsx)(u.A,{variant:"text"})]})]},t))):e.length>0?e.map(((e,t)=>(0,m.jsx)(r.A,{title:e.title,coverImage:e.coverImage_optimized_url||e.coverImage_optimized_url||e.coverImage||e.thumbnailUrl||e.coverImage||e.coverimage||e.cover_url,itemType:"ebook",itemId:e._id,rating:e.ratings},t))):(0,m.jsx)("div",{className:"flex justify-center items-center w-full",children:(0,m.jsx)(d.A,{severity:"warning",className:"w-full",children:"No results were found for your search. Please check your spelling or search for another term"})})}),(0,m.jsx)(o.A,{totalPages:g,currentPage:s,onChange:k})]})}}}]);
//# sourceMappingURL=4972.3c636f9c.chunk.js.map