"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[7763,5399],{5399:(e,t,n)=>{n.d(t,{$s:()=>i.$s,Cg:()=>d,GoogleAuthProvider:()=>r.HF,auth:()=>l,onAuthStateChanged:()=>r.hg,signInWithEmailAndPassword:()=>r.x9,signInWithPopup:()=>r.df,signOut:()=>r.CI,zS:()=>c});var o=n(37064),i=n(82413),r=n(32813);const a={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let s,l,c;(async()=>{if(!s){s=(0,o.Wp)(a),l=(0,r.xI)(s);await(0,i.TT)()&&(c=(0,i.P5)(s))}})();const d=(e,t)=>{c&&(0,i.$s)(c,e,t)}},84026:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var o=n(65043),i=n(73216),r=n(73237),a=n(64980),s=n(86691),l=n(5399),c=n(46749),d=n(56409),u=(n(89709),n(91148),n(85369)),p=n(30064),h=n.n(p),f=n(41591),m=(n(48698),n(8606)),g=n(68817),x=n(68016),v=n(81637),y=n(85865),w=n(96446),S=n(67254),j=n(70579);const b=function(){const{id:e}=(0,i.g)(),[t,n]=(0,o.useState)(!1),[p,b]=(0,o.useState)(null),[k,I]=(0,o.useState)(null),[A,C]=(0,o.useState)([]),[P,M]=(0,o.useState)(0),{speak:z,cancel:O}=(0,m.o3)(),[R,_]=(0,o.useState)(!1),[T,E]=(0,o.useState)(""),[N,B]=(0,o.useState)(!1),[V,D]=(0,o.useState)(1),[F,L]=(0,o.useState)(!1),W=()=>{L(!0)},Y=()=>{L(!1)},J=(0,i.Zp)(),U=(0,s.A)("(max-width:626px)"),G=(0,s.A)("(max-width:400px)"),Z=U?.8:1,H=G?"wrap":"nowrap";function $(e){return(0,j.jsxs)(w.A,{sx:{position:"relative",display:"inline-flex"},children:[(0,j.jsx)(v.A,{variant:"determinate",...e}),(0,j.jsx)(w.A,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,j.jsx)(y.A,{variant:"caption",component:"div",color:"text.secondary",children:"".concat(Math.round(e.value),"%")})})]})}(0,o.useEffect)((()=>{(async()=>{n(!0);try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/getChapter/".concat(e),{cache:"force-cache"});if(!t.ok)return;const n=await t.json();I(n),b(null===n||void 0===n?void 0:n.doc_location)}finally{n(!1)}})()}),[e]);const q=async()=>{if(!t&&k)try{if(R)O(),_(!1);else{ee();window.speechSynthesis.getVoices();const e=await(async()=>{const e=await(0,c.getDocument)(p).promise,t=await e.getPage(V+1);return(await t.getTextContent()).items.map((e=>e.str)).join(" ")})();z({text:e,rate:.9}),E(e),h().close(),te(),_(!0)}}catch(e){h().close()}},K=(0,d.scrollModePlugin)(),{SwitchScrollModeButton:Q}=K,X=(0,a.defaultLayoutPlugin)({sidebarTabs:e=>[e[0],e[1]],renderToolbar:e=>(0,j.jsx)(e,{children:e=>{const{CurrentPageInput:t,SwitchTheme:n,EnterFullScreen:o,GoToNextPage:i,GoToPreviousPage:a,NumberOfPages:s,SwitchScrollModeMenuItem:l,ShowSearchPopover:c,SwitchScrollMode:d,Zoom:p,ZoomIn:h,ZoomOut:f}=e;return(0,j.jsxs)("div",{style:{alignItems:"center",display:"flex",flexWrap:{defaultWrap:H},justifyContent:"space-between",width:"100%",height:"auto",backgroundColor:"#ffde5a",padding:"10px"},children:[(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)("button",{onClick:()=>J("/chapters"),children:(0,j.jsx)(u.QVr,{})})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(c,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(f,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(p,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(h,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,j.jsx)(a,{})}),(0,j.jsxs)("div",{style:{display:"flex",alignItems:"center",padding:"0px 2px"},children:[(0,j.jsx)(t,{})," / ",(0,j.jsx)(s,{})]}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(i,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)("button",{onClick:q,children:(0,j.jsx)(u.gSK,{})})}),!U&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,j.jsx)(o,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,j.jsx)(n,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Vertical})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Horizontal})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Wrapped})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Page})})]}),U&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(x.A,{onClick:W,children:"Options"}),(0,j.jsxs)(g.Ay,{anchor:"right",open:F,onClose:Y,children:[(0,j.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,j.jsx)(o,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px",marginLeft:"auto"},children:(0,j.jsx)(n,{})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Vertical})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Horizontal})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Wrapped})}),(0,j.jsx)("div",{style:{padding:"0px 2px"},children:(0,j.jsx)(Q,{mode:r.ScrollMode.Page})})]})]})]})}})}),ee=()=>{h().fire({title:"Loading",showClass:{popup:"\n            animate__animated\n            animate__fadeInUp\n            animate__faster\n          "},hideClass:{popup:"\n            animate__animated\n            animate__fadeOutDown\n            animate__faster\n          "},html:"Processing your request...",allowOutsideClick:!1,showConfirmButton:!1,onBeforeOpen:()=>{h().showLoading()}})},te=()=>{_(!0),h().fire({title:"Playing",html:"Text is being played...",showCancelButton:!0,showConfirmButton:!1,cancelButtonText:"Stop",allowOutsideClick:!1,cancelButtonClass:"#ffff00",didClose:()=>{_(!1)}}).then((e=>{e.dismiss===h().DismissReason.cancel&&O()}))},ne=async()=>{const e=JSON.parse(localStorage.getItem("ebookData"));if(e&&e.read)try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/updateViewedBooks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:l.auth.currentUser.uid,bookId:e.id})});await t.json()}catch(t){}},oe=async()=>{const e=JSON.parse(localStorage.getItem("ebookData"));if(e)try{const t=await fetch("https://yeeplatformbackend.azurewebsites.net/updateEbookScores",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:l.auth.currentUser.uid,bookId:e.id,score:e.percentageVisited})});await t.json()}catch(t){}},ie=async()=>{try{const e=localStorage.getItem("ebookID"),t=(localStorage.getItem("viewed"),await fetch("https://yeeplatformbackend.azurewebsites.net/recordEbookView",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:l.auth.currentUser.uid,ebookId:e})}));await t.json()}catch(e){}};return(0,j.jsxs)("div",{style:{height:"100vh",width:"100%"},children:[k&&(0,j.jsxs)(f.m,{children:[(0,j.jsx)("title",{children:(null===k||void 0===k?void 0:k.title)||"Ebook Reader - Yee FM"}),(0,j.jsx)("meta",{name:"description",content:(null===k||void 0===k?void 0:k.description)||"Read your favorite ebooks on Yee FM."}),(0,j.jsx)("meta",{name:"keywords",content:"Yee FM, ebooks, reading, literature, digital library"}),(0,j.jsx)("link",{rel:"icon",href:(null===k||void 0===k?void 0:k.coverImage)||(null===k||void 0===k?void 0:k.coverimage)||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,j.jsx)("meta",{property:"og:title",content:(null===k||void 0===k?void 0:k.title)||"Ebook Reader - Yee FM"}),(0,j.jsx)("meta",{property:"og:description",content:(null===k||void 0===k?void 0:k.description)||"Read your favorite ebooks on Yee FM."}),(0,j.jsx)("meta",{property:"og:image",content:(null===k||void 0===k?void 0:k.coverImage)||(null===k||void 0===k?void 0:k.coverimage)||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,j.jsx)("meta",{property:"og:type",content:"book"}),(0,j.jsx)("meta",{property:"og:url",content:window.location.href})]}),(0,j.jsx)("style",{jsx:!0,children:"\n      @media only screen and (max-width: 500px) {\n        /* Styles for mobile devices */\n        .pdf-viewer {\n          width: 100%;\n          height: auto;\n        }\n      }\n\n      .rpv-core__viewer--loading .rpv-core__viewer-document {\n        visibility: hidden;\n      }\n    "}),t?(0,j.jsx)("div",{children:"Loading..."}):p?(0,j.jsx)(r.Worker,{workerUrl:"https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",children:(0,j.jsx)(r.Viewer,{transformGetDocumentParams:e=>Object.assign({},e,{url:p,disableRange:!1,disableStream:!1,rangeChunkSize:65536,disableAutoFetch:!1,disableFontFace:!0}),scrollMode:r.ScrollMode.Page,defaultScale:Z,onPageChange:async t=>{let{currentPage:n}=t;D(n),C([...A,n]);const o=new Set(A).size,i=o/P*100;i>=30&&(await ne(),await oe());const r={id:e,pageNumbers:A,uniquePageCount:o,percentageVisited:i,read:i>=30};localStorage.setItem("ebookData",JSON.stringify(r));JSON.parse(localStorage.getItem("ebookData"))},onDocumentLoad:t=>{let{doc:n}=t;M(n.numPages),localStorage.getItem("ebookID")!==e&&(localStorage.setItem("ebookID",e),localStorage.setItem("viewed","true"),ie())},renderLoader:e=>(0,j.jsxs)("div",{children:[(0,j.jsx)("h2",{className:"text-yellow-500 font-bold",children:"Please wait, it's coming..."}),(0,j.jsx)("div",{style:{width:"100%"},children:(0,j.jsx)($,{value:Math.round(e)})})]}),plugins:[X,K]})}):(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,j.jsx)(S.A,{severity:"error",children:"No PDF found."})})})]})}},59662:(e,t,n)=>{n.d(t,{A:()=>y});var o=n(58168),i=n(65043),r=n(98587),a=n(69292),s=n(68606),l=n(6803),c=n(72876),d=n(34535),u=n(57056),p=n(32400);function h(e){return(0,p.Ay)("MuiSvgIcon",e)}(0,u.A)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var f=n(70579);const m=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],g=(0,d.Ay)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t["color".concat((0,l.A)(n.color))],t["fontSize".concat((0,l.A)(n.fontSize))]]}})((e=>{let{theme:t,ownerState:n}=e;var o,i,r,a,s,l,c,d,u,p,h,f,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(o=t.transitions)||null==(i=o.create)?void 0:i.call(o,"fill",{duration:null==(r=t.transitions)||null==(r=r.duration)?void 0:r.shorter}),fontSize:{inherit:"inherit",small:(null==(a=t.typography)||null==(s=a.pxToRem)?void 0:s.call(a,20))||"1.25rem",medium:(null==(l=t.typography)||null==(c=l.pxToRem)?void 0:c.call(l,24))||"1.5rem",large:(null==(d=t.typography)||null==(u=d.pxToRem)?void 0:u.call(d,35))||"2.1875rem"}[n.fontSize],color:null!=(p=null==(h=(t.vars||t).palette)||null==(h=h[n.color])?void 0:h.main)?p:{action:null==(f=(t.vars||t).palette)||null==(f=f.action)?void 0:f.active,disabled:null==(m=(t.vars||t).palette)||null==(m=m.action)?void 0:m.disabled,inherit:void 0}[n.color]}})),x=i.forwardRef((function(e,t){const n=(0,c.A)({props:e,name:"MuiSvgIcon"}),{children:d,className:u,color:p="inherit",component:x="svg",fontSize:v="medium",htmlColor:y,inheritViewBox:w=!1,titleAccess:S,viewBox:j="0 0 24 24"}=n,b=(0,r.A)(n,m),k=i.isValidElement(d)&&"svg"===d.type,I=(0,o.A)({},n,{color:p,component:x,fontSize:v,instanceFontSize:e.fontSize,inheritViewBox:w,viewBox:j,hasSvgAsChild:k}),A={};w||(A.viewBox=j);const C=(e=>{const{color:t,fontSize:n,classes:o}=e,i={root:["root","inherit"!==t&&"color".concat((0,l.A)(t)),"fontSize".concat((0,l.A)(n))]};return(0,s.A)(i,h,o)})(I);return(0,f.jsxs)(g,(0,o.A)({as:x,className:(0,a.A)(C.root,u),focusable:"false",color:y,"aria-hidden":!S||void 0,role:S?"img":void 0,ref:t},A,b,k&&d.props,{ownerState:I,children:[k?d.props.children:d,S?(0,f.jsx)("title",{children:S}):null]}))}));x.muiName="SvgIcon";const v=x;function y(e,t){function n(n,i){return(0,f.jsx)(v,(0,o.A)({"data-testid":"".concat(t,"Icon"),ref:i},n,{children:e}))}return n.muiName=v.muiName,i.memo(i.forwardRef(n))}},8606:(e,t,n)=>{var o=n(87216);var i=n(38441);function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"o3",{enumerable:!0,get:function(){return r(i).default}})},87216:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,i=!1,r=void 0;try{for(var a,s=e[Symbol.iterator]();!(o=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(l){i=!0,r=l}finally{try{!o&&s.return&&s.return()}finally{if(i)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=n(65043);var r=function(e,t){var n=(0,i.useRef)((function(){throw new Error("Cannot call an event handler while rendering.")}));return(0,i.useEffect)((function(){n.current=e}),[e].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t))),(0,i.useCallback)((function(e){return(0,n.current)(e)}),[n])};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onEnd,n=void 0===t?function(){}:t,a=e.onResult,s=void 0===a?function(){}:a,l=e.onError,c=void 0===l?function(){}:l,d=(0,i.useRef)(null),u=(0,i.useState)(!1),p=o(u,2),h=p[0],f=p[1],m=(0,i.useState)(!1),g=o(m,2),x=g[0],v=g[1],y=function(e){var t=Array.from(e.results).map((function(e){return e[0]})).map((function(e){return e.transcript})).join("");s(t)},w=function(e){"not-allowed"===e.error&&(d.current.onend=function(){},f(!1)),c(e)},S=r((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!h&&x){var t=e.lang,n=void 0===t?"":t,o=e.interimResults,i=void 0===o||o,r=e.continuous,a=void 0!==r&&r,s=e.maxAlternatives,l=void 0===s?1:s,c=e.grammars;f(!0),d.current.lang=n,d.current.interimResults=i,d.current.onresult=y,d.current.onerror=w,d.current.continuous=a,d.current.maxAlternatives=l,c&&(d.current.grammars=c),d.current.onend=function(){return d.current.start()},d.current.start()}}),[h,x,d]),j=r((function(){h&&x&&(d.current.onresult=function(){},d.current.onend=function(){},d.current.onerror=function(){},f(!1),d.current.stop(),n())}),[h,x,d,n]);return(0,i.useEffect)((function(){"undefined"!==typeof window&&(window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition,window.SpeechRecognition&&(v(!0),d.current=new window.SpeechRecognition))}),[]),{listen:S,listening:h,stop:j,supported:x}}},38441:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,i=!1,r=void 0;try{for(var a,s=e[Symbol.iterator]();!(o=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(l){i=!0,r=l}finally{try{!o&&s.return&&s.return()}finally{if(i)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=n(65043);t.default=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).onEnd,t=void 0===e?function(){}:e,n=(0,i.useState)([]),r=o(n,2),a=r[0],s=r[1],l=(0,i.useState)(!1),c=o(l,2),d=c[0],u=c[1],p=(0,i.useState)(!1),h=o(p,2),f=h[0],m=h[1],g=function(e){s(e)},x=function(){u(!1),t()};(0,i.useEffect)((function(){"undefined"!==typeof window&&window.speechSynthesis&&(m(!0),function(){var e=window.speechSynthesis.getVoices();e.length>0?g(e):window.speechSynthesis.onvoiceschanged=function(t){e=t.target.getVoices(),g(e)}}())}),[]);return{supported:f,speak:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.voice,n=void 0===t?null:t,o=e.text,i=void 0===o?"":o,r=e.rate,a=void 0===r?1:r,s=e.pitch,l=void 0===s?1:s,c=e.volume,d=void 0===c?1:c;if(f){u(!0);var p=new window.SpeechSynthesisUtterance;p.text=i,p.voice=n,p.onend=x,p.rate=a,p.pitch=l,p.volume=d,window.speechSynthesis.speak(p)}},speaking:d,cancel:function(){f&&(u(!1),window.speechSynthesis.cancel())},voices:a}}}}]);
//# sourceMappingURL=7763.61d5d7a3.chunk.js.map