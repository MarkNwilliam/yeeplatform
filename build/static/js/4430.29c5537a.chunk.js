"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[4430,5399],{46681:(e,t,a)=>{a.d(t,{A:()=>i});var o=a(65043),s=a(71935),n=(a(88331),a(70579));const i=e=>{let{handleNewUserMessage:t}=e;const[a,i]=(0,o.useState)(!0);return(0,n.jsx)(s.Widget,{handleNewUserMessage:t,title:"Ebook Chatbot",subtitle:"Ask me anything about this ebook",profileAvatar:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp",emojis:"true",handleToggle:e=>{i((e=>!e))}})}},97949:(e,t,a)=>{a.d(t,{A:()=>n});a(65043);var o=a(519),s=a(70579);const n=e=>{let{shareUrl:t,selectedText:a}=e;const n='Check out this quote: "'.concat(a,'" from @YeePlatform! ').concat("https://www.yeeplatform.com"," #").concat("YeePlatform");return(0,s.jsxs)("div",{className:"share-box w-full max-w-md mx-auto p-4",children:[(0,s.jsxs)("div",{className:"share-header mb-4",children:[(0,s.jsx)("img",{src:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp",alt:"YeePlatform Logo",className:"logo w-12 h-auto"}),(0,s.jsx)("span",{className:"share-title text-lg",children:"Share this quote with friends:"})]}),(0,s.jsxs)("div",{className:"share-icons flex justify-center",children:[(0,s.jsx)(o.uI,{title:"Test",url:t,quote:n,children:(0,s.jsx)(o.ik,{size:32,round:!0})}),(0,s.jsx)(o.r6,{url:t,title:n,children:(0,s.jsx)(o.Fi,{size:32,round:!0})}),(0,s.jsx)(o.wk,{url:t,title:n,children:(0,s.jsx)(o._z,{size:32,round:!0})}),(0,s.jsx)(o.Kz,{url:t,title:n,children:(0,s.jsx)(o.Y4,{size:32,round:!0})}),(0,s.jsx)(o.Ot,{url:t,subject:"Check out this quote",body:n,children:(0,s.jsx)(o.aZ,{size:32,round:!0})})]})]})}},5399:(e,t,a)=>{a.d(t,{$s:()=>s.$s,Cg:()=>c,GoogleAuthProvider:()=>n.HF,auth:()=>l,onAuthStateChanged:()=>n.hg,signInWithEmailAndPassword:()=>n.x9,signInWithPopup:()=>n.df,signOut:()=>n.CI,zS:()=>d});var o=a(37064),s=a(82413),n=a(32813);const i={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let r,l,d;(async()=>{if(!r){r=(0,o.Wp)(i),l=(0,n.xI)(r);await(0,s.TT)()&&(d=(0,s.P5)(r))}})();const c=(e,t)=>{d&&(0,s.$s)(d,e,t)}},8653:(e,t,a)=>{a.r(t),a.d(t,{default:()=>M});var o=a(65043),s=a(73216),n=a(73237),i=a(64980),r=a(86691),l=a(5399),d=a(46749),c=a(56409),p=(a(89709),a(91148),a(85369)),u=a(30064),h=a.n(u),x=a(41591),g=(a(97949),a(48698),a(68817)),m=a(68016),f=a(81637),j=a(85865),y=a(96446),b=a(67254),v=a(46681),w=a(71935),S=a(86213),k=a(1043),I=a.n(k),C=a(81929),P=a.n(C),z=a(70579);const M=function(){var e;const{id:t}=(0,s.g)(),[a,u]=(0,o.useState)(!1),[k,C]=(0,o.useState)(null),[M,A]=(0,o.useState)(null),[N,O]=(0,o.useState)([]),[T,F]=(0,o.useState)(0),[L,_]=(0,o.useState)(1),[D,Y]=(0,o.useState)(!1),[E,U]=(0,o.useState)(null),W=()=>{Y(!0)},R=()=>{Y(!1)},V=(0,s.Zp)(),J=(0,r.A)("(max-width:626px)"),Z=(0,r.A)("(max-width:400px)"),q=J?.8:1,B=Z?"wrap":"nowrap",G=null===(e=l.auth.currentUser)||void 0===e?void 0:e.email;function H(e){return(0,z.jsxs)(y.A,{sx:{position:"relative",display:"inline-flex"},children:[(0,z.jsx)(f.A,{variant:"determinate",...e}),(0,z.jsx)(y.A,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,z.jsx)(j.A,{variant:"caption",component:"div",color:"text.secondary",children:"".concat(Math.round(e.value),"%")})})]})}(0,o.useEffect)((()=>{(async()=>{u(!0);try{const e=await fetch("https://yeeplatformbackend.azurewebsites.net/getEbook/".concat(t),{cache:"force-cache"});if(!e.ok)return;const a=await e.json();A(a),C(null===a||void 0===a?void 0:a.ebookUrl)}catch(e){}finally{u(!1)}})()}),[t]);const K=async()=>{const e=await(async()=>{const e=await(0,d.getDocument)(k).promise,t=await e.getPage(L+1);return(await t.getTextContent()).items.map((e=>e.str)).join(" ")})();U(null);const{value:t}=await h().fire({title:"Select language",html:'\n        <form id="languageForm" style="display: flex; flex-direction: column; align-items: start;">\n            <label><input type="radio" name="language" value="eng"> English</label><br>\n            <label><input type="radio" name="language" value="swh"> Swahili</label><br>\n            <label><input type="radio" name="language" value="spa"> Spanish</label><br>\n            <label><input type="radio" name="language" value="arz"> Arabic</label><br>\n            <label><input type="radio" name="language" value="fra"> French</label><br>\n            \n          </form>\n        ',focusConfirm:!1,preConfirm:()=>{const e=document.getElementById("languageForm").elements.language;let t;for(let a=0;a<e.length;a++)if(e[a].checked){t=e[a].value;break}return t}});if(t){h().fire({title:"Loading...",allowOutsideClick:!1,onBeforeOpen:()=>{h().showLoading()}});let o=M.title.replace(/\s+/g,"_").replace(/[^a-zA-Z0-9_]/g,"");try{const a=(await S.A.post("https://yeeplatform.com/server/synthesize",{text:e,book_title:o,page_number:L.toString(),language:t},{timeout:6e6})).data.audio_url;U("https://yeeplatform.com/server/"+a),h().close()}catch(a){h().fire({icon:"error",title:"Oops...",text:"Something went wrong!",footer:"<a href>Why do I have this issue?</a>"})}}},$=(0,c.scrollModePlugin)(),{SwitchScrollModeButton:X}=$,Q=(0,i.defaultLayoutPlugin)({sidebarTabs:e=>[e[0],e[1]],renderToolbar:e=>(0,z.jsx)(e,{children:e=>{const{CurrentPageInput:a,SwitchTheme:o,EnterFullScreen:s,GoToNextPage:i,GoToPreviousPage:r,NumberOfPages:l,ShowSearchPopover:d,Zoom:c,ZoomIn:u,ZoomOut:h}=e;return(0,z.jsxs)("div",{style:{alignItems:"center",display:"flex",flexWrap:{defaultWrap:B},justifyContent:"space-between",width:"100%",height:"auto",backgroundColor:"#ffde5a",padding:"10px"},children:[(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)("button",{onClick:()=>V("/ebooks/".concat(t)),children:(0,z.jsx)(p.QVr,{})})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(d,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(h,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(c,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(u,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,z.jsx)(r,{})}),(0,z.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:"0px 2px"},children:[(0,z.jsx)(a,{})," / ",(0,z.jsx)(l,{})]}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(i,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)("button",{onClick:K,children:(0,z.jsx)(p.gSK,{})})}),!J&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,z.jsx)(s,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,z.jsx)(o,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Vertical})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Horizontal})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Wrapped})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Page})})]}),J&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(m.A,{onClick:W,children:"Options"}),(0,z.jsxs)(g.Ay,{anchor:"right",open:D,onClose:R,children:[(0,z.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,z.jsx)(s,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,z.jsx)(o,{})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Vertical})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Horizontal})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Wrapped})}),(0,z.jsx)("div",{style:{padding:"0px 2px"},children:(0,z.jsx)(X,{mode:n.ScrollMode.Page})})]})]})]})}})}),ee=async()=>{const e=JSON.parse(localStorage.getItem("ebookData"));if(e&&e.read)try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/updateViewedBooks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:l.auth.currentUser.uid,bookId:e.id})});await t.json()}catch(t){}},te=async()=>{const e=JSON.parse(localStorage.getItem("ebookData"));if(e)try{await fetch("https://yeeplatformbackend.azurewebsites.net/updateEbookScores",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:l.auth.currentUser.uid,bookId:e.id,score:e.percentageVisited})})}catch(t){}},ae=async()=>{try{const e=localStorage.getItem("ebookID");await fetch("https://yeeplatformbackend.azurewebsites.net/recordEbookView",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:l.auth.currentUser.uid,ebookId:e})})}catch(e){}};return(0,z.jsxs)("div",{style:{height:"100vh",width:"100%"},children:[M&&(0,z.jsxs)(x.m,{children:[(0,z.jsx)("title",{children:(null===M||void 0===M?void 0:M.title)||"Ebook Reader - Yee FM"}),(0,z.jsx)("meta",{name:"description",content:(null===M||void 0===M?void 0:M.description)||"Read your favorite ebooks on Yee FM."}),(0,z.jsx)("meta",{name:"keywords",content:"Yee FM, ebooks, reading, literature, digital library"}),(0,z.jsx)("link",{rel:"icon",href:(null===M||void 0===M?void 0:M.coverImage_optimized_url)||(null===M||void 0===M?void 0:M.coverImage)||(null===M||void 0===M?void 0:M.coverimage)||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,z.jsx)("meta",{property:"og:title",content:(null===M||void 0===M?void 0:M.title)||"Ebook Reader - Yee FM"}),(0,z.jsx)("meta",{property:"og:description",content:(null===M||void 0===M?void 0:M.description)||"Read your favorite ebooks on Yee FM."}),(0,z.jsx)("meta",{property:"og:image",content:(null===M||void 0===M?void 0:M.coverImage)||(null===M||void 0===M?void 0:M.coverimage)||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,z.jsx)("meta",{property:"og:type",content:"book"}),(0,z.jsx)("meta",{property:"og:url",content:window.location.href})]}),(0,z.jsx)("style",{jsx:!0,children:"\n      @media only screen and (max-width: 500px) {\n        /* Styles for mobile devices */\n        .pdf-viewer {\n          width: 100%;\n          height: auto;\n        }\n      }\n\n      .rpv-core__viewer--loading .rpv-core__viewer-document {\n        visibility: hidden;\n      }\n    "}),E&&(0,z.jsx)(P(),{children:(0,z.jsxs)("div",{style:{position:"absolute",bottom:"10px",left:"50%",transform:"translateX(-50%)",zIndex:1e3,backgroundColor:"transparent",padding:"10px",borderRadius:"10px",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"},children:[(0,z.jsx)(I(),{url:E,controls:!0,playing:!0}),(0,z.jsx)("button",{onClick:()=>U(null),style:{marginTop:"10px",backgroundColor:"#f44336",color:"#fff",border:"none",borderRadius:"5px",padding:"5px 10px",cursor:"pointer"},children:"Cancel"})]})}),a?(0,z.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:"Loading..."}):k?(0,z.jsx)(n.Worker,{workerUrl:"https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",children:(0,z.jsx)(n.Viewer,{fileUrl:k,transformGetDocumentParams:e=>Object.assign({},e,{disableRange:!1,disableStream:!0,disableAutoFetch:!0}),scrollMode:n.ScrollMode.Page,defaultScale:q,onPageChange:async e=>{let{currentPage:a}=e;_(a),O([...N,a]);const o=new Set(N).size,s=o/T*100;s>=30&&(await ee(),await te());const n={id:t,pageNumbers:N,uniquePageCount:o,percentageVisited:s,read:s>=30};localStorage.setItem("ebookData",JSON.stringify(n));JSON.parse(localStorage.getItem("ebookData"))},onDocumentLoad:e=>{let{doc:a}=e;F(a.numPages),localStorage.getItem("ebookID")!==t&&(localStorage.setItem("ebookID",t),localStorage.setItem("viewed","true"),ae())},renderLoader:e=>(0,z.jsxs)("div",{children:[(0,z.jsx)("h2",{className:"text-yellow-500 font-bold",children:"Please wait, it's coming..."}),(0,z.jsx)("div",{style:{width:"100%"},children:(0,z.jsx)(H,{value:Math.round(e)})})]}),plugins:[Q,$]})}):(0,z.jsx)(z.Fragment,{children:(0,z.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,z.jsx)(b.A,{severity:"error",children:"No PDF found."})})}),(0,z.jsx)(v.A,{handleNewUserMessage:e=>{(0,w.toggleMsgLoader)(),fetch("https://yeeplatform.com/server/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ebook_id:M._id,query:e,user_id:G||"guest",title:M.title||"test",Description:M.Description||"test"})}).then((e=>e.json())).then((e=>{(0,w.addResponseMessage)(e.response)})).catch((e=>{(0,w.addResponseMessage)("Sorry, something went wrong.")})).finally((()=>{(0,w.toggleMsgLoader)()}))}})]})}}}]);
//# sourceMappingURL=4430.29c5537a.chunk.js.map