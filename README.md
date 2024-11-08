# Devhaus Tracking Code

Devhaus Tracking Code is a helper code snippet that helps Webflow developers mainly to implement [Segment](https://segment.com/) events and send them to multiple destinations (e.g. Google Analytics, Facebook Pixel, etc.) without having to write any code. It also supports [Google Analytics 4](https://analytics.google.com) if the client opts out to track events without Segment in place.

## Table of Contents

- [Devhaus Tracking Code](#devhaus-tracking-code)
  - [Table of Contents](#table-of-contents)
- [Installation and Configuration](#installation-and-configuration)
  - [How to Install](#how-to-install)
  - [How to Install (v2.0.0 or lower)](#how-to-install-v200-or-lower)
  - [Enable Analytics Tools Support without a CDP](#enable-analytics-tools-support-without-a-cdp)
- [Usage and How to Track Events inside Webflow with Devhaus Tracking Code](#usage-and-how-to-track-events-inside-webflow-with-devhaus-tracking-code)
- [Consent Management](#consent-management)
- [Local Development](#local-development)
  - [License](#license)

# Installation and Configuration

The section below describes the process of installing and configuring the Devhaus Tracking Code snippet inside your Webflow project.

## How to Install

1. Take note of your Segment source's `writeKey`, **both for staging and production**.
2. Copy the code below and paste it in the `<head>` of the page and replace the `segment-prod-write-key` and `segment-dev-write-key` with your Segment source's `writeKey`:

```html
<script
  id="devhaus-tracking-code"
  defer
  src="https://cdn.jsdelivr.net/gh/BuildWithDevhaus/devhaus-tracking-code@2.3.1/dist/index.js"
  segment-prod-write-key="YOUR_PRODUCTION_SOURCE_WRITE_KEY"
  segment-dev-write-key="YOUR_STAGING_SOURCE_WRITE_KEY"
></script>
```

3. In a case where you want to use Google Analytics 4 (GA4) without Segment, you can add the `ga4` **attribute** without the `segment-prod-write-key` and `segment-dev-write-key` attributes. [See this section below for more details](#enable-google-analytics-support-bypassing-segment).
4. If you want your site to always receive Devhaus Tracking Code updates, you can use the `latest` tag instead of the `X.X.X` version number. This will always point to the latest version of the script. **NOTE: This is not recommended for production sites since major updates may introduce breaking changes.**

```html
<script
  id="devhaus-tracking-code"
  defer
  src="https://cdn.jsdelivr.net/gh/BuildWithDevhaus/devhaus-tracking-code@latest/dist/index.js"
  segment-prod-write-key="YOUR_PRODUCTION_SOURCE_WRITE_KEY"
  segment-dev-write-key="YOUR_STAGING_SOURCE_WRITE_KEY"
  production-domain="example.com"
  staging-domain="example.webflow.io"
></script>
```

## How to Install (v2.0.0 or lower)

1. Put your `analytics.js` snippet from Segment to the `<head>` of the page
2. **_(Optional) It is highly recommended_** that you modify your`analytics.js` file to include a staging source and a production source. This will allow you to test your events in staging before sending them to production. To do this, you need to add the following and \*\*replace to the `analytics.load()` call with the following\*\*:

```js if
(window.location.hostname.includes('webflow.io')) {
analytics.load('YOUR_STAGING_SOURCE_WRITE_KEY'); } else {
analytics.load('YOUR_PRODUCTION_SOURCE_WRITE_KEY'); }
</head>
```

3. Put the code below also in `<head>` after the `analytics.js` snippet; this is the Devhaus Tracking Code snippet:

```html
<script
  id="devhaus-tracking-code"
  defer
  src="https://cdn.jsdelivr.net/gh/BuildWithDevhaus/devhaus-tracking-code@2.0/dist/index.js"
></script>
```

<a name="enable-google-analytics-support-bypassing-segment"></a>

## Enable Analytics Tools Support without a CDP

By default, Devhaus Tracking Code is shipped with a CDP implementation considered in mind.

However, you can also use Devhaus Tracking Code without a CDP -- making it acts like a Tag Manager. In this case, you need to make sure that you omit the `segment-prod-write-key` and `segment-dev-write-key` attributes.

Below are the analytics tools that you can use:

- [Google Analytics 4 (GA4)](./docs/standalone_tools/ga4.md)
- [FullStory](/docs/standalone_tools/fullstory.md)


# Usage and How to Track Events inside Webflow with Devhaus Tracking Code

You can read more about the usage and how to track events inside Webflow with Devhaus Tracking Code in the [Usage](./docs/usage.md) documentation.

# Consent Management

You can read more about consent management in the [Consent Management](./docs/consentManagement.md) documentation.

# Local Development

You can read more about the local development setup in the [Local Development](./docs/localDevelopmentProcess.md) documentation.


## License

Devhaus Tracking Code is licensed under the MIT License.
Copyright © 2023, Devhaus Pte. Ltd.
