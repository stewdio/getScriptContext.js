

Get Script Context. 
==============================================================================

Have you ever wished your plain old JavaScript include could know its own 
file’s URL or even accept variables passed to it through its URL? Well you are
in luck. `getScriptContext( new Error )` will return an object with the 
script’s location and any variables passed through the URL. Because reasons.

