"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function")
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
    mod
  ));

  // node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js
  var require_cookie = __commonJS({
    "node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(exports) {
      "use strict";
      exports.parse = parse;
      exports.serialize = serialize;
      var __toString = Object.prototype.toString, fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function parse(str, options) {
        if (typeof str != "string")
          throw new TypeError("argument str must be a string");
        for (var obj = {}, opt = options || {}, dec = opt.decode || decode, index = 0; index < str.length; ) {
          var eqIdx = str.indexOf("=", index);
          if (eqIdx === -1)
            break;
          var endIdx = str.indexOf(";", index);
          if (endIdx === -1)
            endIdx = str.length;
          else if (endIdx < eqIdx) {
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
          }
          var key = str.slice(index, eqIdx).trim();
          if (obj[key] === void 0) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            val.charCodeAt(0) === 34 && (val = val.slice(1, -1)), obj[key] = tryDecode(val, dec);
          }
          index = endIdx + 1;
        }
        return obj;
      }
      function serialize(name, val, options) {
        var opt = options || {}, enc = opt.encode || encode;
        if (typeof enc != "function")
          throw new TypeError("option encode is invalid");
        if (!fieldContentRegExp.test(name))
          throw new TypeError("argument name is invalid");
        var value = enc(val);
        if (value && !fieldContentRegExp.test(value))
          throw new TypeError("argument val is invalid");
        var str = name + "=" + value;
        if (opt.maxAge != null) {
          var maxAge = opt.maxAge - 0;
          if (isNaN(maxAge) || !isFinite(maxAge))
            throw new TypeError("option maxAge is invalid");
          str += "; Max-Age=" + Math.floor(maxAge);
        }
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain))
            throw new TypeError("option domain is invalid");
          str += "; Domain=" + opt.domain;
        }
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path))
            throw new TypeError("option path is invalid");
          str += "; Path=" + opt.path;
        }
        if (opt.expires) {
          var expires = opt.expires;
          if (!isDate(expires) || isNaN(expires.valueOf()))
            throw new TypeError("option expires is invalid");
          str += "; Expires=" + expires.toUTCString();
        }
        if (opt.httpOnly && (str += "; HttpOnly"), opt.secure && (str += "; Secure"), opt.priority) {
          var priority = typeof opt.priority == "string" ? opt.priority.toLowerCase() : opt.priority;
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
          var sameSite = typeof opt.sameSite == "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
          switch (sameSite) {
            case !0:
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
        } catch {
          return str;
        }
      }
    }
  });

  // src/utils/filterGeoData.ts
  function filterGeoData(geoData) {
    let geoDataConverted = {
      ...geoData,
      network_provider: geoData.org
    };
    return delete geoDataConverted.org, geoDataConverted;
  }

  // src/utils/triggerIdentifyGeo.ts
  async function triggerIdentifyGeo() {
    let data = await fetch("https://ipapi.co/json/").then((res) => res.json());
    window.analytics && window.analytics.identify(filterGeoData(data));
  }

  // src/utils/resolvePropertyName.ts
  var resolvePropertyName = (propertyName = "") => /.+:.+/g.test(propertyName) ? propertyName.substring(0, propertyName.search(":")) : propertyName;

  // src/utils/resolvePropertyValue.ts
  var resolvePropertyValue = (currentElement, propertyName = "", propertyValue = null, pageviewArray) => {
    if (propertyName === "path")
      return window.location.pathname;
    if (propertyName === "url")
      return window.location.href.split("?")[0];
    if (/.+:.+/g.test(propertyName)) {
      let intendedName = propertyName.substring(0, propertyName.search(":")), intendedValue = propertyName.substring(propertyName.search(":") + 1, propertyName.length);
      return resolvePropertyValue(currentElement, intendedName, intendedValue, pageviewArray);
    }
    if (propertyName)
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
          return !0;
        case "boolean:false":
          return !1;
        case "grabPageview":
          let grabbedPageviewElem = pageviewArray.find(
            (elem) => elem?.dataset?.pageviewPropertyName === propertyName
          ), pageviewElemValue = grabbedPageviewElem?.dataset?.pageviewPropertyValue ?? "innerHTML";
          return resolvePropertyValue(
            grabbedPageviewElem,
            propertyName,
            pageviewElemValue,
            pageviewArray
          );
        case "grabAHref":
          let grabbedAHrefElem = currentElement?.getAttribute("href");
          return grabbedAHrefElem?.includes("?") && (grabbedAHrefElem = grabbedAHrefElem?.split("?")[0]), grabbedAHrefElem ?? currentElement?.innerHTML ?? "";
        default:
          return propertyValue;
      }
  };

  // src/utils/getUTM.ts
  var import_cookie = __toESM(require_cookie(), 1);
  function getUTM(content = "") {
    let currentSearchQuery = window.location.search, fromURL = new URLSearchParams(currentSearchQuery)?.get(content);
    if (!fromURL) {
      let fromCookie = import_cookie.default.parse(document.cookie)[content];
      return fromCookie || (content === "utm_source" ? "direct" : null);
    }
    if (fromURL)
      return document.cookie = import_cookie.default.serialize(content, fromURL, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      }), fromURL;
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
      var source = arguments[i] != null ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    return key in obj ? Object.defineProperty(obj, key, {
      value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : obj[key] = value, obj;
  }
  var snippet = function(_ref) {
    var orgId = _ref.orgId, _ref$namespace = _ref.namespace, namespace = _ref$namespace === void 0 ? "FS" : _ref$namespace, _ref$debug = _ref.debug, _ref$host = _ref.host, host = _ref$host === void 0 ? "fullstory.com" : _ref$host, _ref$script = _ref.script, script = _ref$script === void 0 ? "edge.fullstory.com/s/fs.js" : _ref$script;
    if (!orgId)
      throw new Error("FullStory orgId is a required parameter");
    window._fs_host = host, window._fs_script = script, window._fs_org = orgId, window._fs_namespace = namespace, function(m, n, e, t, l, o, g, y) {
      if (e in m) {
        m.console && m.console.log && m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
        return;
      }
      g = m[e] = function(a, b, s) {
        g.q ? g.q.push([a, b, s]) : g._api(a, b, s);
      }, g.q = [], o = n.createElement(t), o.async = 1, o.crossOrigin = "anonymous", o.src = "https://" + _fs_script, y = n.getElementsByTagName(t)[0], y.parentNode.insertBefore(o, y), g.identify = function(i, v, s) {
        g(l, {
          uid: i
        }, s), v && g(l, v, s);
      }, g.setUserVars = function(v, s) {
        g(l, v, s);
      }, g.event = function(i, v, s) {
        g("event", {
          n: i,
          p: v
        }, s);
      }, g.anonymize = function() {
        g.identify(!1);
      }, g.shutdown = function() {
        g("rec", !1);
      }, g.restart = function() {
        g("rec", !0);
      }, g.log = function(a, b) {
        g("log", [a, b]);
      }, g.consent = function(a) {
        g("consent", !arguments.length || a);
      }, g.identifyAccount = function(i, v) {
        o = "account", v = v || {}, v.acctId = i, g(o, v);
      }, g.clearUserCookie = function() {
      }, g.setVars = function(n2, p) {
        g("setVars", [n2, p]);
      }, g._w = {}, y = "XMLHttpRequest", g._w[y] = m[y], y = "fetch", g._w[y] = m[y], m[y] && (m[y] = function() {
        return g._w[y].apply(this, arguments);
      }), g._v = "1.3.0";
    }(window, document, window._fs_namespace, "script", "user");
  }, fs = function() {
    return window[window._fs_namespace];
  }, ensureSnippetLoaded = function() {
    var snippetLoaded = !!fs();
    if (!snippetLoaded)
      throw Error("FullStory is not loaded, please ensure the init function is invoked before calling FullStory API functions");
  }, hasFullStoryWithFunction = function() {
    ensureSnippetLoaded();
    for (var _len = arguments.length, testNames = new Array(_len), _key = 0; _key < _len; _key++)
      testNames[_key] = arguments[_key];
    return testNames.every(function(current) {
      return fs()[current];
    });
  }, guard = function(name) {
    return function() {
      if (window._fs_dev_mode) {
        var message = "FullStory is in dev mode and is not recording: ".concat(name, " method not executed");
        return console.warn(message), message;
      }
      if (hasFullStoryWithFunction(name)) {
        var _fs;
        return (_fs = fs())[name].apply(_fs, arguments);
      }
      return console.warn("FS.".concat(name, " not ready")), null;
    };
  }, event = guard("event"), log = guard("log"), getCurrentSessionURL = guard("getCurrentSessionURL"), identify = guard("identify"), setUserVars = guard("setUserVars"), consent = guard("consent"), shutdown = guard("shutdown"), restart = guard("restart"), anonymize = guard("anonymize"), setVars = guard("setVars"), _init = function(inputOptions, readyCallback) {
    var options = _objectSpread2({}, inputOptions);
    if (fs()) {
      console.warn("The FullStory snippet has already been defined elsewhere (likely in the <head> element)");
      return;
    }
    if (options.recordCrossDomainIFrames && (window._fs_run_in_iframe = !0), options.recordOnlyThisIFrame && (window._fs_is_outer_script = !0), options.cookieDomain && (window._fs_cookie_domain = options.cookieDomain), options.debug === !0 && (options.script ? console.warn("Ignoring `debug = true` because `script` is set") : options.script = "edge.fullstory.com/s/fs-debug.js"), snippet(options), readyCallback && fs()("observe", {
      type: "start",
      callback: readyCallback
    }), options.devMode === !0) {
      var message = "FullStory was initialized in devMode and will stop recording";
      event("FullStory Dev Mode", {
        message_str: message
      }), shutdown(), window._fs_dev_mode = !0, console.warn(message);
    }
  }, initOnce = function(fn, message) {
    return function() {
      if (window._fs_initialized) {
        message && console.warn(message);
        return;
      }
      fn.apply(void 0, arguments), window._fs_initialized = !0;
    };
  }, init = initOnce(_init, "FullStory init has already been called once, additional invocations are ignored");

  // src/utils/triggerFullstoryEvent.ts
  function triggerFullstoryEvent(eventName = "", data = {}) {
    document.getElementById("devhaus-tracking-code")?.getAttribute("fullstory") && event(eventName, data);
  }

  // src/utils/gtag.js
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // src/utils/isGA4Exist.ts
  function isGA4Exist() {
    return document.querySelector("#devhaus-tracking-code").hasAttribute("ga4");
  }

  // src/utils/triggerGA4Event.ts
  function triggerGA4Event(eventName, properties) {
    let eventNameConverted = eventName.replace(/ /g, "_").toLowerCase();
    isGA4Exist() && gtag("event", eventNameConverted, properties);
  }

  // src/utils/triggerSegmentEvent.ts
  function triggerSegmentEvent(eventName = "", data = {}, isDev2 = !1) {
    let dataSend = {
      ...data,
      metadata: {
        utm_source: getUTM("utm_source"),
        utm_medium: getUTM("utm_medium"),
        utm_campaign: getUTM("utm_campaign")
      }
    };
    isDev2 && console.log("Segment - Event", eventName, dataSend), triggerGA4Event(eventName, data), triggerFullstoryEvent(eventName, dataSend), window?.analytics && window?.analytics?.track(eventName, dataSend);
  }

  // src/events/bodyTagEvents.ts
  function bodyTagEvents(eventName, element, pageviewElements, isDev2 = !1) {
    let pageviewArray = Array.from(pageviewElements), properties = {};
    for (let i = 1; i <= 100; i++) {
      let propertyName = element.dataset?.["propertyName" + i], propertyValue = element.dataset?.["propertyValue" + i];
      if (propertyName)
        properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
          element,
          propertyName,
          propertyValue,
          pageviewArray
        );
      else break;
    }
    pageviewElements.forEach((pel) => {
      let pageviewElement = pel, propertyName = pageviewElement.dataset?.pageviewPropertyName, propertyValue = pageviewElement.dataset?.pageviewPropertyValue ?? "innerHTML", resolvedPropertyName = resolvePropertyName(propertyName);
      if (properties[resolvePropertyName(propertyName)]) {
        let arr = properties[resolvedPropertyName];
        typeof arr == "string" ? properties[resolvedPropertyName] = [
          arr,
          resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray)
        ] : Array.isArray(arr) && (properties[resolvedPropertyName] = [
          ...arr,
          resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray)
        ]);
      } else
        pageviewElement.getAttribute("data-multi-reference") === "true" ? properties[resolvedPropertyName] = [
          resolvePropertyValue(pageviewElement, propertyName, propertyValue, pageviewArray)
        ] : properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
          pageviewElement,
          propertyName,
          propertyValue,
          pageviewArray
        );
    }), triggerSegmentEvent(eventName, properties, isDev2);
  }

  // src/utils/triggerFullstoryIdentify.ts
  function extractDisplayNameAndEmail(data = {}) {
    let { first_name, last_name, full_name, email } = data;
    return first_name && last_name ? (delete data.first_name, delete data.last_name, {
      displayName: `${first_name} ${last_name}`,
      email,
      ...data
    }) : full_name ? (delete data.full_name, {
      displayName: full_name,
      email,
      ...data
    }) : {
      displayName: "",
      email,
      ...data
    };
  }
  function triggerFullstoryIdentify(data) {
    document.getElementById("devhaus-tracking-code")?.getAttribute("fullstory") && setUserVars(extractDisplayNameAndEmail(data));
  }

  // src/utils/triggerSegmentIdentify.ts
  function triggerSegmentIdentify(data = {}, isDev2 = !1) {
    triggerFullstoryIdentify(data), window.analytics && window.analytics.identify(data), isDev2 && console.log("Segment - Identify", data);
  }

  // src/events/cmsElementEvents.ts
  function cmsElementEvent(element, properties, pageviewElements) {
    let pageviewArray = Array.from(pageviewElements), allElements = element.closest("[data-wrapper]").querySelectorAll("[data-property-name]");
    for (let i = 0; i < allElements.length; i++) {
      let elem = allElements[i], name = elem.dataset?.propertyName, value = elem.dataset?.propertyValue ?? "innerHTML";
      properties[resolvePropertyName(name)] = resolvePropertyValue(elem, name, value, pageviewArray);
    }
  }

  // src/events/formSubmitEvents.ts
  function formSubmitEvent(element, properties, identifyProperties) {
    [...element.closest("form")?.elements ?? []].forEach((fe) => {
      let formElement = fe;
      if (formElement !== element) {
        let id = formElement?.id.toLowerCase(), value = formElement?.value, isPII = formElement?.dataset?.identify === "true", isBothPIIAndTrack = formElement?.dataset?.bothIdentifyAndTrack === "true", isIgnored = formElement?.dataset?.ignore === "true";
        id && value && !isIgnored && (isPII || isBothPIIAndTrack ? (identifyProperties[id] = value, isBothPIIAndTrack && (properties[id] = value)) : properties[id] = value);
      }
    });
  }

  // src/events/nonBodyTagEvents.ts
  function nonBodyTagEvents(eventName, element, pageviewElements, isDev2 = !1) {
    let pageviewArray = Array.from(pageviewElements), properties = {}, identifyProperties = {};
    if (eventName) {
      for (let i = 1; i <= 100; i++) {
        let propertyName = element.dataset?.["propertyName" + i], propertyValue = element.dataset?.["propertyValue" + i];
        if (propertyName)
          properties[resolvePropertyName(propertyName)] = resolvePropertyValue(
            element,
            propertyName,
            propertyValue,
            pageviewArray
          );
        else break;
      }
      let clickEvent = () => {
        (element.tagName === "INPUT" && element.type === "submit" || element.dataset?.submitButton === "true") && formSubmitEvent(element, properties, identifyProperties), element.dataset?.cms === "true" && cmsElementEvent(element, properties, pageviewElements), triggerSegmentEvent(eventName, properties, isDev2), Object.keys(identifyProperties).length > 0 && triggerSegmentIdentify(identifyProperties, isDev2);
      };
      element.addEventListener("click", clickEvent);
    }
  }

  // src/segmentTrackingCode.ts
  function segmentTrackingCode(isDev2 = !1) {
    let allSegmentElements = document.querySelectorAll("[data-segment-event]"), allEvents = document.querySelectorAll("[data-event]"), pageviewElements = document.querySelectorAll("[data-pageview-proprty-name]");
    triggerIdentifyGeo(), [...allEvents, ...allSegmentElements].forEach((el) => {
      let element = el, eventName = element.dataset.event ?? element.dataset.segmentEvent;
      eventName && element.tagName === "BODY" && bodyTagEvents(eventName, element, pageviewElements, isDev2), eventName && element.tagName !== "BODY" && nonBodyTagEvents(eventName, element, pageviewElements, isDev2), element.removeAttribute("data-event"), element.removeAttribute("data-segment-event"), element.removeAttribute("data-pageview-property-name"), [...element.attributes].forEach((attr) => {
        attr.name.includes("data-property-name") && element.removeAttribute(attr.name), attr.name.includes("data-property-value") && element.removeAttribute(attr.name);
      });
    });
  }

  // src/utils/generic_consent_manager/displayGenericConsentManagerBanner.ts
  function displayGenericConsentManagerBanner(toggle) {
    let banner = document.getElementById("consent-manager");
    banner && (banner.style.display = toggle ? "block" : "none");
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
    let consentManagerDiv = document.getElementById("consent-manager");
    if (!consentManagerDiv) {
      console.error(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no div with id 'consent-manager' found. Please update your Webflow project.`
      );
      return;
    }
    let acceptButton = consentManagerDiv.querySelector("#consent-manager-accept");
    if (!acceptButton) {
      console.error(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no button with id 'consent-manager-accept' found inside div with id 'consent-manager'. Please update your Webflow project.`
      );
      return;
    }
    let declineButton = consentManagerDiv.querySelector("#consent-manager-decline");
    if (!declineButton) {
      console.error(
        `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
          "enable-consent-manager"
        )}, but no button with id 'consent-manager-decline' found inside div with id 'consent-manager'. Please update your Webflow project.`
      );
      return;
    }
    let openConsentManagerButton = document.getElementById("open-consent-manager");
    openConsentManagerButton || console.warn(
      `enable-consent-manager is ${document.getElementById("devhaus-tracking-code")?.getAttribute(
        "enable-consent-manager"
      )}, but no button with id 'open-consent-manager' found. Please update your Webflow project.`
    );
    let allowConsent = localStorage.getItem("devhaus-tracking-code-allow-consent");
    allowConsent === "true" ? toggleConsent(tools, !0) : (toggleConsent(tools, !1), allowConsent || displayGenericConsentManagerBanner(!0)), acceptButton.addEventListener("click", () => {
      displayGenericConsentManagerBanner(!1), toggleConsent(tools, !0), localStorage.setItem("devhaus-tracking-code-allow-consent", "true");
    }), declineButton.addEventListener("click", () => {
      displayGenericConsentManagerBanner(!1), toggleConsent(tools, !1), localStorage.setItem("devhaus-tracking-code-allow-consent", "false");
    }), openConsentManagerButton?.addEventListener("click", () => {
      displayGenericConsentManagerBanner(!0);
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
    let scriptTag2 = document.querySelector("#devhaus-tracking-code");
    if (scriptTag2.hasAttribute("ga4"))
      try {
        let ga4MeasurementId = scriptTag2.getAttribute("ga4"), ga4Debug = scriptTag2.getAttribute("ga4-debug-mode"), gtagScript = document.createElement("script");
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`, gtagScript.setAttribute("async", "true"), document.head.appendChild(gtagScript), window.dataLayer = window.dataLayer || [], gtag("js", /* @__PURE__ */ new Date()), !ga4Debug && ga4MeasurementId && gtag("config", ga4MeasurementId), ga4Debug && ga4MeasurementId && gtag("config", ga4MeasurementId, {
          send_page_view: !0,
          debug_mode: !0
        });
      } catch {
      }
  }

  // src/utils/isDevEnvironment.ts
  function isDevEnvironment(stagingDomain2) {
    return window.location.hostname.includes(stagingDomain2 || "webflow.io");
  }

  // src/utils/getCorrectWriteKey.ts
  function getCorrectWriteKey(writeKey, prodWriteKey, devWriteKey, stagingDomain2, productionDomain2) {
    if (isDevEnvironment(stagingDomain2) && devWriteKey)
      return devWriteKey;
    let isCorrectProductionDomain = window.location.hostname === productionDomain2;
    return prodWriteKey && (!productionDomain2 || isCorrectProductionDomain) ? prodWriteKey : writeKey;
  }

  // src/utils/loadSegmentConsentManager.ts
  function loadSegmentConsentManager(prodWriteKey, alwaysRequireConsent = "eu", devWriteKey, stagingDomain2, productionDomain2) {
    if (alwaysRequireConsent === "false")
      return;
    window.consentManagerConfig = function(exports) {
      let inEU, React;
      try {
        React = exports.React, inEU = exports.inEU;
      } finally {
        let devhausTrackingCode2 = document.getElementById("devhaus-tracking-code"), bannerColor = devhausTrackingCode2?.getAttribute("consent-banner-color") ?? "rgba(0,0,0,0)", bannerTextColor = devhausTrackingCode2?.getAttribute("consent-banner-text-color") ?? "#ffffff", bannerContentText = devhausTrackingCode2?.getAttribute("consent-banner-content") ?? "We use cookies to improve your experience.", bannerContent = React.createElement(
          "span",
          { className: "consent-banner-content" },
          bannerContentText
        ), bannerSubContentText = devhausTrackingCode2?.getAttribute("consent-banner-sub-content") ?? "You can change your preferences at any time.", bannerSubContent = React.createElement(
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
            marketingAndAnalytics: !0,
            advertising: !0,
            functional: !0
          },
          shouldRequireConsent: () => alwaysRequireConsent === "true" || alwaysRequireConsent === "eu" && inEU()
        };
      }
    };
    let consentManagerScript = document.createElement("script");
    if (consentManagerScript.defer = !0, consentManagerScript.src = "https://unpkg.com/@segment/consent-manager@5.7.0/standalone/consent-manager.js", document.body.appendChild(consentManagerScript), (document.getElementById("devhaus-tracking-code")?.getAttribute("include-built-in-banner") ?? "false") === "true") {
      let banner = document.createElement("div");
      banner.id = "consent-manager", document.body.appendChild(banner);
    }
    let buttonConsentManager = document.getElementById("open-consent-manager");
    buttonConsentManager || console.warn("#open-consent-manager Button doesn't exist. Please update your Webflow project.");
    let openConsentManager = function() {
      window.consentManager.openConsentManager();
    };
    buttonConsentManager?.addEventListener("click", openConsentManager);
  }

  // src/utils/loadSegmentAnalytics.ts
  function loadSegmentAnalytics(prodWriteKey, enableConsentManager2 = "true", devWriteKey, stagingDomain2, productionDomain2) {
    enableConsentManager2 !== null && loadSegmentConsentManager(
      prodWriteKey,
      enableConsentManager2,
      devWriteKey,
      stagingDomain2,
      productionDomain2
    );
    let analytics = window.analytics = window.analytics ?? [];
    if (!analytics.initialize) {
      if (analytics.invoked) throw new Error("Segment snippet included twice.");
      analytics.invoked = !0, analytics.methods = [
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
      ], analytics.factory = function(e) {
        return function() {
          let t = Array.prototype.slice.call(arguments);
          return t.unshift(e), analytics.push(t), analytics;
        };
      };
      for (let e = 0; e < analytics.methods.length; e++) {
        let key = analytics.methods[e];
        analytics[key] = analytics.factory(key);
      }
      analytics.load = function(key, e) {
        let t = document.createElement("script");
        t.type = "text/javascript", t.async = !0, t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
        let n = document.getElementsByTagName("script")[0];
        n.parentNode?.insertBefore(t, n), analytics._loadOptions = e;
      }, analytics._writeKey = getCorrectWriteKey(prodWriteKey, void 0, devWriteKey), analytics.SNIPPET_VERSION = "4.15.3", enableConsentManager2 === "false" && analytics.load(getCorrectWriteKey(prodWriteKey, void 0, devWriteKey)), analytics.page();
    }
  }

  // src/index.ts
  var scriptTag = document.getElementById("devhaus-tracking-code"), segmentProductionWriteKey = scriptTag?.getAttribute("segment-prod-write-key"), segmentDevWriteKey = scriptTag?.getAttribute("segment-dev-write-key") ?? void 0, stagingDomain = scriptTag?.getAttribute("staging-domain") ?? void 0, productionDomain = scriptTag?.getAttribute("production-domain") ?? void 0, enableConsentManager = scriptTag?.getAttribute("enable-consent-manager") ?? "eu", ga4 = scriptTag?.getAttribute("ga4") ?? "false", fullstory = scriptTag?.getAttribute("fullstory") ?? "false", isDev = scriptTag?.getAttribute("is-dev") ?? !1;
  segmentProductionWriteKey && loadSegmentAnalytics(
    segmentProductionWriteKey,
    enableConsentManager,
    segmentDevWriteKey,
    stagingDomain,
    productionDomain
  );
  var enabledStandaloneTools = [];
  segmentProductionWriteKey || (ga4 !== "false" && (initiateGA4(), enabledStandaloneTools.push("ga4")), fullstory !== "false" && (initiateFullstory(fullstory), enabledStandaloneTools.push("fullstory")), enableConsentManager !== "false" && loadGenericConsentManager(enabledStandaloneTools));
  window.addEventListener("DOMContentLoaded", () => {
    segmentTrackingCode(isDev === "true");
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
