"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[5530],{35530:(e,s,o)=>{o.r(s),o.d(s,{default:()=>m});var t=o(72791),n=o(61567),r=o(21830),l=o.n(r),i=o(56355),a=o(98011),c=o(57689),u=o(73575),g=o(80184);const m=function(){const[e,s]=(0,t.useState)(""),[o,r]=(0,t.useState)(""),m=(0,c.s0)(),{login:d,loginWithGoogle:f}=(0,t.useContext)(u.Vo);return(0,g.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-yellow-200 p-4 sm:p-0",children:(0,g.jsxs)("div",{className:"w-full max-w-md bg-white rounded-lg shadow-md p-6",children:[(0,g.jsxs)("div",{className:"flex justify-between items-start mb-6",children:[(0,g.jsx)(i.x_l,{className:"text-gray-800 cursor-pointer",onClick:()=>m(-1)}),(0,g.jsx)("img",{src:"/Y.webp",alt:"Platform logo",loading:"lazy",className:"mx-auto h-16 w-auto mb-2"})]}),(0,g.jsx)("h1",{className:"text-2xl font-bold text-gray-800 mb-4 text-center",children:"Sign In"}),(0,g.jsxs)("button",{onClick:async()=>{const e=new a.hJ;try{l().fire({title:"Signing in with Google...",allowEscapeKey:!1,allowOutsideClick:!1,onBeforeOpen:()=>{l().showLoading()}});const s=await(0,a.rh)(n.I8,e),{email:o,uid:t}=s.user;l().close(),await f(),m("/home")}catch(s){console.error("Error signing in with Google:",s),l().fire({icon:"error",title:"Error",text:s.message})}},className:"w-full py-2 px-4 mb-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center",children:[(0,g.jsx)(i.ldW,{className:"mr-2"}),"Continue with Google"]}),(0,g.jsxs)("form",{onSubmit:async s=>{if(s.preventDefault(),e&&o)try{l().fire({title:"Signing in...",allowEscapeKey:!1,allowOutsideClick:!1,onBeforeOpen:()=>{l().showLoading()}}),await(0,a.e5)(n.I8,e,o),l().close(),await d(e,o),m("/home")}catch(t){console.error("Error signing in:",t),l().fire({icon:"error",title:"Error",text:t.message})}else l().fire({icon:"error",title:"Error",text:"Please fill in all fields"})},autoComplete:"off",children:[(0,g.jsx)("input",{type:"email",id:"email",name:"email",placeholder:"Email Address",required:!0,className:"mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none",onChange:e=>s(e.target.value)}),(0,g.jsx)("input",{type:"password",id:"password",name:"password",placeholder:"Password",minLength:"6",required:!0,className:"mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none",onChange:e=>r(e.target.value)}),(0,g.jsx)("button",{type:"submit",className:"w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800",children:"Sign In"})]}),(0,g.jsxs)("div",{className:"mt-4 text-center",children:[(0,g.jsxs)("span",{className:"text-gray-700 block mb-2",children:["Don't have an account?",(0,g.jsxs)("span",{className:"text-blue-500 cursor-pointer",onClick:()=>m("/signup"),children:[" ","Sign Up"]})]}),(0,g.jsx)("span",{className:"text-gray-700 block",children:(0,g.jsx)("span",{className:"text-blue-500 cursor-pointer",onClick:()=>m("/forgot-password"),children:"Forgot Password?"})}),(0,g.jsx)("span",{className:"text-gray-700 block mt-2",children:(0,g.jsx)("span",{className:"text-blue-500 cursor-pointer",onClick:()=>m("/"),children:"Back Home"})})]})]})})}}}]);
//# sourceMappingURL=5530.91ca4c7c.chunk.js.map