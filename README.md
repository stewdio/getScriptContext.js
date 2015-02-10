

Get Script Context. 
==============================================================================

Have you ever wished your plain old JavaScript include could know its own 
file’s URL or even accept variables passed to it through its URL? (OMG WHY?!)
Well you are in luck. Here’s an example of how we pass variables by simply 
including an external JavaScript file:
```
<script src="example.js?KEY1=VALUE1&KEY2=VALUE2A,VALUE2B#HASH"></script>
```
  
And by calling `getScriptContext( new Error )` within our `example.js` file 
that script itself will understand the following about its own context:
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
  

**Note that we are not talking about the HTML file’s URL here. This gets at 
an included script’s own URL. I’ve never seen this done before.**