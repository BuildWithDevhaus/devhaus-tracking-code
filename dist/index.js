"use strict";(()=>{var Ce=Object.create;var B=Object.defineProperty,Me=Object.defineProperties,Fe=Object.getOwnPropertyDescriptor,Te=Object.getOwnPropertyDescriptors,je=Object.getOwnPropertyNames,ue=Object.getOwnPropertySymbols,Pe=Object.getPrototypeOf,de=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable;var le=(e,t,n)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||(t={}))de.call(t,n)&&le(e,n,t[n]);if(ue)for(var n of ue(t))De.call(t,n)&&le(e,n,t[n]);return e},F=(e,t)=>Me(e,Te(t));var Be=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ve=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of je(t))!de.call(e,s)&&s!==n&&B(e,s,{get:()=>t[s],enumerable:!(r=Fe(t,s))||r.enumerable});return e};var Ge=(e,t,n)=>(n=e!=null?Ce(Pe(e)):{},Ve(t||!e||!e.__esModule?B(n,"default",{value:e,enumerable:!0}):n,e));var fe=Be(H=>{"use strict";H.parse=Ne;H.serialize=Ue;var He=Object.prototype.toString,T=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function Ne(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},s=r.decode||ze,o=0;o<e.length;){var u=e.indexOf("=",o);if(u===-1)break;var i=e.indexOf(";",o);if(i===-1)i=e.length;else if(i<u){o=e.lastIndexOf(";",u-1)+1;continue}var l=e.slice(o,u).trim();if(n[l]===void 0){var c=e.slice(u+1,i).trim();c.charCodeAt(0)===34&&(c=c.slice(1,-1)),n[l]=$e(c,s)}o=i+1}return n}function Ue(e,t,n){var r=n||{},s=r.encode||Re;if(typeof s!="function")throw new TypeError("option encode is invalid");if(!T.test(e))throw new TypeError("argument name is invalid");var o=s(t);if(o&&!T.test(o))throw new TypeError("argument val is invalid");var u=e+"="+o;if(r.maxAge!=null){var i=r.maxAge-0;if(isNaN(i)||!isFinite(i))throw new TypeError("option maxAge is invalid");u+="; Max-Age="+Math.floor(i)}if(r.domain){if(!T.test(r.domain))throw new TypeError("option domain is invalid");u+="; Domain="+r.domain}if(r.path){if(!T.test(r.path))throw new TypeError("option path is invalid");u+="; Path="+r.path}if(r.expires){var l=r.expires;if(!qe(l)||isNaN(l.valueOf()))throw new TypeError("option expires is invalid");u+="; Expires="+l.toUTCString()}if(r.httpOnly&&(u+="; HttpOnly"),r.secure&&(u+="; Secure"),r.priority){var c=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(c){case"low":u+="; Priority=Low";break;case"medium":u+="; Priority=Medium";break;case"high":u+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var a=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(a){case!0:u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"strict":u+="; SameSite=Strict";break;case"none":u+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return u}function ze(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function Re(e){return encodeURIComponent(e)}function qe(e){return He.call(e)==="[object Date]"||e instanceof Date}function $e(e,t){try{return t(e)}catch(n){return e}}});function V(e){let t=F(_({},e),{network_provider:e.org});return delete t.org,t}async function G(){let e=await fetch("https://ipapi.co/json/").then(t=>t.json());window.analytics&&window.analytics.identify(V(e))}var S=(e="")=>/.+:.+/g.test(e)?e.substring(0,e.search(":")):e;var v=(e,t="",n=null,r)=>{var s,o,u;if(t==="path")return window.location.pathname;if(t==="url")return window.location.href.split("?")[0];if(/.+:.+/g.test(t)){let i=t.substring(0,t.search(":")),l=t.substring(t.search(":")+1,t.length);return v(e,i,l,r)}if(t)switch(n){case"innerHTML":return e==null?void 0:e.innerHTML;case"innerHTML-parseInt":return parseInt(e.innerHTML);case"innerHTML-parseFloat":return parseFloat(e.innerHTML);case"innerText":return e==null?void 0:e.innerText;case"innerText-parseInt":return parseInt(e.innerText);case"innerText-parseFloat":return parseFloat(e.innerText);case"url":return window.location.href.split("?")[0];case"boolean:true":return!0;case"boolean:false":return!1;case"grabPageview":let i=r.find(a=>{var d;return((d=a==null?void 0:a.dataset)==null?void 0:d.pageviewPropertyName)===t}),l=(o=(s=i==null?void 0:i.dataset)==null?void 0:s.pageviewPropertyValue)!=null?o:"innerHTML";return v(i,t,l,r);case"grabAHref":let c=e==null?void 0:e.getAttribute("href");return c!=null&&c.includes("?")&&(c=c==null?void 0:c.split("?")[0]),(u=c!=null?c:e==null?void 0:e.innerHTML)!=null?u:"";default:return n}};var N=Ge(fe(),1);function x(e=""){let t=window.location.search,n=new URLSearchParams(t),r=n==null?void 0:n.get(e);if(!r){let o=N.default.parse(document.cookie)[e];return o||(e==="utm_source"?"direct":null)}if(r)return document.cookie=N.default.serialize(e,r,{path:"/",maxAge:60*60*24*7}),r}var We=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.wnd,r=n===void 0?window:n;(function(s,o,u,i,l,c,a,d){if(u in s){s.console&&s.console.log&&s.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');return}a=s[u]=function(f,g,p){a.q?a.q.push([f,g,p]):a._api(f,g,p)},a.q=[],c=o.createElement(i),c.async=1,c.crossOrigin="anonymous",c.src="https://"+_fs_script,d=o.getElementsByTagName(i)[0],d.parentNode.insertBefore(c,d),a.identify=function(f,g,p){a(l,{uid:f},p),g&&a(l,g,p)},a.setUserVars=function(f,g){a(l,f,g)},a.event=function(f,g,p){a("event",{n:f,p:g},p)},a.anonymize=function(){a.identify(!1)},a.shutdown=function(){a("rec",!1)},a.restart=function(){a("rec",!0)},a.log=function(f,g){a("log",[f,g])},a.consent=function(f){a("consent",!arguments.length||f)},a.identifyAccount=function(f,g){c="account",g=g||{},g.acctId=f,a(c,g)},a.clearUserCookie=function(){},a.setVars=function(f,g){a("setVars",[f,g])},a._w={},d="XMLHttpRequest",a._w[d]=s[d],d="fetch",a._w[d]=s[d],s[d]&&(s[d]=function(){return a._w[d].apply(this,arguments)}),a._v="1.3.0"})(r,r.document,r._fs_namespace,"script","user")},Ye=function(t){return t==="window"?"document":"".concat(t,".document")},Xe=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.shouldInsertScript,r=n===void 0?!0:n,s=t.globalVar,o=s===void 0?"window":s,u=t.apiVersion,i=u===void 0?"1.3.0":u;return`(function(m,n,e,t,l,o,g,y){
    if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
    g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];`.concat(r?`
    o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
    y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);`:"",`
    g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
    g.anonymize=function(){g.identify(!!0)};
    g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
    g.log = function(a,b){g("log",[a,b])};
    g.consent=function(a){g("consent",!arguments.length||a)};
    g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
    g.clearUserCookie=function(){};
    g.setVars=function(n, p){g('setVars',[n,p]);};
    g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
    if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
    g._v="`).concat(i,`";
})(`).concat(o,",").concat(Ye(o),",").concat(o,"['_fs_namespace'],'script','user');")},ge=function(t){var n=t.orgId,r=t.namespace,s=r===void 0?"FS":r,o=t.debug,u=o===void 0?!1:o,i=t.host,l=i===void 0?"fullstory.com":i,c=t.script,a=c===void 0?"edge.fullstory.com/s/fs.js":c;if(!n)throw new Error("FullStory orgId is a required parameter");window._fs_debug=u,window._fs_host=l,window._fs_script=a,window._fs_org=n,window._fs_namespace=s,We()},vt=Xe();function pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function Je(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?pe(Object(n),!0).forEach(function(r){Ke(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pe(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Ke(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var L=function(){return window[window._fs_namespace]},Qe=function(){var t=!!L();if(!t)throw Error("FullStory is not loaded, please ensure the init function is invoked before calling FullStory API functions")},Ze=function(){Qe();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.every(function(s){return L()[s]})},b=function(t){return function(){if(window._fs_dev_mode){var n="FullStory is in dev mode and is not recording: ".concat(t," method not executed");return console.warn(n),n}if(Ze(t)){var r;return(r=L())[t].apply(r,arguments)}return console.warn("FS.".concat(t," not ready")),null}},U=b("event"),St=b("log"),_t=b("getCurrentSessionURL"),At=b("identify"),me=b("setUserVars"),ye=b("consent"),et=b("shutdown"),Et=b("restart"),kt=b("anonymize"),Ot=b("setVars"),tt=function(t,n){var r=Je({},t);if(L()){console.warn("The FullStory snippet has already been defined elsewhere (likely in the <head> element)");return}if(r.recordCrossDomainIFrames&&(window._fs_run_in_iframe=!0),r.recordOnlyThisIFrame&&(window._fs_is_outer_script=!0),r.cookieDomain&&(window._fs_cookie_domain=r.cookieDomain),r.debug===!0&&(r.script?console.warn("Ignoring `debug = true` because `script` is set"):r.script="edge.fullstory.com/s/fs-debug.js"),ge(r),n&&L()("observe",{type:"start",callback:n}),r.devMode===!0){var s="FullStory was initialized in devMode and will stop recording";U("FullStory Dev Mode",{message_str:s}),et(),window._fs_dev_mode=!0,console.warn(s)}},nt=function(t,n){return function(){if(window._fs_initialized){n&&console.warn(n);return}t.apply(void 0,arguments),window._fs_initialized=!0}},we=nt(tt,"FullStory init has already been called once, additional invocations are ignored");function z(e="",t={}){var n;(n=document.getElementById("devhaus-tracking-code"))!=null&&n.getAttribute("fullstory")&&U(e,t)}function A(){window.dataLayer.push(arguments)}function R(){return document.querySelector("#devhaus-tracking-code").hasAttribute("ga4")}function q(e,t){let n=e.replace(/ /g,"_").toLowerCase();R()&&A("event",n,t)}function I(e="",t={},n=!1){var s;let r=F(_({},t),{metadata:{utm_source:x("utm_source"),utm_medium:x("utm_medium"),utm_campaign:x("utm_campaign")}});n&&console.log("Segment - Event",e,r),q(e,t),z(e,r),window!=null&&window.analytics&&((s=window==null?void 0:window.analytics)==null||s.track(e,r))}function $(e,t,n,r=!1){var u,i;let s=Array.from(n),o={};for(let l=1;l<=100;l++){let c=(u=t.dataset)==null?void 0:u["propertyName"+l],a=(i=t.dataset)==null?void 0:i["propertyValue"+l];if(c)o[S(c)]=v(t,c,a,s);else break}n.forEach(l=>{var g,p,y;let c=l,a=(g=c.dataset)==null?void 0:g.pageviewPropertyName,d=(y=(p=c.dataset)==null?void 0:p.pageviewPropertyValue)!=null?y:"innerHTML",f=S(a);if(o[S(a)]){let h=o[f];typeof h=="string"?o[f]=[h,v(c,a,d,s)]:Array.isArray(h)&&(o[f]=[...h,v(c,a,d,s)])}else c.getAttribute("data-multi-reference")==="true"?o[f]=[v(c,a,d,s)]:o[S(a)]=v(c,a,d,s)}),I(e,o,r)}function rt(e={}){let{first_name:t,last_name:n,full_name:r,email:s}=e;return t&&n?(delete e.first_name,delete e.last_name,_({displayName:`${t} ${n}`,email:s},e)):r?(delete e.full_name,_({displayName:r,email:s},e)):_({displayName:"",email:s},e)}function W(e){var t;(t=document.getElementById("devhaus-tracking-code"))!=null&&t.getAttribute("fullstory")&&me(rt(e))}function Y(e={},t=!1){W(e),window.analytics&&window.analytics.identify(e),t&&console.log("Segment - Identify",e)}function X(e,t,n){var u,i,l;let r=Array.from(n),o=e.closest("[data-wrapper]").querySelectorAll("[data-property-name]");for(let c=0;c<o.length;c++){let a=o[c],d=(u=a.dataset)==null?void 0:u.propertyName,f=(l=(i=a.dataset)==null?void 0:i.propertyValue)!=null?l:"innerHTML";t[S(d)]=v(a,d,f,r)}}function J(e,t,n){var o;let r=e.tagName==="FORM"?e:e==null?void 0:e.parentElement;[...(o=r==null?void 0:r.elements)!=null?o:[]].forEach(u=>{var l,c,a,d,f,g;let i=u;if(i!==e){let p=i==null?void 0:i.name.toLowerCase(),y;(i==null?void 0:i.type)==="checkbox"&&!i.checked||(i==null?void 0:i.type)==="radio"&&!i.checked?y=void 0:y=i==null?void 0:i.value;let h=((l=i==null?void 0:i.dataset)==null?void 0:l.identify)==="true",C=((c=i==null?void 0:i.dataset)==null?void 0:c.parseInt)==="true",w=((a=i==null?void 0:i.dataset)==null?void 0:a.parseFloat)==="true",M=((d=i==null?void 0:i.dataset)==null?void 0:d.bothIdentifyAndTrack)==="true",P=((f=i==null?void 0:i.dataset)==null?void 0:f.track)==="true",D=((g=i==null?void 0:i.dataset)==null?void 0:g.ignore)==="true";p&&y&&!D&&(C&&(y=parseInt(y)),w&&(y=parseFloat(y)),(h||M)&&(Array.isArray(n[p])?n[p].push(y):n[p]!==void 0?n[p]=[n[p],y]:n[p]=y),(P||M)&&(Array.isArray(t[p])?t[p].push(y):t[p]!==void 0?t[p]=[t[p],y]:t[p]=y))}})}function K(e,t,n,r=!1){var i,l;let s=Array.from(n),o={},u={};if(e){for(let a=1;a<=100;a++){let d=(i=t.dataset)==null?void 0:i["propertyName"+a],f=(l=t.dataset)==null?void 0:l["propertyValue"+a];if(d)o[S(d)]=v(t,d,f,s);else break}let c=()=>{var a;t.tagName==="FORM"&&J(t,o,u),((a=t.dataset)==null?void 0:a.cms)==="true"&&X(t,o,n),Object.keys(u).length>0&&Y(u,r),I(e,o,r)};t.tagName==="FORM"?t.addEventListener("submit",a=>{c()}):t.addEventListener("click",c)}}function Q(e=!1){let t=document.querySelectorAll("[data-segment-event]"),n=document.querySelectorAll("[data-event]"),r=document.querySelectorAll("[data-pageview-proprty-name]");G(),[...n,...t].forEach(s=>{var i;let o=s,u=(i=o.dataset.event)!=null?i:o.dataset.segmentEvent;u&&o.tagName==="BODY"&&$(u,o,r,e),u&&o.tagName!=="BODY"&&K(u,o,r,e),o.removeAttribute("data-event"),o.removeAttribute("data-segment-event"),o.removeAttribute("data-pageview-property-name"),[...o.attributes].forEach(l=>{l.name.includes("data-property-name")&&o.removeAttribute(l.name),l.name.includes("data-property-value")&&o.removeAttribute(l.name)})})}function E(e){let t=document.getElementById("consent-manager");t&&(t.style.display=e?"block":"none")}function Z(e){ye(e)}function ee(e){window.gtag("consent","update",{ad_storage:e?"granted":"denied",analytics_storage:e?"granted":"denied"})}function k(e,t){e.forEach(n=>{switch(n){case"fullstory":Z(t);break;default:ee(t)}})}function te(e){var u,i,l,c;let t=document.getElementById("consent-manager");if(!t){console.error(`enable-consent-manager is ${(u=document.getElementById("devhaus-tracking-code"))==null?void 0:u.getAttribute("enable-consent-manager")}, but no div with id 'consent-manager' found. Please update your Webflow project.`);return}let n=t.querySelector("#consent-manager-accept");if(!n){console.error(`enable-consent-manager is ${(i=document.getElementById("devhaus-tracking-code"))==null?void 0:i.getAttribute("enable-consent-manager")}, but no button with id 'consent-manager-accept' found inside div with id 'consent-manager'. Please update your Webflow project.`);return}let r=t.querySelector("#consent-manager-decline");if(!r){console.error(`enable-consent-manager is ${(l=document.getElementById("devhaus-tracking-code"))==null?void 0:l.getAttribute("enable-consent-manager")}, but no button with id 'consent-manager-decline' found inside div with id 'consent-manager'. Please update your Webflow project.`);return}let s=document.getElementById("open-consent-manager");s||console.warn(`enable-consent-manager is ${(c=document.getElementById("devhaus-tracking-code"))==null?void 0:c.getAttribute("enable-consent-manager")}, but no button with id 'open-consent-manager' found. Please update your Webflow project.`);let o=localStorage.getItem("devhaus-tracking-code-allow-consent");o==="true"?k(e,!0):(k(e,!1),o||E(!0)),n.addEventListener("click",()=>{E(!1),k(e,!0),localStorage.setItem("devhaus-tracking-code-allow-consent","true")}),r.addEventListener("click",()=>{E(!1),k(e,!1),localStorage.setItem("devhaus-tracking-code-allow-consent","false")}),s==null||s.addEventListener("click",()=>{E(!0)})}function ne(e){var t,n;we({orgId:e,debug:((n=(t=document.getElementById("devhaus-tracking-code"))==null?void 0:t.getAttribute)==null?void 0:n.call(t,"fullstory-debug-mode"))==="true"})}function re(){let e=document.querySelector("#devhaus-tracking-code");if(e.hasAttribute("ga4"))try{let t=e.getAttribute("ga4"),n=e.getAttribute("ga4-debug-mode"),r=document.createElement("script");r.src=`https://www.googletagmanager.com/gtag/js?id=${t}`,r.setAttribute("async","true"),document.head.appendChild(r),window.dataLayer=window.dataLayer||[],A("js",new Date),!n&&t&&A("config",t),n&&t&&A("config",t,{send_page_view:!0,debug_mode:!0})}catch(t){}}function oe(e){return window.location.hostname.includes(e||"webflow.io")}function O(e,t,n,r,s){if(oe(r)&&n)return n;let o=window.location.hostname===s;return t&&(!s||o)?t:e}function ie(e,t="eu",n,r,s){var a;if(t==="false")return;window.consentManagerConfig=function(d){var p,y,h,C;let f,g;try{g=d.React,f=d.inEU}finally{let w=document.getElementById("devhaus-tracking-code"),M=(p=w==null?void 0:w.getAttribute("consent-banner-color"))!=null?p:"rgba(0,0,0,0)",P=(y=w==null?void 0:w.getAttribute("consent-banner-text-color"))!=null?y:"#ffffff",D=(h=w==null?void 0:w.getAttribute("consent-banner-content"))!=null?h:"We use cookies to improve your experience.",xe=g.createElement("span",{className:"consent-banner-content"},D),Le=(C=w==null?void 0:w.getAttribute("consent-banner-sub-content"))!=null?C:"You can change your preferences at any time.",Ie=g.createElement("span",{className:"consent-banner-sub-content"},Le);return{container:"#consent-manager",writeKey:O(e,e,n,r,s),bannerContent:xe,bannerSubContent:Ie,preferencesDialogTitle:"Website Data Collection Preferences",bannerTextColor:P,bannerBackgroundColor:M,preferencesDialogContent:"We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.",cancelDialogTitle:"Are you sure you want to cancel?",cancelDialogContent:"Your preferences have not been saved. By continuing to use our website, you're agreeing to our Website Data Collection Policy",closeBehavior:"accept",initialPreferences:{marketingAndAnalytics:!0,advertising:!0,functional:!0},shouldRequireConsent:()=>t==="true"||t==="eu"&&f()}}};let o=document.createElement("script");o.defer=!0,o.src="https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js",document.body.appendChild(o);let u=document.getElementById("devhaus-tracking-code");if(((a=u==null?void 0:u.getAttribute("include-built-in-banner"))!=null?a:"false")==="true"){let d=document.createElement("div");d.id="consent-manager",document.body.appendChild(d)}let l=document.getElementById("open-consent-manager");l||console.warn("#open-consent-manager Button doesn't exist. Please update your Webflow project.");let c=function(){window.consentManager.openConsentManager()};l==null||l.addEventListener("click",c)}function ae(e,t="true",n,r,s){var u;t!==null&&ie(e,t,n,r,s);let o=window.analytics=(u=window.analytics)!=null?u:[];if(!o.initialize){if(o.invoked)throw new Error("Segment snippet included twice.");o.invoked=!0,o.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware"],o.factory=function(i){return function(){let l=Array.prototype.slice.call(arguments);return l.unshift(i),o.push(l),o}};for(let i=0;i<o.methods.length;i++){let l=o.methods[i];o[l]=o.factory(l)}o.load=function(i,l){var d;let c=document.createElement("script");c.type="text/javascript",c.async=!0,c.src="https://cdn.segment.com/analytics.js/v1/"+i+"/analytics.min.js";let a=document.getElementsByTagName("script")[0];(d=a.parentNode)==null||d.insertBefore(c,a),o._loadOptions=l},o._writeKey=O(e,void 0,n),o.SNIPPET_VERSION="4.15.3",t==="false"&&o.load(O(e,void 0,n)),o.page()}}var m=document.getElementById("devhaus-tracking-code"),ce=m==null?void 0:m.getAttribute("segment-prod-write-key"),be,ot=(be=m==null?void 0:m.getAttribute("segment-dev-write-key"))!=null?be:void 0,he,it=(he=m==null?void 0:m.getAttribute("staging-domain"))!=null?he:void 0,Se,at=(Se=m==null?void 0:m.getAttribute("production-domain"))!=null?Se:void 0,_e,Oe=(_e=m==null?void 0:m.getAttribute("enable-consent-manager"))!=null?_e:"eu",Ae,st=(Ae=m==null?void 0:m.getAttribute("ga4"))!=null?Ae:"false",Ee,ve=(Ee=m==null?void 0:m.getAttribute("fullstory"))!=null?Ee:"false",ke,ct=(ke=m==null?void 0:m.getAttribute("is-dev"))!=null?ke:!1;ce&&ae(ce,Oe,ot,it,at);var se=[];ce||(st!=="false"&&(re(),se.push("ga4")),ve!=="false"&&(ne(ve),se.push("fullstory")),Oe!=="false"&&te(se));window.addEventListener("DOMContentLoaded",()=>{Q(ct==="true")});})();
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
