"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[5099],{31365:(t,e,n)=>{n.r(e),n.d(e,{default:()=>r});n(72791);var s=n(11087),i=n(87337),a=(n(77632),n(80184));function o(){const t=t=>{t.currentTarget.getAttribute("href")||t.preventDefault()};return(0,a.jsx)(i.Z,{children:[{id:1,src:"/images/yee3.jpg",alt:"",caption:"",description:"",link:"https://example.com/page1"},{id:2,src:"/images/yee2.jpg",alt:"",caption:"",description:"",link:""},{id:3,src:"/images/yee1.png",alt:"",caption:"",description:"",link:"https://example.com/page3"}].map((e=>(0,a.jsxs)(i.Z.Item,{interval:1500,children:[e.link?(0,a.jsx)("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",children:(0,a.jsx)("img",{className:"d-block w-100",src:e.src,alt:e.alt,style:{height:"50vh",maxHeight:"500px",objectFit:"cover"},onClick:t})}):(0,a.jsx)("img",{className:"d-block w-100",src:e.src,alt:e.alt,style:{height:"50vh",maxHeight:"500px",objectFit:"cover"},onClick:t}),(0,a.jsxs)(i.Z.Caption,{className:"d-none d-md-block",children:[(0,a.jsx)("h3",{style:{fontSize:"1.5em"},children:e.caption}),(0,a.jsx)("p",{children:e.description})]})]},e.id)))})}function r(){return(0,a.jsxs)("div",{children:[(0,a.jsx)(o,{}),(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4",children:[{name:"Ebooks and Magazines",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/stories.jpg",description:"Ordinary ebooks and magazines \ud83d\udcda",id:1,link:"/ebooks"},{name:"Audio books",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/life.jpg",description:"Just audiobooks \ud83c\udfa7",id:2,link:"/audiobooks"},{name:"Audio chapters",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/roma.jpg",description:"Chapters in audio form \ud83c\udfb5",id:3,link:"/audiochapters"},{name:"Chapters",pic:"https://assets-hfbubwfaacbch3e0.z02.azurefd.net/assets/images/others.jpg",description:"Chapters written to the whole book \ud83d\udcd6",id:4,link:"/chapters"}].map((t=>(0,a.jsx)(s.rU,{to:t.link,className:"no-underline",children:(0,a.jsxs)("div",{className:"bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer",children:[(0,a.jsx)("img",{src:t.pic,alt:t.name,className:"w-full h-36 object-cover"}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsx)("h5",{className:"text-lg font-semibold mb-2",children:t.name}),(0,a.jsx)("p",{className:"text-sm text-gray-600",children:t.description})]})]})},t.id)))})]})}},26752:(t,e,n)=>{n.d(e,{ZP:()=>x});var s=n(63366),i=n(94578),a=n(72791),o=n(54164);const r=!1;var l=n(95545),c="unmounted",p="exited",u="entering",d="entered",h="exiting",f=function(t){function e(e,n){var s;s=t.call(this,e,n)||this;var i,a=n&&!n.isMounting?e.enter:e.appear;return s.appearStatus=null,e.in?a?(i=p,s.appearStatus=u):i=d:i=e.unmountOnExit||e.mountOnEnter?c:p,s.state={status:i},s.nextCallback=null,s}(0,i.Z)(e,t),e.getDerivedStateFromProps=function(t,e){return t.in&&e.status===c?{status:p}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(t){var e=null;if(t!==this.props){var n=this.state.status;this.props.in?n!==u&&n!==d&&(e=u):n!==u&&n!==d||(e=h)}this.updateStatus(!1,e)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var t,e,n,s=this.props.timeout;return t=e=n=s,null!=s&&"number"!==typeof s&&(t=s.exit,e=s.enter,n=void 0!==s.appear?s.appear:e),{exit:t,enter:e,appear:n}},n.updateStatus=function(t,e){if(void 0===t&&(t=!1),null!==e)if(this.cancelNextCallback(),e===u){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:o.findDOMNode(this);n&&function(t){t.scrollTop}(n)}this.performEnter(t)}else this.performExit();else this.props.unmountOnExit&&this.state.status===p&&this.setState({status:c})},n.performEnter=function(t){var e=this,n=this.props.enter,s=this.context?this.context.isMounting:t,i=this.props.nodeRef?[s]:[o.findDOMNode(this),s],a=i[0],l=i[1],c=this.getTimeouts(),p=s?c.appear:c.enter;!t&&!n||r?this.safeSetState({status:d},(function(){e.props.onEntered(a)})):(this.props.onEnter(a,l),this.safeSetState({status:u},(function(){e.props.onEntering(a,l),e.onTransitionEnd(p,(function(){e.safeSetState({status:d},(function(){e.props.onEntered(a,l)}))}))})))},n.performExit=function(){var t=this,e=this.props.exit,n=this.getTimeouts(),s=this.props.nodeRef?void 0:o.findDOMNode(this);e&&!r?(this.props.onExit(s),this.safeSetState({status:h},(function(){t.props.onExiting(s),t.onTransitionEnd(n.exit,(function(){t.safeSetState({status:p},(function(){t.props.onExited(s)}))}))}))):this.safeSetState({status:p},(function(){t.props.onExited(s)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(t,e){e=this.setNextCallback(e),this.setState(t,e)},n.setNextCallback=function(t){var e=this,n=!0;return this.nextCallback=function(s){n&&(n=!1,e.nextCallback=null,t(s))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(t,e){this.setNextCallback(e);var n=this.props.nodeRef?this.props.nodeRef.current:o.findDOMNode(this),s=null==t&&!this.props.addEndListener;if(n&&!s){if(this.props.addEndListener){var i=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],a=i[0],r=i[1];this.props.addEndListener(a,r)}null!=t&&setTimeout(this.nextCallback,t)}else setTimeout(this.nextCallback,0)},n.render=function(){var t=this.state.status;if(t===c)return null;var e=this.props,n=e.children,i=(e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef,(0,s.Z)(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return a.createElement(l.Z.Provider,{value:null},"function"===typeof n?n(t,i):a.cloneElement(a.Children.only(n),i))},e}(a.Component);function m(){}f.contextType=l.Z,f.propTypes={},f.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:m,onEntering:m,onEntered:m,onExit:m,onExiting:m,onExited:m},f.UNMOUNTED=c,f.EXITED=p,f.ENTERING=u,f.ENTERED=d,f.EXITING=h;const x=f}}]);
//# sourceMappingURL=5099.7c495b81.chunk.js.map