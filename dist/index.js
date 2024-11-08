"use strict";(()=>{var Ce=Object.create;var B=Object.defineProperty,Me=Object.defineProperties,Ie=Object.getOwnPropertyDescriptor,je=Object.getOwnPropertyDescriptors,Fe=Object.getOwnPropertyNames,ue=Object.getOwnPropertySymbols,Te=Object.getPrototypeOf,de=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var le=(e,t,n)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,O=(e,t)=>{for(var n in t||(t={}))de.call(t,n)&&le(e,n,t[n]);if(ue)for(var n of ue(t))Pe.call(t,n)&&le(e,n,t[n]);return e},F=(e,t)=>Me(e,je(t));var De=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Be=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Fe(t))!de.call(e,a)&&a!==n&&B(e,a,{get:()=>t[a],enumerable:!(r=Ie(t,a))||r.enumerable});return e};var Ge=(e,t,n)=>(n=e!=null?Ce(Te(e)):{},Be(t||!e||!e.__esModule?B(n,"default",{value:e,enumerable:!0}):n,e));var fe=De(N=>{"use strict";N.parse=Ne;N.serialize=Ve;var He=Object.prototype.toString,T=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function Ne(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},a=r.decode||Ue,o=0;o<e.length;){var s=e.indexOf("=",o);if(s===-1)break;var i=e.indexOf(";",o);if(i===-1)i=e.length;else if(i<s){o=e.lastIndexOf(";",s-1)+1;continue}var u=e.slice(o,s).trim();if(n[u]===void 0){var c=e.slice(s+1,i).trim();c.charCodeAt(0)===34&&(c=c.slice(1,-1)),n[u]=$e(c,a)}o=i+1}return n}function Ve(e,t,n){var r=n||{},a=r.encode||ze;if(typeof a!="function")throw new TypeError("option encode is invalid");if(!T.test(e))throw new TypeError("argument name is invalid");var o=a(t);if(o&&!T.test(o))throw new TypeError("argument val is invalid");var s=e+"="+o;if(r.maxAge!=null){var i=r.maxAge-0;if(isNaN(i)||!isFinite(i))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(i)}if(r.domain){if(!T.test(r.domain))throw new TypeError("option domain is invalid");s+="; Domain="+r.domain}if(r.path){if(!T.test(r.path))throw new TypeError("option path is invalid");s+="; Path="+r.path}if(r.expires){var u=r.expires;if(!Re(u)||isNaN(u.valueOf()))throw new TypeError("option expires is invalid");s+="; Expires="+u.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.priority){var c=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(c){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var l=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(l){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;case"none":s+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return s}function Ue(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function ze(e){return encodeURIComponent(e)}function Re(e){return He.call(e)==="[object Date]"||e instanceof Date}function $e(e,t){try{return t(e)}catch(n){return e}}});function G(e){let t=F(O({},e),{network_provider:e.org});return delete t.org,t}async function H(){let e=await fetch("https://ipapi.co/json/").then(t=>t.json());window.analytics&&window.analytics.identify(G(e))}var A=(e="")=>/.+:.+/g.test(e)?e.substring(0,e.search(":")):e;var S=(e,t="",n=null,r)=>{var a,o,s;if(t==="path")return window.location.pathname;if(t==="url")return window.location.href.split("?")[0];if(/.+:.+/g.test(t)){let i=t.substring(0,t.search(":")),u=t.substring(t.search(":")+1,t.length);return S(e,i,u,r)}if(t)switch(n){case"innerHTML":return e==null?void 0:e.innerHTML;case"innerHTML-parseInt":return parseInt(e.innerHTML);case"innerHTML-parseFloat":return parseFloat(e.innerHTML);case"innerText":return e==null?void 0:e.innerText;case"innerText-parseInt":return parseInt(e.innerText);case"innerText-parseFloat":return parseFloat(e.innerText);case"url":return window.location.href.split("?")[0];case"boolean:true":return!0;case"boolean:false":return!1;case"grabPageview":let i=r.find(l=>{var m;return((m=l==null?void 0:l.dataset)==null?void 0:m.pageviewPropertyName)===t}),u=(o=(a=i==null?void 0:i.dataset)==null?void 0:a.pageviewPropertyValue)!=null?o:"innerHTML";return S(i,t,u,r);case"grabAHref":let c=e==null?void 0:e.getAttribute("href");return c!=null&&c.includes("?")&&(c=c==null?void 0:c.split("?")[0]),(s=c!=null?c:e==null?void 0:e.innerHTML)!=null?s:"";default:return n}};var V=Ge(fe(),1);function M(e=""){let t=window.location.search,n=new URLSearchParams(t),r=n==null?void 0:n.get(e);if(!r){let o=V.default.parse(document.cookie)[e];return o||(e==="utm_source"?"direct":null)}if(r)return document.cookie=V.default.serialize(e,r,{path:"/",maxAge:60*60*24*7}),r}function me(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function We(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?me(Object(n),!0).forEach(function(r){qe(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):me(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function qe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Ye=function(t){var n=t.orgId,r=t.namespace,a=r===void 0?"FS":r,o=t.debug,s=t.host,i=s===void 0?"fullstory.com":s,u=t.script,c=u===void 0?"edge.fullstory.com/s/fs.js":u;if(!n)throw new Error("FullStory orgId is a required parameter");window._fs_host=i,window._fs_script=c,window._fs_org=n,window._fs_namespace=a,function(l,m,v,h,y,p,d,b){if(v in l){l.console&&l.console.log&&l.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');return}d=l[v]=function(f,w,_){d.q?d.q.push([f,w,_]):d._api(f,w,_)},d.q=[],p=m.createElement(h),p.async=1,p.crossOrigin="anonymous",p.src="https://"+_fs_script,b=m.getElementsByTagName(h)[0],b.parentNode.insertBefore(p,b),d.identify=function(f,w,_){d(y,{uid:f},_),w&&d(y,w,_)},d.setUserVars=function(f,w){d(y,f,w)},d.event=function(f,w,_){d("event",{n:f,p:w},_)},d.anonymize=function(){d.identify(!1)},d.shutdown=function(){d("rec",!1)},d.restart=function(){d("rec",!0)},d.log=function(f,w){d("log",[f,w])},d.consent=function(f){d("consent",!arguments.length||f)},d.identifyAccount=function(f,w){p="account",w=w||{},w.acctId=f,d(p,w)},d.clearUserCookie=function(){},d.setVars=function(f,w){d("setVars",[f,w])},d._w={},b="XMLHttpRequest",d._w[b]=l[b],b="fetch",d._w[b]=l[b],l[b]&&(l[b]=function(){return d._w[b].apply(this,arguments)}),d._v="1.3.0"}(window,document,window._fs_namespace,"script","user")},I=function(){return window[window._fs_namespace]},Je=function(){var t=!!I();if(!t)throw Error("FullStory is not loaded, please ensure the init function is invoked before calling FullStory API functions")},Ke=function(){Je();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.every(function(a){return I()[a]})},E=function(t){return function(){if(window._fs_dev_mode){var n="FullStory is in dev mode and is not recording: ".concat(t," method not executed");return console.warn(n),n}if(Ke(t)){var r;return(r=I())[t].apply(r,arguments)}return console.warn("FS.".concat(t," not ready")),null}},U=E("event"),gt=E("log"),yt=E("getCurrentSessionURL"),wt=E("identify"),pe=E("setUserVars"),ge=E("consent"),Qe=E("shutdown"),vt=E("restart"),bt=E("anonymize"),ht=E("setVars"),Xe=function(t,n){var r=We({},t);if(I()){console.warn("The FullStory snippet has already been defined elsewhere (likely in the <head> element)");return}if(r.recordCrossDomainIFrames&&(window._fs_run_in_iframe=!0),r.recordOnlyThisIFrame&&(window._fs_is_outer_script=!0),r.cookieDomain&&(window._fs_cookie_domain=r.cookieDomain),r.debug===!0&&(r.script?console.warn("Ignoring `debug = true` because `script` is set"):r.script="edge.fullstory.com/s/fs-debug.js"),Ye(r),n&&I()("observe",{type:"start",callback:n}),r.devMode===!0){var a="FullStory was initialized in devMode and will stop recording";U("FullStory Dev Mode",{message_str:a}),Qe(),window._fs_dev_mode=!0,console.warn(a)}},Ze=function(t,n){return function(){if(window._fs_initialized){n&&console.warn(n);return}t.apply(void 0,arguments),window._fs_initialized=!0}},ye=Ze(Xe,"FullStory init has already been called once, additional invocations are ignored");function z(e="",t={}){var n;(n=document.getElementById("devhaus-tracking-code"))!=null&&n.getAttribute("fullstory")&&U(e,t)}function k(){window.dataLayer.push(arguments)}function R(){return document.querySelector("#devhaus-tracking-code").hasAttribute("ga4")}function $(e,t){let n=e.replace(/ /g,"_").toLowerCase();R()&&k("event",n,t)}function j(e="",t={},n=!1){var a;let r=F(O({},t),{metadata:{utm_source:M("utm_source"),utm_medium:M("utm_medium"),utm_campaign:M("utm_campaign")}});n&&console.log("Segment - Event",e,r),$(e,t),z(e,r),window!=null&&window.analytics&&((a=window==null?void 0:window.analytics)==null||a.track(e,r))}function W(e,t,n,r=!1){var s,i;let a=Array.from(n),o={};for(let u=1;u<=100;u++){let c=(s=t.dataset)==null?void 0:s["propertyName"+u],l=(i=t.dataset)==null?void 0:i["propertyValue"+u];if(c)o[A(c)]=S(t,c,l,a);else break}n.forEach(u=>{var h,y,p;let c=u,l=(h=c.dataset)==null?void 0:h.pageviewPropertyName,m=(p=(y=c.dataset)==null?void 0:y.pageviewPropertyValue)!=null?p:"innerHTML",v=A(l);if(o[A(l)]){let d=o[v];typeof d=="string"?o[v]=[d,S(c,l,m,a)]:Array.isArray(d)&&(o[v]=[...d,S(c,l,m,a)])}else c.getAttribute("data-multi-reference")==="true"?o[v]=[S(c,l,m,a)]:o[A(l)]=S(c,l,m,a)}),j(e,o,r)}function et(e={}){let{first_name:t,last_name:n,full_name:r,email:a}=e;return t&&n?(delete e.first_name,delete e.last_name,O({displayName:`${t} ${n}`,email:a},e)):r?(delete e.full_name,O({displayName:r,email:a},e)):O({displayName:"",email:a},e)}function q(e){var t;(t=document.getElementById("devhaus-tracking-code"))!=null&&t.getAttribute("fullstory")&&pe(et(e))}function Y(e={},t=!1){q(e),window.analytics&&window.analytics.identify(e),t&&console.log("Segment - Identify",e)}function J(e,t,n){var s,i,u;let r=Array.from(n),o=e.closest("[data-wrapper]").querySelectorAll("[data-property-name]");for(let c=0;c<o.length;c++){let l=o[c],m=(s=l.dataset)==null?void 0:s.propertyName,v=(u=(i=l.dataset)==null?void 0:i.propertyValue)!=null?u:"innerHTML";t[A(m)]=S(l,m,v,r)}}function K(e,t,n){var o;let r=e.tagName==="FORM"?e:e==null?void 0:e.parentElement;[...(o=r==null?void 0:r.elements)!=null?o:[]].forEach(s=>{var u,c,l,m,v,h;let i=s;if(i!==e){let y=i==null?void 0:i.name.toLowerCase(),p=i==null?void 0:i.value,d=((u=i==null?void 0:i.dataset)==null?void 0:u.identify)==="true",b=((c=i==null?void 0:i.dataset)==null?void 0:c.parseInt)==="true",f=((l=i==null?void 0:i.dataset)==null?void 0:l.parseFloat)==="true";b&&(p=parseInt(p)),f&&(p=parseFloat(p));let w=((m=i==null?void 0:i.dataset)==null?void 0:m.bothIdentifyAndTrack)==="true",_=((v=i==null?void 0:i.dataset)==null?void 0:v.track)==="true",D=((h=i==null?void 0:i.dataset)==null?void 0:h.ignore)==="true";y&&p&&!D&&((d||w)&&(Array.isArray(n[y])?n[y].push(p):n[y]!==void 0?n[y]=[n[y],p]:n[y]=p),(_||w)&&(Array.isArray(t[y])?t[y].push(p):t[y]!==void 0?t[y]=[t[y],p]:t[y]=p))}})}function Q(e,t,n,r=!1){var i,u;let a=Array.from(n),o={},s={};if(e){for(let l=1;l<=100;l++){let m=(i=t.dataset)==null?void 0:i["propertyName"+l],v=(u=t.dataset)==null?void 0:u["propertyValue"+l];if(m)o[A(m)]=S(t,m,v,a);else break}let c=()=>{var l;t.tagName==="FORM"&&K(t,o,s),((l=t.dataset)==null?void 0:l.cms)==="true"&&J(t,o,n),Object.keys(s).length>0&&Y(s,r),j(e,o,r)};t.tagName==="FORM"?t.addEventListener("submit",l=>{c()}):t.addEventListener("click",c)}}function X(e=!1){let t=document.querySelectorAll("[data-segment-event]"),n=document.querySelectorAll("[data-event]"),r=document.querySelectorAll("[data-pageview-proprty-name]");H(),[...n,...t].forEach(a=>{var i;let o=a,s=(i=o.dataset.event)!=null?i:o.dataset.segmentEvent;s&&o.tagName==="BODY"&&W(s,o,r,e),s&&o.tagName!=="BODY"&&Q(s,o,r,e),o.removeAttribute("data-event"),o.removeAttribute("data-segment-event"),o.removeAttribute("data-pageview-property-name"),[...o.attributes].forEach(u=>{u.name.includes("data-property-name")&&o.removeAttribute(u.name),u.name.includes("data-property-value")&&o.removeAttribute(u.name)})})}function L(e){let t=document.getElementById("consent-manager");t&&(t.style.display=e?"block":"none")}function Z(e){ge(e)}function ee(e){window.gtag("consent","update",{ad_storage:e?"granted":"denied",analytics_storage:e?"granted":"denied"})}function x(e,t){e.forEach(n=>{switch(n){case"fullstory":Z(t);break;default:ee(t)}})}function te(e){var s,i,u,c;let t=document.getElementById("consent-manager");if(!t){console.error(`enable-consent-manager is ${(s=document.getElementById("devhaus-tracking-code"))==null?void 0:s.getAttribute("enable-consent-manager")}, but no div with id 'consent-manager' found. Please update your Webflow project.`);return}let n=t.querySelector("#consent-manager-accept");if(!n){console.error(`enable-consent-manager is ${(i=document.getElementById("devhaus-tracking-code"))==null?void 0:i.getAttribute("enable-consent-manager")}, but no button with id 'consent-manager-accept' found inside div with id 'consent-manager'. Please update your Webflow project.`);return}let r=t.querySelector("#consent-manager-decline");if(!r){console.error(`enable-consent-manager is ${(u=document.getElementById("devhaus-tracking-code"))==null?void 0:u.getAttribute("enable-consent-manager")}, but no button with id 'consent-manager-decline' found inside div with id 'consent-manager'. Please update your Webflow project.`);return}let a=document.getElementById("open-consent-manager");a||console.warn(`enable-consent-manager is ${(c=document.getElementById("devhaus-tracking-code"))==null?void 0:c.getAttribute("enable-consent-manager")}, but no button with id 'open-consent-manager' found. Please update your Webflow project.`);let o=localStorage.getItem("devhaus-tracking-code-allow-consent");o==="true"?x(e,!0):(x(e,!1),o||L(!0)),n.addEventListener("click",()=>{L(!1),x(e,!0),localStorage.setItem("devhaus-tracking-code-allow-consent","true")}),r.addEventListener("click",()=>{L(!1),x(e,!1),localStorage.setItem("devhaus-tracking-code-allow-consent","false")}),a==null||a.addEventListener("click",()=>{L(!0)})}function ne(e){var t,n;ye({orgId:e,debug:((n=(t=document.getElementById("devhaus-tracking-code"))==null?void 0:t.getAttribute)==null?void 0:n.call(t,"fullstory-debug-mode"))==="true"})}function re(){let e=document.querySelector("#devhaus-tracking-code");if(e.hasAttribute("ga4"))try{let t=e.getAttribute("ga4"),n=e.getAttribute("ga4-debug-mode"),r=document.createElement("script");r.src=`https://www.googletagmanager.com/gtag/js?id=${t}`,r.setAttribute("async","true"),document.head.appendChild(r),window.dataLayer=window.dataLayer||[],k("js",new Date),!n&&t&&k("config",t),n&&t&&k("config",t,{send_page_view:!0,debug_mode:!0})}catch(t){}}function oe(e){return window.location.hostname.includes(e||"webflow.io")}function C(e,t,n,r,a){if(oe(r)&&n)return n;let o=window.location.hostname===a;return t&&(!a||o)?t:e}function ie(e,t="eu",n,r,a){var l;if(t==="false")return;window.consentManagerConfig=function(m){var y,p,d,b;let v,h;try{h=m.React,v=m.inEU}finally{let f=document.getElementById("devhaus-tracking-code"),w=(y=f==null?void 0:f.getAttribute("consent-banner-color"))!=null?y:"rgba(0,0,0,0)",_=(p=f==null?void 0:f.getAttribute("consent-banner-text-color"))!=null?p:"#ffffff",D=(d=f==null?void 0:f.getAttribute("consent-banner-content"))!=null?d:"We use cookies to improve your experience.",ke=h.createElement("span",{className:"consent-banner-content"},D),Le=(b=f==null?void 0:f.getAttribute("consent-banner-sub-content"))!=null?b:"You can change your preferences at any time.",xe=h.createElement("span",{className:"consent-banner-sub-content"},Le);return{container:"#consent-manager",writeKey:C(e,e,n,r,a),bannerContent:ke,bannerSubContent:xe,preferencesDialogTitle:"Website Data Collection Preferences",bannerTextColor:_,bannerBackgroundColor:w,preferencesDialogContent:"We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.",cancelDialogTitle:"Are you sure you want to cancel?",cancelDialogContent:"Your preferences have not been saved. By continuing to use our website, you're agreeing to our Website Data Collection Policy",closeBehavior:"accept",initialPreferences:{marketingAndAnalytics:!0,advertising:!0,functional:!0},shouldRequireConsent:()=>t==="true"||t==="eu"&&v()}}};let o=document.createElement("script");o.defer=!0,o.src="https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js",document.body.appendChild(o);let s=document.getElementById("devhaus-tracking-code");if(((l=s==null?void 0:s.getAttribute("include-built-in-banner"))!=null?l:"false")==="true"){let m=document.createElement("div");m.id="consent-manager",document.body.appendChild(m)}let u=document.getElementById("open-consent-manager");u||console.warn("#open-consent-manager Button doesn't exist. Please update your Webflow project.");let c=function(){window.consentManager.openConsentManager()};u==null||u.addEventListener("click",c)}function ae(e,t="true",n,r,a){var s;t!==null&&ie(e,t,n,r,a);let o=window.analytics=(s=window.analytics)!=null?s:[];if(!o.initialize){if(o.invoked)throw new Error("Segment snippet included twice.");o.invoked=!0,o.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware"],o.factory=function(i){return function(){let u=Array.prototype.slice.call(arguments);return u.unshift(i),o.push(u),o}};for(let i=0;i<o.methods.length;i++){let u=o.methods[i];o[u]=o.factory(u)}o.load=function(i,u){var m;let c=document.createElement("script");c.type="text/javascript",c.async=!0,c.src="https://cdn.segment.com/analytics.js/v1/"+i+"/analytics.min.js";let l=document.getElementsByTagName("script")[0];(m=l.parentNode)==null||m.insertBefore(c,l),o._loadOptions=u},o._writeKey=C(e,void 0,n),o.SNIPPET_VERSION="4.15.3",t==="false"&&o.load(C(e,void 0,n)),o.page()}}var g=document.getElementById("devhaus-tracking-code"),ce=g==null?void 0:g.getAttribute("segment-prod-write-key"),ve,tt=(ve=g==null?void 0:g.getAttribute("segment-dev-write-key"))!=null?ve:void 0,be,nt=(be=g==null?void 0:g.getAttribute("staging-domain"))!=null?be:void 0,he,rt=(he=g==null?void 0:g.getAttribute("production-domain"))!=null?he:void 0,Se,Oe=(Se=g==null?void 0:g.getAttribute("enable-consent-manager"))!=null?Se:"eu",_e,ot=(_e=g==null?void 0:g.getAttribute("ga4"))!=null?_e:"false",Ee,we=(Ee=g==null?void 0:g.getAttribute("fullstory"))!=null?Ee:"false",Ae,it=(Ae=g==null?void 0:g.getAttribute("is-dev"))!=null?Ae:!1;ce&&ae(ce,Oe,tt,nt,rt);var se=[];ce||(ot!=="false"&&(re(),se.push("ga4")),we!=="false"&&(ne(we),se.push("fullstory")),Oe!=="false"&&te(se));window.addEventListener("DOMContentLoaded",()=>{X(it==="true")});})();
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//Copyright (c) 2024 Devhaus Pte Ltd
