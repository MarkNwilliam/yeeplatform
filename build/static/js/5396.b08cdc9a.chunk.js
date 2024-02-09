"use strict";(self.webpackChunkyeeplatform=self.webpackChunkyeeplatform||[]).push([[5396],{55396:(e,t,n)=>{n.d(t,{Z:()=>Ye});var o=n(87462),r=n(63366),i=n(72791),a=n(6117),s=n(62876),f=n(84913);function c(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function p(e){return e instanceof c(e).Element||e instanceof Element}function l(e){return e instanceof c(e).HTMLElement||e instanceof HTMLElement}function u(e){return"undefined"!==typeof ShadowRoot&&(e instanceof c(e).ShadowRoot||e instanceof ShadowRoot)}var d=Math.max,m=Math.min,h=Math.round;function v(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function y(){return!/^((?!chrome|android).)*safari/i.test(v())}function b(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var o=e.getBoundingClientRect(),r=1,i=1;t&&l(e)&&(r=e.offsetWidth>0&&h(o.width)/e.offsetWidth||1,i=e.offsetHeight>0&&h(o.height)/e.offsetHeight||1);var a=(p(e)?c(e):window).visualViewport,s=!y()&&n,f=(o.left+(s&&a?a.offsetLeft:0))/r,u=(o.top+(s&&a?a.offsetTop:0))/i,d=o.width/r,m=o.height/i;return{width:d,height:m,top:u,right:f+d,bottom:u+m,left:f,x:f,y:u}}function g(e){var t=c(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function x(e){return e?(e.nodeName||"").toLowerCase():null}function w(e){return((p(e)?e.ownerDocument:e.document)||window.document).documentElement}function O(e){return b(w(e)).left+g(e).scrollLeft}function P(e){return c(e).getComputedStyle(e)}function E(e){var t=P(e),n=t.overflow,o=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+r+o)}function j(e,t,n){void 0===n&&(n=!1);var o=l(t),r=l(t)&&function(e){var t=e.getBoundingClientRect(),n=h(t.width)/e.offsetWidth||1,o=h(t.height)/e.offsetHeight||1;return 1!==n||1!==o}(t),i=w(t),a=b(e,r,n),s={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(o||!o&&!n)&&(("body"!==x(t)||E(i))&&(s=function(e){return e!==c(e)&&l(e)?{scrollLeft:(t=e).scrollLeft,scrollTop:t.scrollTop}:g(e);var t}(t)),l(t)?((f=b(t,!0)).x+=t.clientLeft,f.y+=t.clientTop):i&&(f.x=O(i))),{x:a.left+s.scrollLeft-f.x,y:a.top+s.scrollTop-f.y,width:a.width,height:a.height}}function D(e){var t=b(e),n=e.offsetWidth,o=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:o}}function R(e){return"html"===x(e)?e:e.assignedSlot||e.parentNode||(u(e)?e.host:null)||w(e)}function k(e){return["html","body","#document"].indexOf(x(e))>=0?e.ownerDocument.body:l(e)&&E(e)?e:k(R(e))}function A(e,t){var n;void 0===t&&(t=[]);var o=k(e),r=o===(null==(n=e.ownerDocument)?void 0:n.body),i=c(o),a=r?[i].concat(i.visualViewport||[],E(o)?o:[]):o,s=t.concat(a);return r?s:s.concat(A(R(a)))}function M(e){return["table","td","th"].indexOf(x(e))>=0}function L(e){return l(e)&&"fixed"!==P(e).position?e.offsetParent:null}function T(e){for(var t=c(e),n=L(e);n&&M(n)&&"static"===P(n).position;)n=L(n);return n&&("html"===x(n)||"body"===x(n)&&"static"===P(n).position)?t:n||function(e){var t=/firefox/i.test(v());if(/Trident/i.test(v())&&l(e)&&"fixed"===P(e).position)return null;var n=R(e);for(u(n)&&(n=n.host);l(n)&&["html","body"].indexOf(x(n))<0;){var o=P(n);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n;n=n.parentNode}return null}(e)||t}var W="top",Z="bottom",B="right",H="left",S="auto",C=[W,Z,B,H],V="start",q="end",N="clippingParents",I="viewport",U="popper",F="reference",_=C.reduce((function(e,t){return e.concat([t+"-"+V,t+"-"+q])}),[]),z=[].concat(C,[S]).reduce((function(e,t){return e.concat([t,t+"-"+V,t+"-"+q])}),[]),X=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function Y(e){var t=new Map,n=new Set,o=[];function r(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var o=t.get(e);o&&r(o)}})),o.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||r(e)})),o}function G(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var J={placement:"bottom",modifiers:[],strategy:"absolute"};function K(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function Q(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,o=void 0===n?[]:n,r=t.defaultOptions,i=void 0===r?J:r;return function(e,t,n){void 0===n&&(n=i);var r={placement:"bottom",orderedModifiers:[],options:Object.assign({},J,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],s=!1,f={state:r,setOptions:function(n){var s="function"===typeof n?n(r.options):n;c(),r.options=Object.assign({},i,r.options,s),r.scrollParents={reference:p(e)?A(e):e.contextElement?A(e.contextElement):[],popper:A(t)};var l=function(e){var t=Y(e);return X.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(o,r.options.modifiers)));return r.orderedModifiers=l.filter((function(e){return e.enabled})),r.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,o=void 0===n?{}:n,i=e.effect;if("function"===typeof i){var s=i({state:r,name:t,instance:f,options:o}),c=function(){};a.push(s||c)}})),f.update()},forceUpdate:function(){if(!s){var e=r.elements,t=e.reference,n=e.popper;if(K(t,n)){r.rects={reference:j(t,T(n),"fixed"===r.options.strategy),popper:D(n)},r.reset=!1,r.placement=r.options.placement,r.orderedModifiers.forEach((function(e){return r.modifiersData[e.name]=Object.assign({},e.data)}));for(var o=0;o<r.orderedModifiers.length;o++)if(!0!==r.reset){var i=r.orderedModifiers[o],a=i.fn,c=i.options,p=void 0===c?{}:c,l=i.name;"function"===typeof a&&(r=a({state:r,options:p,name:l,instance:f})||r)}else r.reset=!1,o=-1}}},update:G((function(){return new Promise((function(e){f.forceUpdate(),e(r)}))})),destroy:function(){c(),s=!0}};if(!K(e,t))return f;function c(){a.forEach((function(e){return e()})),a=[]}return f.setOptions(n).then((function(e){!s&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var $={passive:!0};function ee(e){return e.split("-")[0]}function te(e){return e.split("-")[1]}function ne(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function oe(e){var t,n=e.reference,o=e.element,r=e.placement,i=r?ee(r):null,a=r?te(r):null,s=n.x+n.width/2-o.width/2,f=n.y+n.height/2-o.height/2;switch(i){case W:t={x:s,y:n.y-o.height};break;case Z:t={x:s,y:n.y+n.height};break;case B:t={x:n.x+n.width,y:f};break;case H:t={x:n.x-o.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?ne(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case V:t[c]=t[c]-(n[p]/2-o[p]/2);break;case q:t[c]=t[c]+(n[p]/2-o[p]/2)}}return t}var re={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ie(e){var t,n=e.popper,o=e.popperRect,r=e.placement,i=e.variation,a=e.offsets,s=e.position,f=e.gpuAcceleration,p=e.adaptive,l=e.roundOffsets,u=e.isFixed,d=a.x,m=void 0===d?0:d,v=a.y,y=void 0===v?0:v,b="function"===typeof l?l({x:m,y:y}):{x:m,y:y};m=b.x,y=b.y;var g=a.hasOwnProperty("x"),x=a.hasOwnProperty("y"),O=H,E=W,j=window;if(p){var D=T(n),R="clientHeight",k="clientWidth";if(D===c(n)&&"static"!==P(D=w(n)).position&&"absolute"===s&&(R="scrollHeight",k="scrollWidth"),r===W||(r===H||r===B)&&i===q)E=Z,y-=(u&&D===j&&j.visualViewport?j.visualViewport.height:D[R])-o.height,y*=f?1:-1;if(r===H||(r===W||r===Z)&&i===q)O=B,m-=(u&&D===j&&j.visualViewport?j.visualViewport.width:D[k])-o.width,m*=f?1:-1}var A,M=Object.assign({position:s},p&&re),L=!0===l?function(e,t){var n=e.x,o=e.y,r=t.devicePixelRatio||1;return{x:h(n*r)/r||0,y:h(o*r)/r||0}}({x:m,y:y},c(n)):{x:m,y:y};return m=L.x,y=L.y,f?Object.assign({},M,((A={})[E]=x?"0":"",A[O]=g?"0":"",A.transform=(j.devicePixelRatio||1)<=1?"translate("+m+"px, "+y+"px)":"translate3d("+m+"px, "+y+"px, 0)",A)):Object.assign({},M,((t={})[E]=x?y+"px":"",t[O]=g?m+"px":"",t.transform="",t))}const ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.offset,i=void 0===r?[0,0]:r,a=z.reduce((function(e,n){return e[n]=function(e,t,n){var o=ee(e),r=[H,W].indexOf(o)>=0?-1:1,i="function"===typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*r,[H,B].indexOf(o)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[o]=a}};var se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function le(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&u(n)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function ue(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function de(e,t,n){return t===I?ue(function(e,t){var n=c(e),o=w(e),r=n.visualViewport,i=o.clientWidth,a=o.clientHeight,s=0,f=0;if(r){i=r.width,a=r.height;var p=y();(p||!p&&"fixed"===t)&&(s=r.offsetLeft,f=r.offsetTop)}return{width:i,height:a,x:s+O(e),y:f}}(e,n)):p(t)?function(e,t){var n=b(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):ue(function(e){var t,n=w(e),o=g(e),r=null==(t=e.ownerDocument)?void 0:t.body,i=d(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),a=d(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),s=-o.scrollLeft+O(e),f=-o.scrollTop;return"rtl"===P(r||n).direction&&(s+=d(n.clientWidth,r?r.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}(w(e)))}function me(e,t,n,o){var r="clippingParents"===t?function(e){var t=A(R(e)),n=["absolute","fixed"].indexOf(P(e).position)>=0&&l(e)?T(e):e;return p(n)?t.filter((function(e){return p(e)&&le(e,n)&&"body"!==x(e)})):[]}(e):[].concat(t),i=[].concat(r,[n]),a=i[0],s=i.reduce((function(t,n){var r=de(e,n,o);return t.top=d(r.top,t.top),t.right=m(r.right,t.right),t.bottom=m(r.bottom,t.bottom),t.left=d(r.left,t.left),t}),de(e,a,o));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function he(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function ve(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function ye(e,t){void 0===t&&(t={});var n=t,o=n.placement,r=void 0===o?e.placement:o,i=n.strategy,a=void 0===i?e.strategy:i,s=n.boundary,f=void 0===s?N:s,c=n.rootBoundary,l=void 0===c?I:c,u=n.elementContext,d=void 0===u?U:u,m=n.altBoundary,h=void 0!==m&&m,v=n.padding,y=void 0===v?0:v,g=he("number"!==typeof y?y:ve(y,C)),x=d===U?F:U,O=e.rects.popper,P=e.elements[h?x:d],E=me(p(P)?P:P.contextElement||w(e.elements.popper),f,l,a),j=b(e.elements.reference),D=oe({reference:j,element:O,strategy:"absolute",placement:r}),R=ue(Object.assign({},O,D)),k=d===U?R:j,A={top:E.top-k.top+g.top,bottom:k.bottom-E.bottom+g.bottom,left:E.left-k.left+g.left,right:k.right-E.right+g.right},M=e.modifiersData.offset;if(d===U&&M){var L=M[r];Object.keys(A).forEach((function(e){var t=[B,Z].indexOf(e)>=0?1:-1,n=[W,Z].indexOf(e)>=0?"y":"x";A[e]+=L[n]*t}))}return A}function be(e,t,n){return d(e,m(t,n))}const ge={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.mainAxis,i=void 0===r||r,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,c=n.rootBoundary,p=n.altBoundary,l=n.padding,u=n.tether,h=void 0===u||u,v=n.tetherOffset,y=void 0===v?0:v,b=ye(t,{boundary:f,rootBoundary:c,padding:l,altBoundary:p}),g=ee(t.placement),x=te(t.placement),w=!x,O=ne(g),P="x"===O?"y":"x",E=t.modifiersData.popperOffsets,j=t.rects.reference,R=t.rects.popper,k="function"===typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,A="number"===typeof k?{mainAxis:k,altAxis:k}:Object.assign({mainAxis:0,altAxis:0},k),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,L={x:0,y:0};if(E){if(i){var S,C="y"===O?W:H,q="y"===O?Z:B,N="y"===O?"height":"width",I=E[O],U=I+b[C],F=I-b[q],_=h?-R[N]/2:0,z=x===V?j[N]:R[N],X=x===V?-R[N]:-j[N],Y=t.elements.arrow,G=h&&Y?D(Y):{width:0,height:0},J=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},K=J[C],Q=J[q],$=be(0,j[N],G[N]),oe=w?j[N]/2-_-$-K-A.mainAxis:z-$-K-A.mainAxis,re=w?-j[N]/2+_+$+Q+A.mainAxis:X+$+Q+A.mainAxis,ie=t.elements.arrow&&T(t.elements.arrow),ae=ie?"y"===O?ie.clientTop||0:ie.clientLeft||0:0,se=null!=(S=null==M?void 0:M[O])?S:0,fe=I+re-se,ce=be(h?m(U,I+oe-se-ae):U,I,h?d(F,fe):F);E[O]=ce,L[O]=ce-I}if(s){var pe,le="x"===O?W:H,ue="x"===O?Z:B,de=E[P],me="y"===P?"height":"width",he=de+b[le],ve=de-b[ue],ge=-1!==[W,H].indexOf(g),xe=null!=(pe=null==M?void 0:M[P])?pe:0,we=ge?he:de-j[me]-R[me]-xe+A.altAxis,Oe=ge?de+j[me]+R[me]-xe-A.altAxis:ve,Pe=h&&ge?function(e,t,n){var o=be(e,t,n);return o>n?n:o}(we,de,Oe):be(h?we:he,de,h?Oe:ve);E[P]=Pe,L[P]=Pe-de}t.modifiersData[o]=L}},requiresIfExists:["offset"]};const xe={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,o=e.name,r=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=ee(n.placement),f=ne(s),c=[H,B].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return he("number"!==typeof(e="function"===typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:ve(e,C))}(r.padding,n),l=D(i),u="y"===f?W:H,d="y"===f?Z:B,m=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],h=a[f]-n.rects.reference[f],v=T(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=m/2-h/2,g=p[u],x=y-l[c]-p[d],w=y/2-l[c]/2+b,O=be(g,w,x),P=f;n.modifiersData[o]=((t={})[P]=O,t.centerOffset=O-w,t)}},effect:function(e){var t=e.state,n=e.options.element,o=void 0===n?"[data-popper-arrow]":n;null!=o&&("string"!==typeof o||(o=t.elements.popper.querySelector(o)))&&le(t.elements.popper,o)&&(t.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function we(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Oe(e){return[W,B,Z,H].some((function(t){return e[t]>=0}))}var Pe=Q({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,o=e.options,r=o.scroll,i=void 0===r||r,a=o.resize,s=void 0===a||a,f=c(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&p.forEach((function(e){e.addEventListener("scroll",n.update,$)})),s&&f.addEventListener("resize",n.update,$),function(){i&&p.forEach((function(e){e.removeEventListener("scroll",n.update,$)})),s&&f.removeEventListener("resize",n.update,$)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=oe({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,o=n.gpuAcceleration,r=void 0===o||o,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:ee(t.placement),variation:te(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ie(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ie(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},r=t.elements[e];l(r)&&x(r)&&(Object.assign(r.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],r=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});l(o)&&x(o)&&(Object.assign(o.style,i),Object.keys(r).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]},ae,{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var r=n.mainAxis,i=void 0===r||r,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,l=n.rootBoundary,u=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,y=ee(v),b=f||(y===v||!m?[fe(v)]:function(e){if(ee(e)===S)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),g=[v].concat(b).reduce((function(e,n){return e.concat(ee(n)===S?function(e,t){void 0===t&&(t={});var n=t,o=n.placement,r=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?z:f,p=te(o),l=p?s?_:_.filter((function(e){return te(e)===p})):C,u=l.filter((function(e){return c.indexOf(e)>=0}));0===u.length&&(u=l);var d=u.reduce((function(t,n){return t[n]=ye(e,{placement:n,boundary:r,rootBoundary:i,padding:a})[ee(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}(t,{placement:n,boundary:p,rootBoundary:l,padding:c,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),x=t.rects.reference,w=t.rects.popper,O=new Map,P=!0,E=g[0],j=0;j<g.length;j++){var D=g[j],R=ee(D),k=te(D)===V,A=[W,Z].indexOf(R)>=0,M=A?"width":"height",L=ye(t,{placement:D,boundary:p,rootBoundary:l,altBoundary:u,padding:c}),T=A?k?B:H:k?Z:W;x[M]>w[M]&&(T=fe(T));var q=fe(T),N=[];if(i&&N.push(L[R]<=0),s&&N.push(L[T]<=0,L[q]<=0),N.every((function(e){return e}))){E=D,P=!1;break}O.set(D,N)}if(P)for(var I=function(e){var t=g.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},U=m?3:1;U>0;U--){if("break"===I(U))break}t.placement!==E&&(t.modifiersData[o]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},ge,xe,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,o=t.rects.reference,r=t.rects.popper,i=t.modifiersData.preventOverflow,a=ye(t,{elementContext:"reference"}),s=ye(t,{altBoundary:!0}),f=we(a,o),c=we(s,r,i),p=Oe(f),l=Oe(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":l})}}]}),Ee=n(94419),je=n(96174),De=n(21217);const Re="base";function ke(e,t){const n=De._v[t];return n?(o=n,"".concat(Re,"--").concat(o)):function(e,t){return"".concat(Re,"-").concat(e,"-").concat(t)}(e,t);var o}const Ae="Popper";function Me(e){return ke(Ae,e)}!function(e,t){const n={};t.forEach((t=>{n[t]=ke(e,t)}))}(Ae,["root"]);var Le=n(69543),Te=n(80184);const We={disableDefaultClasses:!1},Ze=i.createContext(We);const Be=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],He=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Se(e){return"function"===typeof e?e():e}function Ce(e){return void 0!==e.nodeType}const Ve=()=>(0,Ee.Z)({root:["root"]},function(e){const{disableDefaultClasses:t}=i.useContext(Ze);return n=>t?"":e(n)}(Me)),qe={},Ne=i.forwardRef((function(e,t){var n;const{anchorEl:f,children:c,direction:p,disablePortal:l,modifiers:u,open:d,placement:m,popperOptions:h,popperRef:v,slotProps:y={},slots:b={},TransitionProps:g}=e,x=(0,r.Z)(e,Be),w=i.useRef(null),O=(0,a.Z)(w,t),P=i.useRef(null),E=(0,a.Z)(P,v),j=i.useRef(E);(0,s.Z)((()=>{j.current=E}),[E]),i.useImperativeHandle(v,(()=>P.current),[]);const D=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,p),[R,k]=i.useState(D),[A,M]=i.useState(Se(f));i.useEffect((()=>{P.current&&P.current.forceUpdate()})),i.useEffect((()=>{f&&M(Se(f))}),[f]),(0,s.Z)((()=>{if(!A||!d)return;let e=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:e=>{let{state:t}=e;k(t.placement)}}];null!=u&&(e=e.concat(u)),h&&null!=h.modifiers&&(e=e.concat(h.modifiers));const t=Pe(A,w.current,(0,o.Z)({placement:D},h,{modifiers:e}));return j.current(t),()=>{t.destroy(),j.current(null)}}),[A,l,u,d,h,D]);const L={placement:R};null!==g&&(L.TransitionProps=g);const T=Ve(),W=null!=(n=b.root)?n:"div",Z=(0,Le.y)({elementType:W,externalSlotProps:y.root,externalForwardedProps:x,additionalProps:{role:"tooltip",ref:O},ownerState:e,className:T.root});return(0,Te.jsx)(W,(0,o.Z)({},Z,{children:"function"===typeof c?c(L):c}))})),Ie=i.forwardRef((function(e,t){const{anchorEl:n,children:a,container:s,direction:c="ltr",disablePortal:p=!1,keepMounted:l=!1,modifiers:u,open:d,placement:m="bottom",popperOptions:h=qe,popperRef:v,style:y,transition:b=!1,slotProps:g={},slots:x={}}=e,w=(0,r.Z)(e,He),[O,P]=i.useState(!0);if(!l&&!d&&(!b||O))return null;let E;if(s)E=s;else if(n){const e=Se(n);E=e&&Ce(e)?(0,f.Z)(e).body:(0,f.Z)(null).body}const j=d||!l||b&&!O?void 0:"none",D=b?{in:d,onEnter:()=>{P(!1)},onExited:()=>{P(!0)}}:void 0;return(0,Te.jsx)(je.h,{disablePortal:p,container:E,children:(0,Te.jsx)(Ne,(0,o.Z)({anchorEl:n,direction:c,disablePortal:p,modifiers:u,ref:t,open:b?!O:d,placement:m,popperOptions:h,popperRef:v,slotProps:g,slots:x},w,{style:(0,o.Z)({position:"fixed",top:0,left:0,display:j},y),TransitionProps:D,children:a}))})}));var Ue=n(69120),Fe=n(66934),_e=n(31402);const ze=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Xe=(0,Fe.ZP)(Ie,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ye=i.forwardRef((function(e,t){var n;const i=(0,Ue.Z)(),a=(0,_e.Z)({props:e,name:"MuiPopper"}),{anchorEl:s,component:f,components:c,componentsProps:p,container:l,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:b,transition:g,slots:x,slotProps:w}=a,O=(0,r.Z)(a,ze),P=null!=(n=null==x?void 0:x.root)?n:null==c?void 0:c.Root,E=(0,o.Z)({anchorEl:s,container:l,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:b,transition:g},O);return(0,Te.jsx)(Xe,(0,o.Z)({as:f,direction:null==i?void 0:i.direction,slots:{root:P},slotProps:null!=w?w:p},E,{ref:t}))}))}}]);
//# sourceMappingURL=5396.b08cdc9a.chunk.js.map