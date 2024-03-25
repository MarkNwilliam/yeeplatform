"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[3869],{63869:(e,t,i)=>{i.r(t),i.d(t,{default:()=>m});var n=i(65043),o=i(85865),s=i(79650),r=i(63336),c=i(71806),l=i(84882),d=i(28076),a=i(10039),h=i(73460),p=i(11906),u=i(90035),x=i(26600),A=i(35316),j=i(98533),w=i(88861),f=i(29347),b=i(30064),g=i.n(b),k=i(2253),y=i(70579);const m=()=>{const[e,t]=(0,n.useState)([]),[i,b]=(0,n.useState)(!1),[m,C]=(0,n.useState)(""),[v,S]=(0,n.useState)(""),D=async()=>{try{g().showLoading();const e=k.j2.currentUser.uid;console.log("here is the author id"+e);const i=await fetch("https://yeeplatformbackend.azurewebsites.net/getAllBooks/".concat(e)),n=await i.json();t(n),g().close()}catch(e){g().fire({icon:"error",title:"Oops...",text:"Something went wrong while fetching books!"})}};(0,n.useEffect)((()=>{D()}),[]);const B=()=>{b(!1)},E=async e=>{try{g().showLoading();if(200!==(await fetch("https://yeeplatformbackend.azurewebsites.net/deleteBook/".concat(e),{method:"DELETE"})).status)throw new Error("Failed to delete the book.");t((t=>t.filter((t=>t.id!==e)))),g().close()}catch(i){g().fire({icon:"error",title:"Oops...",text:"Something went wrong while deleting the book!"})}};return(0,y.jsxs)("div",{children:[(0,y.jsx)(o.A,{variant:"h4",component:"h2",children:"My Books"}),(0,y.jsxs)(s.A,{component:r.A,children:[(0,y.jsxs)(c.A,{children:[(0,y.jsx)(l.A,{children:(0,y.jsxs)(d.A,{children:[(0,y.jsx)(a.A,{children:"Title"}),(0,y.jsx)(a.A,{children:"Subtitle"}),(0,y.jsx)(a.A,{children:"Description"}),(0,y.jsx)(a.A,{children:"Publication Date"}),(0,y.jsx)(a.A,{children:"Actions"})]})}),(0,y.jsx)(h.A,{children:e.map((e=>(0,y.jsxs)(d.A,{children:[(0,y.jsx)(a.A,{children:e.title}),(0,y.jsx)(a.A,{children:e.subtitle}),(0,y.jsx)(a.A,{children:e.description}),(0,y.jsx)(a.A,{children:e.publishedDate}),(0,y.jsxs)(a.A,{children:[(0,y.jsx)(p.A,{onClick:()=>{return t=e.description,i=e._id,C(t),S(i),void b(!0);var t,i},children:"Edit"}),(0,y.jsx)(p.A,{onClick:()=>(e=>{g().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((async t=>{t.isConfirmed&&(await E(e._id),D(),g().fire("Deleted!","Your book has been deleted.","success"))}))})(e),children:"Delete"})]})]},e._id)))})]}),0===e.length&&(0,y.jsx)(o.A,{variant:"h6",style:{textAlign:"center",padding:"20px",color:"grey"},children:"No data available."})]}),(0,y.jsxs)(u.A,{open:i,onClose:B,children:[(0,y.jsx)(x.A,{children:"Edit Book Description"}),(0,y.jsxs)(A.A,{children:[(0,y.jsx)(j.A,{children:"Please edit the description of the selected book."}),(0,y.jsx)(w.A,{autoFocus:!0,margin:"dense",id:"description",label:"Description",type:"text",fullWidth:!0,value:m,onChange:e=>C(e.target.value)})]}),(0,y.jsxs)(f.A,{children:[(0,y.jsx)(p.A,{onClick:B,children:"Cancel"}),(0,y.jsx)(p.A,{onClick:async()=>{try{g().showLoading(),console.log("Here is book id "+v);if(200!==(await fetch("https://yeeplatformbackend.azurewebsites.net/updateDescription",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({bookId:v,description:m})})).status)throw new Error("Failed to update the description.");t((e=>e.map((e=>e.id===v?{...e,description:m}:e)))),b(!1),g().close()}catch(e){g().fire({icon:"error",title:"Oops...",text:"Something went wrong while updating the description!"})}},children:"Save"})]})]})]})}}}]);
//# sourceMappingURL=3869.c71e97c7.chunk.js.map