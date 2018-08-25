

//  When the browser encounters an error it creates an “Error Stack”
//  which contains within it the location where the error ocurred
//  right down to the file’s URL, line number, and character. 
//  This means a script can know its source code’s URL
//  and we can even pass arguments through the URL itself!
//  Hold on to your hats because this is JSONP without the server!!
//  We must call “new Error()” in the file we want to inspect the
//  context of, and then pass that as an argument into here:

function getScriptContext( err ){

	var
	errorMessage,   //  Copy of browser’s error message for legibility.
	url,            //  URL of the JavaScript file that created the error.
	stop, start,    //  Temporary convenience vars for finding line and column.
	line, column,   //  Line number and column number of the error.
	locationParser, //  Magic location parsing ;)
	search, pairs,  //  For parsing variables passed via the URL.
	context = {}    //  Package everything into a “context” object.


	//  The error object is regular old human-readable text.
	//  We’re going to have to pull it apart to get what we’re after.

	errorMessage = err.stack
	url    = errorMessage.substring( errorMessage.indexOf( '//' ), errorMessage.lastIndexOf( ':' ))
	url    = url.substring( 0, url.lastIndexOf( ':' ))
	stop   = errorMessage.lastIndexOf( ':' )
	start  = errorMessage.substring( 0, stop ).lastIndexOf( ':' )
	column = errorMessage.substring( stop + 1, errorMessage.length - 1 )
	line   = errorMessage.substring( start + 1, stop )


	//  We need to extract the search params from 
	//  the URL used to load this particular JS file.
	//  But might also be nice to just hold on to
	//  all of that location info too, eh?

	parser = document.createElement( 'a' )
	parser.href = url
	context.location = {

		href:     parser.href,      //  'http://example.com:8080/pathname/with/slashes/index.html?search=kittens#hash'
		origin:   parser.origin,    //  'http://'
		protocol: parser.protocol,  //  'http:'
		host:     parser.host,      //  'example.com:8080'
		hostname: parser.hostname,  //  'example.com'
		port:     parser.port,      //  '8080'
		pathname: parser.pathname,  //  '/pathname/with/slashes/'
		search:   parser.search,    //  '?search=kittens'
		hash:     parser.hash,      //  '#hash'
		line:     line,             //  '14'
		column:   column            //  '37'
	}


	//  We’ve possibly placed arguments in the search string
	//  which we need to extract and attach to our return object.
	//  Right now we’re only worried about parser.search
	//  and not parser.hash because Chrome seems to strip out
	//  hashes from JavaScript includes. Why? Meh.

	context.data = {}
	if( parser.search ){
	
		search = parser.search
		if( search.substr( 0, 1 ) === '?' ) search = search.substr( 1 )
		search.replace( /\?/g, '&' )
		pairs = search.split( '&' )
		pairs.forEach( function( pair ){

			pair = pair.split( '=' )
			if( pair[ 1 ].indexOf( ',' ) > -1 )
				context.data[ pair[ 0 ]] = pair[ 1 ].split( ',' )
			else context.data[ pair[ 0 ]] = pair[ 1 ]
		})
	}


	//  Ok that’s it.
	//  Time to return our context{} object.

	return context
}







