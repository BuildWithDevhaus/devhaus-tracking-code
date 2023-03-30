[<< Back to README](../../README.md)

## Enable FullStory support

To enable FullStory support **(bypassing CDP)**, you need to add the `fullstory` **attribute** and put your organisation ID as the value.
To find your `orgId`, you can go to your FullStory account and look for the `window['_fs_org']` variable or you can find it in the URL of your FullStory dashboard.

```
https://app.fullstory.com/ui/<orgId>/settings
```

After you have found your `orgId`, you can add the `fullstory` attribute to Devhaus Tracking Code:

```html
<script 
    <!-- the rest of the Devhaus Tracking Code snippet -->
    fullstory="o-XXXXX-na1"
  >
</script>
```

To enable FullStory Debug mode, you can add the `fullstory-debug-mode` **attribute** and put `true` as the value:

```html
<script 
    <!-- the rest of the Devhaus Tracking Code snippet -->
    fullstory="o-XXXXX-na1"
    fullstory-debug-mode="true"
  >
</script>
```
