"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[7539,5399],{5399:(e,t,r)=>{r.d(t,{$s:()=>o.$s,Cg:()=>u,GoogleAuthProvider:()=>n.HF,auth:()=>l,onAuthStateChanged:()=>n.hg,signInWithEmailAndPassword:()=>n.x9,signInWithPopup:()=>n.df,signOut:()=>n.CI,zS:()=>c});var a=r(37064),o=r(82413),n=r(32813);const i={apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"};let s,l,c;(async()=>{if(!s){s=(0,a.Wp)(i),l=(0,n.xI)(s);await(0,o.TT)()&&(c=(0,o.P5)(s))}})();const u=(e,t)=>{c&&(0,o.$s)(c,e,t)}},7539:(e,t,r)=>{r.r(t),r.d(t,{default:()=>g});var a=r(65043),o=r(86213),n=r(2142),i=r(73216),s=r(85369),l=r(10611),c=r(85522),u=r(41918),d=r(98178),m=r(2006),f=r(5399),b=r(41591),p=r(70579);const g=()=>{const[e,t]=(0,a.useState)(null),[r,g]=(0,a.useState)(!0),[h,v]=(0,a.useState)(null),[y,w]=(0,a.useState)(!1),[x,A]=(0,a.useState)(1),[S,j]=(0,a.useState)(!1),[k,I]=(0,a.useState)(!1),[C,P]=(0,a.useState)(null),[z,B]=(0,a.useState)(0),[N,M]=(0,a.useState)(0),L=(0,a.useRef)(null),{id:_}=(0,i.g)(),q=(0,i.Zp)();(0,a.useEffect)((()=>{(async()=>{try{const r=await o.A.get("https://yeeplatformbackend.azurewebsites.net/getAudiobook/".concat(_)),{data:a}=r;console.log("here is the data"),console.log(a),t(a),P(_),(0,f.$s)(f.zS,e.title+"_listen_visited"),B(a.audioDuration);const n=localStorage.getItem("audiobook_".concat(C,"_progress"));n&&M(parseFloat(n)),(0,f.$s)("audiobook_detail_fetched",{audiobookId:_})}catch(r){v(r)}finally{g(!1)}})()}),[_]),(0,a.useEffect)((()=>{C&&localStorage.setItem("audiobook_".concat(C,"_progress"),N)}),[C,N]);const D=()=>{w(!y)};return r?(0,p.jsx)("div",{children:(0,p.jsx)(l.A,{className:"text-yellow-500 animate-pulse",color:"secondary"})}):(h&&console.log(h.message),(0,p.jsxs)(c.az,{className:S?"bg-black text-white":"bg-yellow-200",h:"100vh",children:[(0,p.jsxs)(b.m,{children:[(0,p.jsxs)("title",{children:[e.title," - Yee FM"]}),(0,p.jsx)("meta",{name:"description",content:e.description}),(0,p.jsx)("meta",{name:"keywords",content:"".concat(e.title,", audiobooks, listen, audio, literature, Yee FM")}),(0,p.jsx)("link",{rel:"icon",href:e.coverImage||e.coverimage||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,p.jsx)("meta",{property:"og:title",content:"".concat(e.title," - Yee FM")}),(0,p.jsx)("meta",{property:"og:description",content:e.description}),(0,p.jsx)("meta",{property:"og:image",content:e.coverImage||e.coverimage||"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/Y.webp"}),(0,p.jsx)("meta",{property:"og:url",content:"https://www.yeefm.com/audiobooks/".concat(_,"/listen")}),(0,p.jsx)("meta",{property:"og:type",content:"website"})]}),(0,p.jsxs)(u.s,{flexDirection:"column",alignItems:"center",justifyContent:"start",h:"100%",children:[(0,p.jsxs)(u.s,{alignItems:"center",mt:2,children:[(0,p.jsx)(d.$,{onClick:()=>{q("/audiobooks/".concat(_))},className:"text-2xl text-yellow-800 mr-2",children:(0,p.jsx)(s.QVr,{})}),(0,p.jsx)("h1",{className:"text-3xl font-bold text-yellow-800 mt-2 mb-2",children:e?e.title:"No title available"})]}),(0,p.jsx)(u.s,{alignItems:"center",justifyContent:"center",mt:4,children:(0,p.jsx)(d.$,{onClick:()=>{j(!S)},className:"bg-yellow-800 text-white p-2 rounded-full mr-2",children:S?(0,p.jsx)(s.wQq,{}):(0,p.jsx)(s.V6H,{})})}),(0,p.jsx)(m._,{src:e.coverImage,alt:"Cover",w:200,h:300,objectFit:"cover",borderRadius:"md",className:"rounded-lg shadow-lg transition-transform hover:shadow-xl transform hover:scale-105 mt-3"}),(0,p.jsx)(n.Ay,{ref:L,playList:e.audio_files.map(((t,r)=>({name:"".concat(e.title," - Part ").concat(r+1),writer:e.author,img:e.coverImage,src:t,id:r+1}))),audioInitialState:{isPlaying:y,volume:x,curPlayId:1},activeUI:{all:!0,progress:"waveform"},customIcons:{play:(0,p.jsx)(s.gSK,{}),pause:(0,p.jsx)(s.kwt,{})},placement:{interface:{templateArea:{trackTimeDuration:"row2-5",progress:"row3-4",playButton:"row2-6",repeatType:"row2-7",volume:"row2-8"}},player:"bottom-left"},onPlay:D,onPause:D,onEnd:D,onTimeUpdate:e=>{e>=N&&(e>=.45*z&&!k&&I(!0),M(e))}})]})]}))}},10611:(e,t,r)=>{r.d(t,{A:()=>F});var a=r(57528),o=r(98587),n=r(58168),i=r(65043),s=r(69292),l=r(68606),c=r(83290),u=r(67266),d=r(10875),m=r(6803),f=r(34535),b=r(72876),p=r(57056),g=r(32400);function h(e){return(0,g.Ay)("MuiLinearProgress",e)}(0,p.A)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var v,y,w,x,A,S,j=r(70579);const k=["className","color","value","valueBuffer","variant"];let I,C,P,z,B,N;const M=(0,c.i7)(I||(I=v||(v=(0,a.A)(["\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n"])))),L=(0,c.i7)(C||(C=y||(y=(0,a.A)(["\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n"])))),_=(0,c.i7)(P||(P=w||(w=(0,a.A)(["\n  0% {\n    opacity: 1;\n    background-position: 0 -23px;\n  }\n\n  60% {\n    opacity: 0;\n    background-position: 0 -23px;\n  }\n\n  100% {\n    opacity: 1;\n    background-position: -200px -23px;\n  }\n"])))),q=(e,t)=>"inherit"===t?"currentColor":e.vars?e.vars.palette.LinearProgress["".concat(t,"Bg")]:"light"===e.palette.mode?(0,u.a)(e.palette[t].main,.62):(0,u.e$)(e.palette[t].main,.5),D=(0,f.Ay)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["color".concat((0,m.A)(r.color))],t[r.variant]]}})((e=>{let{ownerState:t,theme:r}=e;return(0,n.A)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:q(r,t.color)},"inherit"===t.color&&"buffer"!==t.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===t.variant&&{backgroundColor:"transparent"},"query"===t.variant&&{transform:"rotate(180deg)"})})),R=(0,f.Ay)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.dashed,t["dashedColor".concat((0,m.A)(r.color))]]}})((e=>{let{ownerState:t,theme:r}=e;const a=q(r,t.color);return(0,n.A)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===t.color&&{opacity:.3},{backgroundImage:"radial-gradient(".concat(a," 0%, ").concat(a," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,c.AH)(z||(z=x||(x=(0,a.A)(["\n    animation: "," 3s infinite linear;\n  "]))),_)),$=(0,f.Ay)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.bar,t["barColor".concat((0,m.A)(r.color))],("indeterminate"===r.variant||"query"===r.variant)&&t.bar1Indeterminate,"determinate"===r.variant&&t.bar1Determinate,"buffer"===r.variant&&t.bar1Buffer]}})((e=>{let{ownerState:t,theme:r}=e;return(0,n.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===t.color?"currentColor":(r.vars||r).palette[t.color].main},"determinate"===t.variant&&{transition:"transform .".concat(4,"s linear")},"buffer"===t.variant&&{zIndex:1,transition:"transform .".concat(4,"s linear")})}),(e=>{let{ownerState:t}=e;return("indeterminate"===t.variant||"query"===t.variant)&&(0,c.AH)(B||(B=A||(A=(0,a.A)(["\n      width: auto;\n      animation: "," 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    "]))),M)})),T=(0,f.Ay)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.bar,t["barColor".concat((0,m.A)(r.color))],("indeterminate"===r.variant||"query"===r.variant)&&t.bar2Indeterminate,"buffer"===r.variant&&t.bar2Buffer]}})((e=>{let{ownerState:t,theme:r}=e;return(0,n.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==t.variant&&{backgroundColor:"inherit"===t.color?"currentColor":(r.vars||r).palette[t.color].main},"inherit"===t.color&&{opacity:.3},"buffer"===t.variant&&{backgroundColor:q(r,t.color),transition:"transform .".concat(4,"s linear")})}),(e=>{let{ownerState:t}=e;return("indeterminate"===t.variant||"query"===t.variant)&&(0,c.AH)(N||(N=S||(S=(0,a.A)(["\n      width: auto;\n      animation: "," 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;\n    "]))),L)})),F=i.forwardRef((function(e,t){const r=(0,b.A)({props:e,name:"MuiLinearProgress"}),{className:a,color:i="primary",value:c,valueBuffer:u,variant:f="indeterminate"}=r,p=(0,o.A)(r,k),g=(0,n.A)({},r,{color:i,variant:f}),v=(e=>{const{classes:t,variant:r,color:a}=e,o={root:["root","color".concat((0,m.A)(a)),r],dashed:["dashed","dashedColor".concat((0,m.A)(a))],bar1:["bar","barColor".concat((0,m.A)(a)),("indeterminate"===r||"query"===r)&&"bar1Indeterminate","determinate"===r&&"bar1Determinate","buffer"===r&&"bar1Buffer"],bar2:["bar","buffer"!==r&&"barColor".concat((0,m.A)(a)),"buffer"===r&&"color".concat((0,m.A)(a)),("indeterminate"===r||"query"===r)&&"bar2Indeterminate","buffer"===r&&"bar2Buffer"]};return(0,l.A)(o,h,t)})(g),y=(0,d.I)(),w={},x={bar1:{},bar2:{}};if("determinate"===f||"buffer"===f)if(void 0!==c){w["aria-valuenow"]=Math.round(c),w["aria-valuemin"]=0,w["aria-valuemax"]=100;let e=c-100;y&&(e=-e),x.bar1.transform="translateX(".concat(e,"%)")}else 0;if("buffer"===f)if(void 0!==u){let e=(u||0)-100;y&&(e=-e),x.bar2.transform="translateX(".concat(e,"%)")}else 0;return(0,j.jsxs)(D,(0,n.A)({className:(0,s.A)(v.root,a),ownerState:g,role:"progressbar"},w,{ref:t},p,{children:["buffer"===f?(0,j.jsx)(R,{className:v.dashed,ownerState:g}):null,(0,j.jsx)($,{className:v.bar1,ownerState:g,style:x.bar1}),"determinate"===f?null:(0,j.jsx)(T,{className:v.bar2,ownerState:g,style:x.bar2})]}))}))},10875:(e,t,r)=>{r.d(t,{A:()=>u,I:()=>c});var a=r(58168),o=r(98587),n=r(65043),i=r(70579);const s=["value"],l=n.createContext();const c=()=>{const e=n.useContext(l);return null!=e&&e},u=function(e){let{value:t}=e,r=(0,o.A)(e,s);return(0,i.jsx)(l.Provider,(0,a.A)({value:null==t||t},r))}}}]);
//# sourceMappingURL=7539.25684c5c.chunk.js.map