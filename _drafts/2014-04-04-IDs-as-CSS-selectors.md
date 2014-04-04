---
title: IDs as CSS Selectors
layout: post
---
A few years ago, I was surprised when I ran some CSS I'd written through a
linter, and it complained about using IDs as selectors. This post will take a
look at the implications of using IDs as CSS selectors, and why I have come to
consider that to be a _bad practice_.

CSS stands for **cascading** style sheets, and cascading is really key to
writing good CSS.

```css
#an-ID {
  color: black;
}

p.element-and-class {
  color: blue;
}

div > .child-selector {
  color: red;
}

.a-class {
  color: green;
}
```
