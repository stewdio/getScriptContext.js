

Get Script Context. 
==============================================================================

Have you ever wished your plain old JavaScript include could know its own 
file’s URL or even accept variables passed to it through its URL? (OMG WHY?!)
What about knowing the line and column number something was called from?
Well you are in luck. Here’s an example of how we pass variables by simply 
including an external JavaScript file:
```
<script src="example.js?KEY1=VALUE1&KEY2=VALUE2A,VALUE2B#HASH"></script>
```
  
And by calling `getScriptContext( new Error )` within our `example.js` file 
that script itself will understand its own context like so:
```
{
	data: {
		KEY1: "VALUE1",
		KEY2: [
			"VALUE2A",
			"VALUE2B"
		]
	},
	location: {
		hash:     "#HASH",
		host:     "0.0.0.0:8000",
		hostname: "0.0.0.0",
		href:     "http://0.0.0.0:8000/example.js?KEY1=VALUE1&KEY2=VALUE2A,VALUE2B#HASH",
		origin:   "http://0.0.0.0:8000",
		pathname: "/example.js",
		port:     "8000",
		protocol: "http:",
		search:   "?KEY1=VALUE1&KEY2=VALUE2A,VALUE2B"
		line:     '14',
		column:   '37'
	}
}
```
  
Chrome and Opera seem to strip the hash out of JavaScript include’s URL,
but in Safari and Firefox you can access that as well.  
  

**Note that we are not talking about the HTML file’s URL here. This gets at 
an included script’s own URL. I’ve never seen this done before.**