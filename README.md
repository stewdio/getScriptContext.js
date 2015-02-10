

Get Script Context. 
==============================================================================

Have you ever wished your plain old JavaScript include could know its own 
file’s URL or even accept variables passed to it through its URL? Well you are
in luck. `getScriptContext( new Error )` will return an object with the 
script’s location and any variables passed through the URL. Because reasons.  
  
Here’s how we pass variables by simply including an external JavaScript file:
```
<script charset="utf-8" src="example.js?KEY1=VALUE1&KEY2=VALUE2A,VALUE2B#HASH"></script>
```
  
And by calling `getScriptContext( new Error )` our `example.js` file will 
understand the following about its context:
```
{
	data: {

		KEY1: "VALUE1",
		KEY2: [

			"VALUE2A",
			"VALUE2B"
		]
	},
	location: {...}
}
```
  
Chrome and Opera seem to strip the hash out of JavaScript include’s URL,
but in Safari and Firefox you can access that as well.