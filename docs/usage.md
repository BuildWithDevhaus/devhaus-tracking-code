[<< Back to README.md](../README.md)

# How to Track Events Inside Webflow

## Table of Contents

- [How to Track Events Inside Webflow](#how-to-track-events-inside-webflow)
  - [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Event Tracking Inside Webflow](#event-tracking-inside-webflow)
  - [Part 1: Getting Started](#part-1-getting-started)
  - [Part 2: Implementing the Events](#part-2-implementing-the-events)
  - [2.1. Event Declaration](#21-event-declaration)
  - [2.2. Intro to Properties](#22-intro-to-properties)
    - [2.2.1. BONUS: The `data-property-name` Shorthand Syntax](#221-bonus-the-data-property-name-shorthand-syntax)
  - [2.3. Static Event Properties](#23-static-event-properties)
  - [2.4. Pageview Events](#24-pageview-events)
    - [2.4.1. `data-pageview-property-value` Compatibility chart](#241-data-pageview-property-value-compatibility-chart)
    - [2.4.2. The `grabPageview` property value](#242-the-grabpageview-property-value)
  - [2.5. Form Submission Events](#25-form-submission-events)
  - [2.6. CMS Items (or Repeated Items)](#26-cms-items-or-repeated-items)
    - [2.6.1. `data-cms` Custom Attribute](#261-data-cms-custom-attribute)
    - [2.6.2. `data-wrapper` Custom Attribute](#262-data-wrapper-custom-attribute)
    - [2.6.3. `data-property-name` paired with `data-property-value`](#263-data-property-name-paired-with-data-property-value)
- [Further Readings](#further-readings)

# Prerequisites

You are expected to understand these topics beforehand:

- Entry-level Javascript (Variable Definition and Basic Data Types i.e. String, Integer, Float, etc.)
- Webflow
  - Different types of HTML Code Snippets and different types of scopes
    - Global-level/on all pages
    - Page-level
    - Component-level
  - Custom Attributes

# Event Tracking Inside Webflow

## Part 1: Getting Started

Before you’re doing anything, make sure Devhaus Tracking Code is ready in your project. You can look at [How to Install](../README.md#how-to-install) section for more details.

## Part 2: Implementing the Events

## 2.1. Event Declaration

Events are the things that is happening inside your Webflow environment. These things could be Order Completed, Subscribed Newsletter, Page Viewed, or a key event was happened to determine that a user has high intent i.e. Key Step Completed.

There are 4 types of events that you can implement inside your website:

1. **Pageview Events (inside the `<body>` tag)**
2. **Static Item Click Events**
3. **CMS Item/Repeatable Item Click Events**
4. **Form Submission Click Events**

For every event, you only need to add a **Custom Attributes** to a desired element. You need to put a **Custom Attributes** by going to the **Webflow Designer >> click a desired element that you want the event to be put in (Let’s say a button) >> Settings >> Custom Attributes >> the + button**.

The name and the value of the attribute as follows.

**For Pageview Events:**

Remember, do this ON THE `<body>` tag.

`Name`: `data-event`
`Value`: Name of Your Event; example: Product Viewed, Blogpost Viewed, etc.

```html
<!-- Example of a Pageview Event -->
<body data-event="Product Viewed">
  <!-- the rest of your page -->
</body>
```

**For Click Events (Static Item, CMS Item, Form Submission):**

This is for every other element that is clickable.

`Name`: `data-event`
`Value`: Name of Your Event; example: Subscribed Newsletter, CTA Clicked, etc.

```html
<!-- Example of a Static Item Click Event -->
<a data-event="CTA Clicked">Click Me!</a>
```

The details of implementation will be explained below depending on the type of the event. But generally, every event **must have** `data-event` declared beforehand.

## 2.2. Intro to Properties

By definition, properties are pieces of information that we want to grab either from our webpage or our users to create a context for our defined events.

REMEMBER:

1. `data-event` **MUST BE DECLARED FIRST** before adding an event property.
2. Every property has a pair of `data-property-name{i}` and `data-property-value{i}` OR `data-property-name` and `data-property-value`.
3. `data-property-name{i}` OR `data-property-name` **must be declared first** before you put any property values inside.
4. `data-property-name{i}` OR `data-property-name` is declared depending on the type of event that you want to declare (we will discuss further on later sections.).

There are 6 types of properties:

- `innerHTML`: You’re grabbing an `innerHTML` value from an existing HTML element.
  - [See the documentation regarding `Element.innerHTML` for more details.](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- `innerHTML-parseInt`: Similar to the `innerHTML` above, but you’re typecasting the value from string to integer.
  - [See this documentation about `parseInt` for more details.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- `boolean:true`: This adds a `true` boolean value inside your property
- `boolean:false`: This adds a `false` boolean value inside your property
- `grabPageview`: This grabs a Pageview Event property that has the same Property name.
  - We will explain this further under Pageview Events section.
- **Static values**: Static values are any valid strings besides the mentioned above.
  - **These values are immutable once a Webflow project is published, hence the name ‘static’.**

The way that you define a property inside a link `<a>` like this:

```html
<!-- Add these two Custom Attributes inside Webflow for one property -->
<a data-property-name1="name_of_the_property" data-property-value1="value_of_the_property">
  Click me!
</a>
<!-- 
	**If you want to add another properties,** 
**	you can replace the 1 on the back to 2, 3, 4, … etc.**
	Example:
-->
<a
  data-property-name1="name_of_the_property"
  data-property-value1="value_of_the_property"
  data-property-name2="name_of_another_property"
  data-property-value2="value_of_another_property"
  data-property-name3="name_of_yet_another_property"
  data-property-value3="value_of_yet_another_property"
>
  Click me!
</a>
```

**You can add maximum up to `100` properties per event.**

If you somehow skipped a number, let’s say you have `data-property-name1`, `data-roperty-name3`, `data-property-name4`, but skipped `data-property-name2`, **only the non-skipped ones will be read;** so only `data-property-name1` will be registered.

Remember that you can replace the value to `innerHTML`, `innerHTML-parseInt`, `boolean:true` , `boolean:false` , or `grabPageview` as well.

### 2.2.1. BONUS: The `data-property-name` Shorthand Syntax

Instead of writing both `data-property-name1` and `data-property-value1`, you can instead only write `data-property-name1` or `data-property-name{i}` or `data-property-value` with the shorthand syntax:

```html
<!-- Instead of this -->
<button
  data-event="Button Clicked"
  data-property-name1="some_property"
  data-property-value1="innerHTML"
>
  Click Me
</button>

<!-- Do this instead -->
<button data-event="Button Clicked" data-property-name1="some_property:innerHTML">Click Me</button>
```

These are the property values that is supported with this syntax

| Property Value                                                      | Supported? |
| ------------------------------------------------------------------- | ---------- |
| innerHTML                                                           | ✅         |
| innerHTML-parseInt                                                  | ✅         |
| boolean:true                                                        | ❌         |
| boolean:false                                                       | ❌         |
| grabPageview                                                        | ✅         |
| Static Values (as long as it’s not using the colon ( : ) character) | ✅         |

## 2.3. Static Event Properties

Static events are any events that is triggered by any of the clickable elements with static properties. **The event that is implemented from section 2.2 in Segment will look like this:**

```js
analytics.track('Name of Your Event', {
  name_of_the_property: 'value_of_the_property',
  name_of_another_property: 'value_of_another_property',
  name_of_yet_another_property: 'value_of_yet_another_property',
  metadata: {
    utm_source: 'direct',
    utm_medium: null,
    utm_campaign: null,
  },
});
```

## 2.4. Pageview Events

In order to do a Pageview event, you want to add `data-event` inside the `<body>` tag. You can also add static properties inside the body tag (see section 2.3. for details. The way it works also exactly the same).

**But Pageview events has a special property called `data-pageview-property-name`**. Let’s say you want to add a title from a CMS blog post to a Pageview event called “Blog Post Viewed”. You cannot populate your ‘Blog Post Viewed” properties with static values since:

1. It will take ages to implement the events
2. Currently it’s impossible to get specific CMS item from Webflow via custom code.

That’s where `data-pageview-property-name` steps in. Here’s how to use the property:

1. **REMEMBER to put the `data-event` Custom Attribute inside the `<body>` element first!**

```html
<body data-event="Blog Post Viewed">
  <!-- The rest of the elements -->
</body>
```

1. Then, you want to tag a certain HTML element that you want to tag. Let’s say it’s an H1.

```html
<h1>This is a blogpost title.</h1>
```

1. **Then, you want to add `data-pageview-property-name` [Custom Attributes](#21-event-declaration) to that element,** let’s say the value is `blog_post_title`**.** So now, the element will look like this in HTML:

```html
<h1 data-pageview-property-name="blog_post_title">This is a blogpost title.</h1>
```

1. Optionally, you can also add `data-pageview-property-value` to the property as well. Let’s say it’s a `<p>` tag that denotes the duration of the Blog Post, let’s name the **`data-pageview-property-name`** for this `<p>` as `blog_post_duration`.

   By default, If you omit `data-pageview-property-value` Custom Attribute, the value would be `innerHTML`.

   This is how the HTML looks like now:

   ```html
   <h1 data-pageview-property-name="blog_post_title">This is a blogpost title.</h1>
   <p
     data-pageview-property-name="blog_post_duration"
     data-pageview-property-value="innerHTML-parseInt"
   >
     5
   </p>
   <p>Minutes</p>
   ```

   Remember that you can replace `data-pageview-property-value` to `innerHTML`, `innerHTML-parseInt` ,`boolean:true` ,`boolean:false` ,`grabPageview` or static values.

2. When the user loads the Blog Post, the Blog Post Viewed will be triggered. In Segment, now the event will look like this:

```jsx
analytics.track('Blog Post Viewed', {
  blog_post_title: 'This is a blog post title.',
  blog_post_duration: 5, //this is now an integer because of innerHTML-parseInt
  metadata: {
    utm_source: 'direct',
    utm_medium: null,
    utm_campaign: null,
  },
});
```

### 2.4.1. `data-pageview-property-value` Compatibility chart

| Property Value     | Supported?                                                          |
| ------------------ | ------------------------------------------------------------------- |
| innerHTML          | ✅                                                                  |
| innerHTML-parseInt | ✅                                                                  |
| boolean:true       | ✅                                                                  |
| boolean:false      | ✅                                                                  |
| grabPageview       | ❌ (This will cause infinite loop in your Webflow. DO NOT USE THIS) |
| Static Values      | ✅                                                                  |

### 2.4.2. The `grabPageview` property value

This property value is being used by other events that is not a Pageview Event. Supposedly you have this value that you already grab inside Pageview Event [(See previous example)](#24-pageview-events). Then you have another event somewhere, let’s say it’s a button that leads to the product page that is listed inside the blog post. Let’s say the name of the event is “Featured Product Clicked”. The event itself looks like this

```html
<button
  data-event="Featured Product Clicked"
  data-property-name1="blog_post_title"
  data-property-value1="????"
  data-property-name2="blog_post_duration"
  data-property-value2="????"
>
  Go to Product Page
</button>
```

Since a blog post would be very likely a CMS item:

1. You cannot just "grab" the `blog_post_title`
2. You cannot put static values; since all event values for Featured Product Clicked would be the same.

This is where `grabPageview` will help.

**The `grabPageview` will tell the code snippet that the property name “`blog_post_title`” is exist in the Pageview Event properties and will grab whatever value the Pageview property has.**

Pay attention that `blog_post_title` in Featured Product Clicked event is exactly written in the same way as `blog_post_title` inside Blog Post Viewed event.

</aside>

so now the button looks like this:

```html
<!-- these are the Pageview properties that we want to grab -->
<h1 data-pageview-property-name="blog_post_title">This is a blogpost title.</h1>
<p
  data-pageview-property-name="blog_post_duration"
  data-pageview-property-value="innerHTML-parseInt"
>
  5
</p>
<p>Minutes</p>

<!-- below is the button(s) that triggers Featured Product Clicked event -->
<button
  data-event="Featured Product Clicked"
  data-property-name1="blog_post_title"
  data-property-value1="grabPageview"
  data-property-name2="blog_post_duration"
  data-property-value2="grabPageview"
>
  Go to Product Page
</button>
<!-- or using the shorthand version -->
<button
  data-event="Featured Product Clicked"
  data-property-name1="blog_post_title:grabPageview"
  data-property-name2="blog_post_duration:grabPageview"
>
  Go to Product Page
</button>
```

When the button is clicked, Segment will catch the event like this:

```jsx
analytics.track('Featured Product Clicked', {
  blog_post_title: 'This is a blog post title.', //grabbed on whatever th data-pageview-property-name provides
  blog_post_duration: 5, //this is parseInt, remember?
  metadata: {
    utm_source: 'direct',
    utm_medium: null,
    utm_campaign: null,
  },
});
```

## 2.5. Form Submission Events

Add a `data-event` property to a **Submit Button inside a `<form>`**. This is your event name. Optionally, you can add `data-submit-button` Custom Attribute inside the submit button to force the Code Snippet to mark the submit button.
The code snippet will detect which `<form>` this button belongs and pulls **all the form values inside.**

Then, **Make sure you put an `id` inside every form fields that you want to track. This will later become your property name.** This is a super important step since you want

**If you have a PII (Personally-Identifiable Information) data in your forms, you need to mark them as inside an Identify event.**. In order to mark your PII fields as identifiable:

**Add this Custom Attribute to your PII form field:**
Name: `data-identify`
Value: `true`

Examples of PIIs are:

- First Name, Full Name, Last Name
- Identity Numbers; IC numbers, passport numbers, car police register, etc.
- Full addresses
- Phone Number
- etc.

```html
<input type="text" id="first_name" data-identify="true" />
```

Since the default value is pulling all the values inside the form, you may want to ignore some fields inside your event. You can add this property to ignore the field inside your event:

**Add this Custom Attribute in a form field that you want to ignore:**
Name: `data-ignore`
Value: `true`

```html
<textarea id="message" data-ignore="true" />
```

In a case where you need a particular form field to be both an Identify and a Track event, you need to add this property to that form field

**Add this property to tag a field as both Identify and Track property:**
Name: `data-both-identify-and-track`
Value: `true`

```html
<input type="number" id="company_size" data-both-identify-and-track="true" />
```

Lastly, we recommend you to tag the submit button using `data-submit-button="true"` just in case the Code snippet doesn't catch that the button is a submit button.

```html
<input
  type="submit"
  data-event="Form Submitted"
  data-submit-button="true"
>Submit
</input>
```

Combining all of the above, here’s an example form to make everything clear; pay attention on where the calls of `data-identify`, `data-both-identify-and-track`, and `data-ignore`, and `data-submit-button`:

```html
<form id="example-form">
    <label for="email">Email Address</label>
        <input
            type="email"
            id="email"
            data-identify="true"
        />
    <label for="first_name">First Name</label>
        <input
            type="text"
            id="first_name"
            data-identify="true"
        />
    <label for="last_name">Last Name</label>
        <input
            type="text"
            id="last_name"
            data-identify="true"
        />
    <label for="company_name">Company Name</label>
        <input
            type="text"
            id="company_name"
            data-both-identify-and-track="true"
        />
    <label for="interest">Interest</label>
        <input
            type="text"
            id="interest"
        />
    <label for="message">Type your message below</label>
        <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            data-ignore="true"
        ></textarea>
    <input
        type="submit"
        data-event="Form Submitted"
        data-submit-button="true"
    >Submit
    </input>
</form>
```

The events would be submitted to Segment like so (both Track and Identify):

```jsx
analytics.track('Form Submitted', {
  company_name: 'Acme Pte Ltd',
  interest: 'Some interest from the user',
  //'message' field is ignored
  metadata: {
    utm_source: 'direct',
    utm_medium: null,
    utm_campaign: null,
  },
});

analytics.identify({
  first_name: 'John',
  last_name: 'Tan',
  company_name: 'Acme Pte Ltd',
});
```

## 2.6. CMS Items (or Repeated Items)

Supposedly you have multiple product cards inside a product page that is generated using Webflow CMS, more less looks like this UI-wise:

Let’s say the “View Product” button will trigger “Product Selected” event and it will have these properties:

```jsx
analytics.track('Product Selected', {
  "product_name": "????",
  "product_short_desc": "????"
  "product_price": ????,
  "metadata": {
    "utm_source": "direct",
    "utm_medium": null,
    "utm_campaign": null
  }
});
```

**So now how do we actually derive `product_name`, `product_short_desc`, and `product_price`? Let’s say we would have 100 different product cards in a single page that is generated using CMS.**

There are three Custom Attributes that we’re going to use here:

- `data-cms`
- `data-wrapper`
- `data-property-name` paired with `data-property-value`

### 2.6.1. `data-cms` Custom Attribute

This Custom Attribute will mark the Item as a CMS or a Repeated item. If the Code Snippet finds `data-cms` value as "`true`", it will try to find where `data-wrapper` is to determine where to find the properties that we listed above.

The “View Product” button now will look like this (Let’s assume the product button is inside a product card `<div>`, we need this div for the next section’s example!)

```html
<div class="product-card">
  <!-- the contents of the card here -->
  <button class="product-button" data-event="Product Selected" data-cms="true">View Product</button>
</div>
```

### 2.6.2. `data-wrapper` Custom Attribute

`data-wrapper` is used to define the **search scope** of `data-property-name` inside when an element inside `data-wrapper`-defined element has `data-cms` defined.

In other words, `data-cms` must be defined first to make `data-wrapper` work.

</aside>

There are 2 major cases for this `data-wrapper` implementation:

1. Sometimes, a CMS card item might not have a “View Product” button like this:

   ![Untitled](How%20to%20Track%20Events%20inside%20Webflow%20fd7439f3ff99481ca15f9c62cc8a2963/Untitled%201.png)

   <aside>
   ⚠️ In a case where the whole card is clickable**, the `data-event` will be also placed on the card’s `<div>` instead of a button (where the whole card is clickable), the **search scope for properties will be also inside the card.**

   </aside>

   ```html
   <!-- Assuming the card below is clickable... -->
   <div class="product-card" data-event="Product Selected" data-cms="true" **data-wrapper="true" **>
     <!-- the contents of the card here -->
     <!-- the button is gone! no button! -->
   </div>
   ```

2. **In a case where the “View Product” button exists** (see image below), the wrapper will be still on the `<div>`, since we want to search the elements inside the card.
   Pay attention that `data-event` is on the BUTTON, since the button is the one responsible to trigger the event!

So in that case, the HTML will look like this:

```html
<div class="product-card" **data-wrapper="true" **>
  <!-- the contents of the card here -->
  <button class="product-button" data-event="Product Selected" data-cms="true">View Product</button>
</div>
```

### 2.6.3. `data-property-name` paired with `data-property-value`

To actually capture the properties inside the CMS card, we need to assign at least `data-property-name` (without numbers) inside any element inside a wrapper/`data-wrapper`-defined element.

From the example of previous sections, we want to track `product_name`, `product_price`, and `product_short_desc`

```html
<div class="product-card" **data-wrapper="true" **>
  <p class="product-name" **data-property-name="product_name" **>Some Product Name</p>
  <p
    class="product-price"
    data-property-name="product_price"
    data-property-value="innerHTML-parseInt"
  >
    50
  </p>
  <p>$</p>
  <p class="product-short-desc" data-property-name="product_short_desc" **>
    Some Product Description that is intentionally very long
  </p>
  <button class="product-button" **data-event="Product Selected" ** data-cms="true">
    View Product
  </button>
</div>
```

The final event call in Segment now will look like this:

```jsx
analytics.track('Product Selected', {
		"product_name": "Some Product Name",
	  "product_short_desc": "Some Product Description that is intentionally very long"
		"product_price": 50, //not a good practice since this is an Integer,
												 //but just for the sake of example
		"metadata": {
				"utm_source": "direct",
        "utm_medium": null,
        "utm_campaign": null
		 }
});
```

By default, **If you omit `data-property-value` Custom Attribute inside an element wrapped in a `data-wrapper`-defined wrapper is `innerHTML`**.

# Further Readings

- [Spec: Track | Segment Documentation](https://segment.com/docs/connections/spec/track/)
- [Spec: Identify | Segment Documentation](https://segment.com/docs/connections/spec/identify/)
