"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[3701],{73701:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var o=a(65043),n=a(73216),r=a(16032),i=a(26745),l=a(63336),s=a(68903),c=a(85865),d=a(96446),p=a(11906),v=a(70579);const u=function(){const{id:e}=(0,n.g)(),[t,a]=(0,o.useState)(null),[u,h]=(0,o.useState)(null);return console.log("This is the is "+e),(0,o.useEffect)((()=>{(async()=>{const t=(0,r.H9)(i.kA,"books",e),o=await(0,r.x7)(t);o.exists()?(a({id:o.id,...o.data()}),h(o.data().ebookPdfURL)):console.log("No such document!")})()}),[e]),t?(0,v.jsxs)("div",{children:[(0,v.jsx)(l.A,{children:(0,v.jsxs)(s.Ay,{container:!0,spacing:2,children:[(0,v.jsxs)(s.Ay,{item:!0,xs:12,sm:6,children:[(0,v.jsx)(c.A,{variant:"h5",component:"h2",children:t.title}),(0,v.jsx)(c.A,{variant:"subtitle1",color:"textSecondary",children:t.subtitle}),(0,v.jsx)(c.A,{variant:"body2",children:t.description})]}),(0,v.jsxs)(s.Ay,{item:!0,xs:12,sm:6,children:[(0,v.jsx)(c.A,{variant:"body1",children:"Categories:"}),(0,v.jsx)("ul",{children:t.categories&&Array.isArray(t.categories)&&t.categories.map(((e,t)=>(0,v.jsx)("li",{children:e},t)))}),(0,v.jsx)(d.A,{mt:2,children:(0,v.jsx)(p.A,{variant:"contained",color:"primary",onClick:()=>h(t.ebookPdfURL),children:"Read"})})]})]})}),u&&(0,v.jsx)("iframe",{src:"https://docs.google.com/gview?url=".concat(encodeURIComponent(u),"&embedded=true"),width:"100%",height:"600px",title:"ebook"})]}):(0,v.jsx)("div",{children:"Loading..."})}},11906:(e,t,a)=>{a.d(t,{A:()=>R});var o=a(98587),n=a(58168),r=a(65043),i=a(58387),l=a(22018),s=a(68606),c=a(90310),d=a(34535),p=a(72876),v=a(75429),u=a(6803),h=a(57056),m=a(32400);function g(e){return(0,m.Ay)("MuiButton",e)}const x=(0,h.A)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);const b=r.createContext({});const y=r.createContext(void 0);var A=a(70579);const f=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],S=e=>(0,n.A)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),w=(0,d.Ay)(v.A,{shouldForwardProp:e=>(0,d.ep)(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],t["".concat(a.variant).concat((0,u.A)(a.color))],t["size".concat((0,u.A)(a.size))],t["".concat(a.variant,"Size").concat((0,u.A)(a.size))],"inherit"===a.color&&t.colorInherit,a.disableElevation&&t.disableElevation,a.fullWidth&&t.fullWidth]}})((e=>{let{theme:t,ownerState:a}=e;var o,r;const i="light"===t.palette.mode?t.palette.grey[300]:t.palette.grey[800],l="light"===t.palette.mode?t.palette.grey.A100:t.palette.grey[700];return(0,n.A)({},t.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,transition:t.transitions.create(["background-color","box-shadow","border-color","color"],{duration:t.transitions.duration.short}),"&:hover":(0,n.A)({textDecoration:"none",backgroundColor:t.vars?"rgba(".concat(t.vars.palette.text.primaryChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette.text.primary,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===a.variant&&"inherit"!==a.color&&{backgroundColor:t.vars?"rgba(".concat(t.vars.palette[a.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette[a.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===a.variant&&"inherit"!==a.color&&{border:"1px solid ".concat((t.vars||t).palette[a.color].main),backgroundColor:t.vars?"rgba(".concat(t.vars.palette[a.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette[a.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===a.variant&&{backgroundColor:t.vars?t.vars.palette.Button.inheritContainedHoverBg:l,boxShadow:(t.vars||t).shadows[4],"@media (hover: none)":{boxShadow:(t.vars||t).shadows[2],backgroundColor:(t.vars||t).palette.grey[300]}},"contained"===a.variant&&"inherit"!==a.color&&{backgroundColor:(t.vars||t).palette[a.color].dark,"@media (hover: none)":{backgroundColor:(t.vars||t).palette[a.color].main}}),"&:active":(0,n.A)({},"contained"===a.variant&&{boxShadow:(t.vars||t).shadows[8]}),["&.".concat(x.focusVisible)]:(0,n.A)({},"contained"===a.variant&&{boxShadow:(t.vars||t).shadows[6]}),["&.".concat(x.disabled)]:(0,n.A)({color:(t.vars||t).palette.action.disabled},"outlined"===a.variant&&{border:"1px solid ".concat((t.vars||t).palette.action.disabledBackground)},"contained"===a.variant&&{color:(t.vars||t).palette.action.disabled,boxShadow:(t.vars||t).shadows[0],backgroundColor:(t.vars||t).palette.action.disabledBackground})},"text"===a.variant&&{padding:"6px 8px"},"text"===a.variant&&"inherit"!==a.color&&{color:(t.vars||t).palette[a.color].main},"outlined"===a.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===a.variant&&"inherit"!==a.color&&{color:(t.vars||t).palette[a.color].main,border:t.vars?"1px solid rgba(".concat(t.vars.palette[a.color].mainChannel," / 0.5)"):"1px solid ".concat((0,c.X4)(t.palette[a.color].main,.5))},"contained"===a.variant&&{color:t.vars?t.vars.palette.text.primary:null==(o=(r=t.palette).getContrastText)?void 0:o.call(r,t.palette.grey[300]),backgroundColor:t.vars?t.vars.palette.Button.inheritContainedBg:i,boxShadow:(t.vars||t).shadows[2]},"contained"===a.variant&&"inherit"!==a.color&&{color:(t.vars||t).palette[a.color].contrastText,backgroundColor:(t.vars||t).palette[a.color].main},"inherit"===a.color&&{color:"inherit",borderColor:"currentColor"},"small"===a.size&&"text"===a.variant&&{padding:"4px 5px",fontSize:t.typography.pxToRem(13)},"large"===a.size&&"text"===a.variant&&{padding:"8px 11px",fontSize:t.typography.pxToRem(15)},"small"===a.size&&"outlined"===a.variant&&{padding:"3px 9px",fontSize:t.typography.pxToRem(13)},"large"===a.size&&"outlined"===a.variant&&{padding:"7px 21px",fontSize:t.typography.pxToRem(15)},"small"===a.size&&"contained"===a.variant&&{padding:"4px 10px",fontSize:t.typography.pxToRem(13)},"large"===a.size&&"contained"===a.variant&&{padding:"8px 22px",fontSize:t.typography.pxToRem(15)},a.fullWidth&&{width:"100%"})}),(e=>{let{ownerState:t}=e;return t.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},["&.".concat(x.focusVisible)]:{boxShadow:"none"},"&:active":{boxShadow:"none"},["&.".concat(x.disabled)]:{boxShadow:"none"}}})),z=(0,d.Ay)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.startIcon,t["iconSize".concat((0,u.A)(a.size))]]}})((e=>{let{ownerState:t}=e;return(0,n.A)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},S(t))})),C=(0,d.Ay)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.endIcon,t["iconSize".concat((0,u.A)(a.size))]]}})((e=>{let{ownerState:t}=e;return(0,n.A)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},S(t))})),R=r.forwardRef((function(e,t){const a=r.useContext(b),c=r.useContext(y),d=(0,l.A)(a,e),v=(0,p.A)({props:d,name:"MuiButton"}),{children:h,color:m="primary",component:x="button",className:S,disabled:R=!1,disableElevation:k=!1,disableFocusRipple:I=!1,endIcon:B,focusVisibleClassName:M,fullWidth:W=!1,size:j="medium",startIcon:N,type:E,variant:T="text"}=v,L=(0,o.A)(v,f),P=(0,n.A)({},v,{color:m,component:x,disabled:R,disableElevation:k,disableFocusRipple:I,fullWidth:W,size:j,type:E,variant:T}),O=(e=>{const{color:t,disableElevation:a,fullWidth:o,size:r,variant:i,classes:l}=e,c={root:["root",i,"".concat(i).concat((0,u.A)(t)),"size".concat((0,u.A)(r)),"".concat(i,"Size").concat((0,u.A)(r)),"inherit"===t&&"colorInherit",a&&"disableElevation",o&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat((0,u.A)(r))],endIcon:["endIcon","iconSize".concat((0,u.A)(r))]},d=(0,s.A)(c,g,l);return(0,n.A)({},l,d)})(P),V=N&&(0,A.jsx)(z,{className:O.startIcon,ownerState:P,children:N}),q=B&&(0,A.jsx)(C,{className:O.endIcon,ownerState:P,children:B}),X=c||"";return(0,A.jsxs)(w,(0,n.A)({ownerState:P,className:(0,i.A)(a.className,O.root,S,X),component:x,disabled:R,focusRipple:!I,focusVisibleClassName:(0,i.A)(O.focusVisible,M),ref:t,type:E},L,{classes:O,children:[V,h,q]}))}))},63336:(e,t,a)=>{a.d(t,{A:()=>b});var o=a(98587),n=a(58168),r=a(65043),i=a(58387),l=a(68606),s=a(90310),c=a(34535);const d=e=>{let t;return t=e<1?5.11916*e**2:4.5*Math.log(e+1)+2,(t/100).toFixed(2)};var p=a(72876),v=a(57056),u=a(32400);function h(e){return(0,u.Ay)("MuiPaper",e)}(0,v.A)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var m=a(70579);const g=["className","component","elevation","square","variant"],x=(0,c.Ay)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],!a.square&&t.rounded,"elevation"===a.variant&&t["elevation".concat(a.elevation)]]}})((e=>{let{theme:t,ownerState:a}=e;var o;return(0,n.A)({backgroundColor:(t.vars||t).palette.background.paper,color:(t.vars||t).palette.text.primary,transition:t.transitions.create("box-shadow")},!a.square&&{borderRadius:t.shape.borderRadius},"outlined"===a.variant&&{border:"1px solid ".concat((t.vars||t).palette.divider)},"elevation"===a.variant&&(0,n.A)({boxShadow:(t.vars||t).shadows[a.elevation]},!t.vars&&"dark"===t.palette.mode&&{backgroundImage:"linear-gradient(".concat((0,s.X4)("#fff",d(a.elevation)),", ").concat((0,s.X4)("#fff",d(a.elevation)),")")},t.vars&&{backgroundImage:null==(o=t.vars.overlays)?void 0:o[a.elevation]}))})),b=r.forwardRef((function(e,t){const a=(0,p.A)({props:e,name:"MuiPaper"}),{className:r,component:s="div",elevation:c=1,square:d=!1,variant:v="elevation"}=a,u=(0,o.A)(a,g),b=(0,n.A)({},a,{component:s,elevation:c,square:d,variant:v}),y=(e=>{const{square:t,elevation:a,variant:o,classes:n}=e,r={root:["root",o,!t&&"rounded","elevation"===o&&"elevation".concat(a)]};return(0,l.A)(r,h,n)})(b);return(0,m.jsx)(x,(0,n.A)({as:s,ownerState:b,className:(0,i.A)(y.root,r),ref:t},u))}))},85865:(e,t,a)=>{a.d(t,{A:()=>A});var o=a(98587),n=a(58168),r=a(65043),i=a(58387),l=a(18698),s=a(68606),c=a(34535),d=a(72876),p=a(6803),v=a(57056),u=a(32400);function h(e){return(0,u.Ay)("MuiTypography",e)}(0,v.A)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var m=a(70579);const g=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],x=(0,c.Ay)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.variant&&t[a.variant],"inherit"!==a.align&&t["align".concat((0,p.A)(a.align))],a.noWrap&&t.noWrap,a.gutterBottom&&t.gutterBottom,a.paragraph&&t.paragraph]}})((e=>{let{theme:t,ownerState:a}=e;return(0,n.A)({margin:0},"inherit"===a.variant&&{font:"inherit"},"inherit"!==a.variant&&t.typography[a.variant],"inherit"!==a.align&&{textAlign:a.align},a.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},a.gutterBottom&&{marginBottom:"0.35em"},a.paragraph&&{marginBottom:16})})),b={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},y={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},A=r.forwardRef((function(e,t){const a=(0,d.A)({props:e,name:"MuiTypography"}),r=(e=>y[e]||e)(a.color),c=(0,l.A)((0,n.A)({},a,{color:r})),{align:v="inherit",className:u,component:A,gutterBottom:f=!1,noWrap:S=!1,paragraph:w=!1,variant:z="body1",variantMapping:C=b}=c,R=(0,o.A)(c,g),k=(0,n.A)({},c,{align:v,color:r,className:u,component:A,gutterBottom:f,noWrap:S,paragraph:w,variant:z,variantMapping:C}),I=A||(w?"p":C[z]||b[z])||"span",B=(e=>{const{align:t,gutterBottom:a,noWrap:o,paragraph:n,variant:r,classes:i}=e,l={root:["root",r,"inherit"!==e.align&&"align".concat((0,p.A)(t)),a&&"gutterBottom",o&&"noWrap",n&&"paragraph"]};return(0,s.A)(l,h,i)})(k);return(0,m.jsx)(x,(0,n.A)({as:I,ref:t,ownerState:k,className:(0,i.A)(B.root,u)},R))}))}}]);
//# sourceMappingURL=3701.09bb9b06.chunk.js.map