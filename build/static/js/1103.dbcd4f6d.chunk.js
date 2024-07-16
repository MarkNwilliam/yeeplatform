"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[1103],{70360:(e,o,t)=>{t.d(o,{X:()=>a});const a=["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Democratic Republic of the Congo","Republic of the Congo","Cote d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Sao Tome and Principe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"]},31103:(e,o,t)=>{t.r(o),t.d(o,{default:()=>v});var a=t(65043),n=t(30064),r=t.n(n),i=t(17392),l=t(11906),c=t(59662),s=t(70579);const d=(0,c.A)((0,s.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack");var u=t(73216),p=t(24858),m=(t(21785),t(98225)),h=t(86213),g=t(70360);const v=()=>{var e,o,t,n,c,v;const[b,f]=(0,a.useState)({}),[x,S]=(0,a.useState)(!1),y=(0,u.Zp)(),{register:w,handleSubmit:A,setValue:z}=(0,p.mN)({defaultValues:{username:b.username,phone:b.phone,country:b.country,age:b.age,preferredReadingMode:b.preferredReadingMode,"socialLinks.twitter":null===(e=b.socialLinks)||void 0===e?void 0:e.twitter,"socialLinks.instagram":null===(o=b.socialLinks)||void 0===o?void 0:o.instagram,"socialLinks.facebook":null===(t=b.socialLinks)||void 0===t?void 0:t.facebook}}),C=m.j2.currentUser.uid;(0,a.useEffect)((()=>{const e=m.j2.currentUser.uid;h.A.get("https://yeeplatformbackend.azurewebsites.net/userDetails/".concat(e)).then((o=>{const t=o.data;f(t),S(t.providerData&&"google.com"===t.providerData[0].providerId);for(let e in t)Object.prototype.hasOwnProperty.call(t,e)&&z(e,t[e]);t.socialLinks&&(z("socialLinks.twitter",t.socialLinks.twitter),z("socialLinks.instagram",t.socialLinks.instagram),z("socialLinks.facebook",t.socialLinks.facebook)),console.log(t),(0,m.$s)(m.zS,"AccountPage","UserDetailsFetched",{userId:e})})).catch((e=>{console.error("Error fetching user data:",e)}))}),[]);return(0,s.jsxs)("div",{className:"bg-gray-100 min-h-screen p-4",children:[(0,s.jsxs)("header",{className:"flex items-center border-b border-gray-300 mb-6",children:[(0,s.jsx)(i.A,{onClick:()=>y(-1),className:"mr-2",children:(0,s.jsx)(d,{})}),(0,s.jsx)("h1",{className:"text-xl font-semibold text-yellow-500 text-center flex-grow",children:"Account Settings"})]}),(0,s.jsxs)("div",{className:"bg-white shadow-md rounded p-6 mx-auto max-w-xl",children:[(0,s.jsx)("h2",{className:"text-lg font-medium mb-4",children:"Personal Details"}),(0,s.jsxs)("form",{onSubmit:A((e=>{const o=m.j2.currentUser.uid;r().fire({title:"Saving Changes...",onBeforeOpen:()=>{r().showLoading()},allowOutsideClick:!1}),h.A.put("https://yeeplatformbackend.azurewebsites.net/updateaccountinfo/".concat(o),e).then((e=>{console.log("User data updated:",e.data),r().fire({icon:"success",title:"Success!",text:"Your data has been updated.",confirmButtonColor:"#3085d6"})})).catch((e=>{console.error("Error updating user data:",e),r().fire({icon:"error",title:"Oops...",text:"Something went wrong. Please try again.",confirmButtonColor:"#d33"})}))})),children:[(0,s.jsx)("input",{...w("username",{required:!0,maxLength:20}),className:"w-full p-2 mb-4 border rounded",placeholder:"Username",defaultValue:b.username}),!x&&(0,s.jsx)("input",{...w("email"),className:"w-full p-2 mb-4 border rounded",placeholder:"Email",defaultValue:b.email,disabled:!0}),(0,s.jsx)("input",{...w("phone",{pattern:/^[0-9]{10}$/}),className:"w-full p-2 mb-4 border rounded",placeholder:"Phone Number",defaultValue:b.phone}),(0,s.jsx)("select",{...w("country"),className:"w-full p-2 mb-4 border rounded",defaultValue:b.country,children:g.X.map((e=>(0,s.jsx)("option",{value:e,children:e},e)))}),(0,s.jsx)("input",{...w("age",{min:0,max:150}),className:"w-full p-2 mb-4 border rounded",placeholder:"Age",defaultValue:b.age}),(0,s.jsxs)("select",{...w("preferredReadingMode"),className:"w-full p-2 mb-4 border rounded",defaultValue:b.preferredReadingMode,children:[(0,s.jsx)("option",{value:"LTR",children:"Left to Right"}),(0,s.jsx)("option",{value:"RTL",children:"Right to Left"})]}),(0,s.jsx)("h2",{className:"text-lg font-medium mt-4 mb-4",children:"Social Links"}),(0,s.jsx)("input",{...w("socialLinks.twitter"),className:"w-full p-2 mb-4 border rounded",placeholder:"Twitter",defaultValue:null===(n=b.socialLinks)||void 0===n?void 0:n.twitter}),(0,s.jsx)("input",{...w("socialLinks.instagram"),className:"w-full p-2 mb-4 border rounded",placeholder:"Instagram",defaultValue:null===(c=b.socialLinks)||void 0===c?void 0:c.instagram}),(0,s.jsx)("input",{...w("socialLinks.facebook"),className:"w-full p-2 mb-4 border rounded",placeholder:"Facebook",defaultValue:null===(v=b.socialLinks)||void 0===v?void 0:v.facebook}),(0,s.jsxs)("div",{className:"flex justify-between gap-4 mt-4",children:[(0,s.jsx)("button",{type:"submit",className:"bg-blue-500 text-white py-2 px-4 rounded",children:"Save Changes"}),(0,s.jsx)("button",{onClick:async()=>{try{r().fire({title:"Becoming an Author...",onBeforeOpen:()=>{r().showLoading()},allowOutsideClick:!1});const e={isAuthor:!0},o=await h.A.put("https://yeeplatformbackend.azurewebsites.net/becomeAuthor/".concat(C),e);console.log(o.data),r().fire({icon:"success",title:"Congratulations!",text:"You have successfully become an author.",confirmButtonColor:"#3085d6"}).then((()=>{window.location.href="/dashboard"}))}catch(e){console.error("Error:",e),r().fire({icon:"error",title:"Oops...",text:"Something went wrong. Please try again.",confirmButtonColor:"#d33"})}},className:"bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow-md transition duration-300",children:"Become an Author"}),(0,s.jsx)(l.A,{variant:"outlined",color:"error",onClick:async()=>{try{await h.A.delete("https://yeeplatformbackend.azurewebsites.net/deleteaccount/".concat(C)),await m.j2.currentUser.delete(),r().fire({icon:"success",title:"Account Deleted",text:"Your account has been deleted.",confirmButtonColor:"#3085d6"}).then((()=>{window.location.href="/login"}))}catch(e){console.error("Error deleting account:",e),r().fire({icon:"error",title:"Oops...",text:"Something went wrong. Please try again.",confirmButtonColor:"#d33"})}},children:"Delete Account"}),!x&&(0,s.jsx)("button",{onClick:()=>(async e=>{try{await m.j2.currentUser.verifyBeforeUpdateEmail(e),r().fire({icon:"success",title:"Email Change Initiated",text:"A verification email has been sent to ".concat(e,". Please verify your new email address."),confirmButtonColor:"#3085d6"})}catch(o){console.error("Error initiating email change:",o),r().fire({icon:"error",title:"Oops...",text:"Something went wrong. Please try again.",confirmButtonColor:"#d33"})}})("newEmail@example.com"),className:"bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded shadow-md transition duration-300",children:"Change Email"})]})]})]})]})}},11906:(e,o,t)=>{t.d(o,{A:()=>R});var a=t(98587),n=t(58168),r=t(65043),i=t(69292),l=t(22018),c=t(68606),s=t(67266),d=t(34535),u=t(61475),p=t(72876),m=t(75429),h=t(6803),g=t(57056),v=t(32400);function b(e){return(0,v.Ay)("MuiButton",e)}const f=(0,g.A)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);const x=r.createContext({});const S=r.createContext(void 0);var y=t(70579);const w=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],A=e=>(0,n.A)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),z=(0,d.Ay)(m.A,{shouldForwardProp:e=>(0,u.A)(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,o[t.variant],o["".concat(t.variant).concat((0,h.A)(t.color))],o["size".concat((0,h.A)(t.size))],o["".concat(t.variant,"Size").concat((0,h.A)(t.size))],"inherit"===t.color&&o.colorInherit,t.disableElevation&&o.disableElevation,t.fullWidth&&o.fullWidth]}})((e=>{let{theme:o,ownerState:t}=e;var a,r;const i="light"===o.palette.mode?o.palette.grey[300]:o.palette.grey[800],l="light"===o.palette.mode?o.palette.grey.A100:o.palette.grey[700];return(0,n.A)({},o.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(o.vars||o).shape.borderRadius,transition:o.transitions.create(["background-color","box-shadow","border-color","color"],{duration:o.transitions.duration.short}),"&:hover":(0,n.A)({textDecoration:"none",backgroundColor:o.vars?"rgba(".concat(o.vars.palette.text.primaryChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,s.X4)(o.palette.text.primary,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===t.variant&&"inherit"!==t.color&&{backgroundColor:o.vars?"rgba(".concat(o.vars.palette[t.color].mainChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,s.X4)(o.palette[t.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===t.variant&&"inherit"!==t.color&&{border:"1px solid ".concat((o.vars||o).palette[t.color].main),backgroundColor:o.vars?"rgba(".concat(o.vars.palette[t.color].mainChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,s.X4)(o.palette[t.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===t.variant&&{backgroundColor:o.vars?o.vars.palette.Button.inheritContainedHoverBg:l,boxShadow:(o.vars||o).shadows[4],"@media (hover: none)":{boxShadow:(o.vars||o).shadows[2],backgroundColor:(o.vars||o).palette.grey[300]}},"contained"===t.variant&&"inherit"!==t.color&&{backgroundColor:(o.vars||o).palette[t.color].dark,"@media (hover: none)":{backgroundColor:(o.vars||o).palette[t.color].main}}),"&:active":(0,n.A)({},"contained"===t.variant&&{boxShadow:(o.vars||o).shadows[8]}),["&.".concat(f.focusVisible)]:(0,n.A)({},"contained"===t.variant&&{boxShadow:(o.vars||o).shadows[6]}),["&.".concat(f.disabled)]:(0,n.A)({color:(o.vars||o).palette.action.disabled},"outlined"===t.variant&&{border:"1px solid ".concat((o.vars||o).palette.action.disabledBackground)},"contained"===t.variant&&{color:(o.vars||o).palette.action.disabled,boxShadow:(o.vars||o).shadows[0],backgroundColor:(o.vars||o).palette.action.disabledBackground})},"text"===t.variant&&{padding:"6px 8px"},"text"===t.variant&&"inherit"!==t.color&&{color:(o.vars||o).palette[t.color].main},"outlined"===t.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===t.variant&&"inherit"!==t.color&&{color:(o.vars||o).palette[t.color].main,border:o.vars?"1px solid rgba(".concat(o.vars.palette[t.color].mainChannel," / 0.5)"):"1px solid ".concat((0,s.X4)(o.palette[t.color].main,.5))},"contained"===t.variant&&{color:o.vars?o.vars.palette.text.primary:null==(a=(r=o.palette).getContrastText)?void 0:a.call(r,o.palette.grey[300]),backgroundColor:o.vars?o.vars.palette.Button.inheritContainedBg:i,boxShadow:(o.vars||o).shadows[2]},"contained"===t.variant&&"inherit"!==t.color&&{color:(o.vars||o).palette[t.color].contrastText,backgroundColor:(o.vars||o).palette[t.color].main},"inherit"===t.color&&{color:"inherit",borderColor:"currentColor"},"small"===t.size&&"text"===t.variant&&{padding:"4px 5px",fontSize:o.typography.pxToRem(13)},"large"===t.size&&"text"===t.variant&&{padding:"8px 11px",fontSize:o.typography.pxToRem(15)},"small"===t.size&&"outlined"===t.variant&&{padding:"3px 9px",fontSize:o.typography.pxToRem(13)},"large"===t.size&&"outlined"===t.variant&&{padding:"7px 21px",fontSize:o.typography.pxToRem(15)},"small"===t.size&&"contained"===t.variant&&{padding:"4px 10px",fontSize:o.typography.pxToRem(13)},"large"===t.size&&"contained"===t.variant&&{padding:"8px 22px",fontSize:o.typography.pxToRem(15)},t.fullWidth&&{width:"100%"})}),(e=>{let{ownerState:o}=e;return o.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},["&.".concat(f.focusVisible)]:{boxShadow:"none"},"&:active":{boxShadow:"none"},["&.".concat(f.disabled)]:{boxShadow:"none"}}})),C=(0,d.Ay)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.startIcon,o["iconSize".concat((0,h.A)(t.size))]]}})((e=>{let{ownerState:o}=e;return(0,n.A)({display:"inherit",marginRight:8,marginLeft:-4},"small"===o.size&&{marginLeft:-2},A(o))})),k=(0,d.Ay)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.endIcon,o["iconSize".concat((0,h.A)(t.size))]]}})((e=>{let{ownerState:o}=e;return(0,n.A)({display:"inherit",marginRight:-4,marginLeft:8},"small"===o.size&&{marginRight:-2},A(o))})),R=r.forwardRef((function(e,o){const t=r.useContext(x),s=r.useContext(S),d=(0,l.A)(t,e),u=(0,p.A)({props:d,name:"MuiButton"}),{children:m,color:g="primary",component:v="button",className:f,disabled:A=!1,disableElevation:R=!1,disableFocusRipple:L=!1,endIcon:I,focusVisibleClassName:N,fullWidth:j=!1,size:B="medium",startIcon:E,type:M,variant:V="text"}=u,T=(0,a.A)(u,w),O=(0,n.A)({},u,{color:g,component:v,disabled:A,disableElevation:R,disableFocusRipple:L,fullWidth:j,size:B,type:M,variant:V}),P=(e=>{const{color:o,disableElevation:t,fullWidth:a,size:r,variant:i,classes:l}=e,s={root:["root",i,"".concat(i).concat((0,h.A)(o)),"size".concat((0,h.A)(r)),"".concat(i,"Size").concat((0,h.A)(r)),"color".concat((0,h.A)(o)),t&&"disableElevation",a&&"fullWidth"],label:["label"],startIcon:["icon","startIcon","iconSize".concat((0,h.A)(r))],endIcon:["icon","endIcon","iconSize".concat((0,h.A)(r))]},d=(0,c.A)(s,b,l);return(0,n.A)({},l,d)})(O),W=E&&(0,y.jsx)(C,{className:P.startIcon,ownerState:O,children:E}),D=I&&(0,y.jsx)(k,{className:P.endIcon,ownerState:O,children:I}),F=s||"";return(0,y.jsxs)(z,(0,n.A)({ownerState:O,className:(0,i.A)(t.className,P.root,f,F),component:v,disabled:A,focusRipple:!L,focusVisibleClassName:(0,i.A)(P.focusVisible,N),ref:o,type:M},T,{classes:P,children:[W,m,D]}))}))},17392:(e,o,t)=>{t.d(o,{A:()=>S});var a=t(98587),n=t(58168),r=t(65043),i=t(69292),l=t(68606),c=t(67266),s=t(34535),d=t(72876),u=t(75429),p=t(6803),m=t(57056),h=t(32400);function g(e){return(0,h.Ay)("MuiIconButton",e)}const v=(0,m.A)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var b=t(70579);const f=["edge","children","className","color","disabled","disableFocusRipple","size"],x=(0,s.Ay)(u.A,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,"default"!==t.color&&o["color".concat((0,p.A)(t.color))],t.edge&&o["edge".concat((0,p.A)(t.edge))],o["size".concat((0,p.A)(t.size))]]}})((e=>{let{theme:o,ownerState:t}=e;return(0,n.A)({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(o.vars||o).palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:o.vars?"rgba(".concat(o.vars.palette.action.activeChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,c.X4)(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"start"===t.edge&&{marginLeft:"small"===t.size?-3:-12},"end"===t.edge&&{marginRight:"small"===t.size?-3:-12})}),(e=>{let{theme:o,ownerState:t}=e;var a;const r=null==(a=(o.vars||o).palette)?void 0:a[t.color];return(0,n.A)({},"inherit"===t.color&&{color:"inherit"},"inherit"!==t.color&&"default"!==t.color&&(0,n.A)({color:null==r?void 0:r.main},!t.disableRipple&&{"&:hover":(0,n.A)({},r&&{backgroundColor:o.vars?"rgba(".concat(r.mainChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,c.X4)(r.main,o.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),"small"===t.size&&{padding:5,fontSize:o.typography.pxToRem(18)},"large"===t.size&&{padding:12,fontSize:o.typography.pxToRem(28)},{["&.".concat(v.disabled)]:{backgroundColor:"transparent",color:(o.vars||o).palette.action.disabled}})})),S=r.forwardRef((function(e,o){const t=(0,d.A)({props:e,name:"MuiIconButton"}),{edge:r=!1,children:c,className:s,color:u="default",disabled:m=!1,disableFocusRipple:h=!1,size:v="medium"}=t,S=(0,a.A)(t,f),y=(0,n.A)({},t,{edge:r,color:u,disabled:m,disableFocusRipple:h,size:v}),w=(e=>{const{classes:o,disabled:t,color:a,edge:n,size:r}=e,i={root:["root",t&&"disabled","default"!==a&&"color".concat((0,p.A)(a)),n&&"edge".concat((0,p.A)(n)),"size".concat((0,p.A)(r))]};return(0,l.A)(i,g,o)})(y);return(0,b.jsx)(x,(0,n.A)({className:(0,i.A)(w.root,s),centerRipple:!0,focusRipple:!h,disabled:m,ref:o},S,{ownerState:y,children:c}))}))},59662:(e,o,t)=>{t.d(o,{A:()=>x});var a=t(58168),n=t(65043),r=t(98587),i=t(69292),l=t(68606),c=t(6803),s=t(72876),d=t(34535),u=t(57056),p=t(32400);function m(e){return(0,p.Ay)("MuiSvgIcon",e)}(0,u.A)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var h=t(70579);const g=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],v=(0,d.Ay)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,"inherit"!==t.color&&o["color".concat((0,c.A)(t.color))],o["fontSize".concat((0,c.A)(t.fontSize))]]}})((e=>{let{theme:o,ownerState:t}=e;var a,n,r,i,l,c,s,d,u,p,m,h,g;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(a=o.transitions)||null==(n=a.create)?void 0:n.call(a,"fill",{duration:null==(r=o.transitions)||null==(r=r.duration)?void 0:r.shorter}),fontSize:{inherit:"inherit",small:(null==(i=o.typography)||null==(l=i.pxToRem)?void 0:l.call(i,20))||"1.25rem",medium:(null==(c=o.typography)||null==(s=c.pxToRem)?void 0:s.call(c,24))||"1.5rem",large:(null==(d=o.typography)||null==(u=d.pxToRem)?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:null!=(p=null==(m=(o.vars||o).palette)||null==(m=m[t.color])?void 0:m.main)?p:{action:null==(h=(o.vars||o).palette)||null==(h=h.action)?void 0:h.active,disabled:null==(g=(o.vars||o).palette)||null==(g=g.action)?void 0:g.disabled,inherit:void 0}[t.color]}})),b=n.forwardRef((function(e,o){const t=(0,s.A)({props:e,name:"MuiSvgIcon"}),{children:d,className:u,color:p="inherit",component:b="svg",fontSize:f="medium",htmlColor:x,inheritViewBox:S=!1,titleAccess:y,viewBox:w="0 0 24 24"}=t,A=(0,r.A)(t,g),z=n.isValidElement(d)&&"svg"===d.type,C=(0,a.A)({},t,{color:p,component:b,fontSize:f,instanceFontSize:e.fontSize,inheritViewBox:S,viewBox:w,hasSvgAsChild:z}),k={};S||(k.viewBox=w);const R=(e=>{const{color:o,fontSize:t,classes:a}=e,n={root:["root","inherit"!==o&&"color".concat((0,c.A)(o)),"fontSize".concat((0,c.A)(t))]};return(0,l.A)(n,m,a)})(C);return(0,h.jsxs)(v,(0,a.A)({as:b,className:(0,i.A)(R.root,u),focusable:"false",color:x,"aria-hidden":!y||void 0,role:y?"img":void 0,ref:o},k,A,z&&d.props,{ownerState:C,children:[z?d.props.children:d,y?(0,h.jsx)("title",{children:y}):null]}))}));b.muiName="SvgIcon";const f=b;function x(e,o){function t(t,n){return(0,h.jsx)(f,(0,a.A)({"data-testid":"".concat(o,"Icon"),ref:n},t,{children:e}))}return t.muiName=f.muiName,n.memo(n.forwardRef(t))}},21785:()=>{}}]);
//# sourceMappingURL=1103.dbcd4f6d.chunk.js.map