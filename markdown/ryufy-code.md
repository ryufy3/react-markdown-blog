---
title: Ryufy code
slug: ryufy-code
desc: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
date: 2024-12-27
---

# Ryufy code

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

## Example rendered code with [React syntax highlighter](https://www.npmjs.com/package/react-syntax-highlighter)

### Example for html

```html
<!DOCTYPE html>
<html>
  <body>
    <h2>What Can JavaScript Do?</h2>

    <p>JavaScript can change HTML attribute values.</p>

    <p>
      In this case JavaScript changes the value of the src (source) attribute of
      an image.
    </p>

    <button onclick="document.getElementById('myImage').src='pic_bulbon.gif'">
      Turn on the light
    </button>

    <img id="myImage" src="pic_bulboff.gif" style="width:100px" />

    <button onclick="document.getElementById('myImage').src='pic_bulboff.gif'">
      Turn off the light
    </button>
  </body>
</html>
```

### Example for javascript code

```javascript
let x, y;
x = 5;
y = 6;
document.getElementById("demo").innerHTML = x + y;
```
