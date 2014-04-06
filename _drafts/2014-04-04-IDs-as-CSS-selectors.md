---
title: IDs as CSS Selectors
layout: post
---
A few years ago, I was surprised when I ran some CSS I'd written through a linter, and it complained about using IDs as selectors. I've come to understand why that linter complained, and I'll whare with you why I now consider using IDs as CSS selectors to be, in general, a _bad practice_.

The basic idea of this is that we want CSS to **cascade**. Essentially this means that if you write 2 rules with overlapping definitions, the later one will have precedence and be applied. Using IDs tends to screw this up. Let's see if we can make this short and sweet:

```html
<h1 id="page-title">This is the title of this page.</h1>
```

So far so good, right? Only one of these per page, so we can use the ID to style it.
We know that's a fast, efficient and all around great selector for this element.

```css
/* There's probably a generic h1 style somewhere */
h1 {
  font-size: 18px;
  color: black;
}

/* This is just _asking_ to be selected by ID */
#page-title {
  color: red;
}
```

Result?

<p data-height="100" data-theme-id="0" data-slug-hash="cwBiu" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/SirReal/pen/cwBiu/'>IDs as CSS Selectors</a> by Jon Surrell (<a href='http://codepen.io/SirReal'>@SirReal</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

That looks about right. Oh wait, on this one page we want to make the title blue. Easy right?

```html
<h1 id="page-title" class="make-this-blue">This is the title of this page.</h1>
```

```css
h1 {
  font-size: 18px;
  color: black;
}

#page-title {
  color: red;
}

.make-this-blue {
  color: blue;
}
```

Easy again, right?

<p data-height="100" data-theme-id="0" data-slug-hash="qpDLI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/SirReal/pen/qpDLI/'>IDs as selectors demo</a> by Jon Surrell (<a href='http://codepen.io/SirReal'>@SirReal</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## What's going on?!

That didn't work. We were hoping that our cascading CSS would allow the rule for `.make-this-blue` to override the rule for `#page-title`. The problem is that before CSS even _thinks_ about cascading, it compares at the _specificity_ of rules. The break down is essentially the following (most specific to least):

1. Style attribute

   This is where you actually write style inside of your HTML tags. Don't expect CSS to override that.

1. ID

   Here's our friend, the `#ID` selector. He's really specific in the world of CSS.

1. class

   `.classes` are a pretty good selector to use for most of our CSS. Along with classes are `:pseudo-classes` and `[attribute=selectors]` at this level of specificity.

1. element

   The element selector is for generic HTML elements, like `h1` in our example.

Keep in mind that using inheritance in our selectors increase the specificity slightly, meaning that `ul li` is more specific than `li`.

## What's the solution?

If you immediately thought we could just do this:

```css
.make-this-blue {
  color: blue !important;
}
```

You're absolutely right. We can. The `!important` marker just crushes everything else and now we can't really expect any specificity or inheritance to work as expected. As you may have guessed, the real answer here is to try to avoid using IDs as selectors in our CSS. I tend to reserve IDs for elements I know I'll want to access using JavaScript.

This will do the trick:

```html
<h1 id="page-title" class="page-title make-this-blue">
  This is the title of this page.
</h1>
```

```css
h1 {
  font-size: 18px;
  color: black;
}

.page-title {
  color: red;
}

.make-this-blue {
  color: blue;
}
```

<p data-height="100" data-theme-id="0" data-slug-hash="oducI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/SirReal/pen/oducI/'>demo</a> by Jon Surrell (<a href='http://codepen.io/SirReal'>@SirReal</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


## Further reading

There's a good article over on [css-tricks](http://css-tricks.com/specifics-on-css-specificity/) about specificity in CSS.

Check out the [w3c spec](http://www.w3.org/TR/2008/REC-CSS1-20080411/#cascading-order) about cascading order.
