"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[2624],{50044:(e,t,r)=>{r.d(t,{x:()=>s});var o=r(65043),n=r(47042),a=r(24626),i=r(22144),l=r(70579);function c(e){return e.substring(2).toLowerCase()}function s(e){const{children:t,disableReactTree:r=!1,mouseEvent:s="onClick",onClickAway:d,touchEvent:u="onTouchEnd"}=e,p=o.useRef(!1),m=o.useRef(null),v=o.useRef(!1),f=o.useRef(!1);o.useEffect((()=>(setTimeout((()=>{v.current=!0}),0),()=>{v.current=!1})),[]);const g=(0,n.A)(t.ref,m),h=(0,a.A)((e=>{const t=f.current;f.current=!1;const o=(0,i.A)(m.current);if(!v.current||!m.current||"clientX"in e&&function(e,t){return t.documentElement.clientWidth<e.clientX||t.documentElement.clientHeight<e.clientY}(e,o))return;if(p.current)return void(p.current=!1);let n;n=e.composedPath?e.composedPath().indexOf(m.current)>-1:!o.documentElement.contains(e.target)||m.current.contains(e.target),n||!r&&t||d(e)})),A=e=>r=>{f.current=!0;const o=t.props[e];o&&o(r)},b={ref:g};return!1!==u&&(b[u]=A(u)),o.useEffect((()=>{if(!1!==u){const e=c(u),t=(0,i.A)(m.current),r=()=>{p.current=!0};return t.addEventListener(e,h),t.addEventListener("touchmove",r),()=>{t.removeEventListener(e,h),t.removeEventListener("touchmove",r)}}}),[h,u]),!1!==s&&(b[s]=A(s)),o.useEffect((()=>{if(!1!==s){const e=c(s),t=(0,i.A)(m.current);return t.addEventListener(e,h),()=>{t.removeEventListener(e,h)}}}),[h,s]),(0,l.jsx)(o.Fragment,{children:o.cloneElement(t,b)})}},32994:(e,t,r)=>{var o=r(24994);t.A=void 0;var n=o(r(40039)),a=r(70579);t.A=(0,n.default)((0,a.jsx)("path",{d:"M3 21h18v-2H3zm6-4h12v-2H9zm-6-4h18v-2H3zm6-4h12V7H9zM3 3v2h18V3z"}),"FormatAlignRight")},92314:(e,t,r)=>{r.d(t,{A:()=>b});var o=r(98587),n=r(58168),a=r(65043),i=r(58387),l=r(68606),c=r(34535),s=r(72876),d=r(6803),u=r(63336),p=r(57056),m=r(32400);function v(e){return(0,m.Ay)("MuiAppBar",e)}(0,p.A)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);var f=r(70579);const g=["className","color","enableColorOnDark","position"],h=(e,t)=>e?"".concat(null==e?void 0:e.replace(")",""),", ").concat(t,")"):t,A=(0,c.Ay)(u.A,{name:"MuiAppBar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["position".concat((0,d.A)(r.position))],t["color".concat((0,d.A)(r.color))]]}})((e=>{let{theme:t,ownerState:r}=e;const o="light"===t.palette.mode?t.palette.grey[100]:t.palette.grey[900];return(0,n.A)({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},"fixed"===r.position&&{position:"fixed",zIndex:(t.vars||t).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},"absolute"===r.position&&{position:"absolute",zIndex:(t.vars||t).zIndex.appBar,top:0,left:"auto",right:0},"sticky"===r.position&&{position:"sticky",zIndex:(t.vars||t).zIndex.appBar,top:0,left:"auto",right:0},"static"===r.position&&{position:"static"},"relative"===r.position&&{position:"relative"},!t.vars&&(0,n.A)({},"default"===r.color&&{backgroundColor:o,color:t.palette.getContrastText(o)},r.color&&"default"!==r.color&&"inherit"!==r.color&&"transparent"!==r.color&&{backgroundColor:t.palette[r.color].main,color:t.palette[r.color].contrastText},"inherit"===r.color&&{color:"inherit"},"dark"===t.palette.mode&&!r.enableColorOnDark&&{backgroundColor:null,color:null},"transparent"===r.color&&(0,n.A)({backgroundColor:"transparent",color:"inherit"},"dark"===t.palette.mode&&{backgroundImage:"none"})),t.vars&&(0,n.A)({},"default"===r.color&&{"--AppBar-background":r.enableColorOnDark?t.vars.palette.AppBar.defaultBg:h(t.vars.palette.AppBar.darkBg,t.vars.palette.AppBar.defaultBg),"--AppBar-color":r.enableColorOnDark?t.vars.palette.text.primary:h(t.vars.palette.AppBar.darkColor,t.vars.palette.text.primary)},r.color&&!r.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":r.enableColorOnDark?t.vars.palette[r.color].main:h(t.vars.palette.AppBar.darkBg,t.vars.palette[r.color].main),"--AppBar-color":r.enableColorOnDark?t.vars.palette[r.color].contrastText:h(t.vars.palette.AppBar.darkColor,t.vars.palette[r.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:"inherit"===r.color?"inherit":"var(--AppBar-color)"},"transparent"===r.color&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))})),b=a.forwardRef((function(e,t){const r=(0,s.A)({props:e,name:"MuiAppBar"}),{className:a,color:c="primary",enableColorOnDark:u=!1,position:p="fixed"}=r,m=(0,o.A)(r,g),h=(0,n.A)({},r,{color:c,position:p,enableColorOnDark:u}),b=(e=>{const{color:t,position:r,classes:o}=e,n={root:["root","color".concat((0,d.A)(t)),"position".concat((0,d.A)(r))]};return(0,l.A)(n,v,o)})(h);return(0,f.jsx)(A,(0,n.A)({square:!0,component:"header",ownerState:h,elevation:4,className:(0,i.A)(b.root,a,"fixed"===p&&"mui-fixed"),ref:t},m))}))},17830:(e,t,r)=>{r.d(t,{A:()=>I});var o=r(98587),n=r(58168),a=r(65043),i=r(58387),l=r(68606),c=r(34535),s=r(72876),d=r(59662),u=r(70579);const p=(0,d.A)((0,u.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var m=r(57056),v=r(32400);function f(e){return(0,v.Ay)("MuiAvatar",e)}(0,m.A)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var g=r(47042),h=r(4430),A=r(18413),b=r(62205);const y=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],x=["component","slots","slotProps"],w=["component"];const S=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],k=(0,c.Ay)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})((e=>{let{theme:t}=e;return{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:(0,n.A)({color:(t.vars||t).palette.background.default},t.vars?{backgroundColor:t.vars.palette.Avatar.defaultBg}:(0,n.A)({backgroundColor:t.palette.grey[400]},t.applyStyles("dark",{backgroundColor:t.palette.grey[600]})))}]}})),C=(0,c.Ay)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),R=(0,c.Ay)(p,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});const I=a.forwardRef((function(e,t){const r=(0,s.A)({props:e,name:"MuiAvatar"}),{alt:c,children:d,className:p,component:m="div",slots:v={},slotProps:I={},imgProps:M,sizes:B,src:T,srcSet:E,variant:O="circular"}=r,D=(0,o.A)(r,S);let L=null;const N=function(e){let{crossOrigin:t,referrerPolicy:r,src:o,srcSet:n}=e;const[i,l]=a.useState(!1);return a.useEffect((()=>{if(!o&&!n)return;l(!1);let e=!0;const a=new Image;return a.onload=()=>{e&&l("loaded")},a.onerror=()=>{e&&l("error")},a.crossOrigin=t,a.referrerPolicy=r,a.src=o,n&&(a.srcset=n),()=>{e=!1}}),[t,r,o,n]),i}((0,n.A)({},M,{src:T,srcSet:E})),P=T||E,z=P&&"error"!==N,j=(0,n.A)({},r,{colorDefault:!z,component:m,variant:O}),F=(e=>{const{classes:t,variant:r,colorDefault:o}=e,n={root:["root",r,o&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,l.A)(n,f,t)})(j),[V,H]=function(e,t){const{className:r,elementType:a,ownerState:i,externalForwardedProps:l,getSlotOwnerState:c,internalForwardedProps:s}=t,d=(0,o.A)(t,y),{component:u,slots:p={[e]:void 0},slotProps:m={[e]:void 0}}=l,v=(0,o.A)(l,x),f=p[e]||a,S=(0,h.Y)(m[e],i),k=(0,A.p)((0,n.A)({className:r},d,{externalForwardedProps:"root"===e?v:void 0,externalSlotProps:S})),{props:{component:C},internalRef:R}=k,I=(0,o.A)(k.props,w),M=(0,g.A)(R,null==S?void 0:S.ref,t.ref),B=c?c(I):{},T=(0,n.A)({},i,B),E="root"===e?C||u:C,O=(0,b.X)(f,(0,n.A)({},"root"===e&&!u&&!p[e]&&s,"root"!==e&&!p[e]&&s,I,E&&{as:E},{ref:M}),T);return Object.keys(B).forEach((e=>{delete O[e]})),[f,O]}("img",{className:F.img,elementType:C,externalForwardedProps:{slots:v,slotProps:{img:(0,n.A)({},M,I.img)}},additionalProps:{alt:c,src:T,srcSet:E,sizes:B},ownerState:j});return L=z?(0,u.jsx)(V,(0,n.A)({},H)):d||0===d?d:P&&c?c[0]:(0,u.jsx)(R,{ownerState:j,className:F.fallback}),(0,u.jsx)(k,(0,n.A)({as:m,ownerState:j,className:(0,i.A)(F.root,p),ref:t},D,{children:L}))}))},39336:(e,t,r)=>{r.d(t,{A:()=>h});var o=r(98587),n=r(58168),a=r(65043),i=r(58387),l=r(68606),c=r(90310),s=r(34535),d=r(72876),u=r(5658),p=r(70579);const m=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],v=(0,s.Ay)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})((e=>{let{theme:t,ownerState:r}=e;return(0,n.A)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):(0,c.X4)(t.palette.divider,.08)},"inset"===r.variant&&{marginLeft:72},"middle"===r.variant&&"horizontal"===r.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===r.variant&&"vertical"===r.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===r.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"})}),(e=>{let{ownerState:t}=e;return(0,n.A)({},t.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}})}),(e=>{let{theme:t,ownerState:r}=e;return(0,n.A)({},r.children&&"vertical"!==r.orientation&&{"&::before, &::after":{width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider)}})}),(e=>{let{theme:t,ownerState:r}=e;return(0,n.A)({},r.children&&"vertical"===r.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:"thin solid ".concat((t.vars||t).palette.divider)}})}),(e=>{let{ownerState:t}=e;return(0,n.A)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),f=(0,s.Ay)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})((e=>{let{theme:t,ownerState:r}=e;return(0,n.A)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===r.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),g=a.forwardRef((function(e,t){const r=(0,d.A)({props:e,name:"MuiDivider"}),{absolute:a=!1,children:c,className:s,component:g=(c?"div":"hr"),flexItem:h=!1,light:A=!1,orientation:b="horizontal",role:y=("hr"!==g?"separator":void 0),textAlign:x="center",variant:w="fullWidth"}=r,S=(0,o.A)(r,m),k=(0,n.A)({},r,{absolute:a,component:g,flexItem:h,light:A,orientation:b,role:y,textAlign:x,variant:w}),C=(e=>{const{absolute:t,children:r,classes:o,flexItem:n,light:a,orientation:i,textAlign:c,variant:s}=e,d={root:["root",t&&"absolute",s,a&&"light","vertical"===i&&"vertical",n&&"flexItem",r&&"withChildren",r&&"vertical"===i&&"withChildrenVertical","right"===c&&"vertical"!==i&&"textAlignRight","left"===c&&"vertical"!==i&&"textAlignLeft"],wrapper:["wrapper","vertical"===i&&"wrapperVertical"]};return(0,l.A)(d,u.K,o)})(k);return(0,p.jsx)(v,(0,n.A)({as:g,className:(0,i.A)(C.root,s),role:y,ref:t,ownerState:k},S,{children:c?(0,p.jsx)(f,{className:C.wrapper,ownerState:k,children:c}):null}))}));g.muiSkipListHighlight=!0;const h=g},5658:(e,t,r)=>{r.d(t,{A:()=>i,K:()=>a});var o=r(57056),n=r(32400);function a(e){return(0,n.Ay)("MuiDivider",e)}const i=(0,o.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"])},71424:(e,t,r)=>{r.d(t,{A:()=>i,f:()=>a});var o=r(57056),n=r(32400);function a(e){return(0,n.Ay)("MuiListItemIcon",e)}const i=(0,o.A)("MuiListItemIcon",["root","alignItemsFlexStart"])},28052:(e,t,r)=>{r.d(t,{A:()=>i,b:()=>a});var o=r(57056),n=r(32400);function a(e){return(0,n.Ay)("MuiListItemText",e)}const i=(0,o.A)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"])},32143:(e,t,r)=>{r.d(t,{A:()=>C});var o=r(98587),n=r(58168),a=r(65043),i=r(58387),l=r(68606),c=r(90310),s=r(34535),d=r(72876),u=r(51347),p=r(75429),m=r(55013),v=r(95849),f=r(5658),g=r(71424),h=r(28052),A=r(57056),b=r(32400);function y(e){return(0,b.Ay)("MuiMenuItem",e)}const x=(0,A.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var w=r(70579);const S=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],k=(0,s.Ay)(p.A,{shouldForwardProp:e=>(0,s.ep)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((e=>{let{theme:t,ownerState:r}=e;return(0,n.A)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((t.vars||t).palette.divider),backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(x.selected)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,c.X4)(t.palette.primary.main,t.palette.action.selectedOpacity),["&.".concat(x.focusVisible)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.focusOpacity,"))"):(0,c.X4)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},["&.".concat(x.selected,":hover")]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.hoverOpacity,"))"):(0,c.X4)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,c.X4)(t.palette.primary.main,t.palette.action.selectedOpacity)}},["&.".concat(x.focusVisible)]:{backgroundColor:(t.vars||t).palette.action.focus},["&.".concat(x.disabled)]:{opacity:(t.vars||t).palette.action.disabledOpacity},["& + .".concat(f.A.root)]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},["& + .".concat(f.A.inset)]:{marginLeft:52},["& .".concat(h.A.root)]:{marginTop:0,marginBottom:0},["& .".concat(h.A.inset)]:{paddingLeft:36},["& .".concat(g.A.root)]:{minWidth:36}},!r.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},r.dense&&(0,n.A)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{["& .".concat(g.A.root," svg")]:{fontSize:"1.25rem"}}))})),C=a.forwardRef((function(e,t){const r=(0,d.A)({props:e,name:"MuiMenuItem"}),{autoFocus:c=!1,component:s="li",dense:p=!1,divider:f=!1,disableGutters:g=!1,focusVisibleClassName:h,role:A="menuitem",tabIndex:b,className:x}=r,C=(0,o.A)(r,S),R=a.useContext(u.A),I=a.useMemo((()=>({dense:p||R.dense||!1,disableGutters:g})),[R.dense,p,g]),M=a.useRef(null);(0,m.A)((()=>{c&&M.current&&M.current.focus()}),[c]);const B=(0,n.A)({},r,{dense:I.dense,divider:f,disableGutters:g}),T=(e=>{const{disabled:t,dense:r,divider:o,disableGutters:a,selected:i,classes:c}=e,s={root:["root",r&&"dense",t&&"disabled",!a&&"gutters",o&&"divider",i&&"selected"]},d=(0,l.A)(s,y,c);return(0,n.A)({},c,d)})(r),E=(0,v.A)(M,t);let O;return r.disabled||(O=void 0!==b?b:-1),(0,w.jsx)(u.A.Provider,{value:I,children:(0,w.jsx)(k,(0,n.A)({ref:E,role:A,tabIndex:O,component:s,focusVisibleClassName:(0,i.A)(T.focusVisible,h),className:(0,i.A)(T.root,x)},C,{ownerState:B,classes:T}))})}))},55263:(e,t,r)=>{r.d(t,{A:()=>g});var o=r(98587),n=r(58168),a=r(65043),i=r(58387),l=r(68606),c=r(72876),s=r(34535),d=r(57056),u=r(32400);function p(e){return(0,u.Ay)("MuiToolbar",e)}(0,d.A)("MuiToolbar",["root","gutters","regular","dense"]);var m=r(70579);const v=["className","component","disableGutters","variant"],f=(0,s.Ay)("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disableGutters&&t.gutters,t[r.variant]]}})((e=>{let{theme:t,ownerState:r}=e;return(0,n.A)({position:"relative",display:"flex",alignItems:"center"},!r.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}},"dense"===r.variant&&{minHeight:48})}),(e=>{let{theme:t,ownerState:r}=e;return"regular"===r.variant&&t.mixins.toolbar})),g=a.forwardRef((function(e,t){const r=(0,c.A)({props:e,name:"MuiToolbar"}),{className:a,component:s="div",disableGutters:d=!1,variant:u="regular"}=r,g=(0,o.A)(r,v),h=(0,n.A)({},r,{component:s,disableGutters:d,variant:u}),A=(e=>{const{classes:t,disableGutters:r,variant:o}=e,n={root:["root",!r&&"gutters",o]};return(0,l.A)(n,p,t)})(h);return(0,m.jsx)(f,(0,n.A)({as:s,className:(0,i.A)(A.root,a),ref:t,ownerState:h},g))}))},45969:(e,t,r)=>{r.d(t,{A:()=>A});var o=r(58168),n=r(98587),a=r(65043);const i=a.createContext(null);function l(){return a.useContext(i)}const c="function"===typeof Symbol&&Symbol.for?Symbol.for("mui.nested"):"__THEME_NESTED__";var s=r(70579);const d=function(e){const{children:t,theme:r}=e,n=l(),d=a.useMemo((()=>{const e=null===n?r:function(e,t){if("function"===typeof t)return t(e);return(0,o.A)({},e,t)}(n,r);return null!=e&&(e[c]=null!==n),e}),[r,n]);return(0,s.jsx)(i.Provider,{value:d,children:t})};var u=r(75025),p=r(67082);const m={};function v(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return a.useMemo((()=>{const a=e&&t[e]||t;if("function"===typeof r){const i=r(a),l=e?(0,o.A)({},t,{[e]:i}):i;return n?()=>l:l}return e?(0,o.A)({},t,{[e]:r}):(0,o.A)({},t,r)}),[e,t,r,n])}const f=function(e){const{children:t,theme:r,themeId:o}=e,n=(0,p.A)(m),a=l()||m,i=v(o,n,r),c=v(o,a,r,!0);return(0,s.jsx)(d,{theme:c,children:(0,s.jsx)(u.T.Provider,{value:i,children:t})})};var g=r(13375);const h=["theme"];function A(e){let{theme:t}=e,r=(0,n.A)(e,h);const a=t[g.A];return(0,s.jsx)(f,(0,o.A)({},r,{themeId:a?g.A:void 0,theme:a||t}))}},76185:(e,t,r)=>{r.d(t,{SO:()=>p});var o=r(65043);const n=e=>{const t=o.useRef(e);return o.useEffect((()=>{t.current=e})),t},a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const a=n(e),i=o.useRef(),l=[t,r,a];function c(){i.current&&clearTimeout(i.current),i.current=void 0}function s(){i.current=void 0}return o.useEffect((()=>c),l),o.useCallback((function(){const e=arguments,{current:o}=i;if(void 0===o&&r)return i.current=setTimeout(s,t),a.current.apply(null,e);o&&clearTimeout(o),i.current=setTimeout((()=>{i.current=void 0,a.current.apply(null,e)}),t)}),l)};const i=function(e,t,r,n){const a=o.useRef(r),i=o.useRef(n);o.useEffect((()=>{a.current=r,i.current=n})),o.useEffect((()=>{const r=e&&"current"in e?e.current:e;if(!r)return;let o=0;function n(){if(!o){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];a.current.apply(this,t)}}r.addEventListener(t,n);const l=i.current;return()=>{o=1,r.removeEventListener(t,n),l&&l()}}),[e,t])},l={},c="undefined"===typeof window?null:window,s=c&&"undefined"!==typeof c.visualViewport?c.visualViewport:null,d=()=>[document.documentElement.clientWidth,document.documentElement.clientHeight],u=function(e){void 0===e&&(e=l);const{wait:t,leading:r,initialWidth:n=0,initialHeight:u=0}=e,[p,m]=((e,t,r)=>{const n=o.useState(e);return[n[0],a(n[1],t,r)]})("undefined"===typeof document?[n,u]:d,t,r),v=()=>m(d);return i(c,"resize",v),i(s,"resize",v),i(c,"orientationchange",v),p},p=e=>u(e)[0]},31425:()=>{}}]);
//# sourceMappingURL=2624.0f5e6c5a.chunk.js.map