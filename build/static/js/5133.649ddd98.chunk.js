"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[5133],{86328:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(58168),r=n(98587),o=n(65043),s=n(31140),a=n(9998),d=n(26240),l=n(80653),u=n(95849),c=n(70579);const p=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function f(e){return"scale(".concat(e,", ").concat(e**2,")")}const g={entering:{opacity:1,transform:f(1)},entered:{opacity:1,transform:"none"}},m="undefined"!==typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),h=o.forwardRef((function(e,t){const{addEndListener:n,appear:h=!0,children:y,easing:A,in:b,onEnter:v,onEntered:E,onEntering:x,onExit:w,onExited:C,onExiting:k,style:L,timeout:S="auto",TransitionComponent:M=a.Ay}=e,D=(0,r.A)(e,p),R=(0,s.A)(),H=o.useRef(),j=(0,d.A)(),F=o.useRef(null),I=(0,u.A)(F,y.ref,t),T=e=>t=>{if(e){const n=F.current;void 0===t?e(n):e(n,t)}},K=T(x),P=T(((e,t)=>{(0,l.q)(e);const{duration:n,delay:i,easing:r}=(0,l.c)({style:L,timeout:S,easing:A},{mode:"enter"});let o;"auto"===S?(o=j.transitions.getAutoHeightDuration(e.clientHeight),H.current=o):o=n,e.style.transition=[j.transitions.create("opacity",{duration:o,delay:i}),j.transitions.create("transform",{duration:m?o:.666*o,delay:i,easing:r})].join(","),v&&v(e,t)})),N=T(E),W=T(k),q=T((e=>{const{duration:t,delay:n,easing:i}=(0,l.c)({style:L,timeout:S,easing:A},{mode:"exit"});let r;"auto"===S?(r=j.transitions.getAutoHeightDuration(e.clientHeight),H.current=r):r=t,e.style.transition=[j.transitions.create("opacity",{duration:r,delay:n}),j.transitions.create("transform",{duration:m?r:.666*r,delay:m?n:n||.333*r,easing:i})].join(","),e.style.opacity=0,e.style.transform=f(.75),w&&w(e)})),B=T(C);return(0,c.jsx)(M,(0,i.A)({appear:h,in:b,nodeRef:F,onEnter:P,onEntered:N,onEntering:K,onExit:q,onExited:B,onExiting:W,addEndListener:e=>{"auto"===S&&R.start(H.current||0,e),n&&n(F.current,e)},timeout:"auto"===S?null:S},D,{children:(e,t)=>o.cloneElement(y,(0,i.A)({style:(0,i.A)({opacity:0,transform:f(.75),visibility:"exited"!==e||b?void 0:"hidden"},g[e],L,y.props.style),ref:I},t))}))}));h.muiSupportAuto=!0;const y=h},35721:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(98587),r=n(58168),o=n(65043),s=n(58387),a=n(68606),d=n(34535),l=n(72876),u=n(51347),c=n(57056),p=n(32400);function f(e){return(0,p.Ay)("MuiList",e)}(0,c.A)("MuiList",["root","padding","dense","subheader"]);var g=n(70579);const m=["children","className","component","dense","disablePadding","subheader"],h=(0,d.Ay)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})((e=>{let{ownerState:t}=e;return(0,r.A)({listStyle:"none",margin:0,padding:0,position:"relative"},!t.disablePadding&&{paddingTop:8,paddingBottom:8},t.subheader&&{paddingTop:0})})),y=o.forwardRef((function(e,t){const n=(0,l.A)({props:e,name:"MuiList"}),{children:d,className:c,component:p="ul",dense:y=!1,disablePadding:A=!1,subheader:b}=n,v=(0,i.A)(n,m),E=o.useMemo((()=>({dense:y})),[y]),x=(0,r.A)({},n,{component:p,dense:y,disablePadding:A}),w=(e=>{const{classes:t,disablePadding:n,dense:i,subheader:r}=e,o={root:["root",!n&&"padding",i&&"dense",r&&"subheader"]};return(0,a.A)(o,f,t)})(x);return(0,g.jsx)(u.A.Provider,{value:E,children:(0,g.jsxs)(h,(0,r.A)({as:p,className:(0,s.A)(w.root,c),ref:t,ownerState:x},v,{children:[b,d]}))})}))},51347:(e,t,n)=>{n.d(t,{A:()=>i});const i=n(65043).createContext({})},30922:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(58168),r=n(98587),o=n(65043),s=(n(2086),n(22427)),a=n(35721);const d=n(26336).A;var l=n(95849),u=n(55013),c=n(70579);const p=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function f(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function g(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function m(e,t){if(void 0===t)return!0;let n=e.innerText;return void 0===n&&(n=e.textContent),n=n.trim().toLowerCase(),0!==n.length&&(t.repeating?n[0]===t.keys[0]:0===n.indexOf(t.keys.join("")))}function h(e,t,n,i,r,o){let s=!1,a=r(e,t,!!t&&n);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const t=!i&&(a.disabled||"true"===a.getAttribute("aria-disabled"));if(a.hasAttribute("tabindex")&&m(a,o)&&!t)return a.focus(),!0;a=r(e,a,n)}return!1}const y=o.forwardRef((function(e,t){const{actions:n,autoFocus:y=!1,autoFocusItem:A=!1,children:b,className:v,disabledItemsFocusable:E=!1,disableListWrap:x=!1,onKeyDown:w,variant:C="selectedMenu"}=e,k=(0,r.A)(e,p),L=o.useRef(null),S=o.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});(0,u.A)((()=>{y&&L.current.focus()}),[y]),o.useImperativeHandle(n,(()=>({adjustStyleForScrollbar:(e,t)=>{const n=!L.current.style.width;if(e.clientHeight<L.current.clientHeight&&n){const n="".concat(d((0,s.A)(e)),"px");L.current.style["rtl"===t.direction?"paddingLeft":"paddingRight"]=n,L.current.style.width="calc(100% + ".concat(n,")")}return L.current}})),[]);const M=(0,l.A)(L,t);let D=-1;o.Children.forEach(b,((e,t)=>{o.isValidElement(e)?(e.props.disabled||("selectedMenu"===C&&e.props.selected||-1===D)&&(D=t),D===t&&(e.props.disabled||e.props.muiSkipListHighlight||e.type.muiSkipListHighlight)&&(D+=1,D>=b.length&&(D=-1))):D===t&&(D+=1,D>=b.length&&(D=-1))}));const R=o.Children.map(b,((e,t)=>{if(t===D){const t={};return A&&(t.autoFocus=!0),void 0===e.props.tabIndex&&"selectedMenu"===C&&(t.tabIndex=0),o.cloneElement(e,t)}return e}));return(0,c.jsx)(a.A,(0,i.A)({role:"menu",ref:M,className:v,onKeyDown:e=>{const t=L.current,n=e.key,i=(0,s.A)(t).activeElement;if("ArrowDown"===n)e.preventDefault(),h(t,i,x,E,f);else if("ArrowUp"===n)e.preventDefault(),h(t,i,x,E,g);else if("Home"===n)e.preventDefault(),h(t,null,x,E,f);else if("End"===n)e.preventDefault(),h(t,null,x,E,g);else if(1===n.length){const r=S.current,o=n.toLowerCase(),s=performance.now();r.keys.length>0&&(s-r.lastTime>500?(r.keys=[],r.repeating=!0,r.previousKeyMatched=!0):r.repeating&&o!==r.keys[0]&&(r.repeating=!1)),r.lastTime=s,r.keys.push(o);const a=i&&!r.repeating&&m(i,r);r.previousKeyMatched&&(a||h(t,i,!1,E,f,r))?e.preventDefault():r.previousKeyMatched=!1}w&&w(e)},tabIndex:y?0:-1},k,{children:R}))}))}}]);
//# sourceMappingURL=5133.649ddd98.chunk.js.map