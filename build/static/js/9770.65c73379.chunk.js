"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[9770],{5399:(e,t,o)=>{o.d(t,{$s:()=>s.$s,CI:()=>r.CI,Cg:()=>c,HF:()=>r.HF,df:()=>r.df,hg:()=>r.hg,j2:()=>l,x9:()=>r.x9,zS:()=>n});var a=o(37064),s=o(82413),r=o(32813);const i=(0,a.Wp)({apiKey:"AIzaSyBXS56tIro9cd-Sd4ySn5AwLw3T6cnMHr0",authDomain:"yeeplatform.firebaseapp.com",projectId:"yeeplatform",storageBucket:"yeeplatform.appspot.com",messagingSenderId:"272587831821",appId:"1:272587831821:web:b612b427ff43968f33f344",measurementId:"G-YZV03469PP"});let n;(0,s.TT)().then((e=>{e&&(n=(0,s.P5)(i))}));const l=(0,r.xI)(i),c=(e,t)=>{n?(0,s.$s)(n,e,t):console.warn("Firebase Analytics is not initialized yet.")}},39770:(e,t,o)=>{o.r(t),o.d(t,{default:()=>x});var a=o(65043),s=o(86213),r=o(2142),i=o(73216),n=o(5399),l=o(41591),c=o(85369),d=o(85522),m=o(17118),p=o(41918),u=o(98178),g=o(2006),h=o(70579);const x=()=>{const[e,t]=(0,a.useState)(null),[o,x]=(0,a.useState)(!0),[f,y]=(0,a.useState)(null),[j,w]=(0,a.useState)(!1),[v,b]=(0,a.useState)(1),[S,I]=(0,a.useState)(0),[k,C]=(0,a.useState)(!1),{id:_}=(0,i.g)(),A=(0,i.Zp)(),z="audioChapterProgress",F="/yeeplatform_book_cover.png";(0,a.useEffect)((()=>{(0,n.$s)(n.zS,"audiochapter_listen_page_visited");(async()=>{try{const o=await s.A.get("https://yeeplatformbackend.azurewebsites.net/getAudioChapter/".concat(_));t(o.data),console.log("my data"),console.log(o.data),(0,n.$s)(n.zS,(null===e||void 0===e?void 0:e.title)+"_listen_visited");const a=localStorage.getItem(z+"_".concat(_));a&&I(parseFloat(a))}catch(o){y(o)}finally{x(!1)}})()}),[_]);const{colorMode:P,toggleColorMode:N}=(0,m.G6)();return o?(0,h.jsx)("div",{children:"Loading..."}):f?(0,h.jsxs)("div",{children:["Error loading audiobook: ",f.message]}):(0,h.jsx)(d.az,{className:k?"bg-black text-white":"bg-yellow-200",h:"100vh",children:(0,h.jsxs)(p.s,{flexDirection:"column",alignItems:"center",justifyContent:"start",h:"100%",children:[(0,h.jsxs)(p.s,{alignItems:"center",mt:2,children:[(0,h.jsx)(u.$,{onClick:()=>{A(-1)},className:"text-2xl text-yellow-800 mr-2",children:(0,h.jsx)(c.QVr,{})}),(0,h.jsx)("h1",{className:"text-3xl font-bold text-yellow-800 mt-2 mb-2",children:e?e.title:"No title available"})]}),(0,h.jsx)(p.s,{alignItems:"center",justifyContent:"center",mt:4,children:(0,h.jsx)(u.$,{onClick:()=>{C(!k)},className:"bg-yellow-800 text-white p-2 rounded-full mr-2",children:k?(0,h.jsx)(c.wQq,{}):(0,h.jsx)(c.V6H,{})})}),(0,h.jsx)(g._,{src:e.coverimage&&e.coverimage.endsWith("undefined")?F:e.coverimage||F,alt:"Cover",w:200,h:300,objectFit:"cover",borderRadius:"md",className:"rounded-lg shadow-lg transition-transform hover:shadow-xl transform hover:scale-105 mt-3"}),(()=>{if(!e||!e.audio_file)return(0,h.jsx)("p",{children:"No audio files available for this book."});e.audio_file;return(0,h.jsxs)(d.az,{children:[(0,h.jsxs)(l.m,{children:[(0,h.jsxs)("title",{children:[e.title," - Yee FM"]}),(0,h.jsx)("meta",{name:"description",content:e.description}),(0,h.jsx)("meta",{name:"keywords",content:"".concat(e.title,", audio chapter, listen, audio, literature, Yee FM")}),(0,h.jsx)("link",{rel:"icon",href:e.coverimage||F||F}),(0,h.jsx)("meta",{property:"og:title",content:"".concat(e.title," - Yee FM")}),(0,h.jsx)("meta",{property:"og:description",content:e.description}),(0,h.jsx)("meta",{property:"og:image",content:e.coverimage||F}),(0,h.jsx)("meta",{property:"og:url",content:"https://www.yeefm.com/audiochapters/".concat(_,"/listen")}),(0,h.jsx)("meta",{property:"og:type",content:"website"})]}),(0,h.jsx)(r.Ay,{playList:[{name:e.title,writer:e.author,img:e.coverimage&&e.coverimage.endsWith("undefined")?F:e.coverimage||F,src:e.audio_file,id:1}],audioInitialState:{isPlaying:j,volume:v,curPlayId:1},activeUI:{all:!0,progress:"waveform"},customIcons:{play:(0,h.jsx)(c.gSK,{}),pause:(0,h.jsx)(c.kwt,{})},placement:{interface:{templateArea:{trackTimeDuration:"row2-5",progress:"row3-4",playButton:"row2-6",repeatType:"row2-7",volume:"row2-8"}},player:"bottom-left"},onPlay:()=>console.log("Audio started playing"),onPause:()=>console.log("Audio paused"),onEnd:()=>console.log("Audio ended")})]})})()]})})}}}]);
//# sourceMappingURL=9770.65c73379.chunk.js.map