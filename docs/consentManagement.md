[<< Back to README](../README.md)

# Consent Management

- [Consent Management](#consent-management)
  - [Segment Consent Manager](#segment-consent-manager)
    - [Segment Consent Manager Banner Customisation](#segment-consent-manager-banner-customisation)
      - [Segment Consent Manager Banner Attributes](#segment-consent-manager-banner-attributes)
      - [Segment Consent Manager Banner Classnames](#segment-consent-manager-banner-classnames)
  - [Consent Manager Support without a CDP](#consent-manager-support-without-a-cdp)

## Segment Consent Manager

By default, Devhaus Tracking Code is shipped with a standalone version of [Segment Consent Manager](https://github.com/segmentio/consent-manager). By default, the consent manager is enabled for all users in the EU region or `enable-consent-manager` is set to `eu`.

You can add the `enable-consent-manager` **attribute** and put `false` as the value to disable the consent manager:

```html
<script 
    <!-- the rest of the Devhaus Tracking Code snippet -->
    enable-consent-manager="false"
  >
</script>
```

You can also replace `enable-consent-manager` value with `true` (to force enable the consent manager) or `eu` (to enable the consent manager only if the user is in the EU region).

### Segment Consent Manager Banner Customisation

You can use classnames and/or attributes to customise the consent manager banner.

#### Segment Consent Manager Banner Attributes

| Attribute Name               | Data Type            | Usage                                                                                                | Default Value                                 |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `consent-banner-color`       | string               | Change the color of the banner (note: it is recommended more to change colour from Webflow instead.) | `rgba(0,0,0,0)`                               |
| `consent-banner-text-color`  | string               | Change the color of the banner text colour.                                                          | `#ffffff`                                     |
| `consent-banner-content`     | string               | Change the main content of the Consent Manager banner.                                               | "We use cookies to improve your experience."  |
| `consent-banner-sub-content` | string               | Change the sub content of the Consent Manager banner.                                                | "You can change your preferences at anytime." |
| `include-built-in-banner`    | `'true'` / `'false'` | Option to include `<div id="consent-manager"></div>` to be rendered in the `<body>` tag              | `'false'`                                     |

#### Segment Consent Manager Banner Classnames

| Class Name                   | Usage                                 |
| ---------------------------- | ------------------------------------- |
| `consent-banner-content`     | Change the style of the main content. |
| `consent-banner-sub-content` | Change the style of the sub content.  |

## Consent Manager Support without a CDP

In case you are using Devhaus Tracking Code without a CDP, you can use the `enable-consent-manager` attribute to force enable the consent manager.
By default, the consent manager will be disabled or `false`. `eu` doesn't work in this case and will work the same as `true`.

```html
<script 
    <!-- the rest of the Devhaus Tracking Code snippet -->
    enable-consent-manager="true"
  >
</script>
```

but unlike Segment Consent Manager, you need to create your own consent manager banner in Webflow.
There are 4 components that you need to create:
1. A `<div>` with the `id` of `consent-manager`,
2. A button with the `id` of `consent-manager-accept` inside the `<div>` with the `id` of `consent-manager`,
3. A button with the `id` of `consent-manager-decline` inside the `<div>` with the `id` of `consent-manager`,
4. and A button with the `id` of `open-consent-manager`.

You can use the following HTML code as an example reference:

```html
<div id="consent-manager">
  <div class="consent-manager-content">
    <div class="consent-manager-content-text">
      <div class="consent-manager-content-text-main">
        We use cookies to improve your experience.
      </div>
      <div class="consent-manager-content-text-sub">
        You can change your preferences at anytime.
      </div>
    </div>
    <div class="consent-manager-content-buttons">
      <button id="consent-manager-accept">Accept</button>
      <button id="consent-manager-decline">Decline</button>
    </div>
  </div>
```
The styling of the consent manager can be done in Webflow according to the classnames that you set. The example above only shows how you incorporate the styling into the consent manager. **You can change the styling and classnames as you wish, as long as the 4 components mentioned above are present**.