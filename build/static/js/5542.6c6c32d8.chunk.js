"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[5542],{34083:(e,i,r)=>{r.d(i,{h:()=>a});const a=["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Democratic Republic of the Congo","Republic of the Congo","Cote d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"]},35542:(e,i,r)=>{r.r(i),r.d(i,{default:()=>f});var a=r(72791),o=r(61567),t=r(21830),n=r.n(t),s=r(98011),l=r(56355),d=r(57689),c=r(11087),u=r(40071),g=r(34083),m=r(80184);const f=function(){const[e,i]=(0,a.useState)(""),[r,t]=(0,a.useState)(""),[f,h]=(0,a.useState)(""),[p,y]=(0,a.useState)(""),[x,w]=(0,a.useState)(""),b=(0,d.s0)(),[N,v]=(0,a.useState)(!1),[S,j]=(0,a.useState)(""),C=async e=>{try{const i=await fetch("http://localhost:3000/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),r=await i.json();if(!i.ok)throw new Error(r.message)}catch(i){console.error("Error sending user data to backend:",i),n().fire({icon:"error",title:"Error",text:i.message})}};return(0,m.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-yellow-200 p-4 md:p-0",children:(0,m.jsxs)("div",{className:"max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md",children:[(0,m.jsxs)("div",{className:"text-center",children:[(0,m.jsx)(u.O8Q,{className:"text-gray-700 text-2xl cursor-pointer mb-4",onClick:()=>b(-1)}),(0,m.jsx)("img",{src:"/Y.webp",alt:"Platform logo",loading:"lazy",className:"mx-auto h-16 w-auto mb-2"}),(0,m.jsx)("h2",{className:"text-2xl font-bold text-gray-800",children:"Sign Up"}),(0,m.jsxs)("p",{className:"mt-2 text-gray-600",children:["Already have an account?"," ",(0,m.jsx)(c.rU,{to:"/signin",className:"text-indigo-500 hover:text-indigo-700 underline",children:"Sign In"})]})]}),(0,m.jsxs)("button",{onClick:async()=>{if(navigator.onLine)try{n().fire({title:"Signing up with Google...",allowEscapeKey:!1,allowOutsideClick:!1,willOpen:()=>{n().showLoading()}});const e=new s.hJ,i=(await(0,s.rh)(o.I8,e)).user,r={username:i.displayName,email:i.email,profileImage:i.photoURL,dateJoined:Date.now(),googleId:i.uid,firebaseId:i.uid,authProvider:"google",preferredReadingMode:"LTR",emailVerified:i.emailVerified,settings:{receiveEmailUpdates:!0,receiveNotifications:!0,darkMode:!1},isAuthor:!1};console.log("Sending this user data to the backend:",r),localStorage.setItem("tempUserData",JSON.stringify(r)),await C(r),n().fire({icon:"success",title:"Welcome to YeePlatform!",text:"\ud83c\udf89",timer:2e3,showConfirmButton:!1}),b("/home")}catch(e){console.error("Error signing in with Google:",e),n().fire({icon:"error",title:"Error",text:e.message})}else n().fire({icon:"error",title:"Error",text:"No internet connection"})},className:"w-full py-2 px-4 mb-6 bg-gray-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 flex items-center justify-center",children:[(0,m.jsx)(l.ldW,{className:"mr-2"}),"Continue with Google"]}),(0,m.jsxs)("form",{onSubmit:async i=>{if(i.preventDefault(),e&&f&&p&&x)if(N)if(p===x)try{n().fire({title:"Signing up...",allowEscapeKey:!1,allowOutsideClick:!1,willOpen:()=>{n().showLoading()}});const{user:i}=await(0,s.Xb)(o.I8,f,p);await(0,s.w$)(i).then((()=>{})),n().fire({icon:"info",title:"Verify Your Email",text:"A verification email has been sent. Please check your inbox and verify your email address."});const r={username:e,email:f,password:p,dateJoined:Date.now(),preferredReadingMode:"LTR",firebaseId:i.uid,authProvider:"emailandpassword",emailVerified:i.emailVerified,settings:{receiveEmailUpdates:!0,receiveNotifications:!0,darkMode:!1},isAuthor:!1};localStorage.setItem("tempUserData",JSON.stringify(r)),await C(r),b("/verify-email")}catch(r){console.error("Error signing up:",r);let e=r.message;"auth/email-already-in-use"===r.code&&(e="This email address is already in use."),n().fire({icon:"error",title:"Error",text:e})}else n().fire({icon:"error",title:"Error",text:"Passwords do not match"});else n().fire({icon:"error",title:"Error",text:"You must agree to receive emails to register."});else n().fire({icon:"error",title:"Error",text:"Please fill in all fields"})},className:"space-y-4",autoComplete:"off",children:[(0,m.jsx)("input",{type:"text",id:"name",name:"name",placeholder:"Full Name",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>i(e.target.value)}),(0,m.jsx)("input",{type:"tel",id:"phone",name:"phone",placeholder:"Phone Number",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>t(e.target.value)}),(0,m.jsx)("input",{type:"email",id:"email",name:"email",placeholder:"Email Address",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>h(e.target.value)}),(0,m.jsxs)("select",{id:"country",name:"country",value:S,required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>j(e.target.value),children:[(0,m.jsx)("option",{value:"",disabled:!0,children:"Select your Country"}),Array.isArray(g.h)&&g.h.map(((e,i)=>(0,m.jsx)("option",{value:e,children:e},i)))]}),(0,m.jsx)("input",{type:"password",id:"password",name:"password",placeholder:"Password",minLength:"6",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>y(e.target.value)}),(0,m.jsx)("input",{type:"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirm Password",minLength:"6",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",onChange:e=>w(e.target.value)}),(0,m.jsx)("button",{type:"submit",className:"w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-700",children:"Sign Up"}),(0,m.jsxs)("div",{className:"flex items-center",children:[(0,m.jsx)("input",{type:"checkbox",className:"form-checkbox h-5 w-5 text-indigo-500",checked:N,onChange:e=>v(e.target.checked)}),(0,m.jsx)("label",{className:"ml-2 text-sm text-gray-600",children:"I agree to receive marketing emails, newsletters, promotions, and updates."})]})]})]})})}}}]);
//# sourceMappingURL=5542.6c6c32d8.chunk.js.map