# sAnim.js
## Simple Javascript Animations


### Example Usage

```html
<!-- My Element to animate -->
<div id="box" style="position: absolute; top: 0; left: 0; width: 10px; height: 10px; background: black;"></div>

<script type="text/javascript">
	// Get Element
	var box = document.getElementById('box');

	// Get current position
	var top = parseInt(box.style.top, 10);
	var left = parseInt(box.style.left, 10);

	// Animate
	var anim = new sAnim({from : 0, to : 300}, function(v) {
		box.style.top = (top + Math.round(v)) + 'px';
		box.style.left = (left + Math.round(v)) + 'px';
	});
	// Fire!
	anim.start();
</script>
```