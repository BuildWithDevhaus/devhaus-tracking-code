"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js
  var require_cookie = __commonJS({
    "node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(exports) {
      "use strict";
      exports.parse = parse;
      exports.serialize = serialize;
      var __toString = Object.prototype.toString;
      var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function parse(str, options) {
        if (typeof str !== "string") {
          throw new TypeError("argument str must be a string");
        }
        var obj = {};
        var opt = options || {};
        var dec = opt.decode || decode;
        var index = 0;
        while (index < str.length) {
          var eqIdx = str.indexOf("=", index);
          if (eqIdx === -1) {
            break;
          }
          var endIdx = str.indexOf(";", index);
          if (endIdx === -1) {
            endIdx = str.length;
          } else if (endIdx < eqIdx) {
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
          }
          var key = str.slice(index, eqIdx).trim();
          if (void 0 === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            if (val.charCodeAt(0) === 34) {
              val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val, dec);
          }
          index = endIdx + 1;
        }
        return obj;
      }
      function serialize(name, val, options) {
        var opt = options || {};
        var enc = opt.encode || encode;
        if (typeof enc !== "function") {
          throw new TypeError("option encode is invalid");
        }
        if (!fieldContentRegExp.test(name)) {
          throw new TypeError("argument name is invalid");
        }
        var value = enc(val);
        if (value && !fieldContentRegExp.test(value)) {
          throw new TypeError("argument val is invalid");
        }
        var str = name + "=" + value;
        if (null != opt.maxAge) {
          var maxAge = opt.maxAge - 0;
          if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError("option maxAge is invalid");
          }
          str += "; Max-Age=" + Math.floor(maxAge);
        }
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError("option domain is invalid");
          }
          str += "; Domain=" + opt.domain;
        }
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError("option path is invalid");
          }
          str += "; Path=" + opt.path;
        }
        if (opt.expires) {
          var expires = opt.expires;
          if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError("option expires is invalid");
          }
          str += "; Expires=" + expires.toUTCString();
        }
        if (opt.httpOnly) {
          str += "; HttpOnly";
        }
        if (opt.secure) {
          str += "; Secure";
        }
        if (opt.priority) {
          var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
          switch (priority) {
            case "low":
              str += "; Priority=Low";
              break;
            case "medium":
              str += "; Priority=Medium";
              break;
            case "high":
              str += "; Priority=High";
              break;
            default:
              throw new TypeError("option priority is invalid");
          }
        }
        if (opt.sameSite) {
          var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
          switch (sameSite) {
            case true:
              str += "; SameSite=Strict";
              break;
            case "lax":
              str += "; SameSite=Lax";
              break;
            case "strict":
              str += "; SameSite=Strict";
              break;
            case "none":
              str += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return str;
      }
      function decode(str) {
        return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
      }
      function encode(val) {
        return encodeURIComponent(val);
      }
      function isDate(val) {
        return __toString.call(val) === "[object Date]" || val instanceof Date;
      }
      function tryDecode(str, decode2) {
        try {
          return decode2(str);
        } catch (e) {
          return str;
        }
      }
    }
  });

  // src/utils/filterGeoData.ts
  function filterGeoData(geoData) {
    const geoDataConverted = {
      ...geoData,
      network_provider: geoData.org
    };
    delete geoDataConverted.org;
    return geoDataConverted;
  }

  // src/utils/triggerIdentifyGeo.ts
  async function triggerIdentifyGeo() {
    const data = await fetch("https://ipapi.co/json/").then((res) => res.json());
    if (window.analytics) {
      window.analytics.identify(filterGeoData(data));
    }
  }

  // src/utils/resolvePropertyName.ts
  var resolvePropertyName = (propertyName = "") => {
    return /.+:.+/g.test(propertyName) ? propertyName.substring(0, propertyName.search(":")) : propertyName;
  };

  // src/utils/resolvePropertyValue.ts
  var resolvePropertyValue = (currentElement, propertyName = "", propertyValue = null, pageviewArray) => {
    if (propertyName === "path") {
      return window.location.pathname;
    }
    if (propertyName === "url") {
      return window.location.href.split("?")["0"];
    }
    if (/.+:.+/g.test(propertyName)) {
      const intendedName = propertyName.substring(0, propertyName.search(":"));
      const intendedValue = propertyName.substring(propertyName.search(":") + 1, propertyName.length);
      return resolvePropertyValue(currentElement, intendedName, intendedValue, pageviewArray);
    }
    if (propertyName) {
      switch (propertyValue) {
        case "innerHTML":
          return currentElement?.innerHTML;
        case "innerHTML-parseInt":
          return parseInt(currentElement.innerHTML);
        case "innerHTML-parseFloat":
          return parseFloat(currentElement.innerHTML);
        case "innerText":
          return currentElement?.innerText;
        case "innerText-parseInt":
          return parseInt(currentElement.innerText);
        case "innerText-parseFloat":
          return parseFloat(currentElement.innerText);
        case "url":
          return window.location.href.split("?")[0];
        case "boolean:true":
          return true;
        case "boolean:false":
          return false;
        case "grabPageview":
          const grabbedPageviewElem = pageviewArray.find(
            (elem) => elem?.dataset?.["pageviewPropertyName"] === propertyName
          );
          const pageviewElemValue = grabbedPageviewElem?.dataset?.["pageviewPropertyValue"] ?? "innerHTML";
          return resolvePropertyValue(
            grabbedPageviewElem,
            propertyName,
            pageviewElemValue,
            pageviewArray
          );
        case "grabAHref":
          let grabbedAHrefElem = currentElement?.getAttribute("href");
          if (grabbedAHrefElem?.includes("?")) {
            grabbedAHrefElem = grabbedAHrefElem?.split("?")[0];
          }
          return grabbedAHrefElem ?? currentElement?.innerHTML ?? "";
        default:
          return propertyValue;
      }
    }
  };

  // src/utils/getUTM.ts
  var import_cookie = __toESM(require_cookie(), 1);
  function getUTM(content = "") {
    const currentSearchQuery = window.location.search;
    const urlParams = new URLSearchParams(currentSearchQuery);
    const fromURL = urlParams?.get(content);
    if (!fromURL) {
      const cookies = import_cookie.default.parse(document.cookie);
      const fromCookie = cookies[content];
      if (!fromCookie) {
        if (content === "utm_source") return "direct";
        return null;
      }
      return fromCookie;
    }
    if (fromURL) {
      document.cookie = import_cookie.default.serialize(content, fromURL, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      return fromURL;
    }
  }

  // node_modules/.pnpm/@fullstory+browser@1.7.0/node_modules/@fullstory/browser/dist/index.esm.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var snippet = function snippet2(_ref) {
    var orgId = _ref.orgId, _ref$namespace = _ref.namespace, namespace = _ref$namespace === void 0 ? "FS" : _ref$namespace, _ref$debug = _ref.debug, _ref$host = _ref.host, host = _ref$host === void 0 ? "fullstory.com" : _ref$host, _ref$script = _ref.script, script = _ref$script === void 0 ? "edge.fullstory.com/s/fs.js" : _ref$script;
    if (!orgId) {
      throw new Error("FullStory orgId is a required parameter");
    }
    window["_fs_host"] = host;
    window["_fs_script"] = script;
    window["_fs_org"] = orgId;
    window["_fs_namespace"] = namespace;
    (function(m, n, e, t, l, o, g, y) {
      if (e in m) {
        if (m.console && m.console.log) {
          m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
        }
        return;
      }
      g = m[e] = function(a, b, s) {
        g.q ? g.q.push([a, b, s]) : g._api(a, b, s);
      };
      g.q = [];
      o = n.createElement(t);
      o.async = 1;
      o.crossOrigin = "anonymous";
      o.src = "https://" + _fs_script;
      y = n.getElementsByTagName(t)[0];
      y.parentNode.insertBefore(o, y);
      g.identify = function(i, v, s) {
        g(l, {
          uid: i
        }, s);
        if (v) g(l, v, s);
      };
      g.setUserVars = function(v, s) {
        g(l, v, s);
      };
      g.event = function(i, v, s) {
        g("event", {
          n: i,
          p: v
        }, s);
      };
      g.anonymize = function() {
        g.identify(false);
      };
      g.shutdown = function() {
        g("rec", false);
      };
      g.restart = function() {
        g("rec", true);
      };
      g.log = function(a, b) {
        g("log", [a, b]);
      };
      g.consent = function(a) {
        g("consent", !arguments.length || a);
      };
      g.identifyAccount = function(i, v) {
        o = "account";
        v = v || {};
        v.acctId = i;
        g(o, v);
      };
      g.clearUserCookie = function() {
      };
      g.setVars = function(n2, p) {
        g("setVars", [n2, p]);
      };
      g._w = {};
      y = "XMLHttpRequest";
      g._w[y] = m[y];
      y = "fetch";
      g._w[y] = m[y];
      if (m[y]) m[y] = function() {
        return g._w[y].apply(this, arguments);
      };
      g._v = "1.3.0";
    })(window, document, window["_fs_namespace"], "script", "user");
  };
  var fs = function fs2() {
    return window[window._fs_namespace];
  };
  var ensureSnippetLoaded = function ensureSnippetLoaded2() {
    var snippetLoaded = !!fs();
    if (!snippetLoaded) {
      throw Error("FullStory is not loaded, please ensure the init function is invoked before calling FullStory API functions");
    }
  };
  var hasFullStoryWithFunction = function hasFullStoryWithFunction2() {
    ensureSnippetLoaded();
    for (var _len = arguments.length, testNames = new Array(_len), _key = 0; _key < _len; _key++) {
      testNames[_key] = arguments[_key];
    }
    return testNames.every(function(current) {
      return fs()[current];
    });
  };
  var guard = function guard2(name) {
    return function() {
      if (window._fs_dev_mode) {
        var message = "FullStory is in dev mode and is not recording: ".concat(name, " method not executed");
        console.warn(message);
        return message;
      }
      if (hasFullStoryWithFunction(name)) {
        var _fs;
        return (_fs = fs())[name].apply(_fs, arguments);
      }
      console.warn("FS.".concat(name, " not ready"));
      return null;
    };
  };
  var event = guard("event");
  var log = guard("log");
  var getCurrentSessionURL = guard("getCurrentSessionURL");
  var identify = guard("identify");
  var setUserVars = guard("setUserVars");
  var consent = guard("consent");
  var shutdown = guard("shutdown");
  var restart = guard("restart");
  var anonymize = guard("anonymize");
  var setVars = guard("setVars");
  var _init = function _init2(inputOptions, readyCallback) {
    var options = _objectSpread2({}, inputOptions);
    if (fs()) {
      console.warn("The FullStory snippet has already been defined elsewhere (likely in the <head> element)");
      return;
    }
    if (options.recordCrossDomainIFrames) {
      window._fs_run_in_iframe = true;
    }
    if (options.recordOnlyThisIFrame) {
      window._fs_is_outer_script = true;
    }
    if (options.cookieDomain) {
      window._fs_cookie_domain = options.cookieDomain;
    }
    if (options.debug === true) {
      if (!options.script) {
        options.script = "edge.fullstory.com/s/fs-debug.js";
      } else {
        console.warn("Ignoring `debug = true` because `script` is set");
      }
    }
    snippet(options);
    if (readyCallback) {
      fs()("observe", {
        type: "start",
        callback: readyCallback
      });
    }
    if (options.devMode === true) {
      var message = "FullStory was initialized in devMode and will stop recording";
      event("FullStory Dev Mode", {
        message_str: message
      });
      shutdown();
      window._fs_dev_mode = true;
      console.warn(message);
    }
  };
  var initOnce = function initOnce2(fn, message) {
    return function() {
      if (window._fs_initialized) {
        if (message) console.warn(message);
        return;
      }
      fn.apply(void 0, arguments);
      window._fs_initialized = true;
    };
  };
  var init = initOnce(_init, "FullStory init has already been called once, additional invocations are ignored");

  // src/utils/triggerFullstoryEvent.ts
  function triggerFullstoryEvent(eventName = "", data = {}) {
    if (!document.getElementById("devhaus-tracking-code")?.getAttribute("fullstory")) return;
    event(eventName, data);
  }

  // src/utils/gtag.js
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // src/utils/isGA4Exist.ts
  function isGA4Exist() {
    const scriptTag2 = document.querySelector("#devhaus-tracking-code");
    return scriptTag2.hasAttribute("ga4");
  }

  // src/utils/triggerGA4Event.ts
  function triggerGA4Event(eventName, properties) {
    const eventNameConverted = eventName.replace(/ /g, "_").toLowerCase();
    if (isGA4Exist()) gtag("event", eventNameConverted, properties);
  }

  // src/utils/triggerSegmentEvent.ts
  function triggerSegmentEvent(eventName = "", data = {}, isDev2 = false) {
    const dataSend = {
      ...data,
      metadata: {
        utm_source: getUTM("utm_source"),
        utm_medium: getUTM("utm_medium"),
        utm_campaign: getUTM("utm_campaign")
      }
    };
    if (isDev2) {
      console.log(`Segment - Event`, eventName, dataSend);
    }
    triggerGA4Event(eventName, data);
    triggerFullstoryEvent(eventName, dataSend);
    if (window?.analytics) {
      window?.analytics?.track(eventName, dataSend);
    }
  }

  // src/events/bodyTagEvents.ts
  function bodyTagEvents(eventName, element, pageviewElements, isDev2 = false) {
    const pageviewArray = Array.from(pageviewElements);
    const properties = {};
    for (let i = 1; i <= 100; i++) {
      const propertyName = element.dataset?.["propertyName" + i];
      const propertyValue = element.dataset?.["propertyValue" + i];
      if (propertyName) {
        properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
          element,
          propertyName,
          propertyValue,
          pageviewArray
        );
      } else break;
    }
    pageviewElements.forEach((pel) => {
      const pageviewElement = pel;
      const propertyName = pageviewElement.dataset?.["pageviewPropertyName"];
      const propertyValue = pageviewElement.dataset?.["pageviewPropertyValue"] ?? "innerHTML";
      const resolvedPropertyName = resolvePropertyName(propertyName);
      if (properties[resolvePropertyName(propertyName)]) {
        const arr = properties[resolvedPropertyName];
        if (typeof arr === "string") {
          properties[resolvedPropertyName] = [
            arr,
            resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray)
          ];
        } else if (Array.isArray(arr)) {
          properties[resolvedPropertyName] = [
            ...arr,
            resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray)
          ];
        }
      } else {
        if (pageviewElement.getAttribute("data-multi-reference") === "true") {
          properties[resolvedPropertyName] = [
            resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray)
          ];
        } else {
          properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
            pageviewElement,
            propertyName,
            propertyValue,
            pageviewArray
          );
        }
      }
    });
    triggerSegmentEvent(eventName, properties, isDev2);
  }

  // src/utils/triggerFullstoryIdentify.ts
  function extractDisplayNameAndEmail(data = {}) {
    const { first_name, last_name, full_name, email } = data;
    if (first_name && last_name) {
      delete data.first_name;
      delete data.last_name;
      return {
        displayName: `${first_name} ${last_name}`,
        email,
        ...data
      };
    }
    if (full_name) {
      delete data.full_name;
      return {
        displayName: full_name,
        email,
        ...data
      };
    }
    return {
      displayName: "",
      email,
      ...data
    };
  }
  function triggerFullstoryIdentify(data) {
    if (!document.getElementById("devhaus-tracking-code")?.getAttribute("fullstory")) return;
    setUserVars(extractDisplayNameAndEmail(data));
  }

  // src/utils/triggerSegmentIdentify.ts
  function triggerSegmentIdentify(data = {}, isDev2 = false) {
    triggerFullstoryIdentify(data);
    if (window.analytics) {
      window.analytics.identify(data);
    }
    if (isDev2) console.log(`Segment - Identify`, data);
  }

  // src/events/cmsElementEvents.ts
  function cmsElementEvent(element, properties, pageviewElements) {
    const pageviewArray = Array.from(pageviewElements);
    const searchElement = element.closest("[data-wrapper]");
    const allElements = searchElement.querySelectorAll("[data-property-name]");
    for (let i = 0; i < allElements.length; i++) {
      const elem = allElements[i];
      const name = elem.dataset?.["propertyName"];
      const value = elem.dataset?.["propertyValue"] ?? "innerHTML";
      properties[resolvePropertyName(name)] = resolvePropertyValue(elem, name, value, pageviewArray);
    }
  }

  // src/events/formSubmitEvents.ts
  function formSubmitEvent(element, properties, identifyProperties) {
    const form = element.tagName === "FORM" ? element : element?.parentElement;
    const formElements = form?.elements ?? [];
    [...formElements].forEach((fe) => {
      const formElement = fe;
      if (formElement !== element) {
        const name = formElement?.name.toLowerCase();
        let value = formElement?.value;
        const isIdentify = formElement?.dataset?.["identify"] === "true";
        const dataParseInt = formElement?.dataset?.["parseInt"] === "true";
        const dataParseFloat = formElement?.dataset?.["parseFloat"] === "true";
        if (dataParseInt) value = parseInt(value);
        if (dataParseFloat) value = parseFloat(value);
        const isBothIdentifyAndTrack = formElement?.dataset?.["bothIdentifyAndTrack"] === "true";
        const isTrack = formElement?.dataset?.["track"] === "true";
        const isIgnored = formElement?.dataset?.["ignore"] === "true";
        if (name && value && !isIgnored) {
          if (isIdentify || isBothIdentifyAndTrack) {
            if (Array.isArray(identifyProperties[name]))
              identifyProperties[name].push(value);
            else if (identifyProperties[name] !== void 0)
              identifyProperties[name] = [identifyProperties[name], value];
            else identifyProperties[name] = value;
          }
          if (isTrack || isBothIdentifyAndTrack) {
            if (Array.isArray(properties[name]))
              properties[name].push(value);
            else if (properties[name] !== void 0)
              properties[name] = [properties[name], value];
            else properties[name] = value;
          }
        }
      }
    });
  }

  // src/events/nonBodyTagEvents.ts
  function nonBodyTagEvents(eventName, element, pageviewElements, isDev2 = false) {
    const pageviewArray = Array.from(pageviewElements);
    const properties = {};
    const identifyProperties = {};
    if (eventName) {
      for (let i = 1; i <= 100; i++) {
        const propertyName = element.dataset?.["propertyName" + i];
        const propertyValue = element.dataset?.["propertyValue" + i];
        if (propertyName) {
          properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
            element,
            propertyName,
            propertyValue,
            pageviewArray
          );
        } else break;
      }
      const clickEvent = () => {
        if (
          // (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'submit') ||
          // element.dataset?.['submitButton'] === 'true' ||
          element.tagName === "FORM"
        ) {
          formSubmitEvent(element, properties, identifyProperties);
        }
        if (element.dataset?.["cms"] === "true") {
          cmsElementEvent(element, properties, pageviewElements);
        }
        if (Object.keys(identifyProperties).length > 0) {
          triggerSegmentIdentify(identifyProperties, isDev2);
        }
        triggerSegmentEvent(eventName, properties, isDev2);
      };
      if (element.tagName === "FORM")
        element.addEventListener("submit", (e) => {
          clickEvent();
        });
      else element.addEventListener("click", clickEvent);
    }
  }

  // src/segmentTrackingCode.ts
  function segmentTrackingCode(isDev2 = false) {
    const allSegmentElements = document.querySelectorAll("[data-segment-event]");
    const allEvents = document.querySelectorAll("[data-event]");
    const pageviewElements = document.querySelectorAll("[data-pageview-proprty-name]");
    triggerIdentifyGeo();
    [...allEvents, ...allSegmentElements].forEach((el) => {
      const element = el;
      const eventName = element.dataset["event"] ?? element.dataset["segmentEvent"];
      if (eventName && element.tagName === "BODY") {
        bodyTagEvents(eventName, element, pageviewElements, isDev2);
      }
      if (eventName && element.tagName !== "BODY") {
        nonBodyTagEvents(eventName, element, pageviewElements, isDev2);
      }
      element.removeAttribute("data-event");
      element.removeAttribute("data-segment-event");
      element.removeAttribute("data-pageview-property-name");
      [...element.attributes].forEach((attr) => {
        if (attr.name.includes("data-property-name")) {
          element.removeAttribute(attr.name);
        }
        if (attr.name.includes("data-property-value")) {
          element.removeAttribute(attr.name);
        }
      });
    });
  }

  // src/utils/generic_consent_manager/displayGenericConsentManagerBanner.ts
  function displayGenericConsentManagerBanner(toggle) {
    const banner = document.getElementById("consent-manager");
    if (banner) {
      banner.style.display = toggle ? "block" : "none";
    }
  }

  // src/utils/generic_consent_manager/consent_checker/fullstoryConsentChecker.ts
  function fullstoryConsentChecker(enableTracking) {
    consent(enableTracking);
  }

  // src/utils/generic_consent_manager/consent_checker/ga4ConsentChecker.ts
  function ga4ConsentChecker(enableTracking) {
    window.gtag("consent", "update", {
      ad_storage: enableTracking ? "granted" : "denied",
      analytics_storage: enableTracking ? "granted" : "denied"
    });
  }

  // src/utils/generic_consent_manager/toggleConsent.ts
  function toggleConsent(tools, enableTracking) {
    tools.forEach((tool) => {
      switch (tool) {
        case "fullstory":
          fullstoryConsentChecker(enableTracking);
          break;
        default:
          ga4ConsentChecker(enableTracking);
      }
    });
  }

  // src/utils/generic_consent_manager/loadGenericConsentManager.ts
  function loadGenericConsentManager(tools) {
    const consentManagerDiv = document.getElementById("consent-manager");
    if (!consentManagerDiv) {
      console.error(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no div with id 'consent-manager' found. Please update your Webflow project.`
      );
      return;
    }
    const acceptButton = consentManagerDiv.querySelector("#consent-manager-accept");
    if (!acceptButton) {
      console.error(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no button with id 'consent-manager-accept' found inside div with id 'consent-manager'. Please update your Webflow project.`
      );
      return;
    }
    const declineButton = consentManagerDiv.querySelector("#consent-manager-decline");
    if (!declineButton) {
      console.error(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no button with id 'consent-manager-decline' found inside div with id 'consent-manager'. Please update your Webflow project.`
      );
      return;
    }
    const openConsentManagerButton = document.getElementById("open-consent-manager");
    if (!openConsentManagerButton) {
      console.warn(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no button with id 'open-consent-manager' found. Please update your Webflow project.`
      );
    }
    const allowConsent = localStorage.getItem("devhaus-tracking-code-allow-consent");
    if (allowConsent === "true") {
      toggleConsent(tools, true);
    } else {
      toggleConsent(tools, false);
      if (!allowConsent) displayGenericConsentManagerBanner(true);
    }
    acceptButton.addEventListener("click", () => {
      displayGenericConsentManagerBanner(false);
      toggleConsent(tools, true);
      localStorage.setItem("devhaus-tracking-code-allow-consent", "true");
    });
    declineButton.addEventListener("click", () => {
      displayGenericConsentManagerBanner(false);
      toggleConsent(tools, false);
      localStorage.setItem("devhaus-tracking-code-allow-consent", "false");
    });
    openConsentManagerButton?.addEventListener("click", () => {
      displayGenericConsentManagerBanner(true);
    });
  }

  // src/utils/initiateFullstory.ts
  function initiateFullstory(key) {
    init({
      orgId: key,
      debug: document.getElementById("devhaus-tracking-code")?.getAttribute?.("fullstory-debug-mode") === "true"
    });
  }

  // src/utils/initiateGA4.js
  function initiateGA4() {
    const scriptTag2 = document.querySelector("#devhaus-tracking-code");
    if (scriptTag2.hasAttribute("ga4")) {
      try {
        const ga4MeasurementId = scriptTag2.getAttribute("ga4");
        const ga4Debug = scriptTag2.getAttribute("ga4-debug-mode");
        const gtagScript = document.createElement("script");
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
        gtagScript.setAttribute("async", "true");
        document.head.appendChild(gtagScript);
        window.dataLayer = window.dataLayer || [];
        gtag("js", /* @__PURE__ */ new Date());
        if (!ga4Debug && ga4MeasurementId) {
          gtag("config", ga4MeasurementId);
        }
        if (ga4Debug && ga4MeasurementId) {
          gtag("config", ga4MeasurementId, {
            send_page_view: true,
            debug_mode: true
          });
        }
      } catch (error) {
      }
    }
  }

  // src/utils/isDevEnvironment.ts
  function isDevEnvironment(stagingDomain2) {
    return window.location.hostname.includes(stagingDomain2 || "webflow.io");
  }

  // src/utils/getCorrectWriteKey.ts
  function getCorrectWriteKey(writeKey, prodWriteKey, devWriteKey, stagingDomain2, productionDomain2) {
    if (isDevEnvironment(stagingDomain2) && devWriteKey) {
      return devWriteKey;
    }
    const isCorrectProductionDomain = window.location.hostname === productionDomain2;
    if (prodWriteKey && (productionDomain2 ? isCorrectProductionDomain : true)) {
      return prodWriteKey;
    }
    return writeKey;
  }

  // src/utils/loadSegmentConsentManager.ts
  function loadSegmentConsentManager(prodWriteKey, alwaysRequireConsent = "eu", devWriteKey, stagingDomain2, productionDomain2) {
    if (alwaysRequireConsent === "false") {
      return;
    }
    window.consentManagerConfig = function(exports) {
      let inEU, React;
      try {
        React = exports.React;
        inEU = exports.inEU;
      } finally {
        const devhausTrackingCode2 = document.getElementById("devhaus-tracking-code");
        const bannerColor = devhausTrackingCode2?.getAttribute("consent-banner-color") ?? "rgba(0,0,0,0)";
        const bannerTextColor = devhausTrackingCode2?.getAttribute("consent-banner-text-color") ?? "#ffffff";
        const bannerContentText = devhausTrackingCode2?.getAttribute("consent-banner-content") ?? "We use cookies to improve your experience.";
        const bannerContent = React.createElement(
          "span",
          { className: "consent-banner-content" },
          bannerContentText
        );
        const bannerSubContentText = devhausTrackingCode2?.getAttribute("consent-banner-sub-content") ?? "You can change your preferences at any time.";
        const bannerSubContent = React.createElement(
          "span",
          { className: "consent-banner-sub-content" },
          bannerSubContentText
        );
        return {
          container: "#consent-manager",
          writeKey: getCorrectWriteKey(
            prodWriteKey,
            prodWriteKey,
            devWriteKey,
            stagingDomain2,
            productionDomain2
          ),
          bannerContent,
          bannerSubContent,
          preferencesDialogTitle: "Website Data Collection Preferences",
          bannerTextColor,
          bannerBackgroundColor: bannerColor,
          preferencesDialogContent: "We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.",
          cancelDialogTitle: "Are you sure you want to cancel?",
          cancelDialogContent: "Your preferences have not been saved. By continuing to use our website, you're agreeing to our Website Data Collection Policy",
          closeBehavior: "accept",
          initialPreferences: {
            marketingAndAnalytics: true,
            advertising: true,
            functional: true
          },
          shouldRequireConsent: () => alwaysRequireConsent === "true" || alwaysRequireConsent === "eu" && inEU()
        };
      }
    };
    const consentManagerScript = document.createElement("script");
    consentManagerScript.defer = true;
    consentManagerScript.src = "https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js";
    document.body.appendChild(consentManagerScript);
    const devhausTrackingCode = document.getElementById("devhaus-tracking-code");
    const includeBuiltInBanner = devhausTrackingCode?.getAttribute("include-built-in-banner") ?? "false";
    if (includeBuiltInBanner === "true") {
      const banner = document.createElement("div");
      banner.id = "consent-manager";
      document.body.appendChild(banner);
    }
    const buttonConsentManager = document.getElementById("open-consent-manager");
    if (!buttonConsentManager) {
      console.warn("#open-consent-manager Button doesn't exist. Please update your Webflow project.");
    }
    const openConsentManager = function() {
      window.consentManager.openConsentManager();
    };
    buttonConsentManager?.addEventListener("click", openConsentManager);
  }

  // src/utils/loadSegmentAnalytics.ts
  function loadSegmentAnalytics(prodWriteKey, enableConsentManager2 = "true", devWriteKey, stagingDomain2, productionDomain2) {
    if (enableConsentManager2 !== null) {
      loadSegmentConsentManager(
        prodWriteKey,
        enableConsentManager2,
        devWriteKey,
        stagingDomain2,
        productionDomain2
      );
    }
    const analytics = window.analytics = window.analytics ?? [];
    if (!analytics.initialize)
      if (analytics.invoked) throw new Error("Segment snippet included twice.");
      else {
        analytics.invoked = true;
        analytics.methods = [
          "trackSubmit",
          "trackClick",
          "trackLink",
          "trackForm",
          "pageview",
          "identify",
          "reset",
          "group",
          "track",
          "ready",
          "alias",
          "debug",
          "page",
          "once",
          "off",
          "on",
          "addSourceMiddleware"
          // 'addIntegrationMiddleware',
          // 'setAnonymousId',
          // 'addDestinationMiddleware',
        ];
        analytics.factory = function(e) {
          return function() {
            const t = Array.prototype.slice.call(arguments);
            t.unshift(e);
            analytics.push(t);
            return analytics;
          };
        };
        for (let e = 0; e < analytics.methods.length; e++) {
          const key = analytics.methods[e];
          analytics[key] = analytics.factory(key);
        }
        analytics.load = function(key, e) {
          const t = document.createElement("script");
          t.type = "text/javascript";
          t.async = true;
          t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
          const n = document.getElementsByTagName("script")[0];
          n.parentNode?.insertBefore(t, n);
          analytics._loadOptions = e;
        };
        analytics._writeKey = getCorrectWriteKey(prodWriteKey, void 0, devWriteKey);
        analytics.SNIPPET_VERSION = "4.15.3";
        if (enableConsentManager2 === "false")
          analytics.load(getCorrectWriteKey(prodWriteKey, void 0, devWriteKey));
        analytics.page();
      }
  }

  // src/index.ts
  var scriptTag = document.getElementById("devhaus-tracking-code");
  var segmentProductionWriteKey = scriptTag?.getAttribute("segment-prod-write-key");
  var segmentDevWriteKey = scriptTag?.getAttribute("segment-dev-write-key") ?? void 0;
  var stagingDomain = scriptTag?.getAttribute("staging-domain") ?? void 0;
  var productionDomain = scriptTag?.getAttribute("production-domain") ?? void 0;
  var enableConsentManager = scriptTag?.getAttribute("enable-consent-manager") ?? "eu";
  var ga4 = scriptTag?.getAttribute("ga4") ?? "false";
  var fullstory = scriptTag?.getAttribute("fullstory") ?? "false";
  var isDev = scriptTag?.getAttribute("is-dev") ?? false;
  if (segmentProductionWriteKey) {
    loadSegmentAnalytics(
      segmentProductionWriteKey,
      enableConsentManager,
      segmentDevWriteKey,
      stagingDomain,
      productionDomain
    );
  }
  var enabledStandaloneTools = [];
  if (!segmentProductionWriteKey) {
    if (ga4 !== "false") {
      initiateGA4();
      enabledStandaloneTools.push("ga4");
    }
    if (fullstory !== "false") {
      initiateFullstory(fullstory);
      enabledStandaloneTools.push("fullstory");
    }
    if (enableConsentManager !== "false") {
      loadGenericConsentManager(enabledStandaloneTools);
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    segmentTrackingCode(isDev === "true" ? true : false);
  });
})();
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
//# sourceMappingURL=index.js.map
