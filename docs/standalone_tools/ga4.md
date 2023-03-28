## Enable Google Analytics 4 (GA4) support

To enable Google Analytics support **(bypassing CDP)**, you need to add the `ga4` **attribute** and put your measurement ID as the value:

```html
<script 
    <!-- the rest of the Devhaus Tracking Code snippet -->
    ga4="G-XXXXXXXXXX"
  >
</script>
```

To enable GA4 DebugView, you need to add the `ga4-debug-mode` **attribute** and put `true` as the value:
**NOTE: This feature is unstable and may not work as expected.**

```html
<script 
    <!-- the rest of the Devhaus Tracking Code snippet -->
    ga4="G-XXXXXXXXXX"
    ga4-debug-mode="true"
  >
</script>
```
