"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[7326],{12220:(e,t,n)=>{n.d(t,{A:()=>b});var o=n(98587),r=n(58168),a=n(65043),i=n(58387),s=n(68606),l=n(34535),c=n(72876),d=n(56258),u=n(57056),p=n(32400);function m(e){return(0,p.Ay)("MuiBackdrop",e)}(0,u.A)("MuiBackdrop",["root","invisible"]);var h=n(70579);const f=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],v=(0,l.Ay)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})((e=>{let{ownerState:t}=e;return(0,r.A)({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},t.invisible&&{backgroundColor:"transparent"})})),b=a.forwardRef((function(e,t){var n,a,l;const u=(0,c.A)({props:e,name:"MuiBackdrop"}),{children:p,className:b,component:g="div",components:x={},componentsProps:y={},invisible:A=!1,open:E,slotProps:S={},slots:k={},TransitionComponent:R=d.A,transitionDuration:w}=u,C=(0,o.A)(u,f),T=(0,r.A)({},u,{component:g,invisible:A}),I=(e=>{const{classes:t,invisible:n}=e,o={root:["root",n&&"invisible"]};return(0,s.A)(o,m,t)})(T),z=null!=(n=S.root)?n:y.root;return(0,h.jsx)(R,(0,r.A)({in:E,timeout:w},C,{children:(0,h.jsx)(v,(0,r.A)({"aria-hidden":!0},z,{as:null!=(a=null!=(l=k.root)?l:x.Root)?a:g,className:(0,i.A)(I.root,b,null==z?void 0:z.className),ownerState:(0,r.A)({},T,null==z?void 0:z.ownerState),classes:I,ref:t,children:p}))}))}))},11906:(e,t,n)=>{n.d(t,{A:()=>w});var o=n(98587),r=n(58168),a=n(65043),i=n(58387),s=n(22018),l=n(68606),c=n(90310),d=n(34535),u=n(72876),p=n(75429),m=n(6803),h=n(57056),f=n(32400);function v(e){return(0,f.Ay)("MuiButton",e)}const b=(0,h.A)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);const g=a.createContext({});const x=a.createContext(void 0);var y=n(70579);const A=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],E=e=>(0,r.A)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),S=(0,d.Ay)(p.A,{shouldForwardProp:e=>(0,d.ep)(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t["".concat(n.variant).concat((0,m.A)(n.color))],t["size".concat((0,m.A)(n.size))],t["".concat(n.variant,"Size").concat((0,m.A)(n.size))],"inherit"===n.color&&t.colorInherit,n.disableElevation&&t.disableElevation,n.fullWidth&&t.fullWidth]}})((e=>{let{theme:t,ownerState:n}=e;var o,a;const i="light"===t.palette.mode?t.palette.grey[300]:t.palette.grey[800],s="light"===t.palette.mode?t.palette.grey.A100:t.palette.grey[700];return(0,r.A)({},t.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,transition:t.transitions.create(["background-color","box-shadow","border-color","color"],{duration:t.transitions.duration.short}),"&:hover":(0,r.A)({textDecoration:"none",backgroundColor:t.vars?"rgba(".concat(t.vars.palette.text.primaryChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette.text.primary,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===n.variant&&"inherit"!==n.color&&{backgroundColor:t.vars?"rgba(".concat(t.vars.palette[n.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette[n.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===n.variant&&"inherit"!==n.color&&{border:"1px solid ".concat((t.vars||t).palette[n.color].main),backgroundColor:t.vars?"rgba(".concat(t.vars.palette[n.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette[n.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===n.variant&&{backgroundColor:t.vars?t.vars.palette.Button.inheritContainedHoverBg:s,boxShadow:(t.vars||t).shadows[4],"@media (hover: none)":{boxShadow:(t.vars||t).shadows[2],backgroundColor:(t.vars||t).palette.grey[300]}},"contained"===n.variant&&"inherit"!==n.color&&{backgroundColor:(t.vars||t).palette[n.color].dark,"@media (hover: none)":{backgroundColor:(t.vars||t).palette[n.color].main}}),"&:active":(0,r.A)({},"contained"===n.variant&&{boxShadow:(t.vars||t).shadows[8]}),["&.".concat(b.focusVisible)]:(0,r.A)({},"contained"===n.variant&&{boxShadow:(t.vars||t).shadows[6]}),["&.".concat(b.disabled)]:(0,r.A)({color:(t.vars||t).palette.action.disabled},"outlined"===n.variant&&{border:"1px solid ".concat((t.vars||t).palette.action.disabledBackground)},"contained"===n.variant&&{color:(t.vars||t).palette.action.disabled,boxShadow:(t.vars||t).shadows[0],backgroundColor:(t.vars||t).palette.action.disabledBackground})},"text"===n.variant&&{padding:"6px 8px"},"text"===n.variant&&"inherit"!==n.color&&{color:(t.vars||t).palette[n.color].main},"outlined"===n.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===n.variant&&"inherit"!==n.color&&{color:(t.vars||t).palette[n.color].main,border:t.vars?"1px solid rgba(".concat(t.vars.palette[n.color].mainChannel," / 0.5)"):"1px solid ".concat((0,c.X4)(t.palette[n.color].main,.5))},"contained"===n.variant&&{color:t.vars?t.vars.palette.text.primary:null==(o=(a=t.palette).getContrastText)?void 0:o.call(a,t.palette.grey[300]),backgroundColor:t.vars?t.vars.palette.Button.inheritContainedBg:i,boxShadow:(t.vars||t).shadows[2]},"contained"===n.variant&&"inherit"!==n.color&&{color:(t.vars||t).palette[n.color].contrastText,backgroundColor:(t.vars||t).palette[n.color].main},"inherit"===n.color&&{color:"inherit",borderColor:"currentColor"},"small"===n.size&&"text"===n.variant&&{padding:"4px 5px",fontSize:t.typography.pxToRem(13)},"large"===n.size&&"text"===n.variant&&{padding:"8px 11px",fontSize:t.typography.pxToRem(15)},"small"===n.size&&"outlined"===n.variant&&{padding:"3px 9px",fontSize:t.typography.pxToRem(13)},"large"===n.size&&"outlined"===n.variant&&{padding:"7px 21px",fontSize:t.typography.pxToRem(15)},"small"===n.size&&"contained"===n.variant&&{padding:"4px 10px",fontSize:t.typography.pxToRem(13)},"large"===n.size&&"contained"===n.variant&&{padding:"8px 22px",fontSize:t.typography.pxToRem(15)},n.fullWidth&&{width:"100%"})}),(e=>{let{ownerState:t}=e;return t.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},["&.".concat(b.focusVisible)]:{boxShadow:"none"},"&:active":{boxShadow:"none"},["&.".concat(b.disabled)]:{boxShadow:"none"}}})),k=(0,d.Ay)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.startIcon,t["iconSize".concat((0,m.A)(n.size))]]}})((e=>{let{ownerState:t}=e;return(0,r.A)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},E(t))})),R=(0,d.Ay)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.endIcon,t["iconSize".concat((0,m.A)(n.size))]]}})((e=>{let{ownerState:t}=e;return(0,r.A)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},E(t))})),w=a.forwardRef((function(e,t){const n=a.useContext(g),c=a.useContext(x),d=(0,s.A)(n,e),p=(0,u.A)({props:d,name:"MuiButton"}),{children:h,color:f="primary",component:b="button",className:E,disabled:w=!1,disableElevation:C=!1,disableFocusRipple:T=!1,endIcon:I,focusVisibleClassName:z,fullWidth:P=!1,size:N="medium",startIcon:M,type:B,variant:L="text"}=p,F=(0,o.A)(p,A),O=(0,r.A)({},p,{color:f,component:b,disabled:w,disableElevation:C,disableFocusRipple:T,fullWidth:P,size:N,type:B,variant:L}),D=(e=>{const{color:t,disableElevation:n,fullWidth:o,size:a,variant:i,classes:s}=e,c={root:["root",i,"".concat(i).concat((0,m.A)(t)),"size".concat((0,m.A)(a)),"".concat(i,"Size").concat((0,m.A)(a)),"inherit"===t&&"colorInherit",n&&"disableElevation",o&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,m.A)(a))],endIcon:["endIcon","iconSize".concat((0,m.A)(a))]},d=(0,l.A)(c,v,s);return(0,r.A)({},s,d)})(O),W=M&&(0,y.jsx)(k,{className:D.startIcon,ownerState:O,children:M}),j=I&&(0,y.jsx)(R,{className:D.endIcon,ownerState:O,children:I}),K=c||"";return(0,y.jsxs)(S,(0,r.A)({ownerState:O,className:(0,i.A)(n.className,D.root,E,K),component:b,disabled:w,focusRipple:!T,focusVisibleClassName:(0,i.A)(D.focusVisible,z),ref:t,type:B},F,{classes:D,children:[W,h,j]}))}))},56258:(e,t,n)=>{n.d(t,{A:()=>m});var o=n(58168),r=n(98587),a=n(65043),i=n(9998),s=n(26240),l=n(80653),c=n(95849),d=n(70579);const u=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],p={entering:{opacity:1},entered:{opacity:1}},m=a.forwardRef((function(e,t){const n=(0,s.A)(),m={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:h,appear:f=!0,children:v,easing:b,in:g,onEnter:x,onEntered:y,onEntering:A,onExit:E,onExited:S,onExiting:k,style:R,timeout:w=m,TransitionComponent:C=i.Ay}=e,T=(0,r.A)(e,u),I=a.useRef(null),z=(0,c.A)(I,v.ref,t),P=e=>t=>{if(e){const n=I.current;void 0===t?e(n):e(n,t)}},N=P(A),M=P(((e,t)=>{(0,l.q)(e);const o=(0,l.c)({style:R,timeout:w,easing:b},{mode:"enter"});e.style.webkitTransition=n.transitions.create("opacity",o),e.style.transition=n.transitions.create("opacity",o),x&&x(e,t)})),B=P(y),L=P(k),F=P((e=>{const t=(0,l.c)({style:R,timeout:w,easing:b},{mode:"exit"});e.style.webkitTransition=n.transitions.create("opacity",t),e.style.transition=n.transitions.create("opacity",t),E&&E(e)})),O=P(S);return(0,d.jsx)(C,(0,o.A)({appear:f,in:g,nodeRef:I,onEnter:M,onEntered:B,onEntering:N,onExit:F,onExited:O,onExiting:L,addEndListener:e=>{h&&h(I.current,e)},timeout:w},T,{children:(e,t)=>a.cloneElement(v,(0,o.A)({style:(0,o.A)({opacity:0,visibility:"exited"!==e||g?void 0:"hidden"},p[e],R,v.props.style),ref:z},t))}))}))},1243:(e,t,n)=>{n.d(t,{A:()=>D});var o=n(98587),r=n(58168),a=n(65043),i=n(58387),s=n(33662),l=n(47042),c=n(22144),d=n(24626),u=n(44708),p=n(29279),m=n(46288),h=n(26336);function f(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function v(e){return parseInt((0,m.A)(e).getComputedStyle(e).paddingRight,10)||0}function b(e,t,n,o,r){const a=[t,n,...o];[].forEach.call(e.children,(e=>{const t=-1===a.indexOf(e),n=!function(e){const t=-1!==["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName),n="INPUT"===e.tagName&&"hidden"===e.getAttribute("type");return t||n}(e);t&&n&&f(e,r)}))}function g(e,t){let n=-1;return e.some(((e,o)=>!!t(e)&&(n=o,!0))),n}function x(e,t){const n=[],o=e.container;if(!t.disableScrollLock){if(function(e){const t=(0,c.A)(e);return t.body===e?(0,m.A)(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}(o)){const e=(0,h.A)((0,c.A)(o));n.push({value:o.style.paddingRight,property:"padding-right",el:o}),o.style.paddingRight="".concat(v(o)+e,"px");const t=(0,c.A)(o).querySelectorAll(".mui-fixed");[].forEach.call(t,(t=>{n.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight="".concat(v(t)+e,"px")}))}let e;if(o.parentNode instanceof DocumentFragment)e=(0,c.A)(o).body;else{const t=o.parentElement,n=(0,m.A)(o);e="HTML"===(null==t?void 0:t.nodeName)&&"scroll"===n.getComputedStyle(t).overflowY?t:o}n.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{n.forEach((e=>{let{value:t,el:n,property:o}=e;t?n.style.setProperty(o,t):n.style.removeProperty(o)}))}}const y=new class{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(e,t){let n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&f(e.modalRef,!1);const o=function(e){const t=[];return[].forEach.call(e.children,(e=>{"true"===e.getAttribute("aria-hidden")&&t.push(e)})),t}(t);b(t,e.mount,e.modalRef,o,!0);const r=g(this.containers,(e=>e.container===t));return-1!==r?(this.containers[r].modals.push(e),n):(this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:o}),n)}mount(e,t){const n=g(this.containers,(t=>-1!==t.modals.indexOf(e))),o=this.containers[n];o.restore||(o.restore=x(o,t))}remove(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const n=this.modals.indexOf(e);if(-1===n)return n;const o=g(this.containers,(t=>-1!==t.modals.indexOf(e))),r=this.containers[o];if(r.modals.splice(r.modals.indexOf(e),1),this.modals.splice(n,1),0===r.modals.length)r.restore&&r.restore(),e.modalRef&&f(e.modalRef,t),b(r.container,e.mount,e.modalRef,r.hiddenSiblings,!1),this.containers.splice(o,1);else{const e=r.modals[r.modals.length-1];e.modalRef&&f(e.modalRef,!1)}return n}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}};function A(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:o=!1,manager:i=y,closeAfterTransition:s=!1,onTransitionEnter:m,onTransitionExited:h,children:v,onClose:b,open:g,rootRef:x}=e,A=a.useRef({}),E=a.useRef(null),S=a.useRef(null),k=(0,l.A)(S,x),[R,w]=a.useState(!g),C=function(e){return!!e&&e.props.hasOwnProperty("in")}(v);let T=!0;"false"!==e["aria-hidden"]&&!1!==e["aria-hidden"]||(T=!1);const I=()=>(A.current.modalRef=S.current,A.current.mount=E.current,A.current),z=()=>{i.mount(I(),{disableScrollLock:o}),S.current&&(S.current.scrollTop=0)},P=(0,d.A)((()=>{const e=function(e){return"function"===typeof e?e():e}(t)||(0,c.A)(E.current).body;i.add(I(),e),S.current&&z()})),N=a.useCallback((()=>i.isTopModal(I())),[i]),M=(0,d.A)((e=>{E.current=e,e&&(g&&N()?z():S.current&&f(S.current,T))})),B=a.useCallback((()=>{i.remove(I(),T)}),[T,i]);a.useEffect((()=>()=>{B()}),[B]),a.useEffect((()=>{g?P():C&&s||B()}),[g,B,C,s,P]);const L=e=>t=>{var o;null==(o=e.onKeyDown)||o.call(e,t),"Escape"===t.key&&229!==t.which&&N()&&(n||(t.stopPropagation(),b&&b(t,"escapeKeyDown")))},F=e=>t=>{var n;null==(n=e.onClick)||n.call(e,t),t.target===t.currentTarget&&b&&b(t,"backdropClick")};return{getRootProps:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=(0,p.h)(e);delete n.onTransitionEnter,delete n.onTransitionExited;const o=(0,r.A)({},n,t);return(0,r.A)({role:"presentation"},o,{onKeyDown:L(o),ref:k})},getBackdropProps:function(){const e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.A)({"aria-hidden":!0},e,{onClick:F(e),open:g})},getTransitionProps:()=>({onEnter:(0,u.A)((()=>{w(!1),m&&m()}),null==v?void 0:v.props.onEnter),onExited:(0,u.A)((()=>{w(!0),h&&h(),s&&B()}),null==v?void 0:v.props.onExited)}),rootRef:k,portalRef:M,isTopModal:N,exited:R,hasTransition:C}}var E=n(68606),S=n(70579);const k=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function R(e){const t=[],n=[];return Array.from(e.querySelectorAll(k)).forEach(((e,o)=>{const r=function(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}(e);-1!==r&&function(e){return!(e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type)return!1;if(!e.name)return!1;const t=t=>e.ownerDocument.querySelector('input[type="radio"]'.concat(t));let n=t('[name="'.concat(e.name,'"]:checked'));return n||(n=t('[name="'.concat(e.name,'"]'))),n!==e}(e))}(e)&&(0===r?t.push(e):n.push({documentOrder:o,tabIndex:r,node:e}))})),n.sort(((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex)).map((e=>e.node)).concat(t)}function w(){return!0}function C(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:o=!1,disableRestoreFocus:r=!1,getTabbable:i=R,isEnabled:s=w,open:d}=e,u=a.useRef(!1),p=a.useRef(null),m=a.useRef(null),h=a.useRef(null),f=a.useRef(null),v=a.useRef(!1),b=a.useRef(null),g=(0,l.A)(t.ref,b),x=a.useRef(null);a.useEffect((()=>{d&&b.current&&(v.current=!n)}),[n,d]),a.useEffect((()=>{if(!d||!b.current)return;const e=(0,c.A)(b.current);return b.current.contains(e.activeElement)||(b.current.hasAttribute("tabIndex")||b.current.setAttribute("tabIndex","-1"),v.current&&b.current.focus()),()=>{r||(h.current&&h.current.focus&&(u.current=!0,h.current.focus()),h.current=null)}}),[d]),a.useEffect((()=>{if(!d||!b.current)return;const e=(0,c.A)(b.current),t=t=>{x.current=t,!o&&s()&&"Tab"===t.key&&e.activeElement===b.current&&t.shiftKey&&(u.current=!0,m.current&&m.current.focus())},n=()=>{const t=b.current;if(null===t)return;if(!e.hasFocus()||!s()||u.current)return void(u.current=!1);if(t.contains(e.activeElement))return;if(o&&e.activeElement!==p.current&&e.activeElement!==m.current)return;if(e.activeElement!==f.current)f.current=null;else if(null!==f.current)return;if(!v.current)return;let n=[];if(e.activeElement!==p.current&&e.activeElement!==m.current||(n=i(b.current)),n.length>0){var r,a;const e=Boolean((null==(r=x.current)?void 0:r.shiftKey)&&"Tab"===(null==(a=x.current)?void 0:a.key)),t=n[0],o=n[n.length-1];"string"!==typeof t&&"string"!==typeof o&&(e?o.focus():t.focus())}else t.focus()};e.addEventListener("focusin",n),e.addEventListener("keydown",t,!0);const r=setInterval((()=>{e.activeElement&&"BODY"===e.activeElement.tagName&&n()}),50);return()=>{clearInterval(r),e.removeEventListener("focusin",n),e.removeEventListener("keydown",t,!0)}}),[n,o,r,s,d,i]);const y=e=>{null===h.current&&(h.current=e.relatedTarget),v.current=!0};return(0,S.jsxs)(a.Fragment,{children:[(0,S.jsx)("div",{tabIndex:d?0:-1,onFocus:y,ref:p,"data-testid":"sentinelStart"}),a.cloneElement(t,{ref:g,onFocus:e=>{null===h.current&&(h.current=e.relatedTarget),v.current=!0,f.current=e.target;const n=t.props.onFocus;n&&n(e)}}),(0,S.jsx)("div",{tabIndex:d?0:-1,onFocus:y,ref:m,"data-testid":"sentinelEnd"})]})}var T=n(85990),I=n(34535),z=n(72876),P=n(12220),N=n(57056),M=n(32400);function B(e){return(0,M.Ay)("MuiModal",e)}(0,N.A)("MuiModal",["root","hidden","backdrop"]);const L=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],F=(0,I.Ay)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})((e=>{let{theme:t,ownerState:n}=e;return(0,r.A)({position:"fixed",zIndex:(t.vars||t).zIndex.modal,right:0,bottom:0,top:0,left:0},!n.open&&n.exited&&{visibility:"hidden"})})),O=(0,I.Ay)(P.A,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),D=a.forwardRef((function(e,t){var n,l,c,d,u,p;const m=(0,z.A)({name:"MuiModal",props:e}),{BackdropComponent:h=O,BackdropProps:f,className:v,closeAfterTransition:b=!1,children:g,container:x,component:y,components:k={},componentsProps:R={},disableAutoFocus:w=!1,disableEnforceFocus:I=!1,disableEscapeKeyDown:P=!1,disablePortal:N=!1,disableRestoreFocus:M=!1,disableScrollLock:D=!1,hideBackdrop:W=!1,keepMounted:j=!1,onBackdropClick:K,open:V,slotProps:U,slots:H}=m,X=(0,o.A)(m,L),q=(0,r.A)({},m,{closeAfterTransition:b,disableAutoFocus:w,disableEnforceFocus:I,disableEscapeKeyDown:P,disablePortal:N,disableRestoreFocus:M,disableScrollLock:D,hideBackdrop:W,keepMounted:j}),{getRootProps:Y,getBackdropProps:Q,getTransitionProps:G,portalRef:Z,isTopModal:J,exited:$,hasTransition:_}=A((0,r.A)({},q,{rootRef:t})),ee=(0,r.A)({},q,{exited:$}),te=(e=>{const{open:t,exited:n,classes:o}=e,r={root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]};return(0,E.A)(r,B,o)})(ee),ne={};if(void 0===g.props.tabIndex&&(ne.tabIndex="-1"),_){const{onEnter:e,onExited:t}=G();ne.onEnter=e,ne.onExited=t}const oe=null!=(n=null!=(l=null==H?void 0:H.root)?l:k.Root)?n:F,re=null!=(c=null!=(d=null==H?void 0:H.backdrop)?d:k.Backdrop)?c:h,ae=null!=(u=null==U?void 0:U.root)?u:R.root,ie=null!=(p=null==U?void 0:U.backdrop)?p:R.backdrop,se=(0,s.Q)({elementType:oe,externalSlotProps:ae,externalForwardedProps:X,getSlotProps:Y,additionalProps:{ref:t,as:y},ownerState:ee,className:(0,i.A)(v,null==ae?void 0:ae.className,null==te?void 0:te.root,!ee.open&&ee.exited&&(null==te?void 0:te.hidden))}),le=(0,s.Q)({elementType:re,externalSlotProps:ie,additionalProps:f,getSlotProps:e=>Q((0,r.A)({},e,{onClick:t=>{K&&K(t),null!=e&&e.onClick&&e.onClick(t)}})),className:(0,i.A)(null==ie?void 0:ie.className,null==f?void 0:f.className,null==te?void 0:te.backdrop),ownerState:ee});return j||V||_&&!$?(0,S.jsx)(T.Z,{ref:Z,container:x,disablePortal:N,children:(0,S.jsxs)(oe,(0,r.A)({},se,{children:[!W&&h?(0,S.jsx)(re,(0,r.A)({},le)):null,(0,S.jsx)(C,{disableEnforceFocus:I,disableAutoFocus:w,disableRestoreFocus:M,isEnabled:J,open:V,children:a.cloneElement(g,ne)})]}))}):null}))}}]);
//# sourceMappingURL=7326.b965eb43.chunk.js.map