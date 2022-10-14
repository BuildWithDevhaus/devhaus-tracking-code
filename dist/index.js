"use strict";(()=>{var $=Object.create;var V=Object.defineProperty,J=Object.defineProperties,K=Object.getOwnPropertyDescriptor,W=Object.getOwnPropertyDescriptors,X=Object.getOwnPropertyNames,D=Object.getOwnPropertySymbols,Z=Object.getPrototypeOf,G=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var R=(e,t,i)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,z=(e,t)=>{for(var i in t||(t={}))G.call(t,i)&&R(e,i,t[i]);if(D)for(var i of D(t))q.call(t,i)&&R(e,i,t[i]);return e},B=(e,t)=>J(e,W(t));var ee=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var te=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of X(t))!G.call(e,n)&&n!==i&&V(e,n,{get:()=>t[n],enumerable:!(r=K(t,n))||r.enumerable});return e};var ie=(e,t,i)=>(i=e!=null?$(Z(e)):{},te(t||!e||!e.__esModule?V(i,"default",{value:e,enumerable:!0}):i,e));var F=ee(A=>{"use strict";A.parse=ne;A.serialize=ae;var re=Object.prototype.toString,x=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function ne(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var i={},r=t||{},n=r.decode||oe,u=0;u<e.length;){var a=e.indexOf("=",u);if(a===-1)break;var l=e.indexOf(";",u);if(l===-1)l=e.length;else if(l<a){u=e.lastIndexOf(";",a-1)+1;continue}var d=e.slice(u,a).trim();if(i[d]===void 0){var o=e.slice(a+1,l).trim();o.charCodeAt(0)===34&&(o=o.slice(1,-1)),i[d]=ue(o,n)}u=l+1}return i}function ae(e,t,i){var r=i||{},n=r.encode||se;if(typeof n!="function")throw new TypeError("option encode is invalid");if(!x.test(e))throw new TypeError("argument name is invalid");var u=n(t);if(u&&!x.test(u))throw new TypeError("argument val is invalid");var a=e+"="+u;if(r.maxAge!=null){var l=r.maxAge-0;if(isNaN(l)||!isFinite(l))throw new TypeError("option maxAge is invalid");a+="; Max-Age="+Math.floor(l)}if(r.domain){if(!x.test(r.domain))throw new TypeError("option domain is invalid");a+="; Domain="+r.domain}if(r.path){if(!x.test(r.path))throw new TypeError("option path is invalid");a+="; Path="+r.path}if(r.expires){var d=r.expires;if(!ce(d)||isNaN(d.valueOf()))throw new TypeError("option expires is invalid");a+="; Expires="+d.toUTCString()}if(r.httpOnly&&(a+="; HttpOnly"),r.secure&&(a+="; Secure"),r.priority){var o=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(o){case"low":a+="; Priority=Low";break;case"medium":a+="; Priority=Medium";break;case"high":a+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var s=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(s){case!0:a+="; SameSite=Strict";break;case"lax":a+="; SameSite=Lax";break;case"strict":a+="; SameSite=Strict";break;case"none":a+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return a}function oe(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function se(e){return encodeURIComponent(e)}function ce(e){return re.call(e)==="[object Date]"||e instanceof Date}function ue(e,t){try{return t(e)}catch(i){return e}}});var h=(e="")=>/.+:.+/g.test(e)?e.substring(0,e.search(":")):e;var y=(e,t="",i=null,r)=>{var n,u,a;if(t==="path")return window.location.pathname;if(t==="url")return window.location.href.split("?")[0];if(/.+:.+/g.test(t)){let l=t.substring(0,t.search(":")),d=t.substring(t.search(":")+1,t.length);return y(e,l,d,r)}if(t)switch(i){case"innerHTML":return e==null?void 0:e.innerHTML;case"innerHTML-parseInt":return parseInt(e.innerHTML);case"url":return window.location.href.split("?")[0];case"boolean:true":return!0;case"boolean:false":return!1;case"grabPageview":let l=r.find(s=>{var m;return((m=s==null?void 0:s.dataset)==null?void 0:m.pageviewPropertyName)===t}),d=(u=(n=l==null?void 0:l.dataset)==null?void 0:n.pageviewPropertyValue)!=null?u:"innerHTML";return y(l,t,d,r);case"grabAHref":let o=e==null?void 0:e.getAttribute("href");return o!=null&&o.includes("?")&&(o=o==null?void 0:o.split("?")[0]),(a=o!=null?o:e==null?void 0:e.innerHTML)!=null?a:"";default:return i}};var N=ie(F(),1);function b(e=""){let t=window.location.search,i=new URLSearchParams(t),r=i==null?void 0:i.get(e);if(!r){let u=N.default.parse(document.cookie)[e];return u||(e==="utm_source"?"direct":null)}if(r)return document.cookie=N.default.serialize(e,r,{path:"/",maxAge:60*60*24*7}),r}function C(e="",t={}){var r;let i=B(z({},t),{metadata:{utm_source:b("utm_source"),utm_medium:b("utm_medium"),utm_campaign:b("utm_campaign")}});window!=null&&window.analytics&&((r=window==null?void 0:window.analytics)==null||r.track(e,i))}function _(e={}){window.analytics&&window.analytics.identify(e)}function j(){let e=document.querySelectorAll("[data-segment-event]"),t=document.querySelectorAll("[data-pageview-property-name]"),i=Array.from(t);e.forEach(r=>{var u,a,l,d;let n=r;if(n.tagName==="BODY"){let o=n.dataset.segmentEvent,s={};for(let m=1;m<=100;m++){let p=(u=n.dataset)==null?void 0:u["propertyName"+m],f=(a=n.dataset)==null?void 0:a["propertyValue"+m];if(p)s[h(p)]=y(n,p,f,i);else break}t.forEach(m=>{var T,S,L;let p=m,f=(T=p.dataset)==null?void 0:T.pageviewPropertyName,g=(L=(S=p.dataset)==null?void 0:S.pageviewPropertyValue)!=null?L:"innerHTML",w=h(f);if(s[h(f)]){let v=s[w];typeof v=="string"?s[w]=[v,y(p,f,g,i)]:Array.isArray(v)&&(s[w]=[...v,y(p,f,g,i)])}else p.getAttribute("data-multi-reference")==="true"?s[w]=[y(p,f,g,i)]:s[h(f)]=y(p,f,g,i)}),C(o,s)}else{let o=n.dataset.segmentEvent,s={},m={};if(o){for(let f=1;f<=100;f++){let g=(l=n.dataset)==null?void 0:l["propertyName"+f],w=(d=n.dataset)==null?void 0:d["propertyValue"+f];if(g)s[h(g)]=y(n,g,w,i);else break}let p=()=>{var f,g,w,T,S,L;if(n.tagName==="INPUT"&&n.type==="submit"||((f=n.dataset)==null?void 0:f.submitButton)==="true"){let v=n.closest("form");[...(g=v==null?void 0:v.elements)!=null?g:[]].forEach(k=>{var M,H,I;let c=k;if(c!==n){let P=c==null?void 0:c.id.toLowerCase(),O=c==null?void 0:c.value,Q=((M=c==null?void 0:c.dataset)==null?void 0:M.identify)==="true",U=((H=c==null?void 0:c.dataset)==null?void 0:H.bothIdentifyAndTrack)==="true",Y=((I=c==null?void 0:c.dataset)==null?void 0:I.ignore)==="true";P&&O&&!Y&&(Q||U?(m[P]=O,U&&(s[P]=O)):s[P]=O)}})}if(((w=n.dataset)==null?void 0:w.cms)==="true"){let E=n.closest("[data-wrapper]").querySelectorAll("[data-property-name]");for(let k=0;k<E.length;k++){let c=E[k],M=(T=c.dataset)==null?void 0:T.propertyName,H=(L=(S=c.dataset)==null?void 0:S.propertyValue)!=null?L:"innerHTML";s[h(M)]=y(c,M,H,i)}}C(o,s),Object.keys(m).length>0&&_(m)};n.addEventListener("click",p),n.addEventListener("auxclick",p)}}})}j();})();
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * v1.0.3
 * Copyright (c) 2022, Barjuan Davis - Devhaus Pte Ltd
 */
