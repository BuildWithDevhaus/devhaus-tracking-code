# Devhaus Tracking Code

Devhaus Tracking Code is a helper code snippet that helps Webflow developers mainly to implement [Segment](https://segment.com/) events and send them to multiple destinations (e.g. Google Analytics, Facebook Pixel, etc.) without having to write any code. It also supports [Google Analytics 4](https://analytics.google.com) if the client opts out to track events without Segment in place.

[baseurl]: https://cdn.jsdelivr.net/gh/BuildWithDevhaus/devhaus-tracking-code@2.0/dist/index.js

## Table of Contents

- [Devhaus Tracking Code](#devhaus-tracking-code)
  - [Table of Contents](#table-of-contents)
- [Installation and Configuration](#installation-and-configuration)
  - [How to Install](#how-to-install)
  - [How to Install (v2.0.0 or lower)](#how-to-install-v200-or-lower)
  - [Enable Analytics Tools Support without a CDP](#enable-analytics-tools-support-without-a-cdp)
- [Consent Management](#consent-management)
  - [Segment Consent Manager](#segment-consent-manager)
    - [Segment Consent Manager Banner Customisation](#segment-consent-manager-banner-customisation)
      - [Segment Consent Manager Banner Attributes](#segment-consent-manager-banner-attributes)
      - [Segment Consent Manager Banner Classnames](#segment-consent-manager-banner-classnames)
  - [Consent Manager Support without a CDP](#consent-manager-support-without-a-cdp)
- [Local Development Process](#local-development-process)
  - [Included tools](#included-tools)
  - [Requirements](#requirements)
    - [Installing](#installing)
    - [Building](#building)
    - [Building multiple files](#building-multiple-files)
    - [Setting up a path alias](#setting-up-a-path-alias)
  - [Testing](#testing)
    - [Serving files on development mode](#serving-files-on-development-mode)
  - [Contributing guide](#contributing-guide)
  - [Pre-defined scripts](#pre-defined-scripts)
  - [CI/CD](#cicd)
    - [Continuous Integration](#continuous-integration)
    - [Continuous Deployment](#continuous-deployment)
      - [How to automatically deploy updates to npm](#how-to-automatically-deploy-updates-to-npm)
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
  src="https://cdn.jsdelivr.net/gh/BuildWithDevhaus/devhaus-tracking-code@2.2.0/dist/index.js"
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

# Consent Management

Below are the consent management features that are supported by Devhaus Tracking Code:

- [Segment Consent Manager](#segment-consent-manager)
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

# Local Development Process

The section below describes the process of setting up a local development environment for this project.

## Included tools

This template contains some preconfigured development tools:

- [Typescript](https://www.typescriptlang.org/): A superset of Javascript that adds an additional layer of Typings, bringing more security and efficiency to the written code.
- [Prettier](https://prettier.io/): Code formatting that assures consistency across all Finsweet's projects.
- [ESLint](https://eslint.org/): Code linting that enforces industries' best practices. It uses [our own custom configuration](https://github.com/finsweet/eslint-config) to maintain consistency across all Finsweet's projects.
- [Playwright](https://playwright.dev/): Fast and reliable end-to-end testing.
- [esbuild](https://esbuild.github.io/): Javascript bundler that compiles, bundles and minifies the original Typescript files.
- [Changesets](https://github.com/changesets/changesets): A way to manage your versioning and changelogs.
- [Finsweet's TypeScript Utils](https://github.com/finsweet/ts-utils): Some utilities to help you in your Webflow development.

## Requirements

This template requires the use of [pnpm](https://pnpm.js.org/en/). You can [install pnpm](https://pnpm.io/installation) with:

```bash
npm i -g pnpm
```

To enable automatic deployments to npm, please read the [Continuous Deployment](#continuous-deployment) section.

### Installing

After creating the new repository, open it in your terminal and install the packages by running:

```bash
pnpm install
```

If this is the first time using Playwright and you want to use it in this project, you'll also have to install the browsers by running:

```bash
pnpm playwright install
```

You can read more about the use of Playwright in the [Testing](#testing) section.

It is also recommended that you install the following extensions in your VSCode editor:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Building

To build the files, you have two defined scripts:

- `pnpm dev`: Builds and creates a local server that serves all files (check [Serving files on development mode](#serving-files-on-development-mode) for more info).
- `pnpm build`: Builds to the production directory (`dist`).

### Building multiple files

If you need to build multiple files into different outputs, you can do it by updating the build settings.

In `bind/build.js`, update the `entryPoints` with any files you'd like to build:

```javascript
const entryPoints = [
  'src/home/index.ts',
  'src/contact/whatever.ts',
  'src/hooyah.ts',
  'src/home/other.ts',
];
```

This will tell `esbuild` to build all those files and output them in the `dist` folder for production and in `http://localhost:3000` for development.

### Setting up a path alias

Path aliases are very helpful to avoid code like:

```typescript
import example from '../../../../utils/example';
```

Instead, we can create path aliases that map to a specific folder, so the code becomes cleaner like:

```typescript
import example from '$utils/example';
```

You can set up path aliases using the `paths` setting in `tsconfig.json`. This template has an already predefined path as an example:

```json
{
  "paths": {
    "$utils/*": ["src/utils/*"]
  }
}
```

To avoid any surprises, take some time to familiarize yourself with the [tsconfig](/tsconfig.json) enabled flags.

## Testing

As previously mentioned, this library has [Playwright](https://playwright.dev/) included as an automated testing tool.

All tests are located under the `/tests` folder. This template includes a test spec example that will help you catch up with Playwright.

After [installing the dependencies](#installing), you can try it out by running `pnpm test`.
Make sure you replace it with your own tests! Writing proper tests will help improve the maintainability and scalability of your project in the long term.

By default, Playwright will also run `pnpm dev` in the background while the tests are running, so [your files served](#serving-files-on-development-mode) under `localhost:3000` will run as usual.
You can disable this behavior in the `playwright.config.ts` file.

If you project doesn't require any testing, you should disable the Tests job in the [CI workflow](#continuous-integration) by commenting it out in the `.github/workflows/ci.yml` file.
This will prevent the tests from running when you open a Pull Request.

### Serving files on development mode

When you run `pnpm dev`, two things happen:

- esbuild is set to `watch` mode. Every time that you save your files, the project will be rebuilt.
- A local server is created under `http://localhost:3000` that serves all your project files. You can import them in your Webflow projects like so:

```html
<script id="devhaus-tracking-code" defer src="http://localhost:3000/index.js"></script>
```

- Every time that you save your files, the local version of Devhaus Tracking Code will be rebuilt and the local server will be updated.

## Contributing guide

In general, your development workflow should look like this:

1. Create a new branch where to develop a new feature or bug fix.
2. Once you've finished the implementation, [create a Changeset](#continuous-deployment) (or multiple) explaining the changes that you've made in the codebase.
3. Open a Pull Request and wait until the [CI workflows](#continuous-integration) finish. If something fails, please try to fix it before merging the PR.
   If you don't want to wait for the CI workflows to run on GitHub to know if something fails, it will be always faster to run them in your machine before opening a PR.
4. Merge the Pull Request. The Changesets bot will automatically open a new PR with updates to the `CHANGELOG.md`, you should also merge that one. If you have [automatic npm deployments](#how-to-automatically-deploy-updates-to-npm) enabled, Changesets will also publish this new version on npm.

If you need to work on several features before publishing a new version on npm, it is a good practise to create a `development` branch where to merge all the PR's before pushing your code to master.

## Pre-defined scripts

This template contains a set of predefined scripts in the `package.json` file:

- `pnpm dev`: Builds and creates a local server that serves all files (check [Serving files on development mode](#serving-files-on-development-mode) for more info).
- `pnpm build`: Builds to the production directory (`dist`).
- `pnpm lint`: Scans the codebase with ESLint and Prettier to see if there are any errors.
- `pnpm check`: Checks for TypeScript errors in the codebase.
- `pnpm format`: Formats all the files in the codebase using Prettier. You probably won't need this script if you have automatic [formatting on save](https://www.digitalocean.com/community/tutorials/code-formatting-with-prettier-in-visual-studio-code#automatically-format-on-save) active in your editor.
- `pnpm test`: Will run all the tests that are located in the `/tests` folder.
- `pnpm test:headed`: Will run all the tests that are located in the `/tests` folder visually in headed browsers.
- `pnpm release`: This command is defined for [Changesets](https://github.com/changesets/changesets). You don't have to interact with it.
- `pnpm run update`: Scans the dependencies of the project and provides an interactive UI to select the ones that you want to update.

## CI/CD

This template contains a set of helpers with proper CI/CD workflows.

### Continuous Integration

When you open a Pull Request, a Continuous Integration workflow will run to:

- Lint & check your code. It uses the `pnpm lint` and `pnpm check` commands under the hood.
- Run the automated tests. It uses the `pnpm test` command under the hood.

If any of these jobs fail, you will get a warning in your Pull Request and should try to fix your code accordingly.

**Note:** If your project doesn't contain any defined tests in the `/tests` folder, you can skip the Tests workflow job by commenting it out in the `.github/workflows/ci.yml` file. This will significantly improve the workflow running times.

### Continuous Deployment

[Changesets](https://github.com/changesets/changesets) allows us to generate automatic changelog updates when merging a Pull Request to the `master` branch.

To generate a new changelog, run:

```bash
pnpm changeset
```

You'll be prompted with a few questions to complete the changelog.

Once the Pull Request is merged into `master`, a new Pull Request will automatically be opened by a changesets bot that bumps the package version and updates the `CHANGELOG.md` file.
You'll have to manually merge this new PR to complete the workflow.

If an `NPM_TOKEN` secret is included in the repository secrets, Changesets will automatically deploy the new package version to npm.
Keep reading for more info about this.

#### How to automatically deploy updates to npm

As mentioned before, Changesets will automatically deploy the new package version to npm if an `NPM_TOKEN` secret is provided.

This npm token should be:

- From Finsweet's npm organization if this repository is meant for internal/product development.
- From a client's npm organization if this repository is meant for client development. In this case, you should ask the client to [create an npm account](https://www.npmjs.com/signup) and provide you the credentials (or the npm token, if they know how to get it).

Once you're logged into the npm account, you can get an access token by following [this guide](https://docs.npmjs.com/creating-and-viewing-access-tokens).

The access token must be then placed in a [repository secret](https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/managing-encrypted-secrets-for-your-repository-and-organization-for-codespaces#adding-secrets-for-a-repository) named `NPM_TOKEN`.

## License

Devhaus Tracking Code is licensed under the MIT License.
Copyright © 2023, Devhaus Pte. Ltd.
