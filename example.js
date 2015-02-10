

//  Here we go.
//  We want to wait until the DOM is ready
//  so we’ll wrap our bits in this function:

document.addEventListener( 'DOMContentLoaded', function(){


	//  We’ll make “context” a global variable
	//  so you can inspect it yourself from the console.

	window.context = getScriptContext( new Error )
	console.log( 'Here’s our context{} object:')
	console.log( context )


	//  And why not put this helpful stuff into HTML anyway?
	//  It’s kind of the medium of our times kiddo.

	var el = document.createElement( 'div' )
	el.innerHTML = '<strong>context.location.pathname:</strong><br>'+
		context.location.pathname +'<br>'+
		'<strong>context.location.search:</strong><br>'+
		context.location.search
	document.body.appendChild( el )
})