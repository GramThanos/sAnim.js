# sAnim.js
Simple Javascript Animations

Just a small javascript library for animations that I wrote some years ago.

___


### Fast set up

Add the sAnim code on `<head>`

```html
<script type="text/javascript" src="sAnim.js"></script>
```

You are now ready to fire your animations!

```html
<script type="text/javascript">
	new sAnim({from : 0, to : 100}, function(value) {
		// Handle animation step
		console.log(value);
	}).start();
</script>
```

___


### License

This project is under [The MIT license](https://opensource.org/licenses/MIT).
I do although appreciate attribute.

Copyright (c) 2018 Grammatopoulos Athanasios-Vasileios

___

[![GramThanos](https://avatars2.githubusercontent.com/u/14858959?s=42&v=4)](https://github.com/GramThanos)
[![DinoDevs](https://avatars1.githubusercontent.com/u/17518066?s=42&v=4)](https://github.com/DinoDevs)
