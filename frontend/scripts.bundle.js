/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (typeof define === 'function' && define.amd) {
    define(function() {
        return Hammer;
    });
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');

;/*!
 * Materialize v0.100.2 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Check for jQuery.
if (typeof jQuery === 'undefined') {
  // Check if require is a defined function.
  if (typeof require === 'function') {
    jQuery = $ = require('jquery');
    // Else use the dollar sign alias.
  } else {
    jQuery = $;
  }
}
; /*
  * jQuery Easing v1.4.0 - http://gsgd.co.uk/sandbox/jquery/easing/
  * Open source under the BSD License.
  * Copyright © 2008 George McGinley Smith
  * All rights reserved.
  * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
  */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], function ($) {
      return factory($);
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {

  // Preserve the original jQuery "swing" easing as "jswing"
  $.easing['jswing'] = $.easing['swing'];

  var pow = Math.pow,
      sqrt = Math.sqrt,
      sin = Math.sin,
      cos = Math.cos,
      PI = Math.PI,
      c1 = 1.70158,
      c2 = c1 * 1.525,
      c3 = c1 + 1,
      c4 = 2 * PI / 3,
      c5 = 2 * PI / 4.5;

  // x is the fraction of animation progress, in the range 0..1
  function bounceOut(x) {
    var n1 = 7.5625,
        d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + .75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + .9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + .984375;
    }
  }

  $.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x) {
      return $.easing[$.easing.def](x);
    },
    easeInQuad: function (x) {
      return x * x;
    },
    easeOutQuad: function (x) {
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function (x) {
      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function (x) {
      return x * x * x;
    },
    easeOutCubic: function (x) {
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function (x) {
      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function (x) {
      return x * x * x * x;
    },
    easeOutQuart: function (x) {
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function (x) {
      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function (x) {
      return x * x * x * x * x;
    },
    easeOutQuint: function (x) {
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function (x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function (x) {
      return 1 - cos(x * PI / 2);
    },
    easeOutSine: function (x) {
      return sin(x * PI / 2);
    },
    easeInOutSine: function (x) {
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function (x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function (x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function (x) {
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function (x) {
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function (x) {
      return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: function (x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
    },
    easeInBack: function (x) {
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function (x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function (x) {
      return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInBounce: function (x) {
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
      return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;
    }
  });
});; // Custom Easing
jQuery.extend(jQuery.easing, {
  easeInOutMaterial: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return c / 4 * ((t -= 2) * t * t + 2) + b;
  }
});; /*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (!function (e) {
  function t(e) {
    var t = e.length,
        a = r.type(e);return "function" === a || r.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === a || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
  }if (!e.jQuery) {
    var r = function (e, t) {
      return new r.fn.init(e, t);
    };r.isWindow = function (e) {
      return null != e && e == e.window;
    }, r.type = function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[i.call(e)] || "object" : typeof e;
    }, r.isArray = Array.isArray || function (e) {
      return "array" === r.type(e);
    }, r.isPlainObject = function (e) {
      var t;if (!e || "object" !== r.type(e) || e.nodeType || r.isWindow(e)) return !1;try {
        if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (a) {
        return !1;
      }for (t in e) {}return void 0 === t || o.call(e, t);
    }, r.each = function (e, r, a) {
      var n,
          o = 0,
          i = e.length,
          s = t(e);if (a) {
        if (s) for (; i > o && (n = r.apply(e[o], a), n !== !1); o++) {} else for (o in e) {
          if (n = r.apply(e[o], a), n === !1) break;
        }
      } else if (s) for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++) {} else for (o in e) {
        if (n = r.call(e[o], o, e[o]), n === !1) break;
      }return e;
    }, r.data = function (e, t, n) {
      if (void 0 === n) {
        var o = e[r.expando],
            i = o && a[o];if (void 0 === t) return i;if (i && t in i) return i[t];
      } else if (void 0 !== t) {
        var o = e[r.expando] || (e[r.expando] = ++r.uuid);return a[o] = a[o] || {}, a[o][t] = n, n;
      }
    }, r.removeData = function (e, t) {
      var n = e[r.expando],
          o = n && a[n];o && r.each(t, function (e, t) {
        delete o[t];
      });
    }, r.extend = function () {
      var e,
          t,
          a,
          n,
          o,
          i,
          s = arguments[0] || {},
          l = 1,
          u = arguments.length,
          c = !1;for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== r.type(s) && (s = {}), l === u && (s = this, l--); u > l; l++) {
        if (null != (o = arguments[l])) for (n in o) {
          e = s[n], a = o[n], s !== a && (c && a && (r.isPlainObject(a) || (t = r.isArray(a))) ? (t ? (t = !1, i = e && r.isArray(e) ? e : []) : i = e && r.isPlainObject(e) ? e : {}, s[n] = r.extend(c, i, a)) : void 0 !== a && (s[n] = a));
        }
      }return s;
    }, r.queue = function (e, a, n) {
      function o(e, r) {
        var a = r || [];return null != e && (t(Object(e)) ? !function (e, t) {
          for (var r = +t.length, a = 0, n = e.length; r > a;) {
            e[n++] = t[a++];
          }if (r !== r) for (; void 0 !== t[a];) {
            e[n++] = t[a++];
          }return e.length = n, e;
        }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a;
      }if (e) {
        a = (a || "fx") + "queue";var i = r.data(e, a);return n ? (!i || r.isArray(n) ? i = r.data(e, a, o(n)) : i.push(n), i) : i || [];
      }
    }, r.dequeue = function (e, t) {
      r.each(e.nodeType ? [e] : e, function (e, a) {
        t = t || "fx";var n = r.queue(a, t),
            o = n.shift();"inprogress" === o && (o = n.shift()), o && ("fx" === t && n.unshift("inprogress"), o.call(a, function () {
          r.dequeue(a, t);
        }));
      });
    }, r.fn = r.prototype = { init: function (e) {
        if (e.nodeType) return this[0] = e, this;throw new Error("Not a DOM node.");
      }, offset: function () {
        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };return { top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
      }, position: function () {
        function e() {
          for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) {
            e = e.offsetParent;
          }return e || document;
        }var t = this[0],
            e = e.apply(t),
            a = this.offset(),
            n = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : r(e).offset();return a.top -= parseFloat(t.style.marginTop) || 0, a.left -= parseFloat(t.style.marginLeft) || 0, e.style && (n.top += parseFloat(e.style.borderTopWidth) || 0, n.left += parseFloat(e.style.borderLeftWidth) || 0), { top: a.top - n.top, left: a.left - n.left };
      } };var a = {};r.expando = "velocity" + new Date().getTime(), r.uuid = 0;for (var n = {}, o = n.hasOwnProperty, i = n.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) {
      n["[object " + s[l] + "]"] = s[l].toLowerCase();
    }r.fn.init.prototype = r.fn, e.Velocity = { Utilities: r };
  }
}(window), function (e) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e();
}(function () {
  return function (e, t, r, a) {
    function n(e) {
      for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
        var n = e[t];n && a.push(n);
      }return a;
    }function o(e) {
      return m.isWrapped(e) ? e = [].slice.call(e) : m.isNode(e) && (e = [e]), e;
    }function i(e) {
      var t = f.data(e, "velocity");return null === t ? a : t;
    }function s(e) {
      return function (t) {
        return Math.round(t * e) * (1 / e);
      };
    }function l(e, r, a, n) {
      function o(e, t) {
        return 1 - 3 * t + 3 * e;
      }function i(e, t) {
        return 3 * t - 6 * e;
      }function s(e) {
        return 3 * e;
      }function l(e, t, r) {
        return ((o(t, r) * e + i(t, r)) * e + s(t)) * e;
      }function u(e, t, r) {
        return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t);
      }function c(t, r) {
        for (var n = 0; m > n; ++n) {
          var o = u(r, e, a);if (0 === o) return r;var i = l(r, e, a) - t;r -= i / o;
        }return r;
      }function p() {
        for (var t = 0; b > t; ++t) {
          w[t] = l(t * x, e, a);
        }
      }function f(t, r, n) {
        var o,
            i,
            s = 0;do {
          i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i;
        } while (Math.abs(o) > h && ++s < v);return i;
      }function d(t) {
        for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) {
          r += x;
        }--n;var i = (t - w[n]) / (w[n + 1] - w[n]),
            s = r + i * x,
            l = u(s, e, a);return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x);
      }function g() {
        V = !0, (e != r || a != n) && p();
      }var m = 4,
          y = .001,
          h = 1e-7,
          v = 10,
          b = 11,
          x = 1 / (b - 1),
          S = "Float32Array" in t;if (4 !== arguments.length) return !1;for (var P = 0; 4 > P; ++P) {
        if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P])) return !1;
      }e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);var w = S ? new Float32Array(b) : new Array(b),
          V = !1,
          C = function (t) {
        return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n);
      };C.getControlPoints = function () {
        return [{ x: e, y: r }, { x: a, y: n }];
      };var T = "generateBezier(" + [e, r, a, n] + ")";return C.toString = function () {
        return T;
      }, C;
    }function u(e, t) {
      var r = e;return m.isString(e) ? b.Easings[e] || (r = !1) : r = m.isArray(e) && 1 === e.length ? s.apply(null, e) : m.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : m.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = b.Easings[b.defaults.easing] ? b.defaults.easing : v), r;
    }function c(e) {
      if (e) {
        var t = new Date().getTime(),
            r = b.State.calls.length;r > 1e4 && (b.State.calls = n(b.State.calls));for (var o = 0; r > o; o++) {
          if (b.State.calls[o]) {
            var s = b.State.calls[o],
                l = s[0],
                u = s[2],
                d = s[3],
                g = !!d,
                y = null;d || (d = b.State.calls[o][3] = t - 16);for (var h = Math.min((t - d) / u.duration, 1), v = 0, x = l.length; x > v; v++) {
              var P = l[v],
                  V = P.element;if (i(V)) {
                var C = !1;if (u.display !== a && null !== u.display && "none" !== u.display) {
                  if ("flex" === u.display) {
                    var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];f.each(T, function (e, t) {
                      S.setPropertyValue(V, "display", t);
                    });
                  }S.setPropertyValue(V, "display", u.display);
                }u.visibility !== a && "hidden" !== u.visibility && S.setPropertyValue(V, "visibility", u.visibility);for (var k in P) {
                  if ("element" !== k) {
                    var A,
                        F = P[k],
                        j = m.isString(F.easing) ? b.Easings[F.easing] : F.easing;if (1 === h) A = F.endValue;else {
                      var E = F.endValue - F.startValue;if (A = F.startValue + E * j(h, u, E), !g && A === F.currentValue) continue;
                    }if (F.currentValue = A, "tween" === k) y = A;else {
                      if (S.Hooks.registered[k]) {
                        var H = S.Hooks.getRoot(k),
                            N = i(V).rootPropertyValueCache[H];N && (F.rootPropertyValue = N);
                      }var L = S.setPropertyValue(V, k, F.currentValue + (0 === parseFloat(A) ? "" : F.unitType), F.rootPropertyValue, F.scrollData);S.Hooks.registered[k] && (i(V).rootPropertyValueCache[H] = S.Normalizations.registered[H] ? S.Normalizations.registered[H]("extract", null, L[1]) : L[1]), "transform" === L[0] && (C = !0);
                    }
                  }
                }u.mobileHA && i(V).transformCache.translate3d === a && (i(V).transformCache.translate3d = "(0px, 0px, 0px)", C = !0), C && S.flushTransformCache(V);
              }
            }u.display !== a && "none" !== u.display && (b.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (b.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], h, Math.max(0, d + u.duration - t), d, y), 1 === h && p(o);
          }
        }
      }b.State.isTicking && w(c);
    }function p(e, t) {
      if (!b.State.calls[e]) return !1;for (var r = b.State.calls[e][0], n = b.State.calls[e][1], o = b.State.calls[e][2], s = b.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
        var p = r[u].element;if (t || o.loop || ("none" === o.display && S.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && S.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && (f.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test(f.queue(p)[1])) && i(p)) {
          i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};var d = !1;f.each(S.Lists.transforms3D, function (e, t) {
            var r = /^scale/.test(t) ? 1 : 0,
                n = i(p).transformCache[t];i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (d = !0, delete i(p).transformCache[t]);
          }), o.mobileHA && (d = !0, delete i(p).transformCache.translate3d), d && S.flushTransformCache(p), S.Values.removeClass(p, "velocity-animating");
        }if (!t && o.complete && !o.loop && u === c - 1) try {
          o.complete.call(n, n);
        } catch (g) {
          setTimeout(function () {
            throw g;
          }, 1);
        }s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && (f.each(i(p).tweensContainer, function (e, t) {
          /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100);
        }), b(p, "reverse", { loop: !0, delay: o.delay })), o.queue !== !1 && f.dequeue(p, o.queue);
      }b.State.calls[e] = !1;for (var m = 0, y = b.State.calls.length; y > m; m++) {
        if (b.State.calls[m] !== !1) {
          l = !0;break;
        }
      }l === !1 && (b.State.isTicking = !1, delete b.State.calls, b.State.calls = []);
    }var f,
        d = function () {
      if (r.documentMode) return r.documentMode;for (var e = 7; e > 4; e--) {
        var t = r.createElement("div");if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e;
      }return a;
    }(),
        g = function () {
      var e = 0;return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
        var r,
            a = new Date().getTime();return r = Math.max(0, 16 - (a - e)), e = a + r, setTimeout(function () {
          t(a + r);
        }, r);
      };
    }(),
        m = { isString: function (e) {
        return "string" == typeof e;
      }, isArray: Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      }, isFunction: function (e) {
        return "[object Function]" === Object.prototype.toString.call(e);
      }, isNode: function (e) {
        return e && e.nodeType;
      }, isNodeList: function (e) {
        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0);
      }, isWrapped: function (e) {
        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e));
      }, isSVG: function (e) {
        return t.SVGElement && e instanceof t.SVGElement;
      }, isEmptyObject: function (e) {
        for (var t in e) {
          return !1;
        }return !0;
      } },
        y = !1;if (e.fn && e.fn.jquery ? (f = e, y = !0) : f = t.Velocity.Utilities, 8 >= d && !y) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if (7 >= d) return void (jQuery.fn.velocity = jQuery.fn.animate);var h = 400,
        v = "swing",
        b = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: t.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: r.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: f, Redirects: {}, Easings: {}, Promise: t.Promise, defaults: { queue: "", duration: h, easing: v, begin: a, complete: a, progress: a, display: a, visibility: a, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function (e) {
        f.data(e, "velocity", { isSVG: m.isSVG(e), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
      }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };t.pageYOffset !== a ? (b.State.scrollAnchor = t, b.State.scrollPropertyLeft = "pageXOffset", b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, b.State.scrollPropertyLeft = "scrollLeft", b.State.scrollPropertyTop = "scrollTop");var x = function () {
      function e(e) {
        return -e.tension * e.x - e.friction * e.v;
      }function t(t, r, a) {
        var n = { x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction };return { dx: n.v, dv: e(n) };
      }function r(r, a) {
        var n = { dx: r.v, dv: e(r) },
            o = t(r, .5 * a, n),
            i = t(r, .5 * a, o),
            s = t(r, a, i),
            l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx),
            u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);return r.x = r.x + l * a, r.v = r.v + u * a, r;
      }return function a(e, t, n) {
        var o,
            i,
            s,
            l = { x: -1, v: 0, tension: null, friction: null },
            u = [0],
            c = 0,
            p = 1e-4,
            f = .016;for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, l.tension = e, l.friction = t, o = null !== n, o ? (c = a(e, t), i = c / n * f) : i = f; s = r(s || l, i), u.push(1 + s.x), c += 16, Math.abs(s.x) > p && Math.abs(s.v) > p;) {}return o ? function (e) {
          return u[e * (u.length - 1) | 0];
        } : c;
      };
    }();b.Easings = { linear: function (e) {
        return e;
      }, swing: function (e) {
        return .5 - Math.cos(e * Math.PI) / 2;
      }, spring: function (e) {
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
      } }, f.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
      b.Easings[t[0]] = l.apply(null, t[1]);
    });var S = b.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function () {
          for (var e = 0; e < S.Lists.colors.length; e++) {
            var t = "color" === S.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";S.Hooks.templates[S.Lists.colors[e]] = ["Red Green Blue Alpha", t];
          }var r, a, n;if (d) for (r in S.Hooks.templates) {
            a = S.Hooks.templates[r], n = a[0].split(" ");var o = a[1].match(S.RegEx.valueSplit);"Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), S.Hooks.templates[r] = [n.join(" "), o.join(" ")]);
          }for (r in S.Hooks.templates) {
            a = S.Hooks.templates[r], n = a[0].split(" ");for (var e in n) {
              var i = r + n[e],
                  s = e;S.Hooks.registered[i] = [r, s];
            }
          }
        }, getRoot: function (e) {
          var t = S.Hooks.registered[e];return t ? t[0] : e;
        }, cleanRootPropertyValue: function (e, t) {
          return S.RegEx.valueUnwrap.test(t) && (t = t.match(S.RegEx.valueUnwrap)[1]), S.Values.isCSSNullValue(t) && (t = S.Hooks.templates[e][1]), t;
        }, extractValue: function (e, t) {
          var r = S.Hooks.registered[e];if (r) {
            var a = r[0],
                n = r[1];return t = S.Hooks.cleanRootPropertyValue(a, t), t.toString().match(S.RegEx.valueSplit)[n];
          }return t;
        }, injectValue: function (e, t, r) {
          var a = S.Hooks.registered[e];if (a) {
            var n,
                o,
                i = a[0],
                s = a[1];return r = S.Hooks.cleanRootPropertyValue(i, r), n = r.toString().match(S.RegEx.valueSplit), n[s] = t, o = n.join(" ");
          }return r;
        } }, Normalizations: { registered: { clip: function (e, t, r) {
            switch (e) {case "name":
                return "clip";case "extract":
                var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(S.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;case "inject":
                return "rect(" + r + ")";}
          }, blur: function (e, t, r) {
            switch (e) {case "name":
                return b.State.isFirefox ? "filter" : "-webkit-filter";case "extract":
                var a = parseFloat(r);if (!a && 0 !== a) {
                  var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a = n ? n[1] : 0;
                }return a;case "inject":
                return parseFloat(r) ? "blur(" + r + ")" : "none";}
          }, opacity: function (e, t, r) {
            if (8 >= d) switch (e) {case "name":
                return "filter";case "extract":
                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);return r = a ? a[1] / 100 : 1;case "inject":
                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")";} else switch (e) {case "name":
                return "opacity";case "extract":
                return r;case "inject":
                return r;}
          } }, register: function () {
          9 >= d || b.State.isGingerbread || (S.Lists.transformsBase = S.Lists.transformsBase.concat(S.Lists.transforms3D));for (var e = 0; e < S.Lists.transformsBase.length; e++) {
            !function () {
              var t = S.Lists.transformsBase[e];S.Normalizations.registered[t] = function (e, r, n) {
                switch (e) {case "name":
                    return "transform";case "extract":
                    return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");case "inject":
                    var o = !1;switch (t.substr(0, t.length - 1)) {case "translate":
                        o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case "scal":case "scale":
                        b.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);break;case "skew":
                        o = !/(deg|\d)$/i.test(n);break;case "rotate":
                        o = !/(deg|\d)$/i.test(n);}return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t];}
              };
            }();
          }for (var e = 0; e < S.Lists.colors.length; e++) {
            !function () {
              var t = S.Lists.colors[e];S.Normalizations.registered[t] = function (e, r, n) {
                switch (e) {case "name":
                    return t;case "extract":
                    var o;if (S.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n;else {
                      var i,
                          s = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };/^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : S.RegEx.isHex.test(n) ? i = "rgb(" + S.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }return 8 >= d || 3 !== o.split(" ").length || (o += " 1"), o;case "inject":
                    return 8 >= d ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";}
              };
            }();
          }
        } }, Names: { camelCase: function (e) {
          return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase();
          });
        }, SVGAttribute: function (e) {
          var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (d || b.State.isAndroid && !b.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
        }, prefixCheck: function (e) {
          if (b.State.prefixMatches[e]) return [b.State.prefixMatches[e], !0];for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
            var n;if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
              return e.toUpperCase();
            }), m.isString(b.State.prefixElement.style[n])) return b.State.prefixMatches[e] = n, [n, !0];
          }return [e, !1];
        } }, Values: { hexToRgb: function (e) {
          var t,
              r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e = e.replace(r, function (e, t, r, a) {
            return t + t + r + r + a + a;
          }), t = a.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0];
        }, isCSSNullValue: function (e) {
          return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
        }, getUnitType: function (e) {
          return (/^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
          );
        }, getDisplayType: function (e) {
          var t = e && e.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
          );
        }, addClass: function (e, t) {
          e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t;
        }, removeClass: function (e, t) {
          e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
        } }, getPropertyValue: function (e, r, n, o) {
        function s(e, r) {
          function n() {
            u && S.setPropertyValue(e, "display", "none");
          }var l = 0;if (8 >= d) l = f.css(e, r);else {
            var u = !1;if (/^(width|height)$/.test(r) && 0 === S.getPropertyValue(e, "display") && (u = !0, S.setPropertyValue(e, "display", S.Values.getDisplayType(e))), !o) {
              if ("height" === r && "border-box" !== S.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var c = e.offsetHeight - (parseFloat(S.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingBottom")) || 0);return n(), c;
              }if ("width" === r && "border-box" !== S.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var p = e.offsetWidth - (parseFloat(S.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(S.getPropertyValue(e, "paddingRight")) || 0);return n(), p;
              }
            }var g;g = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === d && "filter" === r ? g.getPropertyValue(r) : g[r], ("" === l || null === l) && (l = e.style[r]), n();
          }if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
            var m = s(e, "position");("fixed" === m || "absolute" === m && /top|left/i.test(r)) && (l = f(e).position()[r] + "px");
          }return l;
        }var l;if (S.Hooks.registered[r]) {
          var u = r,
              c = S.Hooks.getRoot(u);n === a && (n = S.getPropertyValue(e, S.Names.prefixCheck(c)[0])), S.Normalizations.registered[c] && (n = S.Normalizations.registered[c]("extract", e, n)), l = S.Hooks.extractValue(u, n);
        } else if (S.Normalizations.registered[r]) {
          var p, g;p = S.Normalizations.registered[r]("name", e), "transform" !== p && (g = s(e, S.Names.prefixCheck(p)[0]), S.Values.isCSSNullValue(g) && S.Hooks.templates[r] && (g = S.Hooks.templates[r][1])), l = S.Normalizations.registered[r]("extract", e, g);
        }if (!/^[\d-]/.test(l)) if (i(e) && i(e).isSVG && S.Names.SVGAttribute(r)) {
          if (/^(height|width)$/i.test(r)) try {
            l = e.getBBox()[r];
          } catch (m) {
            l = 0;
          } else l = e.getAttribute(r);
        } else l = s(e, S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l) && (l = 0), b.debug >= 2 && console.log("Get " + r + ": " + l), l;
      }, setPropertyValue: function (e, r, a, n, o) {
        var s = r;if ("scroll" === r) o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);else if (S.Normalizations.registered[r] && "transform" === S.Normalizations.registered[r]("name", e)) S.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r];else {
          if (S.Hooks.registered[r]) {
            var l = r,
                u = S.Hooks.getRoot(r);n = n || S.getPropertyValue(e, u), a = S.Hooks.injectValue(l, a, n), r = u;
          }if (S.Normalizations.registered[r] && (a = S.Normalizations.registered[r]("inject", e, a), r = S.Normalizations.registered[r]("name", e)), s = S.Names.prefixCheck(r)[0], 8 >= d) try {
            e.style[s] = a;
          } catch (c) {
            b.debug && console.log("Browser does not support [" + a + "] for [" + s + "]");
          } else i(e) && i(e).isSVG && S.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;b.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a);
        }return [s, a];
      }, flushTransformCache: function (e) {
        function t(t) {
          return parseFloat(S.getPropertyValue(e, t));
        }var r = "";if ((d || b.State.isAndroid && !b.State.isChrome) && i(e).isSVG) {
          var a = { translate: [t("translateX"), t("translateY")], skewX: [t("skewX")], skewY: [t("skewY")], scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")], rotate: [t("rotateZ"), 0, 0] };f.each(i(e).transformCache, function (e) {
            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e]);
          });
        } else {
          var n, o;f.each(i(e).transformCache, function (t) {
            return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === d && "rotateZ" === t && (t = "rotate"), void (r += t + n + " "));
          }), o && (r = "perspective" + o + " " + r);
        }S.setPropertyValue(e, "transform", r);
      } };S.Hooks.register(), S.Normalizations.register(), b.hook = function (e, t, r) {
      var n = a;return e = o(e), f.each(e, function (e, o) {
        if (i(o) === a && b.init(o), r === a) n === a && (n = b.CSS.getPropertyValue(o, t));else {
          var s = b.CSS.setPropertyValue(o, t, r);"transform" === s[0] && b.CSS.flushTransformCache(o), n = s;
        }
      }), n;
    };var P = function () {
      function e() {
        return s ? k.promise || null : l;
      }function n() {
        function e(e) {
          function p(e, t) {
            var r = a,
                n = a,
                i = a;return m.isArray(e) ? (r = e[0], !m.isArray(e[1]) && /^[\d-]/.test(e[1]) || m.isFunction(e[1]) || S.RegEx.isHex.test(e[1]) ? i = e[1] : (m.isString(e[1]) && !S.RegEx.isHex.test(e[1]) || m.isArray(e[1])) && (n = t ? e[1] : u(e[1], s.duration), e[2] !== a && (i = e[2]))) : r = e, t || (n = n || s.easing), m.isFunction(r) && (r = r.call(o, V, w)), m.isFunction(i) && (i = i.call(o, V, w)), [r || 0, n, i];
          }function d(e, t) {
            var r, a;return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
              return r = e, "";
            }), r || (r = S.Values.getUnitType(e)), [a, r];
          }function h() {
            var e = { myParent: o.parentNode || r.body, position: S.getPropertyValue(o, "position"), fontSize: S.getPropertyValue(o, "fontSize") },
                a = e.position === L.lastPosition && e.myParent === L.lastParent,
                n = e.fontSize === L.lastFontSize;L.lastParent = e.myParent, L.lastPosition = e.position, L.lastFontSize = e.fontSize;var s = 100,
                l = {};if (n && a) l.emToPx = L.lastEmToPx, l.percentToPxWidth = L.lastPercentToPxWidth, l.percentToPxHeight = L.lastPercentToPxHeight;else {
              var u = i(o).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");b.init(u), e.myParent.appendChild(u), f.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                b.CSS.setPropertyValue(u, t, "hidden");
              }), b.CSS.setPropertyValue(u, "position", e.position), b.CSS.setPropertyValue(u, "fontSize", e.fontSize), b.CSS.setPropertyValue(u, "boxSizing", "content-box"), f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                b.CSS.setPropertyValue(u, t, s + "%");
              }), b.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = L.lastPercentToPxWidth = (parseFloat(S.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = L.lastPercentToPxHeight = (parseFloat(S.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = L.lastEmToPx = (parseFloat(S.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u);
            }return null === L.remToPx && (L.remToPx = parseFloat(S.getPropertyValue(r.body, "fontSize")) || 16), null === L.vwToPx && (L.vwToPx = parseFloat(t.innerWidth) / 100, L.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = L.remToPx, l.vwToPx = L.vwToPx, l.vhToPx = L.vhToPx, b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o), l;
          }if (s.begin && 0 === V) try {
            s.begin.call(g, g);
          } catch (x) {
            setTimeout(function () {
              throw x;
            }, 1);
          }if ("scroll" === A) {
            var P,
                C,
                T,
                F = /^x$/i.test(s.axis) ? "Left" : "Top",
                j = parseFloat(s.offset) || 0;s.container ? m.isWrapped(s.container) || m.isNode(s.container) ? (s.container = s.container[0] || s.container, P = s.container["scroll" + F], T = P + f(o).position()[F.toLowerCase()] + j) : s.container = null : (P = b.State.scrollAnchor[b.State["scrollProperty" + F]], C = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === F ? "Top" : "Left")]], T = f(o).offset()[F.toLowerCase()] + j), l = { scroll: { rootPropertyValue: !1, startValue: P, currentValue: P, endValue: T, unitType: "", easing: s.easing, scrollData: { container: s.container, direction: F, alternateValue: C } }, element: o }, b.debug && console.log("tweensContainer (scroll): ", l.scroll, o);
          } else if ("reverse" === A) {
            if (!i(o).tweensContainer) return void f.dequeue(o, s.queue);"none" === i(o).opts.display && (i(o).opts.display = "auto"), "hidden" === i(o).opts.visibility && (i(o).opts.visibility = "visible"), i(o).opts.loop = !1, i(o).opts.begin = null, i(o).opts.complete = null, v.easing || delete s.easing, v.duration || delete s.duration, s = f.extend({}, i(o).opts, s);var E = f.extend(!0, {}, i(o).tweensContainer);for (var H in E) {
              if ("element" !== H) {
                var N = E[H].startValue;E[H].startValue = E[H].currentValue = E[H].endValue, E[H].endValue = N, m.isEmptyObject(v) || (E[H].easing = s.easing), b.debug && console.log("reverse tweensContainer (" + H + "): " + JSON.stringify(E[H]), o);
              }
            }l = E;
          } else if ("start" === A) {
            var E;i(o).tweensContainer && i(o).isAnimating === !0 && (E = i(o).tweensContainer), f.each(y, function (e, t) {
              if (RegExp("^" + S.Lists.colors.join("$|^") + "$").test(e)) {
                var r = p(t, !0),
                    n = r[0],
                    o = r[1],
                    i = r[2];if (S.RegEx.isHex.test(n)) {
                  for (var s = ["Red", "Green", "Blue"], l = S.Values.hexToRgb(n), u = i ? S.Values.hexToRgb(i) : a, c = 0; c < s.length; c++) {
                    var f = [l[c]];o && f.push(o), u !== a && f.push(u[c]), y[e + s[c]] = f;
                  }delete y[e];
                }
              }
            });for (var z in y) {
              var O = p(y[z]),
                  q = O[0],
                  $ = O[1],
                  M = O[2];z = S.Names.camelCase(z);var I = S.Hooks.getRoot(z),
                  B = !1;if (i(o).isSVG || "tween" === I || S.Names.prefixCheck(I)[1] !== !1 || S.Normalizations.registered[I] !== a) {
                (s.display !== a && null !== s.display && "none" !== s.display || s.visibility !== a && "hidden" !== s.visibility) && /opacity|filter/.test(z) && !M && 0 !== q && (M = 0), s._cacheValues && E && E[z] ? (M === a && (M = E[z].endValue + E[z].unitType), B = i(o).rootPropertyValueCache[I]) : S.Hooks.registered[z] ? M === a ? (B = S.getPropertyValue(o, I), M = S.getPropertyValue(o, z, B)) : B = S.Hooks.templates[I][1] : M === a && (M = S.getPropertyValue(o, z));var W,
                    G,
                    Y,
                    D = !1;if (W = d(z, M), M = W[0], Y = W[1], W = d(z, q), q = W[0].replace(/^([+-\/*])=/, function (e, t) {
                  return D = t, "";
                }), G = W[1], M = parseFloat(M) || 0, q = parseFloat(q) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(z) ? (q /= 100, G = "em") : /^scale/.test(z) ? (q /= 100, G = "") : /(Red|Green|Blue)$/i.test(z) && (q = q / 100 * 255, G = "")), /[\/*]/.test(D)) G = Y;else if (Y !== G && 0 !== M) if (0 === q) G = Y;else {
                  n = n || h();var Q = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) || "x" === z ? "x" : "y";switch (Y) {case "%":
                      M *= "x" === Q ? n.percentToPxWidth : n.percentToPxHeight;break;case "px":
                      break;default:
                      M *= n[Y + "ToPx"];}switch (G) {case "%":
                      M *= 1 / ("x" === Q ? n.percentToPxWidth : n.percentToPxHeight);break;case "px":
                      break;default:
                      M *= 1 / n[G + "ToPx"];}
                }switch (D) {case "+":
                    q = M + q;break;case "-":
                    q = M - q;break;case "*":
                    q = M * q;break;case "/":
                    q = M / q;}l[z] = { rootPropertyValue: B, startValue: M, currentValue: M, endValue: q, unitType: G, easing: $ }, b.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(l[z]), o);
              } else b.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
            }l.element = o;
          }l.element && (S.Values.addClass(o, "velocity-animating"), R.push(l), "" === s.queue && (i(o).tweensContainer = l, i(o).opts = s), i(o).isAnimating = !0, V === w - 1 ? (b.State.calls.push([R, g, s, null, k.resolver]), b.State.isTicking === !1 && (b.State.isTicking = !0, c())) : V++);
        }var n,
            o = this,
            s = f.extend({}, b.defaults, v),
            l = {};switch (i(o) === a && b.init(o), parseFloat(s.delay) && s.queue !== !1 && f.queue(o, s.queue, function (e) {
          b.velocityQueueEntryFlag = !0, i(o).delayTimer = { setTimeout: setTimeout(e, parseFloat(s.delay)), next: e };
        }), s.duration.toString().toLowerCase()) {case "fast":
            s.duration = 200;break;case "normal":
            s.duration = h;break;case "slow":
            s.duration = 600;break;default:
            s.duration = parseFloat(s.duration) || 1;}b.mock !== !1 && (b.mock === !0 ? s.duration = s.delay = 1 : (s.duration *= parseFloat(b.mock) || 1, s.delay *= parseFloat(b.mock) || 1)), s.easing = u(s.easing, s.duration), s.begin && !m.isFunction(s.begin) && (s.begin = null), s.progress && !m.isFunction(s.progress) && (s.progress = null), s.complete && !m.isFunction(s.complete) && (s.complete = null), s.display !== a && null !== s.display && (s.display = s.display.toString().toLowerCase(), "auto" === s.display && (s.display = b.CSS.Values.getDisplayType(o))), s.visibility !== a && null !== s.visibility && (s.visibility = s.visibility.toString().toLowerCase()), s.mobileHA = s.mobileHA && b.State.isMobile && !b.State.isGingerbread, s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : f.queue(o, s.queue, function (t, r) {
          return r === !0 ? (k.promise && k.resolver(g), !0) : (b.velocityQueueEntryFlag = !0, void e(t));
        }), "" !== s.queue && "fx" !== s.queue || "inprogress" === f.queue(o)[0] || f.dequeue(o);
      }var s,
          l,
          d,
          g,
          y,
          v,
          x = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties));if (m.isWrapped(this) ? (s = !1, d = 0, g = this, l = this) : (s = !0, d = 1, g = x ? arguments[0].elements || arguments[0].e : arguments[0]), g = o(g)) {
        x ? (y = arguments[0].properties || arguments[0].p, v = arguments[0].options || arguments[0].o) : (y = arguments[d], v = arguments[d + 1]);var w = g.length,
            V = 0;if (!/^(stop|finish)$/i.test(y) && !f.isPlainObject(v)) {
          var C = d + 1;v = {};for (var T = C; T < arguments.length; T++) {
            m.isArray(arguments[T]) || !/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]) ? m.isString(arguments[T]) || m.isArray(arguments[T]) ? v.easing = arguments[T] : m.isFunction(arguments[T]) && (v.complete = arguments[T]) : v.duration = arguments[T];
          }
        }var k = { promise: null, resolver: null, rejecter: null };s && b.Promise && (k.promise = new b.Promise(function (e, t) {
          k.resolver = e, k.rejecter = t;
        }));var A;switch (y) {case "scroll":
            A = "scroll";break;case "reverse":
            A = "reverse";break;case "finish":case "stop":
            f.each(g, function (e, t) {
              i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer);
            });var F = [];return f.each(b.State.calls, function (e, t) {
              t && f.each(t[1], function (r, n) {
                var o = v === a ? "" : v;return o === !0 || t[2].queue === o || v === a && t[2].queue === !1 ? void f.each(g, function (r, a) {
                  a === n && ((v === !0 || m.isString(v)) && (f.each(f.queue(a, m.isString(v) ? v : ""), function (e, t) {
                    m.isFunction(t) && t(null, !0);
                  }), f.queue(a, m.isString(v) ? v : "", [])), "stop" === y ? (i(a) && i(a).tweensContainer && o !== !1 && f.each(i(a).tweensContainer, function (e, t) {
                    t.endValue = t.currentValue;
                  }), F.push(e)) : "finish" === y && (t[2].duration = 1));
                }) : !0;
              });
            }), "stop" === y && (f.each(F, function (e, t) {
              p(t, !0);
            }), k.promise && k.resolver(g)), e();default:
            if (!f.isPlainObject(y) || m.isEmptyObject(y)) {
              if (m.isString(y) && b.Redirects[y]) {
                var j = f.extend({}, v),
                    E = j.duration,
                    H = j.delay || 0;return j.backwards === !0 && (g = f.extend(!0, [], g).reverse()), f.each(g, function (e, t) {
                  parseFloat(j.stagger) ? j.delay = H + parseFloat(j.stagger) * e : m.isFunction(j.stagger) && (j.delay = H + j.stagger.call(t, e, w)), j.drag && (j.duration = parseFloat(E) || (/^(callout|transition)/.test(y) ? 1e3 : h), j.duration = Math.max(j.duration * (j.backwards ? 1 - e / w : (e + 1) / w), .75 * j.duration, 200)), b.Redirects[y].call(t, t, j || {}, e, w, g, k.promise ? k : a);
                }), e();
              }var N = "Velocity: First argument (" + y + ") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise ? k.rejecter(new Error(N)) : console.log(N), e();
            }A = "start";}var L = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
            R = [];f.each(g, function (e, t) {
          m.isNode(t) && n.call(t);
        });var z,
            j = f.extend({}, b.defaults, v);if (j.loop = parseInt(j.loop), z = 2 * j.loop - 1, j.loop) for (var O = 0; z > O; O++) {
          var q = { delay: j.delay, progress: j.progress };O === z - 1 && (q.display = j.display, q.visibility = j.visibility, q.complete = j.complete), P(g, "reverse", q);
        }return e();
      }
    };b = f.extend(P, b), b.animate = P;var w = t.requestAnimationFrame || g;return b.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
      r.hidden ? (w = function (e) {
        return setTimeout(function () {
          e(!0);
        }, 16);
      }, c()) : w = t.requestAnimationFrame || g;
    }), e.Velocity = b, e !== t && (e.fn.velocity = P, e.fn.velocity.defaults = b.defaults), f.each(["Down", "Up"], function (e, t) {
      b.Redirects["slide" + t] = function (e, r, n, o, i, s) {
        var l = f.extend({}, r),
            u = l.begin,
            c = l.complete,
            p = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
            d = {};l.display === a && (l.display = "Down" === t ? "inline" === b.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
          u && u.call(i, i);for (var r in p) {
            d[r] = e.style[r];var a = b.CSS.getPropertyValue(e, r);p[r] = "Down" === t ? [a, 0] : [0, a];
          }d.overflow = e.style.overflow, e.style.overflow = "hidden";
        }, l.complete = function () {
          for (var t in d) {
            e.style[t] = d[t];
          }c && c.call(i, i), s && s.resolver(i);
        }, b(e, p, l);
      };
    }), f.each(["In", "Out"], function (e, t) {
      b.Redirects["fade" + t] = function (e, r, n, o, i, s) {
        var l = f.extend({}, r),
            u = { opacity: "In" === t ? 1 : 0 },
            c = l.complete;l.complete = n !== o - 1 ? l.begin = null : function () {
          c && c.call(i, i), s && s.resolver(i);
        }, l.display === a && (l.display = "In" === t ? "auto" : "none"), b(this, u, l);
      };
    }), b;
  }(window.jQuery || window.Zepto || window, window, document);
}));
;!function (a, b, c, d) {
  "use strict";
  function k(a, b, c) {
    return setTimeout(q(a, c), b);
  }function l(a, b, c) {
    return Array.isArray(a) ? (m(a, c[b], c), !0) : !1;
  }function m(a, b, c) {
    var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) {
      b.call(c, a[e], e, a), e++;
    } else for (e in a) {
      a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
  }function n(a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length;) {
      (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
    }return a;
  }function o(a, b) {
    return n(a, b, !0);
  }function p(a, b, c) {
    var e,
        d = b.prototype;e = a.prototype = Object.create(d), e.constructor = a, e._super = d, c && n(e, c);
  }function q(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }function r(a, b) {
    return typeof a == g ? a.apply(b ? b[0] || d : d, b) : a;
  }function s(a, b) {
    return a === d ? b : a;
  }function t(a, b, c) {
    m(x(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }function u(a, b, c) {
    m(x(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }function v(a, b) {
    for (; a;) {
      if (a == b) return !0;a = a.parentNode;
    }return !1;
  }function w(a, b) {
    return a.indexOf(b) > -1;
  }function x(a) {
    return a.trim().split(/\s+/g);
  }function y(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
      if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
    }return -1;
  }function z(a) {
    return Array.prototype.slice.call(a, 0);
  }function A(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length;) {
      var g = b ? a[f][b] : a[f];y(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }return c && (d = b ? d.sort(function (a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }function B(a, b) {
    for (var c, f, g = b[0].toUpperCase() + b.slice(1), h = 0; h < e.length;) {
      if (c = e[h], f = c ? c + g : b, f in a) return f;h++;
    }return d;
  }function D() {
    return C++;
  }function E(a) {
    var b = a.ownerDocument;return b.defaultView || b.parentWindow;
  }function ab(a, b) {
    var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
      r(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }function bb(a) {
    var b,
        c = a.options.inputClass;return b = c ? c : H ? wb : I ? Eb : G ? Gb : rb, new b(a, cb);
  }function cb(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & O && 0 === d - e,
        g = b & (Q | R) && 0 === d - e;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, db(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }function db(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;c.firstInput || (c.firstInput = gb(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = gb(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = hb(d);b.timeStamp = j(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = lb(h, i), b.distance = kb(h, i), eb(c, b), b.offsetDirection = jb(b.deltaX, b.deltaY), b.scale = g ? nb(g.pointers, d) : 1, b.rotation = g ? mb(g.pointers, d) : 0, fb(c, b);var k = a.element;v(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
  }function eb(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};(b.eventType === O || f.eventType === Q) && (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }function fb(a, b) {
    var f,
        g,
        h,
        j,
        c = a.lastInterval || b,
        e = b.timeStamp - c.timeStamp;if (b.eventType != R && (e > N || c.velocity === d)) {
      var k = c.deltaX - b.deltaX,
          l = c.deltaY - b.deltaY,
          m = ib(e, k, l);g = m.x, h = m.y, f = i(m.x) > i(m.y) ? m.x : m.y, j = jb(k, l), a.lastInterval = b;
    } else f = c.velocity, g = c.velocityX, h = c.velocityY, j = c.direction;b.velocity = f, b.velocityX = g, b.velocityY = h, b.direction = j;
  }function gb(a) {
    for (var b = [], c = 0; c < a.pointers.length;) {
      b[c] = { clientX: h(a.pointers[c].clientX), clientY: h(a.pointers[c].clientY) }, c++;
    }return { timeStamp: j(), pointers: b, center: hb(b), deltaX: a.deltaX, deltaY: a.deltaY };
  }function hb(a) {
    var b = a.length;if (1 === b) return { x: h(a[0].clientX), y: h(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) {
      c += a[e].clientX, d += a[e].clientY, e++;
    }return { x: h(c / b), y: h(d / b) };
  }function ib(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }function jb(a, b) {
    return a === b ? S : i(a) >= i(b) ? a > 0 ? T : U : b > 0 ? V : W;
  }function kb(a, b, c) {
    c || (c = $);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
  }function lb(a, b, c) {
    c || (c = $);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
  }function mb(a, b) {
    return lb(b[1], b[0], _) - lb(a[1], a[0], _);
  }function nb(a, b) {
    return kb(b[0], b[1], _) / kb(a[0], a[1], _);
  }function rb() {
    this.evEl = pb, this.evWin = qb, this.allow = !0, this.pressed = !1, ab.apply(this, arguments);
  }function wb() {
    this.evEl = ub, this.evWin = vb, ab.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }function Ab() {
    this.evTarget = yb, this.evWin = zb, this.started = !1, ab.apply(this, arguments);
  }function Bb(a, b) {
    var c = z(a.touches),
        d = z(a.changedTouches);return b & (Q | R) && (c = A(c.concat(d), "identifier", !0)), [c, d];
  }function Eb() {
    this.evTarget = Db, this.targetIds = {}, ab.apply(this, arguments);
  }function Fb(a, b) {
    var c = z(a.touches),
        d = this.targetIds;if (b & (O | P) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
        f,
        g = z(a.changedTouches),
        h = [],
        i = this.target;if (f = c.filter(function (a) {
      return v(a.target, i);
    }), b === O) for (e = 0; e < f.length;) {
      d[f[e].identifier] = !0, e++;
    }for (e = 0; e < g.length;) {
      d[g[e].identifier] && h.push(g[e]), b & (Q | R) && delete d[g[e].identifier], e++;
    }return h.length ? [A(f.concat(h), "identifier", !0), h] : void 0;
  }function Gb() {
    ab.apply(this, arguments);var a = q(this.handler, this);this.touch = new Eb(this.manager, a), this.mouse = new rb(this.manager, a);
  }function Pb(a, b) {
    this.manager = a, this.set(b);
  }function Qb(a) {
    if (w(a, Mb)) return Mb;var b = w(a, Nb),
        c = w(a, Ob);return b && c ? Nb + " " + Ob : b || c ? b ? Nb : Ob : w(a, Lb) ? Lb : Kb;
  }function Yb(a) {
    this.id = D(), this.manager = null, this.options = o(a || {}, this.defaults), this.options.enable = s(this.options.enable, !0), this.state = Rb, this.simultaneous = {}, this.requireFail = [];
  }function Zb(a) {
    return a & Wb ? "cancel" : a & Ub ? "end" : a & Tb ? "move" : a & Sb ? "start" : "";
  }function $b(a) {
    return a == W ? "down" : a == V ? "up" : a == T ? "left" : a == U ? "right" : "";
  }function _b(a, b) {
    var c = b.manager;return c ? c.get(a) : a;
  }function ac() {
    Yb.apply(this, arguments);
  }function bc() {
    ac.apply(this, arguments), this.pX = null, this.pY = null;
  }function cc() {
    ac.apply(this, arguments);
  }function dc() {
    Yb.apply(this, arguments), this._timer = null, this._input = null;
  }function ec() {
    ac.apply(this, arguments);
  }function fc() {
    ac.apply(this, arguments);
  }function gc() {
    Yb.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }function hc(a, b) {
    return b = b || {}, b.recognizers = s(b.recognizers, hc.defaults.preset), new kc(a, b);
  }function kc(a, b) {
    b = b || {}, this.options = o(b, hc.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = bb(this), this.touchAction = new Pb(this, this.options.touchAction), lc(this, !0), m(b.recognizers, function (a) {
      var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }function lc(a, b) {
    var c = a.element;m(a.options.cssProps, function (a, d) {
      c.style[B(c.style, d)] = b ? a : "";
    });
  }function mc(a, c) {
    var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }var e = ["", "webkit", "moz", "MS", "ms", "o"],
      f = b.createElement("div"),
      g = "function",
      h = Math.round,
      i = Math.abs,
      j = Date.now,
      C = 1,
      F = /mobile|tablet|ip(ad|hone|od)|android/i,
      G = "ontouchstart" in a,
      H = B(a, "PointerEvent") !== d,
      I = G && F.test(navigator.userAgent),
      J = "touch",
      K = "pen",
      L = "mouse",
      M = "kinect",
      N = 25,
      O = 1,
      P = 2,
      Q = 4,
      R = 8,
      S = 1,
      T = 2,
      U = 4,
      V = 8,
      W = 16,
      X = T | U,
      Y = V | W,
      Z = X | Y,
      $ = ["x", "y"],
      _ = ["clientX", "clientY"];ab.prototype = { handler: function () {}, init: function () {
      this.evEl && t(this.element, this.evEl, this.domHandler), this.evTarget && t(this.target, this.evTarget, this.domHandler), this.evWin && t(E(this.element), this.evWin, this.domHandler);
    }, destroy: function () {
      this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(E(this.element), this.evWin, this.domHandler);
    } };var ob = { mousedown: O, mousemove: P, mouseup: Q },
      pb = "mousedown",
      qb = "mousemove mouseup";p(rb, ab, { handler: function (a) {
      var b = ob[a.type];b & O && 0 === a.button && (this.pressed = !0), b & P && 1 !== a.which && (b = Q), this.pressed && this.allow && (b & Q && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: L, srcEvent: a }));
    } });var sb = { pointerdown: O, pointermove: P, pointerup: Q, pointercancel: R, pointerout: R },
      tb = { 2: J, 3: K, 4: L, 5: M },
      ub = "pointerdown",
      vb = "pointermove pointerup pointercancel";a.MSPointerEvent && (ub = "MSPointerDown", vb = "MSPointerMove MSPointerUp MSPointerCancel"), p(wb, ab, { handler: function (a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = sb[d],
          f = tb[a.pointerType] || a.pointerType,
          g = f == J,
          h = y(b, a.pointerId, "pointerId");e & O && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Q | R) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
    } });var xb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
      yb = "touchstart",
      zb = "touchstart touchmove touchend touchcancel";p(Ab, ab, { handler: function (a) {
      var b = xb[a.type];if (b === O && (this.started = !0), this.started) {
        var c = Bb.call(this, a, b);b & (Q | R) && 0 === c[0].length - c[1].length && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: J, srcEvent: a });
      }
    } });var Cb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
      Db = "touchstart touchmove touchend touchcancel";p(Eb, ab, { handler: function (a) {
      var b = Cb[a.type],
          c = Fb.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: J, srcEvent: a });
    } }), p(Gb, ab, { handler: function (a, b, c) {
      var d = c.pointerType == J,
          e = c.pointerType == L;if (d) this.mouse.allow = !1;else if (e && !this.mouse.allow) return;b & (Q | R) && (this.mouse.allow = !0), this.callback(a, b, c);
    }, destroy: function () {
      this.touch.destroy(), this.mouse.destroy();
    } });var Hb = B(f.style, "touchAction"),
      Ib = Hb !== d,
      Jb = "compute",
      Kb = "auto",
      Lb = "manipulation",
      Mb = "none",
      Nb = "pan-x",
      Ob = "pan-y";Pb.prototype = { set: function (a) {
      a == Jb && (a = this.compute()), Ib && (this.manager.element.style[Hb] = a), this.actions = a.toLowerCase().trim();
    }, update: function () {
      this.set(this.manager.options.touchAction);
    }, compute: function () {
      var a = [];return m(this.manager.recognizers, function (b) {
        r(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), Qb(a.join(" "));
    }, preventDefaults: function (a) {
      if (!Ib) {
        var b = a.srcEvent,
            c = a.offsetDirection;if (this.manager.session.prevented) return b.preventDefault(), void 0;var d = this.actions,
            e = w(d, Mb),
            f = w(d, Ob),
            g = w(d, Nb);return e || f && c & X || g && c & Y ? this.preventSrc(b) : void 0;
      }
    }, preventSrc: function (a) {
      this.manager.session.prevented = !0, a.preventDefault();
    } };var Rb = 1,
      Sb = 2,
      Tb = 4,
      Ub = 8,
      Vb = Ub,
      Wb = 16,
      Xb = 32;Yb.prototype = { defaults: {}, set: function (a) {
      return n(this.options, a), this.manager && this.manager.touchAction.update(), this;
    }, recognizeWith: function (a) {
      if (l(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _b(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    }, dropRecognizeWith: function (a) {
      return l(a, "dropRecognizeWith", this) ? this : (a = _b(a, this), delete this.simultaneous[a.id], this);
    }, requireFailure: function (a) {
      if (l(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _b(a, this), -1 === y(b, a) && (b.push(a), a.requireFailure(this)), this;
    }, dropRequireFailure: function (a) {
      if (l(a, "dropRequireFailure", this)) return this;a = _b(a, this);var b = y(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
    }, hasRequireFailures: function () {
      return this.requireFail.length > 0;
    }, canRecognizeWith: function (a) {
      return !!this.simultaneous[a.id];
    }, emit: function (a) {
      function d(d) {
        b.manager.emit(b.options.event + (d ? Zb(c) : ""), a);
      }var b = this,
          c = this.state;Ub > c && d(!0), d(), c >= Ub && d(!0);
    }, tryEmit: function (a) {
      return this.canEmit() ? this.emit(a) : (this.state = Xb, void 0);
    }, canEmit: function () {
      for (var a = 0; a < this.requireFail.length;) {
        if (!(this.requireFail[a].state & (Xb | Rb))) return !1;a++;
      }return !0;
    }, recognize: function (a) {
      var b = n({}, a);return r(this.options.enable, [this, b]) ? (this.state & (Vb | Wb | Xb) && (this.state = Rb), this.state = this.process(b), this.state & (Sb | Tb | Ub | Wb) && this.tryEmit(b), void 0) : (this.reset(), this.state = Xb, void 0);
    }, process: function () {}, getTouchAction: function () {}, reset: function () {} }, p(ac, Yb, { defaults: { pointers: 1 }, attrTest: function (a) {
      var b = this.options.pointers;return 0 === b || a.pointers.length === b;
    }, process: function (a) {
      var b = this.state,
          c = a.eventType,
          d = b & (Sb | Tb),
          e = this.attrTest(a);return d && (c & R || !e) ? b | Wb : d || e ? c & Q ? b | Ub : b & Sb ? b | Tb : Sb : Xb;
    } }), p(bc, ac, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Z }, getTouchAction: function () {
      var a = this.options.direction,
          b = [];return a & X && b.push(Ob), a & Y && b.push(Nb), b;
    }, directionTest: function (a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;return e & b.direction || (b.direction & X ? (e = 0 === f ? S : 0 > f ? T : U, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? S : 0 > g ? V : W, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    }, attrTest: function (a) {
      return ac.prototype.attrTest.call(this, a) && (this.state & Sb || !(this.state & Sb) && this.directionTest(a));
    }, emit: function (a) {
      this.pX = a.deltaX, this.pY = a.deltaY;var b = $b(a.direction);b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
    } }), p(cc, ac, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () {
      return [Mb];
    }, attrTest: function (a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & Sb);
    }, emit: function (a) {
      if (this._super.emit.call(this, a), 1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";this.manager.emit(this.options.event + b, a);
      }
    } }), p(dc, Yb, { defaults: { event: "press", pointers: 1, time: 500, threshold: 5 }, getTouchAction: function () {
      return [Kb];
    }, process: function (a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          e = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Q | R) && !e) this.reset();else if (a.eventType & O) this.reset(), this._timer = k(function () {
        this.state = Vb, this.tryEmit();
      }, b.time, this);else if (a.eventType & Q) return Vb;return Xb;
    }, reset: function () {
      clearTimeout(this._timer);
    }, emit: function (a) {
      this.state === Vb && (a && a.eventType & Q ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = j(), this.manager.emit(this.options.event, this._input)));
    } }), p(ec, ac, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () {
      return [Mb];
    }, attrTest: function (a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & Sb);
    } }), p(fc, ac, { defaults: { event: "swipe", threshold: 10, velocity: .65, direction: X | Y, pointers: 1 }, getTouchAction: function () {
      return bc.prototype.getTouchAction.call(this);
    }, attrTest: function (a) {
      var c,
          b = this.options.direction;return b & (X | Y) ? c = a.velocity : b & X ? c = a.velocityX : b & Y && (c = a.velocityY), this._super.attrTest.call(this, a) && b & a.direction && a.distance > this.options.threshold && i(c) > this.options.velocity && a.eventType & Q;
    }, emit: function (a) {
      var b = $b(a.direction);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    } }), p(gc, Yb, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10 }, getTouchAction: function () {
      return [Lb];
    }, process: function (a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          e = a.deltaTime < b.time;if (this.reset(), a.eventType & O && 0 === this.count) return this.failTimeout();if (d && e && c) {
        if (a.eventType != Q) return this.failTimeout();var f = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            g = !this.pCenter || kb(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, g && f ? this.count += 1 : this.count = 1, this._input = a;var h = this.count % b.taps;if (0 === h) return this.hasRequireFailures() ? (this._timer = k(function () {
          this.state = Vb, this.tryEmit();
        }, b.interval, this), Sb) : Vb;
      }return Xb;
    }, failTimeout: function () {
      return this._timer = k(function () {
        this.state = Xb;
      }, this.options.interval, this), Xb;
    }, reset: function () {
      clearTimeout(this._timer);
    }, emit: function () {
      this.state == Vb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    } }), hc.VERSION = "2.0.4", hc.defaults = { domEvents: !1, touchAction: Jb, enable: !0, inputTarget: null, inputClass: null, preset: [[ec, { enable: !1 }], [cc, { enable: !1 }, ["rotate"]], [fc, { direction: X }], [bc, { direction: X }, ["swipe"]], [gc], [gc, { event: "doubletap", taps: 2 }, ["tap"]], [dc]], cssProps: { userSelect: "default", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ic = 1,
      jc = 2;kc.prototype = { set: function (a) {
      return n(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    }, stop: function (a) {
      this.session.stopped = a ? jc : ic;
    }, recognize: function (a) {
      var b = this.session;if (!b.stopped) {
        this.touchAction.preventDefaults(a);var c,
            d = this.recognizers,
            e = b.curRecognizer;(!e || e && e.state & Vb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) {
          c = d[f], b.stopped === jc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (Sb | Tb | Ub) && (e = b.curRecognizer = c), f++;
        }
      }
    }, get: function (a) {
      if (a instanceof Yb) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) {
        if (b[c].options.event == a) return b[c];
      }return null;
    }, add: function (a) {
      if (l(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    }, remove: function (a) {
      if (l(a, "remove", this)) return this;var b = this.recognizers;return a = this.get(a), b.splice(y(b, a), 1), this.touchAction.update(), this;
    }, on: function (a, b) {
      var c = this.handlers;return m(x(a), function (a) {
        c[a] = c[a] || [], c[a].push(b);
      }), this;
    }, off: function (a, b) {
      var c = this.handlers;return m(x(a), function (a) {
        b ? c[a].splice(y(c[a], b), 1) : delete c[a];
      }), this;
    }, emit: function (a, b) {
      this.options.domEvents && mc(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
        b.type = a, b.preventDefault = function () {
          b.srcEvent.preventDefault();
        };for (var d = 0; d < c.length;) {
          c[d](b), d++;
        }
      }
    }, destroy: function () {
      this.element && lc(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    } }, n(hc, { INPUT_START: O, INPUT_MOVE: P, INPUT_END: Q, INPUT_CANCEL: R, STATE_POSSIBLE: Rb, STATE_BEGAN: Sb, STATE_CHANGED: Tb, STATE_ENDED: Ub, STATE_RECOGNIZED: Vb, STATE_CANCELLED: Wb, STATE_FAILED: Xb, DIRECTION_NONE: S, DIRECTION_LEFT: T, DIRECTION_RIGHT: U, DIRECTION_UP: V, DIRECTION_DOWN: W, DIRECTION_HORIZONTAL: X, DIRECTION_VERTICAL: Y, DIRECTION_ALL: Z, Manager: kc, Input: ab, TouchAction: Pb, TouchInput: Eb, MouseInput: rb, PointerEventInput: wb, TouchMouseInput: Gb, SingleTouchInput: Ab, Recognizer: Yb, AttrRecognizer: ac, Tap: gc, Pan: bc, Swipe: fc, Pinch: cc, Rotate: ec, Press: dc, on: t, off: u, each: m, merge: o, extend: n, inherit: p, bindFn: q, prefixed: B }), typeof define == g && define.amd ? define(function () {
    return hc;
  }) : "undefined" != typeof module && module.exports ? module.exports = hc : a[c] = hc;
}(window, document, "Hammer");;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
})(function ($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data("hammer")) {
      $el.data("hammer", new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function (options) {
    return this.each(function () {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = function (originalEmit) {
    return function (type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  }(Hammer.Manager.prototype.emit);
});
; // Required for Meteor package, the use of window prevents export by Meteor
(function (window) {
  if (window.Package) {
    Materialize = {};
  } else {
    window.Materialize = {};
  }
})(window);

if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = Materialize;
  }
  exports.default = Materialize;
}

/*
 * raf.js
 * https://github.com/ngryman/raf.js
 *
 * original requestAnimationFrame polyfill by Erik Möller
 * inspired from paul_irish gist and post
 *
 * Copyright (c) 2013 ngryman
 * Licensed under the MIT license.
 */
(function (window) {
  var lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      i = vendors.length;

  // try to un-prefix existing raf
  while (--i >= 0 && !requestAnimationFrame) {
    requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  // polyfill with setTimeout fallback
  // heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback) {
      var now = +Date.now(),
          nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };

    cancelAnimationFrame = clearTimeout;
  }

  // export to window
  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
})(window);

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
Materialize.objectSelectorString = function (obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};

// Unique Random ID
Materialize.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
}();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
Materialize.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=)/g, "\\$1");
};

Materialize.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = Date.now || function () {
  return new Date().getTime();
};

/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
Materialize.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// Velocity has conflicts when loaded with jQuery, this will check for it
// First, check if in noConflict mode
var Vel;
if (jQuery) {
  Vel = jQuery.Velocity;
} else if ($) {
  Vel = $.Velocity;
} else {
  Vel = Velocity;
}

if (Vel) {
  Materialize.Vel = Vel;
} else {
  Materialize.Vel = Velocity;
}
;(function ($) {
  $.fn.collapsible = function (options, methodParam) {
    var defaults = {
      accordion: undefined,
      onOpen: undefined,
      onClose: undefined
    };

    var methodName = options;
    options = $.extend(defaults, options);

    return this.each(function () {

      var $this = $(this);

      var $panel_headers = $(this).find('> li > .collapsible-header');

      var collapsible_type = $this.data("collapsible");

      /****************
      Helper Functions
      ****************/

      // Accordion Open
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        }

        $panel_headers.not(object).removeClass('active').parent().removeClass('active');

        // Close previously open accordion elements.
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true, false).each(function () {
          if ($(this).is(':visible')) {
            $(this).slideUp({
              duration: 350,
              easing: "easeOutQuart",
              queue: false,
              complete: function () {
                $(this).css('height', '');
                execCallbacks($(this).siblings('.collapsible-header'));
              }
            });
          }
        });
      }

      // Expandable Open
      function expandableOpen(object) {
        if (object.hasClass('active')) {
          object.parent().addClass('active');
        } else {
          object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')) {
          object.siblings('.collapsible-body').stop(true, false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        } else {
          object.siblings('.collapsible-body').stop(true, false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function () {
              $(this).css('height', '');
            } });
        }
      }

      // Open collapsible. object: .collapsible-header
      function collapsibleOpen(object, noToggle) {
        if (!noToggle) {
          object.toggleClass('active');
        }

        if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
          // Handle Accordion
          accordionOpen(object);
        } else {
          // Handle Expandables
          expandableOpen(object);
        }

        execCallbacks(object);
      }

      // Handle callbacks
      function execCallbacks(object) {
        if (object.hasClass('active')) {
          if (typeof options.onOpen === "function") {
            options.onOpen.call(this, object.parent());
          }
        } else {
          if (typeof options.onClose === "function") {
            options.onClose.call(this, object.parent());
          }
        }
      }

      /**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */
      function isChildrenOfPanelHeader(object) {

        var panelHeader = getPanelHeader(object);

        return panelHeader.length > 0;
      }

      /**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */
      function getPanelHeader(object) {

        return object.closest('li > .collapsible-header');
      }

      // Turn off any existing event handlers
      function removeEventHandlers() {
        $this.off('click.collapse', '> li > .collapsible-header');
      }

      /*****  End Helper Functions  *****/

      // Methods
      if (methodName === 'destroy') {
        removeEventHandlers();
        return;
      } else if (methodParam >= 0 && methodParam < $panel_headers.length) {
        var $curr_header = $panel_headers.eq(methodParam);
        if ($curr_header.length && (methodName === 'open' || methodName === 'close' && $curr_header.hasClass('active'))) {
          collapsibleOpen($curr_header);
        }
        return;
      }

      removeEventHandlers();

      // Add click handler to only direct collapsible header children
      $this.on('click.collapse', '> li > .collapsible-header', function (e) {
        var element = $(e.target);

        if (isChildrenOfPanelHeader(element)) {
          element = getPanelHeader(element);
        }

        collapsibleOpen(element);
      });

      // Open first active
      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
        // Handle Accordion
        collapsibleOpen($panel_headers.filter('.active').first(), true);
      } else {
        // Handle Expandables
        $panel_headers.filter('.active').each(function () {
          collapsibleOpen($(this), true);
        });
      }
    });
  };

  $(document).ready(function () {
    $('.collapsible').collapsible();
  });
})(jQuery);;(function ($) {

  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function (elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (options) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false,
      alignment: 'left',
      stopPropagation: false
    };

    // Open dropdown.
    if (options === "open") {
      this.each(function () {
        $(this).trigger('open');
      });
      return false;
    }

    // Close dropdown.
    if (options === "close") {
      this.each(function () {
        $(this).trigger('close');
      });
      return false;
    }

    this.each(function () {
      var origin = $(this);
      var curr_options = $.extend({}, defaults, options);
      var isFocused = false;

      // Dropdown menu
      var activates = $("#" + origin.attr('data-activates'));

      function updateOptions() {
        if (origin.data('induration') !== undefined) curr_options.inDuration = origin.data('induration');
        if (origin.data('outduration') !== undefined) curr_options.outDuration = origin.data('outduration');
        if (origin.data('constrainwidth') !== undefined) curr_options.constrainWidth = origin.data('constrainwidth');
        if (origin.data('hover') !== undefined) curr_options.hover = origin.data('hover');
        if (origin.data('gutter') !== undefined) curr_options.gutter = origin.data('gutter');
        if (origin.data('beloworigin') !== undefined) curr_options.belowOrigin = origin.data('beloworigin');
        if (origin.data('alignment') !== undefined) curr_options.alignment = origin.data('alignment');
        if (origin.data('stoppropagation') !== undefined) curr_options.stopPropagation = origin.data('stoppropagation');
      }

      updateOptions();

      // Attach dropdown to its activator
      origin.after(activates);

      /*
        Helper function to position and resize dropdown.
        Used in hover and click handler.
      */
      function placeDropdown(eventType) {
        // Check for simultaneous focus and click events.
        if (eventType === 'focus') {
          isFocused = true;
        }

        // Check html data attributes
        updateOptions();

        // Set Dropdown state
        activates.addClass('active');
        origin.addClass('active');

        var originWidth = origin[0].getBoundingClientRect().width;

        // Constrain width
        if (curr_options.constrainWidth === true) {
          activates.css('width', originWidth);
        } else {
          activates.css('white-space', 'nowrap');
        }

        // Offscreen detection
        var windowHeight = window.innerHeight;
        var originHeight = origin.innerHeight();
        var offsetLeft = origin.offset().left;
        var offsetTop = origin.offset().top - $(window).scrollTop();
        var currAlignment = curr_options.alignment;
        var gutterSpacing = 0;
        var leftPosition = 0;

        // Below Origin
        var verticalOffset = 0;
        if (curr_options.belowOrigin === true) {
          verticalOffset = originHeight;
        }

        // Check for scrolling positioned container.
        var scrollYOffset = 0;
        var scrollXOffset = 0;
        var wrapper = origin.parent();
        if (!wrapper.is('body')) {
          if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
            scrollYOffset = wrapper[0].scrollTop;
          }
          if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
            scrollXOffset = wrapper[0].scrollLeft;
          }
        }

        if (offsetLeft + activates.innerWidth() > $(window).width()) {
          // Dropdown goes past screen on right, force right alignment
          currAlignment = 'right';
        } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
          // Dropdown goes past screen on left, force left alignment
          currAlignment = 'left';
        }
        // Vertical bottom offscreen detection
        if (offsetTop + activates.innerHeight() > windowHeight) {
          // If going upwards still goes offscreen, just crop height of dropdown.
          if (offsetTop + originHeight - activates.innerHeight() < 0) {
            var adjustedHeight = windowHeight - offsetTop - verticalOffset;
            activates.css('max-height', adjustedHeight);
          } else {
            // Flow upwards.
            if (!verticalOffset) {
              verticalOffset += originHeight;
            }
            verticalOffset -= activates.innerHeight();
          }
        }

        // Handle edge alignment
        if (currAlignment === 'left') {
          gutterSpacing = curr_options.gutter;
          leftPosition = origin.position().left + gutterSpacing;
        } else if (currAlignment === 'right') {
          // Material icons fix
          activates.stop(true, true).css({
            opacity: 0,
            left: 0
          });

          var offsetRight = origin.position().left + originWidth - activates.width();
          gutterSpacing = -curr_options.gutter;
          leftPosition = offsetRight + gutterSpacing;
        }

        // Position dropdown
        activates.css({
          position: 'absolute',
          top: origin.position().top + verticalOffset + scrollYOffset,
          left: leftPosition + scrollXOffset
        });

        // Show dropdown
        activates.slideDown({
          queue: false,
          duration: curr_options.inDuration,
          easing: 'easeOutCubic',
          complete: function () {
            $(this).css('height', '');
          }
        }).animate({ opacity: 1 }, { queue: false, duration: curr_options.inDuration, easing: 'easeOutSine' });

        // Add click close handler to document
        setTimeout(function () {
          $(document).on('click.' + activates.attr('id'), function (e) {
            hideDropdown();
            $(document).off('click.' + activates.attr('id'));
          });
        }, 0);
      }

      function hideDropdown() {
        // Check for simultaneous focus and click events.
        isFocused = false;
        activates.fadeOut(curr_options.outDuration);
        activates.removeClass('active');
        origin.removeClass('active');
        $(document).off('click.' + activates.attr('id'));
        setTimeout(function () {
          activates.css('max-height', '');
        }, curr_options.outDuration);
      }

      // Hover
      if (curr_options.hover) {
        var open = false;
        origin.off('click.' + origin.attr('id'));
        // Hover handler to show dropdown
        origin.on('mouseenter', function (e) {
          // Mouse over
          if (open === false) {
            placeDropdown();
            open = true;
          }
        });
        origin.on('mouseleave', function (e) {
          // If hover on origin then to something other than dropdown content, then close
          var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
          if (!$(toEl).closest('.dropdown-content').is(activates)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        activates.on('mouseleave', function (e) {
          // Mouse out
          var toEl = e.toElement || e.relatedTarget;
          if (!$(toEl).closest('.dropdown-button').is(origin)) {
            activates.stop(true, true);
            hideDropdown();
            open = false;
          }
        });

        // Click
      } else {
        // Click handler to show dropdown
        origin.off('click.' + origin.attr('id'));
        origin.on('click.' + origin.attr('id'), function (e) {
          if (!isFocused) {
            if (origin[0] == e.currentTarget && !origin.hasClass('active') && $(e.target).closest('.dropdown-content').length === 0) {
              e.preventDefault(); // Prevents button click from moving window
              if (curr_options.stopPropagation) {
                e.stopPropagation();
              }
              placeDropdown('click');
            }
            // If origin is clicked and menu is open, close menu
            else if (origin.hasClass('active')) {
                hideDropdown();
                $(document).off('click.' + activates.attr('id'));
              }
          }
        });
      } // End else

      // Listen to open and close event - useful for select component
      origin.on('open', function (e, eventType) {
        placeDropdown(eventType);
      });
      origin.on('close', hideDropdown);
    });
  }; // End dropdown plugin

  $(document).ready(function () {
    $('.dropdown-button').dropdown();
  });
})(jQuery);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    ready: undefined,
    complete: undefined,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  /**
   * @class
   *
   */

  var Modal = function () {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    function Modal($el, options) {
      _classCallCheck(this, Modal);

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Modal) {
        $el[0].M_Modal.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} ready - Callback function called when modal is finished entering
       * @prop {Function} complete - Callback function called when modal is finished exiting
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.$el[0].M_Modal = this;
      this.id = $el.attr('id');
      this.openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

      Modal._increment++;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._increment * 2;
      this.$el[0].style.zIndex = 1000 + Modal._increment * 2 + 1;
      this.setupEventHandlers();
    }

    _createClass(Modal, [{
      key: 'getInstance',


      /**
       * Get Instance
       */
      value: function getInstance() {
        return this;
      }

      /**
       * Teardown component
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.removeEventHandlers();
        this.$el[0].removeAttribute('style');
        if (!!this.$overlay[0].parentNode) {
          this.$overlay[0].parentNode.removeChild(this.$overlay[0]);
        }
        this.$el[0].M_Modal = undefined;
        Modal._count--;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: 'setupEventHandlers',
      value: function setupEventHandlers() {
        this.handleOverlayClickBound = this.handleOverlayClick.bind(this);
        this.handleModalCloseClickBound = this.handleModalCloseClick.bind(this);

        if (Modal._count === 1) {
          document.body.addEventListener('click', this.handleTriggerClick);
        }
        this.$overlay[0].addEventListener('click', this.handleOverlayClickBound);
        this.$el[0].addEventListener('click', this.handleModalCloseClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: 'removeEventHandlers',
      value: function removeEventHandlers() {
        if (Modal._count === 0) {
          document.body.removeEventListener('click', this.handleTriggerClick);
        }
        this.$overlay[0].removeEventListener('click', this.handleOverlayClickBound);
        this.$el[0].removeEventListener('click', this.handleModalCloseClickBound);
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: 'handleTriggerClick',
      value: function handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.modal-trigger');
        if (e.target && $trigger.length) {
          var modalId = $trigger[0].getAttribute('href');
          if (modalId) {
            modalId = modalId.slice(1);
          } else {
            modalId = $trigger[0].getAttribute('data-target');
          }
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Handle Overlay Click
       */

    }, {
      key: 'handleOverlayClick',
      value: function handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Modal Close Click
       * @param {Event} e
       */

    }, {
      key: 'handleModalCloseClick',
      value: function handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest('.modal-close');
        if (e.target && $closeTrigger.length) {
          this.close();
        }
      }

      /**
       * Handle Keydown
       * @param {Event} e
       */

    }, {
      key: 'handleKeydown',
      value: function handleKeydown(e) {
        // ESC key
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Animate in modal
       */

    }, {
      key: 'animateIn',
      value: function animateIn() {
        var _this = this;

        // Set initial styles
        $.extend(this.$el[0].style, {
          display: 'block',
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: 'block',
          opacity: 0
        });

        // Animate overlay
        Vel(this.$overlay[0], { opacity: this.options.opacity }, { duration: this.options.inDuration, queue: false, ease: 'easeOutCubic' });

        // Define modal animation options
        var enterVelocityOptions = {
          duration: this.options.inDuration,
          queue: false,
          ease: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            if (typeof _this.options.ready === 'function') {
              _this.options.ready.call(_this, _this.$el, _this.openingTrigger);
            }
          }
        };

        // Bottom sheet animation
        if (this.$el[0].classList.contains('bottom-sheet')) {
          Vel(this.$el[0], { bottom: 0, opacity: 1 }, enterVelocityOptions);

          // Normal modal animation
        } else {
          Vel.hook(this.$el[0], 'scaleX', 0.7);
          this.$el[0].style.top = this.options.startingTop;
          Vel(this.$el[0], { top: this.options.endingTop, opacity: 1, scaleX: 1 }, enterVelocityOptions);
        }
      }

      /**
       * Animate out modal
       */

    }, {
      key: 'animateOut',
      value: function animateOut() {
        var _this2 = this;

        // Animate overlay
        Vel(this.$overlay[0], { opacity: 0 }, { duration: this.options.outDuration, queue: false, ease: 'easeOutQuart' });

        // Define modal animation options
        var exitVelocityOptions = {
          duration: this.options.outDuration,
          queue: false,
          ease: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            _this2.$el[0].style.display = 'none';
            // Call complete callback
            if (typeof _this2.options.complete === 'function') {
              _this2.options.complete.call(_this2, _this2.$el);
            }
            _this2.$overlay[0].parentNode.removeChild(_this2.$overlay[0]);
          }
        };

        // Bottom sheet animation
        if (this.$el[0].classList.contains('bottom-sheet')) {
          Vel(this.$el[0], { bottom: '-100%', opacity: 0 }, exitVelocityOptions);

          // Normal modal animation
        } else {
          Vel(this.$el[0], { top: this.options.startingTop, opacity: 0, scaleX: 0.7 }, exitVelocityOptions);
        }
      }

      /**
       * Open Modal
       * @param {jQuery} [$trigger]
       */

    }, {
      key: 'open',
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        var body = document.body;
        body.style.overflow = 'hidden';
        this.$el[0].classList.add('open');
        body.appendChild(this.$overlay[0]);

        // Set opening trigger, undefined indicates modal was opened by javascript
        this.openingTrigger = !!$trigger ? $trigger : undefined;

        if (this.options.dismissible) {
          this.handleKeydownBound = this.handleKeydown.bind(this);
          document.addEventListener('keydown', this.handleKeydownBound);
        }

        this.animateIn();

        return this;
      }

      /**
       * Close Modal
       */

    }, {
      key: 'close',
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.$el[0].classList.remove('open');
        document.body.style.overflow = '';

        if (this.options.dismissible) {
          document.removeEventListener('keydown', this.handleKeydownBound);
        }

        this.animateOut();

        return this;
      }
    }], [{
      key: 'init',
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Modal($(this), options));
        });
        return arr;
      }
    }, {
      key: 'defaults',
      get: function () {
        return _defaults;
      }
    }]);

    return Modal;
  }();

  /**
   * @static
   * @memberof Modal
   */


  Modal._increment = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  Materialize.Modal = Modal;

  $.fn.modal = function (methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Modal.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        return this.first()[0].M_Modal[methodOrOptions]();

        // Void methods
      } else {
        return this.each(function () {
          this.M_Modal[methodOrOptions]();
        });
      }

      // Initialize plugin if options or no argument is passed in
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      Modal.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.modal');
    }
  };
})(jQuery, Materialize.Vel);
;(function ($) {

  $.fn.materialbox = function () {

    return this.each(function () {

      if ($(this).hasClass('initialized')) {
        return;
      }

      $(this).addClass('initialized');

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 200;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = 0;
      var originalHeight = 0;
      var ancestorsChanged;
      var ancestor;
      var originInlineStyles = origin.attr('style');
      origin.wrap(placeholder);

      // Start click handler
      origin.on('click', function () {
        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.width();
        var originalHeight = origin.height();

        // If already modal, return to original
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        } else if (overlayActive && doneAnimating === true) {
          returnToOriginal();
          return false;
        }

        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder
        placeholder.css({
          width: placeholder[0].getBoundingClientRect().width,
          height: placeholder[0].getBoundingClientRect().height,
          position: 'relative',
          top: 0,
          left: 0
        });

        // Find ancestor with overflow: hidden; and remove it
        ancestorsChanged = undefined;
        ancestor = placeholder[0].parentNode;
        var count = 0;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (ancestorsChanged === undefined) {
              ancestorsChanged = curr;
            } else {
              ancestorsChanged = ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }

        // Set css on origin
        origin.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        }).data('width', originalWidth).data('height', originalHeight);

        // Add overlay
        var overlay = $('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).click(function () {
          if (doneAnimating === true) returnToOriginal();
        });

        // Put before in origin image to preserve z-index layering.
        origin.before(overlay);

        // Set dimensions if needed
        var overlayOffset = overlay[0].getBoundingClientRect();
        overlay.css({
          width: windowWidth,
          height: windowHeight,
          left: -1 * overlayOffset.left,
          top: -1 * overlayOffset.top
        });

        // Animate Overlay
        overlay.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });

        // Add and animate caption if it exists
        if (origin.data('caption') !== "") {
          var $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalHeight / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        } else {
          ratio = originalWidth / originalHeight;
          newWidth = windowHeight * 0.9 * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if (origin.hasClass('responsive-img')) {
          origin.velocity({ 'max-width': newWidth, 'width': originalWidth }, { duration: 0, queue: false,
            complete: function () {
              origin.css({ left: 0, top: 0 }).velocity({
                height: newHeight,
                width: newWidth,
                left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
                top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
              }, {
                duration: inDuration,
                queue: false,
                easing: 'easeOutQuad',
                complete: function () {
                  doneAnimating = true;
                }
              });
            } // End Complete
          }); // End Velocity
        } else {
          origin.css('left', 0).css('top', 0).velocity({
            height: newHeight,
            width: newWidth,
            left: $(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
            top: $(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
          }, {
            duration: inDuration,
            queue: false,
            easing: 'easeOutQuad',
            complete: function () {
              doneAnimating = true;
            }
          }); // End Velocity
        }

        // Handle Exit triggers
        $(window).on('scroll.materialbox', function () {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(window).on('resize.materialbox', function () {
          if (overlayActive) {
            returnToOriginal();
          }
        });

        $(document).on('keyup.materialbox', function (e) {
          // ESC key
          if (e.keyCode === 27 && doneAnimating === true && overlayActive) {
            returnToOriginal();
          }
        });
      }); // End click handler


      // This function returns the modaled image to the original spot
      function returnToOriginal() {

        doneAnimating = false;

        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.data('width');
        var originalHeight = origin.data('height');

        origin.velocity("stop", true);
        $('#materialbox-overlay').velocity("stop", true);
        $('.materialbox-caption').velocity("stop", true);

        // disable exit handlers
        $(window).off('scroll.materialbox');
        $(document).off('keyup.materialbox');
        $(window).off('resize.materialbox');

        $('#materialbox-overlay').velocity({ opacity: 0 }, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',
          complete: function () {
            // Remove Overlay
            overlayActive = false;
            $(this).remove();
          }
        });

        // Resize Image
        origin.velocity({
          width: originalWidth,
          height: originalHeight,
          left: 0,
          top: 0
        }, {
          duration: outDuration,
          queue: false, easing: 'easeOutQuad',
          complete: function () {
            placeholder.css({
              height: '',
              width: '',
              position: '',
              top: '',
              left: ''
            });

            origin.removeAttr('style');
            origin.attr('style', originInlineStyles);

            // Remove class
            origin.removeClass('active');
            doneAnimating = true;

            // Remove overflow overrides on ancestors
            if (ancestorsChanged) {
              ancestorsChanged.css('overflow', '');
            }
          }
        });

        // Remove Caption + reset css settings on image
        $('.materialbox-caption').velocity({ opacity: 0 }, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',
          complete: function () {
            $(this).remove();
          }
        });
      }
    });
  };

  $(document).ready(function () {
    $('.materialboxed').materialbox();
  });
})(jQuery);
;(function ($) {

  $.fn.parallax = function () {
    var window_width = $(window).width();
    // Parallax Scripts
    return this.each(function (i) {
      var $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) {
          container_height = $this.height() > 0 ? $this.height() : $this.children("img").height();
        } else {
          container_height = $this.height() > 0 ? $this.height() : 500;
        }
        var $img = $this.children("img").first();
        var img_height = $img.height();
        var parallax_dist = img_height - container_height;
        var bottom = $this.offset().top + container_height;
        var top = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        var parallax = Math.round(parallax_dist * percentScrolled);

        if (initial) {
          $img.css('display', 'block');
        }
        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
        }
      }

      // Wait for image load
      $this.children("img").one("load", function () {
        updateParallax(true);
      }).each(function () {
        if (this.complete) $(this).trigger("load");
      });

      $(window).scroll(function () {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(function () {
        window_width = $(window).width();
        updateParallax(false);
      });
    });
  };
})(jQuery);
;(function ($) {

  var methods = {
    init: function (options) {
      var defaults = {
        onShow: null,
        swipeable: false,
        responsiveThreshold: Infinity // breakpoint for swipeable
      };
      options = $.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($(this));

      return this.each(function (i) {

        var uniqueNamespace = namespace + i;

        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $this = $(this),
            window_width = $(window).width();

        var $active,
            $content,
            $links = $this.find('li.tab a'),
            $tabs_width = $this.width(),
            $tabs_content = $(),
            $tabs_wrapper,
            $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
            $indicator,
            index = 0,
            prev_index = 0,
            clicked = false,
            clickedTimeout,
            transition = 300;

        // Finds right attribute for indicator based on active tab.
        // el: jQuery Object
        var calcRightPos = function (el) {
          return Math.ceil($tabs_width - el.position().left - el[0].getBoundingClientRect().width - $this.scrollLeft());
        };

        // Finds left attribute for indicator based on active tab.
        // el: jQuery Object
        var calcLeftPos = function (el) {
          return Math.floor(el.position().left + $this.scrollLeft());
        };

        // Animates Indicator to active tab.
        // prev_index: Number
        var animateIndicator = function (prev_index) {
          if (index - prev_index >= 0) {
            $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad' });
            $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad', delay: 90 });
          } else {
            $indicator.velocity({ "left": calcLeftPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad' });
            $indicator.velocity({ "right": calcRightPos($active) }, { duration: transition, queue: false, easing: 'easeOutQuad', delay: 90 });
          }
        };

        // Change swipeable according to responsive threshold
        if (options.swipeable) {
          if (window_width > options.responsiveThreshold) {
            options.swipeable = false;
          }
        }

        // If the location.hash matches one of the links, use that as the active tab.
        $active = $($links.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if ($active.length === 0) {
          $active = $(this).find('li.tab a.active').first();
        }
        if ($active.length === 0) {
          $active = $(this).find('li.tab a').first();
        }

        $active.addClass('active');
        index = $links.index($active);
        if (index < 0) {
          index = 0;
        }

        if ($active[0] !== undefined) {
          $content = $($active[0].hash);
          $content.addClass('active');
        }

        // append indicator then set indicator width to tab width
        if (!$this.find('.indicator').length) {
          $this.append('<li class="indicator"></li>');
        }
        $indicator = $this.find('.indicator');

        // we make sure that the indicator is at the end of the tabs
        $this.append($indicator);

        if ($this.is(":visible")) {
          // $indicator.css({"right": $tabs_width - ((index + 1) * $tab_width)});
          // $indicator.css({"left": index * $tab_width});
          setTimeout(function () {
            $indicator.css({ "right": calcRightPos($active) });
            $indicator.css({ "left": calcLeftPos($active) });
          }, 0);
        }
        $(window).off('resize.tabs-' + uniqueNamespace).on('resize.tabs-' + uniqueNamespace, function () {
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
          if (index < 0) {
            index = 0;
          }
          if ($tab_width !== 0 && $tabs_width !== 0) {
            $indicator.css({ "right": calcRightPos($active) });
            $indicator.css({ "left": calcLeftPos($active) });
          }
        });

        // Initialize Tabs Content.
        if (options.swipeable) {
          // TODO: Duplicate calls with swipeable? handle multiple div wrapping.
          $links.each(function () {
            var $curr_content = $(Materialize.escapeHash(this.hash));
            $curr_content.addClass('carousel-item');
            $tabs_content = $tabs_content.add($curr_content);
          });
          $tabs_wrapper = $tabs_content.wrapAll('<div class="tabs-content carousel"></div>');
          $tabs_content.css('display', '');
          $('.tabs-content.carousel').carousel({
            fullWidth: true,
            noWrap: true,
            onCycleTo: function (item) {
              if (!clicked) {
                var prev_index = index;
                index = $tabs_wrapper.index(item);
                $active.removeClass('active');
                $active = $links.eq(index);
                $active.addClass('active');
                animateIndicator(prev_index);
                if (typeof options.onShow === "function") {
                  options.onShow.call($this[0], $content);
                }
              }
            }
          });
        } else {
          // Hide the remaining content
          $links.not($active).each(function () {
            $(Materialize.escapeHash(this.hash)).hide();
          });
        }

        // Bind the click event handler
        $this.off('click.tabs').on('click.tabs', 'a', function (e) {
          if ($(this).parent().hasClass('disabled')) {
            e.preventDefault();
            return;
          }

          // Act as regular link if target attribute is specified.
          if (!!$(this).attr("target")) {
            return;
          }

          clicked = true;
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;

          // Make the old tab inactive.
          $active.removeClass('active');
          var $oldContent = $content;

          // Update the variables with the new link and content
          $active = $(this);
          $content = $(Materialize.escapeHash(this.hash));
          $links = $this.find('li.tab a');
          var activeRect = $active.position();

          // Make the tab active.
          $active.addClass('active');
          prev_index = index;
          index = $links.index($(this));
          if (index < 0) {
            index = 0;
          }
          // Change url to current tab
          // window.location.hash = $active.attr('href');

          // Swap content
          if (options.swipeable) {
            if ($tabs_content.length) {
              $tabs_content.carousel('set', index, function () {
                if (typeof options.onShow === "function") {
                  options.onShow.call($this[0], $content);
                }
              });
            }
          } else {
            if ($content !== undefined) {
              $content.show();
              $content.addClass('active');
              if (typeof options.onShow === "function") {
                options.onShow.call(this, $content);
              }
            }

            if ($oldContent !== undefined && !$oldContent.is($content)) {
              $oldContent.hide();
              $oldContent.removeClass('active');
            }
          }

          // Reset clicked state
          clickedTimeout = setTimeout(function () {
            clicked = false;
          }, transition);

          // Update indicator
          animateIndicator(prev_index);

          // Prevent the anchor's default click action
          e.preventDefault();
        });
      });
    },
    select_tab: function (id) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.tabs = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tabs');
    }
  };

  $(document).ready(function () {
    $('ul.tabs').tabs();
  });
})(jQuery);
;(function ($) {
  $.fn.tooltip = function (options) {
    var timeout = null,
        margin = 5;

    // Defaults
    var defaults = {
      delay: 350,
      tooltip: '',
      position: 'bottom',
      html: false
    };

    // Remove tooltip from the activator
    if (options === "remove") {
      this.each(function () {
        $('#' + $(this).attr('data-tooltip-id')).remove();
        $(this).removeAttr('data-tooltip-id');
        $(this).off('mouseenter.tooltip mouseleave.tooltip');
      });
      return false;
    }

    options = $.extend(defaults, options);

    return this.each(function () {
      var tooltipId = Materialize.guid();
      var origin = $(this);

      // Destroy old tooltip
      if (origin.attr('data-tooltip-id')) {
        $('#' + origin.attr('data-tooltip-id')).remove();
      }

      origin.attr('data-tooltip-id', tooltipId);

      // Get attributes.
      var allowHtml, tooltipDelay, tooltipPosition, tooltipText, tooltipEl, backdrop;
      var setAttributes = function () {
        allowHtml = origin.attr('data-html') ? origin.attr('data-html') === 'true' : options.html;
        tooltipDelay = origin.attr('data-delay');
        tooltipDelay = tooltipDelay === undefined || tooltipDelay === '' ? options.delay : tooltipDelay;
        tooltipPosition = origin.attr('data-position');
        tooltipPosition = tooltipPosition === undefined || tooltipPosition === '' ? options.position : tooltipPosition;
        tooltipText = origin.attr('data-tooltip');
        tooltipText = tooltipText === undefined || tooltipText === '' ? options.tooltip : tooltipText;
      };
      setAttributes();

      var renderTooltipEl = function () {
        var tooltip = $('<div class="material-tooltip"></div>');

        // Create Text span
        if (allowHtml) {
          tooltipText = $('<span></span>').html(tooltipText);
        } else {
          tooltipText = $('<span></span>').text(tooltipText);
        }

        // Create tooltip
        tooltip.append(tooltipText).appendTo($('body')).attr('id', tooltipId);

        // Create backdrop
        backdrop = $('<div class="backdrop"></div>');
        backdrop.appendTo(tooltip);
        return tooltip;
      };
      tooltipEl = renderTooltipEl();

      // Destroy previously binded events
      origin.off('mouseenter.tooltip mouseleave.tooltip');
      // Mouse In
      var started = false,
          timeoutRef;
      origin.on({ 'mouseenter.tooltip': function (e) {
          var showTooltip = function () {
            setAttributes();
            started = true;
            tooltipEl.velocity('stop');
            backdrop.velocity('stop');
            tooltipEl.css({ visibility: 'visible', left: '0px', top: '0px' });

            // Tooltip positioning
            var originWidth = origin.outerWidth();
            var originHeight = origin.outerHeight();
            var tooltipHeight = tooltipEl.outerHeight();
            var tooltipWidth = tooltipEl.outerWidth();
            var tooltipVerticalMovement = '0px';
            var tooltipHorizontalMovement = '0px';
            var backdropOffsetWidth = backdrop[0].offsetWidth;
            var backdropOffsetHeight = backdrop[0].offsetHeight;
            var scaleXFactor = 8;
            var scaleYFactor = 8;
            var scaleFactor = 0;
            var targetTop, targetLeft, newCoordinates;

            if (tooltipPosition === "top") {
              // Top Position
              targetTop = origin.offset().top - tooltipHeight - margin;
              targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
              tooltipVerticalMovement = '-10px';
              backdrop.css({
                bottom: 0,
                left: 0,
                borderRadius: '14px 14px 0 0',
                transformOrigin: '50% 100%',
                marginTop: tooltipHeight,
                marginLeft: tooltipWidth / 2 - backdropOffsetWidth / 2
              });
            }
            // Left Position
            else if (tooltipPosition === "left") {
                targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                targetLeft = origin.offset().left - tooltipWidth - margin;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                tooltipHorizontalMovement = '-10px';
                backdrop.css({
                  top: '-7px',
                  right: 0,
                  width: '14px',
                  height: '14px',
                  borderRadius: '14px 0 0 14px',
                  transformOrigin: '95% 50%',
                  marginTop: tooltipHeight / 2,
                  marginLeft: tooltipWidth
                });
              }
              // Right Position
              else if (tooltipPosition === "right") {
                  targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                  targetLeft = origin.offset().left + originWidth + margin;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                  tooltipHorizontalMovement = '+10px';
                  backdrop.css({
                    top: '-7px',
                    left: 0,
                    width: '14px',
                    height: '14px',
                    borderRadius: '0 14px 14px 0',
                    transformOrigin: '5% 50%',
                    marginTop: tooltipHeight / 2,
                    marginLeft: '0px'
                  });
                } else {
                  // Bottom Position
                  targetTop = origin.offset().top + origin.outerHeight() + margin;
                  targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
                  newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                  tooltipVerticalMovement = '+10px';
                  backdrop.css({
                    top: 0,
                    left: 0,
                    marginLeft: tooltipWidth / 2 - backdropOffsetWidth / 2
                  });
                }

            // Set tooptip css placement
            tooltipEl.css({
              top: newCoordinates.y,
              left: newCoordinates.x
            });

            // Calculate Scale to fill
            scaleXFactor = Math.SQRT2 * tooltipWidth / parseInt(backdropOffsetWidth);
            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt(backdropOffsetHeight);
            scaleFactor = Math.max(scaleXFactor, scaleYFactor);

            tooltipEl.velocity({ translateY: tooltipVerticalMovement, translateX: tooltipHorizontalMovement }, { duration: 350, queue: false }).velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: false });
            backdrop.css({ visibility: 'visible' }).velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: false }).velocity({ scaleX: scaleFactor, scaleY: scaleFactor }, { duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad' });
          };

          timeoutRef = setTimeout(showTooltip, tooltipDelay); // End Interval

          // Mouse Out
        },
        'mouseleave.tooltip': function () {
          // Reset State
          started = false;
          clearTimeout(timeoutRef);

          // Animate back
          setTimeout(function () {
            if (started !== true) {
              tooltipEl.velocity({
                opacity: 0, translateY: 0, translateX: 0 }, { duration: 225, queue: false });
              backdrop.velocity({ opacity: 0, scaleX: 1, scaleY: 1 }, {
                duration: 225,
                queue: false,
                complete: function () {
                  backdrop.css({ visibility: 'hidden' });
                  tooltipEl.css({ visibility: 'hidden' });
                  started = false;
                }
              });
            }
          }, 225);
        }
      });
    });
  };

  var repositionWithinScreen = function (x, y, width, height) {
    var newX = x;
    var newY = y;

    if (newX < 0) {
      newX = 4;
    } else if (newX + width > window.innerWidth) {
      newX -= newX + width - window.innerWidth;
    }

    if (newY < 0) {
      newY = 4;
    } else if (newY + height > window.innerHeight + $(window).scrollTop) {
      newY -= newY + height - window.innerHeight;
    }

    return { x: newX, y: newY };
  };

  $(document).ready(function () {
    $('.tooltipped').tooltip();
  });
})(jQuery);
; /*!
  * Waves v0.6.4
  * http://fian.my.id/Waves
  *
  * Copyright 2014 Alfiana E. Sibuea and other contributors
  * Released under the MIT license
  * https://github.com/fians/Waves/blob/master/LICENSE
  */

;(function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
        win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }

    return style;
  }

  var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);
})(window);
;(function ($, Vel) {
  'use strict';

  var _defaults = {
    displayLength: Infinity,
    inDuration: 300,
    outDuration: 375,
    className: undefined,
    completeCallback: undefined,
    activationPercent: 0.8
  };

  var Toast = function () {
    function Toast(message, displayLength, className, completeCallback) {
      _classCallCheck(this, Toast);

      if (!message) {
        return;
      }

      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = {
        displayLength: displayLength,
        className: className,
        completeCallback: completeCallback
      };

      this.options = $.extend({}, Toast.defaults, this.options);
      this.message = message;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      var toastElement = this.createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this._animateIn();
      this.setTimer();
    }

    _createClass(Toast, [{
      key: 'createToast',


      /**
       * Create toast and append it to toast container
       */
      value: function createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');

        // Add custom classes onto toast
        if (this.options.className) {
          var classes = this.options.className.split(' ');
          var i = void 0,
              count = void 0;
          for (i = 0, count = classes.length; i < count; i++) {
            toast.classList.add(classes[i]);
          }
        }

        // Set content
        if (typeof HTMLElement === 'object' ? this.message instanceof HTMLElement : this.message && typeof this.message === 'object' && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === 'string') {
          toast.appendChild(this.message);

          // Check if it is jQuery object
        } else if (this.message instanceof jQuery) {
          $(toast).append(this.message);

          // Insert as text;
        } else {
          toast.innerHTML = this.message;
        }

        // Append toasft
        Toast._container.appendChild(toast);
        return toast;
      }

      /**
       * Animate in toast
       */

    }, {
      key: '_animateIn',
      value: function _animateIn() {
        // Animate toast in
        Vel(this.el, { top: 0, opacity: 1 }, {
          duration: 300,
          easing: 'easeOutCubic',
          queue: false
        });
      }

      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */

    }, {
      key: 'setTimer',
      value: function setTimer() {
        var _this3 = this;

        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            // If toast is not being dragged, decrease its time remaining
            if (!_this3.panning) {
              _this3.timeRemaining -= 20;
            }

            // Animate toast out
            if (_this3.timeRemaining <= 0) {
              _this3.remove();
            }
          }, 20);
        }
      }

      /**
       * Dismiss toast with animation
       */

    }, {
      key: 'remove',
      value: function remove() {
        var _this4 = this;

        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;

        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = 'translateX(' + activationDistance + 'px)';
          this.el.style.opacity = 0;
        }

        Vel(this.el, { opacity: 0, marginTop: '-40px' }, {
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          queue: false,
          complete: function () {
            // Call the optional callback
            if (typeof _this4.options.completeCallback === 'function') {
              _this4.options.completeCallback();
            }
            // Remove toast from DOM
            _this4.el.parentNode.removeChild(_this4.el);
            Toast._toasts.splice(Toast._toasts.indexOf(_this4), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: '_createContainer',


      /**
       * Append toast container and add event handlers
       */
      value: function _createContainer() {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');

        // Add event handler
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);

        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);

        document.body.appendChild(container);
        Toast._container = container;
      }

      /**
       * Remove toast container and event handlers
       */

    }, {
      key: '_removeContainer',
      value: function _removeContainer() {
        // Add event handler
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);

        Toast._container.parentNode.removeChild(Toast._container);
        Toast._container = null;
      }

      /**
       * Begin drag handler
       * @param {Event} e
       */

    }, {
      key: '_onDragStart',
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest('.toast').length) {
          var $toast = $(e.target).closest('.toast');
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add('panning');
          toast.el.style.transition = '';
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }

      /**
       * Drag move handler
       * @param {Event} e
       */

    }, {
      key: '_onDragMove',
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = 'translateX(' + totalDeltaX + 'px)';
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }

      /**
       * End drag handler
       * @param {Event} e
       */

    }, {
      key: '_onDragEnd',
      value: function _onDragEnd(e) {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove('panning');

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;

          // Remove toast
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.remove();

            // Animate toast back to original position
          } else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = '';
            toast.el.style.opacity = '';
          }
          Toast._draggedToast = null;
        }
      }

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       */

    }, {
      key: '_xPos',
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }

      /**
       * Remove all toasts
       */

    }, {
      key: 'removeAll',
      value: function removeAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].remove();
        }
      }
    }, {
      key: 'defaults',
      get: function () {
        return _defaults;
      }
    }]);

    return Toast;
  }();

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */


  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  Materialize.Toast = Toast;
  Materialize.toast = function (message, displayLength, className, completeCallback) {
    return new Toast(message, displayLength, className, completeCallback);
  };
})(jQuery, Materialize.Vel);
;(function ($) {

  var methods = {
    init: function (options) {
      var defaults = {
        menuWidth: 300,
        edge: 'left',
        closeOnClick: false,
        draggable: true,
        onOpen: null,
        onClose: null
      };
      options = $.extend(defaults, options);

      $(this).each(function () {
        var $this = $(this);
        var menuId = $this.attr('data-activates');
        var menu = $("#" + menuId);

        // Set to width
        if (options.menuWidth != 300) {
          menu.css('width', options.menuWidth);
        }

        // Add Touch Area
        var $dragTarget = $('.drag-target[data-sidenav="' + menuId + '"]');
        if (options.draggable) {
          // Regenerate dragTarget
          if ($dragTarget.length) {
            $dragTarget.remove();
          }

          $dragTarget = $('<div class="drag-target"></div>').attr('data-sidenav', menuId);
          $('body').append($dragTarget);
        } else {
          $dragTarget = $();
        }

        if (options.edge == 'left') {
          menu.css('transform', 'translateX(-100%)');
          $dragTarget.css({ 'left': 0 }); // Add Touch Area
        } else {
          menu.addClass('right-aligned') // Change text-alignment to right
          .css('transform', 'translateX(100%)');
          $dragTarget.css({ 'right': 0 }); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if (menu.hasClass('fixed')) {
          if (window.innerWidth > 992) {
            menu.css('transform', 'translateX(0)');
          }
        }

        // Window resize to reset on large screens fixed
        if (menu.hasClass('fixed')) {
          $(window).resize(function () {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').length !== 0 && menuOut) {
                removeMenu(true);
              } else {
                // menu.removeAttr('style');
                menu.css('transform', 'translateX(0%)');
                // menu.css('width', options.menuWidth);
              }
            } else if (menuOut === false) {
              if (options.edge === 'left') {
                menu.css('transform', 'translateX(-100%)');
              } else {
                menu.css('transform', 'translateX(100%)');
              }
            }
          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick === true) {
          menu.on("click.itemclick", "a:not(.collapsible-header)", function () {
            if (!(window.innerWidth > 992 && menu.hasClass('fixed'))) {
              removeMenu();
            }
          });
        }

        var removeMenu = function (restoreNav) {
          panning = false;
          menuOut = false;
          // Reenable scrolling
          $('body').css({
            overflow: '',
            width: ''
          });

          $('#sidenav-overlay').velocity({ opacity: 0 }, { duration: 200,
            queue: false, easing: 'easeOutQuad',
            complete: function () {
              $(this).remove();
            } });
          if (options.edge === 'left') {
            // Reset phantom div
            $dragTarget.css({ width: '', right: '', left: '0' });
            menu.velocity({ 'translateX': '-100%' }, { duration: 200,
              queue: false,
              easing: 'easeOutCubic',
              complete: function () {
                if (restoreNav === true) {
                  // Restore Fixed sidenav
                  menu.removeAttr('style');
                  menu.css('width', options.menuWidth);
                }
              }

            });
          } else {
            // Reset phantom div
            $dragTarget.css({ width: '', right: '0', left: '' });
            menu.velocity({ 'translateX': '100%' }, { duration: 200,
              queue: false,
              easing: 'easeOutCubic',
              complete: function () {
                if (restoreNav === true) {
                  // Restore Fixed sidenav
                  menu.removeAttr('style');
                  menu.css('width', options.menuWidth);
                }
              }
            });
          }

          // Callback
          if (typeof options.onClose === 'function') {
            options.onClose.call(this, menu);
          }
        };

        // Touch Event
        var panning = false;
        var menuOut = false;

        if (options.draggable) {
          $dragTarget.on('click', function () {
            if (menuOut) {
              removeMenu();
            }
          });

          $dragTarget.hammer({
            prevent_default: false
          }).on('pan', function (e) {

            if (e.gesture.pointerType == "touch") {

              var direction = e.gesture.direction;
              var x = e.gesture.center.x;
              var y = e.gesture.center.y;
              var velocityX = e.gesture.velocityX;

              // Vertical scroll bugfix
              if (x === 0 && y === 0) {
                return;
              }

              // Disable Scrolling
              var $body = $('body');
              var $overlay = $('#sidenav-overlay');
              var oldWidth = $body.innerWidth();
              $body.css('overflow', 'hidden');
              $body.width(oldWidth);

              // If overlay does not exist, create one and if it is clicked, close menu
              if ($overlay.length === 0) {
                $overlay = $('<div id="sidenav-overlay"></div>');
                $overlay.css('opacity', 0).click(function () {
                  removeMenu();
                });

                // Run 'onOpen' when sidenav is opened via touch/swipe if applicable
                if (typeof options.onOpen === 'function') {
                  options.onOpen.call(this, menu);
                }

                $('body').append($overlay);
              }

              // Keep within boundaries
              if (options.edge === 'left') {
                if (x > options.menuWidth) {
                  x = options.menuWidth;
                } else if (x < 0) {
                  x = 0;
                }
              }

              if (options.edge === 'left') {
                // Left Direction
                if (x < options.menuWidth / 2) {
                  menuOut = false;
                }
                // Right Direction
                else if (x >= options.menuWidth / 2) {
                    menuOut = true;
                  }
                menu.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
              } else {
                // Left Direction
                if (x < window.innerWidth - options.menuWidth / 2) {
                  menuOut = true;
                }
                // Right Direction
                else if (x >= window.innerWidth - options.menuWidth / 2) {
                    menuOut = false;
                  }
                var rightPos = x - options.menuWidth / 2;
                if (rightPos < 0) {
                  rightPos = 0;
                }

                menu.css('transform', 'translateX(' + rightPos + 'px)');
              }

              // Percentage overlay
              var overlayPerc;
              if (options.edge === 'left') {
                overlayPerc = x / options.menuWidth;
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: 'easeOutQuad' });
              } else {
                overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
                $overlay.velocity({ opacity: overlayPerc }, { duration: 10, queue: false, easing: 'easeOutQuad' });
              }
            }
          }).on('panend', function (e) {

            if (e.gesture.pointerType == "touch") {
              var $overlay = $('#sidenav-overlay');
              var velocityX = e.gesture.velocityX;
              var x = e.gesture.center.x;
              var leftPos = x - options.menuWidth;
              var rightPos = x - options.menuWidth / 2;
              if (leftPos > 0) {
                leftPos = 0;
              }
              if (rightPos < 0) {
                rightPos = 0;
              }
              panning = false;

              if (options.edge === 'left') {
                // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
                if (menuOut && velocityX <= 0.3 || velocityX < -0.5) {
                  // Return menu to open
                  if (leftPos !== 0) {
                    menu.velocity({ 'translateX': [0, leftPos] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                  }

                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: 'easeOutQuad' });
                  $dragTarget.css({ width: '50%', right: 0, left: '' });
                  menuOut = true;
                } else if (!menuOut || velocityX > 0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: ''
                  });
                  // Slide menu closed
                  menu.velocity({ 'translateX': [-1 * options.menuWidth - 10, leftPos] }, { duration: 200, queue: false, easing: 'easeOutQuad' });
                  $overlay.velocity({ opacity: 0 }, { duration: 200, queue: false, easing: 'easeOutQuad',
                    complete: function () {
                      // Run 'onClose' when sidenav is closed via touch/swipe if applicable
                      if (typeof options.onClose === 'function') {
                        options.onClose.call(this, menu);
                      }

                      $(this).remove();
                    } });
                  $dragTarget.css({ width: '10px', right: '', left: 0 });
                }
              } else {
                if (menuOut && velocityX >= -0.3 || velocityX > 0.5) {
                  // Return menu to open
                  if (rightPos !== 0) {
                    menu.velocity({ 'translateX': [0, rightPos] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                  }

                  $overlay.velocity({ opacity: 1 }, { duration: 50, queue: false, easing: 'easeOutQuad' });
                  $dragTarget.css({ width: '50%', right: '', left: 0 });
                  menuOut = true;
                } else if (!menuOut || velocityX < -0.3) {
                  // Enable Scrolling
                  $('body').css({
                    overflow: '',
                    width: ''
                  });

                  // Slide menu closed
                  menu.velocity({ 'translateX': [options.menuWidth + 10, rightPos] }, { duration: 200, queue: false, easing: 'easeOutQuad' });
                  $overlay.velocity({ opacity: 0 }, { duration: 200, queue: false, easing: 'easeOutQuad',
                    complete: function () {
                      // Run 'onClose' when sidenav is closed via touch/swipe if applicable
                      if (typeof options.onClose === 'function') {
                        options.onClose.call(this, menu);
                      }

                      $(this).remove();
                    } });
                  $dragTarget.css({ width: '10px', right: 0, left: '' });
                }
              }
            }
          });
        }

        $this.off('click.sidenav').on('click.sidenav', function () {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            removeMenu();
          } else {

            // Disable Scrolling
            var $body = $('body');
            var $overlay = $('<div id="sidenav-overlay"></div>');
            var oldWidth = $body.innerWidth();
            $body.css('overflow', 'hidden');
            $body.width(oldWidth);

            // Push current drag target on top of DOM tree
            $('body').append($dragTarget);

            if (options.edge === 'left') {
              $dragTarget.css({ width: '50%', right: 0, left: '' });
              menu.velocity({ 'translateX': [0, -1 * options.menuWidth] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            } else {
              $dragTarget.css({ width: '50%', right: '', left: 0 });
              menu.velocity({ 'translateX': [0, options.menuWidth] }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }

            // Overlay close on click
            $overlay.css('opacity', 0).click(function () {
              menuOut = false;
              panning = false;
              removeMenu();
              $overlay.velocity({ opacity: 0 }, { duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  $(this).remove();
                }
              });
            });

            // Append body
            $('body').append($overlay);
            $overlay.velocity({ opacity: 1 }, { duration: 300, queue: false, easing: 'easeOutQuad',
              complete: function () {
                menuOut = true;
                panning = false;
              }
            });

            // Callback
            if (typeof options.onOpen === 'function') {
              options.onOpen.call(this, menu);
            }
          }

          return false;
        });
      });
    },
    destroy: function () {
      var $overlay = $('#sidenav-overlay');
      var $dragTarget = $('.drag-target[data-sidenav="' + $(this).attr('data-activates') + '"]');
      $overlay.trigger('click');
      $dragTarget.remove();
      $(this).off('click');
      $overlay.remove();
    },
    show: function () {
      this.trigger('click');
    },
    hide: function () {
      $('#sidenav-overlay').trigger('click');
    }
  };

  $.fn.sideNav = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.sideNav');
    }
  }; // Plugin end
})(jQuery);
; /**
  * Extend jquery with a scrollspy plugin.
  * This watches the window scroll and fires events when elements are scrolled into viewport.
  *
  * throttle() and getTime() taken from Underscore.js
  * https://github.com/jashkenas/underscore
  *
  * @author Copyright 2013 John Smart
  * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
  * @see https://github.com/thesmart
  * @version 0.1.2
  */
(function ($) {

  var jWindow = $(window);
  var elements = [];
  var elementsInView = [];
  var isSpying = false;
  var ticks = 0;
  var unique_id = 1;
  var offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0

    /**
     * Find elements that are within the boundary
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {number} left
     * @return {jQuery}		A collection of elements
     */
  };function findElements(top, right, bottom, left) {
    var hits = $();
    $.each(elements, function (i, element) {
      if (element.height() > 0) {
        var elTop = element.offset().top,
            elLeft = element.offset().left,
            elRight = elLeft + element.width(),
            elBottom = elTop + element.height();

        var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < top);

        if (isIntersect) {
          hits.push(element);
        }
      }
    });

    return hits;
  }

  /**
   * Called when the user scrolls the window
   */
  function onScroll(scrollOffset) {
    // unique tick id
    ++ticks;

    // viewport rectangle
    var top = jWindow.scrollTop(),
        left = jWindow.scrollLeft(),
        right = left + jWindow.width(),
        bottom = top + jWindow.height();

    // determine which elements are in view
    var intersections = findElements(top + offset.top + scrollOffset || 200, right + offset.right, bottom + offset.bottom, left + offset.left);
    $.each(intersections, function (i, element) {

      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick != 'number') {
        // entered into view
        element.triggerHandler('scrollSpy:enter');
      }

      // update tick id
      element.data('scrollSpy:ticks', ticks);
    });

    // determine which elements are no longer in view
    $.each(elementsInView, function (i, element) {
      var lastTick = element.data('scrollSpy:ticks');
      if (typeof lastTick == 'number' && lastTick !== ticks) {
        // exited from view
        element.triggerHandler('scrollSpy:exit');
        element.data('scrollSpy:ticks', null);
      }
    });

    // remember elements in view for next tick
    elementsInView = intersections;
  }

  /**
   * Called when window is resized
  */
  function onWinSize() {
    jWindow.trigger('scrollSpy:winSize');
  }

  /**
   * Enables ScrollSpy using a selector
   * @param {jQuery|string} selector  The elements collection, or a selector
   * @param {Object=} options	Optional.
         throttle : number -> scrollspy throttling. Default: 100 ms
         offsetTop : number -> offset from top. Default: 0
         offsetRight : number -> offset from right. Default: 0
         offsetBottom : number -> offset from bottom. Default: 0
         offsetLeft : number -> offset from left. Default: 0
  			activeClass : string -> Class name to be added to the active link. Default: active
   * @returns {jQuery}
   */
  $.scrollSpy = function (selector, options) {
    var defaults = {
      throttle: 100,
      scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
      activeClass: 'active',
      getActiveElement: function (id) {
        return 'a[href="#' + id + '"]';
      }
    };
    options = $.extend(defaults, options);

    var visible = [];
    selector = $(selector);
    selector.each(function (i, element) {
      elements.push($(element));
      $(element).data("scrollSpy:id", i);
      // Smooth scroll to section
      $('a[href="#' + $(element).attr('id') + '"]').click(function (e) {
        e.preventDefault();
        var offset = $(Materialize.escapeHash(this.hash)).offset().top + 1;
        $('html, body').animate({ scrollTop: offset - options.scrollOffset }, { duration: 400, queue: false, easing: 'easeOutCubic' });
      });
    });

    offset.top = options.offsetTop || 0;
    offset.right = options.offsetRight || 0;
    offset.bottom = options.offsetBottom || 0;
    offset.left = options.offsetLeft || 0;

    var throttledScroll = Materialize.throttle(function () {
      onScroll(options.scrollOffset);
    }, options.throttle || 100);
    var readyScroll = function () {
      $(document).ready(throttledScroll);
    };

    if (!isSpying) {
      jWindow.on('scroll', readyScroll);
      jWindow.on('resize', readyScroll);
      isSpying = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(readyScroll, 0);

    selector.on('scrollSpy:enter', function () {
      visible = $.grep(visible, function (value) {
        return value.height() != 0;
      });

      var $this = $(this);

      if (visible[0]) {
        $(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
        if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
          visible.unshift($(this));
        } else {
          visible.push($(this));
        }
      } else {
        visible.push($(this));
      }

      $(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
    });
    selector.on('scrollSpy:exit', function () {
      visible = $.grep(visible, function (value) {
        return value.height() != 0;
      });

      if (visible[0]) {
        $(options.getActiveElement(visible[0].attr('id'))).removeClass(options.activeClass);
        var $this = $(this);
        visible = $.grep(visible, function (value) {
          return value.attr('id') != $this.attr('id');
        });
        if (visible[0]) {
          // Check if empty
          $(options.getActiveElement(visible[0].attr('id'))).addClass(options.activeClass);
        }
      }
    });

    return selector;
  };

  /**
   * Listen for window resize events
   * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
   * @returns {jQuery}		$(window)
   */
  $.winSizeSpy = function (options) {
    $.winSizeSpy = function () {
      return jWindow;
    }; // lock from multiple calls
    options = options || {
      throttle: 100
    };
    return jWindow.on('resize', Materialize.throttle(onWinSize, options.throttle || 100));
  };

  /**
   * Enables ScrollSpy on a collection of elements
   * e.g. $('.scrollSpy').scrollSpy()
   * @param {Object=} options	Optional.
  										throttle : number -> scrollspy throttling. Default: 100 ms
  										offsetTop : number -> offset from top. Default: 0
  										offsetRight : number -> offset from right. Default: 0
  										offsetBottom : number -> offset from bottom. Default: 0
  										offsetLeft : number -> offset from left. Default: 0
   * @returns {jQuery}
   */
  $.fn.scrollSpy = function (options) {
    return $.scrollSpy($(this), options);
  };
})(jQuery);
;(function ($) {
  $(document).ready(function () {

    // Function to update labels of text fields
    Materialize.updateTextFields = function () {
      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function (index, element) {
        var $this = $(this);
        if ($(element).val().length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== undefined) {
          $this.siblings('label').addClass('active');
        } else if ($(element)[0].validity) {
          $this.siblings('label').toggleClass('active', $(element)[0].validity.badInput === true);
        } else {
          $this.siblings('label').removeClass('active');
        }
      });
    };

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if ($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
        $(this).siblings('label').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(function () {
          var reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, .prefix').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      var $inputElement = $(this);
      var selector = ".prefix";

      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        selector += ", label";
      }

      $inputElement.siblings(selector).removeClass('active');

      validate_field($inputElement);
    });

    window.validate_field = function (object) {
      var hasLength = object.attr('data-length') !== undefined;
      var lenAttr = parseInt(object.attr('data-length'));
      var len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false && !object.is(':required')) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      } else {
        if (object.hasClass('validate')) {
          // Check for character counter attributes
          if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
            object.removeClass('invalid');
            object.addClass('valid');
          } else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    };

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup.radio', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === 9) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function (e) {

          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');
      var lineHeight = $textarea.css('line-height');
      var padding = $textarea.css('padding');

      if (fontSize) {
        hiddenDiv.css('font-size', fontSize);
      }
      if (fontFamily) {
        hiddenDiv.css('font-family', fontFamily);
      }
      if (lineHeight) {
        hiddenDiv.css('line-height', lineHeight);
      }
      if (padding) {
        hiddenDiv.css('padding', padding);
      }

      // Set original-height, if none
      if (!$textarea.data('original-height')) {
        $textarea.data('original-height', $textarea.height());
      }

      if ($textarea.attr('wrap') === 'off') {
        hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
      }

      hiddenDiv.text($textarea.val() + '\n');
      var content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);

      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      } else {
        hiddenDiv.css('width', $(window).width() / 2);
      }

      /**
       * Resize if the new height is greater than the
       * original height of the textarea
       */
      if ($textarea.data('original-height') <= hiddenDiv.height()) {
        $textarea.css('height', hiddenDiv.height());
      } else if ($textarea.val().length < $textarea.data('previous-length')) {
        /**
         * In case the new height is less than original height, it
         * means the textarea has less text than before
         * So we set the height to the original one
         */
        $textarea.css('height', $textarea.data('original-height'));
      }
      $textarea.data('previous-length', $textarea.val().length);
    }

    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
       * Instead of resizing textarea on document load,
       * store the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', $textarea.val().length);
    });

    $('body').on('keyup keydown autoresize', text_area_selector, function () {
      textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input.val(file_names.join(", "));
      path_input.trigger('change');
    });

    /****************
    *  Range Input  *
    ****************/

    var range_type = 'input[type=range]';
    var range_mousedown = false;
    var left;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var showRangeBubble = function (thumb) {
      var paddingLeft = parseInt(thumb.parent().css('padding-left'));
      var marginLeft = -7 + paddingLeft + 'px';
      thumb.velocity({ height: "30px", width: "30px", top: "-30px", marginLeft: marginLeft }, { duration: 300, easing: 'easeOutExpo' });
    };

    var calcRangeOffset = function (range) {
      var width = range.width() - 15;
      var max = parseFloat(range.attr('max'));
      var min = parseFloat(range.attr('min'));
      var percent = (parseFloat(range.val()) - min) / (max - min);
      return percent * width;
    };

    var range_wrapper = '.range-field';
    $(document).on('change', range_type, function (e) {
      var thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      var offsetLeft = calcRangeOffset($(this));
      thumb.addClass('active').css('left', offsetLeft);
    });

    $(document).on('mousedown touchstart', range_type, function (e) {
      var thumb = $(this).siblings('.thumb');

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).after(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        showRangeBubble(thumb);
      }

      if (e.type !== 'input') {
        var offsetLeft = calcRangeOffset($(this));
        thumb.addClass('active').css('left', offsetLeft);
      }
    });

    $(document).on('mouseup touchend', range_wrapper, function () {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('input mousemove touchmove', range_wrapper, function (e) {
      var thumb = $(this).children('.thumb');
      var left;
      var input = $(this).find(range_type);

      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          showRangeBubble(thumb);
        }

        var offsetLeft = calcRangeOffset(input);
        thumb.addClass('active').css('left', offsetLeft);
        thumb.find('.value').html(thumb.siblings(range_type).val());
      }
    });

    $(document).on('mouseout touchleave', range_wrapper, function () {
      if (!range_mousedown) {

        var thumb = $(this).children('.thumb');
        var paddingLeft = parseInt($(this).css('padding-left'));
        var marginLeft = 7 + paddingLeft + 'px';

        if (thumb.hasClass('active')) {
          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: marginLeft }, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });

    /**************************
     * Auto complete plugin  *
     *************************/
    $.fn.autocomplete = function (options) {
      // Defaults
      var defaults = {
        data: {},
        limit: Infinity,
        onAutocomplete: null,
        minLength: 1
      };

      options = $.extend(defaults, options);

      return this.each(function () {
        var $input = $(this);
        var data = options.data,
            count = 0,
            activeIndex = -1,
            oldVal,
            $inputDiv = $input.closest('.input-field'); // Div to append on

        // Check if data isn't empty
        if (!$.isEmptyObject(data)) {
          var $autocomplete = $('<ul class="autocomplete-content dropdown-content"></ul>');
          var $oldAutocomplete;

          // Append autocomplete element.
          // Prevent double structure init.
          if ($inputDiv.length) {
            $oldAutocomplete = $inputDiv.children('.autocomplete-content.dropdown-content').first();
            if (!$oldAutocomplete.length) {
              $inputDiv.append($autocomplete); // Set ul in body
            }
          } else {
            $oldAutocomplete = $input.next('.autocomplete-content.dropdown-content');
            if (!$oldAutocomplete.length) {
              $input.after($autocomplete);
            }
          }
          if ($oldAutocomplete.length) {
            $autocomplete = $oldAutocomplete;
          }

          // Highlight partial match.
          var highlight = function (string, $el) {
            var img = $el.find('img');
            var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
                matchEnd = matchStart + string.length - 1,
                beforeMatch = $el.text().slice(0, matchStart),
                matchText = $el.text().slice(matchStart, matchEnd + 1),
                afterMatch = $el.text().slice(matchEnd + 1);
            $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
            if (img.length) {
              $el.prepend(img);
            }
          };

          // Reset current element position
          var resetCurrentElement = function () {
            activeIndex = -1;
            $autocomplete.find('.active').removeClass('active');
          };

          // Remove autocomplete elements
          var removeAutocomplete = function () {
            $autocomplete.empty();
            resetCurrentElement();
            oldVal = undefined;
          };

          $input.off('blur.autocomplete').on('blur.autocomplete', function () {
            removeAutocomplete();
          });

          // Perform search
          $input.off('keyup.autocomplete focus.autocomplete').on('keyup.autocomplete focus.autocomplete', function (e) {
            // Reset count.
            count = 0;
            var val = $input.val().toLowerCase();

            // Don't capture enter or arrow key usage.
            if (e.which === 13 || e.which === 38 || e.which === 40) {
              return;
            }

            // Check if the input isn't empty
            if (oldVal !== val) {
              removeAutocomplete();

              if (val.length >= options.minLength) {
                for (var key in data) {
                  if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
                    // Break if past limit
                    if (count >= options.limit) {
                      break;
                    }

                    var autocompleteOption = $('<li></li>');
                    if (!!data[key]) {
                      autocompleteOption.append('<img src="' + data[key] + '" class="right circle"><span>' + key + '</span>');
                    } else {
                      autocompleteOption.append('<span>' + key + '</span>');
                    }

                    $autocomplete.append(autocompleteOption);
                    highlight(val, autocompleteOption);
                    count++;
                  }
                }
              }
            }

            // Update oldVal
            oldVal = val;
          });

          $input.off('keydown.autocomplete').on('keydown.autocomplete', function (e) {
            // Arrow keys and enter key usage
            var keyCode = e.which,
                liElement,
                numItems = $autocomplete.children('li').length,
                $active = $autocomplete.children('.active').first();

            // select element on Enter
            if (keyCode === 13 && activeIndex >= 0) {
              liElement = $autocomplete.children('li').eq(activeIndex);
              if (liElement.length) {
                liElement.trigger('mousedown.autocomplete');
                e.preventDefault();
              }
              return;
            }

            // Capture up and down key
            if (keyCode === 38 || keyCode === 40) {
              e.preventDefault();

              if (keyCode === 38 && activeIndex > 0) {
                activeIndex--;
              }

              if (keyCode === 40 && activeIndex < numItems - 1) {
                activeIndex++;
              }

              $active.removeClass('active');
              if (activeIndex >= 0) {
                $autocomplete.children('li').eq(activeIndex).addClass('active');
              }
            }
          });

          // Set input value
          $autocomplete.off('mousedown.autocomplete touchstart.autocomplete').on('mousedown.autocomplete touchstart.autocomplete', 'li', function () {
            var text = $(this).text().trim();
            $input.val(text);
            $input.trigger('change');
            removeAutocomplete();

            // Handle onAutocomplete callback.
            if (typeof options.onAutocomplete === "function") {
              options.onAutocomplete.call(this, text);
            }
          });

          // Empty data
        } else {
          $input.off('keyup.autocomplete focus.autocomplete');
        }
      });
    };
  }); // End of $(document).ready

  /*******************
   *  Select Plugin  *
   ******************/
  $.fn.material_select = function (callback) {
    $(this).each(function () {
      var $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      var multiple = $select.attr('multiple') ? true : false,
          lastID = $select.attr('data-select-id'); // Tear down structure if Select needs to be rebuilt

      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-' + lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if (callback === 'destroy') {
        $select.removeAttr('data-select-id').removeClass('initialized');
        $(window).off('click.select');
        return;
      }

      var uniqueID = Materialize.guid();
      $select.attr('data-select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      if ($select.is(':disabled')) wrapper.addClass('disabled');
      var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
          selectChildren = $select.children('option, optgroup'),
          valuesSelected = [],
          optionsHover = false;

      var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";

      // Function that renders and appends the option taking into
      // account type and possible image icon.
      var appendOptionWithIcon = function (select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.is(':disabled') ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = multiple ? '<input type="checkbox"' + disabledClass + '/><label></label>' : '';

        // add icons
        var icon_url = option.data('icon');
        var classes = option.attr('class');
        if (!!icon_url) {
          var classString = '';
          if (!!classes) classString = ' class="' + classes + '"';

          // Check for multiple type.
          options.append($('<li class="' + disabledClass + optgroupClass + '"><img alt="" src="' + icon_url + '"' + classString + '><span>' + multipleCheckbox + option.html() + '</span></li>'));
          return true;
        }

        // Check for multiple type.
        options.append($('<li class="' + disabledClass + optgroupClass + '"><span>' + multipleCheckbox + option.html() + '</span></li>'));
      };

      /* Create dropdown structure. */
      if (selectChildren.length) {
        selectChildren.each(function () {
          if ($(this).is('option')) {
            // Direct descendant option.
            if (multiple) {
              appendOptionWithIcon($select, $(this), 'multiple');
            } else {
              appendOptionWithIcon($select, $(this));
            }
          } else if ($(this).is('optgroup')) {
            // Optgroup.
            var selectOptions = $(this).children('option');
            options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));

            selectOptions.each(function () {
              appendOptionWithIcon($select, $(this), 'optgroup-option');
            });
          }
        });
      }

      options.find('li:not(.optgroup)').each(function (i) {
        $(this).click(function (e) {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
            var selected = true;

            if (multiple) {
              $('input[type="checkbox"]', this).prop('checked', function (i, v) {
                return !v;
              });
              selected = toggleEntryFromArray(valuesSelected, i, $select);
              $newSelect.trigger('focus');
            } else {
              options.find('li').removeClass('active');
              $(this).toggleClass('active');
              $newSelect.val($(this).text());
            }

            activateOption(options, $(this));
            $select.find('option').eq(i).prop('selected', selected);
            // Trigger onchange() event
            $select.trigger('change');
            if (typeof callback !== 'undefined') callback();
          }

          e.stopPropagation();
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');

      // escape double quotes
      var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + ($select.is(':disabled') ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $newSelect.after(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({ 'hover': false });
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on({
        'focus': function () {
          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
            $('input.select-dropdown').trigger('close');
            $(window).off('click.select');
          }
          if (!options.is(':visible')) {
            $(this).trigger('open', ['focus']);
            var label = $(this).val();
            if (multiple && label.indexOf(',') >= 0) {
              label = label.split(',')[0];
            }

            var selectedOption = options.find('li').filter(function () {
              return $(this).text().toLowerCase() === label.toLowerCase();
            })[0];
            activateOption(options, selectedOption, true);

            $(window).off('click.select').on('click.select', function () {
              multiple && (optionsHover || $newSelect.trigger('close'));
              $(window).off('click.select');
            });
          }
        },
        'click': function (e) {
          e.stopPropagation();
        }
      });

      $newSelect.on('blur', function () {
        if (!multiple) {
          $(this).trigger('close');
          $(window).off('click.select');
        }
        options.find('li.selected').removeClass('selected');
      });

      options.hover(function () {
        optionsHover = true;
      }, function () {
        optionsHover = false;
      });

      // Add initial multiple selections.
      if (multiple) {
        $select.find("option:selected:not(:disabled)").each(function () {
          var index = this.index;

          toggleEntryFromArray(valuesSelected, index, $select);
          options.find("li:not(.optgroup)").eq(index).find(":checkbox").prop("checked", true);
        });
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       * @param {Boolean} firstActivation  If on first activation of select
       */
      var activateOption = function (collection, newOption, firstActivation) {
        if (newOption) {
          collection.find('li.selected').removeClass('selected');
          var option = $(newOption);
          option.addClass('selected');
          if (!multiple || !!firstActivation) {
            options.scrollTo(option);
          }
        }
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      var filterQuery = [],
          onKeyDown = function (e) {
        // TAB - switch to another input
        if (e.which == 9) {
          $newSelect.trigger('close');
          return;
        }

        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
        if (e.which == 40 && !options.is(':visible')) {
          $newSelect.trigger('open');
          return;
        }

        // ENTER WHEN SELECT IS CLOSED - submit form
        if (e.which == 13 && !options.is(':visible')) {
          return;
        }

        e.preventDefault();

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          filterQuery.push(letter);

          var string = filterQuery.join(''),
              newOption = options.find('li').filter(function () {
            return $(this).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOption) {
            activateOption(options, newOption);
          }
        }

        // ENTER - select option and close when select options are opened
        if (e.which == 13) {
          var activeOption = options.find('li.selected:not(.disabled)')[0];
          if (activeOption) {
            $(activeOption).trigger('click');
            if (!multiple) {
              $newSelect.trigger('close');
            }
          }
        }

        // ARROW DOWN - move to next not disabled option
        if (e.which == 40) {
          if (options.find('li.selected').length) {
            newOption = options.find('li.selected').next('li:not(.disabled)')[0];
          } else {
            newOption = options.find('li:not(.disabled)')[0];
          }
          activateOption(options, newOption);
        }

        // ESC - close options
        if (e.which == 27) {
          $newSelect.trigger('close');
        }

        // ARROW UP - move to previous not disabled option
        if (e.which == 38) {
          newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
          if (newOption) activateOption(options, newOption);
        }

        // Automaticaly clean filter query so user can search again by starting letters
        setTimeout(function () {
          filterQuery = [];
        }, 1000);
      };

      $newSelect.on('keydown', onKeyDown);
    });

    function toggleEntryFromArray(entriesArray, entryIndex, select) {
      var index = entriesArray.indexOf(entryIndex),
          notAdded = index === -1;

      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }

      select.siblings('ul.dropdown-content').find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      select.find('option').eq(entryIndex).prop('selected', notAdded);
      setValueToInput(entriesArray, select);

      return notAdded;
    }

    function setValueToInput(entriesArray, select) {
      var value = '';

      for (var i = 0, count = entriesArray.length; i < count; i++) {
        var text = select.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += ', ' + text;
      }

      if (value === '') {
        value = select.find('option:disabled').eq(0).text();
      }

      select.siblings('input.select-dropdown').val(value);
    }
  };
})(jQuery);
;(function ($) {

  var methods = {

    init: function (options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function () {

        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('> li');
        var $active_index = $slider.find('.active').index();
        var $active, $indicators, $interval;
        if ($active_index != -1) {
          $active = $slides.eq($active_index);
        }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({ opacity: 0, translateY: -100 }, { duration: duration, queue: false });
          } else if (caption.hasClass("right-align")) {
            caption.velocity({ opacity: 0, translateX: 100 }, { duration: duration, queue: false });
          } else if (caption.hasClass("left-align")) {
            caption.velocity({ opacity: 0, translateX: -100 }, { duration: duration, queue: false });
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          // Wrap around indices.
          if (index >= $slides.length) index = 0;else if (index < 0) index = $slides.length - 1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({ opacity: 0 }, { duration: options.transition, queue: false, easing: 'easeOutQuad',
              complete: function () {
                $slides.not('.active').velocity({ opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: false });
              } });
            captionTransition($caption, options.transition);

            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });
            $slides.eq(index).find('.caption').velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad' });
            $slides.eq(index).addClass('active');

            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          } else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }

        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          if ($(this).attr('src') !== placeholderBase64) {
            $(this).css('background-image', 'url("' + $(this).attr('src') + '")');
            $(this).attr('src', placeholderBase64);
          }
        });

        // dynamically add indicators
        if (options.indicators) {
          $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function (index) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(function () {
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);
              }, options.transition + options.interval);
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        } else {
          $slides.first().addClass('active').velocity({ opacity: 1 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function () {
          $active.find('.caption').velocity({ opacity: 1, translateX: 0, translateY: 0 }, { duration: options.transition, queue: false, easing: 'easeOutQuad' });
        });

        // auto scroll
        $interval = setInterval(function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        }, options.transition + options.interval);

        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this.hammer({
          prevent_default: false
        }).on('pan', function (e) {
          if (e.gesture.pointerType === "touch") {

            // reset interval
            clearInterval($interval);

            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;
            var velocityY = e.gesture.velocityY;

            $curr_slide = $slider.find('.active');
            if (Math.abs(velocityX) > Math.abs(velocityY)) {
              $curr_slide.velocity({ translateX: x
              }, { duration: 50, queue: false, easing: 'easeOutQuad' });
            }

            // Swipe Left
            if (direction === 4 && (x > $this.innerWidth() / 2 || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < -1 * $this.innerWidth() / 2 || velocityX > 0.65)) {
                swipeLeft = true;
              }

            // Make Slide Behind active slide visible
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1
              }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1
              }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            }
          }
        }).on('panend', function (e) {
          if (e.gesture.pointerType === "touch") {

            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft || $slides.length <= 1) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0
              }, { duration: 300, queue: false, easing: 'easeOutQuad' });
            } else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({ translateX: -1 * $this.innerWidth() }, { duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                } });
            } else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({ translateX: $this.innerWidth() }, { duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  $curr_slide.velocity({ opacity: 0, translateX: 0 }, { duration: 0, queue: false });
                } });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(function () {
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);
            }, options.transition + options.interval);
          }
        });

        $this.on('sliderPause', function () {
          clearInterval($interval);
        });

        $this.on('sliderStart', function () {
          clearInterval($interval);
          $interval = setInterval(function () {
            $active_index = $slider.find('.active').index();
            if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
            else $active_index += 1;

            moveToSlide($active_index);
          }, options.transition + options.interval);
        });

        $this.on('sliderNext', function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index + 1);
        });

        $this.on('sliderPrev', function () {
          $active_index = $slider.find('.active').index();
          moveToSlide($active_index - 1);
        });
      });
    },
    pause: function () {
      $(this).trigger('sliderPause');
    },
    start: function () {
      $(this).trigger('sliderStart');
    },
    next: function () {
      $(this).trigger('sliderNext');
    },
    prev: function () {
      $(this).trigger('sliderPrev');
    }
  };

  $.fn.slider = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
    }
  }; // Plugin end
})(jQuery);
;(function ($) {
  $(document).ready(function () {

    $(document).on('click.card', '.card', function (e) {
      if ($(this).find('> .card-reveal').length) {
        var $card = $(e.target).closest('.card');
        if ($card.data('initialOverflow') === undefined) {
          $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
        }
        if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
          // Make Reveal animate down and display none
          $(this).find('.card-reveal').velocity({ translateY: 0 }, {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: function () {
              $(this).css({ display: 'none' });
              $card.css('overflow', $card.data('initialOverflow'));
            }
          });
        } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
          $card.css('overflow', 'hidden');
          $(this).find('.card-reveal').css({ display: 'block' }).velocity("stop", false).velocity({ translateY: '-100%' }, { duration: 300, queue: false, easing: 'easeInOutQuad' });
        }
      }
    });
  });
})(jQuery);
;(function ($) {
  var materialChipsDefaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {}
  };

  $(document).ready(function () {
    // Handle removal of static chips.
    $(document).on('click', '.chip .close', function (e) {
      var $chips = $(this).closest('.chips');
      if ($chips.attr('data-initialized')) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });

  $.fn.material_chip = function (options) {
    var self = this;
    this.$el = $(this);
    this.$document = $(document);
    this.SELS = {
      CHIPS: '.chips',
      CHIP: '.chip',
      INPUT: 'input',
      DELETE: '.material-icons',
      SELECTED_CHIP: '.selected'
    };

    if ('data' === options) {
      return this.$el.data('chips');
    }

    var curr_options = $.extend({}, materialChipsDefaults, options);
    self.hasAutocomplete = !$.isEmptyObject(curr_options.autocompleteOptions.data);

    // Initialize
    this.init = function () {
      var i = 0;
      var chips;
      self.$el.each(function () {
        var $chips = $(this);
        var chipId = Materialize.guid();
        self.chipId = chipId;

        if (!curr_options.data || !(curr_options.data instanceof Array)) {
          curr_options.data = [];
        }
        $chips.data('chips', curr_options.data);
        $chips.attr('data-index', i);
        $chips.attr('data-initialized', true);

        if (!$chips.hasClass(self.SELS.CHIPS)) {
          $chips.addClass('chips');
        }

        self.chips($chips, chipId);
        i++;
      });
    };

    this.handleEvents = function () {
      var SELS = self.SELS;

      self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, function (e) {
        $(e.target).find(SELS.INPUT).focus();
      });

      self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, function (e) {
        var $chip = $(e.target);
        if ($chip.length) {
          var wasSelected = $chip.hasClass('selected');
          var $chips = $chip.closest(SELS.CHIPS);
          $(SELS.CHIP).removeClass('selected');

          if (!wasSelected) {
            self.selectChip($chip.index(), $chips);
          }
        }
      });

      self.$document.off('keydown.chips').on('keydown.chips', function (e) {
        if ($(e.target).is('input, textarea')) {
          return;
        }

        // delete
        var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
        var $chips = $chip.closest(SELS.CHIPS);
        var length = $chip.siblings(SELS.CHIP).length;
        var index;

        if (!$chip.length) {
          return;
        }

        if (e.which === 8 || e.which === 46) {
          e.preventDefault();

          index = $chip.index();
          self.deleteChip(index, $chips);

          var selectIndex = null;
          if (index + 1 < length) {
            selectIndex = index;
          } else if (index === length || index + 1 === length) {
            selectIndex = length - 1;
          }

          if (selectIndex < 0) selectIndex = null;

          if (null !== selectIndex) {
            self.selectChip(selectIndex, $chips);
          }
          if (!length) $chips.find('input').focus();

          // left
        } else if (e.which === 37) {
          index = $chip.index() - 1;
          if (index < 0) {
            return;
          }
          $(SELS.CHIP).removeClass('selected');
          self.selectChip(index, $chips);

          // right
        } else if (e.which === 39) {
          index = $chip.index() + 1;
          $(SELS.CHIP).removeClass('selected');
          if (index > length) {
            $chips.find('input').focus();
            return;
          }
          self.selectChip(index, $chips);
        }
      });

      self.$document.off('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
        var $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.addClass('focus');
        $currChips.siblings('label, .prefix').addClass('active');
        $(SELS.CHIP).removeClass('selected');
      });

      self.$document.off('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
        var $currChips = $(e.target).closest(SELS.CHIPS);
        $currChips.removeClass('focus');

        // Remove active if empty
        if ($currChips.data('chips') === undefined || !$currChips.data('chips').length) {
          $currChips.siblings('label').removeClass('active');
        }
        $currChips.siblings('.prefix').removeClass('active');
      });

      self.$document.off('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT).on('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT, function (e) {
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var chipsLength = $chips.children(SELS.CHIP).length;

        // enter
        if (13 === e.which) {
          // Override enter if autocompleting.
          if (self.hasAutocomplete && $chips.find('.autocomplete-content.dropdown-content').length && $chips.find('.autocomplete-content.dropdown-content').children().length) {
            return;
          }

          e.preventDefault();
          self.addChip({ tag: $target.val() }, $chips);
          $target.val('');
          return;
        }

        // delete or left
        if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
          e.preventDefault();
          self.selectChip(chipsLength - 1, $chips);
          $target.blur();
          return;
        }
      });

      // Click on delete icon in chip.
      self.$document.off('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE).on('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE, function (e) {
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var $chip = $target.closest(SELS.CHIP);
        e.stopPropagation();
        self.deleteChip($chip.index(), $chips);
        $chips.find('input').focus();
      });
    };

    this.chips = function ($chips, chipId) {
      $chips.empty();
      $chips.data('chips').forEach(function (elem) {
        $chips.append(self.renderChip(elem));
      });
      $chips.append($('<input id="' + chipId + '" class="input" placeholder="">'));
      self.setPlaceholder($chips);

      // Set for attribute for label
      var label = $chips.next('label');
      if (label.length) {
        label.attr('for', chipId);

        if ($chips.data('chips') !== undefined && $chips.data('chips').length) {
          label.addClass('active');
        }
      }

      // Setup autocomplete if needed.
      var input = $('#' + chipId);
      if (self.hasAutocomplete) {
        curr_options.autocompleteOptions.onAutocomplete = function (val) {
          self.addChip({ tag: val }, $chips);
          input.val('');
          input.focus();
        };
        input.autocomplete(curr_options.autocompleteOptions);
      }
    };

    /**
     * Render chip jQuery element.
     * @param {Object} elem
     * @return {jQuery}
     */
    this.renderChip = function (elem) {
      if (!elem.tag) return;

      var $renderedChip = $('<div class="chip"></div>');
      $renderedChip.text(elem.tag);
      if (elem.image) {
        $renderedChip.prepend($('<img />').attr('src', elem.image));
      }
      $renderedChip.append($('<i class="material-icons close">close</i>'));
      return $renderedChip;
    };

    this.setPlaceholder = function ($chips) {
      if ($chips.data('chips') !== undefined && !$chips.data('chips').length && curr_options.placeholder) {
        $chips.find('input').prop('placeholder', curr_options.placeholder);
      } else if (($chips.data('chips') === undefined || !!$chips.data('chips').length) && curr_options.secondaryPlaceholder) {
        $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
      }
    };

    this.isValid = function ($chips, elem) {
      var chips = $chips.data('chips');
      var exists = false;
      for (var i = 0; i < chips.length; i++) {
        if (chips[i].tag === elem.tag) {
          exists = true;
          return;
        }
      }
      return '' !== elem.tag && !exists;
    };

    this.addChip = function (elem, $chips) {
      if (!self.isValid($chips, elem)) {
        return;
      }
      var $renderedChip = self.renderChip(elem);
      var newData = [];
      var oldData = $chips.data('chips');
      for (var i = 0; i < oldData.length; i++) {
        newData.push(oldData[i]);
      }
      newData.push(elem);

      $chips.data('chips', newData);
      $renderedChip.insertBefore($chips.find('input'));
      $chips.trigger('chip.add', elem);
      self.setPlaceholder($chips);
    };

    this.deleteChip = function (chipIndex, $chips) {
      var chip = $chips.data('chips')[chipIndex];
      $chips.find('.chip').eq(chipIndex).remove();

      var newData = [];
      var oldData = $chips.data('chips');
      for (var i = 0; i < oldData.length; i++) {
        if (i !== chipIndex) {
          newData.push(oldData[i]);
        }
      }

      $chips.data('chips', newData);
      $chips.trigger('chip.delete', chip);
      self.setPlaceholder($chips);
    };

    this.selectChip = function (chipIndex, $chips) {
      var $chip = $chips.find('.chip').eq(chipIndex);
      if ($chip && false === $chip.hasClass('selected')) {
        $chip.addClass('selected');
        $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
      }
    };

    this.getChipsElement = function (index, $chips) {
      return $chips.eq(index);
    };

    // init
    this.init();

    this.handleEvents();
  };
})(jQuery);
;(function ($) {
  $.fn.pushpin = function (options) {
    // Defaults
    var defaults = {
      top: 0,
      bottom: Infinity,
      offset: 0
    };

    // Remove pushpin event and classes
    if (options === "remove") {
      this.each(function () {
        if (id = $(this).data('pushpin-id')) {
          $(window).off('scroll.' + id);
          $(this).removeData('pushpin-id').removeClass('pin-top pinned pin-bottom').removeAttr('style');
        }
      });
      return false;
    }

    options = $.extend(defaults, options);

    $index = 0;
    return this.each(function () {
      var $uniqueId = Materialize.guid(),
          $this = $(this),
          $original_offset = $(this).offset().top;

      function removePinClasses(object) {
        object.removeClass('pin-top');
        object.removeClass('pinned');
        object.removeClass('pin-bottom');
      }

      function updateElements(objects, scrolled) {
        objects.each(function () {
          // Add position fixed (because its between top and bottom)
          if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
            removePinClasses($(this));
            $(this).css('top', options.offset);
            $(this).addClass('pinned');
          }

          // Add pin-top (when scrolled position is above top)
          if (scrolled < options.top && !$(this).hasClass('pin-top')) {
            removePinClasses($(this));
            $(this).css('top', 0);
            $(this).addClass('pin-top');
          }

          // Add pin-bottom (when scrolled position is below bottom)
          if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
            removePinClasses($(this));
            $(this).addClass('pin-bottom');
            $(this).css('top', options.bottom - $original_offset);
          }
        });
      }

      $(this).data('pushpin-id', $uniqueId);
      updateElements($this, $(window).scrollTop());
      $(window).on('scroll.' + $uniqueId, function () {
        var $scrolled = $(window).scrollTop() + options.offset;
        updateElements($this, $scrolled);
      });
    });
  };
})(jQuery);;(function ($) {
  $(document).ready(function () {

    // jQuery reverse
    $.fn.reverse = [].reverse;

    // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
    $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function (e) {
      var $this = $(this);
      openFABMenu($this);
    });
    $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle):not(.toolbar)', function (e) {
      var $this = $(this);
      closeFABMenu($this);
    });

    // Toggle-on-click behaviour.
    $(document).on('click.fabClickToggle', '.fixed-action-btn.click-to-toggle > a', function (e) {
      var $this = $(this);
      var $menu = $this.parent();
      if ($menu.hasClass('active')) {
        closeFABMenu($menu);
      } else {
        openFABMenu($menu);
      }
    });

    // Toolbar transition behaviour.
    $(document).on('click.fabToolbar', '.fixed-action-btn.toolbar > a', function (e) {
      var $this = $(this);
      var $menu = $this.parent();
      FABtoToolbar($menu);
    });
  });

  $.fn.extend({
    openFAB: function () {
      openFABMenu($(this));
    },
    closeFAB: function () {
      closeFABMenu($(this));
    },
    openToolbar: function () {
      FABtoToolbar($(this));
    },
    closeToolbar: function () {
      toolbarToFAB($(this));
    }
  });

  var openFABMenu = function (btn) {
    var $this = btn;
    if ($this.hasClass('active') === false) {

      // Get direction option
      var horizontal = $this.hasClass('horizontal');
      var offsetY, offsetX;

      if (horizontal === true) {
        offsetX = 40;
      } else {
        offsetY = 40;
      }

      $this.addClass('active');
      $this.find('ul .btn-floating').velocity({ scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px' }, { duration: 0 });

      var time = 0;
      $this.find('ul .btn-floating').reverse().each(function () {
        $(this).velocity({ opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0' }, { duration: 80, delay: time });
        time += 40;
      });
    }
  };

  var closeFABMenu = function (btn) {
    var $this = btn;
    // Get direction option
    var horizontal = $this.hasClass('horizontal');
    var offsetY, offsetX;

    if (horizontal === true) {
      offsetX = 40;
    } else {
      offsetY = 40;
    }

    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity("stop", true);
    $this.find('ul .btn-floating').velocity({ opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px' }, { duration: 80 });
  };

  /**
   * Transform FAB into toolbar
   * @param  {Object}  object jQuery object
   */
  var FABtoToolbar = function (btn) {
    if (btn.attr('data-open') === "true") {
      return;
    }

    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnRect = btn[0].getBoundingClientRect();
    var anchor = btn.find('> a').first();
    var menu = btn.find('> ul').first();
    var backdrop = $('<div class="fab-backdrop"></div>');
    var fabColor = anchor.css('background-color');
    anchor.append(backdrop);

    offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
    offsetY = windowHeight - btnRect.bottom;
    scaleFactor = windowWidth / backdrop.width();
    btn.attr('data-origin-bottom', btnRect.bottom);
    btn.attr('data-origin-left', btnRect.left);
    btn.attr('data-origin-width', btnRect.width);

    // Set initial state
    btn.addClass('active');
    btn.attr('data-open', true);
    btn.css({
      'text-align': 'center',
      width: '100%',
      bottom: 0,
      left: 0,
      transform: 'translateX(' + offsetX + 'px)',
      transition: 'none'
    });
    anchor.css({
      transform: 'translateY(' + -offsetY + 'px)',
      transition: 'none'
    });
    backdrop.css({
      'background-color': fabColor
    });

    setTimeout(function () {
      btn.css({
        transform: '',
        transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
      });
      anchor.css({
        overflow: 'visible',
        transform: '',
        transition: 'transform .2s'
      });

      setTimeout(function () {
        btn.css({
          overflow: 'hidden',
          'background-color': fabColor
        });
        backdrop.css({
          transform: 'scale(' + scaleFactor + ')',
          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
        });
        menu.find('> li > a').css({
          opacity: 1
        });

        // Scroll to close.
        $(window).on('scroll.fabToolbarClose', function () {
          toolbarToFAB(btn);
          $(window).off('scroll.fabToolbarClose');
          $(document).off('click.fabToolbarClose');
        });

        $(document).on('click.fabToolbarClose', function (e) {
          if (!$(e.target).closest(menu).length) {
            toolbarToFAB(btn);
            $(window).off('scroll.fabToolbarClose');
            $(document).off('click.fabToolbarClose');
          }
        });
      }, 100);
    }, 0);
  };

  /**
   * Transform toolbar back into FAB
   * @param  {Object}  object jQuery object
   */
  var toolbarToFAB = function (btn) {
    if (btn.attr('data-open') !== "true") {
      return;
    }

    var offsetX, offsetY, scaleFactor;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var btnWidth = btn.attr('data-origin-width');
    var btnBottom = btn.attr('data-origin-bottom');
    var btnLeft = btn.attr('data-origin-left');
    var anchor = btn.find('> .btn-floating').first();
    var menu = btn.find('> ul').first();
    var backdrop = btn.find('.fab-backdrop');
    var fabColor = anchor.css('background-color');

    offsetX = btnLeft - windowWidth / 2 + btnWidth / 2;
    offsetY = windowHeight - btnBottom;
    scaleFactor = windowWidth / backdrop.width();

    // Hide backdrop
    btn.removeClass('active');
    btn.attr('data-open', false);
    btn.css({
      'background-color': 'transparent',
      transition: 'none'
    });
    anchor.css({
      transition: 'none'
    });
    backdrop.css({
      transform: 'scale(0)',
      'background-color': fabColor
    });
    menu.find('> li > a').css({
      opacity: ''
    });

    setTimeout(function () {
      backdrop.remove();

      // Set initial state.
      btn.css({
        'text-align': '',
        width: '',
        bottom: '',
        left: '',
        overflow: '',
        'background-color': '',
        transform: 'translate3d(' + -offsetX + 'px,0,0)'
      });
      anchor.css({
        overflow: '',
        transform: 'translate3d(0,' + offsetY + 'px,0)'
      });

      setTimeout(function () {
        btn.css({
          transform: 'translate3d(0,0,0)',
          transition: 'transform .2s'
        });
        anchor.css({
          transform: 'translate3d(0,0,0)',
          transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
        });
      }, 20);
    }, 200);
  };
})(jQuery);
;(function ($) {
  // Image transition function
  Materialize.fadeInImage = function (selectorOrEl) {
    var element;
    if (typeof selectorOrEl === 'string') {
      element = $(selectorOrEl);
    } else if (typeof selectorOrEl === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    element.css({ opacity: 0 });
    $(element).velocity({ opacity: 1 }, {
      duration: 650,
      queue: false,
      easing: 'easeOutSine'
    });
    $(element).velocity({ opacity: 1 }, {
      duration: 1300,
      queue: false,
      easing: 'swing',
      step: function (now, fx) {
        fx.start = 100;
        var grayscale_setting = now / 100;
        var brightness_setting = 150 - (100 - now) / 1.75;

        if (brightness_setting < 100) {
          brightness_setting = 100;
        }
        if (now >= 0) {
          $(this).css({
            "-webkit-filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)",
            "filter": "grayscale(" + grayscale_setting + ")" + "brightness(" + brightness_setting + "%)"
          });
        }
      }
    });
  };

  // Horizontal staggered list
  Materialize.showStaggeredList = function (selectorOrEl) {
    var element;
    if (typeof selectorOrEl === 'string') {
      element = $(selectorOrEl);
    } else if (typeof selectorOrEl === 'object') {
      element = selectorOrEl;
    } else {
      return;
    }
    var time = 0;
    element.find('li').velocity({ translateX: "-100px" }, { duration: 0 });

    element.find('li').each(function () {
      $(this).velocity({ opacity: "1", translateX: "0" }, { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
  };

  $(document).ready(function () {
    // Hardcoded .staggered-list scrollFire
    // var staggeredListOptions = [];
    // $('ul.staggered-list').each(function (i) {

    //   var label = 'scrollFire-' + i;
    //   $(this).addClass(label);
    //   staggeredListOptions.push(
    //     {selector: 'ul.staggered-list.' + label,
    //      offset: 200,
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    // });
    // scrollFire(staggeredListOptions);

    // HammerJS, Swipe navigation

    // Touch Event
    var swipeLeft = false;
    var swipeRight = false;

    // Dismissible Collections
    $('.dismissable').each(function () {
      $(this).hammer({
        prevent_default: false
      }).on('pan', function (e) {
        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          var direction = e.gesture.direction;
          var x = e.gesture.deltaX;
          var velocityX = e.gesture.velocityX;

          $this.velocity({ translateX: x
          }, { duration: 50, queue: false, easing: 'easeOutQuad' });

          // Swipe Left
          if (direction === 4 && (x > $this.innerWidth() / 2 || velocityX < -0.75)) {
            swipeLeft = true;
          }

          // Swipe Right
          if (direction === 2 && (x < -1 * $this.innerWidth() / 2 || velocityX > 0.75)) {
            swipeRight = true;
          }
        }
      }).on('panend', function (e) {
        // Reset if collection is moved back into original position
        if (Math.abs(e.gesture.deltaX) < $(this).innerWidth() / 2) {
          swipeRight = false;
          swipeLeft = false;
        }

        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          if (swipeLeft || swipeRight) {
            var fullWidth;
            if (swipeLeft) {
              fullWidth = $this.innerWidth();
            } else {
              fullWidth = -1 * $this.innerWidth();
            }

            $this.velocity({ translateX: fullWidth
            }, { duration: 100, queue: false, easing: 'easeOutQuad', complete: function () {
                $this.css('border', 'none');
                $this.velocity({ height: 0, padding: 0
                }, { duration: 200, queue: false, easing: 'easeOutQuad', complete: function () {
                    $this.remove();
                  }
                });
              }
            });
          } else {
            $this.velocity({ translateX: 0
            }, { duration: 100, queue: false, easing: 'easeOutQuad' });
          }
          swipeLeft = false;
          swipeRight = false;
        }
      });
    });

    // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });

    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });

    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });
  });
})(jQuery);
;(function ($) {

  var scrollFireEventsHandled = false;

  // Input: Array of JSON objects {selector, offset, callback}
  Materialize.scrollFire = function (options) {
    var onScroll = function () {
      var windowScroll = window.pageYOffset + window.innerHeight;

      for (var i = 0; i < options.length; i++) {
        // Get options from each line
        var value = options[i];
        var selector = value.selector,
            offset = value.offset,
            callback = value.callback;

        var currentElement = document.querySelector(selector);
        if (currentElement !== null) {
          var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

          if (windowScroll > elementOffset + offset) {
            if (value.done !== true) {
              if (typeof callback === 'function') {
                callback.call(this, currentElement);
              } else if (typeof callback === 'string') {
                var callbackFunc = new Function(callback);
                callbackFunc(currentElement);
              }
              value.done = true;
            }
          }
        }
      }
    };

    var throttledScroll = Materialize.throttle(function () {
      onScroll();
    }, options.throttle || 100);

    if (!scrollFireEventsHandled) {
      window.addEventListener("scroll", throttledScroll);
      window.addEventListener("resize", throttledScroll);
      scrollFireEventsHandled = true;
    }

    // perform a scan once, after current execution context, and after dom is ready
    setTimeout(throttledScroll, 0);
  };
})(jQuery);
; /*!
  * pickadate.js v3.5.0, 2014/04/13
  * By Amsul, http://amsul.ca
  * Hosted on http://amsul.github.io/pickadate.js
  * Licensed under MIT
  */

(function (factory) {

  Materialize.Picker = factory(jQuery);
})(function ($) {

  var $window = $(window);
  var $document = $(document);
  var $html = $(document.documentElement);

  /**
   * The picker constructor that creates a blank picker.
   */
  function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {

    // If there’s no element, return the picker constructor.
    if (!ELEMENT) return PickerConstructor;

    var IS_DEFAULT_THEME = false,


    // The state of the picker.
    STATE = {
      id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date()))
    },


    // Merge the defaults and options passed.
    SETTINGS = COMPONENT ? $.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {},


    // Merge the default classes with the settings classes.
    CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass),


    // The element node wrapper into a jQuery object.
    $ELEMENT = $(ELEMENT),


    // Pseudo picker constructor.
    PickerInstance = function () {
      return this.start();
    },


    // The picker prototype.
    P = PickerInstance.prototype = {

      constructor: PickerInstance,

      $node: $ELEMENT,

      /**
       * Initialize everything
       */
      start: function () {

        // If it’s already started, do nothing.
        if (STATE && STATE.start) return P;

        // Update the picker states.
        STATE.methods = {};
        STATE.start = true;
        STATE.open = false;
        STATE.type = ELEMENT.type;

        // Confirm focus state, convert into text input to remove UA stylings,
        // and set as readonly to prevent keyboard popup.
        ELEMENT.autofocus = ELEMENT == getActiveElement();
        ELEMENT.readOnly = !SETTINGS.editable;
        ELEMENT.id = ELEMENT.id || STATE.id;
        if (ELEMENT.type != 'text') {
          ELEMENT.type = 'text';
        }

        // Create a new picker component with the settings.
        P.component = new COMPONENT(P, SETTINGS);

        // Create the picker root with a holder and then prepare it.
        P.$root = $(PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"'));
        prepareElementRoot();

        // If there’s a format for the hidden input element, create the element.
        if (SETTINGS.formatSubmit) {
          prepareElementHidden();
        }

        // Prepare the input element.
        prepareElement();

        // Insert the root as specified in the settings.
        if (SETTINGS.container) $(SETTINGS.container).append(P.$root);else $ELEMENT.before(P.$root);

        // Bind the default component and settings events.
        P.on({
          start: P.component.onStart,
          render: P.component.onRender,
          stop: P.component.onStop,
          open: P.component.onOpen,
          close: P.component.onClose,
          set: P.component.onSet
        }).on({
          start: SETTINGS.onStart,
          render: SETTINGS.onRender,
          stop: SETTINGS.onStop,
          open: SETTINGS.onOpen,
          close: SETTINGS.onClose,
          set: SETTINGS.onSet
        });

        // Once we’re all set, check the theme in use.
        IS_DEFAULT_THEME = isUsingDefaultTheme(P.$root.children()[0]);

        // If the element has autofocus, open the picker.
        if (ELEMENT.autofocus) {
          P.open();
        }

        // Trigger queued the “start” and “render” events.
        return P.trigger('start').trigger('render');
      }, //start


      /**
       * Render a new picker
       */
      render: function (entireComponent) {

        // Insert a new component holder in the root or box.
        if (entireComponent) P.$root.html(createWrappedComponent());else P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open));

        // Trigger the queued “render” events.
        return P.trigger('render');
      }, //render


      /**
       * Destroy everything
       */
      stop: function () {

        // If it’s already stopped, do nothing.
        if (!STATE.start) return P;

        // Then close the picker.
        P.close();

        // Remove the hidden field.
        if (P._hidden) {
          P._hidden.parentNode.removeChild(P._hidden);
        }

        // Remove the root.
        P.$root.remove();

        // Remove the input class, remove the stored data, and unbind
        // the events (after a tick for IE - see `P.close`).
        $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
        setTimeout(function () {
          $ELEMENT.off('.' + STATE.id);
        }, 0);

        // Restore the element state
        ELEMENT.type = STATE.type;
        ELEMENT.readOnly = false;

        // Trigger the queued “stop” events.
        P.trigger('stop');

        // Reset the picker states.
        STATE.methods = {};
        STATE.start = false;

        return P;
      }, //stop


      /**
       * Open up the picker
       */
      open: function (dontGiveFocus) {

        // If it’s already open, do nothing.
        if (STATE.open) return P;

        // Add the “active” class.
        $ELEMENT.addClass(CLASSES.active);
        aria(ELEMENT, 'expanded', true);

        // * A Firefox bug, when `html` has `overflow:hidden`, results in
        //   killing transitions :(. So add the “opened” state on the next tick.
        //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
        setTimeout(function () {

          // Add the “opened” class to the picker root.
          P.$root.addClass(CLASSES.opened);
          aria(P.$root[0], 'hidden', false);
        }, 0);

        // If we have to give focus, bind the element and doc events.
        if (dontGiveFocus !== false) {

          // Set it as open.
          STATE.open = true;

          // Prevent the page from scrolling.
          if (IS_DEFAULT_THEME) {
            $html.css('overflow', 'hidden').css('padding-right', '+=' + getScrollbarWidth());
          }

          // Pass focus to the root element’s jQuery object.
          // * Workaround for iOS8 to bring the picker’s root into view.
          P.$root.eq(0).focus();

          // Bind the document events.
          $document.on('click.' + STATE.id + ' focusin.' + STATE.id, function (event) {

            var target = event.target;

            // If the target of the event is not the element, close the picker picker.
            // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
            //   Also, for Firefox, a click on an `option` element bubbles up directly
            //   to the doc. So make sure the target wasn't the doc.
            // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
            //   which causes the picker to unexpectedly close when right-clicking it. So make
            //   sure the event wasn’t a right-click.
            if (target != ELEMENT && target != document && event.which != 3) {

              // If the target was the holder that covers the screen,
              // keep the element focused to maintain tabindex.
              P.close(target === P.$root.children()[0]);
            }
          }).on('keydown.' + STATE.id, function (event) {

            var
            // Get the keycode.
            keycode = event.keyCode,


            // Translate that to a selection change.
            keycodeToMove = P.component.key[keycode],


            // Grab the target.
            target = event.target;

            // On escape, close the picker and give focus.
            if (keycode == 27) {
              P.close(true);
            }

            // Check if there is a key movement or “enter” keypress on the element.
            else if (target == P.$root[0] && (keycodeToMove || keycode == 13)) {

                // Prevent the default action to stop page movement.
                event.preventDefault();

                // Trigger the key movement action.
                if (keycodeToMove) {
                  PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)]);
                }

                // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                else if (!P.$root.find('.' + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                    P.set('select', P.component.item.highlight);
                    if (SETTINGS.closeOnSelect) {
                      P.close(true);
                    }
                  }
              }

              // If the target is within the root and “enter” is pressed,
              // prevent the default action and trigger a click on the target instead.
              else if ($.contains(P.$root[0], target) && keycode == 13) {
                  event.preventDefault();
                  target.click();
                }
          });
        }

        // Trigger the queued “open” events.
        return P.trigger('open');
      }, //open


      /**
       * Close the picker
       */
      close: function (giveFocus) {

        // If we need to give focus, do it before changing states.
        if (giveFocus) {
          // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
          // The focus is triggered *after* the close has completed - causing it
          // to open again. So unbind and rebind the event at the next tick.
          P.$root.off('focus.toOpen').eq(0).focus();
          setTimeout(function () {
            P.$root.on('focus.toOpen', handleFocusToOpenEvent);
          }, 0);
        }

        // Remove the “active” class.
        $ELEMENT.removeClass(CLASSES.active);
        aria(ELEMENT, 'expanded', false);

        // * A Firefox bug, when `html` has `overflow:hidden`, results in
        //   killing transitions :(. So remove the “opened” state on the next tick.
        //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
        setTimeout(function () {

          // Remove the “opened” and “focused” class from the picker root.
          P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused);
          aria(P.$root[0], 'hidden', true);
        }, 0);

        // If it’s already closed, do nothing more.
        if (!STATE.open) return P;

        // Set it as closed.
        STATE.open = false;

        // Allow the page to scroll.
        if (IS_DEFAULT_THEME) {
          $html.css('overflow', '').css('padding-right', '-=' + getScrollbarWidth());
        }

        // Unbind the document events.
        $document.off('.' + STATE.id);

        // Trigger the queued “close” events.
        return P.trigger('close');
      }, //close


      /**
       * Clear the values
       */
      clear: function (options) {
        return P.set('clear', null, options);
      }, //clear


      /**
       * Set something
       */
      set: function (thing, value, options) {

        var thingItem,
            thingValue,
            thingIsObject = $.isPlainObject(thing),
            thingObject = thingIsObject ? thing : {};

        // Make sure we have usable options.
        options = thingIsObject && $.isPlainObject(value) ? value : options || {};

        if (thing) {

          // If the thing isn’t an object, make it one.
          if (!thingIsObject) {
            thingObject[thing] = value;
          }

          // Go through the things of items to set.
          for (thingItem in thingObject) {

            // Grab the value of the thing.
            thingValue = thingObject[thingItem];

            // First, if the item exists and there’s a value, set it.
            if (thingItem in P.component.item) {
              if (thingValue === undefined) thingValue = null;
              P.component.set(thingItem, thingValue, options);
            }

            // Then, check to update the element value and broadcast a change.
            if (thingItem == 'select' || thingItem == 'clear') {
              $ELEMENT.val(thingItem == 'clear' ? '' : P.get(thingItem, SETTINGS.format)).trigger('change');
            }
          }

          // Render a new picker.
          P.render();
        }

        // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
        return options.muted ? P : P.trigger('set', thingObject);
      }, //set


      /**
       * Get something
       */
      get: function (thing, format) {

        // Make sure there’s something to get.
        thing = thing || 'value';

        // If a picker state exists, return that.
        if (STATE[thing] != null) {
          return STATE[thing];
        }

        // Return the submission value, if that.
        if (thing == 'valueSubmit') {
          if (P._hidden) {
            return P._hidden.value;
          }
          thing = 'value';
        }

        // Return the value, if that.
        if (thing == 'value') {
          return ELEMENT.value;
        }

        // Check if a component item exists, return that.
        if (thing in P.component.item) {
          if (typeof format == 'string') {
            var thingValue = P.component.get(thing);
            return thingValue ? PickerConstructor._.trigger(P.component.formats.toString, P.component, [format, thingValue]) : '';
          }
          return P.component.get(thing);
        }
      }, //get


      /**
       * Bind events on the things.
       */
      on: function (thing, method, internal) {

        var thingName,
            thingMethod,
            thingIsObject = $.isPlainObject(thing),
            thingObject = thingIsObject ? thing : {};

        if (thing) {

          // If the thing isn’t an object, make it one.
          if (!thingIsObject) {
            thingObject[thing] = method;
          }

          // Go through the things to bind to.
          for (thingName in thingObject) {

            // Grab the method of the thing.
            thingMethod = thingObject[thingName];

            // If it was an internal binding, prefix it.
            if (internal) {
              thingName = '_' + thingName;
            }

            // Make sure the thing methods collection exists.
            STATE.methods[thingName] = STATE.methods[thingName] || [];

            // Add the method to the relative method collection.
            STATE.methods[thingName].push(thingMethod);
          }
        }

        return P;
      }, //on


      /**
       * Unbind events on the things.
       */
      off: function () {
        var i,
            thingName,
            names = arguments;
        for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
          thingName = names[i];
          if (thingName in STATE.methods) {
            delete STATE.methods[thingName];
          }
        }
        return P;
      },

      /**
       * Fire off method events.
       */
      trigger: function (name, data) {
        var _trigger = function (name) {
          var methodList = STATE.methods[name];
          if (methodList) {
            methodList.map(function (method) {
              PickerConstructor._.trigger(method, P, [data]);
            });
          }
        };
        _trigger('_' + name);
        _trigger(name);
        return P;
      } //trigger
      //PickerInstance.prototype


      /**
       * Wrap the picker holder components together.
       */
    };function createWrappedComponent() {

      // Create a picker wrapper holder
      return PickerConstructor._.node('div',

      // Create a picker wrapper node
      PickerConstructor._.node('div',

      // Create a picker frame
      PickerConstructor._.node('div',

      // Create a picker box node
      PickerConstructor._.node('div',

      // Create the components nodes.
      P.component.nodes(STATE.open),

      // The picker box class
      CLASSES.box),

      // Picker wrap class
      CLASSES.wrap),

      // Picker frame class
      CLASSES.frame),

      // Picker holder class
      CLASSES.holder); //endreturn
    } //createWrappedComponent


    /**
     * Prepare the input element with all bindings.
     */
    function prepareElement() {

      $ELEMENT.

      // Store the picker data by component name.
      data(NAME, P).

      // Add the “input” class name.
      addClass(CLASSES.input).

      // Remove the tabindex.
      attr('tabindex', -1).

      // If there’s a `data-value`, update the value of the element.
      val($ELEMENT.data('value') ? P.get('select', SETTINGS.format) : ELEMENT.value);

      // Only bind keydown events if the element isn’t editable.
      if (!SETTINGS.editable) {

        $ELEMENT.

        // On focus/click, focus onto the root to open it up.
        on('focus.' + STATE.id + ' click.' + STATE.id, function (event) {
          event.preventDefault();
          P.$root.eq(0).focus();
        }).

        // Handle keyboard event based on the picker being opened or not.
        on('keydown.' + STATE.id, handleKeydownEvent);
      }

      // Update the aria attributes.
      aria(ELEMENT, {
        haspopup: true,
        expanded: false,
        readonly: false,
        owns: ELEMENT.id + '_root'
      });
    }

    /**
     * Prepare the root picker element with all bindings.
     */
    function prepareElementRoot() {

      P.$root.on({

        // For iOS8.
        keydown: handleKeydownEvent,

        // When something within the root is focused, stop from bubbling
        // to the doc and remove the “focused” state from the root.
        focusin: function (event) {
          P.$root.removeClass(CLASSES.focused);
          event.stopPropagation();
        },

        // When something within the root holder is clicked, stop it
        // from bubbling to the doc.
        'mousedown click': function (event) {

          var target = event.target;

          // Make sure the target isn’t the root holder so it can bubble up.
          if (target != P.$root.children()[0]) {

            event.stopPropagation();

            // * For mousedown events, cancel the default action in order to
            //   prevent cases where focus is shifted onto external elements
            //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
            //   Also, for Firefox, don’t prevent action on the `option` element.
            if (event.type == 'mousedown' && !$(target).is('input, select, textarea, button, option')) {

              event.preventDefault();

              // Re-focus onto the root so that users can click away
              // from elements focused within the picker.
              P.$root.eq(0).focus();
            }
          }
        }
      }).

      // Add/remove the “target” class on focus and blur.
      on({
        focus: function () {
          $ELEMENT.addClass(CLASSES.target);
        },
        blur: function () {
          $ELEMENT.removeClass(CLASSES.target);
        }
      }).

      // Open the picker and adjust the root “focused” state
      on('focus.toOpen', handleFocusToOpenEvent).

      // If there’s a click on an actionable element, carry out the actions.
      on('click', '[data-pick], [data-nav], [data-clear], [data-close]', function () {

        var $target = $(this),
            targetData = $target.data(),
            targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled),


        // * For IE, non-focusable elements can be active elements as well
        //   (http://stackoverflow.com/a/2684561).
        activeElement = getActiveElement();
        activeElement = activeElement && (activeElement.type || activeElement.href) && activeElement;

        // If it’s disabled or nothing inside is actively focused, re-focus the element.
        if (targetDisabled || activeElement && !$.contains(P.$root[0], activeElement)) {
          P.$root.eq(0).focus();
        }

        // If something is superficially changed, update the `highlight` based on the `nav`.
        if (!targetDisabled && targetData.nav) {
          P.set('highlight', P.component.item.highlight, { nav: targetData.nav });
        }

        // If something is picked, set `select` then close with focus.
        else if (!targetDisabled && 'pick' in targetData) {
            P.set('select', targetData.pick);
            if (SETTINGS.closeOnSelect) {
              P.close(true);
            }
          }

          // If a “clear” button is pressed, empty the values and close with focus.
          else if (targetData.clear) {
              P.clear();
              if (SETTINGS.closeOnSelect) {
                P.close(true);
              }
            } else if (targetData.close) {
              P.close(true);
            }
      }); //P.$root

      aria(P.$root[0], 'hidden', true);
    }

    /**
     * Prepare the hidden input element along with all bindings.
     */
    function prepareElementHidden() {

      var name;

      if (SETTINGS.hiddenName === true) {
        name = ELEMENT.name;
        ELEMENT.name = '';
      } else {
        name = [typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '', typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'];
        name = name[0] + ELEMENT.name + name[1];
      }

      P._hidden = $('<input ' + 'type=hidden ' +

      // Create the name using the original input’s with a prefix and suffix.
      'name="' + name + '"' + (

      // If the element has a value, set the hidden value as well.
      $ELEMENT.data('value') || ELEMENT.value ? ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' : '') + '>')[0];

      $ELEMENT.

      // If the value changes, update the hidden input with the correct format.
      on('change.' + STATE.id, function () {
        P._hidden.value = ELEMENT.value ? P.get('select', SETTINGS.formatSubmit) : '';
      });

      // Insert the hidden input as specified in the settings.
      if (SETTINGS.container) $(SETTINGS.container).append(P._hidden);else $ELEMENT.before(P._hidden);
    }

    // For iOS8.
    function handleKeydownEvent(event) {

      var keycode = event.keyCode,


      // Check if one of the delete keys was pressed.
      isKeycodeDelete = /^(8|46)$/.test(keycode);

      // For some reason IE clears the input value on “escape”.
      if (keycode == 27) {
        P.close();
        return false;
      }

      // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
      if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {

        // Prevent it from moving the page and bubbling to doc.
        event.preventDefault();
        event.stopPropagation();

        // If `delete` was pressed, clear the values and close the picker.
        // Otherwise open the picker.
        if (isKeycodeDelete) {
          P.clear().close();
        } else {
          P.open();
        }
      }
    }

    // Separated for IE
    function handleFocusToOpenEvent(event) {

      // Stop the event from propagating to the doc.
      event.stopPropagation();

      // If it’s a focus event, add the “focused” class to the root.
      if (event.type == 'focus') {
        P.$root.addClass(CLASSES.focused);
      }

      // And then finally open the picker.
      P.open();
    }

    // Return a new picker instance.
    return new PickerInstance();
  } //PickerConstructor


  /**
   * The default classes and prefix to use for the HTML classes.
   */
  PickerConstructor.klasses = function (prefix) {
    prefix = prefix || 'picker';
    return {

      picker: prefix,
      opened: prefix + '--opened',
      focused: prefix + '--focused',

      input: prefix + '__input',
      active: prefix + '__input--active',
      target: prefix + '__input--target',

      holder: prefix + '__holder',

      frame: prefix + '__frame',
      wrap: prefix + '__wrap',

      box: prefix + '__box'
    };
  }; //PickerConstructor.klasses


  /**
   * Check if the default theme is being used.
   */
  function isUsingDefaultTheme(element) {

    var theme,
        prop = 'position';

    // For IE.
    if (element.currentStyle) {
      theme = element.currentStyle[prop];
    }

    // For normal browsers.
    else if (window.getComputedStyle) {
        theme = getComputedStyle(element)[prop];
      }

    return theme == 'fixed';
  }

  /**
   * Get the width of the browser’s scrollbar.
   * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
   */
  function getScrollbarWidth() {

    if ($html.height() <= $window.height()) {
      return 0;
    }

    var $outer = $('<div style="visibility:hidden;width:100px" />').appendTo('body');

    // Get the width without scrollbars.
    var widthWithoutScroll = $outer[0].offsetWidth;

    // Force adding scrollbars.
    $outer.css('overflow', 'scroll');

    // Add the inner div.
    var $inner = $('<div style="width:100%" />').appendTo($outer);

    // Get the width with scrollbars.
    var widthWithScroll = $inner[0].offsetWidth;

    // Remove the divs.
    $outer.remove();

    // Return the difference between the widths.
    return widthWithoutScroll - widthWithScroll;
  }

  /**
   * PickerConstructor helper methods.
   */
  PickerConstructor._ = {

    /**
     * Create a group of nodes. Expects:
     * `
        {
            min:    {Integer},
            max:    {Integer},
            i:      {Integer},
            node:   {String},
            item:   {Function}
        }
     * `
     */
    group: function (groupObject) {

      var
      // Scope for the looped object
      loopObjectScope,


      // Create the nodes list
      nodesList = '',


      // The counter starts from the `min`
      counter = PickerConstructor._.trigger(groupObject.min, groupObject);

      // Loop from the `min` to `max`, incrementing by `i`
      for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {

        // Trigger the `item` function within scope of the object
        loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter]);

        // Splice the subgroup and create nodes out of the sub nodes
        nodesList += PickerConstructor._.node(groupObject.node, loopObjectScope[0], // the node
        loopObjectScope[1], // the classes
        loopObjectScope[2] // the attributes
        );
      }

      // Return the list of nodes
      return nodesList;
    }, //group


    /**
     * Create a dom node string
     */
    node: function (wrapper, item, klass, attribute) {

      // If the item is false-y, just return an empty string
      if (!item) return '';

      // If the item is an array, do a join
      item = $.isArray(item) ? item.join('') : item;

      // Check for the class
      klass = klass ? ' class="' + klass + '"' : '';

      // Check for any attributes
      attribute = attribute ? ' ' + attribute : '';

      // Return the wrapped item
      return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>';
    }, //node


    /**
     * Lead numbers below 10 with a zero.
     */
    lead: function (number) {
      return (number < 10 ? '0' : '') + number;
    },

    /**
     * Trigger a function otherwise return the value.
     */
    trigger: function (callback, scope, args) {
      return typeof callback == 'function' ? callback.apply(scope, args || []) : callback;
    },

    /**
     * If the second character is a digit, length is 2 otherwise 1.
     */
    digits: function (string) {
      return (/\d/.test(string[1]) ? 2 : 1
      );
    },

    /**
     * Tell if something is a date object.
     */
    isDate: function (value) {
      return {}.toString.call(value).indexOf('Date') > -1 && this.isInteger(value.getDate());
    },

    /**
     * Tell if something is an integer.
     */
    isInteger: function (value) {
      return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0;
    },

    /**
     * Create ARIA attribute strings.
     */
    ariaAttr: ariaAttr //PickerConstructor._


    /**
     * Extend the picker with a component and defaults.
     */
  };PickerConstructor.extend = function (name, Component) {

    // Extend jQuery.
    $.fn[name] = function (options, action) {

      // Grab the component data.
      var componentData = this.data(name);

      // If the picker is requested, return the data object.
      if (options == 'picker') {
        return componentData;
      }

      // If the component data exists and `options` is a string, carry out the action.
      if (componentData && typeof options == 'string') {
        return PickerConstructor._.trigger(componentData[options], componentData, [action]);
      }

      // Otherwise go through each matched element and if the component
      // doesn’t exist, create a new picker using `this` element
      // and merging the defaults and options with a deep copy.
      return this.each(function () {
        var $this = $(this);
        if (!$this.data(name)) {
          new PickerConstructor(this, name, Component, options);
        }
      });
    };

    // Set the defaults.
    $.fn[name].defaults = Component.defaults;
  }; //PickerConstructor.extend


  function aria(element, attribute, value) {
    if ($.isPlainObject(attribute)) {
      for (var key in attribute) {
        ariaSet(element, key, attribute[key]);
      }
    } else {
      ariaSet(element, attribute, value);
    }
  }
  function ariaSet(element, attribute, value) {
    element.setAttribute((attribute == 'role' ? '' : 'aria-') + attribute, value);
  }
  function ariaAttr(attribute, data) {
    if (!$.isPlainObject(attribute)) {
      attribute = { attribute: data };
    }
    data = '';
    for (var key in attribute) {
      var attr = (key == 'role' ? '' : 'aria-') + key,
          attrVal = attribute[key];
      data += attrVal == null ? '' : attr + '="' + attribute[key] + '"';
    }
    return data;
  }

  // IE8 bug throws an error for activeElements within iframes.
  function getActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  // Expose the picker constructor.
  return PickerConstructor;
});
; /*!
  * Date picker for pickadate.js v3.5.0
  * http://amsul.github.io/pickadate.js/date.htm
  */

(function (factory) {
  factory(Materialize.Picker, jQuery);
})(function (Picker, $) {

  /**
   * Globals and constants
   */
  var DAYS_IN_WEEK = 7,
      WEEKS_IN_CALENDAR = 6,
      _ = Picker._;

  /**
   * The date picker constructor
   */
  function DatePicker(picker, settings) {

    var calendar = this,
        element = picker.$node[0],
        elementValue = element.value,
        elementDataValue = picker.$node.data('value'),
        valueString = elementDataValue || elementValue,
        formatString = elementDataValue ? settings.formatSubmit : settings.format,
        isRTL = function () {

      return element.currentStyle ?

      // For IE.
      element.currentStyle.direction == 'rtl' :

      // For normal browsers.
      getComputedStyle(picker.$root[0]).direction == 'rtl';
    };

    calendar.settings = settings;
    calendar.$node = picker.$node;

    // The queue of methods that will be used to build item objects.
    calendar.queue = {
      min: 'measure create',
      max: 'measure create',
      now: 'now create',
      select: 'parse create validate',
      highlight: 'parse navigate create validate',
      view: 'parse create validate viewset',
      disable: 'deactivate',
      enable: 'activate'

      // The component's item object.
    };calendar.item = {};

    calendar.item.clear = null;
    calendar.item.disable = (settings.disable || []).slice(0);
    calendar.item.enable = -function (collectionDisabled) {
      return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
    }(calendar.item.disable);

    calendar.set('min', settings.min).set('max', settings.max).set('now');

    // When there’s a value, set the `select`, which in turn
    // also sets the `highlight` and `view`.
    if (valueString) {
      calendar.set('select', valueString, { format: formatString });
    }

    // If there’s no value, default to highlighting “today”.
    else {
        calendar.set('select', null).set('highlight', calendar.item.now);
      }

    // The keycode to movement mapping.
    calendar.key = {
      40: 7, // Down
      38: -7, // Up
      39: function () {
        return isRTL() ? -1 : 1;
      }, // Right
      37: function () {
        return isRTL() ? 1 : -1;
      }, // Left
      go: function (timeChange) {
        var highlightedObject = calendar.item.highlight,
            targetDate = new Date(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange);
        calendar.set('highlight', targetDate, { interval: timeChange });
        this.render();
      }

      // Bind some picker events.
    };picker.on('render', function () {
      picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
        var value = this.value;
        if (value) {
          picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date]);
          picker.$root.find('.' + settings.klass.selectMonth).trigger('focus');
        }
      });
      picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
        var value = this.value;
        if (value) {
          picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date]);
          picker.$root.find('.' + settings.klass.selectYear).trigger('focus');
        }
      });
    }, 1).on('open', function () {
      var includeToday = '';
      if (calendar.disabled(calendar.get('now'))) {
        includeToday = ':not(.' + settings.klass.buttonToday + ')';
      }
      picker.$root.find('button' + includeToday + ', select').attr('disabled', false);
    }, 1).on('close', function () {
      picker.$root.find('button, select').attr('disabled', true);
    }, 1);
  } //DatePicker


  /**
   * Set a datepicker item object.
   */
  DatePicker.prototype.set = function (type, value, options) {

    var calendar = this,
        calendarItem = calendar.item;

    // If the value is `null` just set it immediately.
    if (value === null) {
      if (type == 'clear') type = 'select';
      calendarItem[type] = value;
      return calendar;
    }

    // Otherwise go through the queue of methods, and invoke the functions.
    // Update this as the time unit, and set the final value as this item.
    // * In the case of `enable`, keep the queue but set `disable` instead.
    //   And in the case of `flip`, keep the queue but set `enable` instead.
    calendarItem[type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type] = calendar.queue[type].split(' ').map(function (method) {
      value = calendar[method](type, value, options);
      return value;
    }).pop();

    // Check if we need to cascade through more updates.
    if (type == 'select') {
      calendar.set('highlight', calendarItem.select, options);
    } else if (type == 'highlight') {
      calendar.set('view', calendarItem.highlight, options);
    } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
      if (calendarItem.select && calendar.disabled(calendarItem.select)) {
        calendar.set('select', calendarItem.select, options);
      }
      if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
        calendar.set('highlight', calendarItem.highlight, options);
      }
    }

    return calendar;
  }; //DatePicker.prototype.set


  /**
   * Get a datepicker item object.
   */
  DatePicker.prototype.get = function (type) {
    return this.item[type];
  }; //DatePicker.prototype.get


  /**
   * Create a picker date object.
   */
  DatePicker.prototype.create = function (type, value, options) {

    var isInfiniteValue,
        calendar = this;

    // If there’s no value, use the type as the value.
    value = value === undefined ? type : value;

    // If it’s infinity, update the value.
    if (value == -Infinity || value == Infinity) {
      isInfiniteValue = value;
    }

    // If it’s an object, use the native date object.
    else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
        value = value.obj;
      }

      // If it’s an array, convert it into a date and make sure
      // that it’s a valid date – otherwise default to today.
      else if ($.isArray(value)) {
          value = new Date(value[0], value[1], value[2]);
          value = _.isDate(value) ? value : calendar.create().obj;
        }

        // If it’s a number or date object, make a normalized date.
        else if (_.isInteger(value) || _.isDate(value)) {
            value = calendar.normalize(new Date(value), options);
          }

          // If it’s a literal true or any other case, set it to now.
          else /*if ( value === true )*/{
              value = calendar.now(type, value, options);
            }

    // Return the compiled object.
    return {
      year: isInfiniteValue || value.getFullYear(),
      month: isInfiniteValue || value.getMonth(),
      date: isInfiniteValue || value.getDate(),
      day: isInfiniteValue || value.getDay(),
      obj: isInfiniteValue || value,
      pick: isInfiniteValue || value.getTime()
    };
  }; //DatePicker.prototype.create


  /**
   * Create a range limit object using an array, date object,
   * literal “true”, or integer relative to another time.
   */
  DatePicker.prototype.createRange = function (from, to) {

    var calendar = this,
        createDate = function (date) {
      if (date === true || $.isArray(date) || _.isDate(date)) {
        return calendar.create(date);
      }
      return date;
    };

    // Create objects if possible.
    if (!_.isInteger(from)) {
      from = createDate(from);
    }
    if (!_.isInteger(to)) {
      to = createDate(to);
    }

    // Create relative dates.
    if (_.isInteger(from) && $.isPlainObject(to)) {
      from = [to.year, to.month, to.date + from];
    } else if (_.isInteger(to) && $.isPlainObject(from)) {
      to = [from.year, from.month, from.date + to];
    }

    return {
      from: createDate(from),
      to: createDate(to)
    };
  }; //DatePicker.prototype.createRange


  /**
   * Check if a date unit falls within a date range object.
   */
  DatePicker.prototype.withinRange = function (range, dateUnit) {
    range = this.createRange(range.from, range.to);
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
  };

  /**
   * Check if two date range objects overlap.
   */
  DatePicker.prototype.overlapRanges = function (one, two) {

    var calendar = this;

    // Convert the ranges into comparable dates.
    one = calendar.createRange(one.from, one.to);
    two = calendar.createRange(two.from, two.to);

    return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) || calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
  };

  /**
   * Get the date today.
   */
  DatePicker.prototype.now = function (type, value, options) {
    value = new Date();
    if (options && options.rel) {
      value.setDate(value.getDate() + options.rel);
    }
    return this.normalize(value, options);
  };

  /**
   * Navigate to next/prev month.
   */
  DatePicker.prototype.navigate = function (type, value, options) {

    var targetDateObject,
        targetYear,
        targetMonth,
        targetDate,
        isTargetArray = $.isArray(value),
        isTargetObject = $.isPlainObject(value),
        viewsetObject = this.item.view; /*,
                                        safety = 100*/

    if (isTargetArray || isTargetObject) {

      if (isTargetObject) {
        targetYear = value.year;
        targetMonth = value.month;
        targetDate = value.date;
      } else {
        targetYear = +value[0];
        targetMonth = +value[1];
        targetDate = +value[2];
      }

      // If we’re navigating months but the view is in a different
      // month, navigate to the view’s year and month.
      if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
        targetYear = viewsetObject.year;
        targetMonth = viewsetObject.month;
      }

      // Figure out the expected target year and month.
      targetDateObject = new Date(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1);
      targetYear = targetDateObject.getFullYear();
      targetMonth = targetDateObject.getMonth();

      // If the month we’re going to doesn’t have enough days,
      // keep decreasing the date until we reach the month’s last date.
      while ( /*safety &&*/new Date(targetYear, targetMonth, targetDate).getMonth() !== targetMonth) {
        targetDate -= 1;
        /*safety -= 1
        if ( !safety ) {
            throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
        }*/
      }

      value = [targetYear, targetMonth, targetDate];
    }

    return value;
  }; //DatePicker.prototype.navigate


  /**
   * Normalize a date by setting the hours to midnight.
   */
  DatePicker.prototype.normalize = function (value /*, options*/) {
    value.setHours(0, 0, 0, 0);
    return value;
  };

  /**
   * Measure the range of dates.
   */
  DatePicker.prototype.measure = function (type, value /*, options*/) {

    var calendar = this;

    // If it’s anything false-y, remove the limits.
    if (!value) {
      value = type == 'min' ? -Infinity : Infinity;
    }

    // If it’s a string, parse it.
    else if (typeof value == 'string') {
        value = calendar.parse(type, value);
      }

      // If it's an integer, get a date relative to today.
      else if (_.isInteger(value)) {
          value = calendar.now(type, value, { rel: value });
        }

    return value;
  }; ///DatePicker.prototype.measure


  /**
   * Create a viewset object based on navigation.
   */
  DatePicker.prototype.viewset = function (type, dateObject /*, options*/) {
    return this.create([dateObject.year, dateObject.month, 1]);
  };

  /**
   * Validate a date as enabled and shift if needed.
   */
  DatePicker.prototype.validate = function (type, dateObject, options) {

    var calendar = this,


    // Keep a reference to the original date.
    originalDateObject = dateObject,


    // Make sure we have an interval.
    interval = options && options.interval ? options.interval : 1,


    // Check if the calendar enabled dates are inverted.
    isFlippedBase = calendar.item.enable === -1,


    // Check if we have any enabled dates after/before now.
    hasEnabledBeforeTarget,
        hasEnabledAfterTarget,


    // The min & max limits.
    minLimitObject = calendar.item.min,
        maxLimitObject = calendar.item.max,


    // Check if we’ve reached the limit during shifting.
    reachedMin,
        reachedMax,


    // Check if the calendar is inverted and at least one weekday is enabled.
    hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {

      // If there’s a date, check where it is relative to the target.
      if ($.isArray(value)) {
        var dateTime = calendar.create(value).pick;
        if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true;else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true;
      }

      // Return only integers for enabled weekdays.
      return _.isInteger(value);
    }).length; /*,
               safety = 100*/

    // Cases to validate for:
    // [1] Not inverted and date disabled.
    // [2] Inverted and some dates enabled.
    // [3] Not inverted and out of range.
    //
    // Cases to **not** validate for:
    // • Navigating months.
    // • Not inverted and date enabled.
    // • Inverted and all dates disabled.
    // • ..and anything else.
    if (!options || !options.nav) if (
    /* 1 */!isFlippedBase && calendar.disabled(dateObject) ||
    /* 2 */isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget) ||
    /* 3 */!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick)) {

      // When inverted, flip the direction if there aren’t any enabled weekdays
      // and there are no enabled dates in the direction of the interval.
      if (isFlippedBase && !hasEnabledWeekdays && (!hasEnabledAfterTarget && interval > 0 || !hasEnabledBeforeTarget && interval < 0)) {
        interval *= -1;
      }

      // Keep looping until we reach an enabled date.
      while ( /*safety &&*/calendar.disabled(dateObject)) {

        /*safety -= 1
        if ( !safety ) {
            throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
        }*/

        // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
        if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
          dateObject = originalDateObject;
          interval = interval > 0 ? 1 : -1;
        }

        // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
        if (dateObject.pick <= minLimitObject.pick) {
          reachedMin = true;
          interval = 1;
          dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)]);
        } else if (dateObject.pick >= maxLimitObject.pick) {
          reachedMax = true;
          interval = -1;
          dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)]);
        }

        // If we’ve reached both limits, just break out of the loop.
        if (reachedMin && reachedMax) {
          break;
        }

        // Finally, create the shifted date using the interval and keep looping.
        dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
      }
    } //endif


    // Return the date object settled on.
    return dateObject;
  }; //DatePicker.prototype.validate


  /**
   * Check if a date is disabled.
   */
  DatePicker.prototype.disabled = function (dateToVerify) {

    var calendar = this,


    // Filter through the disabled dates to check if this is one.
    isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {

      // If the date is a number, match the weekday with 0index and `firstDay` check.
      if (_.isInteger(dateToDisable)) {
        return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
      }

      // If it’s an array or a native JS date, create and match the exact date.
      if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
        return dateToVerify.pick === calendar.create(dateToDisable).pick;
      }

      // If it’s an object, match a date within the “from” and “to” range.
      if ($.isPlainObject(dateToDisable)) {
        return calendar.withinRange(dateToDisable, dateToVerify);
      }
    });

    // If this date matches a disabled date, confirm it’s not inverted.
    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
      return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' || $.isPlainObject(dateToDisable) && dateToDisable.inverted;
    }).length;

    // Check the calendar “enabled” flag and respectively flip the
    // disabled state. Then also check if it’s beyond the min/max limits.
    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch || dateToVerify.pick < calendar.item.min.pick || dateToVerify.pick > calendar.item.max.pick;
  }; //DatePicker.prototype.disabled


  /**
   * Parse a string into a usable type.
   */
  DatePicker.prototype.parse = function (type, value, options) {

    var calendar = this,
        parsingObject = {};

    // If it’s already parsed, we’re good.
    if (!value || typeof value != 'string') {
      return value;
    }

    // We need a `.format` to parse the value with.
    if (!(options && options.format)) {
      options = options || {};
      options.format = calendar.settings.format;
    }

    // Convert the format into an array and then map through it.
    calendar.formats.toArray(options.format).map(function (label) {

      var
      // Grab the formatting label.
      formattingLabel = calendar.formats[label],


      // The format length is from the formatting label function or the
      // label length without the escaping exclamation (!) mark.
      formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length;

      // If there's a format label, split the value up to the format length.
      // Then add it to the parsing object with appropriate label.
      if (formattingLabel) {
        parsingObject[label] = value.substr(0, formatLength);
      }

      // Update the value as the substring from format length to end.
      value = value.substr(formatLength);
    });

    // Compensate for month 0index.
    return [parsingObject.yyyy || parsingObject.yy, +(parsingObject.mm || parsingObject.m) - 1, parsingObject.dd || parsingObject.d];
  }; //DatePicker.prototype.parse


  /**
   * Various formats to display the object in.
   */
  DatePicker.prototype.formats = function () {

    // Return the length of the first word in a collection.
    function getWordLengthFromCollection(string, collection, dateObject) {

      // Grab the first word from the string.
      var word = string.match(/\w+/)[0];

      // If there's no month index, add it to the date object
      if (!dateObject.mm && !dateObject.m) {
        dateObject.m = collection.indexOf(word) + 1;
      }

      // Return the length of the word.
      return word.length;
    }

    // Get the length of the first word in a string.
    function getFirstWordLength(string) {
      return string.match(/\w+/)[0].length;
    }

    return {

      d: function (string, dateObject) {

        // If there's string, then get the digits length.
        // Otherwise return the selected date.
        return string ? _.digits(string) : dateObject.date;
      },
      dd: function (string, dateObject) {

        // If there's a string, then the length is always 2.
        // Otherwise return the selected date with a leading zero.
        return string ? 2 : _.lead(dateObject.date);
      },
      ddd: function (string, dateObject) {

        // If there's a string, then get the length of the first word.
        // Otherwise return the short selected weekday.
        return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
      },
      dddd: function (string, dateObject) {

        // If there's a string, then get the length of the first word.
        // Otherwise return the full selected weekday.
        return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
      },
      m: function (string, dateObject) {

        // If there's a string, then get the length of the digits
        // Otherwise return the selected month with 0index compensation.
        return string ? _.digits(string) : dateObject.month + 1;
      },
      mm: function (string, dateObject) {

        // If there's a string, then the length is always 2.
        // Otherwise return the selected month with 0index and leading zero.
        return string ? 2 : _.lead(dateObject.month + 1);
      },
      mmm: function (string, dateObject) {

        var collection = this.settings.monthsShort;

        // If there's a string, get length of the relevant month from the short
        // months collection. Otherwise return the selected month from that collection.
        return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
      },
      mmmm: function (string, dateObject) {

        var collection = this.settings.monthsFull;

        // If there's a string, get length of the relevant month from the full
        // months collection. Otherwise return the selected month from that collection.
        return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
      },
      yy: function (string, dateObject) {

        // If there's a string, then the length is always 2.
        // Otherwise return the selected year by slicing out the first 2 digits.
        return string ? 2 : ('' + dateObject.year).slice(2);
      },
      yyyy: function (string, dateObject) {

        // If there's a string, then the length is always 4.
        // Otherwise return the selected year.
        return string ? 4 : dateObject.year;
      },

      // Create an array by splitting the formatting string passed.
      toArray: function (formatString) {
        return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
      },

      // Format an object into a string using the formatting options.
      toString: function (formatString, itemObject) {
        var calendar = this;
        return calendar.formats.toArray(formatString).map(function (label) {
          return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '');
        }).join('');
      }
    };
  }(); //DatePicker.prototype.formats


  /**
   * Check if two date units are the exact.
   */
  DatePicker.prototype.isDateExact = function (one, two) {

    var calendar = this;

    // When we’re working with weekdays, do a direct comparison.
    if (_.isInteger(one) && _.isInteger(two) || typeof one == 'boolean' && typeof two == 'boolean') {
      return one === two;
    }

    // When we’re working with date representations, compare the “pick” value.
    if ((_.isDate(one) || $.isArray(one)) && (_.isDate(two) || $.isArray(two))) {
      return calendar.create(one).pick === calendar.create(two).pick;
    }

    // When we’re working with range objects, compare the “from” and “to”.
    if ($.isPlainObject(one) && $.isPlainObject(two)) {
      return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
    }

    return false;
  };

  /**
   * Check if two date units overlap.
   */
  DatePicker.prototype.isDateOverlap = function (one, two) {

    var calendar = this,
        firstDay = calendar.settings.firstDay ? 1 : 0;

    // When we’re working with a weekday index, compare the days.
    if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
      one = one % 7 + firstDay;
      return one === calendar.create(two).day + 1;
    }
    if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
      two = two % 7 + firstDay;
      return two === calendar.create(one).day + 1;
    }

    // When we’re working with range objects, check if the ranges overlap.
    if ($.isPlainObject(one) && $.isPlainObject(two)) {
      return calendar.overlapRanges(one, two);
    }

    return false;
  };

  /**
   * Flip the “enabled” state.
   */
  DatePicker.prototype.flipEnable = function (val) {
    var itemObject = this.item;
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
  };

  /**
   * Mark a collection of dates as “disabled”.
   */
  DatePicker.prototype.deactivate = function (type, datesToDisable) {

    var calendar = this,
        disabledItems = calendar.item.disable.slice(0);

    // If we’re flipping, that’s all we need to do.
    if (datesToDisable == 'flip') {
      calendar.flipEnable();
    } else if (datesToDisable === false) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToDisable === true) {
      calendar.flipEnable(-1);
      disabledItems = [];
    }

    // Otherwise go through the dates to disable.
    else {

        datesToDisable.map(function (unitToDisable) {

          var matchFound;

          // When we have disabled items, check for matches.
          // If something is matched, immediately break out.
          for (var index = 0; index < disabledItems.length; index += 1) {
            if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
              matchFound = true;
              break;
            }
          }

          // If nothing was found, add the validated unit to the collection.
          if (!matchFound) {
            if (_.isInteger(unitToDisable) || _.isDate(unitToDisable) || $.isArray(unitToDisable) || $.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to) {
              disabledItems.push(unitToDisable);
            }
          }
        });
      }

    // Return the updated collection.
    return disabledItems;
  }; //DatePicker.prototype.deactivate


  /**
   * Mark a collection of dates as “enabled”.
   */
  DatePicker.prototype.activate = function (type, datesToEnable) {

    var calendar = this,
        disabledItems = calendar.item.disable,
        disabledItemsCount = disabledItems.length;

    // If we’re flipping, that’s all we need to do.
    if (datesToEnable == 'flip') {
      calendar.flipEnable();
    } else if (datesToEnable === true) {
      calendar.flipEnable(1);
      disabledItems = [];
    } else if (datesToEnable === false) {
      calendar.flipEnable(-1);
      disabledItems = [];
    }

    // Otherwise go through the disabled dates.
    else {

        datesToEnable.map(function (unitToEnable) {

          var matchFound, disabledUnit, index, isExactRange;

          // Go through the disabled items and try to find a match.
          for (index = 0; index < disabledItemsCount; index += 1) {

            disabledUnit = disabledItems[index];

            // When an exact match is found, remove it from the collection.
            if (calendar.isDateExact(disabledUnit, unitToEnable)) {
              matchFound = disabledItems[index] = null;
              isExactRange = true;
              break;
            }

            // When an overlapped match is found, add the “inverted” state to it.
            else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                if ($.isPlainObject(unitToEnable)) {
                  unitToEnable.inverted = true;
                  matchFound = unitToEnable;
                } else if ($.isArray(unitToEnable)) {
                  matchFound = unitToEnable;
                  if (!matchFound[3]) matchFound.push('inverted');
                } else if (_.isDate(unitToEnable)) {
                  matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted'];
                }
                break;
              }
          }

          // If a match was found, remove a previous duplicate entry.
          if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
            if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
              disabledItems[index] = null;
              break;
            }
          }

          // In the event that we’re dealing with an exact range of dates,
          // make sure there are no “inverted” dates because of it.
          if (isExactRange) for (index = 0; index < disabledItemsCount; index += 1) {
            if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
              disabledItems[index] = null;
              break;
            }
          }

          // If something is still matched, add it into the collection.
          if (matchFound) {
            disabledItems.push(matchFound);
          }
        });
      }

    // Return the updated collection.
    return disabledItems.filter(function (val) {
      return val != null;
    });
  }; //DatePicker.prototype.activate


  /**
   * Create a string for the nodes in the picker.
   */
  DatePicker.prototype.nodes = function (isOpen) {

    var calendar = this,
        settings = calendar.settings,
        calendarItem = calendar.item,
        nowObject = calendarItem.now,
        selectedObject = calendarItem.select,
        highlightedObject = calendarItem.highlight,
        viewsetObject = calendarItem.view,
        disabledCollection = calendarItem.disable,
        minLimitObject = calendarItem.min,
        maxLimitObject = calendarItem.max,


    // Create the calendar table head using a copy of weekday labels collection.
    // * We do a copy so we don't mutate the original array.
    tableHead = function (collection, fullCollection) {

      // If the first day should be Monday, move Sunday to the end.
      if (settings.firstDay) {
        collection.push(collection.shift());
        fullCollection.push(fullCollection.shift());
      }

      // Create and return the table head group.
      return _.node('thead', _.node('tr', _.group({
        min: 0,
        max: DAYS_IN_WEEK - 1,
        i: 1,
        node: 'th',
        item: function (counter) {
          return [collection[counter], settings.klass.weekdays, 'scope=col title="' + fullCollection[counter] + '"'];
        }
      }))); //endreturn

      // Materialize modified
    }((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter).slice(0), settings.weekdaysFull.slice(0)),
        //tableHead


    // Create the nav for next/prev month.
    createMonthNav = function (next) {

      // Otherwise, return the created month tag.
      return _.node('div', ' ', settings.klass['nav' + (next ? 'Next' : 'Prev')] + (

      // If the focused month is outside the range, disabled the button.
      next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month || !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ? ' ' + settings.klass.navDisabled : ''), 'data-nav=' + (next || -1) + ' ' + _.ariaAttr({
        role: 'button',
        controls: calendar.$node[0].id + '_table'
      }) + ' ' + 'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"'); //endreturn
    },
        //createMonthNav


    // Create the month label.
    //Materialize modified
    createMonthLabel = function (override) {

      var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull;

      // Materialize modified
      if (override == "short_months") {
        monthsCollection = settings.monthsShort;
      }

      // If there are months to select, add a dropdown menu.
      if (settings.selectMonths && override == undefined) {

        return _.node('select', _.group({
          min: 0,
          max: 11,
          i: 1,
          node: 'option',
          item: function (loopedMonth) {

            return [

            // The looped month and no classes.
            monthsCollection[loopedMonth], 0,

            // Set the value and selected index.
            'value=' + loopedMonth + (viewsetObject.month == loopedMonth ? ' selected' : '') + (viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month || viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month ? ' disabled' : '')];
          }
        }), settings.klass.selectMonth + ' browser-default', (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' + 'title="' + settings.labelMonthSelect + '"');
      }

      // Materialize modified
      if (override == "short_months") if (selectedObject != null) return monthsCollection[selectedObject.month];else return monthsCollection[viewsetObject.month];

      // If there's a need for a month selector
      return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month);
    },
        //createMonthLabel


    // Create the year label.
    // Materialize modified
    createYearLabel = function (override) {

      var focusedYear = viewsetObject.year,


      // If years selector is set to a literal "true", set it to 5. Otherwise
      // divide in half to get half before and half after focused year.
      numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);

      // If there are years to select, add a dropdown menu.
      if (numberYears) {

        var minYear = minLimitObject.year,
            maxYear = maxLimitObject.year,
            lowestYear = focusedYear - numberYears,
            highestYear = focusedYear + numberYears;

        // If the min year is greater than the lowest year, increase the highest year
        // by the difference and set the lowest year to the min year.
        if (minYear > lowestYear) {
          highestYear += minYear - lowestYear;
          lowestYear = minYear;
        }

        // If the max year is less than the highest year, decrease the lowest year
        // by the lower of the two: available and needed years. Then set the
        // highest year to the max year.
        if (maxYear < highestYear) {

          var availableYears = lowestYear - minYear,
              neededYears = highestYear - maxYear;

          lowestYear -= availableYears > neededYears ? neededYears : availableYears;
          highestYear = maxYear;
        }

        if (settings.selectYears && override == undefined) {
          return _.node('select', _.group({
            min: lowestYear,
            max: highestYear,
            i: 1,
            node: 'option',
            item: function (loopedYear) {
              return [

              // The looped year and no classes.
              loopedYear, 0,

              // Set the value and selected index.
              'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')];
            }
          }), settings.klass.selectYear + ' browser-default', (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' + 'title="' + settings.labelYearSelect + '"');
        }
      }

      // Materialize modified
      if (override === 'raw' && selectedObject != null) {
        return _.node('div', selectedObject.year);
      }

      // Otherwise just return the year focused
      return _.node('div', focusedYear, settings.klass.year);
    }; //createYearLabel


    // Materialize modified
    createDayLabel = function () {
      if (selectedObject != null) return selectedObject.date;else return nowObject.date;
    };
    createWeekdayLabel = function () {
      var display_day;

      if (selectedObject != null) display_day = selectedObject.day;else display_day = nowObject.day;
      var weekday = settings.weekdaysShort[display_day];
      return weekday;
    };

    // Create and return the entire calendar.

    return _.node(
    // Date presentation View
    'div', _.node(
    // Div for Year
    'div', createYearLabel("raw"), settings.klass.year_display) + _.node('span', createWeekdayLabel() + ', ', "picker__weekday-display") + _.node(
    // Div for short Month
    'span', createMonthLabel("short_months") + ' ', settings.klass.month_display) + _.node(
    // Div for Day
    'span', createDayLabel(), settings.klass.day_display), settings.klass.date_display) +
    // Calendar container
    _.node('div', _.node('div', _.node('div', (settings.selectYears ? createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel()) + createMonthNav() + createMonthNav(1), settings.klass.header) + _.node('table', tableHead + _.node('tbody', _.group({
      min: 0,
      max: WEEKS_IN_CALENDAR - 1,
      i: 1,
      node: 'tr',
      item: function (rowCounter) {

        // If Monday is the first day and the month starts on Sunday, shift the date back a week.
        var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;

        return [_.group({
          min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
          max: function () {
            return this.min + DAYS_IN_WEEK - 1;
          },
          i: 1,
          node: 'td',
          item: function (targetDate) {

            // Convert the time date from a relative date to a target date.
            targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);

            var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                formattedDate = _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]);

            return [_.node('div', targetDate.date, function (klasses) {

              // Add the `infocus` or `outfocus` classes based on month in view.
              klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);

              // Add the `today` class if needed.
              if (nowObject.pick == targetDate.pick) {
                klasses.push(settings.klass.now);
              }

              // Add the `selected` class if something's selected and the time matches.
              if (isSelected) {
                klasses.push(settings.klass.selected);
              }

              // Add the `highlighted` class if something's highlighted and the time matches.
              if (isHighlighted) {
                klasses.push(settings.klass.highlighted);
              }

              // Add the `disabled` class if something's disabled and the object matches.
              if (isDisabled) {
                klasses.push(settings.klass.disabled);
              }

              return klasses.join(' ');
            }([settings.klass.day]), 'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
              role: 'gridcell',
              label: formattedDate,
              selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
              activedescendant: isHighlighted ? true : null,
              disabled: isDisabled ? true : null
            }) + ' ' + (isDisabled ? '' : 'tabindex="0"')), '', _.ariaAttr({ role: 'presentation' })]; //endreturn
          }
        })]; //endreturn
      }
    })), settings.klass.table, 'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
      role: 'grid',
      controls: calendar.$node[0].id,
      readonly: true
    })), settings.klass.calendar_container) // end calendar

    +

    // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
    _.node('div', _.node('button', settings.today, "btn-flat picker__today waves-effect", 'type=button data-pick=' + nowObject.pick + (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node('button', settings.clear, "btn-flat picker__clear waves-effect", 'type=button data-clear=1' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node('button', settings.close, "btn-flat picker__close waves-effect", 'type=button data-close=true ' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })), settings.klass.footer), 'picker__container__wrapper'); //endreturn
  }; //DatePicker.prototype.nodes


  /**
   * The date picker defaults.
   */
  DatePicker.defaults = function (prefix) {

    return {

      // The title label to use for the month nav buttons
      labelMonthNext: 'Next month',
      labelMonthPrev: 'Previous month',

      // The title label to use for the dropdown selectors
      labelMonthSelect: 'Select a month',
      labelYearSelect: 'Select a year',

      // Months and weekdays
      monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      // Materialize modified
      weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

      // Today and clear
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',

      // Picker close behavior (Prevent a change in behaviour for backwards compatibility)
      closeOnSelect: false,

      // The format to show on the `input` element
      format: 'd mmmm, yyyy',

      // Classes
      klass: {

        table: prefix + 'table',

        header: prefix + 'header',

        // Materialize Added klasses
        date_display: prefix + 'date-display',
        day_display: prefix + 'day-display',
        month_display: prefix + 'month-display',
        year_display: prefix + 'year-display',
        calendar_container: prefix + 'calendar-container',
        // end


        navPrev: prefix + 'nav--prev',
        navNext: prefix + 'nav--next',
        navDisabled: prefix + 'nav--disabled',

        month: prefix + 'month',
        year: prefix + 'year',

        selectMonth: prefix + 'select--month',
        selectYear: prefix + 'select--year',

        weekdays: prefix + 'weekday',

        day: prefix + 'day',
        disabled: prefix + 'day--disabled',
        selected: prefix + 'day--selected',
        highlighted: prefix + 'day--highlighted',
        now: prefix + 'day--today',
        infocus: prefix + 'day--infocus',
        outfocus: prefix + 'day--outfocus',

        footer: prefix + 'footer',

        buttonClear: prefix + 'button--clear',
        buttonToday: prefix + 'button--today',
        buttonClose: prefix + 'button--close'
      }
    };
  }(Picker.klasses().picker + '__');

  /**
   * Extend the picker to add the date picker.
   */
  Picker.extend('pickadate', DatePicker);
});
; /*!
  * ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
  * Copyright 2014 Wang Shenwei.
  * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
  *
  * Further modified
  * Copyright 2015 Ching Yaw Hao.
  */

(function ($) {
  var $win = $(window),
      $doc = $(document);

  // Can I use inline svg ?
  var svgNS = 'http://www.w3.org/2000/svg',
      svgSupported = 'SVGAngle' in window && function () {
    var supported,
        el = document.createElement('div');
    el.innerHTML = '<svg/>';
    supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
    el.innerHTML = '';
    return supported;
  }();

  // Can I use transition ?
  var transitionSupported = function () {
    var style = document.createElement('div').style;
    return 'transition' in style || 'WebkitTransition' in style || 'MozTransition' in style || 'msTransition' in style || 'OTransition' in style;
  }();

  // Listen touch events in touch screen device, instead of mouse events in desktop.
  var touchSupported = 'ontouchstart' in window,
      mousedownEvent = 'mousedown' + (touchSupported ? ' touchstart' : ''),
      mousemoveEvent = 'mousemove.clockpicker' + (touchSupported ? ' touchmove.clockpicker' : ''),
      mouseupEvent = 'mouseup.clockpicker' + (touchSupported ? ' touchend.clockpicker' : '');

  // Vibrate the device if supported
  var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

  function createSvgElement(name) {
    return document.createElementNS(svgNS, name);
  }

  function leadingZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  // Get a unique id
  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  // Clock size
  var dialRadius = 135,
      outerRadius = 105,

  // innerRadius = 80 on 12 hour clock
  innerRadius = 70,
      tickRadius = 20,
      diameter = dialRadius * 2,
      duration = transitionSupported ? 350 : 1;

  // Popover template
  var tpl = ['<div class="clockpicker picker">', '<div class="picker__holder">', '<div class="picker__frame">', '<div class="picker__wrap">', '<div class="picker__box">', '<div class="picker__date-display">', '<div class="clockpicker-display">', '<div class="clockpicker-display-column">', '<span class="clockpicker-span-hours text-primary"></span>', ':', '<span class="clockpicker-span-minutes"></span>', '</div>', '<div class="clockpicker-display-column clockpicker-display-am-pm">', '<div class="clockpicker-span-am-pm"></div>', '</div>', '</div>', '</div>', '<div class="picker__container__wrapper">', '<div class="picker__calendar-container">', '<div class="clockpicker-plate">', '<div class="clockpicker-canvas"></div>', '<div class="clockpicker-dial clockpicker-hours"></div>', '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>', '</div>', '<div class="clockpicker-am-pm-block">', '</div>', '</div>', '<div class="picker__footer">', '</div>', '</div>', '</div>', '</div>', '</div>', '</div>', '</div>'].join('');

  // ClockPicker
  function ClockPicker(element, options) {
    var popover = $(tpl),
        plate = popover.find('.clockpicker-plate'),
        holder = popover.find('.picker__holder'),
        hoursView = popover.find('.clockpicker-hours'),
        minutesView = popover.find('.clockpicker-minutes'),
        amPmBlock = popover.find('.clockpicker-am-pm-block'),
        isInput = element.prop('tagName') === 'INPUT',
        input = isInput ? element : element.find('input'),
        label = $("label[for=" + input.attr("id") + "]"),
        self = this;

    this.id = uniqueId('cp');
    this.element = element;
    this.holder = holder;
    this.options = options;
    this.isAppended = false;
    this.isShown = false;
    this.currentView = 'hours';
    this.isInput = isInput;
    this.input = input;
    this.label = label;
    this.popover = popover;
    this.plate = plate;
    this.hoursView = hoursView;
    this.minutesView = minutesView;
    this.amPmBlock = amPmBlock;
    this.spanHours = popover.find('.clockpicker-span-hours');
    this.spanMinutes = popover.find('.clockpicker-span-minutes');
    this.spanAmPm = popover.find('.clockpicker-span-am-pm');
    this.footer = popover.find('.picker__footer');
    this.amOrPm = "PM";

    // Setup for for 12 hour clock if option is selected
    if (options.twelvehour) {
      if (!options.ampmclickable) {
        this.spanAmPm.empty();
        $('<div id="click-am">AM</div>').appendTo(this.spanAmPm);
        $('<div id="click-pm">PM</div>').appendTo(this.spanAmPm);
      } else {
        this.spanAmPm.empty();
        $('<div id="click-am">AM</div>').on("click", function () {
          self.spanAmPm.children('#click-am').addClass("text-primary");
          self.spanAmPm.children('#click-pm').removeClass("text-primary");
          self.amOrPm = "AM";
        }).appendTo(this.spanAmPm);
        $('<div id="click-pm">PM</div>').on("click", function () {
          self.spanAmPm.children('#click-pm').addClass("text-primary");
          self.spanAmPm.children('#click-am').removeClass("text-primary");
          self.amOrPm = 'PM';
        }).appendTo(this.spanAmPm);
      }
    }

    // Add buttons to footer
    $('<button type="button" class="btn-flat picker__clear" tabindex="' + (options.twelvehour ? '3' : '1') + '">' + options.cleartext + '</button>').click($.proxy(this.clear, this)).appendTo(this.footer);
    $('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour ? '3' : '1') + '">' + options.canceltext + '</button>').click($.proxy(this.hide, this)).appendTo(this.footer);
    $('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour ? '3' : '1') + '">' + options.donetext + '</button>').click($.proxy(this.done, this)).appendTo(this.footer);

    this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
    this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));

    // Show or toggle
    input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));

    // Build ticks
    var tickTpl = $('<div class="clockpicker-tick"></div>'),
        i,
        tick,
        radian,
        radius;

    // Hours view
    if (options.twelvehour) {
      for (i = 1; i < 13; i += 1) {
        tick = tickTpl.clone();
        radian = i / 6 * Math.PI;
        radius = outerRadius;
        tick.css({
          left: dialRadius + Math.sin(radian) * radius - tickRadius,
          top: dialRadius - Math.cos(radian) * radius - tickRadius
        });
        tick.html(i === 0 ? '00' : i);
        hoursView.append(tick);
        tick.on(mousedownEvent, mousedown);
      }
    } else {
      for (i = 0; i < 24; i += 1) {
        tick = tickTpl.clone();
        radian = i / 6 * Math.PI;
        var inner = i > 0 && i < 13;
        radius = inner ? innerRadius : outerRadius;
        tick.css({
          left: dialRadius + Math.sin(radian) * radius - tickRadius,
          top: dialRadius - Math.cos(radian) * radius - tickRadius
        });
        tick.html(i === 0 ? '00' : i);
        hoursView.append(tick);
        tick.on(mousedownEvent, mousedown);
      }
    }

    // Minutes view
    for (i = 0; i < 60; i += 5) {
      tick = tickTpl.clone();
      radian = i / 30 * Math.PI;
      tick.css({
        left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
        top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
      });
      tick.html(leadingZero(i));
      minutesView.append(tick);
      tick.on(mousedownEvent, mousedown);
    }

    // Clicking on minutes view space
    plate.on(mousedownEvent, function (e) {
      if ($(e.target).closest('.clockpicker-tick').length === 0) {
        mousedown(e, true);
      }
    });

    // Mousedown or touchstart
    function mousedown(e, space) {
      var offset = plate.offset(),
          isTouch = /^touch/.test(e.type),
          x0 = offset.left + dialRadius,
          y0 = offset.top + dialRadius,
          dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
          dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
          z = Math.sqrt(dx * dx + dy * dy),
          moved = false;

      // When clicking on minutes view space, check the mouse position
      if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
        return;
      }
      e.preventDefault();

      // Set cursor style of body after 200ms
      var movingTimer = setTimeout(function () {
        self.popover.addClass('clockpicker-moving');
      }, 200);

      // Clock
      self.setHand(dx, dy, !space, true);

      // Mousemove on document
      $doc.off(mousemoveEvent).on(mousemoveEvent, function (e) {
        e.preventDefault();
        var isTouch = /^touch/.test(e.type),
            x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
            y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
        if (!moved && x === dx && y === dy) {
          // Clicking in chrome on windows will trigger a mousemove event
          return;
        }
        moved = true;
        self.setHand(x, y, false, true);
      });

      // Mouseup on document
      $doc.off(mouseupEvent).on(mouseupEvent, function (e) {
        $doc.off(mouseupEvent);
        e.preventDefault();
        var isTouch = /^touch/.test(e.type),
            x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
            y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
        if ((space || moved) && x === dx && y === dy) {
          self.setHand(x, y);
        }

        if (self.currentView === 'hours') {
          self.toggleView('minutes', duration / 2);
        } else if (options.autoclose) {
          self.minutesView.addClass('clockpicker-dial-out');
          setTimeout(function () {
            self.done();
          }, duration / 2);
        }
        plate.prepend(canvas);

        // Reset cursor style of body
        clearTimeout(movingTimer);
        self.popover.removeClass('clockpicker-moving');

        // Unbind mousemove event
        $doc.off(mousemoveEvent);
      });
    }

    if (svgSupported) {
      // Draw clock hands and others
      var canvas = popover.find('.clockpicker-canvas'),
          svg = createSvgElement('svg');
      svg.setAttribute('class', 'clockpicker-svg');
      svg.setAttribute('width', diameter);
      svg.setAttribute('height', diameter);
      var g = createSvgElement('g');
      g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
      var bearing = createSvgElement('circle');
      bearing.setAttribute('class', 'clockpicker-canvas-bearing');
      bearing.setAttribute('cx', 0);
      bearing.setAttribute('cy', 0);
      bearing.setAttribute('r', 4);
      var hand = createSvgElement('line');
      hand.setAttribute('x1', 0);
      hand.setAttribute('y1', 0);
      var bg = createSvgElement('circle');
      bg.setAttribute('class', 'clockpicker-canvas-bg');
      bg.setAttribute('r', tickRadius);
      g.appendChild(hand);
      g.appendChild(bg);
      g.appendChild(bearing);
      svg.appendChild(g);
      canvas.append(svg);

      this.hand = hand;
      this.bg = bg;
      this.bearing = bearing;
      this.g = g;
      this.canvas = canvas;
    }

    raiseCallback(this.options.init);
  }

  function raiseCallback(callbackFunction) {
    if (callbackFunction && typeof callbackFunction === "function") callbackFunction();
  }

  // Default options
  ClockPicker.DEFAULTS = {
    'default': '', // default time, 'now' or '13:14' e.g.
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    donetext: 'Ok', // done button text
    cleartext: 'Clear',
    canceltext: 'Cancel',
    autoclose: false, // auto close when minute is selected
    ampmclickable: true, // set am/pm button on itself
    darktheme: false, // set to dark theme
    twelvehour: true, // change to 12 hour AM/PM clock from 24 hour
    vibrate: true // vibrate the device when dragging clock hand
  };

  // Show or hide popover
  ClockPicker.prototype.toggle = function () {
    this[this.isShown ? 'hide' : 'show']();
  };

  // Set popover position
  ClockPicker.prototype.locate = function () {
    var element = this.element,
        popover = this.popover,
        offset = element.offset(),
        width = element.outerWidth(),
        height = element.outerHeight(),
        align = this.options.align,
        self = this;

    popover.show();
  };

  // Show popover
  ClockPicker.prototype.show = function (e) {
    // Not show again
    if (this.isShown) {
      return;
    }
    raiseCallback(this.options.beforeShow);
    $(':input').each(function () {
      $(this).attr('tabindex', -1);
    });
    var self = this;
    // Initialize
    this.input.blur();
    this.popover.addClass('picker--opened');
    this.input.addClass('picker__input picker__input--active');
    $(document.body).css('overflow', 'hidden');
    // Get the time
    var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
    if (this.options.twelvehour && !(typeof value[1] === 'undefined')) {
      if (value[1].indexOf("AM") > 0) {
        this.amOrPm = 'AM';
      } else {
        this.amOrPm = 'PM';
      }
      value[1] = value[1].replace("AM", "").replace("PM", "");
    }
    if (value[0] === 'now') {
      var now = new Date(+new Date() + this.options.fromnow);
      value = [now.getHours(), now.getMinutes()];
      if (this.options.twelvehour) {
        this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
      }
    }
    this.hours = +value[0] || 0;
    this.minutes = +value[1] || 0;
    this.spanHours.html(this.hours);
    this.spanMinutes.html(leadingZero(this.minutes));
    if (!this.isAppended) {

      // Append popover to input by default
      var containerEl = document.querySelector(this.options.container);
      if (this.options.container && containerEl) {
        containerEl.appendChild(this.popover[0]);
      } else {
        this.popover.insertAfter(this.input);
      }

      if (this.options.twelvehour) {
        if (this.amOrPm === 'PM') {
          this.spanAmPm.children('#click-pm').addClass("text-primary");
          this.spanAmPm.children('#click-am').removeClass("text-primary");
        } else {
          this.spanAmPm.children('#click-am').addClass("text-primary");
          this.spanAmPm.children('#click-pm').removeClass("text-primary");
        }
      }
      // Reset position when resize
      $win.on('resize.clockpicker' + this.id, function () {
        if (self.isShown) {
          self.locate();
        }
      });
      this.isAppended = true;
    }
    // Toggle to hours view
    this.toggleView('hours');
    // Set position
    this.locate();
    this.isShown = true;
    // Hide when clicking or tabbing on any element except the clock and input
    $doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function (e) {
      var target = $(e.target);
      if (target.closest(self.popover.find('.picker__wrap')).length === 0 && target.closest(self.input).length === 0) {
        self.hide();
      }
    });
    // Hide when ESC is pressed
    $doc.on('keyup.clockpicker.' + this.id, function (e) {
      if (e.keyCode === 27) {
        self.hide();
      }
    });
    raiseCallback(this.options.afterShow);
  };
  // Hide popover
  ClockPicker.prototype.hide = function () {
    raiseCallback(this.options.beforeHide);
    this.input.removeClass('picker__input picker__input--active');
    this.popover.removeClass('picker--opened');
    $(document.body).css('overflow', 'visible');
    this.isShown = false;
    $(':input').each(function (index) {
      $(this).attr('tabindex', index + 1);
    });
    // Unbinding events on document
    $doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
    $doc.off('keyup.clockpicker.' + this.id);
    this.popover.hide();
    raiseCallback(this.options.afterHide);
  };
  // Toggle to hours or minutes view
  ClockPicker.prototype.toggleView = function (view, delay) {
    var raiseAfterHourSelect = false;
    if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
      raiseCallback(this.options.beforeHourSelect);
      raiseAfterHourSelect = true;
    }
    var isHours = view === 'hours',
        nextView = isHours ? this.hoursView : this.minutesView,
        hideView = isHours ? this.minutesView : this.hoursView;
    this.currentView = view;

    this.spanHours.toggleClass('text-primary', isHours);
    this.spanMinutes.toggleClass('text-primary', !isHours);

    // Let's make transitions
    hideView.addClass('clockpicker-dial-out');
    nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

    // Reset clock hand
    this.resetClock(delay);

    // After transitions ended
    clearTimeout(this.toggleViewTimer);
    this.toggleViewTimer = setTimeout(function () {
      hideView.css('visibility', 'hidden');
    }, duration);

    if (raiseAfterHourSelect) {
      raiseCallback(this.options.afterHourSelect);
    }
  };

  // Reset clock hand
  ClockPicker.prototype.resetClock = function (delay) {
    var view = this.currentView,
        value = this[view],
        isHours = view === 'hours',
        unit = Math.PI / (isHours ? 6 : 30),
        radian = value * unit,
        radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
        x = Math.sin(radian) * radius,
        y = -Math.cos(radian) * radius,
        self = this;

    if (svgSupported && delay) {
      self.canvas.addClass('clockpicker-canvas-out');
      setTimeout(function () {
        self.canvas.removeClass('clockpicker-canvas-out');
        self.setHand(x, y);
      }, delay);
    } else this.setHand(x, y);
  };

  // Set clock hand to (x, y)
  ClockPicker.prototype.setHand = function (x, y, roundBy5, dragging) {
    var radian = Math.atan2(x, -y),
        isHours = this.currentView === 'hours',
        unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
        z = Math.sqrt(x * x + y * y),
        options = this.options,
        inner = isHours && z < (outerRadius + innerRadius) / 2,
        radius = inner ? innerRadius : outerRadius,
        value;

    if (options.twelvehour) {
      radius = outerRadius;
    }

    // Radian should in range [0, 2PI]
    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }

    // Get the round value
    value = Math.round(radian / unit);

    // Get the round radian
    radian = value * unit;

    // Correct the hours or minutes
    if (options.twelvehour) {
      if (isHours) {
        if (value === 0) value = 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    } else {
      if (isHours) {
        if (value === 12) value = 0;
        value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
      } else {
        if (roundBy5) value *= 5;
        if (value === 60) value = 0;
      }
    }

    // Once hours or minutes changed, vibrate the device
    if (this[this.currentView] !== value) {
      if (vibrate && this.options.vibrate) {
        // Do not vibrate too frequently
        if (!this.vibrateTimer) {
          navigator[vibrate](10);
          this.vibrateTimer = setTimeout($.proxy(function () {
            this.vibrateTimer = null;
          }, this), 100);
        }
      }
    }

    this[this.currentView] = value;
    if (isHours) {
      this['spanHours'].html(value);
    } else {
      this['spanMinutes'].html(leadingZero(value));
    }

    // If svg is not supported, just add an active class to the tick
    if (!svgSupported) {
      this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function () {
        var tick = $(this);
        tick.toggleClass('active', value === +tick.html());
      });
      return;
    }

    // Set clock hand and others' position
    var cx1 = Math.sin(radian) * (radius - tickRadius),
        cy1 = -Math.cos(radian) * (radius - tickRadius),
        cx2 = Math.sin(radian) * radius,
        cy2 = -Math.cos(radian) * radius;
    this.hand.setAttribute('x2', cx1);
    this.hand.setAttribute('y2', cy1);
    this.bg.setAttribute('cx', cx2);
    this.bg.setAttribute('cy', cy2);
  };

  // Hours and minutes are selected
  ClockPicker.prototype.done = function () {
    raiseCallback(this.options.beforeDone);
    this.hide();
    this.label.addClass('active');

    var last = this.input.prop('value'),
        value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
    if (this.options.twelvehour) {
      value = value + this.amOrPm;
    }

    this.input.prop('value', value);
    if (value !== last) {
      this.input.triggerHandler('change');
      if (!this.isInput) {
        this.element.trigger('change');
      }
    }

    if (this.options.autoclose) this.input.trigger('blur');

    raiseCallback(this.options.afterDone);
  };

  // Clear input field
  ClockPicker.prototype.clear = function () {
    this.hide();
    this.label.removeClass('active');

    var last = this.input.prop('value'),
        value = '';

    this.input.prop('value', value);
    if (value !== last) {
      this.input.triggerHandler('change');
      if (!this.isInput) {
        this.element.trigger('change');
      }
    }

    if (this.options.autoclose) {
      this.input.trigger('blur');
    }
  };

  // Remove clockpicker from input
  ClockPicker.prototype.remove = function () {
    this.element.removeData('clockpicker');
    this.input.off('focus.clockpicker click.clockpicker');
    if (this.isShown) {
      this.hide();
    }
    if (this.isAppended) {
      $win.off('resize.clockpicker' + this.id);
      this.popover.remove();
    }
  };

  // Extends $.fn.clockpicker
  $.fn.pickatime = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var $this = $(this),
          data = $this.data('clockpicker');
      if (!data) {
        var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
        $this.data('clockpicker', new ClockPicker($this, options));
      } else {
        // Manual operatsions. show, hide, remove, e.g.
        if (typeof data[option] === 'function') {
          data[option].apply(data, args);
        }
      }
    });
  };
})(jQuery);
;(function ($) {

  $.fn.characterCounter = function () {
    return this.each(function () {
      var $input = $(this);
      var $counterElement = $input.parent().find('span[class="character-counter"]');

      // character counter has already been added appended to the parent container
      if ($counterElement.length) {
        return;
      }

      var itHasLengthAttribute = $input.attr('data-length') !== undefined;

      if (itHasLengthAttribute) {
        $input.on('input', updateCounter);
        $input.on('focus', updateCounter);
        $input.on('blur', removeCounterElement);

        addCounterElement($input);
      }
    });
  };

  function updateCounter() {
    var maxLength = +$(this).attr('data-length'),
        actualLength = +$(this).val().length,
        isValidLength = actualLength <= maxLength;

    $(this).parent().find('span[class="character-counter"]').html(actualLength + '/' + maxLength);

    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input) {
    var $counterElement = $input.parent().find('span[class="character-counter"]');

    if ($counterElement.length) {
      return;
    }

    $counterElement = $('<span/>').addClass('character-counter').css('float', 'right').css('font-size', '12px').css('height', 1);

    $input.parent().append($counterElement);
  }

  function removeCounterElement() {
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input) {
    var inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    } else if (!isValidLength && !inputHasInvalidClass) {
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function () {
    $('input, textarea').characterCounter();
  });
})(jQuery);
;(function ($) {

  var methods = {

    init: function (options) {
      var defaults = {
        duration: 200, // ms
        dist: -100, // zoom scale TODO: make this more intuitive as an option
        shift: 0, // spacing for center image
        padding: 0, // Padding between non center items
        fullWidth: false, // Change to full width styles
        indicators: false, // Toggle indicators
        noWrap: false, // Don't wrap around and cycle through items.
        onCycleTo: null // Callback for when a new slide is cycled to.
      };
      options = $.extend(defaults, options);
      var namespace = Materialize.objectSelectorString($(this));

      return this.each(function (i) {

        var images, item_width, item_height, offset, center, pressed, dim, count, reference, referenceY, amplitude, target, velocity, scrolling, xform, frame, timestamp, ticker, dragged, vertical_dragged;
        var $indicators = $('<ul class="indicators"></ul>');
        var scrollingTimeout = null;
        var oneTimeCallback = null;

        // Initialize
        var view = $(this);
        var hasMultipleSlides = view.find('.carousel-item').length > 1;
        var showIndicators = (view.attr('data-indicators') || options.indicators) && hasMultipleSlides;
        var noWrap = view.attr('data-no-wrap') || options.noWrap || !hasMultipleSlides;
        var uniqueNamespace = view.attr('data-namespace') || namespace + i;
        view.attr('data-namespace', uniqueNamespace);

        // Options
        var setCarouselHeight = function (imageOnly) {
          var firstSlide = view.find('.carousel-item.active').length ? view.find('.carousel-item.active').first() : view.find('.carousel-item').first();
          var firstImage = firstSlide.find('img').first();
          if (firstImage.length) {
            if (firstImage[0].complete) {
              // If image won't trigger the load event
              var imageHeight = firstImage.height();
              if (imageHeight > 0) {
                view.css('height', firstImage.height());
              } else {
                // If image still has no height, use the natural dimensions to calculate
                var naturalWidth = firstImage[0].naturalWidth;
                var naturalHeight = firstImage[0].naturalHeight;
                var adjustedHeight = view.width() / naturalWidth * naturalHeight;
                view.css('height', adjustedHeight);
              }
            } else {
              // Get height when image is loaded normally
              firstImage.on('load', function () {
                view.css('height', $(this).height());
              });
            }
          } else if (!imageOnly) {
            var slideHeight = firstSlide.height();
            view.css('height', slideHeight);
          }
        };

        if (options.fullWidth) {
          options.dist = 0;
          setCarouselHeight();

          // Offset fixed items when indicators.
          if (showIndicators) {
            view.find('.carousel-fixed-item').addClass('with-indicators');
          }
        }

        // Don't double initialize.
        if (view.hasClass('initialized')) {
          // Recalculate variables
          $(window).trigger('resize');

          // Redraw carousel.
          view.trigger('carouselNext', [0.000001]);
          return true;
        }

        view.addClass('initialized');
        pressed = false;
        offset = target = 0;
        images = [];
        item_width = view.find('.carousel-item').first().innerWidth();
        item_height = view.find('.carousel-item').first().innerHeight();
        dim = item_width * 2 + options.padding;

        view.find('.carousel-item').each(function (i) {
          images.push($(this)[0]);
          if (showIndicators) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Add active to first by default.
            if (i === 0) {
              $indicator.addClass('active');
            }

            // Handle clicks on indicators.
            $indicator.click(function (e) {
              e.stopPropagation();

              var index = $(this).index();
              cycleTo(index);
            });
            $indicators.append($indicator);
          }
        });

        if (showIndicators) {
          view.append($indicators);
        }
        count = images.length;

        function setupEvents() {
          if (typeof window.ontouchstart !== 'undefined') {
            view.on('touchstart.carousel', tap);
            view.on('touchmove.carousel', drag);
            view.on('touchend.carousel', release);
          }
          view.on('mousedown.carousel', tap);
          view.on('mousemove.carousel', drag);
          view.on('mouseup.carousel', release);
          view.on('mouseleave.carousel', release);
          view.on('click.carousel', click);
        }

        function xpos(e) {
          // touch event
          if (e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientX;
          }

          // mouse event
          return e.clientX;
        }

        function ypos(e) {
          // touch event
          if (e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientY;
          }

          // mouse event
          return e.clientY;
        }

        function wrap(x) {
          return x >= count ? x % count : x < 0 ? wrap(count + x % count) : x;
        }

        function scroll(x) {
          // Track scrolling state
          scrolling = true;
          if (!view.hasClass('scrolling')) {
            view.addClass('scrolling');
          }
          if (scrollingTimeout != null) {
            window.clearTimeout(scrollingTimeout);
          }
          scrollingTimeout = window.setTimeout(function () {
            scrolling = false;
            view.removeClass('scrolling');
          }, options.duration);

          // Start actual scroll
          var i, half, delta, dir, tween, el, alignment, xTranslation;
          var lastCenter = center;

          offset = typeof x === 'number' ? x : offset;
          center = Math.floor((offset + dim / 2) / dim);
          delta = offset - center * dim;
          dir = delta < 0 ? 1 : -1;
          tween = -dir * delta * 2 / dim;
          half = count >> 1;

          if (!options.fullWidth) {
            alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
            alignment += 'translateY(' + (view[0].clientHeight - item_height) / 2 + 'px)';
          } else {
            alignment = 'translateX(0)';
          }

          // Set indicator active
          if (showIndicators) {
            var diff = center % count;
            var activeIndicator = $indicators.find('.indicator-item.active');
            if (activeIndicator.index() !== diff) {
              activeIndicator.removeClass('active');
              $indicators.find('.indicator-item').eq(diff).addClass('active');
            }
          }

          // center
          // Don't show wrapped items.
          if (!noWrap || center >= 0 && center < count) {
            el = images[wrap(center)];

            // Add active class to center item.
            if (!$(el).hasClass('active')) {
              view.find('.carousel-item').removeClass('active');
              $(el).addClass('active');
            }
            el.style[xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * options.shift * tween * i + 'px)' + ' translateZ(' + options.dist * tween + 'px)';
            el.style.zIndex = 0;
            if (options.fullWidth) {
              tweenedOpacity = 1;
            } else {
              tweenedOpacity = 1 - 0.2 * tween;
            }
            el.style.opacity = tweenedOpacity;
            el.style.display = 'block';
          }

          for (i = 1; i <= half; ++i) {
            // right side
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i * 2 + tween * dir);
              tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
            }
            // Don't show wrapped items.
            if (!noWrap || center + i < count) {
              el = images[wrap(center + i)];
              el.style[xform] = alignment + ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
              el.style.zIndex = -i;
              el.style.opacity = tweenedOpacity;
              el.style.display = 'block';
            }

            // left side
            if (options.fullWidth) {
              zTranslation = options.dist;
              tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
            } else {
              zTranslation = options.dist * (i * 2 - tween * dir);
              tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
            }
            // Don't show wrapped items.
            if (!noWrap || center - i >= 0) {
              el = images[wrap(center - i)];
              el.style[xform] = alignment + ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' + ' translateZ(' + zTranslation + 'px)';
              el.style.zIndex = -i;
              el.style.opacity = tweenedOpacity;
              el.style.display = 'block';
            }
          }

          // center
          // Don't show wrapped items.
          if (!noWrap || center >= 0 && center < count) {
            el = images[wrap(center)];
            el.style[xform] = alignment + ' translateX(' + -delta / 2 + 'px)' + ' translateX(' + dir * options.shift * tween + 'px)' + ' translateZ(' + options.dist * tween + 'px)';
            el.style.zIndex = 0;
            if (options.fullWidth) {
              tweenedOpacity = 1;
            } else {
              tweenedOpacity = 1 - 0.2 * tween;
            }
            el.style.opacity = tweenedOpacity;
            el.style.display = 'block';
          }

          // onCycleTo callback
          if (lastCenter !== center && typeof options.onCycleTo === "function") {
            var $curr_item = view.find('.carousel-item').eq(wrap(center));
            options.onCycleTo.call(this, $curr_item, dragged);
          }

          // One time callback
          if (typeof oneTimeCallback === "function") {
            oneTimeCallback.call(this, $curr_item, dragged);
            oneTimeCallback = null;
          }
        }

        function track() {
          var now, elapsed, delta, v;

          now = Date.now();
          elapsed = now - timestamp;
          timestamp = now;
          delta = offset - frame;
          frame = offset;

          v = 1000 * delta / (1 + elapsed);
          velocity = 0.8 * v + 0.2 * velocity;
        }

        function autoScroll() {
          var elapsed, delta;

          if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = amplitude * Math.exp(-elapsed / options.duration);
            if (delta > 2 || delta < -2) {
              scroll(target - delta);
              requestAnimationFrame(autoScroll);
            } else {
              scroll(target);
            }
          }
        }

        function click(e) {
          // Disable clicks if carousel was dragged.
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else if (!options.fullWidth) {
            var clickedIndex = $(e.target).closest('.carousel-item').index();
            var diff = wrap(center) - clickedIndex;

            // Disable clicks if carousel was shifted by click
            if (diff !== 0) {
              e.preventDefault();
              e.stopPropagation();
            }
            cycleTo(clickedIndex);
          }
        }

        function cycleTo(n) {
          var diff = center % count - n;

          // Account for wraparound.
          if (!noWrap) {
            if (diff < 0) {
              if (Math.abs(diff + count) < Math.abs(diff)) {
                diff += count;
              }
            } else if (diff > 0) {
              if (Math.abs(diff - count) < diff) {
                diff -= count;
              }
            }
          }

          // Call prev or next accordingly.
          if (diff < 0) {
            view.trigger('carouselNext', [Math.abs(diff)]);
          } else if (diff > 0) {
            view.trigger('carouselPrev', [diff]);
          }
        }

        function tap(e) {
          // Fixes firefox draggable image bug
          if (e.type === 'mousedown' && $(e.target).is('img')) {
            e.preventDefault();
          }
          pressed = true;
          dragged = false;
          vertical_dragged = false;
          reference = xpos(e);
          referenceY = ypos(e);

          velocity = amplitude = 0;
          frame = offset;
          timestamp = Date.now();
          clearInterval(ticker);
          ticker = setInterval(track, 100);
        }

        function drag(e) {
          var x, delta, deltaY;
          if (pressed) {
            x = xpos(e);
            y = ypos(e);
            delta = reference - x;
            deltaY = Math.abs(referenceY - y);
            if (deltaY < 30 && !vertical_dragged) {
              // If vertical scrolling don't allow dragging.
              if (delta > 2 || delta < -2) {
                dragged = true;
                reference = x;
                scroll(offset + delta);
              }
            } else if (dragged) {
              // If dragging don't allow vertical scroll.
              e.preventDefault();
              e.stopPropagation();
              return false;
            } else {
              // Vertical scrolling.
              vertical_dragged = true;
            }
          }

          if (dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }

        function release(e) {
          if (pressed) {
            pressed = false;
          } else {
            return;
          }

          clearInterval(ticker);
          target = offset;
          if (velocity > 10 || velocity < -10) {
            amplitude = 0.9 * velocity;
            target = offset + amplitude;
          }
          target = Math.round(target / dim) * dim;

          // No wrap of items.
          if (noWrap) {
            if (target >= dim * (count - 1)) {
              target = dim * (count - 1);
            } else if (target < 0) {
              target = 0;
            }
          }
          amplitude = target - offset;
          timestamp = Date.now();
          requestAnimationFrame(autoScroll);

          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
          }
          return false;
        }

        xform = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
          var e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            xform = e;
            return false;
          }
          return true;
        });

        var throttledResize = Materialize.throttle(function () {
          if (options.fullWidth) {
            item_width = view.find('.carousel-item').first().innerWidth();
            var imageHeight = view.find('.carousel-item.active').height();
            dim = item_width * 2 + options.padding;
            offset = center * 2 * item_width;
            target = offset;
            setCarouselHeight(true);
          } else {
            scroll();
          }
        }, 200);
        $(window).off('resize.carousel-' + uniqueNamespace).on('resize.carousel-' + uniqueNamespace, throttledResize);

        setupEvents();
        scroll(offset);

        $(this).on('carouselNext', function (e, n, callback) {
          if (n === undefined) {
            n = 1;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }

          target = dim * Math.round(offset / dim) + dim * n;
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });

        $(this).on('carouselPrev', function (e, n, callback) {
          if (n === undefined) {
            n = 1;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }

          target = dim * Math.round(offset / dim) - dim * n;
          if (offset !== target) {
            amplitude = target - offset;
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
          }
        });

        $(this).on('carouselSet', function (e, n, callback) {
          if (n === undefined) {
            n = 0;
          }
          if (typeof callback === "function") {
            oneTimeCallback = callback;
          }

          cycleTo(n);
        });
      });
    },
    next: function (n, callback) {
      $(this).trigger('carouselNext', [n, callback]);
    },
    prev: function (n, callback) {
      $(this).trigger('carouselPrev', [n, callback]);
    },
    set: function (n, callback) {
      $(this).trigger('carouselSet', [n, callback]);
    },
    destroy: function () {
      var uniqueNamespace = $(this).attr('data-namespace');
      $(this).removeAttr('data-namespace');
      $(this).removeClass('initialized');
      $(this).find('.indicators').remove();

      // Remove event handlers
      $(this).off('carouselNext carouselPrev carouselSet');
      $(window).off('resize.carousel-' + uniqueNamespace);
      if (typeof window.ontouchstart !== 'undefined') {
        $(this).off('touchstart.carousel touchmove.carousel touchend.carousel');
      }
      $(this).off('mousedown.carousel mousemove.carousel mouseup.carousel mouseleave.carousel click.carousel');
    }
  };

  $.fn.carousel = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.carousel');
    }
  }; // Plugin end
})(jQuery);
;(function ($) {

  var methods = {
    init: function (options) {
      return this.each(function () {
        var origin = $('#' + $(this).attr('data-activates'));
        var screen = $('body');

        // Creating tap target
        var tapTargetEl = $(this);
        var tapTargetWrapper = tapTargetEl.parent('.tap-target-wrapper');
        var tapTargetWave = tapTargetWrapper.find('.tap-target-wave');
        var tapTargetOriginEl = tapTargetWrapper.find('.tap-target-origin');
        var tapTargetContentEl = tapTargetEl.find('.tap-target-content');

        // Creating wrapper
        if (!tapTargetWrapper.length) {
          tapTargetWrapper = tapTargetEl.wrap($('<div class="tap-target-wrapper"></div>')).parent();
        }

        // Creating content
        if (!tapTargetContentEl.length) {
          tapTargetContentEl = $('<div class="tap-target-content"></div>');
          tapTargetEl.append(tapTargetContentEl);
        }

        // Creating foreground wave
        if (!tapTargetWave.length) {
          tapTargetWave = $('<div class="tap-target-wave"></div>');

          // Creating origin
          if (!tapTargetOriginEl.length) {
            tapTargetOriginEl = origin.clone(true, true);
            tapTargetOriginEl.addClass('tap-target-origin');
            tapTargetOriginEl.removeAttr('id');
            tapTargetOriginEl.removeAttr('style');
            tapTargetWave.append(tapTargetOriginEl);
          }

          tapTargetWrapper.append(tapTargetWave);
        }

        // Open
        var openTapTarget = function () {
          if (tapTargetWrapper.is('.open')) {
            return;
          }

          // Adding open class
          tapTargetWrapper.addClass('open');

          setTimeout(function () {
            tapTargetOriginEl.off('click.tapTarget').on('click.tapTarget', function (e) {
              closeTapTarget();
              tapTargetOriginEl.off('click.tapTarget');
            });

            $(document).off('click.tapTarget').on('click.tapTarget', function (e) {
              closeTapTarget();
              $(document).off('click.tapTarget');
            });

            var throttledCalc = Materialize.throttle(function () {
              calculateTapTarget();
            }, 200);
            $(window).off('resize.tapTarget').on('resize.tapTarget', throttledCalc);
          }, 0);
        };

        // Close
        var closeTapTarget = function () {
          if (!tapTargetWrapper.is('.open')) {
            return;
          }

          tapTargetWrapper.removeClass('open');
          tapTargetOriginEl.off('click.tapTarget');
          $(document).off('click.tapTarget');
          $(window).off('resize.tapTarget');
        };

        // Pre calculate
        var calculateTapTarget = function () {
          // Element or parent is fixed position?
          var isFixed = origin.css('position') === 'fixed';
          if (!isFixed) {
            var parents = origin.parents();
            for (var i = 0; i < parents.length; i++) {
              isFixed = $(parents[i]).css('position') == 'fixed';
              if (isFixed) {
                break;
              }
            }
          }

          // Calculating origin
          var originWidth = origin.outerWidth();
          var originHeight = origin.outerHeight();
          var originTop = isFixed ? origin.offset().top - $(document).scrollTop() : origin.offset().top;
          var originLeft = isFixed ? origin.offset().left - $(document).scrollLeft() : origin.offset().left;

          // Calculating screen
          var windowWidth = $(window).width();
          var windowHeight = $(window).height();
          var centerX = windowWidth / 2;
          var centerY = windowHeight / 2;
          var isLeft = originLeft <= centerX;
          var isRight = originLeft > centerX;
          var isTop = originTop <= centerY;
          var isBottom = originTop > centerY;
          var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
          var isCenterY = originTop >= windowHeight * 0.25 && originTop <= windowHeight * 0.75;

          // Calculating tap target
          var tapTargetWidth = tapTargetEl.outerWidth();
          var tapTargetHeight = tapTargetEl.outerHeight();
          var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
          var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
          var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

          // Calculating content
          var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
          var tapTargetTextHeight = tapTargetHeight / 2;
          var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
          var tapTargetTextBottom = 0;
          var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
          var tapTargetTextRight = 0;
          var tapTargetTextPadding = originWidth;
          var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

          // Calculating wave
          var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
          var tapTargetWaveHeight = tapTargetWaveWidth;
          var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
          var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

          // Setting tap target
          var tapTargetWrapperCssObj = {};
          tapTargetWrapperCssObj.top = isTop ? tapTargetTop : '';
          tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth : '';
          tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight : '';
          tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft : '';
          tapTargetWrapperCssObj.position = tapTargetPosition;
          tapTargetWrapper.css(tapTargetWrapperCssObj);

          // Setting content
          tapTargetContentEl.css({
            width: tapTargetTextWidth,
            height: tapTargetTextHeight,
            top: tapTargetTextTop,
            right: tapTargetTextRight,
            bottom: tapTargetTextBottom,
            left: tapTargetTextLeft,
            padding: tapTargetTextPadding,
            verticalAlign: tapTargetTextAlign
          });

          // Setting wave
          tapTargetWave.css({
            top: tapTargetWaveTop,
            left: tapTargetWaveLeft,
            width: tapTargetWaveWidth,
            height: tapTargetWaveHeight
          });
        };

        if (options == 'open') {
          calculateTapTarget();
          openTapTarget();
        }

        if (options == 'close') closeTapTarget();
      });
    },
    open: function () {},
    close: function () {}
  };

  $.fn.tapTarget = function (methodOrOptions) {
    if (methods[methodOrOptions] || typeof methodOrOptions === 'object') return methods.init.apply(this, arguments);

    $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tap-target');
  };
})(jQuery);

;
if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("default");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("default")});


/**
 * Default gallery theme
 */
function UGTheme_default(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_objButtonFullscreen, g_objButtonPlay, g_objButtonHidePanel;
	var g_objSlider, g_objPanel, g_objStripPanel, g_objTextPanel;
	var g_functions = new UGFunctions();
	
	//theme options
	var g_options = {
			theme_load_slider:true,					//this option for debugging only
			theme_load_panel:true,					//this option for debugging only
				
			theme_enable_fullscreen_button: true,	//show, hide the theme fullscreen button. The position in the theme is constant
			theme_enable_play_button: true,			//show, hide the theme play button. The position in the theme is constant
			theme_enable_hidepanel_button: true,	//show, hide the hidepanel button
			theme_enable_text_panel: true,			//enable the panel text panel. 
			
			theme_text_padding_left: 20,			//left padding of the text in the textpanel
			theme_text_padding_right: 5,			//right paddin of the text in the textpanel
			theme_text_align: "left",				//left, center, right - the align of the text in the textpanel
			theme_text_type: "description",			//title, description, both - text that will be shown on the text panel, title or description or both
			
			theme_hide_panel_under_width: 480		//hide panel under certain browser width, if null, don't hide
	};
	
	
	//default item options:
	var g_defaults = {
		
		//slider options:
		slider_controls_always_on: true,
		slider_zoompanel_align_vert: "top",
		slider_zoompanel_offset_vert: 12,
		
		//textpanel options: 
		slider_textpanel_padding_top: 0,
		slider_textpanel_enable_title: false,
		slider_textpanel_enable_description: true,
		slider_vertical_scroll_ondrag: true,
		
		//strippanel options
		strippanel_background_color:"#232323",
		strippanel_padding_top:10
	};
	
		
	//options that could not be changed by user
	var g_mustOptions = {
		
		slider_enable_text_panel: false,
		slider_enable_play_button:false,
		slider_enable_fullscreen_button: false,
		
		//text panel options
		slider_enable_text_panel: false,		
		slider_textpanel_height: 50,
		slider_textpanel_align:"top",
	};
	
	
	var g_temp = {
		isPanelHidden: false
	};
	
	
	/**
	 * init the theme
	 */
	function initTheme(gallery, customOptions){
		
		g_gallery = gallery;
		
		g_options = jQuery.extend(g_options, g_defaults);
		g_options = jQuery.extend(g_options, customOptions);
		g_options = jQuery.extend(g_options, g_mustOptions);
		
		modifyOptions();
		
		//set gallery options
		g_gallery.setOptions(g_options);
		
		//include gallery elements
		if(g_options.theme_load_panel == true){
			g_objStripPanel = new UGStripPanel();
			g_objStripPanel.init(gallery, g_options);
		}
		
		if(g_options.theme_load_slider == true)
			g_gallery.initSlider(g_options);
		
		g_objects = gallery.getObjects();
				
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;
		
		if(g_options.theme_load_slider == true)
			g_objSlider = g_objects.g_objSlider;
		
		//init text panel
		if(g_options.theme_enable_text_panel == true){
			g_objTextPanel = new UGTextPanel();
			g_objTextPanel.init(g_gallery, g_options, "slider");
		}
		
	}
	
	
	/**
	 * run the theme
	 */
	function runTheme(){
		
		setHtml();
		
		initAndPlaceElements();
				
		initEvents();
	}
	
	
	/**
	 * modify some options before implimenting
	 */
	function modifyOptions(){
		
		var moreOptions = {
				slider_textpanel_css_title:{},						//additional css of the title
				slider_textpanel_css_description:{}					//additional css of the description
		};
		
		g_options = jQuery.extend(moreOptions, g_options);
		
		g_options.slider_textpanel_css_title["text-align"] = g_options.theme_text_align;
		g_options.slider_textpanel_css_description["text-align"] = g_options.theme_text_align;
		
		switch(g_options.theme_text_type){
			case "title":
				g_options.slider_textpanel_enable_title = true;
				g_options.slider_textpanel_enable_description = false;				
			break;
			case "both":
				g_options.slider_textpanel_enable_title = true;
				g_options.slider_textpanel_enable_description = true;
			break;
			default:
			case "description":		//the description is the default
		}
				
	}
	

	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-default");
		
		var htmlAdd = "";
		
		//add panel
		htmlAdd += "<div class='ug-theme-panel'>";
		
		var classButtonFullscreen = 'ug-default-button-fullscreen';
		var classButtonPlay = 'ug-default-button-play';
		var classCaptureButtonFullscreen = '.ug-default-button-fullscreen';
		var classCaptureButtonPlay = '.ug-default-button-play';
		
		
		if(!g_objTextPanel){	//take the buttons from default theme
			classButtonFullscreen = 'ug-default-button-fullscreen-single';
			classButtonPlay = 'ug-default-button-play-single';
			classCaptureButtonFullscreen = '.ug-default-button-fullscreen-single';
			classCaptureButtonPlay = '.ug-default-button-play-single';
		}
		
		//add fullscreen button to the panel
		if(g_options.theme_enable_fullscreen_button == true)
			htmlAdd += "<div class='"+classButtonFullscreen+"'></div>";
		
		//add play button to the panel
		if(g_options.theme_enable_play_button == true)
			htmlAdd += "<div class='"+classButtonPlay+"'></div>";
		
		//add hide panel button
		if(g_options.theme_enable_hidepanel_button)
			htmlAdd += "<div class='ug-default-button-hidepanel'><div class='ug-default-button-hidepanel-bg'></div> <div class='ug-default-button-hidepanel-tip'></div></div>";
		
		htmlAdd += "</div>";
		
		g_objWrapper.append(htmlAdd);
		
		//set elements
		g_objPanel = g_objWrapper.children(".ug-theme-panel");
		
		if(g_options.theme_enable_fullscreen_button == true)
			g_objButtonFullscreen = g_objPanel.children(classCaptureButtonFullscreen);
		
		if(g_options.theme_enable_play_button == true)
			g_objButtonPlay = g_objPanel.children(classCaptureButtonPlay);

		if(g_options.theme_enable_hidepanel_button == true)
			g_objButtonHidePanel = g_objPanel.children(".ug-default-button-hidepanel");
		
		//set html strip panel to the panel
		g_objStripPanel.setHtml(g_objPanel);
		
		//set text panel html to the panel
		if(g_objTextPanel)
			g_objTextPanel.appendHTML(g_objPanel);
		
		//set slider html
		if(g_objSlider)
			g_objSlider.setHtml();
		
	}
	
	
	/**
	 * init all the theme's elements and set them to their places 
	 * according gallery's dimentions.
	 * this function should work on resize too.
	 */
	function initAndPlaceElements(){
		
		//create and place thumbs panel:
		if(g_options.theme_load_panel){
			initPanel();
			placePanel();
		}
		
		//place the slider
		if(g_objSlider){	
			placeSlider();
			g_objSlider.run();
		}
		
	}
	
	
	/**
	 * init size of the thumbs panel
	 */
	function initPanel(){
		
		var objGallerySize = g_gallery.getSize();
		var galleryWidth = objGallerySize.width;	
		
		//init srip panel width
		g_objStripPanel.setOrientation("bottom");
		g_objStripPanel.setWidth(galleryWidth);
		g_objStripPanel.run();
		
		//set panel size
		var objStripPanelSize = g_objStripPanel.getSize();		
		var panelHeight = objStripPanelSize.height;
		
		if(g_objTextPanel){
			panelHeight += g_mustOptions.slider_textpanel_height;
			
			if(g_objButtonHidePanel){
				var hideButtonHeight = g_objButtonHidePanel.outerHeight();
				panelHeight += hideButtonHeight;
			}		
		}
		else{	
			var maxButtonsHeight = 0;
			
			if(g_objButtonHidePanel)
				maxButtonsHeight = Math.max(g_objButtonHidePanel.outerHeight(), maxButtonsHeight);
			
			if(g_objButtonFullscreen)
				maxButtonsHeight = Math.max(g_objButtonFullscreen.outerHeight(), maxButtonsHeight);
			
			if(g_objButtonPlay)
				maxButtonsHeight = Math.max(g_objButtonPlay.outerHeight(), maxButtonsHeight);
			
			panelHeight += maxButtonsHeight;
		
		}
		
		g_functions.setElementSize(g_objPanel, galleryWidth, panelHeight);
		
		//position strip panel
		var stripPanelElement = g_objStripPanel.getElement();
			g_functions.placeElement(stripPanelElement, "left", "bottom");
		
		//init hide panel button
		if(g_objButtonHidePanel){
			var buttonTip = g_objButtonHidePanel.children(".ug-default-button-hidepanel-tip");
			g_functions.placeElement(buttonTip, "center", "middle");
			
			//set opacity and bg color from the text panel			
			if(g_objTextPanel){				
				var objHideButtonBG = g_objButtonHidePanel.children(".ug-default-button-hidepanel-bg");
				
				var hidePanelOpacity = g_objTextPanel.getOption("textpanel_bg_opacity");				
				objHideButtonBG.fadeTo(0, hidePanelOpacity);

				var bgColor = g_objTextPanel.getOption("textpanel_bg_color");				
				objHideButtonBG.css({"background-color":bgColor});
			}
			
		}
		
		//position buttons on the text panel:
		var paddingPlayButton = 0;
		var panelButtonsOffsetY = 0;
		if(g_objButtonHidePanel){
			panelButtonsOffsetY = hideButtonHeight;
		}
		
		if(g_objButtonFullscreen){
			g_functions.placeElement(g_objButtonFullscreen, "right", "top",0 , panelButtonsOffsetY);
			paddingPlayButton = g_objButtonFullscreen.outerWidth();
		}
		
		if(g_objButtonPlay){
			var buttonPlayOffsetY = panelButtonsOffsetY;
			if(!g_objTextPanel)
				buttonPlayOffsetY++; 
				
			g_functions.placeElement(g_objButtonPlay, "right", "top", paddingPlayButton, buttonPlayOffsetY);			
			paddingPlayButton += g_objButtonPlay.outerWidth();
		}
		
		//run the text panel
		if(g_objTextPanel){
			
			var textPanelOptions = {};
			textPanelOptions.slider_textpanel_padding_right = g_options.theme_text_padding_right + paddingPlayButton;
			textPanelOptions.slider_textpanel_padding_left = g_options.theme_text_padding_left;					
			
			if(g_objButtonHidePanel){
				textPanelOptions.slider_textpanel_margin = hideButtonHeight;
			}
			
			g_objTextPanel.setOptions(textPanelOptions);
			
			g_objTextPanel.positionPanel();			
			g_objTextPanel.run();
		}
		
		//place hide panel button
		if(g_objButtonHidePanel){
						
			if(g_objTextPanel)		//place at the beginning of hte panel
				g_functions.placeElement(g_objButtonHidePanel,"left", "top");
			
			else{		//place above the strip panel
				var stripPanelHeight = stripPanelElement.outerHeight();
				g_functions.placeElement(g_objButtonHidePanel,"left", "bottom", 0, stripPanelHeight);
			}
		}
		
	}
	
	
	/**
	 * place thumbs panel according the settings
	 */
	function placePanel(){
		
		if(g_temp.isPanelHidden || isPanelNeedToHide() == true){
			
			//place panel hidden			
			var newPanelPosY = getHiddenPanelPosition();
			g_functions.placeElement(g_objPanel, 0, newPanelPosY);
			g_temp.isPanelHidden = true;
		
		}else		//place panel normal
			g_functions.placeElement(g_objPanel, 0, "bottom");
	
		
	} 
	
	
	/**
	 * place the slider according the thumbs panel size and position
	 */
	function placeSlider(){
		
		 var sliderTop = 0;
		 var sliderLeft = 0;
		 var galleryHeight = g_gallery.getHeight();
		 var sliderHeight = galleryHeight;
		 
		 if(g_objStripPanel && isPanelHidden() == false){
			 var panelSize = g_objStripPanel.getSize();
			 sliderHeight = galleryHeight - panelSize.height;
		 }
		 
		 var sliderWidth = g_gallery.getWidth();
		 
		 //set parent container the panel
		 g_objSlider.setSize(sliderWidth, sliderHeight);
		 g_objSlider.setPosition(sliderLeft, sliderTop);		
	}
	
	
	/**
	 * check if need to hide the panel according the options.
	 */
	function isPanelNeedToHide(){
		
		if(!g_options.theme_hide_panel_under_width)
			return(false);
		
		var windowWidth = jQuery(window).width();
		var hidePanelValue = g_options.theme_hide_panel_under_width;
		
		if(windowWidth <= hidePanelValue)
			return(true);
			
		return(false);
	}
	
	/**
	 * check if need to hide or show panel according the theme_hide_panel_under_width option
	 */
	function checkHidePanel(){
		
		//check hide panel:
		if(!g_options.theme_hide_panel_under_width)
			return(false);
		
			var needToHide = isPanelNeedToHide();
			
			if(needToHide == true)
				hidePanel(true);
			else
				showPanel(true);
	}
	
	
	/**
	 * on gallery size change - resize the theme.
	 */
	function onSizeChange(){
		
		initAndPlaceElements();
		
		checkHidePanel();
	}
	
	
	/**
	 * get if the panel is hidden
	 */
	function isPanelHidden(){
		
		return(g_temp.isPanelHidden);
	}
	
	
	/**
	 * place panel with some animation
	 */
	function placePanelAnimation(panelY, functionOnComplete){
		
		var objCss  = {top: panelY + "px"};
		
		g_objPanel.stop(true).animate(objCss ,{
			duration: 300,
			easing: "easeInOutQuad",
			queue: false,
			complete: function(){
				if(functionOnComplete)
					functionOnComplete();
			}
		});
		
	}

	
	/**
	 * get position of the hidden panel
	 */
	function getHiddenPanelPosition(){
		
		var galleryHeight = g_objWrapper.height();
		var newPanelPosY = galleryHeight;
		if(g_objButtonHidePanel){
			var objButtonSize = g_functions.getElementSize(g_objButtonHidePanel);
			newPanelPosY -= objButtonSize.bottom;
		}
		
		return(newPanelPosY);
	}
	
	
	/**
	 * hide the panel
	 */
	function hidePanel(noAnimation){
		
		if(!noAnimation)
			var noAnimation = false;
		
		if(isPanelHidden() == true)
			return(false);
				
		var newPanelPosY = getHiddenPanelPosition();
		
		if(noAnimation == true)
			g_functions.placeElement(g_objPanel, 0, newPanelPosY);
		else
			placePanelAnimation(newPanelPosY, placeSlider); 
		
		if(g_objButtonHidePanel)
			g_objButtonHidePanel.addClass("ug-button-hidden-mode");
		
		g_temp.isPanelHidden = true;
		
	}
	
	
	/**
	 * show the panel
	 */
	function showPanel(noAnimation){
		
		if(!noAnimation)
			var noAnimation = false;
		
		if(isPanelHidden() == false)
			return(false);
		
		var galleryHeight = g_objWrapper.height();
		var panelHeight = g_objPanel.outerHeight();
		
		var newPanelPosY = galleryHeight - panelHeight;
		
		if(noAnimation == true)
			g_functions.placeElement(g_objPanel, 0, newPanelPosY);
		else
			placePanelAnimation(newPanelPosY, placeSlider);
		
		if(g_objButtonHidePanel)
			g_objButtonHidePanel.removeClass("ug-button-hidden-mode");
		
		g_temp.isPanelHidden = false;
	}
	
	
	/**
	 * on hide panel click
	 */
	function onHidePanelClick(event){
		
		event.stopPropagation();
		event.stopImmediatePropagation();
		
		if(g_functions.validateClickTouchstartEvent(event.type) == false)
			return(true);
		
		if(isPanelHidden() == true)
			showPanel();
		else
			hidePanel();
	}

	/**
	 * before items request: hide items, show preloader
	 */
	function onBeforeReqestItems(){
	
		g_gallery.showDisabledOverlay();
	
	}
	
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
						
		g_objGallery.on(g_gallery.events.SIZE_CHANGE,onSizeChange);
		g_objGallery.on(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS, onBeforeReqestItems);
		
		//set the panel buttons
		if(g_objButtonPlay){
			g_functions.addClassOnHover(g_objButtonPlay, "ug-button-hover");
			g_gallery.setPlayButton(g_objButtonPlay);
		}
		
		//init fullscreen button
		if(g_objButtonFullscreen){
			g_functions.addClassOnHover(g_objButtonFullscreen, "ug-button-hover");
			g_gallery.setFullScreenToggleButton(g_objButtonFullscreen);
		}
		
		//init hide panel button
		if(g_objButtonHidePanel){
			g_functions.setButtonMobileReady(g_objButtonHidePanel);
			g_functions.addClassOnHover(g_objButtonHidePanel, "ug-button-hover");
			g_objButtonHidePanel.on("click touchstart", onHidePanelClick);
		}
		
		//on gallery media player events, bring the element to front
		g_objGallery.on(g_gallery.events.SLIDER_ACTION_START, function(){
			
			//set slider to front
			g_objPanel.css("z-index","1");
			g_objSlider.getElement().css("z-index","11");
		});
		
		g_objGallery.on(g_gallery.events.SLIDER_ACTION_END, function(){
			
			//set the panel to front
			g_objPanel.css("z-index","11");
			g_objSlider.getElement().css("z-index","1");
		});
		
	}
	
	/**
	 * destroy the gallery events and objects
	 */
	this.destroy = function(){
		
		g_objGallery.off(g_gallery.events.SIZE_CHANGE);
		g_objGallery.off(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS);
		
		//set the panel buttons
		if(g_objButtonPlay)
			g_gallery.destroyPlayButton(g_objButtonPlay);
		
		//init fullscreen button
		if(g_objButtonFullscreen)
			g_gallery.destroyFullscreenButton(g_objButtonFullscreen);
			
		//init hide panel button
		if(g_objButtonHidePanel)
			g_functions.destroyButton(g_objButtonHidePanel);
		
		g_objGallery.off(g_gallery.events.SLIDER_ACTION_START);
		g_objGallery.off(g_gallery.events.SLIDER_ACTION_END);
		
		if(g_objSlider)
			g_objSlider.destroy();
		
		if(g_objStripPanel)
			g_objStripPanel.destroy();
		
		if(g_objTextPanel)
			g_objTextPanel.destroy();
		
	}
	
	
	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		runTheme();
	}
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
		initTheme(gallery, customOptions);
	}
	
}

;// Unite Gallery, Version: 1.7.45, released 27 Feb 2017 

function debugLine(e,t,i){e===!0&&(e="true"),e===!1&&(e="false");var n=e;if("object"==typeof e){n="";for(name in e){var r=e[name];n+=" "+name+": "+r}}if(1!=t||i||(n+=" "+Math.random()),1==i){var o=jQuery("#debug_line");o.width(200),o.height()>=500&&o.html("");var a=o.html();n=a+"<br> -------------- <br>"+n}jQuery("#debug_line").show().html(n)}function debugSide(e){var t="";for(name in e){var i=e[name];t+=name+" : "+i+"<br>"}jQuery("#debug_side").show().html(t)}function trace(e){"undefined"!=typeof console&&console.log(e)}function UGFunctions(){function e(e,t,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent?t.attachEvent("on"+e,i):t[e]=i}var t=null,i=this,n={starTime:0,arrThemes:[],isTouchDevice:-1,isRgbaSupported:-1,timeCache:{},dataCache:{},lastEventType:"",lastEventTime:0,lastTouchStartElement:null,touchThreshold:700,handle:null};this.debugVar="",this.z__________FULL_SCREEN___________=function(){},this.toFullscreen=function(e,t){if(e.requestFullscreen)e.requestFullscreen();else if(e.mozRequestFullScreen)e.mozRequestFullScreen();else if(e.webkitRequestFullscreen)e.webkitRequestFullscreen();else{if(!e.msRequestFullscreen)return!1;e.msRequestFullscreen()}return!0},this.exitFullscreen=function(){if(0==i.isFullScreen())return!1;if(document.exitFullscreen)document.exitFullscreen();else if(document.cancelFullScreen)document.cancelFullScreen();else if(document.mozCancelFullScreen)document.mozCancelFullScreen();else if(document.webkitExitFullscreen)document.webkitExitFullscreen();else{if(!document.msExitFullscreen)return!1;document.msExitFullscreen()}return!0},this.addFullScreenChangeEvent=function(t){document.webkitCancelFullScreen?e("webkitfullscreenchange",document,t):document.msExitFullscreen?e("MSFullscreenChange",document,t):document.mozCancelFullScreen?e("mozfullscreenchange",document,t):e("fullscreenchange",document,t)},this.destroyFullScreenChangeEvent=function(){jQuery(document).unbind("fullscreenChange"),jQuery(document).unbind("mozfullscreenchange"),jQuery(document).unbind("webkitfullscreenchange"),jQuery(document).unbind("MSFullscreenChange")},this.getFullScreenElement=function(){var e=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;return e},this.isFullScreen=function(){var e=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen||document.msFullscreenElement;return e=e?!0:!1},this.z__________GET_PROPS___________=function(){},this.getBrowserPrefix=function(){if(null!==t)return t;var e=["webkit","Moz","ms","O"],i=document.createElement("div");for(var n in e){var r=e[n];if(r+"Transform"in i.style)return r=r.toLowerCase(),t=r,r}return t="",""},this.getImageInsideParentDataByImage=function(e,t,n){var r=e.parent(),o=i.getImageOriginalSize(e),a=i.getImageInsideParentData(r,o.width,o.height,t,n);return a},this.getImageInsideParentData=function(e,t,i,n,r,o,a){if(!r)var r={};var s={};if("undefined"==typeof o)var o=e.width();if("undefined"==typeof a)var a=e.height();r.padding_left&&(o-=r.padding_left),r.padding_right&&(o-=r.padding_right),r.padding_top&&(a-=r.padding_top),r.padding_bottom&&(a-=r.padding_bottom);var l=null,u="100%",d=null,_=null,g="display:block;margin:0px auto;";if(t>0&&i>0){if("down"==n&&o>t&&a>i)u=i,l=t,_=(o-l)/2,d=(a-u)/2;else if("fill"==n){var c=t/i;u=a,l=u*c,o>l?(l=o,u=l/c,_=0,d=Math.round((u-a)/2*-1)):(d=0,_=Math.round((l-o)/2*-1))}else{var c=t/i;u=a,l=u*c,d=0,_=(o-l)/2,"fitvert"!=n&&l>o&&(l=o,u=l/c,_=0,d=(a-u)/2)}l=Math.floor(l),u=Math.floor(u),d=Math.floor(d),_=Math.floor(_),g="position:absolute;"}return r.padding_top&&(d+=r.padding_top),r.padding_left&&(_+=r.padding_left),s.imageWidth=l,s.imageHeight=u,s.imageTop=d,s.imageLeft=_,s.imageRight=_+l,0==d||"100%"==u?s.imageBottom=null:s.imageBottom=d+u,s.style=g,s},this.getElementCenterPosition=function(e,t){var n=e.parent(),r=i.getElementSize(e),o=i.getElementSize(n),a=o.width,s=o.height;t&&void 0!==t.padding_top&&(s-=t.padding_top),t&&void 0!==t.padding_bottom&&(s-=t.padding_bottom),t&&void 0!==t.padding_left&&(a-=t.padding_left),t&&void 0!==t.padding_right&&(a-=t.padding_right);var l={};return l.left=Math.round((a-r.width)/2),l.top=Math.round((s-r.height)/2),t&&void 0!==t.padding_top&&(l.top+=t.padding_top),t&&void 0!==t.padding_left&&(l.left+=t.padding_left),l},this.getElementCenterPoint=function(e,t){if(!t)var t=!1;var n=i.getElementSize(e),r={};return r.x=n.width/2,r.y=n.height/2,1==t&&(r.x+=n.left,r.y+=n.top),r.x=Math.round(r.x),r.y=Math.round(r.y),r},this.getMousePosition=function(e,t){var i={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY};if(e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0&&(i.pageX=e.originalEvent.touches[0].pageX,i.pageY=e.originalEvent.touches[0].pageY,i.clientX=e.originalEvent.touches[0].clientX,i.clientY=e.originalEvent.touches[0].clientY),t){var n=t.offset();i.mouseX=i.pageX-n.left,i.mouseY=i.pageY-n.top}return i},this.getMouseElementPoint=function(e,t){var n={x:e.pageX,y:e.pageY},r=i.getElementLocalPoint(n,t);return r},this.getElementLocalPoint=function(e,t){var i={},n=t.offset();return i.x=Math.round(e.x-n.left),i.y=Math.round(e.y-n.top),i},this.getImageOriginalSize=function(e,t,i){if("undefined"!=typeof t&&"undefined"!=typeof i)return{width:t,height:i};var n=e[0];if("undefined"==typeof n)throw new Error("getImageOriginalSize error - Image not found");var r={};if("undefined"==typeof n.naturalWidth){if("number"==typeof e.data("naturalWidth")){var r={};return r.width=e.data("naturalWidth"),r.height=e.data("naturalHeight"),r}var o=new Image;return o.src=n.src,o.complete?(r.width=o.width,r.height=o.height,e.data("naturalWidth",r.width),e.data("naturalHeight",r.height),r):{width:0,height:0}}return r.width=n.naturalWidth,r.height=n.naturalHeight,r},this.getimageRatio=function(e){var t=i.getImageOriginalSize(e),n=i.getElementSize(e),r=n.width/t.width;return r},this.isImageFitParent=function(e){var t=e.parent(),n=i.getElementSize(e),r=i.getElementSize(t);return n.width<=r.width&&n.height<=r.height?!0:!1},this.getElementSize=function(e){if(void 0===e)throw new Error("Can't get size, empty element");var t=e.position();return t.height=e.outerHeight(),t.width=e.outerWidth(),t.left=Math.round(t.left),t.top=Math.round(t.top),t.right=t.left+t.width,t.bottom=t.top+t.height,t},this.isElementBiggerThenParent=function(e){var t=e.parent(),n=i.getElementSize(e),r=i.getElementSize(t);return n.width>r.width||n.height>r.height?!0:!1},this.isPointInsideElement=function(e,t){var i=e.x>=0&&e.x<t.width;if(0==i)return!1;var n=e.y>=0&&e.y<t.height;return 0==n?!1:!0},this.getElementRelativePos=function(e,t,n,r){if(!r)var r=e.parent();if("number"==typeof e)var o={width:e,height:e};else var o=i.getElementSize(e);var a=i.getElementSize(r);switch(t){case"top":case"left":t=0,n&&(t+=n);break;case"center":t=Math.round((a.width-o.width)/2),n&&(t+=n);break;case"right":t=a.width-o.width,n&&(t-=n);break;case"middle":t=Math.round((a.height-o.height)/2),n&&(t+=n);break;case"bottom":t=a.height-o.height,n&&(t-=n)}return t},this.z_________SET_ELEMENT_PROPS_______=function(){},this.zoomImageInsideParent=function(e,t,n,r,o,a,s){if(!n)var n=1.2;if(!o)var o="fit";var l,u,d,_,g=n,c=e.parent(),h=i.getElementSize(e),p=i.getImageOriginalSize(e),f=!1,m=0,v=0,b=0,y=0;if(r){var I=i.getMouseElementPoint(r,e);f=i.isPointInsideElement(I,h),b=I.x,y=I.y}else f=!1;if(0==f){var w=i.getElementCenterPoint(e);b=w.x,y=w.y}if(1==t)l=h.height*g,u=h.width*g,0!=b&&(m=-(b*g-b)),0!=y&&(v=-(y*g-y));else{l=h.height/g,u=h.width/g;var E=i.getImageInsideParentData(c,p.width,p.height,o,s);if(u<E.imageWidth)return i.scaleImageFitParent(e,p.width,p.height,o,s),!0;1==f&&(0!=b&&(m=-(b/g-b)),0!=y&&(v=-(y/g-y)))}if(a){var T=1;if(0!=p.width&&(T=u/p.width),T>a)return!1}if(i.setElementSize(e,u,l),0==t&&0==f){var S=i.getElementCenterPosition(e);d=S.left,_=S.top}else d=h.left+m,_=h.top+v;return i.placeElement(e,d,_),!0},this.placeElement=function(e,t,n,r,o,a){if(0==jQuery.isNumeric(t)||0==jQuery.isNumeric(n)){if(!a)var a=e.parent();var s=i.getElementSize(e),l=i.getElementSize(a)}if(0==jQuery.isNumeric(t))switch(t){case"left":t=0,r&&(t+=r);break;case"center":t=Math.round((l.width-s.width)/2),r&&(t+=r);break;case"right":t=l.width-s.width,r&&(t-=r)}if(0==jQuery.isNumeric(n))switch(n){case"top":n=0,o&&(n+=o);break;case"middle":case"center":n=Math.round((l.height-s.height)/2),o&&(n+=o);break;case"bottom":n=l.height-s.height,o&&(n-=o)}var u={position:"absolute",margin:"0px"};null!==t&&(u.left=t),null!==n&&(u.top=n),e.css(u)},this.placeElementInParentCenter=function(e){i.placeElement(e,"center","middle")},this.setElementSizeAndPosition=function(e,t,i,n,r){var o={width:n+"px",height:r+"px",left:t+"px",top:i+"px",position:"absolute",margin:"0px"};e.css(o)},this.setElementSize=function(e,t,i){var n={width:t+"px"};null!==i&&"undefined"!=typeof i&&(n.height=i+"px"),e.css(n)},this.cloneElementSizeAndPos=function(e,t,n,r,o){var a=e.position();if(void 0==a)throw new Error("Can't get size, empty element");n===!0?(a.height=e.outerHeight(),a.width=e.outerWidth()):(a.height=e.height(),a.width=e.width()),a.left=Math.round(a.left),a.top=Math.round(a.top),r&&(a.left+=r),o&&(a.top+=o),i.setElementSizeAndPosition(t,a.left,a.top,a.width,a.height)},this.placeImageInsideParent=function(e,t,n,r,o,a){var s=i.getImageInsideParentData(t,n,r,o,a),l="<img";null!==s.imageWidth&&(l+=" width = '"+s.imageWidth+"'",s.style+="width:"+s.imageWidth+";"),null!=s.imageHeight&&("100%"==s.imageHeight?(l+=" height = '"+s.imageHeight+"'",s.style+="height:"+s.imageHeight+";"):(l+=" height = '"+s.imageHeight+"'",s.style+="height:"+s.imageHeight+"px;")),null!==s.imageTop&&(s.style+="top:"+s.imageTop+"px;"),null!==s.imageLeft&&(s.style+="left:"+s.imageLeft+"px;"),e=i.escapeDoubleSlash(e),l+=" style='"+s.style+"'",l+=' src="'+e+'"',l+=">",t.html(l);var u=t.children("img");return u},this.scaleImageCoverParent=function(e,t,n){if("number"==typeof t)var r=t,o=n;else var r=t.outerWidth(),o=t.outerHeight();var a=i.getImageOriginalSize(e),s=a.width,l=a.height,u=s/l,d=o,_=d*u,g=0,c=0;r>_?(_=r,d=_/u,c=0,g=Math.round((d-o)/2*-1)):(g=0,c=Math.round((_-r)/2*-1)),_=Math.round(_),d=Math.round(d),e.css({width:_+"px",height:d+"px",left:c+"px",top:g+"px"})},this.scaleImageFitParent=function(e,t,n,r,o){var a=e.parent(),s=i.getImageInsideParentData(a,t,n,r,o),l=!1,u={};return null!==s.imageWidth&&(l=!0,e.removeAttr("width"),u.width=s.imageWidth+"px"),null!=s.imageHeight&&(l=!0,e.removeAttr("height"),u.height=s.imageHeight+"px"),null!==s.imageTop&&(l=!0,u.top=s.imageTop+"px"),null!==s.imageLeft&&(l=!0,u.left=s.imageLeft+"px"),1==l&&(u.position="absolute",u.margin="0px 0px",e.css(u)),s},this.scaleImageByHeight=function(e,t,n,r){var o=i.getImageOriginalSize(e,n,r),a=o.width/o.height,s=Math.round(t*a);t=Math.round(t),i.setElementSize(e,s,t)},this.scaleImageByWidth=function(e,t,n,r){var o=i.getImageOriginalSize(e,n,r),a=o.width/o.height,s=Math.round(t/a);t=Math.round(t),i.setElementSize(e,t,s)},this.scaleImageExactSizeInParent=function(e,t,n,r,o,a){var s=e.parent(),l=i.getElementSize(s);l.width<r&&(r=l.width),l.height<o&&(o=l.height);var u=i.getImageInsideParentData(null,t,n,a,null,r,o),d=r,_=o,g=u.imageLeft,c=u.imageLeft,h=u.imageTop,p=u.imageTop,f=Math.round((l.width-r)/2),m=Math.round((l.height-o)/2),v=u.imageWidth+g+c,b=r-v;0!=b&&(c+=b);var y=u.imageHeight+h+p,b=o-y;0!=b&&(p+=b),e.removeAttr("width"),e.removeAttr("height");var I={position:"absolute",margin:"0px 0px"};I.width=d+"px",I.height=_+"px",I.left=f+"px",I.top=m+"px",I["padding-left"]=g+"px",I["padding-top"]=h+"px",I["padding-right"]=c+"px",I["padding-bottom"]=p+"px",e.css(I);var w={};return w.imageWidth=d,w.imageHeight=_,w},this.showElement=function(e,t,i){e.show().fadeTo(0,1),t&&t.show().fadeTo(0,1),i&&i.show().fadeTo(0,1)},this.z_________GALLERY_RELATED_FUNCTIONS_______=function(){},this.disableButton=function(e,t){if(!t)var t="ug-button-disabled";0==i.isButtonDisabled(e,t)&&e.addClass(t)},this.convertCustomPrefixOptions=function(e,t,i){if(!t)return e;var n={};return jQuery.each(e,function(e,r){if(0===e.indexOf(t+"_"+i+"_")){var o=e.replace(t+"_"+i+"_",i+"_");n[o]=r}else n[e]=r}),n},this.enableButton=function(e,t){if(!t)var t="ug-button-disabled";1==i.isButtonDisabled(e,t)&&e.removeClass(t)},this.isButtonDisabled=function(e,t){if(!t)var t="ug-button-disabled";return e.hasClass(t)?!0:!1},this.z_________MATH_FUNCTIONS_______=function(){},this.normalizeSetting=function(e,t,i,n,r,o){if(!o)var o=!1;var a=(r-i)/(n-i);return r=e+(t-e)*a,1==o&&(e>r&&(r=e),r>t&&(r=t)),r},this.getNormalizedValue=function(e,t,i,n,r){var o=(r-e)/(t-e);return r=e+(n-i)*o},this.getDistance=function(e,t,i,n){var r=Math.round(Math.sqrt(Math.abs((i-e)*(i-e)+(n-t)*(n-t))));return r},this.getMiddlePoint=function(e,t,i,n){var r={};return r.x=e+Math.round((i-e)/2),r.y=t+Math.round((n-t)/2),r},this.getNumItemsInSpace=function(e,t,i){var n=Math.floor((e+i)/(t+i));return n},this.getNumItemsInSpaceRound=function(e,t,i){var n=Math.round((e+i)/(t+i));return n},this.getSpaceByNumItems=function(e,t,i){var n=e*t+(e-1)*i;return n},this.getItemSizeInSpace=function(e,t,i){var n=Math.floor((e-(t-1)*i)/t);return n},this.getColX=function(e,t,i){var n=e*(t+i);return n},this.getColByIndex=function(e,t){var i=t%e;return i},this.getColRowByIndex=function(e,t){var i=Math.floor(e/t),n=Math.floor(e%t);return{col:n,row:i}},this.getIndexByRowCol=function(e,t,i){if(0>e)return-1;if(0>t)return-1;var n=e*i+t;return n},this.getPrevRowSameColIndex=function(e,t){var n=i.getColRowByIndex(e,t),r=i.getIndexByRowCol(n.row-1,n.col,t);return r},this.getNextRowSameColIndex=function(e,t){var n=i.getColRowByIndex(e,t),r=i.getIndexByRowCol(n.row+1,n.col,t);return r},this.z_________DATA_FUNCTIONS_______=function(){},this.setGlobalData=function(e,t){jQuery.data(document.body,e,t)},this.getGlobalData=function(e){var t=jQuery.data(document.body,e);return t},this.z_________EVENT_DATA_FUNCTIONS_______=function(){},this.handleScrollTop=function(e){if(0==i.isTouchDevice())return null;var t=i.getStoredEventData(e),r=15,o=15;if(null===t.scrollDir&&(Math.abs(t.diffMouseX)>r?t.scrollDir="hor":Math.abs(t.diffMouseY)>o&&Math.abs(t.diffMouseY)>Math.abs(t.diffMouseX)&&(t.scrollDir="vert",t.scrollStartY=t.lastMouseClientY,t.scrollOrigin=jQuery(document).scrollTop(),n.dataCache[e].scrollStartY=t.lastMouseClientY,n.dataCache[e].scrollOrigin=t.scrollOrigin),n.dataCache[e].scrollDir=t.scrollDir),"vert"!==t.scrollDir)return t.scrollDir;var a=(jQuery(document).scrollTop(),t.scrollOrigin-(t.lastMouseClientY-t.scrollStartY));return a>=0&&jQuery(document).scrollTop(a),t.scrollDir},this.wasVerticalScroll=function(e){var t=i.getStoredEventData(e);return"vert"===t.scrollDir?!0:!1},this.storeEventData=function(e,t,r){var o=i.getMousePosition(e),a=jQuery.now(),s={startTime:a,lastTime:a,startMouseX:o.pageX,startMouseY:o.pageY,lastMouseX:o.pageX,lastMouseY:o.pageY,startMouseClientY:o.clientY,lastMouseClientY:o.clientY,scrollTop:jQuery(document).scrollTop(),scrollDir:null};r&&(s=jQuery.extend(s,r)),n.dataCache[t]=s},this.updateStoredEventData=function(e,t,r){if(!n.dataCache[t])throw new Error("updateEventData error: must have stored cache object");var o=n.dataCache[t],a=i.getMousePosition(e);o.lastTime=jQuery.now(),void 0!==a.pageX&&(o.lastMouseX=a.pageX,o.lastMouseY=a.pageY,o.lastMouseClientY=a.clientY),r&&(o=jQuery.extend(o,r)),n.dataCache[t]=o},this.getStoredEventData=function(e,t){if(!n.dataCache[e])throw new Error("updateEventData error: must have stored cache object");var i=n.dataCache[e];return i.diffMouseX=i.lastMouseX-i.startMouseX,i.diffMouseY=i.lastMouseY-i.startMouseY,i.diffMouseClientY=i.lastMouseClientY-i.startMouseClientY,i.diffTime=i.lastTime-i.startTime,t===!0?(i.startMousePos=i.lastMouseY,i.lastMousePos=i.lastMouseY,i.diffMousePos=i.diffMouseY):(i.startMousePos=i.lastMouseX,i.lastMousePos=i.lastMouseX,i.diffMousePos=i.diffMouseX),i},this.isApproveStoredEventClick=function(e,t){if(!n.dataCache[e])return!0;var r=i.getStoredEventData(e,t),o=Math.abs(r.diffMousePos);return r.diffTime>400?!1:o>30?!1:!0},this.clearStoredEventData=function(e){n.dataCache[e]=null},this.z_________CHECK_SUPPORT_FUNCTIONS_______=function(){},this.isCanvasExists=function(){var e=jQuery('<canvas width="500" height="500" > </canvas>')[0];return"function"==typeof e.getContext?!0:!1},this.isScrollbarExists=function(){var e=window.innerWidth>document.documentElement.clientWidth;return e},this.isTouchDevice=function(){if(-1!==n.isTouchDevice)return n.isTouchDevice;try{document.createEvent("TouchEvent"),n.isTouchDevice=!0}catch(e){n.isTouchDevice=!1}return n.isTouchDevice},this.isRgbaSupported=function(){if(-1!==n.isRgbaSupported)return n.isRgbaSupported;var e=document.getElementsByTagName("script")[0],t=e.style.color;try{e.style.color="rgba(1,5,13,0.44)"}catch(i){}var r=e.style.color!=t;return e.style.color=t,n.isRgbaSupported=r,r},this.z_________GENERAL_FUNCTIONS_______=function(){},this.checkMinJqueryVersion=function(e){for(var t=jQuery.fn.jquery.split("."),i=e.split("."),n=0,r=t.length;r>n;n++){var o=parseInt(t[n]),a=parseInt(i[n]);if("undefined"==typeof i[n])return!0;if(a>o)return!1;if(o>a)return!0}return!0},this.getCssSizeParam=function(e){return jQuery.isNumeric(e)?e+"px":e},this.convertHexToRGB=function(e,t){var i=e.replace("#","");return i===e?e:(r=parseInt(i.substring(0,2),16),g=parseInt(i.substring(2,4),16),b=parseInt(i.substring(4,6),16),result="rgba("+r+","+g+","+b+","+t+")",result)},this.timestampToString=function(e){var t=new Date(e),i=t.getDate()+"/"+t.getMonth();return i+=" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+":"+t.getMilliseconds()},this.getArrTouches=function(e){var t=[];return e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0&&(t=e.originalEvent.touches),t},this.getArrTouchPositions=function(e){for(var t=[],i=0;i<e.length;i++){var n={pageX:e[i].pageX,pageY:e[i].pageY};t.push(n)}return t},this.startTimeDebug=function(){n.starTime=jQuery.now()},this.showTimeDebug=function(){var e=jQuery.now(),t=e-n.starTime;debugLine({"Time Passed":t},!0)},this.initProgressIndicator=function(e,t,n){switch("bar"!=e&&0==i.isCanvasExists()&&(e="bar"),e){case"bar":var r=new UGProgressBar;r.putHidden(n,t);break;default:case"pie":var r=new UGProgressPie;r.putHidden(n,t);break;case"pie2":t.type_fill=!0;var r=new UGProgressPie;r.putHidden(n,t)}return r},this.setButtonMobileReady=function(e){e.on("touchstart",function(e){jQuery(this).addClass("ug-nohover")}),e.on("mousedown touchend",function(e){return e.stopPropagation(),e.stopImmediatePropagation(),!1})},this.registerTheme=function(e){n.arrThemes.push(e)},this.getArrThemes=function(){return n.arrThemes},this.isThemeRegistered=function(e){return-1!==jQuery.inArray(e,n.arrThemes)?!0:!1},this.getFirstRegisteredTheme=function(){if(0==n.arrThemes.length)return"";var e=n.arrThemes[0];return e},this.isTimePassed=function(e,t){if(!t)var t=100;var i=jQuery.now();0==n.timeCache.hasOwnProperty(e)?lastTime=0:lastTime=n.timeCache[e];var r=i-lastTime;return n.timeCache[e]=i,t>=r?!1:!0},this.whenContiniousEventOver=function(e,t,i){if(!i)var i=300;1==n.timeCache.hasOwnProperty(e)&&null!=n.timeCache[e]&&(clearTimeout(n.timeCache[e]),n.timeCache[e]=null),n.timeCache[e]=setTimeout(t,i)},this.validateClickTouchstartEvent=function(e){var t=!0,i=jQuery.now()-n.lastEventTime;return"click"==e&&"touchstart"==n.lastEventType&&1e3>i&&(t=!1),n.lastEventTime=jQuery.now(),n.lastEventType=e,t},this.addClassOnHover=function(e,t){if(!t)var t="ug-button-hover";e.hover(function(){jQuery(this).addClass(t)},function(){jQuery(this).removeClass(t)})},this.destroyButton=function(e){e.off("mouseenter"),e.off("mouseleave"),e.off("click"),e.off("touchstart"),e.off("touchend"),e.off("mousedown"),e.off("tap")},this.setButtonOnClick=function(e,t){i.setButtonMobileReady(e),e.on("click touchstart",function(e){return objThis=jQuery(this),e.stopPropagation(),e.stopImmediatePropagation(),0==i.validateClickTouchstartEvent(e.type)?!0:void t(objThis,e)})},this.setButtonOnTap=function(e,t){e.on("tap",t),0==i.isTouchDevice()?e.on("click",function(e){var t=jQuery(this);return 0==i.validateClickTouchstartEvent(e.type)?!0:void t.trigger("tap")}):(e.on("touchstart",function(e){var t=jQuery(this);t.addClass("ug-nohover"),n.lastTouchStartElement=jQuery(this),n.lastEventTime=jQuery.now()}),e.on("touchend",function(e){var t=jQuery(this);if(0==t.is(n.lastTouchStartElement))return!0;if(!n.lastEventTime)return!0;var i=jQuery.now()-n.lastEventTime;return i>n.touchThreshold?!0:void t.trigger("tap")}))},this.loadJs=function(e,t){t===!0&&(e=location.protocol+"//"+e);var i=document.createElement("script");i.src=e;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(i,n)},this.loadCss=function(e,t){t===!0&&(e=location.protocol+"//"+e);var i=document.createElement("link");i.setAttribute("rel","stylesheet"),i.setAttribute("type","text/css"),i.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(i)},this.addEvent=function(e,t,i){"undefined"!=typeof e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i)},this.checkImagesLoaded=function(e,t,i){function n(e,n){r++,"function"==typeof i&&setTimeout(function(){i(e,n)}),r==o&&"function"==typeof t&&setTimeout(function(){t()})}var r=0,o=e.length;return 0==o&&t?(t(),!1):void setTimeout(function(){for(var t=0;o>t;t++){var i=e[t];if(void 0!==i.naturalWidth&&0!==i.naturalWidth)n(e[t],!1);else{var r=jQuery("<img/>");r.data("index",t),r.on("load",function(){var t=jQuery(this).data("index");n(e[t],!1)}),r.on("error",function(){var t=jQuery(this).data("index");n(e[t],!0)}),r.attr("src",i.src)}}})},this.waitForWidth=function(e,t){var i=e.width();return 0!=i?(t(),!1):void(n.handle=setInterval(function(){i=e.width(),0!=i&&(clearInterval(n.handle),t())},300))},this.arrayShuffle=function(e){if("object"!=typeof e)return e;for(var t,i,n=e.length;n;t=parseInt(Math.random()*n),i=e[--n],e[n]=e[t],e[t]=i);return e},this.getObjectLength=function(e){var t=0;for(var i in e)t++;return t},this.normalizePercent=function(e){return 0>e&&(e=0),e>1&&(e=1),e},this.stripTags=function(e){var t=e.replace(/(<([^>]+)>)/gi,"");return t},this.escapeDoubleSlash=function(e){return e.replace('"','"')},this.htmlentitles=function(e){var t=jQuery("<div/>").text(e).html();return t},this.z_________END_GENERAL_FUNCTIONS_______=function(){}}function UGThumbsGeneral(){function e(e,t){var i=w[e],n="";0==C.customThumbs&&(n=" ug-thumb-generated");var r=i.index+1,o="style='z-index:"+r+";'",a="<div class='ug-thumb-wrapper"+n+"' "+o+"></div>";if(1==j.thumb_wrapper_as_link){var s=i.link;""==i.link&&(s="javascript:void(0)");var l="";1==j.thumb_link_newpage&&i.link&&(l=" target='_blank'");var a="<a href='"+s+"'"+l+" class='ug-thumb-wrapper"+n+"'></a>"}var u=jQuery(a),d=i.objThumbImage;if(0==C.customThumbs){if(1==j.thumb_show_loader&&d){var _="ug-thumb-loader-dark";"bright"==j.thumb_loader_type&&(_="ug-thumb-loader-bright"),u.append("<div class='ug-thumb-loader "+_+"'></div>"),u.append("<div class='ug-thumb-error' style='display:none'></div>")}if(d){if(d.addClass("ug-thumb-image"),1==j.thumb_image_overlay_effect){var g=d.clone().appendTo(u);g.addClass("ug-thumb-image-overlay "+t).removeClass("ug-thumb-image"),g.fadeTo(0,0),i.objImageOverlay=g}u.append(d)}}return C.isEffectBorder&&u.append("<div class='ug-thumb-border-overlay'></div>"),C.isEffectOverlay&&u.append("<div class='ug-thumb-overlay'></div>"),E.append(u),C.customThumbs&&C.funcSetCustomThumbHtml(u,i),w[e].objThumbWrapper=u,u}function t(e,t,i,n){var r={width:e+"px",height:t+"px"},o={width:e-C.thumbInnerReduce+"px",height:t-C.thumbInnerReduce+"px"},a=".ug-thumb-loader, .ug-thumb-error, .ug-thumb-border-overlay, .ug-thumb-overlay";i?(n!==!0&&i.css(r),i.find(a).css(o)):(E.children(".ug-thumb-wrapper").css(r),E.find(a).css(o))}function i(e,t,i,n){if(!n)var n=!1;P.isFakeFullscreen()&&(n=!0);var r=e.children(".ug-thumb-border-overlay"),o={};o["border-width"]=t+"px",0!=t&&(o["border-color"]=i),n&&n===!0?(r.css(o),0==t?r.hide():r.show()):(0==t?r.stop().fadeOut(j.thumb_transition_duration):r.show().stop().fadeIn(j.thumb_transition_duration),l(r,o))}function n(e,t,i){var n=e.children(".ug-thumb-overlay"),r=j.thumb_transition_duration;i&&i===!0&&(r=0),t?n.stop(!0).fadeTo(r,C.colorOverlayOpacity):n.stop(!0).fadeTo(r,0)}function r(e,t,i){var n=e.children("img.ug-thumb-image"),r=e.children("img.ug-thumb-image-overlay"),o=j.thumb_transition_duration;i&&i===!0&&(o=0),t?r.stop(!0).fadeTo(o,1):(n.fadeTo(0,1),r.stop(!0).fadeTo(o,0))}function o(e,t){if(C.isEffectBorder&&i(e,j.thumb_selected_border_width,j.thumb_selected_border_color,t),C.isEffectOverlay){var o=1==j.thumb_overlay_reverse?!0:!1;n(e,o,t)}C.isEffectImage&&r(e,!1,t),S.trigger(T.events.SETSELECTEDSTYLE,e)}function a(e){var t=T.getItemByThumb(e);return t.isLoaded=!0,t.isThumbImageLoaded=!1,1==C.customThumbs?(S.trigger(T.events.IMAGELOADERROR,e),!0):(e.children(".ug-thumb-loader").hide(),void e.children(".ug-thumb-error").show())}function s(e){if(j.thumb_round_corners_radius<=0)return!1;var t={"border-radius":j.thumb_round_corners_radius+"px"};e?(e.css(t),e.find(".ug-thumb-border-overlay").css(t)):E.find(".ug-thumb-wrapper, .ug-thumb-wrapper .ug-thumb-border-overlay").css(t)}function l(e,t){e.stop(!0).animate(t,{duration:j.thumb_transition_duration,easing:j.thumb_transition_easing,queue:!1})}function u(e){1==c(e)?o(e,!0,"redraw"):T.setThumbNormalStyle(e,!0,"redraw")}function d(e,i,n){if(1==j.thumb_fixed_size)x.scaleImageCoverParent(i,e);else{"height"==j.thumb_resize_by?x.scaleImageByHeight(i,j.thumb_height):x.scaleImageByWidth(i,j.thumb_width);var r=x.getElementSize(i);x.placeElement(i,0,0),t(r.width,r.height,e)}e.children(".ug-thumb-loader").hide(),i.show(),0==j.thumb_image_overlay_effect?i.fadeTo(0,1):(1==j.thumb_image_overlay_effect&&_(i),i.fadeTo(0,0),u(e)),S.trigger(T.events.AFTERPLACEIMAGE,e)}function _(e){var t=e.siblings(".ug-thumb-image-overlay");if(0==t.length)return!1;var i=x.getElementSize(e),n={width:i.width+"px",height:i.height+"px",left:i.left+"px",top:i.top+"px"};t.css(n),0==C.customThumbs&&t.fadeTo(0,1)}function g(){var e="",t=j.thumb_image_overlay_type.split(",");for(var i in t){var n=t[i];switch(n){case"bw":e+=" ug-bw-effect";break;case"blur":e+=" ug-blur-effect";break;case"sepia":e+=" ug-sepia-effect"}}return e}function c(e){return e.hasClass("ug-thumb-selected")?!0:!1}function h(e,i){i=jQuery(i);var n=(T.getItemByThumb(i),x.getElementSize(i));t(n.width,n.height,i,!0),u(i)}function p(e){return 1==C.touchEnabled?(objThumbs.off("mouseenter").off("mouseleave"),!0):void(0==c(e)&&T.setThumbOverStyle(e))}function f(e){return 1==C.touchEnabled?!0:void(0==c(e)&&T.setThumbNormalStyle(e,!1))}function m(e,t){if(!t)var t=!1;var i=jQuery(e),n=i.parents(".ug-thumb-wrapper");return 0==n.parent().length?!1:(objItem=T.getItemByThumb(n),1==objItem.isLoaded&&t===!1?!1:(T.triggerImageLoadedEvent(n,i),void(1==C.customThumbs?S.trigger(T.events.PLACEIMAGE,[n,i]):d(n,i,objItem))))}function v(e,t,i){objItem=T.getItemByThumb(t),objItem.isLoaded=!0,objItem.isThumbImageLoaded=!0;var n=x.getImageOriginalSize(i);objItem.thumbWidth=n.width,objItem.thumbHeight=n.height,objItem.thumbRatioByWidth=n.width/n.height,objItem.thumbRatioByHeight=n.height/n.width,t.addClass("ug-thumb-ratio-set")}var b,y,I,w,E,T=this,S=jQuery(T),P=new UniteGalleryMain,x=new UGFunctions;this.type={GET_THUMBS_ALL:"all",GET_THUMBS_RATIO:"ratio",GET_THUMBS_NO_RATIO:"no_ratio",GET_THUMBS_NEW:"new"},this.events={SETOVERSTYLE:"thumbmouseover",SETNORMALSTYLE:"thumbmouseout",SETSELECTEDSTYLE:"thumbsetselected",PLACEIMAGE:"thumbplaceimage",AFTERPLACEIMAGE:"thumb_after_place_image",IMAGELOADERROR:"thumbimageloaderror",THUMB_IMAGE_LOADED:"thumb_image_loaded"};var j={thumb_width:88,thumb_height:50,thumb_fixed_size:!0,thumb_resize_by:"height",thumb_border_effect:!0,thumb_border_width:0,thumb_border_color:"#000000",thumb_over_border_width:0,thumb_over_border_color:"#d9d9d9",thumb_selected_border_width:1,thumb_selected_border_color:"#d9d9d9",thumb_round_corners_radius:0,thumb_color_overlay_effect:!0,thumb_overlay_color:"#000000",thumb_overlay_opacity:.4,thumb_overlay_reverse:!1,thumb_image_overlay_effect:!1,thumb_image_overlay_type:"bw",thumb_transition_duration:200,thumb_transition_easing:"easeOutQuad",thumb_show_loader:!0,thumb_loader_type:"dark",thumb_wrapper_as_link:!1,thumb_link_newpage:!1},C={touchEnabled:!1,num_thumbs_checking:0,customThumbs:!1,funcSetCustomThumbHtml:null,isEffectBorder:!1,isEffectOverlay:!1,isEffectImage:!1,colorOverlayOpacity:1,thumbInnerReduce:0,allowOnResize:!0,classNewThumb:"ug-new-thumb"},A={timeout_thumb_check:100,thumb_max_check_times:600,eventSizeChange:"thumb_size_change"};this.init=function(e,t){y=e.getObjects(),P=e,b=jQuery(e),I=y.g_objWrapper,w=y.g_arrItems,j=jQuery.extend(j,t),C.isEffectBorder=j.thumb_border_effect,C.isEffectOverlay=j.thumb_color_overlay_effect,C.isEffectImage=j.thumb_image_overlay_effect},this._____________EXTERNAL_SETTERS__________=function(){},this.setHtmlThumbs=function(t,i){if(E=t,1==C.isEffectImage)var n=g();if(i!==!0)for(var r=P.getNumItems(),o=0;r>o;o++)e(o,n);else{var a=T.getThumbs();a.removeClass(C.classNewThumb);var s=P.getNewAddedItemsIndexes();jQuery.each(s,function(t,i){var r=e(i,n);r.addClass(C.classNewThumb)})}},this.setThumbNormalStyle=function(e,t,o){if(1==C.customThumbs&&e.removeClass("ug-thumb-over"),C.isEffectBorder&&i(e,j.thumb_border_width,j.thumb_border_color,t),C.isEffectOverlay){var a=1==j.thumb_overlay_reverse?!1:!0;n(e,a,t)}C.isEffectImage&&r(e,!0,t),S.trigger(T.events.SETNORMALSTYLE,e)},this.setThumbOverStyle=function(e){if(1==C.customThumbs&&e.addClass("ug-thumb-over"),C.isEffectBorder&&i(e,j.thumb_over_border_width,j.thumb_over_border_color),C.isEffectOverlay){var t=1==j.thumb_overlay_reverse?!0:!1;n(e,t)}1==C.isEffectImage&&r(e,!1),S.trigger(T.events.SETOVERSTYLE,e)},this.setHtmlProperties=function(e){if(!e)var e=T.getThumbs();if(0==C.customThumbs){1==j.thumb_fixed_size&&t(j.thumb_width,j.thumb_height,e),s(e)}if(e.each(function(){var e=jQuery(this);u(e)}),C.isEffectOverlay&&j.thumb_overlay_color){var i={};if(x.isRgbaSupported()){var n=x.convertHexToRGB(j.thumb_overlay_color,j.thumb_overlay_opacity);i["background-color"]=n}else i["background-color"]=j.thumb_overlay_color,C.colorOverlayOpacity=j.thumb_overlay_opacity;e.find(".ug-thumb-overlay").css(i)}},this.setThumbSelected=function(e){return 1==C.customThumbs&&e.removeClass("ug-thumb-over"),1==c(e)?!0:(e.addClass("ug-thumb-selected"),void o(e))},this.setThumbUnselected=function(e){e.removeClass("ug-thumb-selected"),T.setThumbNormalStyle(e,!1,"set unselected")},this.setOptions=function(e){j=jQuery.extend(j,e)},this.setThumbInnerReduce=function(e){C.thumbInnerReduce=e},this.setCustomThumbs=function(e,t,i){if(C.customThumbs=!0,"function"!=typeof e)throw new Error("The argument should be function");C.funcSetCustomThumbHtml=e,-1==jQuery.inArray("overlay",t)&&(C.isEffectOverlay=!1),-1==jQuery.inArray("border",t)&&(C.isEffectBorder=!1),C.isEffectImage=!1,i&&i.allow_onresize===!1&&(C.allowOnResize=!1)},this._____________EXTERNAL_GETTERS__________=function(){},this.getOptions=function(){return j},this.getNumThumbs=function(){var e=w.length;return e},this.getThumbImage=function(e){var t=e.find(".ug-thumb-image");return t},this.getThumbByIndex=function(e){var t=T.getThumbs();if(e>=t.length||0>e)throw new Error("Wrong thumb index");var i=jQuery(t[e]);return i},this.getThumbs=function(e){var t=".ug-thumb-wrapper",i=".ug-thumb-ratio-set";switch(e){default:case T.type.GET_THUMBS_ALL:var n=E.children(t);break;case T.type.GET_THUMBS_NO_RATIO:var n=E.children(t).not(i);break;case T.type.GET_THUMBS_RATIO:var n=E.children(t+i);break;case T.type.GET_THUMBS_NEW:var n=E.children("."+C.classNewThumb)}return n},this.getItemByThumb=function(e){var t=e.data("index");void 0===t&&(t=e.index());var i=w[t];return i},this.isThumbLoaded=function(e){var t=T.getItemByThumb(e);return t.isLoaded},this.getGlobalThumbSize=function(){var e={width:j.thumb_width,
height:j.thumb_height};return e},this._____________EXTERNAL_OTHERS__________=function(){},this.initEvents=function(){var e=".ug-thumb-wrapper";1==C.allowOnResize&&I.on(A.eventSizeChange,h),S.on(T.events.THUMB_IMAGE_LOADED,v),E.on("touchstart",e,function(){C.touchEnabled=!0,E.off("mouseenter").off("mouseleave")}),E.on("mouseenter",e,function(e){var t=jQuery(this);p(t)}),E.on("mouseleave",e,function(e){var t=jQuery(this);f(t)})},this.destroy=function(){var e=".ug-thumb-wrapper";E.off("touchstart",e),I.off(A.eventSizeChange),E.off("mouseenter",e),E.off("mouseleave",e),S.off(T.events.THUMB_IMAGE_LOADED)},this.loadThumbsImages=function(){var e=E.find(".ug-thumb-image");x.checkImagesLoaded(e,null,function(e,t){if(0==t)m(e,!0);else{var i=jQuery(e).parent();a(i)}})},this.triggerImageLoadedEvent=function(e,t){S.trigger(T.events.THUMB_IMAGE_LOADED,[e,t])},this.hideThumbs=function(){E.find(".ug-thumb-wrapper").hide()}}function UGThumbsStrip(){function e(e,i){S=e.getObjects(),z=e,z.attachThumbsPanel("strip",O),T=jQuery(e),P=S.g_objWrapper,x=S.g_arrItems,k=jQuery.extend(k,i),H=k.strip_vertical_type,1==H&&(k=jQuery.extend(k,D),k=jQuery.extend(k,i),i.thumb_resize_by="width"),N.init(e,i),t()}function t(){var e=N.getOptions();R.isNotFixedThumbs=e.thumb_fixed_size===!1,H=k.strip_vertical_type}function n(){N.setHtmlProperties(),o(),l(),s(),0==R.isRunOnce&&(1==k.strip_control_touch&&(M=new UGTouchThumbsControl,M.init(O)),1==k.strip_control_avia&&(A=new UGAviaControl,A.init(O)),p(),N.loadThumbsImages(),y()),R.isRunOnce=!0}function r(e){G.stripSize=e,0==H?G.stripActiveSize=G.stripSize-k.strip_padding_left-k.strip_padding_right:G.stripActiveSize=G.stripSize-k.strip_padding_top-k.strip_padding_bottom,G.stripActiveSize<0&&(G.stripActiveSize=0)}function o(){var e=C.children(".ug-thumb-wrapper"),t=jQuery(e[0]),i=t.outerWidth(),n=t.outerHeight(),o=N.getOptions();0==H?(G.thumbSize=i,1==o.thumb_fixed_size?G.thumbSecondSize=n:G.thumbSecondSize=o.thumb_height,r(j.width()),G.stripInnerSize=C.width()):(G.thumbSize=n,1==o.thumb_fixed_size?G.thumbSecondSize=i:G.thumbSecondSize=o.thumb_width,r(j.height()),G.stripInnerSize=C.height())}function a(e){0==H?C.width(e):C.height(e),G.stripInnerSize=e,p(),jQuery(O).trigger(O.events.INNER_SIZE_CHANGE)}function s(){var e=C.children(".ug-thumb-wrapper"),t=0,n=0;for(0==H&&(n=k.strip_padding_top),i=0;i<e.length;i++){var r=jQuery(e[i]);if(1==R.isNotFixedThumbs){if(objItem=N.getItemByThumb(r),0==objItem.isLoaded)continue;r.show()}L.placeElement(r,t,n),0==H?t+=r.outerWidth()+k.strip_space_between_thumbs:n+=r.outerHeight()+k.strip_space_between_thumbs}if(0==H)var o=t-k.strip_space_between_thumbs;else var o=n-k.strip_space_between_thumbs;a(o)}function l(){if(0==H){var e=G.thumbSecondSize,t={};t.height=e+"px";var i={};i.height=e+"px"}else{var n=G.thumbSecondSize,t={};t.width=n+"px";var i={};i.width=n+"px"}j.css(t),C.css(i)}function u(e){var t=O.getInnerStripPos(),i=t+e;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function d(e){var t=E(e),i=-1*t.min;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function _(e){var t=E(e),i=-1*t.max+G.stripSize;i=O.fixInnerStripLimits(i),O.positionInnerStrip(i,!0)}function g(e){if(0==I())return!1;var t=w(),i=E(e);if(i.min<t.minPosThumbs){var n=e.prev();d(n.length?n:e)}else if(i.max>t.maxPosThumbs){var r=e.next();_(r.length?r:e)}}function c(){var e=z.getSelectedItem();if(null==e)return!0;var t=e.objThumbWrapper;t&&g(t)}function h(){if(0==I())return!1;var e=O.getInnerStripPos(),t=O.fixInnerStripLimits(e);e!=t&&O.positionInnerStrip(t,!0)}function p(){var e=I();1==e?(A&&A.enable(),M&&M.enable()):(A&&A.disable(),M&&M.disable())}function f(){return I()?!1:void(0==H?L.placeElement(C,k.strip_thumbs_align,0):L.placeElement(C,0,k.strip_thumbs_align))}function m(e){if(O.isTouchMotionActive()){var t=M.isSignificantPassed();if(1==t)return!0}var i=N.getItemByThumb(e);z.selectItem(i)}function v(){clearTimeout(R.handle),R.handle=setTimeout(function(){s()},50)}function b(){var e=z.getSelectedItem();N.setThumbSelected(e.objThumbWrapper),g(e.objThumbWrapper)}function y(){N.initEvents();var e=j.find(".ug-thumb-wrapper");e.on("click touchend",function(e){var t=jQuery(this);m(t)}),T.on(z.events.ITEM_CHANGE,b),R.isNotFixedThumbs&&jQuery(N).on(N.events.AFTERPLACEIMAGE,v)}function I(){return G.stripInnerSize>G.stripActiveSize?!0:!1}function w(){var e={},t=O.getInnerStripPos();return e.minPosThumbs=-1*t+1,e.maxPosThumbs=-1*t+G.stripSize-1,e}function E(e){var t={},i=e.position();return 0==H?(t.min=i.left,t.max=i.left+G.thumbSize):(t.min=i.top,t.max=i.top+G.thumbSize),t}var T,S,P,x,j,C,A,M,O=this,z=new UniteGalleryMain,L=new UGFunctions,H=!1,N=new UGThumbsGeneral,L=new UGFunctions,k={strip_vertical_type:!1,strip_thumbs_align:"left",strip_space_between_thumbs:6,strip_thumb_touch_sensetivity:15,strip_scroll_to_thumb_duration:500,strip_scroll_to_thumb_easing:"easeOutCubic",strip_control_avia:!0,strip_control_touch:!0,strip_padding_top:0,strip_padding_bottom:0,strip_padding_left:0,strip_padding_right:0},R={isRunOnce:!1,is_placed:!1,isNotFixedThumbs:!1,handle:null},G={stripSize:0,stripActiveSize:0,stripInnerSize:0,thumbSize:0,thumbSecondSize:0};this.events={STRIP_MOVE:"stripmove",INNER_SIZE_CHANGE:"size_change"};var D={strip_thumbs_align:"top",thumb_resize_by:"width"};this.setHtml=function(e){if(!e){var e=P;null!=k.parent_container&&(e=k.parent_container)}e.append("<div class='ug-thumbs-strip'><div class='ug-thumbs-strip-inner'></div></div>"),j=e.children(".ug-thumbs-strip"),C=j.children(".ug-thumbs-strip-inner"),N.setHtmlThumbs(C),1==R.isNotFixedThumbs&&N.hideThumbs()},this.destroy=function(){var e=j.find(".ug-thumb-wrapper");e.off("click"),e.off("touchend"),T.off(z.events.ITEM_CHANGE),jQuery(N).off(N.events.AFTERPLACEIMAGE),M&&M.destroy(),A&&A.destroy(),N.destroy()},this.________EXTERNAL_GENERAL___________=function(){},this.init=function(t,i){e(t,i)},this.run=function(){n()},this.positionInnerStrip=function(e,t){if(void 0===t)var t=!1;if(0==H)var i={left:e+"px"};else var i={top:e+"px"};0==t?(C.css(i),O.triggerStripMoveEvent()):(O.triggerStripMoveEvent(),C.stop(!0).animate(i,{duration:k.strip_scroll_to_thumb_duration,easing:k.strip_scroll_to_thumb_easing,queue:!1,progress:function(){O.triggerStripMoveEvent()},always:function(){O.triggerStripMoveEvent()}}))},this.triggerStripMoveEvent=function(){jQuery(O).trigger(O.events.STRIP_MOVE)},this.isTouchMotionActive=function(){if(!M)return!1;var e=M.isTouchActive();return e},this.isItemThumbVisible=function(e){var t=e.objThumbWrapper,i=t.position(),n=-1*O.getInnerStripPos();if(0==H)var r=n+G.stripSize,o=i.left,a=i.left+t.width();else var r=n+G.stripSize,o=i.top,a=i.top+t.height();var s=!1;return a>=n&&r>=o&&(s=!0),s},this.getInnerStripPos=function(){return 0==H?C.position().left:C.position().top},this.getInnerStripLimits=function(){var e={};return 0==H?e.maxPos=k.strip_padding_left:e.maxPos=k.strip_padding_top,e.minPos=-(G.stripInnerSize-G.stripActiveSize),e},this.fixInnerStripLimits=function(e){var t=O.getInnerStripLimits();return e>t.maxPos&&(e=t.maxPos),e<t.minPos&&(e=t.minPos),e},this.scrollForeward=function(){u(-G.stripSize)},this.scrollBack=function(){u(G.stripSize)},this.________EXTERNAL_SETTERS___________=function(){},this.setOptions=function(e){k=jQuery.extend(k,e),N.setOptions(e),t()},this.setSizeVertical=function(e){if(0==H)throw new Error("setSizeVertical error, the strip size is not vertical");var t=G.thumbSecondSize,i={};i.width=t+"px",i.height=e+"px",j.css(i),r(e);var n={};n.width=t+"px",n.left="0px",n.top="0px",C.css(n),R.is_placed=!0,p()},this.setSizeHorizontal=function(e){if(1==H)throw new Error("setSizeHorizontal error, the strip size is not horizontal");var t=G.thumbSecondSize+k.strip_padding_top+k.strip_padding_bottom,i={};i.width=e+"px",i.height=t+"px",j.css(i),r(e);var n=k.strip_padding_left,o={};o.height=t+"px",o.left=n+"px",o.top="0px",C.css(o),R.is_placed=!0,p()},this.setPosition=function(e,t,i,n){L.placeElement(j,e,t,i,n)},this.resize=function(e){0==H?(j.width(e),G.stripActiveSize=e-k.strip_padding_left-k.strip_padding_right):(j.height(e),G.stripActiveSize=e-k.strip_padding_top-k.strip_padding_bottom),r(e),p(),h(),f(),c()},this.setThumbUnselected=function(e){N.setThumbUnselected(e)},this.setCustomThumbs=function(e){N.setCustomThumbs(e)},this.________EXTERNAL_GETTERS___________=function(){},this.getObjects=function(){var e=N.getOptions(),t=jQuery.extend(k,e),i={g_gallery:z,g_objGallery:T,g_objWrapper:P,g_arrItems:x,g_objStrip:j,g_objStripInner:C,g_aviaControl:A,g_touchThumbsControl:M,isVertical:H,g_options:t,g_thumbs:N};return i},this.getObjThumbs=function(){return N},this.getSelectedThumb=function(){var e=z.getSelectedItemIndex();return-1==e?null:N.getThumbByIndex(e)},this.getSizeAndPosition=function(){var e=L.getElementSize(j);return e},this.getHeight=function(){var e=j.outerHeight();return e},this.getWidth=function(){var e=j.outerWidth();return e},this.getSizes=function(){return G},this.isVertical=function(){return H},this.isPlaced=function(){return R.is_placed},this.isMoveEnabled=function(){var e=I();return e}}function UGTouchThumbsControl(){function e(){var e=jQuery.now(),t={};return t.passedTime=T.lastTime-T.startTime,t.lastActiveTime=e-T.buttonReleaseTime,t.passedDistance=T.lastPos-T.startPos,t.passedDistanceAbs=Math.abs(t.passedDistance),t}function t(){E.thumb_touch_slowFactor=w.normalizeSetting(5e-5,.01,1,100,y.strip_thumb_touch_sensetivity,!0)}function i(e){return 0==I?w.getMousePosition(e).pageX:w.getMousePosition(e).pageY}function n(e){var t=T.mousePos-e,i=T.innerPos-t,n=h.getInnerStripLimits();if(i>n.maxPos){var r=i-n.maxPos;i=n.maxPos+r/3}if(i<n.minPos){var r=n.minPos-i;i=n.minPos-r/3}h.positionInnerStrip(i)}function r(e){var t=h.getInnerStripPos();T.mousePos=e,T.innerPos=t,T.lastPortionPos=t,T.lastDeltaTime=0,T.lastDeltaPos=0,T.startTime=jQuery.now(),T.startPos=T.innerPos,T.lastTime=T.startTime,T.lastPos=T.startPos,T.speed=0}function o(){var e=jQuery.now(),t=e-T.lastTime;t>=E.touch_portion_time&&(T.lastDeltaTime=e-T.lastTime,T.lastDeltaTime>E.touch_portion_time&&(T.lastDeltaTime=E.touch_portion_time),T.lastDeltaPos=T.lastPos-T.lastPortionPos,T.lastPortionPos=T.lastPos,T.lastTime=e)}function a(){var e=E.thumb_touch_slowFactor,t=E.minDeltaTime,i=E.minPath,n=h.getInnerStripPos(),r=jQuery.now(),o=r-T.lastTime,a=n-T.lastPortionPos;t>o&&T.lastDeltaTime>0&&(o=T.lastDeltaTime,a=T.lastDeltaPos+a),t>o&&(o=t);var l=a>0?1:-1,u=0;o>0&&(u=a/o);var d=u*u/(2*e)*l;Math.abs(d)<=i&&(d=0);var _=h.getInnerStripPos(),g=_+d,c=h.fixInnerStripLimits(g),p=h.getInnerStripLimits(),f=E.limitsBreakAddition,m=!1,v=c;if(g>p.maxPos&&(m=!0,c=f,f>g&&(c=g)),g<p.minPos){m=!0;var y=p.minPos-f;c=y,g>y&&(c=g)}var w=c-_,S=Math.abs(Math.round(u/e));if(0!=d&&(S=S*w/d),_!=c){var P={left:c+"px"};1==I&&(P={top:c+"px"}),b.animate(P,{duration:S,easing:E.animationEasing,queue:!0,progress:s})}if(1==m){var x=E.returnAnimateSpeed,j={left:v+"px"};1==I&&(j={top:v+"px"}),b.animate(j,{duration:x,easing:E.returnAnimationEasing,queue:!0,progress:s})}}function s(){T.lastPos=h.getInnerStripPos(),h.triggerStripMoveEvent()}function l(){return 1==T.loop_active?!0:(T.loop_active=!0,void(T.handle=setInterval(o,10)))}function u(e){if(0==T.loop_active)return!0;if(e){var t=i(e);a(t)}T.loop_active=!1,T.handle=clearInterval(T.handle)}function d(e){return 0==T.isControlEnabled?!0:(T.buttonReleaseTime=jQuery.now(),0==T.touch_active?(u(e),!0):(e.preventDefault(),T.touch_active=!1,u(e),void v.removeClass("ug-dragging")))}function _(e){if(0==T.isControlEnabled)return!0;e.preventDefault(),T.touch_active=!0;var t=i(e);b.stop(!0),r(t),l(),v.addClass("ug-dragging")}function g(e){if(0==T.isControlEnabled)return!0;if(0==T.touch_active)return!0;if(e.preventDefault(),0==e.buttons)return T.touch_active=!1,u(e),!0;var t=i(e);T.lastPos=h.getInnerStripPos(),n(t),o()}function c(){v.bind("mousedown touchstart",_),jQuery(window).add("body").bind("mouseup touchend",d),jQuery("body").bind("mousemove touchmove",g)}var h,p,f,m,v,b,y,I,w=new UGFunctions,E={touch_portion_time:200,thumb_touch_slowFactor:0,minDeltaTime:70,minPath:10,limitsBreakAddition:30,returnAnimateSpeed:500,animationEasing:"easeOutCubic",returnAnimationEasing:"easeOutCubic"},T={touch_active:!1,loop_active:!1,mousePos:0,innerPos:0,startPos:0,startTime:0,lastTime:0,buttonReleaseTime:0,lastPos:0,lastPortionPos:0,lastDeltaTime:0,lastDeltaPos:0,speed:0,handle:"",touchEnabled:!1,isControlEnabled:!0};this.enable=function(){T.isControlEnabled=!0},this.disable=function(){T.isControlEnabled=!1},this.init=function(e){h=e,m=e.getObjects(),p=m.g_gallery,f=m.g_objGallery,v=m.g_objStrip,b=m.g_objStripInner,y=m.g_options,I=m.isVertical,t(),c()},this.isSignificantPassed=function(){var t=e();return t.passedTime>300?!0:t.passedDistanceAbs>30?!0:!1},this.isTouchActive=function(){if(1==T.touch_active)return!0;if(1==b.is(":animated"))return!0;var t=e();return t.lastActiveTime<50?!0:!1},this.destroy=function(){v.unbind("mousedown"),v.unbind("touchstart"),jQuery(window).add("body").unbind("mouseup").unbind("touchend"),jQuery("body").unbind("mousemove").unbind("touchmove")}}function UGPanelsBase(){function e(e,t){switch(n.orientation){case"right":case"left":var i={left:e+"px"};break;case"top":case"bottom":var i={top:e+"px"}}o.stop(!0).animate(i,{duration:300,easing:"easeInOutQuad",queue:!1,complete:function(){t&&t()}})}function t(e){switch(n.orientation){case"right":case"left":g.placeElement(o,e,null);break;case"top":case"bottom":g.placeElement(o,null,e)}}function i(){s.trigger(r.events.FINISH_MOVE)}var n,r,o,a,s,l,u,d=new UniteGalleryMain,_=this,g=new UGFunctions;this.init=function(e,t,i,o,l){n=t,r=i,d=e,a=o,s=l,u=jQuery(d)},this.setHtml=function(e){if(o=e,"strip"==n.panelType)var t=a.strippanel_enable_handle;else var t=a.gridpanel_enable_handle;if(1==t&&(l=new UGPanelHandle,l.init(r,o,a,n.panelType,d),l.setHtml()),n.isDisabledAtStart===!0){var i="<div class='ug-overlay-disabled'></div>";o.append(i),setTimeout(function(){o.children(".ug-overlay-disabled").hide()},n.disabledAtStartTimeout)}},this.placeElements=function(){l&&l.placeHandle()},this.initEvents=function(){l&&(l.initEvents(),u.on(d.events.SLIDER_ACTION_START,function(){l.hideHandle()}),u.on(d.events.SLIDER_ACTION_END,function(){l.showHandle()}))},this.destroy=function(){l&&(l.destroy(),u.off(d.events.SLIDER_ACTION_START),u.off(d.events.SLIDER_ACTION_END))},this.openPanel=function(a){if(!a)var a=!1;return o.is(":animated")?!1:0==n.isClosed?!1:(n.isClosed=!1,s.trigger(r.events.OPEN_PANEL),void(a===!1?e(n.originalPos,i):(t(n.originalPos),i())))},this.closePanel=function(a){if(!a)var a=!1;if(o.is(":animated"))return!1;if(1==n.isClosed)return!1;var l=_.getClosedPanelDest();n.isClosed=!0,s.trigger(r.events.CLOSE_PANEL),a===!1?e(l,i):(t(l),i())},this.setClosedState=function(e){n.originalPos=e,s.trigger(r.events.CLOSE_PANEL),n.isClosed=!0},this.setOpenedState=function(e){s.trigger(r.events.OPEN_PANEL),n.isClosed=!1},this.getClosedPanelDest=function(){var e,t=g.getElementSize(o);switch(n.orientation){case"left":n.originalPos=t.left,e=-n.panelWidth;break;case"right":n.originalPos=t.left;var i=d.getSize();e=i.width;break;case"top":n.originalPos=t.top,e=-n.panelHeight;break;case"bottom":n.originalPos=t.top;var i=d.getSize();e=i.height}return e},this.isPanelClosed=function(){return n.isClosed},this.setDisabledAtStart=function(e){return 0>=e?!1:(n.isDisabledAtStart=!0,void(n.disabledAtStartTimeout=e))}}function UGPanelHandle(){function e(){s.removeClass("ug-button-hover")}function t(){s.addClass("ug-button-closed")}function i(){s.removeClass("ug-button-closed")}function n(e){return e.stopPropagation(),e.stopImmediatePropagation(),0==l.validateClickTouchstartEvent(e.type)?!0:void(a.isPanelClosed()?a.openPanel():a.closePanel())}function r(){var e=a.getOrientation();switch(e){case"right":case"left":"top"!=u.panel_handle_align&&"bottom"!=u.panel_handle_align&&(u.panel_handle_align="top");break;case"bottom":"left"!=u.panel_handle_align&&"right"!=u.panel_handle_align&&(u.panel_handle_align="left");break;case"top":"left"!=u.panel_handle_align&&"right"!=u.panel_handle_align&&(u.panel_handle_align="right")}}var o,a,s,l=new UGFunctions,u={panel_handle_align:"top",panel_handle_offset:0,panel_handle_skin:0};this.init=function(e,t,i,n,r){switch(a=e,o=t,n){case"grid":u.panel_handle_align=i.gridpanel_handle_align,u.panel_handle_offset=i.gridpanel_handle_offset,u.panel_handle_skin=i.gridpanel_handle_skin;break;case"strip":u.panel_handle_align=i.strippanel_handle_align,u.panel_handle_offset=i.strippanel_handle_offset,u.panel_handle_skin=i.strippanel_handle_skin;break;default:throw new Error("Panel handle error: wrong panel type: "+n)}var s=r.getOptions(),l=s.gallery_skin;""==u.panel_handle_skin&&(u.panel_handle_skin=l)},this.setHtml=function(){var e=a.getOrientation(),t="ug-panel-handle-tip";switch(e){case"right":t+=" ug-handle-tip-left";break;case"left":t+=" ug-handle-tip-right";break;case"bottom":t+=" ug-handle-tip-top";break;case"top":t+=" ug-handle-tip-bottom"}o.append("<div class='"+t+" ug-skin-"+u.panel_handle_skin+"'></div>"),s=o.children(".ug-panel-handle-tip")},this.initEvents=function(){l.addClassOnHover(s),s.bind("click touchstart",n),jQuery(a).on(a.events.OPEN_PANEL,function(){e(),i()}),jQuery(a).on(a.events.CLOSE_PANEL,function(){e(),t()})},this.destroy=function(){l.destroyButton(s),jQuery(a).off(a.events.OPEN_PANEL),jQuery(a).off(a.events.CLOSE_PANEL)},this.placeHandle=function(){var e=l.getElementSize(s);r();var t=a.getOrientation();switch(t){case"left":l.placeElement(s,"right",u.panel_handle_align,-e.width);break;case"right":l.placeElement(s,-e.width,u.panel_handle_align,0,u.panel_handle_offset);break;case"top":l.placeElement(s,u.panel_handle_align,"bottom",u.panel_handle_offset,-e.height);break;case"bottom":l.placeElement(s,u.panel_handle_align,"top",u.panel_handle_offset,-e.height);break;default:throw new Error("Wrong panel orientation: "+t)}},this.hideHandle=function(){1==s.is(":visible")&&s.hide()},this.showHandle=function(){0==s.is(":visible")&&s.show()}}function UGStripPanel(){function e(e,t){T=e,m=jQuery(T),j=jQuery.extend(j,t);var i=!1;1==j.strippanel_vertical_type&&(j=jQuery.extend(j,C),i=!0),0==j.strippanel_enable_buttons&&(j=jQuery.extend(j,A),i=!0),1==i&&(j=jQuery.extend(j,t));var n=T.getOptions(),r=n.gallery_skin;""==j.strippanel_buttons_skin&&(j.strippanel_buttons_skin=r),v=T.getElement(),x.init(T,M,w,j,E),P=new UGThumbsStrip,P.init(T,j)}function t(){if(0==j.strippanel_vertical_type){if(0==M.panelWidth)throw new Error("Strip panel error: The width not set, please set width")}else if(0==M.panelHeight)throw new Error("Strip panel error: The height not set, please set height");if(null==M.orientation)throw new Error("Wrong orientation, please set panel orientation before run");return!0}function i(){return 1==M.isFirstRun&&0==t()?!1:(P.run(),s(),d(),f(),M.isFirstRun=!1,void c())}function n(e){if(!e)var e=v;if(e.append("<div class='ug-strip-panel'></div>"),b=e.children(".ug-strip-panel"),1==j.strippanel_enable_buttons){var t="ug-strip-arrow-left",i="ug-strip-arrow-right";1==j.strippanel_vertical_type&&(t="ug-strip-arrow-up",i="ug-strip-arrow-down"),b.append("<div class='ug-strip-arrow "+t+" ug-skin-"+j.strippanel_buttons_skin+"'><div class='ug-strip-arrow-tip'></div></div>"),b.append("<div class='ug-strip-arrow "+i+" ug-skin-"+j.strippanel_buttons_skin+"'><div class='ug-strip-arrow-tip'></div></div>")}x.setHtml(b),P.setHtml(b),1==j.strippanel_enable_buttons&&(I=b.children("."+t),y=b.children("."+i)),r()}function r(){""!=j.strippanel_background_color&&b.css("background-color",j.strippanel_background_color)}function o(){var e=P.getHeight(),t=M.panelWidth;if(y){I.height(e),y.height(e);var i=I.children(".ug-strip-arrow-tip");S.placeElement(i,"center","middle");var n=y.children(".ug-strip-arrow-tip");S.placeElement(n,"center","middle")}var r=e+j.strippanel_padding_top+j.strippanel_padding_bottom;b.width(t),b.height(r),M.panelHeight=r;var o=t-j.strippanel_padding_left-j.strippanel_padding_right;if(y){var a=y.outerWidth();o=o-2*a-2*j.strippanel_padding_buttons}P.resize(o)}function a(){var e=P.getWidth(),t=M.panelHeight;if(y){I.width(e),y.width(e);var i=I.children(".ug-strip-arrow-tip");S.placeElement(i,"center","middle");var n=y.children(".ug-strip-arrow-tip");S.placeElement(n,"center","middle")}var r=e+j.strippanel_padding_left+j.strippanel_padding_right;b.width(r),b.height(t),M.panelWidth=r;var o=t-j.strippanel_padding_top-j.strippanel_padding_bottom;if(y){var a=y.outerHeight();o=o-2*a-2*j.strippanel_padding_buttons}P.resize(o)}function s(){0==j.strippanel_vertical_type?o():a()}function l(){y&&(S.placeElement(I,"left","top",j.strippanel_padding_left,j.strippanel_padding_top),S.placeElement(y,"right","top",j.strippanel_padding_right,j.strippanel_padding_top));var e=j.strippanel_padding_left;y&&(e+=y.outerWidth()+j.strippanel_padding_buttons),P.setPosition(e,j.strippanel_padding_top)}function u(){y&&(S.placeElement(I,"left","top",j.strippanel_padding_left,j.strippanel_padding_top),S.placeElement(y,"left","bottom",j.strippanel_padding_left,j.strippanel_padding_bottom));var e=j.strippanel_padding_top;y&&(e+=y.outerHeight()+j.strippanel_padding_buttons),P.setPosition(j.strippanel_padding_left,e)}function d(){0==j.strippanel_vertical_type?l():u(),x.placeElements()}function _(e){return S.isButtonDisabled(e)?!0:void("advance_item"==j.strippanel_buttons_role?T.nextItem():P.scrollForeward())}function g(e){return S.isButtonDisabled(e)?!0:void("advance_item"==j.strippanel_buttons_role?T.prevItem():P.scrollBack())}function c(){if(!y)return!0;if(0==P.isMoveEnabled())return S.disableButton(I),S.disableButton(y),!0;var e=P.getInnerStripLimits(),t=P.getInnerStripPos();t>=e.maxPos?S.disableButton(I):S.enableButton(I),t<=e.minPos?S.disableButton(y):S.enableButton(y)}function h(){c()}function p(){T.isLastItem()?S.disableButton(y):S.enableButton(y),T.isFirstItem()?S.disableButton(I):S.enableButton(I)}function f(){if(1==M.isEventsInited)return!1;if(M.isEventsInited=!0,y)if(S.addClassOnHover(y,"ug-button-hover"),S.addClassOnHover(I,"ug-button-hover"),S.setButtonOnClick(I,g),S.setButtonOnClick(y,_),"advance_item"!=j.strippanel_buttons_role)jQuery(P).on(P.events.STRIP_MOVE,h),jQuery(P).on(P.events.INNER_SIZE_CHANGE,c),m.on(T.events.SIZE_CHANGE,c);else{var e=T.getOptions();0==e.gallery_carousel&&jQuery(T).on(T.events.ITEM_CHANGE,p)}x.initEvents()}var m,v,b,y,I,w=this,E=jQuery(this),T=new UniteGalleryMain,S=new UGFunctions,P=new UGThumbsStrip,x=new UGPanelsBase;this.events={FINISH_MOVE:"gridpanel_move_finish",OPEN_PANEL:"open_panel",CLOSE_PANEL:"close_panel"};var j={strippanel_vertical_type:!1,strippanel_padding_top:8,strippanel_padding_bottom:8,strippanel_padding_left:0,strippanel_padding_right:0,strippanel_enable_buttons:!0,strippanel_buttons_skin:"",strippanel_padding_buttons:2,strippanel_buttons_role:"scroll_strip",strippanel_enable_handle:!0,strippanel_handle_align:"top",strippanel_handle_offset:0,strippanel_handle_skin:"",strippanel_background_color:""},C={strip_vertical_type:!0,strippanel_padding_left:8,strippanel_padding_right:8,strippanel_padding_top:0,strippanel_padding_bottom:0},A={strippanel_padding_left:8,strippanel_padding_right:8,strippanel_padding_top:8,strippanel_padding_bottom:8},M={panelType:"strip",panelWidth:0,panelHeight:0,isEventsInited:!1,isClosed:!1,orientation:null,originalPos:null,isFirstRun:!0};this.destroy=function(){y&&(S.destroyButton(y),S.destroyButton(I),jQuery(P).off(P.events.STRIP_MOVE),jQuery(T).off(T.events.ITEM_CHANGE),jQuery(T).off(T.events.SIZE_CHANGE)),x.destroy(),P.destroy()},this.getOrientation=function(){return M.orientation},this.setOrientation=function(e){M.orientation=e},this.init=function(t,i){e(t,i)},this.run=function(){i()},this.setHtml=function(e){n(e)},this.getElement=function(){return b},this.getSize=function(){var e=S.getElementSize(b);return e},this.setWidth=function(e){M.panelWidth=e},this.setHeight=function(e){M.panelHeight=e},this.resize=function(e){w.setWidth(e),s(),d()},this.__________Functions_From_Base_____=function(){},this.isPanelClosed=function(){return x.isPanelClosed()},this.getClosedPanelDest=function(){return x.getClosedPanelDest()},this.openPanel=function(e){x.openPanel(e)},this.closePanel=function(e){x.closePanel(e)},this.setOpenedState=function(e){x.setOpenedState(e)},this.setClosedState=function(e){x.setClosedState(e)},this.setCustomThumbs=function(e){P.setCustomThumbs(e)},this.setDisabledAtStart=function(e){x.setDisabledAtStart(e)}}function UGGridPanel(){function e(e,i){x=e,t(),i&&i.vertical_scroll&&(M.gridpanel_vertical_scroll=i.vertical_scroll),M=jQuery.extend(M,i),1==L.isHorType?(M=jQuery.extend(M,z),M=jQuery.extend(M,i)):1==M.gridpanel_vertical_scroll&&(M=jQuery.extend(M,O),M=jQuery.extend(M,i),M.grid_panes_direction="bottom");var n=x.getOptions(),r=n.gallery_skin;""==M.gridpanel_arrows_skin&&(M.gridpanel_arrows_skin=r);var o=e.getObjects();I=o.g_objWrapper,A.init(x,L,S,M,P),C=new UGThumbsGrid,C.init(x,M)}function t(){if(null==L.orientation)throw new Error("Wrong orientation, please set panel orientation before run")}function i(){t(),o(),C.run(),l(),u(),y(),d()}function n(){I.append("<div class='ug-grid-panel'></div>"),w=I.children(".ug-grid-panel"),L.isHorType?(w.append("<div class='grid-arrow grid-arrow-left-hortype ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-right-hortype ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-left-hortype"),E=w.children(".grid-arrow-right-hortype")):0==M.gridpanel_vertical_scroll?(w.append("<div class='grid-arrow grid-arrow-left ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-right ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-left"),E=w.children(".grid-arrow-right")):(w.append("<div class='grid-arrow grid-arrow-up ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),w.append("<div class='grid-arrow grid-arrow-down ug-skin-"+M.gridpanel_arrows_skin+"'></div>"),T=w.children(".grid-arrow-up"),E=w.children(".grid-arrow-down")),A.setHtml(w),T.fadeTo(0,0),E.fadeTo(0,0),C.setHtml(w),r()}function r(){""!=M.gridpanel_background_color&&w.css("background-color",M.gridpanel_background_color)}function o(){"center"==M.gridpanel_grid_align&&(M.gridpanel_grid_align="middle")}function a(){var e=M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom,t=L.panelHeight-e;if(0==M.gridpanel_arrows_always_on){var i=C.getNumPanesEstimationByHeight(t);if(1==i)return t}var n=j.getElementSize(E),r=n.height,e=r+M.gridpanel_arrows_padding_vert;return 1==M.gridpanel_vertical_scroll&&(e*=2),e+=M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom,t=L.panelHeight-e}function s(){var e=M.gridpanel_padding_border_left+M.gridpanel_padding_border_right,t=L.panelWidth-e;if(0==M.gridpanel_arrows_always_on){var i=C.getNumPanesEstimationByWidth(t);if(1==i)return t}var n=j.getElementSize(E),r=n.width;return e+=2*(r+M.gridpanel_arrows_padding_hor),t=L.panelWidth-e}function l(){var e=!1;if(1==M.gridpanel_arrows_always_on)e=!0;else{var t=C.getNumPanes();t>1&&(e=!0)}1==e?(E.show().fadeTo(0,1),T.show().fadeTo(0,1),L.arrowsVisible=!0):(E.hide(),T.hide(),L.arrowsVisible=!1)}function u(){var e=C.getSize();1==L.isHorType?L.panelHeight=e.height+M.gridpanel_padding_border_top+M.gridpanel_padding_border_bottom:L.panelWidth=e.width+M.gridpanel_padding_border_left+M.gridpanel_padding_border_right,j.setElementSize(w,L.panelWidth,L.panelHeight)}function d(){return 1==L.isEventsInited?!1:(L.isEventsInited=!0,T&&(j.addClassOnHover(T),C.attachPrevPaneButton(T)),E&&(j.addClassOnHover(E),C.attachNextPaneButton(E)),void A.initEvents())}function _(){var e=M.gridpanel_padding_border_left;return e}function g(){var e=M.gridpanel_grid_align,t=0;switch(e){case"top":t=M.gridpanel_padding_border_top;break;case"bottom":t=M.gridpanel_padding_border_bottom}var i=_(),n=C.getElement();j.placeElement(n,i,e,0,t)}function c(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize();switch(M.gridpanel_grid_align){default:case"top":e=M.gridpanel_padding_border_top+r.height+M.gridpanel_arrows_padding_vert;break;case"middle":e="middle";break;case"bottom":e=L.panelHeight-o.height-r.height-M.gridpanel_padding_border_bottom-M.gridpanel_arrows_padding_vert}var a=_(),s=C.getElement();j.placeElement(s,a,e);var o=C.getSize();switch(M.gridpanel_arrows_align_vert){default:case"center":case"middle":t=(o.top-r.height)/2,i=o.bottom+(L.panelHeight-o.bottom-r.height)/2,n=0;break;case"grid":t=o.top-r.height-M.gridpanel_arrows_padding_vert_vert,i=o.bottom+M.gridpanel_arrows_padding_vert,n=0;break;case"border":case"borders":t=M.gridpanel_padding_border_top,i="bottom",n=M.gridpanel_padding_border_bottom}j.placeElement(T,"center",t),j.placeElement(E,"center",i,0,n)}function h(){1==L.arrowsVisible?c():g()}function p(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize(),a=M.gridpanel_padding_border_top;switch(M.gridpanel_grid_align){case"middle":switch(M.gridpanel_arrows_align_vert){default:var s=o.height+M.gridpanel_arrows_padding_vert+r.height;a=(L.panelHeight-s)/2;break;case"border":case"borders":var l=L.panelHeight-r.height-M.gridpanel_padding_border_bottom;a=(l-o.height)/2}break;case"bottom":var s=o.height+r.height+M.gridpanel_arrows_padding_vert;a=L.panelHeight-s-M.gridpanel_padding_border_bottom}var u=C.getElement(),d=_();j.placeElement(u,d,a);var o=C.getSize();switch(M.gridpanel_arrows_align_vert){default:case"center":case"middle":e=o.bottom+(L.panelHeight-o.bottom-r.height)/2,i=0;break;case"grid":e=o.bottom+M.gridpanel_arrows_padding_vert,i=0;break;case"border":case"borders":e="bottom",i=M.gridpanel_padding_border_bottom}t=-r.width/2-M.gridpanel_space_between_arrows/2,j.placeElement(T,"center",e,t,i);var n=Math.abs(t);j.placeElement(E,"center",e,n,i)}function f(){1==L.arrowsVisible?p():g()}function m(){var e,t,i,n,r=j.getElementSize(T),o=C.getSize();switch(M.gridpanel_grid_align){default:case"left":e=M.gridpanel_padding_border_left+M.gridpanel_arrows_padding_hor+r.width;break;case"middle":case"center":e="center";break;case"right":e=L.panelWidth-o.width-r.width-M.gridpanel_padding_border_right-M.gridpanel_arrows_padding_hor}var a=C.getElement();switch(j.placeElement(a,e,M.gridpanel_padding_border_top),o=C.getSize(),M.gridpanel_arrows_align_vert){default:case"center":case"middle":n=(o.height-r.height)/2+o.top;break;case"top":n=M.gridpanel_padding_border_top+M.gridpanel_arrows_padding_vert;break;case"bottom":n=L.panelHeight-M.gridpanel_padding_border_bottom-M.gridpanel_arrows_padding_vert-r.height}switch(M.gridpanel_arrows_align_hor){default:case"borders":t=M.gridpanel_padding_border_left,i=L.panelWidth-M.gridpanel_padding_border_right-r.width;break;case"grid":t=o.left-M.gridpanel_arrows_padding_hor-r.width,i=o.right+M.gridpanel_arrows_padding_hor;break;case"center":t=(o.left-r.width)/2,i=o.right+(L.panelWidth-o.right-r.width)/2}j.placeElement(T,t,n),j.placeElement(E,i,n)}function v(){var e,t=C.getSize();switch(M.gridpanel_grid_align){default:case"left":e=M.gridpanel_padding_border_left;break;case"middle":case"center":e="center";break;case"right":e=L.panelWidth-t.width-M.gridpanel_padding_border_right}var i=C.getElement();j.placeElement(i,e,M.gridpanel_padding_border_top)}function b(){1==L.arrowsVisible?m():v()}function y(){0==L.isHorType?1==M.gridpanel_vertical_scroll?h():f():b(),A.placeElements()}var I,w,E,T,S=this,P=jQuery(this),x=new UniteGalleryMain,j=new UGFunctions,C=new UGThumbsGrid,A=new UGPanelsBase;this.events={FINISH_MOVE:"gridpanel_move_finish",OPEN_PANEL:"open_panel",CLOSE_PANEL:"close_panel"};var M={gridpanel_vertical_scroll:!0,gridpanel_grid_align:"middle",gridpanel_padding_border_top:10,gridpanel_padding_border_bottom:4,gridpanel_padding_border_left:10,gridpanel_padding_border_right:10,gridpanel_arrows_skin:"",gridpanel_arrows_align_vert:"middle",gridpanel_arrows_padding_vert:4,gridpanel_arrows_align_hor:"center",gridpanel_arrows_padding_hor:10,gridpanel_space_between_arrows:20,gridpanel_arrows_always_on:!1,gridpanel_enable_handle:!0,gridpanel_handle_align:"top",
gridpanel_handle_offset:0,gridpanel_handle_skin:"",gridpanel_background_color:""},O={gridpanel_grid_align:"middle",gridpanel_padding_border_top:2,gridpanel_padding_border_bottom:2},z={gridpanel_grid_align:"center"},L={panelType:"grid",isHorType:!1,arrowsVisible:!1,panelHeight:0,panelWidth:0,originalPosX:null,isEventsInited:!1,isClosed:!1,orientation:null};this.destroy=function(){T&&j.destroyButton(T),E&&j.destroyButton(E),A.destroy(),C.destroy()},this.getOrientation=function(){return L.orientation},this.setOrientation=function(e){switch(L.orientation=e,e){case"right":case"left":L.isHorType=!1;break;case"top":case"bottom":L.isHorType=!0;break;default:throw new Error("Wrong grid panel orientation: "+e)}},this.setHeight=function(e){if(1==L.isHorType)throw new Error("setHeight is not appliable to this orientatio ("+L.orientation+"). Please use setWidth");L.panelHeight=e;var t=a();C.setMaxHeight(t)},this.setWidth=function(e){if(0==L.isHorType)throw new Error("setWidth is not appliable to this orientatio ("+L.orientation+"). Please use setHeight");L.panelWidth=e;var t=s();C.setMaxWidth(t)},this.init=function(t,i){e(t,i)},this.setHtml=function(){n()},this.run=function(){i()},this.getElement=function(){return w},this.getSize=function(){var e=j.getElementSize(w);return e},this.__________Functions_From_Base_____=function(){},this.isPanelClosed=function(){return A.isPanelClosed()},this.getClosedPanelDest=function(){return A.getClosedPanelDest()},this.openPanel=function(e){A.openPanel(e)},this.closePanel=function(e){A.closePanel(e)},this.setOpenedState=function(e){A.setOpenedState(e)},this.setClosedState=function(e){A.setClosedState(e)},this.setDisabledAtStart=function(e){A.setDisabledAtStart(e)}}function UGThumbsGrid(){function e(e,t,i){if(N=e.getObjects(),B=e,B.attachThumbsPanel("grid",Q),H=jQuery(e),k=N.g_objWrapper,R=N.g_arrItems,i===!0&&(X.isTilesMode=!0),X.numThumbs=R.length,_(t),1==X.isTilesMode){U.setFixedMode(),U.setApproveClickFunction(x),U.init(e,V);var n=U.getOptions();X.tileMaxHeight=n.tile_height,X.tileMaxWidth=n.tile_width,Y=U.getObjThumbs()}else t.thumb_fixed_size=!0,Y.init(e,t)}function t(e){var t=k;e&&(t=e),t.append("<div class='ug-thumbs-grid'><div class='ug-thumbs-grid-inner'></div></div>"),G=t.children(".ug-thumbs-grid"),D=G.children(".ug-thumbs-grid-inner"),1==X.isTilesMode?U.setHtml(D):Y.setHtmlThumbs(D)}function n(){if(0==X.isHorizontal){if(0==X.gridHeight)throw new Error("You must set height before run.")}else if(0==X.gridWidth)throw new Error("You must set width before run.")}function r(){var e=B.getSelectedItem();if(n(),1==X.isFirstTimeRun)L(),1==X.isTilesMode?(a(),u(),U.run()):(Y.setHtmlProperties(),u(),Y.loadThumbsImages());else if(1==X.isTilesMode){var t=a();1==t&&(u(),U.run())}if(p(),1==X.isFirstTimeRun&&X.isTilesMode){var i=Y.getThumbs();i.each(function(e,t){k.trigger(X.eventSizeChange,jQuery(t))}),i.fadeTo(0,1)}null!=e&&d(e.index),W.trigger(Q.events.PANE_CHANGE,X.currentPane),X.isFirstTimeRun=!1}function o(){if(1==X.isTilesMode)var e=U.getGlobalTileSize();else var e=Y.getGlobalThumbSize();return e}function a(){if(0==X.isTilesMode)throw new Error("Dynamic size can be set only in tiles mode");var e=!1,t=B.isMobileMode(),i=X.spaceBetweenCols;1==t?(X.spaceBetweenCols=V.grid_space_between_mobile,X.spaceBetweenRows=V.grid_space_between_mobile):(X.spaceBetweenCols=V.grid_space_between_cols,X.spaceBetweenRows=V.grid_space_between_rows),X.spaceBetweenCols!=i&&(e=!0);var n=o(),r=n.width,a=X.tileMaxWidth,s=F.getNumItemsInSpace(X.gridWidth,X.tileMaxWidth,X.spaceBetweenCols);return s<V.grid_min_cols&&(a=F.getItemSizeInSpace(X.gridWidth,V.grid_min_cols,X.spaceBetweenCols)),U.setTileSizeOptions(a),a!=r&&(e=!0),e}function s(){var e=o(),t=e.height,i=X.gridWidth,n=V.grid_num_rows*t+(V.grid_num_rows-1)*X.spaceBetweenRows+2*V.grid_padding;X.gridHeight=n,F.setElementSize(G,i,n),F.setElementSize(D,i,n),X.innerWidth=i,X.innerHeight=n}function l(){var e=o(),t=e.width,i=V.grid_num_cols*t+(V.grid_num_cols-1)*X.spaceBetweenCols+2*V.grid_padding,n=X.gridHeight;X.gridWidth=i,F.setElementSize(G,i,n),F.setElementSize(D,i,n),X.innerWidth=i,X.innerHeight=n}function u(){0==X.isHorizontal?l():s()}function d(e){var t=T(e);return-1==t?!1:void Q.gotoPane(t,"scroll")}function _(e){V=jQuery.extend(V,e),Y.setOptions(e),X.isNavigationVertical="top"==V.grid_panes_direction||"bottom"==V.grid_panes_direction,X.spaceBetweenCols=V.grid_space_between_cols,X.spaceBetweenRows=V.grid_space_between_rows}function g(){var e=D.children(".ug-thumb-wrapper"),t=0,n=0,r=0,o=0,a=0,s=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(o);var l=e.length;for(i=0;i<l;i++){var u=jQuery(e[i]);F.placeElement(u,t,n);var d=u.outerWidth(),_=u.outerHeight();t>a&&(a=t);var g=n+_;g>s&&(s=g);var c=a+d;c>X.innerWidth&&(X.innerWidth=c),t+=d+X.spaceBetweenCols,r++,r>=V.grid_num_cols&&(n+=_+X.spaceBetweenRows,t=o,r=0),1==X.numPanes&&X.numThumbsInPane++,n+_>X.gridHeight&&(n=0,o=X.innerWidth+X.spaceBetweenCols,t=o,r=0,1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=s,G.height(X.gridHeight)),i<l-1&&(X.numPanes++,X.arrPanes.push(o)))}D.width(X.innerWidth),1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=s,G.height(s))}function c(){var e=D.children(".ug-thumb-wrapper"),t=0,n=0,r=0,o=0,a=0,s=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(a);var l=e.length;for(i=0;i<l;i++){var u=jQuery(e[i]);F.placeElement(u,t,n);var d=u.outerWidth(),_=u.outerHeight();t+=d+X.spaceBetweenCols;var g=n+_;g>r&&(r=g),o++,o>=V.grid_num_cols&&(n+=_+X.spaceBetweenRows,t=a,o=0),1==X.numPanes&&X.numThumbsInPane++,g=n+_;var c=s+X.gridHeight;g>c&&(1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=r,G.height(X.gridHeight),c=X.gridHeight),n=c+X.spaceBetweenRows,s=n,a=0,t=a,o=0,i<l-1&&(X.numPanes++,X.arrPanes.push(n)))}D.height(r),X.innerHeight=r,1==X.isMaxHeight&&1==X.numPanes&&(X.gridHeight=r,G.height(r))}function h(){var e=D.children(".ug-thumb-wrapper"),t=V.grid_padding,n=V.grid_padding,r=n,o=t,a=0,s=0,l=0,u=0,d=0;X.innerWidth=0,X.numPanes=1,X.arrPanes=[],X.numThumbsInPane=0,X.arrPanes.push(t-V.grid_padding);var _=e.length;for(i=0;i<_;i++){var g=jQuery(e[i]),c=g.outerWidth(),h=g.outerHeight();o-t+c>X.gridWidth&&(d++,r=0,d>=V.grid_num_rows?(d=0,t=o,r=n,l=0,1==X.numPanes&&(X.gridWidth=a+V.grid_padding,G.width(X.gridWidth),X.gridHeight=u+V.grid_padding,G.height(X.gridHeight)),X.numPanes++,X.arrPanes.push(t-V.grid_padding)):(o=t,r=l+X.spaceBetweenRows)),F.placeElement(g,o,r);var p=o+c;p>a&&(a=p);var f=r+h;f>l&&(l=f),f>u&&(u=f),f>s&&(s=f);var p=a+c;p>X.innerWidth&&(X.innerWidth=p),o+=c+X.spaceBetweenCols,1==X.numPanes&&X.numThumbsInPane++}X.innerWidth=a+V.grid_padding,X.innerHeight=u+V.grid_padding,D.width(X.innerWidth),D.height(X.innerHeight),1==X.numPanes&&(X.gridWidth=a+V.grid_padding,X.gridHeight=u+V.grid_padding,G.width(X.gridWidth),G.height(X.gridHeight))}function p(){0==X.isHorizontal?X.isNavigationVertical?c():g():h()}function f(e){if(0>e||e>=X.numThumbs)throw new Error("Thumb not exists: "+e);return!0}function m(e){if(e>=X.numPanes||0>e)throw new Error("Pane "+index+" doesn't exists.");return!0}function v(e){var t=w(e);return 0==t?!1:void D.css(t)}function b(e){var t=w(e);return 0==t?!1:void D.stop(!0).animate(t,{duration:V.grid_transition_duration,easing:V.grid_transition_easing,queue:!1})}function y(){var e=-X.arrPanes[X.currentPane];b(e)}function I(){return 1==X.isNavigationVertical?X.gridHeight:X.gridWidth}function w(e){var t={};return 1==X.isNavigationVertical?t.top=e+"px":t.left=e+"px",t}function E(){var e=F.getElementSize(D);return 1==X.isNavigationVertical?e.top:e.left}function T(e){if(0==f(e))return-1;var t=Math.floor(e/X.numThumbsInPane);return t}function S(){if(1==X.numPanes)return!1;var e=F.getStoredEventData(X.storedEventID),t=e.diffTime,i=E(),n=Math.abs(i-e.startInnerPos);return n>30?!0:n>5&&t>300?!0:!1}function P(){var e=F.getStoredEventData(X.storedEventID),t=E();diffPos=Math.abs(e.startInnerPos-t);var i=I(),n=Math.round(3*i/8);return diffPos>=n?!0:e.diffTime<300&&diffPos>25?!0:!1}function x(){if(1==X.numPanes)return!0;var e=F.isApproveStoredEventClick(X.storedEventID,X.isNavigationVertical);return e}function j(e){if(1==S())return!0;var t=jQuery(this),i=Y.getItemByThumb(t);B.selectItem(i)}function C(e){if(1==X.numPanes)return!0;if(1==X.touchActive)return!0;0==X.isTilesMode&&e.preventDefault(),X.touchActive=!0;var t={startInnerPos:E()};F.storeEventData(e,X.storedEventID,t)}function A(){if(0==V.grid_vertical_scroll_ondrag)return!1;if(1==X.isNavigationVertical)return!1;var e=F.handleScrollTop(X.storedEventID);return"vert"===e?!0:!1}function M(e){if(0==X.touchActive)return!0;e.preventDefault(),F.updateStoredEventData(e,X.storedEventID);var t=F.getStoredEventData(X.storedEventID,X.isNavigationVertical),i=A();if(i)return!0;var n=t.diffMousePos,r=t.startInnerPos+n,o=n>0?"prev":"next",a=X.arrPanes[X.numPanes-1];0==V.grid_carousel&&r>0&&"prev"==o&&(r/=3),0==V.grid_carousel&&-a>r&&"next"==o&&(r=t.startInnerPos+n/3),v(r)}function O(e){if(0==X.touchActive)return!0;F.updateStoredEventData(e,X.storedEventID);var t=F.getStoredEventData(X.storedEventID,X.isNavigationVertical);if(X.touchActive=!1,0==P())return y(),!0;var i=E(),n=i-t.startInnerPos,r=n>0?"prev":"next";"next"==r?0==V.grid_carousel&&Q.isLastPane()?y():Q.nextPane():0==V.grid_carousel&&Q.isFirstPane()?y():Q.prevPane()}function z(){var e=B.getSelectedItem();Y.setThumbSelected(e.objThumbWrapper),d(e.index)}function L(){if(0==X.isTilesMode){Y.initEvents();var e=G.find(".ug-thumb-wrapper");e.on("click touchend",j),H.on(B.events.ITEM_CHANGE,z)}else U.initEvents();G.bind("mousedown touchstart",C),jQuery("body").bind("mousemove touchmove",M),jQuery(window).add("body").bind("mouseup touchend",O)}var H,N,k,R,G,D,Q=this,W=jQuery(this),B=new UniteGalleryMain,F=new UGFunctions,Y=new UGThumbsGeneral,U=new UGTileDesign,V={grid_panes_direction:"left",grid_num_cols:2,grid_min_cols:2,grid_num_rows:2,grid_space_between_cols:10,grid_space_between_rows:10,grid_space_between_mobile:10,grid_transition_duration:300,grid_transition_easing:"easeInOutQuad",grid_carousel:!1,grid_padding:0,grid_vertical_scroll_ondrag:!1};this.events={PANE_CHANGE:"pane_change"};var X={eventSizeChange:"thumb_size_change",isHorizontal:!1,isMaxHeight:!1,isMaxWidth:!1,gridHeight:0,gridWidth:0,innerWidth:0,innerHeight:0,numPanes:0,arrPanes:0,numThumbs:0,currentPane:0,numThumbsInPane:0,isNavigationVertical:!1,touchActive:!1,startScrollPos:0,isFirstTimeRun:!0,isTilesMode:!1,storedEventID:"thumbsgrid",tileMaxWidth:null,tileMaxHeight:null,spaceBetweenCols:null,spaceBetweenRows:null};this.destroy=function(){if(0==X.isTilesMode){var e=G.find(".ug-thumb-wrapper");e.off("click"),e.off("touchend"),H.on(B.events.ITEM_CHANGE),Y.destroy()}else U.destroy();G.unbind("mousedown"),G.unbind("touchstart"),jQuery("body").unbind("mousemove"),jQuery("body").unbind("touchmove"),jQuery(window).add("body").unbind("touchend"),jQuery(window).add("body").unbind("mouseup"),W.off(Q.events.PANE_CHANGE)},this.__________EXTERNAL_GENERAL_________=function(){},this.setThumbUnselected=function(e){Y.setThumbUnselected(e)},this.isItemThumbVisible=function(e){var t=e.index,i=T(t);return i==X.currentPane?!0:!1},this.__________EXTERNAL_API_________=function(){},this.getNumPanesEstimationByHeight=function(e){if(1==X.isTilesMode)var t=V.tile_height;else var i=Y.getOptions(),t=i.thumb_height;var n=Y.getNumThumbs(),r=Math.ceil(n/V.grid_num_cols),o=r*t+(r-1)*X.spaceBetweenRows,a=Math.ceil(o/e);return a},this.getNumPanesEstimationByWidth=function(e){if(X.isTilesMode)var t=V.tile_width;else var i=Y.getOptions(),t=i.thumb_width;var n=Y.getNumThumbs(),r=Math.ceil(n/V.grid_num_rows),o=r*t+(r-1)*X.spaceBetweenCols,a=Math.ceil(o/e);return a},this.getHeightEstimationByWidth=function(e){if(0==X.isTilesMode)throw new Error("This function works only with tiles mode");var t=Y.getNumThumbs(),i=F.getNumItemsInSpace(e,V.tile_width,X.spaceBetweenCols),n=Math.ceil(t/i);n>V.grid_num_rows&&(n=V.grid_num_rows);var r=F.getSpaceByNumItems(n,V.tile_height,X.spaceBetweenRows);return r+=2*V.grid_padding},this.getElement=function(){return G},this.getSize=function(){var e=F.getElementSize(G);return e},this.getNumPanes=function(){return X.numPanes},this.isFirstPane=function(){return 0==X.currentPane?!0:!1},this.isLastPane=function(){return X.currentPane==X.numPanes-1?!0:!1},this.getPaneInfo=function(){var e={pane:X.currentPane,total:X.numPanes};return e},this.getPane=function(){return X.currentPane},this.setWidth=function(e){X.gridWidth=e,X.isHorizontal=!0},this.setMaxWidth=function(e){X.gridWidth=e,X.isMaxWidth=!0,X.isHorizontal=!0},this.setHeight=function(e){X.gridHeight=e,X.isHorizontal=!1},this.setMaxHeight=function(e){X.gridHeight=e,X.isMaxHeight=!0,X.isHorizontal=!1},this.gotoPane=function(e,t){if(0==m(e))return!1;if(e==X.currentPane)return!1;var i=-X.arrPanes[e];X.currentPane=e,b(i),W.trigger(Q.events.PANE_CHANGE,e)},this.nextPane=function(){var e=X.currentPane+1;if(e>=X.numPanes){if(0==V.grid_carousel)return!0;e=0}Q.gotoPane(e,"next")},this.prevPane=function(){var e=X.currentPane-1;return 0>e&&(e=X.numPanes-1,0==V.grid_carousel)?!1:void Q.gotoPane(e,"prev")},this.attachNextPaneButton=function(e){return F.setButtonOnClick(e,Q.nextPane),1==V.grid_carousel?!0:(Q.isLastPane()&&e.addClass("ug-button-disabled"),void W.on(Q.events.PANE_CHANGE,function(){Q.isLastPane()?e.addClass("ug-button-disabled"):e.removeClass("ug-button-disabled")}))},this.attachPrevPaneButton=function(e){return F.setButtonOnClick(e,Q.prevPane),1==V.grid_carousel?!0:(Q.isFirstPane()&&e.addClass("ug-button-disabled"),void W.on(Q.events.PANE_CHANGE,function(){Q.isFirstPane()?e.addClass("ug-button-disabled"):e.removeClass("ug-button-disabled")}))},this.attachBullets=function(e){e.setActive(X.currentPane),jQuery(e).on(e.events.BULLET_CLICK,function(t,i){Q.gotoPane(i,"theme"),e.setActive(i)}),jQuery(Q).on(Q.events.PANE_CHANGE,function(t,i){e.setActive(i)})},this.getObjTileDesign=function(){return U},this.init=function(t,i,n){e(t,i,n)},this.run=function(){r()},this.setHtml=function(e){t(e)}}function UGTiles(){function e(e,i){g_objects=e.getObjects(),oe=e,K=jQuery(e),J=g_objects.g_objWrapper,ee=g_objects.g_arrItems,de=jQuery.extend(de,i),t(),se.init(e,de),le=se.getObjThumbs()}function t(){de.tiles_min_columns<1&&(de.tiles_min_columns=1),0!=de.tiles_max_columns&&de.tiles_max_columns<de.tiles_min_columns&&(de.tiles_max_columns=de.tiles_min_columns)}function i(e){if(!e)if($)e=$;else var e=J;$=e;var t=de.tiles_type;e.addClass("ug-tiletype-"+t),se.setHtml(e),e.children(".ug-thumb-wrapper").hide()}function n(){if($.addClass("ug-tiles-rest-mode"),_e.isTransInited=!0,1==de.tiles_enable_transition){$.addClass("ug-tiles-transit");var e=se.getOptions();1==e.tile_enable_image_effect&&0==e.tile_image_effect_reverse&&$.addClass("ug-tiles-transit-overlays"),_e.isTransActive=!0}}function r(){return ae.getElementSize($).width}function o(){return 0==_e.isTransInited?!1:($.addClass("ug-tiles-transition-active"),$.removeClass("ug-tiles-rest-mode"),0==_e.isTransActive?!1:void se.disableEvents())}function a(){return 0==_e.isTransInited?!1:($.removeClass("ug-tiles-transition-active"),void $.addClass("ug-tiles-rest-mode"))}function s(){1==_e.isTransActive?(setTimeout(function(){se.enableEvents(),se.triggerSizeChangeEventAllTiles(),a()},800),_e.handle&&clearTimeout(_e.handle),_e.handle=setTimeout(function(){a(),se.triggerSizeChangeEventAllTiles(),_e.handle=null},2e3)):(se.triggerSizeChangeEventAllTiles(),a())}function l(){ue.colWidth=(ue.availWidth-ue.colGap*(ue.numCols-1))/ue.numCols,ue.colWidth=Math.floor(ue.colWidth),ue.totalWidth=ae.getSpaceByNumItems(ue.numCols,ue.colWidth,ue.colGap)}function u(){if(ue.colWidth=de.tiles_col_width,ue.minCols=de.tiles_min_columns,ue.maxCols=de.tiles_max_columns,0==oe.isMobileMode()?ue.colGap=de.tiles_space_between_cols:ue.colGap=de.tiles_space_between_cols_mobile,ue.galleryWidth=r(),ue.availWidth=ue.galleryWidth,1==de.tiles_include_padding&&(ue.availWidth=ue.galleryWidth-2*ue.colGap),1==de.tiles_exact_width)ue.numCols=ae.getNumItemsInSpace(ue.availWidth,ue.colWidth,ue.colGap),ue.maxCols>0&&ue.numCols>ue.maxCols&&(ue.numCols=ue.maxCols),ue.numCols<ue.minCols?(ue.numCols=ue.minCols,l()):ue.totalWidth=ue.numCols*(ue.colWidth+ue.colGap)-ue.colGap;else{var e=ae.getNumItemsInSpaceRound(ue.availWidth,ue.colWidth,ue.colGap);e<ue.minCols?e=ue.minCols:0!=ue.maxCols&&e>ue.maxCols&&(e=ue.maxCols),ue.numCols=e,l()}switch(de.tiles_align){case"center":default:ue.addX=Math.round((ue.galleryWidth-ue.totalWidth)/2);break;case"left":ue.addX=0;break;case"right":ue.addX=ue.galleryWidth-ue.totalWidth}for(ue.arrPosx=[],col=0;col<ue.numCols;col++){var t=ae.getColX(col,ue.colWidth,ue.colGap);ue.arrPosx[col]=t+ue.addX}}function d(){ue.maxColHeight=0,ue.colHeights=[0]}function _(){var e=0,t=999999999;for(col=0;col<ue.numCols;col++){if(void 0==ue.colHeights[col]||0==ue.colHeights[col])return col;ue.colHeights[col]<t&&(e=col,t=ue.colHeights[col])}return e}function g(e,t,i,n){if(null===n||"undefined"==typeof n)var n=_();var r=0;void 0!==ue.colHeights[n]&&(r=ue.colHeights[n]);var o=se.getTileHeightByWidth(ue.colWidth,e);if(null===o){if(1==de.tiles_enable_transition)throw new Error("Can't know tile height, please turn off transition");var a=ae.getElementSize(e);o=a.height}var s=ue.arrPosx[n];ae.placeElement(e,s,r);var l=r+o;ue.colHeights[n]=l+ue.colGap,ue.maxColHeight<l&&(ue.maxColHeight=l),1==t&&e.show().fadeTo(0,1),1==i&&$.height(ue.maxColHeight)}function c(e){e||(e=!1),u(),d();var t=le.getThumbs(le.type.GET_THUMBS_RATIO);o(),se.resizeAllTiles(ue.colWidth,se.resizemode.VISIBLE_ELEMENTS,t);for(var i=0;i<t.length;i++){var n=jQuery(t[i]),r=void 0;1==de.tiles_keep_order&&(r=ae.getColByIndex(ue.numCols,i)),g(n,e,!1,r)}s();var a=$.height();1==_e.isTransActive&&a>ue.maxColHeight?setTimeout(function(){$.height(ue.maxColHeight)},700):$.height(ue.maxColHeight)}function h(e){var t=e.index(),i=oe.getItem(t);if(i.ordered_placed===!0)return!1;var n=ae.getPrevRowSameColIndex(t,ue.numCols);if(0>n)return!0;var r=oe.getItem(n);return r.ordered_placed===!0?!0:!1}function p(e,t){if(t!==!0){var i=h(e);if(0==i)return!1}var n=e.index(),r=ae.getColByIndex(ue.numCols,n),o=oe.getItem(n);se.resizeTile(e,ue.colWidth),g(e,!0,!0,r),o.ordered_placed=!0;var a=oe.getNumItems(),s=ae.getNextRowSameColIndex(n,ue.numCols);if(s>=a)return!1;var l=le.getThumbByIndex(s),u=oe.getItem(s);le.isThumbLoaded(l);le.isThumbLoaded(l)&&!u.ordered_placed&&p(l,!0)}function f(e,t){if(1==t)return!1;e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e),1==de.tiles_keep_order?p(i):(se.resizeTile(i,ue.colWidth),g(i,!0,!0))}function m(){var e=le.getThumbs(le.type.GET_THUMBS_NO_RATIO);if(!e||0==e.length)return!1;if(_e.isAllLoaded=!1,1==_e.isFirstPlaced){u(),d();var t=Math.abs(ue.galleryWidth-ue.totalWidth);if(1==de.tiles_set_initial_height&&0==ae.isScrollbarExists()&&25>t){var i=(e.length,Math.ceil(e.length/ue.numCols)),r=i*de.tiles_col_width*.75;$.height(r),u()}}e.fadeTo(0,0);var o=e.find("img.ug-thumb-image"),a=ue.numCols,s=ue.galleryWidth;ae.checkImagesLoaded(o,function(){u(),(a!=ue.numCols||s!=ue.galleryWidth)&&c(!1),n(),re.trigger(ne.events.ALL_TILES_LOADED)},function(e,t){1==_e.isFirstPlaced&&oe.triggerEvent(ne.events.TILES_FIRST_PLACED),f(e,t)})}function v(){var e=r(),t=le.getThumbs(!0),i=de.tiles_justified_row_height,n=[],o=0,a=de.tiles_justified_space_between,s=t.length;jQuery.each(t,function(e,t){t=jQuery(t);var r=le.getItemByThumb(t),a=r.thumbWidth,s=r.thumbHeight;s!==i&&(a=Math.floor(r.thumbRatioByWidth*i)),n[e]=a,o+=a});var l=Math.ceil(o/e);l>s&&(l=s);var u=o/l,d=[],_=0,g=[],c=[],h=0,p=0;jQuery.each(t,function(e,t){var i=n[e];h+i/2>(p+1)*u&&(g[d.length]=_,d.push(c),c=[],_=0,p++),h+=i,_+=i,c.push(t)}),g[d.length]=_,d.push(c);var f=[],m=[],v=0;jQuery.each(d,function(t,r){var o=(r.length,g[t]),s=(r.length-1)*a,l=(e-s)/o,u=Math.round(i*l);v+=u,t>0&&(v+=a),m.push(u);var d=u/i,_=[],c=s;jQuery.each(r,function(e,t){var i=jQuery(t),r=i.index(),o=n[r],a=Math.round(o*d);_[e]=a,c+=a});var h=c-e;jQuery.each(_,function(e,t){return 0==h?!1:(0>h?(_[e]=t+1,h++):(_[e]=t-1,h--),void(e==_.length-1&&0!=h&&(_[e]-=h)))}),f[t]=_});var b={arrRows:d,arrRowWidths:f,arrRowHeights:m,gap:a,totalHeight:v};return b}function b(e){if(!e)var e=!1;var t=r(),i=v();$.height(i.totalHeight);var n=r();n!=t&&(i=v()),o();var a=0,l=0;jQuery.each(i.arrRows,function(t,n){var r=i.arrRowWidths[t],o=i.arrRowHeights[t],s=0;jQuery.each(n,function(t,n){var u=jQuery(n),d=o,_=r[t];se.resizeTile(u,_,d,se.resizemode.VISIBLE_ELEMENTS),ae.placeElement(u,s,a),s+=_,s>l&&(l=s),s+=i.gap,1==e&&jQuery(n).show()}),a+=o+i.gap}),s()}function y(){var e=jQuery(J).find("img.ug-thumb-image"),t=le.getThumbs();_e.isAllLoaded=!1,t.fadeTo(0,0),ae.checkImagesLoaded(e,function(){setTimeout(function(){b(!0),t.fadeTo(0,1),oe.triggerEvent(ne.events.TILES_FIRST_PLACED),n(),re.trigger(ne.events.ALL_TILES_LOADED)})},function(e,t){e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e)})}function I(){var e=jQuery(J).find("img.ug-thumb-image"),t=le.getThumbs();_e.isAllLoaded=!1,t.fadeTo(0,0),ae.checkImagesLoaded(e,function(){1==oe.isMobileMode()?c(!0):E(!0),oe.triggerEvent(ne.events.TILES_FIRST_PLACED),n(),re.trigger(ne.events.ALL_TILES_LOADED)},function(e,t){e=jQuery(e);var i=jQuery(e).parent();le.triggerImageLoadedEvent(i,e)})}function w(){var e=r();ge.galleryWidth=e,te={},ge.colWidth=de.tiles_nested_col_width,ge.optimalTileWidth=de.tiles_nested_optimal_tile_width,ge.currentGap=de.tiles_space_between_cols,1==oe.isMobileMode()&&(ge.currentGap=de.tiles_space_between_cols_mobile),null==ge.colWidth?ge.colWidth=Math.floor(ge.optimalTileWidth/ge.nestedOptimalCols):ge.optimalTileWidth>ge.colWidth?ge.nestedOptimalCols=Math.ceil(ge.optimalTileWidth/ge.colWidth):ge.nestedOptimalCols=1,ge.maxColumns=ae.getNumItemsInSpace(e,ge.colWidth,ge.currentGap),ge.colWidth=ae.getItemSizeInSpace(e,ge.maxColumns,ge.currentGap),ge.gridY=0,ie=[];var t=le.getThumbs(!0);switch(t.each(function(){var e=jQuery(this),t=T(e);ie.push(t)}),ge.optimalTileWidth>ge.colWidth?ge.nestedOptimalCols=Math.ceil(ge.optimalTileWidth/ge.colWidth):ge.nestedOptimalCols=1,ge.totalWidth=ge.maxColumns*(ge.colWidth+ge.currentGap)-ge.currentGap,de.tiles_align){case"center":default:ge.addX=Math.round((ge.galleryWidth-ge.totalWidth)/2);break;case"left":ge.addX=0;break;case"right":ge.addX=ge.galleryWidth-ge.totalWidth}ge.maxGridY=0}function E(e){var t=r();w(),x();var i=ge.maxGridY*(ge.colWidth+ge.currentGap)-ge.currentGap;$.height(i);var n=r();n!=t&&(w(),x()),0==de.tiles_nested_debug&&U(e)}function T(e){var t,i,n={},r=ge.colWidth,o=ge.currentGap,a=se.getTileImageSize(e),s=e.index(),l=Math.ceil(S(s)*(1*ge.nestedOptimalCols/3)+2*ge.nestedOptimalCols/3),u=a.width,d=a.height,_=u/d;return u>d?(t=l,i=Math.round(t/_),0==i&&(i=1)):(i=l,t=Math.round(i*_),0==t&&(t=1)),n.dimWidth=t,n.dimHeight=i,n.width=t*r+o*(t-1),n.height=i*r+o*(i-1),n.imgWidth=u,n.imgHeight=d,n.left=0,n.top=0,n}function S(e){return Math.abs(Math.sin(Math.abs(1e3*Math.sin(e))))}function P(e,t){if(0==t){for(var i=ge.currentItem;i<ie.length;i++)j(i,!0);ge.currentItem=ie.length-1}else j(ge.currentItem,!0);for(var i=0;i<=ge.currentItem;i++)V(i,!0);ge.currentItem++}function x(e){if(1==de.tiles_nested_debug)return"undefined"==typeof e&&(e=!0),P(!0,e),!1;for(var t=0;t<ie.length;t++)j(t,!0)}function j(e,t){if(!t)var t=!1;ge.maxColHeight=0;for(var i=ae.getObjectLength(te),n=ge.gridY;i+1>=n;n++){for(var r=0;r<ge.maxColumns;r++)if(0==Q(ge.gridY)||0==F(ge.gridY,r)){var o=D(r);return void C(e,o,r)}ge.gridY++}}function C(e,t,i){var n=jQuery.extend(!0,{},ie[e]),r=n.dimWidth,o=t-n.dimWidth,a=ge.nestedOptimalCols,s=t<=n.dimWidth||.33*a>=o||a>=t;if(s)N(e,t);else if(a>=o)a>=4?1==G(Math.floor(t/2),i)?N(e,Math.floor(t/2)+1):N(e,Math.floor(t/2)):N(objImage,t);else if(1==G(r,i))switch(r>=a){case!0:N(e,r-1);break;case!1:N(e,r+1)}n=jQuery.extend(!0,{},ie[e]);var l=L(e,n.dimWidth,i);if(ge.columnsValueToEnableHeightResize<=l[0]&&ge.maxColumns>=2*ge.nestedOptimalCols){var u=H(i,n),d=k(e,u.newHeight,!0);ie[e].dimHeight=d.dimHeight;var _=z(l,d.dimWidth,i),g=A(_),c=!1;g>=2&&(c=!0),u.newHeight>=n.dimHeight&&(n=k(e,u.newHeight,!0));var h=M(u.idToResize,u.newHeight,n.dimHeight);n.top=ge.gridY,n.left=i,h.push({tileID:e,sizes:n});var p=R(h),f=R(_);return f>p||1==c?void O(h):void O(_)}n.left=i,n.top=ge.gridY,ie[e]=n,W(e,n,i,ge.gridY),ge.maxGridY=n.top+n.dimHeight}function A(e){for(var t=0,i=0,n=0;n<e.length-1;n++){var r=e[n].sizes,o=-1,a=-1;Q(r.top+r.dimHeight)&&ge.maxColumns>r.left+r.dimWidth&&(o=te[r.top+r.dimHeight-1][r.left+r.dimWidth],a=te[r.top+r.dimHeight][r.left+r.dimWidth]),o!=a&&t++}for(var n=0;n<e.length-1;n++){var r=e[n].sizes,o=-1,a=-1;Q(r.top+r.dimHeight)&&r.left-1>=0&&(o=te[r.top+r.dimHeight-1][r.left-1],a=te[r.top+r.dimHeight][r.left-1]),o!=a&&i++}return Math.max(i,t)}function M(e,t,i){var n=ie[e],r=n.dimHeight,o=(n.dimWidth,n.left),a=n.top,s=(parseInt(a/(ge.colWidth+ge.currentGap)),parseInt(o/(ge.colWidth+ge.currentGap)),r-t+i),l=k(e,s,!0),u=[];return u.push({tileID:e,sizes:l}),u}function O(e){for(var t=0;t<e.length;t++){var i=e[t].sizes,n=e[t].tileID;ie[n]=jQuery.extend(!0,{},i),W(n,i,i.left,i.top)}}function z(e,t){for(var i=0,n=0,r=[],o=0,a=0,s=0;s<e[1].length;s++){var l=e[1][s],u=ie[e[1][s]];if(n+=u.dimHeight,0!=s)i+=u.dimHeight,r.push([l,u.dimHeight]);else{var d=N(l,t,!0);i+=d.dimHeight,r.push([e[1][s],d.dimHeight])}}o=u.left,a=u.top;for(var _=n,g=[],s=r.length-1;s>=0;s--){var c,l=r[s][0];0!=s?(c=Math.max(Math.round(1*n/3),Math.floor(r[s][1]*(n/i))),_-=c,d=k(l,c,!0),d.left=o,d.top=a,g.push({tileID:l,sizes:d}),a+=d.dimHeight):(c=_,d=k(l,c,!0),d.left=o,d.top=a,g.push({tileID:l,sizes:d}))}return g}function L(e,t,i){var n=ge.gridY-1,r=0,o=0,a=1,s=[],l=[];if(s.push(e),n>=0){for(o=0;n>=0;){if(r=te[n][i],"undefined"!=typeof te[n][i-1]&&te[n][i-1]==te[n][i]||"undefined"!=typeof te[n][i+t]&&te[n][i+t-1]==te[n][i+t]||te[n][i]!=te[n][i+t-1])return l.push(a),l.push(s),l;o!=r&&(a++,s.push(r)),n--,o=r}return l.push(a),l.push(s),l}return[0,[]]}function H(e,t){var i=0,n=0,r=t.dimWidth,o=t.dimHeight,a=0,s=0,l=jQuery.map(te,function(e,t){return[e]});if("undefined"==typeof l[ge.gridY]||"undefined"==typeof l[ge.gridY][e-1])n=0;else for(var u=0;;){if("undefined"==typeof te[ge.gridY+u]||-1==te[ge.gridY+u][e-1])break;a=te[ge.gridY+u][e-2],u++,n++}if("undefined"==typeof l[ge.gridY]||"undefined"==typeof l[ge.gridY][e+r])i=0;else for(u=0;;){if("undefined"==typeof te[ge.gridY+u]||-1==te[ge.gridY+u][e+r])break;s=te[ge.gridY+u][e+r+1],u++,i++}var d=0,_=0;Math.abs(o-n)<Math.abs(o-i)&&0!=n?(d=n,_=a):0!=i?(d=i,_=s):d=o;var g={newHeight:d,idToResize:_};return g}function N(e,t,i){i||(i=!1);var n=ge.colWidth,r=ge.currentGap,o=ie[e],a=o.imgWidth,s=o.imgHeight,l=a/s;if(dimWidth=t,dimHeight=Math.round(dimWidth/l),1==i){var u=jQuery.extend(!0,{},o);return u.dimWidth=dimWidth,u.dimHeight=dimHeight,u.width=dimWidth*n+r*(dimWidth-1),u.height=dimHeight*n+r*(dimHeight-1),u}o.dimWidth=dimWidth,o.dimHeight=dimHeight,o.width=dimWidth*n+r*(dimWidth-1),o.height=dimHeight*n+r*(dimHeight-1)}function k(e,t,i){i||(i=!1);var n=ie[e],r=n.dimWidth,o=ge.colWidth,a=ge.currentGap;if(1==i){var s=jQuery.extend(!0,{},n);return s.dimHeight=t,s.width=r*o+a*(r-1),s.height=t*o+a*(t-1),s}n.dimHeight=t,n.width=r*o+a*(r-1),n.height=t*o+a*(t-1)}function R(e){for(var t=0,i=0,n=0;n<e.length;n++){var r=ie[e[n].tileID];if(0==r.dimHeight||0==r.height)return;resizeVal=r.dimWidth/r.dimHeight/(r.imgWidth/r.imgHeight),resizeVal<1&&(resizeVal=1/resizeVal),t+=resizeVal,i++}return t/i}function G(e,t){var i=ge.gridY-1;return 0>=i||0==Q(i)?!1:te[i][t+e-1]!=te[i][t+e]?!0:!1}function D(e){var t=e,i=0;if(1==Q(ge.gridY))for(;0==F(ge.gridY,t);)i++,t++;else i=ge.maxColumns;return i}function Q(e){return"undefined"==typeof te[e]?!1:!0}function W(e,t,i,n){for(var r=0;r<t.dimHeight;r++)for(var o=0;o<t.dimWidth;o++)0==Q(n+r)&&B(n+r),Y(n+r,i+o,e)}function B(e){te[e]=new Object;for(var t=0;t<ge.maxColumns;t++)te[e][t]=-1}function F(e,t){return-1!=te[e][t]}function Y(e,t,i){te[e][t]=i}function U(e){if(!e)var e=!1;o();for(var t=0;t<ie.length;t++)V(t,e);$.height(ge.maxColHeight),s()}function V(e,t){var i=le.getThumbByIndex(e),n=ie[e],r=n.top*(ge.colWidth+ge.currentGap),o=ge.addX+n.left*(ge.colWidth+ge.currentGap);se.resizeTile(i,n.width,n.height,se.resizemode.VISIBLE_ELEMENTS),ae.placeElement(i,o,r),r+n.height>ge.maxColHeight&&(ge.maxColHeight=r+n.height),1==t&&i.fadeTo(0,1)}function X(){if(1==_e.isFirstTimeRun)return!0;if(0==_e.isAllLoaded)return!1;switch(de.tiles_type){case"columns":c(!1);break;case"justified":b(!1);break;case"nested":var e=oe.isMobileMode();1==e?c(!1):E(!1)}}function Z(){re.on(ne.events.ALL_TILES_LOADED,function(){_e.isAllLoaded=!0}),K.on(oe.events.SIZE_CHANGE,X),K.on(ne.events.TILES_FIRST_PLACED,function(){_e.isFirstPlaced=!1}),se.initEvents()}function q(){switch(J.children(".ug-tile").show(),1==_e.isFirstTimeRun&&Z(),se.run(),de.tiles_type){default:case"columns":m();break;case"justified":y();break;case"nested":I()}_e.isFirstTimeRun=!1}var K,J,$,ee,te,ie,ne=this,re=jQuery(this),oe=new UniteGalleryMain,ae=new UGFunctions,se=new UGTileDesign,le=new UGThumbsGeneral,ue={},de={tiles_type:"columns",tiles_col_width:250,tiles_align:"center",tiles_exact_width:!1,tiles_space_between_cols:3,tiles_space_between_cols_mobile:3,tiles_include_padding:!0,tiles_min_columns:2,tiles_max_columns:0,tiles_keep_order:!1,tiles_set_initial_height:!0,tiles_justified_row_height:150,tiles_justified_space_between:3,tiles_nested_optimal_tile_width:250,tiles_nested_col_width:null,tiles_nested_debug:!1,tiles_enable_transition:!0};this.events={THUMB_SIZE_CHANGE:"thumb_size_change",TILES_FIRST_PLACED:"tiles_first_placed",ALL_TILES_LOADED:"all_tiles_loaded"};var _e={isFirstTimeRun:!0,handle:null,isTransActive:!1,isTransInited:!1,isFirstPlaced:!0,isAllLoaded:!1},ge={colWidth:null,nestedOptimalCols:5,gridY:0,maxColumns:0,columnsValueToEnableHeightResize:3,resizeLeftRightToColumn:!0,currentItem:0,currentGap:null,optimalTileWidth:null,maxGridY:0};this.destroy=function(){K.off(oe.events.SIZE_CHANGE),se.destroy(),K.off(ne.events.TILES_FIRST_PLACED)},this.init=function(t,i){e(t,i)},this.setHtml=function(e){i(e)},this.getObjTileDesign=function(){return se},this.run=function(){q()},this.runNewItems=function(){if(!$)throw new Error("Can't run new items - parent not set");switch(se.setHtml($,!0),se.run(!0),de.tiles_type){case"columns":m();break;default:case"justified":case"nested":throw new Error("Tiles type: "+de.tiles_type+" not support load more yet")}}}function UGTileDesign(){function e(e,i){D=e,L=jQuery(e);var r=D.getObjects();N=r.g_objWrapper,k=D.getArrItems(),B=jQuery.extend(B,F),B=jQuery.extend(B,i),t(),W.init(e,B);var o={allow_onresize:!1},a=["overlay"];Y.funcCustomTileHtml&&(a=[]),W.setCustomThumbs(n,a,o);var s=W.getOptions();B=jQuery.extend(B,s),Y.ratioByWidth=B.tile_width/B.tile_height,Y.ratioByHeight=B.tile_height/B.tile_width,B.tile_size_by==R.sizeby.GLOBAL_RATIO&&Y.isTextpanelOutside&&(Y.hasImageContainer=!0)}function t(){if(1==B.tile_enable_overlay?(B.thumb_overlay_opacity=B.tile_overlay_opacity,B.thumb_overlay_color=B.tile_overlay_color):0==B.tile_enable_icons?B.thumb_color_overlay_effect=!1:B.thumb_overlay_opacity=0,B.tile_as_link&&(B.thumb_wrapper_as_link=!0,B.thumb_link_newpage=B.tile_link_newpage),1==B.tile_enable_outline&&0==B.tile_enable_border&&(B.tile_enable_outline=!1),Y.tileInnerReduce=0,B.tile_enable_border&&(Y.tileInnerReduce=2*B.tile_border_width,W.setThumbInnerReduce(Y.tileInnerReduce)),Y.isSaparateIcons=!Q.isRgbaSupported(),1==B.tile_enable_textpanel){switch(B.tile_textpanel_position){case"top":B.tile_textpanel_align="top";case"bottom":Y.isTextpanelOutside=!0,B.tile_textpanel_always_on=!0,B.tile_textpanel_offset=0;break;case"inside_top":B.tile_textpanel_align="top";break;case"middle":B.tile_textpanel_align="middle",B.tile_textpanel_appear_type="fade"}0==B.tile_textpanel_always_on&&(Y.isSaparateIcons=!0)}0!=B.tile_textpanel_offset&&(B.tile_textpanel_appear_type="fade",B.tile_textpanel_margin=B.tile_textpanel_offset),"title_and_desc"==B.tile_textpanel_source&&(B.tile_textpanel_enable_description=!0,
B.tile_textpanel_desc_style_as_title=!0)}function i(){var e=D.isMobileMode();switch(Y.isTextPanelHidden=!1,1==e&&0==B.tile_textpanel_always_on&&(Y.isTextPanelHidden=!0),Y.isVideoplayIconAlwaysOn=B.tile_videoplay_icon_always_on,B.tile_videoplay_icon_always_on){case"always":Y.isVideoplayIconAlwaysOn=!0;break;case"never":Y.isVideoplayIconAlwaysOn=!1;break;case"mobile_only":Y.isVideoplayIconAlwaysOn=1==e?!0:!1;break;case"desktop_only":Y.isVideoplayIconAlwaysOn=0==e?!0:!1}}function n(e,t){if(e.addClass("ug-tile"),Y.funcCustomTileHtml)return Y.funcCustomTileHtml(e,t),!1;var i="";1==Y.hasImageContainer&&(i+="<div class='ug-image-container ug-trans-enabled'>");var n="ug-thumb-image";(0==B.tile_enable_image_effect||1==B.tile_image_effect_reverse)&&(n+=" ug-trans-enabled");var r=Q.stripTags(t.title);r=Q.htmlentitles(r),i+='<img src="'+Q.escapeDoubleSlash(t.urlThumb)+"\" alt='"+r+"' class='"+n+"'>",1==Y.hasImageContainer&&(i+="</div>"),e.append(i),B.tile_size_by==R.sizeby.GLOBAL_RATIO&&e.fadeTo(0,0);var o={};if(1==B.tile_enable_background&&(o["background-color"]=B.tile_background_color),1==B.tile_enable_border&&(o["border-width"]=B.tile_border_width+"px",o["border-style"]="solid",o["border-color"]=B.tile_border_color,B.tile_border_radius&&(o["border-radius"]=B.tile_border_radius+"px")),1==B.tile_enable_outline&&(o.outline="1px solid "+B.tile_outline_color),1==B.tile_enable_shadow){var a=B.tile_shadow_h+"px ";a+=B.tile_shadow_v+"px ",a+=B.tile_shadow_blur+"px ",a+=B.tile_shadow_spread+"px ",a+=B.tile_shadow_color,o["box-shadow"]=a}e.css(o);var s="";if(B.tile_enable_icons){if(0==B.tile_as_link&&1==B.tile_enable_action){var l="ug-button-play ug-icon-zoom";"image"!=t.type&&(l="ug-button-play ug-icon-play"),s+="<div class='ug-tile-icon "+l+"' style='display:none'></div>"}if(t.link&&1==B.tile_show_link_icon||1==B.tile_as_link)if(0==B.tile_as_link){var u="";1==B.tile_link_newpage&&(u=" target='_blank'"),s+="<a href='"+t.link+"'"+u+" class='ug-tile-icon ug-icon-link'></a>"}else s+="<div class='ug-tile-icon ug-icon-link' style='display:none'></div>";var _=Y.isSaparateIcons;if(0==_&&"image"!=t.type&&1==Y.isVideoplayIconAlwaysOn&&(_=!0),_)var g=e;else var g=e.children(".ug-thumb-overlay");g.append(s);var c=g.children("."+l);0==c.length?c=null:c.hide();var h=g.children(".ug-icon-link");0==h.length?h=null:h.hide(),h||1!=B.tile_enable_action||e.addClass("ug-tile-clickable")}else 1==B.tile_enable_action&&e.addClass("ug-tile-clickable");if(1==B.tile_enable_image_effect){var p="";0==B.tile_image_effect_reverse&&(p=" ug-trans-enabled");var f="<div class='ug-tile-image-overlay"+p+"' >",m=" ug-"+B.tile_image_effect_type+"-effect";f+='<img src="'+Q.escapeDoubleSlash(t.urlThumb)+"\" alt='"+t.title+"' class='"+m+p+"'>",f+="</div>",e.append(f),1==B.tile_image_effect_reverse&&e.children(".ug-tile-image-overlay").fadeTo(0,0)}if(1==B.tile_enable_textpanel){var v=new UGTextPanel;v.init(D,B,"tile");var b="";(1==B.tile_textpanel_always_on||1==Y.isTextpanelOutside)&&(b="ug-trans-enabled"),v.appendHTML(e,b);var y=t.title,I="";switch(B.tile_textpanel_source){case"desc":case"description":y=t.description;break;case"desc_title":""!=t.description&&(y=t.description);break;case"title_and_desc":y=t.title,I=t.description}if(v.setTextPlain(y,I),0==B.tile_textpanel_always_on&&v.getElement().fadeTo(0,0),e.data("objTextPanel",v),1==B.tile_textpanel_always_on){var w=d(e);w.css("z-index",2)}if(1==Y.isTextpanelOutside){var E="<div class='ug-tile-cloneswrapper'></div>";e.append(E);var T=e.children(".ug-tile-cloneswrapper"),S=new UGTextPanel;S.init(D,B,"tile"),S.appendHTML(T),S.setTextPlain(y,I),e.data("objTextPanelClone",S)}}null!==t.addHtml&&e.append(t.addHtml)}function r(e){var t=e.children(".ug-tile-image-overlay");return t}function o(e){var t=e.children(".ug-thumb-overlay");return t}function a(e){if(0==Y.hasImageContainer)return null;var t=e.children(".ug-image-container");return t}function s(e){var t=e.find(".ug-tile-image-overlay img");return t}function l(e){var t=e.data("objTextPanel");return t}function u(e){var t=e.data("objTextPanelClone");return t}function d(e){var t=e.children(".ug-textpanel");return t}function _(e){var t=e.find(".ug-tile-cloneswrapper .ug-textpanel");if(0==t.length)throw new Error("text panel cloned element not found");return t}function g(e){if(1==Y.isTextpanelOutside)var t=_(e);else var t=d(e);if(!t)return 0;var i=Q.getElementSize(t);return i.height}function c(e){var t=e.find(".ug-icon-link");return 0==t.length?null:t}function h(e){var t=Y.ratioByHeight;switch(B.tile_size_by){default:t=Y.ratioByHeight;break;case R.sizeby.IMAGE_RATIO:if(!e)throw new Error("tile should be given for tile ratio");var i=R.getItemByTile(e);if("undefined"!=typeof i.thumbRatioByHeight){if(0==i.thumbRatioByHeight)throw trace(i),new Error("the item ratio not inited yet");t=i.thumbRatioByHeight}break;case R.sizeby.CUSTOM:return null}return t}function p(e){var t=e.find(".ug-button-play");return 0==t.length?null:t}function f(e){return e.hasClass("ug-thumb-over")?!0:!1}function m(e){return e.hasClass("ug-tile-clickable")}function v(e){return 1==B.tile_enable_icons&&1==Y.isVideoplayIconAlwaysOn&&"image"!=e.type?!0:!1}function b(e,t,i,n){var o=r(e),l=R.getTileImage(e),u=s(e);t-=Y.tileInnerReduce,i-=Y.tileInnerReduce;var d=null;if(1==Y.isTextpanelOutside){var _=g(e);if(i-=_,"top"==B.tile_textpanel_position&&(d=_),1==Y.hasImageContainer){var c=a(e);Q.setElementSize(c,t,i),null!==d&&Q.placeElement(c,0,d)}}if(0==B.tile_enable_image_effect)Q.scaleImageCoverParent(l,t,i),0==Y.hasImageContainer&&null!==d&&Q.placeElement(l,0,d);else{var h="nothing";n===!0&&0==Y.isTextpanelOutside&&(h=1==B.tile_image_effect_reverse?"effect":"image"),"effect"!=h&&(Q.setElementSize(o,t,i),null!==d&&Q.placeElement(o,0,d),Q.scaleImageCoverParent(u,t,i)),"image"!=h&&(1==Y.hasImageContainer?Q.scaleImageCoverParent(l,t,i):"effect"==h?(Q.scaleImageCoverParent(l,t,i),null!==d&&Q.placeElement(l,0,d)):Q.cloneElementSizeAndPos(u,l,!1,null,d))}}function y(e,t,i,n){var r=null;if(i&&(r=i-Y.tileInnerReduce),n&&(n-=Y.tileInnerReduce),"clone"==t){var o=u(e);o.refresh(!0,!0,r);var a=R.getItemByTile(e);return a.textPanelCloneSizeSet=!0,!1}var s=l(e);if(!s)return!1;var d=null;1==Y.isTextpanelOutside&&(d=g(e)),s.refresh(!1,!0,r,d);var _=1==B.tile_textpanel_always_on||"fade"==B.tile_textpanel_appear_type;if(_)if(1==Y.isTextpanelOutside&&n&&"bottom"==B.tile_textpanel_position){var c=n-d;s.positionPanel(c)}else s.positionPanel()}function I(e){var t=(R.getItemByTile(e),p(e)),i=c(e),n=Q.getElementSize(e);b(e,n.width,n.height),1==B.tile_enable_textpanel&&y(e,"regular",n.width,n.height);var r=n.width-Y.tileInnerReduce,a=n.height-Y.tileInnerReduce,s=0;if(1==Y.isTextpanelOutside){var l=g(e);a-=l,"top"==B.tile_textpanel_position&&(s=l)}var u=o(e);if(Q.setElementSizeAndPosition(u,0,s,r,a),t||i){var _=0;if(1==B.tile_enable_textpanel&&0==Y.isTextPanelHidden&&0==Y.isTextpanelOutside){var h=d(e),f=Q.getElementSize(h);f.height>0&&(_=Math.floor(f.height/2*-1))}}if(t&&i){var m=Q.getElementSize(t),v=Q.getElementSize(i),I=B.tile_space_between_icons,w=m.width+I+v.width,E=Math.floor((n.width-w)/2);I>E&&(I=Math.floor((n.width-m.width-v.width)/3),w=m.width+I+v.width,E=Math.floor((n.width-w)/2)),Q.placeElement(t,E,"middle",0,_),Q.placeElement(i,E+m.width+I,"middle",0,_)}else t&&Q.placeElement(t,"center","middle",0,_),i&&Q.placeElement(i,"center","middle",0,_);t&&t.show(),i&&i.show()}function w(e,t){var i=(R.getItemByTile(e),r(e)),n=B.thumb_transition_duration;if(0==B.tile_image_effect_reverse){var o=R.getTileImage(e);t?(o.fadeTo(0,1),i.stop(!0).fadeTo(n,0)):i.stop(!0).fadeTo(n,1)}else t?i.stop(!0).fadeTo(n,1):i.stop(!0).fadeTo(n,0)}function E(e,t){var i=B.thumb_transition_duration,n=d(e);if(!n)return!0;if("slide"==B.tile_textpanel_appear_type){var r=Q.getElementSize(n);if(0==r.width)return!1;var o=-r.height,a=0,s={},l={},u="bottom";"inside_top"==B.tile_textpanel_position&&(u="top"),s[u]=o+"px",l[u]=a+"px",1==t?(n.fadeTo(0,1),0==n.is(":animated")&&n.css(s),l.opacity=1,n.stop(!0).animate(l,i)):n.stop(!0).animate(s,i)}else 1==t?n.stop(!0).fadeTo(i,1):n.stop(!0).fadeTo(i,0)}function T(e,t,i){var n=B.thumb_transition_duration;i&&i===!0&&(n=0);var r=p(e),o=c(e),a=t?1:0;r&&r.stop(!0).fadeTo(n,a),o&&o.stop(!0).fadeTo(n,a)}function S(e,t){if(t=jQuery(t),B.tile_enable_image_effect&&w(t,!0),1==B.tile_enable_textpanel&&0==B.tile_textpanel_always_on&&0==Y.isTextPanelHidden&&E(t,!0),Y.isSaparateIcons&&1==B.tile_enable_icons){var i=1==B.thumb_overlay_reverse,n=R.getItemByTile(t);0==v(n)&&T(t,i,!1)}}function P(e,t){if(t=jQuery(t),B.tile_enable_image_effect&&w(t,!1),1==B.tile_enable_textpanel&&0==B.tile_textpanel_always_on&&E(t,!1),1==Y.isSaparateIcons&&1==B.tile_enable_icons){var i=1==B.thumb_overlay_reverse?!1:!0,n=R.getItemByTile(t);0==v(n)?T(t,i,!1):T(t,!0,!0)}}function x(e){var t=W.getThumbs().not(e);t.each(function(e,t){W.setThumbNormalStyle(jQuery(t))})}function j(e,t,i){return t=jQuery(t),1==B.tile_visible_before_image&&t.data("image_placed")!==!0&&i!==!0?!0:(I(t),void W.setThumbNormalStyle(t))}function C(e,t,i){I(t),i.fadeTo(0,1),t.data("image_placed",!0)}function A(e){return 1==m(e)?(G.trigger(R.events.TILE_CLICK,e),!0):void(0==f(e)&&(x(e),W.setThumbOverStyle(e)))}function M(e){var t=jQuery(this),i=t.prop("tagName").toLowerCase(),n=!0;if(Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&(n=!1),"a"==i)0==n&&e.preventDefault();else if(0==f(t))1==n&&A(t);else{if(0==m(t))return!0;1==n&&G.trigger(R.events.TILE_CLICK,t)}}function O(e){e.stopPropagation();var t=jQuery(this).parents(".ug-tile"),i=!0;return Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&(i=!1),0==f(t)?(A(t),!0):1==i?(G.trigger(R.events.TILE_CLICK,t),!1):void 0}function z(e){var t=jQuery(this).parents(".ug-tile");Y.funcParentApproveClick&&0==Y.funcParentApproveClick()&&e.preventDefault(),0==f(t)&&0==B.tile_as_link&&(e.preventDefault(),A(t))}var L,H,N,k,R=this,G=jQuery(this),D=new UniteGalleryMain,Q=new UGFunctions,W=new UGThumbsGeneral;this.resizemode={FULL:"full",WRAPPER_ONLY:"wrapper_only",VISIBLE_ELEMENTS:"visible_elements"},this.sizeby={GLOBAL_RATIO:"global_ratio",TILE_RATIO:"tile_ratio",IMAGE_RATIO:"image_ratio",CUSTOM:"custom"},this.events={TILE_CLICK:"tile_click"};var B={tile_width:250,tile_height:200,tile_size_by:R.sizeby.IMAGE_RATIO,tile_visible_before_image:!1,tile_enable_background:!0,tile_background_color:"#F0F0F0",tile_enable_border:!1,tile_border_width:3,tile_border_color:"#F0F0F0",tile_border_radius:0,tile_enable_outline:!1,tile_outline_color:"#8B8B8B",tile_enable_shadow:!1,tile_shadow_h:1,tile_shadow_v:1,tile_shadow_blur:3,tile_shadow_spread:2,tile_shadow_color:"#8B8B8B",tile_enable_action:!0,tile_as_link:!1,tile_link_newpage:!0,tile_enable_overlay:!0,tile_overlay_opacity:.4,tile_overlay_color:"#000000",tile_enable_icons:!0,tile_show_link_icon:!1,tile_videoplay_icon_always_on:"never",tile_space_between_icons:26,tile_enable_image_effect:!1,tile_image_effect_type:"bw",tile_image_effect_reverse:!1,tile_enable_textpanel:!1,tile_textpanel_source:"title",tile_textpanel_always_on:!1,tile_textpanel_appear_type:"slide",tile_textpanel_position:"inside_bottom",tile_textpanel_offset:0},F={thumb_color_overlay_effect:!0,thumb_overlay_reverse:!0,thumb_image_overlay_effect:!1,tile_textpanel_enable_description:!1,tile_textpanel_bg_opacity:.6,tile_textpanel_padding_top:8,tile_textpanel_padding_bottom:8},Y={ratioByHeight:0,ratioByWidth:0,eventSizeChange:"thumb_size_change",funcCustomTileHtml:null,funcCustomPositionElements:null,funcParentApproveClick:null,isSaparateIcons:!1,tileInnerReduce:0,isTextpanelOutside:!1,hasImageContainer:!1,isVideoplayIconAlwaysOn:!1,isTextPanelHidden:!1};this.loadTileImage=function(e){var t=R.getTileImage(e);Q.checkImagesLoaded(t,null,function(t,i){C(null,e,jQuery(t))})},this.setHtml=function(e,t){H=e,t!==!0&&i(),W.setHtmlThumbs(e,t)},this.initEvents=function(){W.initEvents(),jQuery(W).on(W.events.SETOVERSTYLE,S),jQuery(W).on(W.events.SETNORMALSTYLE,P),jQuery(W).on(W.events.PLACEIMAGE,C),N.on(Y.eventSizeChange,j),H.on("click",".ug-tile",M),H.on("click",".ug-tile .ug-button-play",O),H.on("click",".ug-tile .ug-icon-link",z)},this.destroy=function(){if(H.off("click",".ug-tile"),H.off("click",".ug-tile .ug-button-play"),H.off("click",".ug-tile .ug-icon-link"),jQuery(W).off(W.events.SETOVERSTYLE),jQuery(W).off(W.events.SETNORMALSTYLE),jQuery(W).off(W.events.PLACEIMAGE),N.off(Y.eventSizeChange),1==B.tile_enable_textpanel){var e=W.getThumbs();jQuery.each(e,function(e,t){var i=l(jQuery(t));i&&i.destroy()})}W.destroy()},this.init=function(t,i,n){e(t,i,n)},this.setFixedMode=function(){B.tile_size_by=R.sizeby.GLOBAL_RATIO,B.tile_visible_before_image=!0},this.setApproveClickFunction=function(e){Y.funcParentApproveClick=e},this.resizeTile=function(e,t,i,n){if(1==Y.isTextpanelOutside&&y(e,"clone",t),t){if(!i)var i=R.getTileHeightByWidth(t,e)}else var t=B.tile_width,i=B.tile_height;switch(Q.setElementSize(e,t,i),n){default:case R.resizemode.FULL:R.triggerSizeChangeEvent(e,!0);break;case R.resizemode.WRAPPER_ONLY:return!0;case R.resizemode.VISIBLE_ELEMENTS:if(Y.funcCustomTileHtml)return R.triggerSizeChangeEvent(e,!0),!0;b(e,t,i,!0),1==B.tile_enable_textpanel&&1==B.tile_textpanel_always_on&&t&&y(e,"regular",t,i)}},this.resizeAllTiles=function(e,t,n){i();var r=null;if(B.tile_size_by==R.sizeby.GLOBAL_RATIO&&(r=R.getTileHeightByWidth(e)),!n)var n=W.getThumbs();n.each(function(i,n){R.resizeTile(jQuery(n),e,r,t)})},this.triggerSizeChangeEvent=function(e,t){if(!e)return!1;if(!t)var t=!1;N.trigger(Y.eventSizeChange,[e,t])},this.triggerSizeChangeEventAllTiles=function(e){var t=W.getThumbs();t.each(function(){var t=jQuery(this);R.triggerSizeChangeEvent(t,e)})},this.disableEvents=function(){var e=W.getThumbs();e.css("pointer-events","none")},this.enableEvents=function(){var e=W.getThumbs();e.css("pointer-events","auto")},this.setOptions=function(e){B=jQuery.extend(B,e),W.setOptions(e)},this.setTileSizeOptions=function(e){if(B.tile_size_by!==R.sizeby.GLOBAL_RATIO)throw new Error("setNewTileOptions works with global ration only");B.tile_width=e,B.tile_height=Math.floor(e*Y.ratioByHeight)},this.setCustomFunctions=function(e,t){Y.funcCustomTileHtml=e,Y.funcCustomPositionElements=t},this.run=function(e){var t=W.type.GET_THUMBS_ALL;e===!0&&(t=W.type.GET_THUMBS_NEW);var i=W.getThumbs(t);B.tile_size_by==R.sizeby.GLOBAL_RATIO&&R.resizeAllTiles(B.tile_width,R.resizemode.WRAPPER_ONLY,i),1==B.tile_enable_image_effect&&0==B.tile_image_effect_reverse&&i.children(".ug-thumb-image").fadeTo(0,0),W.setHtmlProperties(i),1==B.tile_visible_before_image&&(i.children(".ug-thumb-image").fadeTo(0,0),W.loadThumbsImages())},this._____________EXTERNAL_GETTERS____________=function(){},this.getObjThumbs=function(){return W},this.getOptions=function(){return B},this.getTileImage=function(e){var t=e.find("img.ug-thumb-image");return t},this.getItemByTile=function(e){return W.getItemByThumb(e)},this.getTileHeightByWidth=function(e,t){var i=h(t);if(null===i)return null;var n=Math.floor((e-Y.tileInnerReduce)*i)+Y.tileInnerReduce;return t&&1==Y.isTextpanelOutside&&B.tile_size_by==R.sizeby.IMAGE_RATIO&&(n+=g(t)),n},this.getTileImageSize=function(e){var t=R.getItemByTile(e);if(!t.thumbWidth||!t.thumbHeight)throw new Error("Can't get image size - image not inited.");var i={width:t.thumbWidth,height:t.thumbHeight};return i},this.getGlobalTileSize=function(){if(B.tile_size_by!=R.sizeby.GLOBAL_RATIO)throw new Error("The size has to be global ratio");var e={width:B.tile_width,height:B.tile_height};return e}}function UGAviaControl(){function e(e){return 0==p?e.pageX:e.pageY}function t(t){jQuery("body").on("touchstart",function(e){return 0==f.isControlEnabled?!0:void(f.touchEnabled=!0)}),jQuery("body").mousemove(function(t){if(0==f.isControlEnabled)return!0;if(1==f.touchEnabled)return jQuery("body").off("mousemove"),!0;f.isMouseInsideStrip=g.ismouseover();var i=u.isTouchMotionActive();if(1==f.isMouseInsideStrip&&0==i){var n=e(t);l(n)}else a()})}function i(e){var t=h.strip_padding_top,i=(h.strip_padding_bottom,g.height()),n=c.height();if(i>n)return null;var r=g.offset(),o=r.top,a=e-o-t;if(0>a)return null;var s=h.thumb_height,l=i-h.thumb_height,u=l-s;s>a&&(a=s),a>l&&(a=l);var d=(a-s)/u,_=(n-i)*d;return _=-1*Math.round(_)+t}function n(e){var t=h.strip_padding_left,i=h.strip_padding_right,n=g.width()-t-i,r=c.width();if(n>r)return null;var o=g.offset(),a=o.left,s=e-a-t,l=h.thumb_width,u=n-h.thumb_width,d=u-l;l>s&&(s=l),s>u&&(s=u);var _=(s-l)/d,p=(r-n)*_;return p=-1*Math.round(p)+t}function r(){if(0==f.is_strip_moving)return!1;var e=u.getInnerStripPos();Math.floor(e)==Math.floor(f.strip_finalPos)&&a();var t,i=Math.abs(f.strip_finalPos-e);1>i?t=i:(t=i/4,t>0&&1>t&&(t=1)),f.strip_finalPos<e&&(t=-1*t);var n=e+t;u.positionInnerStrip(n)}function o(){return 1==f.isStripMoving?!1:(f.isStripMoving=!0,void(f.handle_timeout=setInterval(r,10)))}function a(){return 0==f.isStripMoving?!1:(f.isStripMoving=!1,void(f.handle_timeout=clearInterval(f.handle_timeout)))}function s(e){return 0==p?n(e):i(e)}function l(e){var t=s(e);return null===t?!1:(f.is_strip_moving=!0,f.strip_finalPos=t,void o())}var u,d,_,g,c,h,p,f={touchEnabled:!1,isMouseInsideStrip:!1,strip_finalPos:0,handle_timeout:"",isStripMoving:!1,isControlEnabled:!0};this.enable=function(){f.isControlEnabled=!0},this.disable=function(){f.isControlEnabled=!1},this.init=function(e){u=e,_=e.getObjects(),d=_.g_gallery,g=_.g_objStrip,c=_.g_objStripInner,h=_.g_options,p=_.isVertical,t()},this.destroy=function(){jQuery("body").off("touchstart"),jQuery("body").off("mousemove")}}function UGSlider(){function e(e,t,n){me=e,n&&(he=n,t=we.convertCustomPrefixOptions(t,he,"slider")),te=jQuery(e);var r=me.getObjects();if(ie=r.g_objWrapper,ne=r.g_objThumbs,t.hasOwnProperty("slider_progress_indicator_type")&&(Se.slider_progress_indicator_type=t.slider_progress_indicator_type),"bar"==Se.slider_progress_indicator_type&&(Se=jQuery.extend(Se,Pe)),t&&pe.setOptions(t),i(),1==Se.slider_enable_bullets){ye=new UGBullets;var o={bullets_skin:Se.slider_bullets_skin,bullets_space_between:Se.slider_bullets_space_between};ye.init(me,o)}Se.slider_enable_text_panel&&(Te=new UGTextPanel,Te.init(me,Se,"slider")),Se.slider_enable_zoom_panel&&(ce=new UGZoomButtonsPanel,ce.init(pe,Se));var a=me.getGalleryID();Ie.init(Se,!1,a)}function t(){if(1==xe.isRunOnce)return!1;if(xe.isRunOnce=!0,Se.slider_background_color){var e=Se.slider_background_color;1!=Se.slider_background_opacity&&(e=we.convertHexToRGB(e,Se.slider_background_opacity)),re.css("background-color",e)}else 1!=Se.slider_background_opacity&&(e=we.convertHexToRGB("#000000",Se.slider_background_opacity),re.css("background-color",e));1==Se.slider_control_swipe&&(_e=new UGTouchSliderControl,_e.init(pe,Se)),1==Se.slider_control_zoom&&(ge=new UGZoomSliderControl,ge.init(pe,Se)),Te&&Te.run(),X()}function i(){var e=me.getOptions(),t=e.gallery_skin;""==Se.slider_bullets_skin&&(Se.slider_bullets_skin=t),""==Se.slider_arrows_skin&&(Se.slider_arrows_skin=t),""==Se.slider_zoompanel_skin&&(Se.slider_zoompanel_skin=t),""==Se.slider_play_button_skin&&(Se.slider_play_button_skin=t),""==Se.slider_fullscreen_button_skin&&(Se.slider_fullscreen_button_skin=t),Se.video_enable_closebutton=Se.slider_video_enable_closebutton,"zoom"!=e.gallery_mousewheel_role&&(Se.slider_zoom_mousewheel=!1)}function n(e,t){var i="ug-type-square";"round"==Se.slider_videoplay_button_type&&(i="ug-type-round");var n="";return n+="<div class='ug-slide-wrapper ug-slide"+t+"'>",n+="<div class='ug-item-wrapper'></div>",n+="<div class='ug-slider-preloader "+e+"'></div>",n+="<div class='ug-button-videoplay "+i+"' style='display:none'></div>",n+="</div>"}function r(e){e&&(ie=e);var t=Z(),i=(me.getOptions(),"<div class='ug-slider-wrapper'>");if(i+="<div class='ug-slider-inner'>",i+=n(t,1),i+=n(t,2),i+=n(t,3),i+="</div>",1==Se.slider_enable_arrows&&(i+="<div class='ug-slider-control ug-arrow-left ug-skin-"+Se.slider_arrows_skin+"'></div>",i+="<div class='ug-slider-control ug-arrow-right ug-skin-"+Se.slider_arrows_skin+"'></div>"),1==Se.slider_enable_play_button&&(i+="<div class='ug-slider-control ug-button-play ug-skin-"+Se.slider_play_button_skin+"'></div>"),1==Se.slider_enable_fullscreen_button&&(i+="<div class='ug-slider-control ug-button-fullscreen ug-skin-"+Se.slider_fullscreen_button_skin+"'></div>"),i+="</div>",ie.append(i),re=ie.children(".ug-slider-wrapper"),oe=re.children(".ug-slider-inner"),ae=oe.children(".ug-slide1"),se=oe.children(".ug-slide2"),le=oe.children(".ug-slide3"),ae.data("slidenum",1),se.data("slidenum",2),le.data("slidenum",3),ye&&ye.appendHTML(re),1==Se.slider_enable_arrows&&(ue=re.children(".ug-arrow-left"),de=re.children(".ug-arrow-right")),1==Se.slider_enable_play_button&&(ve=re.children(".ug-button-play")),1==Se.slider_enable_fullscreen_button&&(be=re.children(".ug-button-fullscreen")),1==Se.slider_enable_progress_indicator){Ee=we.initProgressIndicator(Se.slider_progress_indicator_type,Se,re);var r=Ee.getType();"bar"==r&&"pie"==Se.slider_progress_indicator_type&&(Se.slider_progress_indicator_type="bar",Se=jQuery.extend(Se,Pe)),me.setProgressIndicator(Ee)}if(1==Se.slider_enable_text_panel&&(Te.appendHTML(re),0==Se.slider_textpanel_always_on)){var o=Te.getElement();o.hide().data("isHidden",!0),xe.isTextPanelSaparateHover=!0}1==Se.slider_enable_zoom_panel&&ce.appendHTML(re),Ie.setHtml(oe)}function o(e){var t=J(e);we.placeElementInParentCenter(t);var i=$(e);we.placeElementInParentCenter(i)}function a(){if(ye&&(objBullets=ye.getElement(),we.placeElement(objBullets,Se.slider_bullets_align_hor,Se.slider_bullets_align_vert,Se.slider_bullets_offset_hor,Se.slider_bullets_offset_vert),we.placeElement(objBullets,Se.slider_bullets_align_hor,Se.slider_bullets_align_vert,Se.slider_bullets_offset_hor,Se.slider_bullets_offset_vert)),1==Se.slider_enable_arrows&&(we.placeElement(ue,Se.slider_arrow_left_align_hor,Se.slider_arrow_left_align_vert,Se.slider_arrow_left_offset_hor,Se.slider_arrow_left_offset_vert),we.placeElement(de,Se.slider_arrow_right_align_hor,Se.slider_arrow_left_align_vert,Se.slider_arrow_right_offset_hor,Se.slider_arrow_right_offset_vert)),0==Se.slider_controls_always_on&&M(!0),Ee){var e=Ee.getElement();if("bar"==Se.slider_progress_indicator_type){var t=re.width();Ee.setSize(t),we.placeElement(e,"left",Se.slider_progress_indicator_align_vert,0,Se.slider_progress_indicator_offset_vert)}else we.placeElement(e,Se.slider_progress_indicator_align_hor,Se.slider_progress_indicator_align_vert,Se.slider_progress_indicator_offset_hor,Se.slider_progress_indicator_offset_vert)}Te&&Te.positionPanel(),s(),o(ae),o(se),o(le),C()}function s(){if(ve&&we.placeElement(ve,Se.slider_play_button_align_hor,Se.slider_play_button_align_vert,Se.slider_play_button_offset_hor,Se.slider_play_button_offset_vert),be&&we.placeElement(be,Se.slider_fullscreen_button_align_hor,Se.slider_fullscreen_button_align_vert,Se.slider_fullscreen_button_offset_hor,Se.slider_fullscreen_button_offset_vert),ce){var e=ce.getElement();we.placeElement(e,Se.slider_zoompanel_align_hor,Se.slider_zoompanel_align_vert,Se.slider_zoompanel_offset_hor,Se.slider_zoompanel_offset_vert)}}function l(){var e,t,i,n,r=pe.getSlidesReference(),o=0,a=0,s=0;i=pe.isSlideHasItem(r.objNextSlide),n=pe.isSlideHasItem(r.objPrevSlide),n?(s=r.objPrevSlide.outerWidth(),r.objPrevSlide.css("z-index",1)):r.objPrevSlide.hide(),t=s+r.objCurrentSlide.outerWidth(),e=t,i?(e=t+r.objNextSlide.outerWidth(),r.objPrevSlide.css("z-index",2)):r.objNextSlide.hide(),r.objCurrentSlide.css("z-index",3),we.placeElement(r.objCurrentSlide,s,o),oe.css({left:-s+"px",width:e+"px"}),n&&(we.placeElement(r.objPrevSlide,a,o),we.showElement(r.objPrevSlide)),i&&(we.showElement(r.objNextSlide),we.placeElement(r.objNextSlide,t,o))}function u(e){var t=e.data("index");if(void 0===t||null==t)return!1;var i=me.getItem(t);return i?void f(e,i):!1}function d(e){e.stop(!0).show(100)}function _(e){e.stop(!0).hide(100)}function g(e,t){var i=Se.slider_image_border_width;if(10>=i)return i;var n=we.getElementSize(e),r=n.width,o=n.height;if(t&&(t.hasOwnProperty("imageWidth")&&(r=t.imageWidth),t.hasOwnProperty("imageHeight")&&(o=t.imageHeight)),0>=r)return i;var a=o>r?r:o,s=2*i,l=s/a;if(l<Se.slider_image_border_maxratio)return i;var i=a*Se.slider_image_border_maxratio/2;return i=Math.round(i)}function c(e,t,i){var n={};if(1==Se.slider_image_border){n["border-style"]="solid";var r=g(e,i);n["border-width"]=r+"px",n["border-color"]=Se.slider_image_border_color,n["border-radius"]=Se.slider_image_border_radius}"image"!=t&&1==Se.slider_video_constantsize&&(n["background-color"]="#000000"),1==Se.slider_image_shadow&&(n["box-shadow"]="3px 3px 10px 0px #353535"),e.css(n)}function h(e,t){var i=Se.slider_video_constantsize_width,n=Se.slider_video_constantsize_height,r=Se.slider_video_constantsize_scalemode,o=we.scaleImageExactSizeInParent(e,t.imageWidth,t.imageHeight,i,n,r);return o}function p(e,t,i){var n=e.children(".ug-item-wrapper"),r=J(e);if("undefined"==typeof t.urlImage||""==t.urlImage)throw new Error("The slide don't have big image defined ( data-image='imageurl' ). Please check gallery items.","showbig");var o=t.urlImage,a=e.data("urlImage");e.data("urlImage",o);var s=pe.getScaleMode(e),l=pe.getSlideType(e);if(objPadding=pe.getObjImagePadding(),a==o&&i!==!0){var u=n.children("img");(0==t.imageWidth||0==t.imageHeight)&&me.checkFillImageSize(u,t);var g={};g="image"!=l&&1==Se.slider_video_constantsize?h(u,t):we.scaleImageFitParent(u,t.imageWidth,t.imageHeight,s,objPadding),c(u,l,g),fe.trigger(pe.events.AFTER_PUT_IMAGE,e)}else if(u=we.placeImageInsideParent(o,n,t.imageWidth,t.imageHeight,s,objPadding),1==t.isBigImageLoaded){if(u.fadeTo(0,1),_(r),"image"!=l&&1==Se.slider_video_constantsize)var g=h(u,t);else var g=we.getImageInsideParentData(n,t.imageWidth,t.imageHeight,s,objPadding);u.css("width",g.imageWidth+"px"),c(u,l,g),fe.trigger(pe.events.AFTER_PUT_IMAGE,e)}else u.fadeTo(0,0),d(r),e.data("isLoading",!0),pe.isSlideCurrent(e)&&fe.trigger(pe.events.CURRENTSLIDE_LOAD_START),u.data("itemIndex",t.index),u.on("load",function(){var e=jQuery(this),t=e.data("itemIndex");e.fadeTo(0,1);var i=e.parent().parent(),n=pe.getSlideType(i),r=J(i),o=pe.getObjImagePadding(),a=pe.getScaleMode(i);_(r),i.data("isLoading",!1),pe.isSlideCurrent(i)&&fe.trigger(pe.events.CURRENTSLIDE_LOAD_END),me.onItemBigImageLoaded(null,e);var s=me.getItem(t),l={};"image"!=n&&1==Se.slider_video_constantsize?h(e,s):l=we.scaleImageFitParent(e,s.imageWidth,s.imageHeight,a,o),e.fadeTo(0,1),c(e,n,l),fe.trigger(pe.events.AFTER_PUT_IMAGE,i)})}function f(e,t){try{var i=e.children(".ug-item-wrapper");if(null==t)return i.html(""),e.removeData("index"),e.removeData("type"),e.removeData("urlImage"),!1;e.data("index");e.data("index",t.index),e.data("type",t.type),1==Se.slider_enable_links&&"image"==t.type&&(t.link?e.addClass("ug-slide-clickable"):e.removeClass("ug-slide-clickable")),p(e,t);var n=$(e);switch(t.type){case"image":n.hide();break;default:n.show()}}catch(r){throw"undefined"!=typeof r.fileName&&"showbig"==r.fileName&&me.showErrorMessageReplaceGallery(r.message),i.html(""),new Error(r)}}function m(){if(!Te)return!1;if(1==b())return!1;var e=Te.getElement(),t=0;(1==xe.isTextPanelSaparateHover||1==Se.slider_textpanel_always_on)&&(t=Se.slider_controls_appear_duration),e.stop().fadeTo(t,0),e.data("isHidden",!0)}function v(){if(!Te)return!1;if(0==b())return!1;var e=Te.getElement(),t=0;(1==xe.isTextPanelSaparateHover||1==Se.slider_textpanel_always_on)&&(e.show(),Te.positionElements(),t=Se.slider_controls_appear_duration),e.stop().show().fadeTo(t,1),e.data("isHidden",!1)}function b(){var e=Te.getElement(),t=e.data("isHidden");return t===!1?!1:!0}function y(e,t){if(void 0==t)var t=pe.getCurrentSlide();var i=pe.getSlideType(t);if(i!=e)throw new Error("Wrong slide type: "+i+", should be: "+e);return!0}function I(){var e=pe.getCurrentSlide(),t=pe.getSlideImage(e),i=we.getElementSize(e),n=i.left,r=i.top;if(1==Se.slider_video_constantsize){var o=we.getElementSize(t);n+=o.left,r+=o.top}else n+=Se.slider_video_padding_left,r+=Se.slider_video_padding_top;Ie.setPosition(n,r)}function w(){var e=Se.slider_video_constantsize_width,t=Se.slider_video_constantsize_height;Ie.setSize(e,t);var i=Ie.getObject();c(i,"video")}function E(e,t,i){fe.trigger(pe.events.TRANSITION_START);var n=Se.slider_transition;switch(i&&(n=i),pe.stopSlideAction(null,!0),n){default:case"fade":P(t);break;case"slide":T(e,t);break;case"lightbox_open":P(t,!1,!0)}}function T(e,t){var i=pe.isAnimating();if(1==i)return xe.itemWaiting=t,!0;null!=xe.itemWaiting&&(xe.itemWaiting=null);var n=pe.getSlidesReference();switch(e){case"right":f(n.objPrevSlide,t),l();var r=we.getElementSize(n.objPrevSlide),o=-r.left;pe.switchSlideNums("right");break;case"left":f(n.objNextSlide,t),l();var a=we.getElementSize(n.objNextSlide),o=-a.left;pe.switchSlideNums("left");break;default:throw new Error("wrong direction: "+e)}var s=Se.slider_transition_speed,u=Se.slider_transition_easing,d={duration:s,easing:u,queue:!1,always:function(){if(pe.stopSlideAction(),Ie.hide(),null!=xe.itemWaiting){var e=K(xe.itemWaiting);T(e,xe.itemWaiting)}else pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END)}};oe.animate({left:o+"px"},d)}function S(e,t,i){i?e.fadeTo(Se.slider_transition_speed,t,i):e.fadeTo(Se.slider_transition_speed,t)}function P(e,t,i){if(!t)var t=!1;var n=pe.getSlidesReference();f(n.objNextSlide,e);var r=we.getElementSize(n.objCurrentSlide);we.placeElement(n.objNextSlide,r.left,r.top);var o=xe.numCurrent;if(xe.numCurrent=xe.numNext,xe.numNext=o,fe.trigger(pe.events.ITEM_CHANGED),n.objNextSlide.stop(!0),n.objCurrentSlide.stop(!0),1==t)n.objCurrentSlide.fadeTo(0,0),n.objNextSlide.fadeTo(0,1),pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END),i!==!0&&Ie.hide();else{if(n.objNextSlide.fadeTo(0,0),S(n.objCurrentSlide,0,function(){pe.placeNabourItems(),fe.trigger(pe.events.TRANSITION_END),i!==!0&&Ie.hide()}),1==Ie.isVisible()){var a=Ie.getObject();S(a,0)}S(n.objNextSlide,1)}}function x(){1==Se.slider_fullscreen_button_mobilehide&&be&&be.hide(),1==Se.slider_play_button_mobilehide&&ve&&ve.hide(),1==Se.slider_zoompanel_mobilehide&&ce&&ce.getElement().hide()}function j(){1==Se.slider_fullscreen_button_mobilehide&&be&&be.show(),1==Se.slider_play_button_mobilehide&&ve&&ve.show(),1==Se.slider_zoompanel_mobilehide&&ce&&ce.getElement().show()}function C(){var e=me.isMobileMode();e?x():j()}function A(){var e=re.children(".ug-slider-control");return e}function M(e){if(0==we.isTimePassed("sliderControlsToggle"))return!1;if(0==xe.isControlsVisible)return!1;if(!e)var e=!1;var t=A();e===!0?t.stop().fadeTo(0,0).hide():t.stop().fadeTo(Se.slider_controls_appear_duration,0,function(){t.hide()}),xe.isControlsVisible=!1}function O(e){if(0==we.isTimePassed("sliderControlsToggle"))return!1;if(1==xe.isControlsVisible)return!0;if(!e)var e=!1;var t=A();e===!0?t.stop().show():(t.stop().show().fadeTo(0,0),t.fadeTo(Se.slider_controls_appear_duration,1)),xe.isControlsVisible=!0}function z(){0==xe.isControlsVisible?O():M()}function L(e){if(e==xe.currentControlsMode)return!1;switch(e){case"image":ce&&ce.getElement().show();break;case"video":ce&&ce.getElement().hide();break;default:throw new Error("wrong controld mode: "+e)}xe.currentControlsMode=e}function H(e,t,i){var n=me.getSelectedItem();pe.setItem(n,!1,i);var r=n.index;ye&&ye.setActive(r),Te&&0==xe.isTextPanelSaparateHover&&v(),L("image"==n.type?"image":"video")}function N(e,t){me.selectItem(t)}function k(e){return _e&&0==_e.isTapEventOccured(e)?!0:void fe.trigger(pe.events.CLICK,e)}function R(){var e=pe.getCurrentSlide(),t=e.hasClass("ug-slide-clickable"),i=pe.getCurrentItem();return t?(0==Se.slider_links_newpage?location.href=i.link:window.open(i.link,"_blank"),!0):void(0==Se.slider_controls_always_on&&1==Se.slider_controls_appear_ontap&&1==pe.isCurrentSlideType("image")&&(z(),Te&&1==Se.slider_textpanel_always_on&&pe.isCurrentSlideType("image")&&pe.isCurrentSlideImageFit()&&v()))}function G(e){Te&&pe.isCurrentSlideType("image")&&0==pe.isCurrentSlideImageFit()&&m()}function D(){O()}function Q(){
M()}function W(e){var t=e.parent();pe.startSlideAction(t)}function B(){me.isPlayMode()&&me.pausePlaying(),fe.trigger(pe.events.ACTION_START)}function F(){me.isPlayMode()&&me.continuePlaying(),fe.trigger(pe.events.ACTION_END)}function Y(e,t,i){ae.data("index")==t&&(objItem=me.getItem(t),p(ae,objItem,!0)),se.data("index")==t&&(objItem=me.getItem(t),p(se,objItem,!0)),le.data("index")==t&&(objItem=me.getItem(t),p(le,objItem,!0))}function U(e,t){t=jQuery(t);var i=pe.getSlideImage(t),n=$(t),r=we.getElementSize(i);we.placeElement(n,"center","middle",r.left,r.top,i)}function V(e){var t=$(e);we.addClassOnHover(t),we.setButtonOnClick(t,W)}function X(){te.on(me.events.ITEM_IMAGE_UPDATED,Y),te.on(me.events.ITEM_CHANGE,H),ye&&jQuery(ye).on(ye.events.BULLET_CLICK,N),1==Se.slider_enable_arrows&&(we.addClassOnHover(de,"ug-arrow-hover"),we.addClassOnHover(ue,"ug-arrow-hover"),me.setNextButton(de),me.setPrevButton(ue)),0==Se.slider_controls_always_on&&re.hover(D,Q),re.on("touchend click",k),fe.on(pe.events.CLICK,R),Te&&1==xe.isTextPanelSaparateHover&&re.hover(v,m),ve&&(we.addClassOnHover(ve,"ug-button-hover"),me.setPlayButton(ve)),be&&(we.addClassOnHover(be,"ug-button-hover"),me.setFullScreenToggleButton(be)),ge&&fe.on(pe.events.ZOOM_CHANGE,G),ce&&ce.initEvents(),Ie.initEvents(),jQuery(Ie).on(Ie.events.SHOW,B),jQuery(Ie).on(Ie.events.HIDE,F),V(ae),V(se),V(le),fe.on(pe.events.AFTER_PUT_IMAGE,U),re.on("mouseenter",".ug-item-wrapper img",function(e){fe.trigger(pe.events.IMAGE_MOUSEENTER)}),re.on("mouseleave",".ug-item-wrapper img",function(e){var t=pe.isMouseInsideSlideImage(e);0==t&&fe.trigger(pe.events.IMAGE_MOUSELEAVE)})}function Z(){var e;switch(Se.slider_loader_type){default:case 1:e="ug-loader1";break;case 2:e="ug-loader2";break;case 3:e="ug-loader3";break;case 4:e="ug-loader4";break;case 5:e="ug-loader5";break;case 6:e="ug-loader6";break;case 7:e="ug-loader7";break;case 8:e="ug-loader8";break;case 9:e="ug-loader9"}return"black"==Se.slider_loader_color&&(e+=" ug-loader-black"),e}function q(e){switch(e){case 1:return ae;case 2:return se;case 3:return le;default:throw new Error("wrong num: "+e)}}function K(e){var t=pe.getSlidesReference(),i=t.objCurrentSlide.data("index"),n=e.index,r="left";return i>n&&(r="right"),r}function J(e){if(!e)var e=pe.getCurrentSlide();var t=e.children(".ug-slider-preloader");return t}function $(e){var t=e.children(".ug-button-videoplay");return t}function ee(e){if(!e)var e=pe.getCurrentSlide();var t=e.data("index");if(void 0==t)return null;var i=me.getItem(t);return i}var te,ie,ne,re,oe,ae,se,le,ue,de,_e,ge,ce,he,pe=this,fe=jQuery(pe),me=new UniteGalleryMain,ve=null,be=null,ye=null,Ie=new UGVideoPlayer,we=new UGFunctions,Ee=null,Te=null;this.events={ITEM_CHANGED:"item_changed",BEFORE_SWITCH_SLIDES:"before_switch",BEFORE_RETURN:"before_return",AFTER_RETURN:"after_return",ZOOM_START:"slider_zoom_start",ZOOM_END:"slider_zoom_end",ZOOMING:"slider_zooming",ZOOM_CHANGE:"slider_zoom_change",START_DRAG:"start_drag",AFTER_DRAG_CHANGE:"after_drag_change",ACTION_START:"action_start",ACTION_END:"action_end",CLICK:"slider_click",TRANSITION_START:"slider_transition_start",TRANSITION_END:"slider_transition_end",AFTER_PUT_IMAGE:"after_put_image",IMAGE_MOUSEENTER:"slider_image_mouseenter",IMAGE_MOUSELEAVE:"slider_image_mouseleave",CURRENTSLIDE_LOAD_START:"slider_current_loadstart",CURRENTSLIDE_LOAD_END:"slider_current_loadend"};var Se={slider_scale_mode:"fill",slider_scale_mode_media:"fill",slider_scale_mode_fullscreen:"down",slider_item_padding_top:0,slider_item_padding_bottom:0,slider_item_padding_left:0,slider_item_padding_right:0,slider_background_color:"",slider_background_opacity:1,slider_image_padding_top:0,slider_image_padding_bottom:0,slider_image_padding_left:0,slider_image_padding_right:0,slider_image_border:!1,slider_image_border_width:10,slider_image_border_color:"#ffffff",slider_image_border_radius:0,slider_image_border_maxratio:.35,slider_image_shadow:!1,slider_video_constantsize:!1,slider_video_constantsize_scalemode:"fit",slider_video_constantsize_width:854,slider_video_constantsize_height:480,slider_video_padding_top:0,slider_video_padding_bottom:0,slider_video_padding_left:0,slider_video_padding_right:0,slider_video_enable_closebutton:!0,slider_transition:"slide",slider_transition_speed:300,slider_transition_easing:"easeInOutQuad",slider_control_swipe:!0,slider_control_zoom:!0,slider_zoom_mousewheel:!0,slider_vertical_scroll_ondrag:!1,slider_loader_type:1,slider_loader_color:"white",slider_enable_links:!0,slider_links_newpage:!1,slider_enable_bullets:!1,slider_bullets_skin:"",slider_bullets_space_between:-1,slider_bullets_align_hor:"center",slider_bullets_align_vert:"bottom",slider_bullets_offset_hor:0,slider_bullets_offset_vert:10,slider_enable_arrows:!0,slider_arrows_skin:"",slider_arrow_left_align_hor:"left",slider_arrow_left_align_vert:"middle",slider_arrow_left_offset_hor:20,slider_arrow_left_offset_vert:0,slider_arrow_right_align_hor:"right",slider_arrow_right_align_vert:"middle",slider_arrow_right_offset_hor:20,slider_arrow_right_offset_vert:0,slider_enable_progress_indicator:!0,slider_progress_indicator_type:"pie",slider_progress_indicator_align_hor:"right",slider_progress_indicator_align_vert:"top",slider_progress_indicator_offset_hor:10,slider_progress_indicator_offset_vert:10,slider_enable_play_button:!0,slider_play_button_skin:"",slider_play_button_align_hor:"left",slider_play_button_align_vert:"top",slider_play_button_offset_hor:40,slider_play_button_offset_vert:8,slider_play_button_mobilehide:!1,slider_enable_fullscreen_button:!0,slider_fullscreen_button_skin:"",slider_fullscreen_button_align_hor:"left",slider_fullscreen_button_align_vert:"top",slider_fullscreen_button_offset_hor:11,slider_fullscreen_button_offset_vert:9,slider_fullscreen_button_mobilehide:!1,slider_enable_zoom_panel:!0,slider_zoompanel_skin:"",slider_zoompanel_align_hor:"left",slider_zoompanel_align_vert:"top",slider_zoompanel_offset_hor:12,slider_zoompanel_offset_vert:92,slider_zoompanel_mobilehide:!1,slider_controls_always_on:!1,slider_controls_appear_ontap:!0,slider_controls_appear_duration:300,slider_enable_text_panel:!0,slider_textpanel_always_on:!0,slider_videoplay_button_type:"square"},Pe={slider_progress_indicator_align_hor:"left",slider_progress_indicator_align_vert:"bottom",slider_progress_indicator_offset_hor:0,slider_progress_indicator_offset_vert:0},xe={isRunOnce:!1,isTextPanelSaparateHover:!1,numPrev:1,numCurrent:2,numNext:3,isControlsVisible:!0,currentControlsMode:"image"};this.switchSlideNums=function(e){switch(fe.trigger(pe.events.BEFORE_SWITCH_SLIDES),e){case"left":var t=xe.numCurrent;xe.numCurrent=xe.numNext,xe.numNext=xe.numPrev,xe.numPrev=t;break;case"right":var t=xe.numCurrent;xe.numCurrent=xe.numPrev,xe.numPrev=xe.numNext,xe.numNext=t;break;default:throw new Error("wrong direction: "+e)}fe.trigger(pe.events.ITEM_CHANGED)},this.destroy=function(){fe.off(pe.events.AFTER_PUT_IMAGE),te.off(me.events.ITEM_IMAGE_UPDATED),te.off(me.events.ITEM_CHANGE),ye&&jQuery(ye).on(ye.events.BULLET_CLICK),re.off("mouseenter"),re.off("mouseleave"),re.off("touchend"),re.off("click"),fe.off(pe.events.CLICK),ge&&fe.off(pe.events.ZOOM_CHANGE),fe.off(pe.events.BEFORE_SWITCH_SLIDES),jQuery(Ie).off(Ie.events.SHOW),jQuery(Ie).off(Ie.events.HIDE),Ie.destroy(),re.off("mouseenter",".ug-item-wrapper img"),re.off("mouseleave",".ug-item-wrapper img")},this.________EXTERNAL_GENERAL___________=function(){},this.init=function(t,i,n){e(t,i,n)},this.getSlideImage=function(e){if(!e)var e=pe.getCurrentSlide();var t=e.find(".ug-item-wrapper img");return t},this.setHtml=function(e){r(e)},this.run=function(){t()},this.isInnerInPlace=function(){var e=pe.getSlidesReference(),t=we.getElementSize(e.objCurrentSlide),i=-t.left,n=we.getElementSize(oe);return i==n.left?!0:!1},this.isAnimating=function(){var e=oe.is(":animated");return e},this.isSlideCurrent=function(e){var t=e.data("slidenum");return xe.numCurrent==t?!0:!1},this.isSlideHasItem=function(e){var t=e.data("index");return void 0===t||null===t?!1:!0},this.getObjImagePadding=function(){var e={padding_top:Se.slider_image_padding_top,padding_bottom:Se.slider_image_padding_bottom,padding_left:Se.slider_image_padding_left,padding_right:Se.slider_image_padding_right};return e},this.getSlidesReference=function(){var e={objPrevSlide:q(xe.numPrev),objNextSlide:q(xe.numNext),objCurrentSlide:q(xe.numCurrent)};return e},this.getCurrentSlide=function(){var e=pe.getSlidesReference();return e.objCurrentSlide},this.getCurrentItemIndex=function(){var e=pe.getSlidesReference(),t=e.objCurrentSlide.data("index");return(null===t||void 0===t)&&(t=-1),t},this.getCurrentItem=function(){var e=pe.getCurrentItemIndex();if(-1==e)return null;var t=me.getItem(e);return t},this.getSlideType=function(e){void 0==e&&(e=pe.getCurrentSlide());var t=e.data("type");return t},this.isMouseInsideSlideImage=function(e){var t=pe.getSlideImage(),i=we.getMousePosition(e);void 0===i.pageX&&(i=_e.getLastMousePos());var n=we.getMouseElementPoint(i,t),r=we.getElementSize(t);return isMouseInside=we.isPointInsideElement(n,r),isMouseInside},this.isCurrentSlideType=function(e){var t=pe.getSlideType();return t==e?!0:!1},this.isCurrentSlideLoadingImage=function(){var e=pe.getCurrentSlide(),t=e.data("isLoading");return t===!0?!0:!1},this.setItem=function(e,t,i){var n=pe.getSlidesReference(),r=n.objCurrentSlide.data("index"),o=e.index;if(o==r)return!0;var a=void 0==r;if(a)f(n.objCurrentSlide,e),pe.placeNabourItems();else{var s="left";me.getNumItems();"next"==i?s="left":"prev"==i||r>o?s="right":r>o&&(s="right"),E(s,e,t)}},this.placeNabourItems=function(){var e=pe.getSlidesReference(),t=e.objCurrentSlide.data("index"),i=me.getPrevItem(t),n=me.getNextItem(t);f(e.objNextSlide,n),f(e.objPrevSlide,i),l()},this.________EXTERNAL_API___________=function(){},this.stopSlideAction=function(e,t){e||(e=pe.getCurrentSlide()),t===!0?Ie.pause():Ie.hide()},this.startSlideAction=function(e){e||(e=pe.getCurrentSlide());var t=ee(e);if("image"==t.type)return!0;switch(1==Se.slider_video_constantsize&&w(),I(),Ie.show(),t.type){case"youtube":Ie.playYoutube(t.videoid);break;case"vimeo":Ie.playVimeo(t.videoid);break;case"html5video":Ie.playHtml5Video(t.videoogv,t.videowebm,t.videomp4,t.urlImage);break;case"soundcloud":Ie.playSoundCloud(t.trackid);break;case"wistia":Ie.playWistia(t.videoid)}},this.getScaleMode=function(e){if(!e)var e=pe.getCurrentSlide();var t=pe.getSlideType(e);return"image"!=t?Se.slider_scale_mode_media:Se.slider_scale_mode==Se.slider_scale_mode_fullscreen?Se.slider_scale_mode:1==me.isFullScreen()?Se.slider_scale_mode_fullscreen:Se.slider_scale_mode},this.getObjects=function(){var e={g_objSlider:re,g_objInner:oe,g_options:Se,g_objZoomSlider:ge};return e},this.getObjZoom=function(){return ge},this.getOptions=function(){return Se},this.getElement=function(){return re},this.getVideoObject=function(){return Ie},this.isCurrentSlideImageFit=function(){var e=pe.getCurrentSlide();pe.getSlideType(e);y("image",e);var t=pe.getSlideImage(e);if(0==t.length)return!1;var i=we.isImageFitParent(t);return i},this.isCurrentImageInPlace=function(){var e=pe.getSlideImage();if(0==e.length)return!1;var t=pe.getScaleMode(),i=pe.getObjImagePadding(),n=ee(),r=e.parent(),o=we.getImageInsideParentData(r,n.imageWidth,n.imageHeight,t,i),a=we.getElementSize(e),s=!1;return o.imageWidth==a.width&&(s=!0),s},this.isSlideActionActive=function(){return Ie.isVisible()},this.isSwiping=function(){if(!_e)return!1;var e=_e.isTouchActive();return e},this.isPreloading=function(){var e=J();return e.is(":visible")?!0:!1},this.setOptions=function(e){he&&(e=we.convertCustomPrefixOptions(e,he,"slider")),Se=jQuery.extend(Se,e)},this.setSize=function(e,t){if(0>e||0>t)return!0;var i={};i.width=e+"px",i.height=t+"px",re.css(i);var n={};n.height=t+"px",n.top="0px",n.left="0px",oe.css(n);var r={};r.height=t+"px",r.width=e+"px",ae.css(r),se.css(r),le.css(r);var o=e-Se.slider_item_padding_left-Se.slider_item_padding_right,s=t-Se.slider_item_padding_top-Se.slider_item_padding_bottom,d={};d.width=o+"px",d.height=s+"px",d.top=Se.slider_item_padding_top+"px",d.left=Se.slider_item_padding_left+"px",re.find(".ug-item-wrapper").css(d),Te&&Te.setSizeByParent(),a(),u(ae),u(se),u(le),l();var _=pe.getSlideType();if("image"!=_&&1==Se.slider_video_constantsize)w();else{var g=e-Se.slider_video_padding_left-Se.slider_video_padding_right,c=t-Se.slider_video_padding_top-Se.slider_video_padding_bottom;Ie.setSize(g,c)}I()},this.refreshSlideItems=function(){return 1==pe.isAnimating()?!0:(u(ae),u(se),u(le),void l())},this.isMouseOver=function(){return re.ismouseover()},this.setPosition=function(e,t){we.placeElement(re,e,t)},this.zoomIn=function(){return ge?void ge.zoomIn():!0},this.zoomOut=function(){return ge?void ge.zoomOut():!0},this.zoomBack=function(){return ge?void ge.zoomBack():!0}}function UGTextPanel(){function e(e,t){if(!t)var t=v.textpanel_padding_top;var i=t;if(d){var n=i;f.placeElement(d,0,n);var o=d.is(":visible");if(1==o){var a=f.getElementSize(d),i=a.bottom;i>0&&(b.lastTitleBottom=i)}else{var i=20;b.lastTitleBottom>0&&(i=b.lastTitleBottom)}}var s="";if(_&&(s=jQuery.trim(_.text())),""!=s){var l=i;d&&(l+=v.textpanel_padding_title_description),f.placeElement(_,0,l);var u=jQuery(_).is(":visible");if(1==u){var g=f.getElementSize(_);i=g.bottom,g.height>0&&(b.lastDescHeight=g.height)}else{var c=16;b.lastDescHeight>0&&(c=b.lastDescHeight),i=l+c}}if(!v.textpanel_height&&1==b.setInternalHeight){var h=i+v.textpanel_padding_bottom;r(h,e)}}function t(){var e=0;if(d&&(e+=d.outerHeight()),_){var t="";_&&(t=jQuery.trim(_.text())),""!=t&&(d&&(e+=v.textpanel_padding_title_description),e+=_.outerHeight())}return e}function i(){var i=t(),n=(c.height()-i)/2;e(!1,n)}function n(){var i=t(),n=c.height()-i-v.textpanel_padding_bottom;e(!1,n)}function r(e,t){if(!t)var t=!1;if(1==t){if(g){var i=g.height();e>i&&g.height(e)}var n={height:e+"px"};l.add(c).animate(n,v.textpanel_fade_duration)}else g&&g.height(e),l.add(c).height(e)}function o(){if(1==v.textpanel_enable_bg){g=l.children(".ug-textpanel-bg"),g.fadeTo(0,v.textpanel_bg_opacity);var e={"background-color":v.textpanel_bg_color};e=jQuery.extend(e,v.textpanel_bg_css),g.css(e)}if(1==v.textpanel_enable_title){d=c.children(".ug-textpanel-title");var t={};null!==v.textpanel_title_color&&(t.color=v.textpanel_title_color),null!==v.textpanel_title_font_family&&(t["font-family"]=v.textpanel_title_font_family),null!==v.textpanel_title_text_align&&(t["text-align"]=v.textpanel_title_text_align),null!==v.textpanel_title_font_size&&(t["font-size"]=v.textpanel_title_font_size+"px"),null!==v.textpanel_title_bold&&(v.textpanel_title_bold===!0?t["font-weight"]="bold":t["font-weight"]="normal"),v.textpanel_css_title&&(t=jQuery.extend(t,v.textpanel_css_title)),d.css(t)}if(1==v.textpanel_enable_description){_=c.children(".ug-textpanel-description");var i={};null!==v.textpanel_desc_color&&(i.color=v.textpanel_desc_color),null!==v.textpanel_desc_font_family&&(i["font-family"]=v.textpanel_desc_font_family),null!==v.textpanel_desc_text_align&&(i["text-align"]=v.textpanel_desc_text_align),null!==v.textpanel_desc_font_size&&(i["font-size"]=v.textpanel_desc_font_size+"px"),null!==v.textpanel_desc_bold&&(v.textpanel_desc_bold===!0?i["font-weight"]="bold":i["font-weight"]="normal"),v.textpanel_css_title&&(i=jQuery.extend(i,v.textpanel_css_description)),_.css(i)}}function a(){var e=h.getSelectedItem();p.setText(e.title,e.description)}function s(){jQuery(h).on(h.events.ITEM_CHANGE,a)}var l,u,d,_,g,c,h,p=this,f=new UGFunctions,m="",v={textpanel_align:"bottom",textpanel_margin:0,textpanel_text_valign:"middle",textpanel_padding_top:10,textpanel_padding_bottom:10,textpanel_height:null,textpanel_padding_title_description:5,textpanel_padding_right:11,textpanel_padding_left:11,textpanel_fade_duration:200,textpanel_enable_title:!0,textpanel_enable_description:!0,textpanel_enable_bg:!0,textpanel_bg_color:"#000000",textpanel_bg_opacity:.4,textpanel_title_color:null,textpanel_title_font_family:null,textpanel_title_text_align:null,textpanel_title_font_size:null,textpanel_title_bold:null,textpanel_css_title:{},textpanel_desc_color:null,textpanel_desc_font_family:null,textpanel_desc_text_align:null,textpanel_desc_font_size:null,textpanel_desc_bold:null,textpanel_css_description:{},textpanel_desc_style_as_title:!1,textpanel_bg_css:{}},b={isFirstTime:!0,setInternalHeight:!0,lastTitleBottom:0,lastDescHeight:0};this.positionElements=function(t){if(!v.textpanel_height||"top"==v.textpanel_text_valign)return e(t),!1;switch(v.textpanel_text_valign){default:case"top":e(!1);break;case"bottom":n();break;case"center":case"middle":i()}},this.init=function(e,t,i){if(h=e,i&&(m=i,t=f.convertCustomPrefixOptions(t,m,"textpanel")),t&&(v=jQuery.extend(v,t)),0==v.textpanel_enable_title&&0==v.textpanel_enable_description)throw new Error("Textpanel Error: The title or description must be enabled");v.textpanel_height&&v.textpanel_height<0&&(v.textpanel_height=null),1==v.textpanel_desc_style_as_title&&(v.textpanel_desc_color||(v.textpanel_desc_color=v.textpanel_title_color),v.textpanel_desc_bold||(v.textpanel_desc_bold=v.textpanel_title_bold),v.textpanel_desc_font_family||(v.textpanel_desc_font_family=v.textpanel_title_font_family),v.textpanel_desc_font_size||(v.textpanel_desc_font_size=v.textpanel_title_font_size),v.textpanel_desc_text_align||(v.textpanel_desc_text_align=v.textpanel_title_text_align))},this.appendHTML=function(e,t){u=e,t=t?" "+t:"";var i="<div class='ug-textpanel"+t+"'>";1==v.textpanel_enable_bg&&(i+="<div class='ug-textpanel-bg"+t+"'></div>"),i+="<div class='ug-textpanel-textwrapper"+t+"'>",1==v.textpanel_enable_title&&(i+="<div class='ug-textpanel-title"+t+"'></div>"),1==v.textpanel_enable_description&&(i+="<div class='ug-textpanel-description"+t+"'></div>"),i+="</div></div>",e.append(i),l=e.children(".ug-textpanel"),c=l.children(".ug-textpanel-textwrapper"),o()},this.destroy=function(){jQuery(h).off(h.events.ITEM_CHANGE)},this.run=function(){p.setSizeByParent(),s()},this.setPanelSize=function(e,t){if(b.setInternalHeight=!0,t)b.setInternalHeight=!1;else var t=80;v.textpanel_height&&(t=v.textpanel_height),l.width(e),l.height(t),g&&(g.width(e),g.height(t));var i=e-v.textpanel_padding_left-v.textpanel_padding_right,n=v.textpanel_padding_left;f.setElementSizeAndPosition(c,n,0,i,t),d&&d.width(i),_&&_.width(i),0==b.isFirstTime&&p.positionElements(!1)},this.setSizeByParent=function(){var e=f.getElementSize(u);p.setPanelSize(e.width)},this.setTextPlain=function(e,t){d&&d.html(e),_&&_.html(t)},this.setText=function(e,t){1==b.isFirstTime?(p.setTextPlain(e,t),b.isFirstTime=!1,p.positionElements(!1)):c.stop().fadeTo(v.textpanel_fade_duration,0,function(){p.setTextPlain(e,t),p.positionElements(!0),jQuery(this).fadeTo(v.textpanel_fade_duration,1)})},this.positionPanel=function(e,t){var i={};if(void 0!==e&&null!==e)i.top=e,i.bottom="auto";else switch(v.textpanel_align){case"top":i.top=v.textpanel_margin+"px";break;case"bottom":i.top="auto",i.bottom=v.textpanel_margin+"px";break;case"middle":i.top=f.getElementRelativePos(l,"middle",v.textpanel_margin)}void 0!==t&&null!==t&&(i.left=t),l.css(i)},this.setOptions=function(e){m&&(e=f.convertCustomPrefixOptions(e,m,"textpanel")),v=jQuery.extend(v,e)},this.getElement=function(){return l},this.getSize=function(){var e=f.getElementSize(l);return e},this.refresh=function(e,t,i,n){o(),i?p.setPanelSize(i,n):p.setSizeByParent(),p.positionElements(!1),t!==!0&&p.positionPanel(),e===!0&&p.show()},this.hide=function(){l.hide()},this.show=function(){l.show()},this.getOptions=function(){return v},this.getOption=function(e){return 0==v.hasOwnProperty(e)?null:v[e]}}function UGZoomButtonsPanel(){function e(e){return e?e.hasClass("ug-zoompanel-button-disabled")?!0:!1:!0}function t(e){e&&e.addClass("ug-zoompanel-button-disabled")}function i(e){e&&e.removeClass("ug-zoompanel-button-disabled")}function n(){if(0==d.isCurrentSlideType("image"))return!0;var n=d.isCurrentSlideImageFit();1==n?0==e(s)&&(t(s),t(l)):1==e(s)&&(i(s),i(l))}var r,o,a,s,l,u=this,d=new UGSlider,_=new UGFunctions,g={slider_zoompanel_skin:""};this.init=function(e,t){d=e,t&&(g=jQuery.extend(g,t))},this.appendHTML=function(e){o=e;var t="<div class='ug-slider-control ug-zoompanel ug-skin-"+g.slider_zoompanel_skin+"'>";t+="<div class='ug-zoompanel-button ug-zoompanel-plus'></div>",t+="<div class='ug-zoompanel-button ug-zoompanel-minus ug-zoompanel-button-disabled'></div>",t+="<div class='ug-zoompanel-button ug-zoompanel-return ug-zoompanel-button-disabled'></div>",t+="</div>",e.append(t),r=e.children(".ug-zoompanel"),a=r.children(".ug-zoompanel-plus"),s=r.children(".ug-zoompanel-minus"),l=r.children(".ug-zoompanel-return")},this.setObjects=function(e,t,i){a=e,s=t,l=i,s&&s.addClass("ug-zoompanel-button-disabled"),l&&l.addClass("ug-zoompanel-button-disabled")},this.getElement=function(){return r},u.initEvents=function(){_.addClassOnHover(a,"ug-button-hover"),_.addClassOnHover(s,"ug-button-hover"),_.addClassOnHover(l,"ug-button-hover"),_.setButtonOnClick(a,function(){return 1==e(a)?!0:void d.zoomIn()}),_.setButtonOnClick(s,function(){return 1==e(s)?!0:void d.zoomOut()}),_.setButtonOnClick(l,function(){return 1==e(l)?!0:void d.zoomBack()}),jQuery(d).on(d.events.ZOOM_CHANGE,n),jQuery(d).on(d.events.ITEM_CHANGED,n)}}function UGBullets(){function e(){var e="",t="";-1!=h.bullets_space_between&&(t=" style='margin-left:"+h.bullets_space_between+"px'");for(var i=0;u>i;i++)e+=0==i?"<div class='ug-bullet'></div>":"<div class='ug-bullet'"+t+"></div>";if(o.html(e),!s){var n=o.find(".ug-bullet:first-child");n.length&&(s=n.width())}}function t(e){if(1==l.isActive(e))return!0;var t=e.index();jQuery(l).trigger(l.events.BULLET_CLICK,t)}function i(){var e=o.children(".ug-bullet");g.setButtonOnClick(e,t),e.on("mousedown mouseup",function(e){return!1})}function n(e){if(0>e||e>=u)throw new Error("wrong bullet index: "+e)}function r(){if(1==c.isInited)return!0;throw new Error("The bullets are not inited!")}var o,a,s,l=this,u=0,d=new UniteGalleryMain,_=-1,g=new UGFunctions,c={isInited:!1},h={bullets_skin:"",bullets_addclass:"",bullets_space_between:-1};this.events={BULLET_CLICK:"bullet_click"},this.init=function(e,t,i){d=e,u=i?i:d.getNumItems(),c.isInited=!0,h=jQuery.extend(h,t),""==h.bullets_skin&&(h.bullets_skin=h.gallery_skin)},this.getBulletsWidth=function(){if(0==u)return 0;if(!s)return 0;var e=u*s+(u-1)*h.bullets_space_between;return e},this.appendHTML=function(t){a=t,r();var n="";""!=h.bullets_addclass&&(n=" "+h.bullets_addclass);var s="<div class='ug-slider-control ug-bullets ug-skin-"+h.bullets_skin+n+"'>";s+="</div>",o=jQuery(s),t.append(o),e(),i()},this.updateNumBullets=function(t){u=t,e(),i()},this.getElement=function(){return o},this.setActive=function(e){r(),n(e);var t=o.children(".ug-bullet");t.removeClass("ug-bullet-active");var i=jQuery(t[e]);i.addClass("ug-bullet-active"),_=e},this.isActive=function(e){if(n(e),"number"!=typeof e)var t=e;else var t=o.children(".ug-bullet")[e];return t.hasClass("ug-bullet-active")?!0:!1},this.getNumBullets=function(){return u}}function UGProgressBar(){var e,t,i=this,n=0,r=new UGFunctions,o={slider_progressbar_color:"#ffffff",slider_progressbar_opacity:.6,slider_progressbar_line_width:5};this.put=function(i,n){n&&(o=jQuery.extend(o,n)),i.append("<div class='ug-progress-bar'><div class='ug-progress-bar-inner'></div></div>"),e=i.children(".ug-progress-bar"),t=e.children(".ug-progress-bar-inner"),t.css("background-color",o.slider_progressbar_color),e.height(o.slider_progressbar_line_width),t.height(o.slider_progressbar_line_width),t.width("0%");var r=o.slider_progressbar_opacity,a=t[0];a.style.opacity=r,a.style.filter="alpha(opacity="+100*r+")"},this.putHidden=function(t,n){i.put(t,n),e.hide()},this.getElement=function(){return e},this.setSize=function(n){e.width(n),t.width(n),i.draw()},this.setPosition=function(t,i,n,o){r.placeElement(e,t,i,n,o)},this.draw=function(){var e=100*n;t.width(e+"%")},this.setProgress=function(e){n=r.normalizePercent(e),i.draw()},this.getType=function(){return"bar"}}function UGProgressPie(){function e(e){if(!e)var e=0;var t=Math.min(a.slider_progresspie_width,a.slider_progresspie_height)/2,n=i[0].getContext("2d");0==r&&(r=!0,n.rotate(1.5*Math.PI),n.translate(-2*t,0)),n.clearRect(0,0,a.slider_progresspie_width,a.slider_progresspie_height);var o=a.slider_progresspie_width/2,s=a.slider_progresspie_height/2,l=0,u=e*Math.PI*2;if(1==a.slider_progresspie_type_fill)n.beginPath(),n.moveTo(o,s),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath();else{n.globalCompositeOperation="source-over",n.beginPath(),n.moveTo(o,s),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath(),n.globalCompositeOperation="destination-out";var d=t-a.slider_progresspie_stroke_width;n.beginPath(),n.moveTo(o,s),n.arc(o,s,d,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color1,n.fill(),n.closePath()}1==a.slider_progresspie_type_fill&&(l=u,u=2*Math.PI,n.beginPath(),n.arc(o,s,t,l,u),n.lineTo(o,s),n.fillStyle=a.slider_progresspie_color2,n.fill(),n.closePath())}var t,i,n=this,r=!1,o=new UGFunctions,a={slider_progresspie_type_fill:!1,slider_progresspie_color1:"#B5B5B5",slider_progresspie_color2:"#E5E5E5",slider_progresspie_stroke_width:6,slider_progresspie_width:30,slider_progresspie_height:30};this.put=function(e,t){t&&(a=jQuery.extend(a,t)),e.append("<canvas class='ug-canvas-pie' width='"+a.slider_progresspie_width+"' height='"+a.slider_progresspie_height+"'></canvas>"),i=e.children(".ug-canvas-pie")},this.putHidden=function(t,r){n.put(t,r),e(.1),i.hide()},this.getElement=function(){return i},this.setPosition=function(e,t){o.placeElement(i,e,t)},this.getSize=function(){var e={width:a.slider_progresspie_width,height:a.slider_progresspie_height};return e},this.setProgress=function(i){i=o.normalizePercent(i),t=i,e(i)},this.getType=function(){return"pie"}}function UGTouchSliderControl(){function e(e){if(!e)var e=m.getSlidesReference();var t=v.getElementSize(e.objCurrentSlide),i=-t.left,n=v.getElementSize(h),r=i-n.left;return r}function t(){var t=m.getSlidesReference(),i=e(t),n=Math.round(3*t.objCurrentSlide.width()/8);if(Math.abs(i)>=n)return!0;var r=Math.abs(b.lastMouseX-b.startMouseX);Math.abs(b.lastMouseY-b.startMouseY);if(20>r)return!1;var o=jQuery.now(),a=o-b.startTime;return 500>a?!0:!1}function i(e){if(1==m.isInnerInPlace())return!1;if(p.trigger(m.events.BEFORE_RETURN),!e)var e=m.getSlidesReference();var t=v.getElementSize(e.objCurrentSlide),i=-t.left;h.animate({left:i+"px"},{duration:f.slider_transition_return_speed,easing:f.slider_transition_continuedrag_easing,queue:!1,progress:function(e,t,n){if(1==b.isDragVideo){var r=v.getElementSize(h),o=r.left,a=o-i,s=b.videoStartX+a;b.videoObject.css("left",s)}},complete:function(){p.trigger(m.events.AFTER_RETURN)}})}function n(e){m.getVideoObject().hide(),m.switchSlideNums(e),m.placeNabourItems()}function r(){var t=m.getSlidesReference(),r=e(t);if(0==r)return!1;var o=r>0?"left":"right",a=!1;switch(o){case"right":if(m.isSlideHasItem(t.objPrevSlide))var s=v.getElementSize(t.objPrevSlide),l=-s.left;else a=!0;break;case"left":if(m.isSlideHasItem(t.objNextSlide))var u=v.getElementSize(t.objNextSlide),l=-u.left;else a=!0}1==a?i(t):h.stop().animate({left:l+"px"},{duration:f.slider_transition_continuedrag_speed,easing:f.slider_transition_continuedrag_easing,queue:!1,progress:function(){if(1==b.isDragVideo){var e=v.getElementSize(h),t=e.left,i=t-b.startPosx,n=b.videoStartX+i;b.videoObject.css("left",n)}},always:function(){n(o),p.trigger(m.events.AFTER_DRAG_CHANGE)}})}function o(e){var t=b.lastMouseX-b.startMouseX;if(0==t)return!0;var i=0>t?"left":"right",n=m.getObjZoom();if(n){var r=n.isPanEnabled(e,i);if(1==r)return b.isInitDataValid=!1,!0;if(0==b.isInitDataValid)return a(e),!0}var o=b.startPosx+t;if(t>0&&o>0)o/=3;else if(0>t){var s=o+h.width(),l=c.width();l>s&&(o=b.startPosx+t/3)}if(0==b.isDragging&&(b.isDragging=!0,p.trigger(m.events.START_DRAG)),h.css("left",o+"px"),1==b.isDragVideo){var u=o-b.startPosx,d=b.videoStartX+u;b.videoObject.css("left",d)}}function a(e){var t=v.getMousePosition(e);b.startMouseX=t.pageX,b.startMouseY=t.pageY,b.lastMouseX=b.startMouseX,b.lastMouseY=b.startMouseY,b.startTime=jQuery.now();var i=v.getArrTouches(e);b.startArrTouches=v.getArrTouchPositions(i);var n=v.getElementSize(h);b.startPosx=n.left,b.isInitDataValid=!0,b.isDragVideo=!1,v.storeEventData(e,b.storedEventID)}function s(e){b.touch_active=!1}function l(e,t){b.touch_active=!0,a(t)}function u(e){e.preventDefault(),b.isDragging=!1,1==m.isAnimating()&&h.stop(!0,!0);var t=v.getArrTouches(e);return t.length>1?(1==b.touch_active&&s("1"),!0):1==b.touch_active?!0:void l("1",e)}function d(e){if(0==b.touch_active)return!0;if(0==e.buttons)return s("2"),r(),!0;v.updateStoredEventData(e,b.storedEventID),e.preventDefault();var t=v.getMousePosition(e);b.lastMouseX=t.pageX,b.lastMouseY=t.pageY;var i=null;1==f.slider_vertical_scroll_ondrag&&(i=v.handleScrollTop(b.storedEventID)),"vert"!==i&&o(e)}function _(e){var n=v.getArrTouches(e),o=n.length,a=m.isInnerInPlace();if(1==a&&0==b.touch_active&&0==o)return!0;if(0==o&&1==b.touch_active){s("3");var u=!1,d=v.wasVerticalScroll(b.storedEventID);0==d&&(u=t()),1==u?r():i()}else 1==o&&0==b.touch_active&&l("2",e)}function g(){c.bind("mousedown touchstart",u),jQuery("body").bind("mousemove touchmove",d),jQuery(window).add("body").bind("mouseup touchend",_)}var c,h,p,f,m=new UGSlider,v=new UGFunctions,f={slider_transition_continuedrag_speed:250,slider_transition_continuedrag_easing:"linear",slider_transition_return_speed:300,slider_transition_return_easing:"easeInOutQuad"},b={touch_active:!1,startMouseX:0,startMouseY:0,lastMouseX:0,lastMouseY:0,startPosx:0,startTime:0,isInitDataValid:!1,slides:null,lastNumTouches:0,isDragging:!1,storedEventID:"touchSlider",videoStartX:0,isDragVideo:!1,videoObject:null};this.isTapEventOccured=function(t){var i=v.getArrTouches(t),n=i.length;if(0!=n||0!=b.lastNumTouches)return b.lastNumTouches=n,!1;b.lastNumTouches=n;var r=m.getSlidesReference(),o=(e(r),Math.abs(b.lastMouseX-b.startMouseX)),a=Math.abs(b.lastMouseY-b.startMouseY),s=jQuery.now(),l=s-b.startTime;return 20>o&&50>a&&500>l?!0:!1},this.init=function(e,t){m=e,p=jQuery(m),g_objects=e.getObjects(),c=g_objects.g_objSlider,h=g_objects.g_objInner,f=jQuery.extend(f,t),g()},this.getLastMousePos=function(){var e={pageX:b.lastMouseX,pageY:b.lastMouseY};return e},this.isTouchActive=function(){return b.touch_active}}function UGZoomSliderControl(){function e(e,t){E=e,w=jQuery(E),g_objects=e.getObjects(),y=g_objects.g_objSlider,I=g_objects.g_objInner,S=jQuery.extend(S,t),b()}function t(){var e=E.getScaleMode();return"down"!=e&&(e="fit"),e}function i(){var e=jQuery.now(),i=e-P.storeImageLastTime;if(20>i)return!1;var n=E.getSlidesReference();if(P.objSlide=n.objCurrentSlide,P.objImage=n.objCurrentSlide.find("img"),0==P.objImage.length)return!1;P.objImageSize=T.getElementSize(P.objImage),P.objParent=P.objImage.parent(),P.objParentSize=T.getElementSize(P.objParent);var r=t();objPadding=E.getObjImagePadding(),P.objFitImageSize=T.getImageInsideParentDataByImage(P.objImage,r,objPadding);var e=jQuery.now();return P.storeImageLastTime=e,!0}function n(e,i){var n=E.getSlidesReference(),r=n.objCurrentSlide.find("img"),o=t();w.trigger(E.events.ZOOM_START);var a=!0,s=E.getObjImagePadding();if("back"==e){var l=T.getImageOriginalSize(r);T.scaleImageFitParent(r,l.width,l.height,o,s)}else{var u="in"==e?!0:!1;a=T.zoomImageInsideParent(r,u,S.slider_zoom_step,i,o,S.slider_zoom_max_ratio,s)}1==a&&(w.trigger(E.events.ZOOMING),w.trigger(E.events.ZOOM_CHANGE),w.trigger(E.events.ZOOM_END))}function r(e,t,i){var n=T.getArrTouches(t);if(i===!0){if(1!=n.length)return!1}else if(n.length>1)return!1;return T.isElementBiggerThenParent(e)?!0:!1}function o(e){var t=T.getMousePosition(e);P.startMouseX=t.pageX,P.startMouseY=t.pageY,P.lastMouseX=P.startMouseX,P.lastMouseY=P.startMouseY,P.startImageX=P.objImageSize.left,P.startImageY=P.objImageSize.top,P.panXActive=P.objImageSize.width>P.objParentSize.width,
P.panYActive=P.objImageSize.height>P.objParentSize.height}function a(e){P.isPanActive=!0,o(e)}function s(e){if(void 0==P.objImage||0==P.objImage.length)return!0;var t=T.getMousePosition(e),i=(t.pageX-P.startMouseX,t.pageY-P.startMouseY,t.pageX-P.lastMouseX),n=t.pageY-P.lastMouseY,r=0>i?"left":"right",o=0>n?"up":"down";P.lastMouseX=t.pageX,P.lastMouseY=t.pageY;var a=T.getElementSize(P.objImage);0==P.panYActive?n=0:"down"==o&&a.top>0?n/=3:"up"==o&&a.bottom<P.objParentSize.height&&(n/=3),0==P.panXActive||0==E.isInnerInPlace()?i=0:"right"==r&&a.left>0?i/=3:"left"==r&&a.right<P.objParentSize.width&&(i/=3);var s=a.left+i,l=a.top+n;T.placeElement(P.objImage,s,l)}function l(){var e=!1,t=!1,i=0,n=0,r=T.getElementSize(P.objImage),o=E.getObjImagePadding(),a=T.getElementCenterPosition(P.objImage,o);P.panXActive=P.objImageSize.width>P.objParentSize.width,P.panYActive=P.objImageSize.height>P.objParentSize.height,1==P.panYActive?r.top>0?(n=0,t=!0):r.bottom<P.objParentSize.height&&(n=P.objParentSize.height-r.height,t=!0):r.top!=a.top&&(t=!0,n=a.top),1==P.panXActive?r.left>0?(i=0,e=!0):r.right<P.objParentSize.width&&(i=P.objParentSize.width-r.width,e=!0):r.left!=a.left&&(e=!0,i=a.left);var s={};1==t&&(s.top=n+"px"),1==e&&(s.left=i+"px"),(1==t||1==e)&&P.objImage.animate(s,{duration:S.slider_zoom_return_pan_duration,easing:S.slider_zoom_return_pan_easing,queue:!1})}function u(){return P.objImage&&P.objImage.is(":animated")?!0:!1}function d(e){P.isZoomActive=!0,P.startDistance=T.getDistance(e[0].pageX,e[0].pageY,e[1].pageX,e[1].pageY),0==P.startDistance&&(P.startDistance=1),P.startMiddlePoint=T.getMiddlePoint(e[0].pageX,e[0].pageY,e[1].pageX,e[1].pageY),P.objImageSize=T.getElementSize(P.objImage),P.startImageX=P.objImageSize.left,P.startImageY=P.objImageSize.top,P.imageOrientPoint=T.getElementLocalPoint(P.startMiddlePoint,P.objImage);var t=T.isPointInsideElement(P.imageOrientPoint,P.objImageSize);0==t&&(P.imageOrientPoint=T.getElementCenterPoint(P.objImage)),w.trigger(E.events.ZOOM_START)}function _(e){if(0==P.isZoomActive)return!1;var t=T.getArrTouches(e);2!=t.length&&(P.isZoomActive=!1,w.trigger(E.events.ZOOM_END))}function g(e){if(1==P.isZoomActive)return!0;var t=T.getArrTouches(e);return 2!=t.length?!0:void d(t)}function c(e){var t=T.getArrTouches(e),i=T.getDistance(t[0].pageX,t[0].pageY,t[1].pageX,t[1].pageY),n=i/P.startDistance,r=T.getMiddlePoint(t[0].pageX,t[0].pageY,t[1].pageX,t[1].pageY),o=P.objImageSize.width*n,a=P.objImageSize.height*n,s=T.getImageOriginalSize(P.objImage),l=1;if(s.width>0&&(l=o/s.width),l>S.slider_zoom_max_ratio)return!0;panX=-(P.imageOrientPoint.x*n-P.imageOrientPoint.x),panY=-(P.imageOrientPoint.y*n-P.imageOrientPoint.y);var u=r.x-P.startMiddlePoint.x,d=r.y-P.startMiddlePoint.y,_=P.startImageX+panX+u,g=P.startImageY+panY+d;T.setElementSizeAndPosition(P.objImage,_,g,o,a),w.trigger(E.events.ZOOMING),w.trigger(E.events.ZOOM_CHANGE)}function h(){if(void 0==P.objImage||0==P.objImage.length)return!0;var e=T.getElementSize(P.objImage);if(e.width<P.objFitImageSize.imageWidth){P.objImage.css({position:"absolute",margin:"none"});var t={top:P.objFitImageSize.imageTop+"px",left:P.objFitImageSize.imageLeft+"px",width:P.objFitImageSize.imageWidth+"px",height:P.objFitImageSize.imageHeight+"px"};P.objImage.animate(t,{duration:S.slider_zoom_return_pan_duration,easing:S.slider_zoom_return_pan_easing,queue:!1})}else l()}function p(e){if(0==E.isCurrentSlideType("image"))return!0;i();return void 0==P.objImage||0==P.objImage.length?!0:(e.preventDefault(),1==u()&&P.objImage.stop(!0),1==P.isZoomActive?_(e):g(e),void(1==P.isZoomActive?P.isPanActive=!1:1==r(P.objImage,e)&&1==P.isZoomedOnce&&a(e)))}function f(e){if(0==E.isCurrentSlideType("image"))return!0;var t=jQuery(e.target);if(1==t.data("ug-button"))return!1;i();if(void 0==P.objImage||0==P.objImage.length)return!0;var n=P.isPanActive,o=P.isZoomActive;if(0==E.isInnerInPlace())return P.isZoomActive=!1,P.isPanActive=!1,!0;if(1==P.isZoomActive?_(e):g(e),1==P.isZoomActive)P.isPanActive=!1;else{var s=r(P.objImage,e,!0);1==P.isPanActive?P.isPanActive=!1:1==s&&a(e)}(n||o)&&0==P.isZoomActive&&0==P.isPanActive&&h()}function m(e){return 0==E.isCurrentSlideType("image")?!0:void(1==P.isZoomActive?c(e):1==P.isPanActive&&s(e))}function v(e,t,i,r){if(0==S.slider_zoom_mousewheel)return!0;if(0==E.isCurrentSlideType("image"))return!0;e.preventDefault();var o=t>0,a=T.getMousePosition(e),s=1==o?"in":"out";n(s,a)}function b(){y.on("mousewheel",v),y.bind("mousedown touchstart",p),jQuery("body").bind("mousemove touchmove",m),jQuery(window).add("body").bind("mouseup touchend",f),w.bind(E.events.BEFORE_RETURN,function(){h()}),w.bind(E.events.ITEM_CHANGED,function(){P.isZoomedOnce=!1}),w.bind(E.events.ZOOM_CHANGE,function(){P.isZoomedOnce=!0})}var y,I,w,E=new UGSlider,T=new UGFunctions,S={slider_zoom_step:1.2,slider_zoom_max_ratio:6,slider_zoom_return_pan_duration:400,slider_zoom_return_pan_easing:"easeOutCubic"},P={isPanActive:!1,startMouseX:0,startMouseY:0,lastMouseX:0,lastMouseY:0,startImageX:0,startImageY:0,panXActive:!1,panYActive:!1,objImage:null,objImageSize:null,objParent:null,objParentSize:null,objSlide:null,storeImageLastTime:0,isZoomActive:!1,startDistance:0,startMiddlePoint:null,imageOrientPoint:null,objFitImageSize:null,isZoomedOnce:!1};this.________EXTERNAL_____________=function(){},this.isPanEnabled=function(e,t){if(i(),void 0==P.objImage||0==P.objImage.length)return!1;if(0==P.isZoomedOnce)return!1;if(0==r(P.objImage,e))return!1;if(0==E.isInnerInPlace())return!1;if("left"==t){if(P.objImageSize.right<=P.objParentSize.width)return!1}else if(P.objImageSize.left>=0)return!1;return!0},this.init=function(t,i){e(t,i)},this.zoomIn=function(){n("in")},this.zoomOut=function(){n("out")},this.zoomBack=function(){n("back")}}function UGWistiaAPI(){function e(){return"undefined"!=typeof Wistia}function t(e,t,n,o,a){r=null,s=!1;var l=e+"_video",u="<div id='"+l+"' class='wistia_embed' style='width:"+n+";height:"+o+";' data-video-width='"+n+"' data-video-height='"+o+"'>&nbsp;</div>";jQuery("#"+e).html(u),r=Wistia.embed(t,{version:"v1",videoWidth:n,videoHeight:o,container:l,autoPlay:a}),s=!0,i()}function i(){r.bind("play",function(){a.trigger(o.events.START_PLAYING)}),r.bind("pause",function(){a.trigger(o.events.STOP_PLAYING)}),r.bind("end",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this),s=!1;this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugWistiaAPI.isAPILoaded?!0:e()?(g_ugWistiaAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("fast.wistia.com/assets/external/E-v1.js",!0),void(g_ugWistiaAPI.isAPILoaded=!0))},this.doCommand=function(e){if(null==r)return!1;if(0==s)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.isPlayerReady=function(){return s&&r?!0:!1}}function UGSoundCloudAPI(){function e(){return"undefined"!=typeof SC}function t(e,t,n,a,s){r=null,g_isPlayerReady=!1;var l=e+"_iframe",u=location.protocol+"//w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/"+t;u+="&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=true&show_comments=false&amp;show_playcount=true&amp;show_user=false&amp;hide_related=true&amp;visual=true&amp;start_track=0&amp;callback=true",u+=s===!0?"&amp;auto_play=true":"&amp;auto_play=false";var d="<iframe id='"+l+"' src="+u+" width='"+n+"' height='"+a+"' frameborder='0' scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";jQuery("#"+e).html(d),r=SC.Widget(l),r.bind(SC.Widget.Events.READY,function(){r&&(g_isPlayerReady=!0,i())}),o=e}function i(){r.bind(SC.Widget.Events.PLAY,function(){s.trigger(a.events.START_PLAYING)}),r.bind(SC.Widget.Events.PAUSE,function(){s.trigger(a.events.STOP_PLAYING)}),r.bind(SC.Widget.Events.FINISH,function(){s.trigger(a.events.STOP_PLAYING),s.trigger(a.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o,a=this,s=jQuery(this);this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugSoundCloudAPI.isAPILoaded?!0:e()?(g_ugSoundCloudAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("w.soundcloud.com/player/api.js",!0),void(g_ugSoundCloudAPI.isAPILoaded=!0))},this.putSound=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.doCommand=function(e){if(null==r)return!1;if(0==g_isPlayerReady)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){a.doCommand("pause")},this.play=function(){a.doCommand("play")},this.destroy=function(){g_isPlayerReady=!1,r=null,o&&(jQuery("#"+o).html(""),o=null)}}function UGHtml5MediaAPI(){function e(){return"undefined"!=typeof mejs}function t(e,t,n,o,a){r=null,g_isPlayerReady=!1;var s=location.protocol+"//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/flashmediaelement-cdn.swf",l=location.protocol+"//cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/silverlightmediaelement.xap",u=e+"_video",d="";a&&a===!0&&(d="autoplay='autoplay'");var _="";t.posterImage&&(_="poster='"+t.posterImage+"'");var g="<video id='"+u+"' width='"+n+"' height='"+o+"'  controls='controls' preload='none' "+d+" "+_+">";""!=t.mp4&&(g+="<source type='video/mp4' src='"+t.mp4+"' />"),""!=t.webm&&(g+="<source type='video/webm' src='"+t.webm+"' />"),""!=t.ogv&&(g+="<source type='video/ogg' src='"+t.ogv+"' />"),g+="<object width='"+n+"' height='"+o+"' type='application/x-shockwave-flash' data='"+s+"'>",g+="<param name='movie' value='"+s+"' />",g+="<param name='flashvars' value='controls=true&file="+t.mp4+"' />",g+="</object>",g+="</video>",jQuery("#"+e).html(g),new MediaElement(u,{enablePluginDebug:!1,flashName:s,silverlightName:l,success:function(e,t){g_isPlayerReady=!0,r=e,0==a&&r.pause(),i()},error:function(e){trace(e)}})}function i(){g_ugFunctions.addEvent(r,"play",function(){a.trigger(o.events.START_PLAYING)}),g_ugFunctions.addEvent(r,"pause",function(){a.trigger(o.events.STOP_PLAYING)}),g_ugFunctions.addEvent(r,"ended",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this);this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugHtml5MediaAPI.isAPILoaded?!0:e()?(g_ugHtml5MediaAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelement.min.js",!0),g_ugFunctions.loadCss("cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelementplayer.min.css",!0),void(g_ugHtml5MediaAPI.isAPILoaded=!0))},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.doCommand=function(e){if(null==r)return!1;if(0==g_isPlayerReady)return!1;switch(e){case"play":r.play();break;case"pause":r.pause()}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")}}function UGVimeoAPI(){function e(){return"undefined"!=typeof Froogaloop}function t(e,t,n,o,a){s=null,l=!1;var u=location.protocol+"//player.vimeo.com/video/"+t+"?api=1";a===!0&&(u+="&amp;byline=0&amp;autoplay=1&amp;title=0&amp;portrait=0");var d="<iframe src="+u+" width='"+n+"' height='"+o+"' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";jQuery("#"+e).html(d);var _=jQuery("#"+e+" iframe")[0];s=Froogaloop(_),s.addEvent("ready",function(){s&&(l=!0,i())}),r=e}function i(){return s?(s.addEvent("cuechange",function(){1==u&&o.play()}),s.addEvent("play",function(){a.trigger(o.events.START_PLAYING)}),s.addEvent("pause",function(){a.trigger(o.events.STOP_PLAYING)}),void s.addEvent("finish",function(){a.trigger(o.events.STOP_PLAYING),a.trigger(o.events.VIDEO_ENDED)})):!1}this.isAPILoaded=!1;var n,r,o=this,a=jQuery(this),s=null,l=!1,u=!1;this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.loadAPI=function(){return 1==g_ugVimeoAPI.isAPILoaded?!0:e()?(g_ugVimeoAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("f.vimeocdn.com/js/froogaloop2.min.js",!0),void(g_ugVimeoAPI.isAPILoaded=!0))},this.doCommand=function(e){if(null==s)return!1;if(0==l)return!1;switch(e){default:s.api(e)}},this.pause=function(){o.doCommand("pause")},this.play=function(){o.doCommand("play")},this.destroy=function(){s&&(s.api("unload"),s=null,l=!1),r&&jQuery("#"+r).html("")},this.putVideo=function(i,r,o,a,s){return e()?(t(i,r,o,a,s),!0):(this.loadAPI(),void(n=setInterval(function(){e()&&(t(i,r,o,a,s),clearInterval(n))},500)))},this.isPlayerReady=function(){return l&&s?!0:!1},this.changeVideo=function(e,t){return 0==o.isPlayerReady()?!1:(u=t,void s.api("loadVideo",e))},this.getVideoImages=function(e,t,i){var n=location.protocol+"//vimeo.com/api/v2/video/"+e+".json";jQuery.get(n,{},function(e){var n={};n.preview=e[0].thumbnail_large,n.thumb=e[0].thumbnail_medium,i(t,n)})}}function UGYoutubeAPI(){function e(e,t,r,a,u){s&&l&&s.destroy();var d={controls:2,showinfo:_.video_youtube_showinfo,rel:0};u===!0&&(d.autoplay=1),l=!1,s=new YT.Player(e,{height:a,width:r,videoId:t,playerVars:d,events:{onReady:i,onStateChange:n}}),o=e}function t(){return"undefined"!=typeof YT&&"undefined"!=typeof YT.Player?!0:!1}function i(){l=!0}function n(){if("function"!=typeof s.getPlayerState)return trace("Youtube API error: can't get player state"),!1;var e=s.getPlayerState();switch(e){case YT.PlayerState.PLAYING:u.trigger(a.events.START_PLAYING);break;case YT.PlayerState.ENDED:u.trigger(a.events.STOP_PLAYING),u.trigger(a.events.VIDEO_ENDED);break;default:d==YT.PlayerState.PLAYING&&u.trigger(a.events.STOP_PLAYING)}d=e}this.isAPILoaded=!1;var r,o,a=this,s=null,l=!1,u=jQuery(this),d=-1,_={video_youtube_showinfo:!0};this.events={START_PLAYING:"start_playing",STOP_PLAYING:"stop_playing",VIDEO_ENDED:"video_ended"},this.setOptions=function(e){_=jQuery.extend(_,e)},this.putVideo=function(i,n,o,a,s){return t()?(e(i,n,o,a,s),!0):(this.loadAPI(),void(r=setInterval(function(){t()&&(e(i,n,o,a,s),clearInterval(r))},500)))},this.loadAPI=function(){return 1==g_ugYoutubeAPI.isAPILoaded?!0:"undefined"!=typeof YT?(g_ugYoutubeAPI.isAPILoaded=!0,!0):(g_ugFunctions.loadJs("https://www.youtube.com/player_api",!1),void(g_ugYoutubeAPI.isAPILoaded=!0))},this.doCommand=function(e,t){if(!s)return!0;if(0==l)return!1;switch(e){case"play":if("function"!=typeof s.playVideo)return!1;s.playVideo();break;case"pause":if("function"!=typeof s.pauseVideo)return!1;s.pauseVideo();break;case"seek":if("function"!=typeof s.seekTo)return!1;s.seekTo(t);break;case"stopToBeginning":var i=s.getPlayerState();switch(s.pauseVideo(),i){case YT.PlayerState.PLAYING:case YT.PlayerState.ENDED:case YT.PlayerState.PAUSED:s.seekTo(0)}}},this.play=function(){a.doCommand("play")},this.pause=function(){a.doCommand("pause")},this.destroy=function(){try{s&&(l=!1,s.clearVideo(),s.destroy())}catch(e){jQuery("#"+o).html("")}},this.stopToBeginning=function(){a.doCommand("stopToBeginning")},this.changeVideo=function(e,t){return 0==a.isPlayerReady()?!1:void(t&&1==t?s.loadVideoById(e,0,"large"):s.cueVideoById(e,0,"large"))},this.isPlayerReady=function(){return l&&s?!0:!1},this.getVideoImages=function(e){var t={};return t.preview="https://i.ytimg.com/vi/"+e+"/sddefault.jpg",t.thumb="https://i.ytimg.com/vi/"+e+"/default.jpg",t}}function UGVideoPlayer(){function e(){h.hide()}function t(){p.trigger(h.events.PLAY_START),_&&_.hide()}function i(){p.trigger(h.events.PLAY_STOP),_&&_.show()}function n(){p.trigger(h.events.VIDEO_ENDED)}function r(){_&&(f.setButtonMobileReady(_),f.setButtonOnClick(_,e)),jQuery(m).on(m.events.START_PLAYING,t),jQuery(m).on(m.events.STOP_PLAYING,i),jQuery(m).on(m.events.VIDEO_ENDED,n),jQuery(v).on(v.events.START_PLAYING,t),jQuery(v).on(v.events.STOP_PLAYING,i),jQuery(v).on(v.events.VIDEO_ENDED,n),jQuery(b).on(b.events.START_PLAYING,t),jQuery(b).on(b.events.STOP_PLAYING,i),jQuery(b).on(b.events.VIDEO_ENDED,n),jQuery(y).on(y.events.START_PLAYING,t),jQuery(y).on(y.events.STOP_PLAYING,i),jQuery(y).on(y.events.VIDEO_ENDED,n),jQuery(I).on(I.events.START_PLAYING,t),jQuery(I).on(I.events.STOP_PLAYING,i),jQuery(I).on(I.events.VIDEO_ENDED,n)}function o(e){var t=["youtube","vimeo","html5","soundcloud","wistia"];for(var i in t){var n=t[i];if(n!=e)switch(n){case"youtube":m.pause(),m.destroy(),l.hide();break;case"vimeo":v.pause(),v.destroy(),u.hide();break;case"html5":b.pause(),d.hide();break;case"soundcloud":y.pause(),y.destroy(),g.hide();break;case"wistia":I.pause(),c.hide()}}}var a,s,l,u,d,_,g,c,h=this,p=jQuery(this),f=new UGFunctions,m=new UGYoutubeAPI,v=new UGVimeoAPI,b=new UGHtml5MediaAPI,y=new UGSoundCloudAPI,I=new UGWistiaAPI,w=null,E={video_enable_closebutton:!0};this.events={SHOW:"video_show",HIDE:"video_hide",PLAY_START:"video_play_start",PLAY_STOP:"video_play_stop",VIDEO_ENDED:"video_ended"};var T={standAloneMode:!1,youtubeInnerID:"",vimeoPlayerID:"",html5PlayerID:"",wistiaPlayerID:"",soundCloudPlayerID:""};this.init=function(e,t,i){if(a=i,!a)throw new Error("missing gallery ID for video player, it's a must!");E=jQuery.extend(E,e),m.setOptions(E),t&&1==t&&(T.standAloneMode=!0)},this.setHtml=function(e){T.youtubeInnerID=a+"_youtube_inner",T.vimeoPlayerID=a+"_videoplayer_vimeo",T.html5PlayerID=a+"_videoplayer_html5",T.wistiaPlayerID=a+"_videoplayer_wistia",T.soundCloudPlayerID=a+"_videoplayer_soundcloud";var t="<div class='ug-videoplayer' style='display:none'>";t+="<div class='ug-videoplayer-wrapper ug-videoplayer-youtube' style='display:none'><div id='"+T.youtubeInnerID+"'></div></div>",t+="<div id='"+T.vimeoPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-vimeo' style='display:none'></div>",t+="<div id='"+T.html5PlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-html5'></div>",t+="<div id='"+T.soundCloudPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-soundcloud'></div>",t+="<div id='"+T.wistiaPlayerID+"' class='ug-videoplayer-wrapper ug-videoplayer-wistia'></div>",0==T.standAloneMode&&1==E.video_enable_closebutton&&(t+="<div class='ug-videoplayer-button-close'></div>"),t+="</div>",e.append(t),s=e.children(".ug-videoplayer"),l=s.children(".ug-videoplayer-youtube"),u=s.children(".ug-videoplayer-vimeo"),d=s.children(".ug-videoplayer-html5"),g=s.children(".ug-videoplayer-soundcloud"),c=s.children(".ug-videoplayer-wistia"),0==T.standAloneMode&&1==E.video_enable_closebutton&&(_=s.children(".ug-videoplayer-button-close"))},this.destroy=function(){_&&(_.off("click"),_.off("touchend")),jQuery(m).off(m.events.START_PLAYING),jQuery(m).off(m.events.STOP_PLAYING),jQuery(v).off(v.events.START_PLAYING),jQuery(v).off(v.events.STOP_PLAYING),jQuery(b).off(b.events.START_PLAYING),jQuery(b).off(b.events.STOP_PLAYING),jQuery(y).off(y.events.START_PLAYING,t),jQuery(y).off(y.events.STOP_PLAYING,i),jQuery(I).off(I.events.START_PLAYING,t),jQuery(I).off(I.events.STOP_PLAYING,i),w=null},this.initEvents=function(){r()},this.setSize=function(e,t){f.setElementSize(s,e,t),_&&f.placeElement(_,"right","top")},this.setPosition=function(e,t){f.placeElement(s,e,t)},this.getObject=function(){return s},this.show=function(){return 1==h.isVisible()?!0:(s.show(),s.fadeTo(0,1),_&&_.show(),void p.trigger(h.events.SHOW))},this.hide=function(){return 0==h.isVisible()?!0:(o(),w=null,s.hide(),void p.trigger(h.events.HIDE))},this.getActiveAPI=function(){switch(w){case"youtube":return m;case"vimeo":return v;case"wistia":return I;case"soundcloud":return y;case"html5":return b;default:return null}},this.pause=function(){var e=h.getActiveAPI();return null==e?!1:void("function"==typeof e.pause&&e.pause())},this.isVisible=function(){return s.is(":visible")},this.playYoutube=function(e,t){if("undefined"==typeof t)var t=!0;o("youtube"),l.show();var i=l.children("#"+T.youtubeInnerID);0==i.length&&l.append("<div id='"+T.youtubeInnerID+"'></div>"),1==m.isPlayerReady()&&1==T.standAloneMode?m.changeVideo(e,t):m.putVideo(T.youtubeInnerID,e,"100%","100%",t),w="youtube"},this.playVimeo=function(e,t){if("undefined"==typeof t)var t=!0;o("vimeo"),u.show(),v.putVideo(T.vimeoPlayerID,e,"100%","100%",t),w="vimeo"},this.playHtml5Video=function(e,t,i,n,r){if("undefined"==typeof r)var r=!0;o("html5"),d.show();var a={ogv:e,webm:t,mp4:i,posterImage:n};b.putVideo(T.html5PlayerID,a,"100%","100%",r),w="html5"},this.playSoundCloud=function(e,t){if("undefined"==typeof t)var t=!0;o("soundcloud"),g.show(),y.putSound(T.soundCloudPlayerID,e,"100%","100%",t),w="soundcloud"},this.playWistia=function(e,t){if("undefined"==typeof t)var t=!0;o("wistia"),c.show(),I.putVideo(T.wistiaPlayerID,e,"100%","100%",t),w="wistia"}}function ugCheckForMinJQueryVersion(){var e=g_ugFunctions.checkMinJqueryVersion("1.8.0");if(0==e)throw new Error("The gallery can run from jquery 1.8 You have jQuery "+jQuery.fn.jquery+" Please update your jQuery library.")}function ugCheckForErrors(e,t){function i(){if("undefined"==typeof jQuery)throw new Error("jQuery library not included")}function n(){if("function"==typeof jQuery.fn.unitegallery)return!0;var e="You have some jquery.js library include that comes after the gallery files js include.";throw e+="<br> This include eliminates the gallery libraries, and make it not work.","cms"==t?(e+="<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Gallery Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.",e+="<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it."):e+="<br><br> Please find and remove this jquery.js include and the gallery will work. <br> * There should be only one jquery.js include before all other js includes in the page.",new Error(e)}try{"jquery"==t?(i(),ugCheckForMinJQueryVersion()):(ugCheckForMinJQueryVersion(),n())}catch(r){var o=r.message;if(o="Unite Gallery Error: "+o,o="<div style='font-size:16px;color:#BC0C06;max-width:900px;border:1px solid red;padding:10px;'>"+o+"</div>","jquery"==t){var a=document.getElementById(e);a.innerHTML=o,a.style.display="block"}else jQuery(e).show().html(o);return!1}return!0}function UniteGalleryMain(){function __________INIT_GALLERY_______(){}function getThemeFunction(e){var t=e;return-1==t.indexOf("UGTheme_")&&(t="UGTheme_"+t),t}function initTheme(objCustomOptions){if(objCustomOptions.hasOwnProperty("gallery_theme"))g_options.gallery_theme=objCustomOptions.gallery_theme;else{var defaultTheme=g_options.gallery_theme;0==g_ugFunctions.isThemeRegistered(defaultTheme)&&(g_options.gallery_theme=g_ugFunctions.getFirstRegisteredTheme())}var themeFunction=getThemeFunction(g_options.gallery_theme);try{g_options.gallery_theme=eval(themeFunction)}catch(e){}g_options.gallery_theme=eval(themeFunction),g_objTheme=new g_options.gallery_theme,g_objTheme.init(t,objCustomOptions)}function resetOptions(){g_options=jQuery.extend({},g_temp.originalOptions),g_selectedItemIndex=-1,g_selectedItem=null,g_objSlider=void 0,g_objThumbs=void 0,g_objSlider=void 0}function checkForStartupErrors(){try{ugCheckForMinJQueryVersion()}catch(e){throwErrorShowMessage(e.message)}"object"==typeof g_objWrapper.outerWidth()&&throwErrorShowMessage("You have some buggy script. most chances jquery-ui.js that destroy jquery outerWidth, outerHeight functions. The gallery can't run. Please update jquery-ui.js to latest version."),setTimeout(function(){ugCheckForErrors(g_galleryID,"cms")},5e3)}function runGallery(e,i,n,r){var o="object"==typeof i;if(o&&(g_temp.objCustomOptions=i),1==g_temp.isRunFirstTime){if(g_galleryID=e,g_objWrapper=jQuery(g_galleryID),0==g_objWrapper.length)return trace("div with id: "+g_galleryID+" not found"),!1;g_objParent=g_objWrapper.parent(),checkForStartupErrors(),g_temp.originalOptions=jQuery.extend({},g_options),o&&(g_options=jQuery.extend(g_options,i)),1==g_options.gallery_enable_cache&&g_options.gallery_initial_catid&&cacheItems(g_options.gallery_initial_catid),t.setSizeClass();var a=g_objWrapper.children();fillItemsArray(a),loadAPIs(),g_objWrapper.find("img").fadeTo(0,0).hide(),g_objWrapper.show(),clearInitData()}else if(t.destroy(),resetOptions(),g_options=jQuery.extend(g_options,g_temp.objCustomOptions),n){if(r&&1==g_options.gallery_enable_cache&&cacheItems(r,n),"noitems"==n)return showErrorMessage("No items in this category",""),!1;g_objWrapper.html(n);var a=g_objWrapper.children();fillItemsArray(a),loadAPIs(),g_objWrapper.children().fadeTo(0,0).hide(),g_objWrapper.show(),clearInitData()}1==g_temp.isRunFirstTime&&1==g_options.gallery_enable_tabs&&(g_objTabs=new UGTabs,g_objTabs.init(t,g_options)),1==g_temp.isRunFirstTime&&1==g_options.gallery_enable_loadmore&&(g_objLoadMore=new UGLoadMore,g_objLoadMore.init(t,g_options)),o&&modifyInitParams(g_temp.objCustomOptions),validateParams(),1==g_options.gallery_shuffle&&t.shuffleItems(),initTheme(g_temp.objCustomOptions),setGalleryHtml(),setHtmlObjectsProperties();var s=g_objWrapper.width();0==s?g_functions.waitForWidth(g_objWrapper,runGalleryActually):runGalleryActually()}function runGalleryActually(){t.setSizeClass(),0==g_temp.isFreestyleMode&&1==g_options.gallery_preserve_ratio&&setHeightByOriginalRatio(),g_objTheme.run(),g_objTabs&&g_temp.isRunFirstTime&&g_objTabs.run(),preloadBigImages(),initEvents(),g_numItems>0&&t.selectItem(0),1==g_options.gallery_autoplay&&t.startPlayMode(),g_temp.isRunFirstTime=!1}function showErrorMessage(e,t){if("undefined"==typeof t)var t="<b>Unite Gallery Error: </b>";else t="<b>"+t+": </b>";e=t+e;var i="<div class='ug-error-message-wrapper'><div class='ug-error-message'>"+e+"</div></div>";g_objWrapper.children().remove(),g_objWrapper.html(i),g_objWrapper.show()}function throwErrorShowMessage(e){throw showErrorMessage(e),new Error(e)}function modifyInitParams(){g_options.gallery_images_preload_type||(g_options.gallery_images_preload_type="minimal"),(void 0==g_options.gallery_min_height||g_options.gallery_height<g_options.gallery_min_height)&&(g_options.gallery_min_height=0),(void 0==g_options.gallery_min_width||g_options.gallery_width<g_options.gallery_min_width)&&(g_options.gallery_min_width=0)}function validateParams(){if(!g_options.gallery_theme)throw new Error("The gallery can't run without theme");if(jQuery.isNumeric(g_options.gallery_height)&&g_options.gallery_height<g_options.gallery_min_height)throw new Error("The <b>gallery_height</b> option must be bigger then <b>gallery_min_height option</b>");if(g_options.gallery_width<g_options.gallery_min_width)throw new Error("The <b>gallery_width</b> option must be bigger then <b>gallery_min_width option</b>")}function setGalleryHtml(){g_objWrapper.addClass("ug-gallery-wrapper"),g_objWrapper.append("<div class='ug-overlay-disabled' style='display:none'></div>"),t.setSizeClass()}function clearInitData(){g_objWrapper.children().remove()}function storeLastSize(){var e=t.getSize();g_temp.lastWidth=e.width,g_temp.lastHeight=e.height}function setHeightByOriginalRatio(){var e=t.getSize(),i=e.width/e.height;if(i!=e.orig_ratio){var n=e.width/e.orig_ratio;n=Math.round(n),n<g_options.gallery_min_height&&(n=g_options.gallery_min_height),g_objWrapper.height(n)}}function setHtmlObjectsProperties(){var e=g_functions.getCssSizeParam(g_options.gallery_width),t={"max-width":e,"min-width":g_functions.getCssSizeParam(g_options.gallery_min_width)};if(0==g_temp.isFreestyleMode){var i=g_functions.getCssSizeParam(g_options.gallery_height);t.height=i}else t.overflow="visible";g_options.gallery_background_color&&(t["background-color"]=g_options.gallery_background_color),g_objWrapper.css(t)}function fillItemByChild(e){var i=t.isMobileMode(),n=e.prop("tagName").toLowerCase(),r="";if("a"==n){r=e.attr("href"),e=e.children();var n=e.prop("tagName").toLowerCase()}var o=e.data("type");void 0==o&&(o="image");var a={};if(a.type=o,"img"==n){var s=e.data("lazyload-src");s&&""!=s&&(e.attr("src",s),jQuery.removeData(e,"lazyload-src"));var l=e.data("image"),u=e.data("thumb");"undefined"==typeof l&&(l=null),"undefined"==typeof u&&(u=null);var d=e.attr("src");l||(l=d),u||(u=d),u||(u=l),l||(l=u),a.urlThumb=u,a.urlImage=l,a.title=e.attr("alt"),a.objThumbImage=e,a.objThumbImage.attr("src",a.urlThumb)}else{if("image"==o)throw trace("Problematic gallery item found:"),trace(e),trace("Please look for some third party js script that could add this item to the gallery"),new Error("The item should not be image type");a.urlThumb=e.data("thumb"),a.title=e.data("title"),a.objThumbImage=null,a.urlImage=e.data("image")}if(1==i){var _=e.data("thumb-mobile");"undefined"!=typeof _&&""!=_&&(a.urlThumb=_,"img"==n&&e.attr("src",a.urlThumb));var g=e.data("image-mobile");"undefined"!=typeof g&&""!=g&&(a.urlImage=g)}a.link=r,a.description=e.attr("title"),a.description||(a.description=e.data("description")),a.description||(a.description=""),a.isNewAdded=!1,a.isLoaded=!1,a.isThumbImageLoaded=!1,a.objPreloadImage=null,a.isBigImageLoadStarted=!1,a.isBigImageLoaded=!1,a.isBigImageLoadError=!1,a.imageWidth=0,a.imageHeight=0,a.thumbWidth=0,a.thumbHeight=0,a.thumbRatioByWidth=0,a.thumbRatioByHeight=0;var c=e.data("width"),h=e.data("height");c&&"number"==typeof c&&h&&"number"==typeof h&&(a.thumbWidth=c,a.thumbHeight=h,a.thumbRatioByWidth=c/h,a.thumbRatioByHeight=h/c),a.addHtml=null;var p=void 0==a.urlImage||""==a.urlImage,f=void 0==a.urlThumb||""==a.urlThumb;switch(a.type){case"youtube":if(a.videoid=e.data("videoid"),p||f){var m=g_ugYoutubeAPI.getVideoImages(a.videoid);p&&(a.urlImage=m.preview),f&&(a.urlThumb=m.thumb,"img"==n&&e.attr("src",a.urlThumb))}g_temp.isYoutubePresent=!0;break;case"vimeo":a.videoid=e.data("videoid"),g_temp.isVimeoPresent=!0;break;case"html5video":a.videoogv=e.data("videoogv"),a.videowebm=e.data("videowebm"),a.videomp4=e.data("videomp4"),g_temp.isHtml5VideoPresent=!0;break;case"soundcloud":a.trackid=e.data("trackid"),g_temp.isSoundCloudPresent=!0;break;case"wistia":a.videoid=e.data("videoid"),g_temp.isWistiaPresent=!0;break;case"custom":var v=e.children("img");v.length&&(v=jQuery(v[0]),a.urlThumb=v.attr("src"),a.title=v.attr("alt"),a.objThumbImage=v);var b=e.children().not("img:first-child");b.length&&(a.addHtml=b.clone())}return a.objThumbImage&&(a.objThumbImage.removeAttr("data-description",""),a.objThumbImage.removeAttr("data-image",""),a.objThumbImage.removeAttr("data-thumb",""),a.objThumbImage.removeAttr("title","")),a}function fillItemsArray(e,t){if(t!==!0)g_arrItems=[];else for(var i=0;g_numItems>i;i++)g_arrItems[i].isNewAdded=!1;for(var i=0;i<e.length;i++){var n=jQuery(e[i]),r=fillItemByChild(n);numIndex=g_arrItems.length,r.index=numIndex,t===!0&&(r.isNewAdded=!0),g_arrItems.push(r)}g_numItems=g_arrItems.length}function loadAPIs(){g_temp.isYoutubePresent&&g_ugYoutubeAPI.loadAPI(),g_temp.isVimeoPresent&&g_ugVimeoAPI.loadAPI(),g_temp.isHtml5VideoPresent&&g_ugHtml5MediaAPI.loadAPI(),g_temp.isSoundCloudPresent&&g_ugSoundCloudAPI.loadAPI(),g_temp.isWistiaPresent&&g_ugWistiaAPI.loadAPI()}function preloadBigImages(){if("visible"!=g_options.gallery_images_preload_type||g_objThumbs||(g_options.gallery_images_preload_type="minimal"),1==g_temp.isAllItemsPreloaded)return!0;switch(g_options.gallery_images_preload_type){default:case"minimal":break;case"all":jQuery(g_arrItems).each(function(){preloadItemImage(this)});break;case"visible":jQuery(g_arrItems).each(function(){var e=this,t=g_objThumbs.isItemThumbVisible(e);1==t&&preloadItemImage(e)})}}function checkPreloadItemImage(e){if(1==e.isBigImageLoadStarted||1==e.isBigImageLoaded||1==e.isBigImageLoadError)return!1;switch(g_options.gallery_images_preload_type){default:case"minimal":break;case"all":preloadItemImage(e);break;case"visible":var t=g_objThumbs.isItemThumbVisible(e);1==t&&preloadItemImage(e)}}function preloadItemImage(e){if(1==e.isBigImageLoadStarted||1==e.isBigImageLoaded||1==e.isBigImageLoadError)return!0;var i=e.urlImage;
return""==i||void 0==i?(e.isBigImageLoadError=!0,!1):(e.isBigImageLoadStarted=!0,e.objPreloadImage=jQuery("<img/>").attr("src",i),e.objPreloadImage.data("itemIndex",e.index),e.objPreloadImage.on("load",t.onItemBigImageLoaded),e.objPreloadImage.on("error",function(){var e=jQuery(this),i=e.data("itemIndex"),n=g_arrItems[i];n.isBigImageLoadError=!0,n.isBigImageLoaded=!1;var r=jQuery(this).attr("src");console.log("Can't load image: "+r),g_objGallery.trigger(t.events.ITEM_IMAGE_UPDATED,[i,n.urlImage]),n.objThumbImage.attr("src",n.urlThumb)}),void checkAllItemsStartedPreloading())}function preloadNearBigImages(e){if(1==g_temp.isAllItemsPreloaded)return!1;if(!e)var e=g_selectedItem;if(!e)return!0;var t=e.index,i=t-1,n=t+1;i>0&&preloadItemImage(g_arrItems[i]),g_numItems>n&&preloadItemImage(g_arrItems[n])}function checkAllItemsStartedPreloading(){if(1==g_temp.isAllItemsPreloaded)return!1;for(var e in g_arrItems)if(0==g_arrItems[e].isBigImageLoadStarted)return!1;g_temp.isAllItemsPreloaded=!0}function __________END_INIT_GALLERY_______(){}function __________EVENTS_____________(){}function onSliderMouseEnter(e){1==g_options.gallery_pause_on_mouseover&&0==t.isFullScreen()&&1==g_temp.isPlayMode&&g_objSlider&&0==g_objSlider.isSlideActionActive()&&t.pausePlaying()}function onSliderMouseLeave(e){if(1==g_options.gallery_pause_on_mouseover&&1==g_temp.isPlayMode&&g_objSlider&&0==g_objSlider.isSlideActionActive()){var i=g_objSlider.isCurrentSlideLoadingImage();0==i&&t.continuePlaying()}}function onKeyPress(e){var i=jQuery(e.target);if(i.is("textarea")||i.is("select")||i.is("input"))return!0;var n=e.charCode?e.charCode:e.keyCode?e.keyCode:e.which?e.which:0,r=!0;switch(n){case 39:t.nextItem();break;case 37:t.prevItem();break;default:r=!1}1==r&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()),g_objGallery.trigger(t.events.GALLERY_KEYPRESS,[n,e])}function onGalleryResized(){var e=t.getSize();if(0==e.width)return!0;t.setSizeClass();var e=t.getSize();if(e.width!=g_temp.lastWidth||0==g_temp.isFreestyleMode&&e.height!=g_temp.lastHeight){var i=!1;if(g_temp.funcCustomHeight){var n=g_temp.funcCustomHeight(e);n&&(g_objWrapper.height(n),i=!0)}0==i&&1==g_options.gallery_preserve_ratio&&0==g_temp.isFreestyleMode&&setHeightByOriginalRatio(),storeLastSize(),g_objGallery.trigger(t.events.SIZE_CHANGE)}}function onThumbsChange(e){"visible"==g_options.gallery_images_preload_type&&0==g_temp.isAllItemsPreloaded&&preloadBigImages()}function onFullScreenChange(){var e=g_functions.isFullScreen(),i=e?t.events.ENTER_FULLSCREEN:t.events.EXIT_FULLSCREEN,n=g_functions.getGlobalData("fullscreenID");return g_galleryID!==n?!0:(e?g_objWrapper.addClass("ug-fullscreen"):g_objWrapper.removeClass("ug-fullscreen"),g_objGallery.trigger(i),void onGalleryResized())}function onItemImageUpdated(e,i){var n=t.getItem(i);checkPreloadItemImage(n)}function onCurrentSlideImageLoadEnd(){1==t.isPlayMode()&&t.continuePlaying()}function initEvents(){if(g_objWrapper.on("dragstart",function(e){e.preventDefault()}),g_objGallery.on(t.events.ITEM_IMAGE_UPDATED,onItemImageUpdated),g_objThumbs)switch(g_temp.thumbsType){case"strip":jQuery(g_objThumbs).on(g_objThumbs.events.STRIP_MOVE,onThumbsChange);break;case"grid":jQuery(g_objThumbs).on(g_objThumbs.events.PANE_CHANGE,onThumbsChange)}if("advance"==g_options.gallery_mousewheel_role&&0==g_temp.isFreestyleMode&&g_objWrapper.on("mousewheel",t.onGalleryMouseWheel),storeLastSize(),jQuery(window).resize(function(){g_objWrapper.css("width","auto"),g_functions.whenContiniousEventOver("gallery_resize",onGalleryResized,g_temp.resizeDelay)}),setTimeout(function(){setInterval(onGalleryResized,2e3)},1e4),g_functions.addFullScreenChangeEvent(onFullScreenChange),g_objSlider){if(jQuery(g_objSlider).on(g_objSlider.events.ITEM_CHANGED,function(){var e=g_objSlider.getCurrentItemIndex();-1!=e&&t.selectItem(e)}),1==g_options.gallery_pause_on_mouseover){var e=g_objSlider.getElement();e.hover(onSliderMouseEnter,onSliderMouseLeave),g_objGallery.on(t.events.ENTER_FULLSCREEN,function(){onSliderMouseLeave()})}retriggerEvent(g_objSlider,g_objSlider.events.ACTION_START,t.events.SLIDER_ACTION_START),retriggerEvent(g_objSlider,g_objSlider.events.ACTION_END,t.events.SLIDER_ACTION_END),jQuery(g_objSlider).on(g_objSlider.events.CURRENTSLIDE_LOAD_END,onCurrentSlideImageLoadEnd)}1==g_options.gallery_control_keyboard&&jQuery(document).keydown(onKeyPress)}function __________GENERAL_______(){}function cacheItems(e,t){if(t){var i=t;"noitems"!=i&&(i=jQuery(t).clone())}else var i=g_objWrapper.children().clone();g_objCache[e]=i}function removeAllSizeClasses(e){e||(e=g_objWrapper),e.removeClass("ug-under-480"),e.removeClass("ug-under-780"),e.removeClass("ug-under-960")}function retriggerEvent(e,t,i){jQuery(e).on(t,function(e){g_objGallery.trigger(i,[this])})}function advanceNextStep(){var e=jQuery.now(),i=e-g_temp.playTimeLastStep;g_temp.playTimeLastStep=e;var n=t.isGalleryVisible();if(0==n)return!1;if(g_temp.playTimePassed+=i,g_temp.objProgress){var r=g_temp.playTimePassed/g_options.gallery_play_interval;g_temp.objProgress.setProgress(r)}g_temp.playTimePassed>=g_options.gallery_play_interval&&(t.nextItem(),g_temp.playTimePassed=0)}function unselectSeletedItem(){return null==g_selectedItem?!0:(g_objThumbs&&g_objThumbs.setThumbUnselected(g_selectedItem.objThumbWrapper),g_selectedItem=null,void(g_selectedItemIndex=-1))}function toFakeFullScreen(){jQuery("body").addClass("ug-body-fullscreen"),g_objWrapper.addClass("ug-fake-fullscreen"),g_temp.isFakeFullscreen=!0,g_objGallery.trigger(t.events.ENTER_FULLSCREEN),g_objGallery.trigger(t.events.SIZE_CHANGE)}function exitFakeFullscreen(){jQuery("body").removeClass("ug-body-fullscreen"),g_objWrapper.removeClass("ug-fake-fullscreen"),g_temp.isFakeFullscreen=!1,g_objGallery.trigger(t.events.EXIT_FULLSCREEN),g_objGallery.trigger(t.events.SIZE_CHANGE)}var t=this,g_galleryID,g_objGallery=jQuery(t),g_objWrapper,g_objParent,g_objThumbs,g_objSlider,g_functions=new UGFunctions,g_objTabs,g_objLoadMore,g_arrItems=[],g_numItems,g_selectedItem=null,g_selectedItemIndex=-1,g_objTheme,g_objCache={};this.events={ITEM_CHANGE:"item_change",SIZE_CHANGE:"size_change",ENTER_FULLSCREEN:"enter_fullscreen",EXIT_FULLSCREEN:"exit_fullscreen",START_PLAY:"start_play",STOP_PLAY:"stop_play",PAUSE_PLAYING:"pause_playing",CONTINUE_PLAYING:"continue_playing",SLIDER_ACTION_START:"slider_action_start",SLIDER_ACTION_END:"slider_action_end",ITEM_IMAGE_UPDATED:"item_image_updated",GALLERY_KEYPRESS:"gallery_keypress",GALLERY_BEFORE_REQUEST_ITEMS:"gallery_before_request_items",OPEN_LIGHTBOX:"open_lightbox",CLOSE_LIGHTBOX:"close_lightbox"};var g_options={gallery_width:900,gallery_height:500,gallery_min_width:150,gallery_min_height:100,gallery_theme:"default",gallery_skin:"default",gallery_images_preload_type:"minimal",gallery_autoplay:!1,gallery_play_interval:3e3,gallery_pause_on_mouseover:!0,gallery_mousewheel_role:"zoom",gallery_control_keyboard:!0,gallery_carousel:!0,gallery_preserve_ratio:!0,gallery_background_color:"",gallery_debug_errors:!1,gallery_shuffle:!1,gallery_urlajax:null,gallery_enable_tabs:!1,gallery_enable_loadmore:!1,gallery_enable_cache:!0,gallery_initial_catid:""},g_temp={objCustomOptions:{},isAllItemsPreloaded:!1,isFreestyleMode:!1,lastWidth:0,lastHeigh:0,handleResize:null,isInited:!1,isPlayMode:!1,isPlayModePaused:!1,playTimePassed:0,playTimeLastStep:0,playHandle:"",playStepInterval:33,objProgress:null,isFakeFullscreen:!1,thumbsType:null,isYoutubePresent:!1,isVimeoPresent:!1,isHtml5VideoPresent:!1,isSoundCloudPresent:!1,isWistiaPresent:!1,resizeDelay:100,isRunFirstTime:!0,originalOptions:{},funcCustomHeight:null};this.onItemBigImageLoaded=function(e,t){if(!t)var t=jQuery(this);var i=t.data("itemIndex"),n=g_arrItems[i];n.isBigImageLoaded=!0;var r=g_functions.getImageOriginalSize(t);n.imageWidth=r.width,n.imageHeight=r.height},this.checkFillImageSize=function(e,t){if(!t){var i=e.data("itemIndex");if(void 0===i)throw new Error("Wrong image given to gallery.checkFillImageSize");var t=g_arrItems[i]}var n=g_functions.getImageOriginalSize(e);t.imageWidth=n.width,t.imageHeight=n.height},this.setFreestyleMode=function(){g_temp.isFreestyleMode=!0},this.attachThumbsPanel=function(e,t){g_temp.thumbsType=e,g_objThumbs=t},this.initSlider=function(e,i){if(!e)var e={};e=jQuery.extend(g_temp.objCustomOptions,e),g_objSlider=new UGSlider,g_objSlider.init(t,e,i)},this.onGalleryMouseWheel=function(e,i,n,r){e.preventDefault(),i>0?t.prevItem():t.nextItem()},this.destroy=function(){if(g_objWrapper.off("dragstart"),g_objGallery.off(t.events.ITEM_IMAGE_UPDATED),g_objThumbs)switch(g_temp.thumbsType){case"strip":jQuery(g_objThumbs).off(g_objThumbs.events.STRIP_MOVE);break;case"grid":jQuery(g_objThumbs).off(g_objThumbs.events.PANE_CHANGE)}if(g_objWrapper.off("mousewheel"),jQuery(window).off("resize"),g_functions.destroyFullScreenChangeEvent(),g_objSlider){jQuery(g_objSlider).off(g_objSlider.events.ITEM_CHANGED);var e=g_objSlider.getElement();e.off("mouseenter"),e.off("mouseleave"),g_objGallery.off(t.events.ENTER_FULLSCREEN),jQuery(g_objSlider).off(g_objSlider.events.ACTION_START),jQuery(g_objSlider).off(g_objSlider.events.ACTION_END),jQuery(g_objSlider).off(g_objSlider.events.CURRENTSLIDE_LOAD_END)}1==g_options.gallery_control_keyboard&&jQuery(document).off("keydown"),g_objTheme&&"function"==typeof g_objTheme.destroy&&g_objTheme.destroy(),g_objWrapper.html("")},this.getArrItems=function(){return g_arrItems},this.getObjects=function(){var e={g_galleryID:g_galleryID,g_objWrapper:g_objWrapper,g_objThumbs:g_objThumbs,g_objSlider:g_objSlider,g_options:g_options,g_arrItems:g_arrItems,g_numItems:g_numItems};return e},this.getObjSlider=function(){return g_objSlider},this.getItem=function(e){if(0>e)throw new Error("item with index: "+e+" not found");if(e>=g_numItems)throw new Error("item with index: "+e+" not found");return g_arrItems[e]},this.getWidth=function(){var e=t.getSize();return e.width},this.getHeight=function(){var e=t.getSize();return e.height},this.getSize=function(){var e=g_functions.getElementSize(g_objWrapper);return e.orig_width=g_options.gallery_width,e.orig_height=g_options.gallery_height,e.orig_ratio=e.orig_width/e.orig_height,e},this.getGalleryID=function(){var e=g_galleryID.replace("#","");return e},this.getNextItem=function(e,t){"object"==typeof e&&(e=e.index);var i=e+1;if(t!==!0&&1==g_numItems)return null;if(i>=g_numItems){if(1!=g_options.gallery_carousel&&t!==!0)return null;i=0}var n=g_arrItems[i];return n},this.getPrevItem=function(e){"object"==typeof e&&(e=e.index);var t=e-1;if(0>t){if(1!=g_options.gallery_carousel&&forceCarousel!==!0)return null;t=g_numItems-1}var i=g_arrItems[t];return i},this.getSelectedItem=function(){return g_selectedItem},this.getSelectedItemIndex=function(){return g_selectedItemIndex},this.getNumItems=function(){return g_numItems},this.isLastItem=function(){return g_selectedItemIndex==g_numItems-1?!0:!1},this.isFirstItem=function(){return 0==g_selectedItemIndex?!0:!1},this.getOptions=function(){return g_options},this.getElement=function(){return g_objWrapper},this.___________SET_CONTROLS___________=function(){},this.setNextButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.nextItem)},this.setPrevButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.prevItem)},this.setFullScreenToggleButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnTap(e,t.toggleFullscreen),g_objGallery.on(t.events.ENTER_FULLSCREEN,function(){e.addClass("ug-fullscreenmode")}),g_objGallery.on(t.events.EXIT_FULLSCREEN,function(){e.removeClass("ug-fullscreenmode")})},this.destroyFullscreenButton=function(e){g_functions.destroyButton(e),g_objGallery.off(t.events.ENTER_FULLSCREEN),g_objGallery.off(t.events.EXIT_FULLSCREEN)},this.setPlayButton=function(e){e.data("ug-button",!0),g_functions.setButtonOnClick(e,t.togglePlayMode),g_objGallery.on(t.events.START_PLAY,function(){e.addClass("ug-stop-mode")}),g_objGallery.on(t.events.STOP_PLAY,function(){e.removeClass("ug-stop-mode")})},this.destroyPlayButton=function(e){g_functions.destroyButton(e),g_objGallery.off(t.events.START_PLAY),g_objGallery.off(t.events.STOP_PLAY)},this.setProgressIndicator=function(e){g_temp.objProgress=e},this.setTextContainers=function(e,i){g_objGallery.on(t.events.ITEM_CHANGE,function(){var n=t.getSelectedItem();e.html(n.title),i.html(n.description)})},this.showDisabledOverlay=function(){g_objWrapper.children(".ug-overlay-disabled").show()},this.hideDisabledOverlay=function(){g_objWrapper.children(".ug-overlay-disabled").hide()},this.___________END_SET_CONTROLS___________=function(){},this.___________PLAY_MODE___________=function(){},this.startPlayMode=function(){if(g_temp.isPlayMode=!0,g_temp.isPlayModePaused=!1,g_temp.playTimePassed=0,g_temp.playTimeLastStep=jQuery.now(),g_temp.playHandle=setInterval(advanceNextStep,g_temp.playStepInterval),g_temp.objProgress){var e=g_temp.objProgress.getElement();g_temp.objProgress.setProgress(0),e.show()}g_objGallery.trigger(t.events.START_PLAY),g_objSlider&&1==g_objSlider.isCurrentSlideLoadingImage()&&t.pausePlaying()},this.resetPlaying=function(){return 0==g_temp.isPlayMode?!0:(g_temp.playTimePassed=0,void(g_temp.playTimeLastStep=jQuery.now()))},this.pausePlaying=function(){return 1==g_temp.isPlayModePaused?!0:(g_temp.isPlayModePaused=!0,clearInterval(g_temp.playHandle),void g_objGallery.trigger(t.events.PAUSE_PLAYING))},this.continuePlaying=function(){return 0==g_temp.isPlayModePaused?!0:(g_temp.isPlayModePaused=!1,g_temp.playTimeLastStep=jQuery.now(),void(g_temp.playHandle=setInterval(advanceNextStep,g_temp.playStepInterval)))},this.stopPlayMode=function(){if(g_temp.isPlayMode=!1,clearInterval(g_temp.playHandle),g_temp.playTimePassed=0,g_temp.objProgress){var e=g_temp.objProgress.getElement();e.hide()}g_objGallery.trigger(t.events.STOP_PLAY)},this.isPlayMode=function(){return g_temp.isPlayMode},this.togglePlayMode=function(){0==t.isPlayMode()?t.startPlayMode():t.stopPlayMode()},this.___________GENERAL_EXTERNAL___________=function(){},this.shuffleItems=function(){g_arrItems=g_functions.arrayShuffle(g_arrItems);for(var e in g_arrItems)g_arrItems[e].index=parseInt(e)},this.setOptions=function(e){g_options=jQuery.extend(g_options,e)},this.selectItem=function(e,i){"number"==typeof e&&(e=t.getItem(e));var n=e.index;if(n==g_selectedItemIndex)return!0;if(unselectSeletedItem(),g_selectedItem=e,g_selectedItemIndex=n,g_objGallery.trigger(t.events.ITEM_CHANGE,[e,i]),1==g_temp.isPlayMode){t.resetPlaying();var r=g_objSlider.isCurrentSlideLoadingImage();1==r&&t.pausePlaying()}},this.nextItem=function(){var e=g_selectedItemIndex+1;return 0==g_numItems?!0:0==g_options.gallery_carousel&&e>=g_numItems?!0:(e>=g_numItems&&(e=0),void t.selectItem(e,"next"))},this.prevItem=function(){var e=g_selectedItemIndex-1;return-1==g_selectedItemIndex&&(e=0),0==g_numItems?!0:0==g_options.gallery_carousel&&0>e?!0:(0>e&&(e=g_numItems-1),void t.selectItem(e,"prev"))},this.isFullScreen=function(){return 1==g_temp.isFakeFullscreen?!0:1==g_functions.isFullScreen()?!0:!1},this.isFakeFullscreen=function(){return g_temp.isFakeFullscreen},this.toFullScreen=function(){g_functions.setGlobalData("fullscreenID",g_galleryID);var e=g_objWrapper.get(0),t=g_functions.toFullscreen(e);0==t&&toFakeFullScreen()},this.exitFullScreen=function(){1==g_temp.isFakeFullscreen?exitFakeFullscreen():g_functions.exitFullscreen()},this.toggleFullscreen=function(){0==t.isFullScreen()?t.toFullScreen():t.exitFullScreen()},this.resize=function(e,t,i){g_objWrapper.css("width","auto"),g_objWrapper.css("max-width",e+"px"),t&&g_objWrapper.height(t),i||i===!0||onGalleryResized()},this.setSizeClass=function(e,i){if(!e)var e=g_objWrapper;if(!i)var n=t.getSize(),i=n.width;if(0==i)var i=jQuery(window).width();var r="";return 480>=i?r="ug-under-480":780>=i?r="ug-under-780":960>i&&(r="ug-under-960"),1==e.hasClass(r)?!0:(removeAllSizeClasses(e),void(""!=r&&e.addClass(r)))},this.isMobileMode=function(){return g_objWrapper.hasClass("ug-under-480")?!0:!1},this.isSmallWindow=function(){var e=jQuery(window).width();return e?480>=e?!0:!1:!0},this.isGalleryVisible=function(){var e=g_objWrapper.is(":visible");return e},this.changeItems=function(e,t){if(!e)var e="noitems";runGallery(g_galleryID,"nochange",e,t)},this.addItems=function(e){if(!e||0==e.length)return!1;var t=g_objWrapper.children(".ug-newitems-wrapper");0==t.length&&g_objWrapper.append("<div class='ug-newitems-wrapper' style='display:none'></div>"),t=g_objWrapper.children(".ug-newitems-wrapper"),t.append(e);var i=jQuery(t.children());if(fillItemsArray(i,!0),loadAPIs(),!g_objTheme||"function"!=typeof g_objTheme.addItems)throw new Error("addItems function not found in the theme");t.remove(),g_objTheme.addItems()},this.getNewAddedItemsIndexes=function(){var e=[];return jQuery.each(g_arrItems,function(t,i){1==i.isNewAdded&&e.push(t)}),e},this.showErrorMessageReplaceGallery=function(e){showErrorMessage(e)},this.setFuncCustomHeight=function(e){g_temp.funcCustomHeight=e},this.__________EXTERNAL_EVENTS_______=function(){},this.triggerEvent=function(e,t){t?("array"!=jQuery.type(t)&&(t=[t]),g_objGallery.trigger(e,t)):g_objGallery.trigger(e)},this.onEvent=function(e,t){g_objGallery.on(e,t)},this.destroyEvent=function(e){g_objGallery.off(e)},this.__________AJAX_REQUEST_______=function(){},this.ajaxRequest=function(e,t,i,n){if(!i||"function"!=typeof i)throw new Error("ajaxRequest error: success function should be passed");var r=g_options.gallery_urlajax;if(!r||""==r)throw new Error("ajaxRequest error: Ajax url don't passed");if("undefined"==typeof t)var t={};var o={action:"unitegallery_ajax_action",client_action:e,galleryID:g_galleryID,data:t};jQuery.ajax({type:"post",url:g_options.gallery_urlajax,dataType:"json",data:o,success:function(e){if(!e)throw new Error("Empty ajax response!");if(-1==e||0===e)throw new Error("ajax error!!!");if("undefined"==typeof e.success)throw new Error("ajax error!!!");return 0==e.success?(showErrorMessage(e.message,"ajax error"),!1):void i(e)},error:function(e,t,i){console.log("Ajax Error!!! "+t),responseText=e.responseText,n&&"function"==typeof n?n(responseText):trace(responseText)}})},this.requestNewItems=function(e,i,n){var r=g_options.gallery_enable_cache;if(n||(n=e),1==i&&(r=!1),1==r&&g_objCache.hasOwnProperty(n)){var o=g_objCache[n];t.changeItems(o,n)}else g_objGallery.trigger(t.events.GALLERY_BEFORE_REQUEST_ITEMS),t.ajaxRequest("front_get_cat_items",{catid:e},function(e){var i=e.html;t.changeItems(i,n)})},this.run=function(e,t){g_options.gallery_debug_errors;if(t&&t.hasOwnProperty("gallery_debug_errors")&&(g_options.gallery_debug_errors=t.gallery_debug_errors),1==g_options.gallery_debug_errors)try{runGallery(e,t)}catch(i){if("object"==typeof i){var n=i.message,r=i.lineNumber,o=i.fileName;i.stack;n+=" <br><br> in file: "+o,n+=" <b> line "+r+"</b>",trace(i)}else var n=i;n=n.replace("Error:",""),showErrorMessage(n)}else runGallery(e,t)}}function UGLightbox(){function e(e,i){ie=e,U=jQuery(e),ae=jQuery.extend(ae,le),ae=jQuery.extend(ae,i),se.originalOptions=jQuery.extend({},ae),"compact"==ae.lightbox_type&&(se.isCompact=!0,ae=jQuery.extend(ae,ue),ae=jQuery.extend(ae,i)),t(),1==se.putSlider?(ie.initSlider(ae,"lightbox"),g_objects=e.getObjects(),ne=g_objects.g_objSlider):ne=null,1==ae.lightbox_show_textpanel?oe.init(ie,ae,"lightbox"):oe=null}function t(){1==se.isCompact&&1==ae.lightbox_show_textpanel&&(ae.lightbox_slider_image_padding_bottom=se.initTextPanelHeight),1==se.isCompact&&"inside"==ae.lightbox_arrows_position&&(se.isArrowsInside=!0),1==se.isArrowsInside&&0==ae.lightbox_arrows_inside_alwayson&&(se.isArrowsOnHoverMode=!0),0==ae.lightbox_show_textpanel&&(se.isTopPanelEnabled=!1,se.topPanelHeight=0,ae.lightbox_slider_image_padding_top=0)}function i(){var e="",t="";1==se.isCompact&&(t=" ug-lightbox-compact"),e+="<div class='ug-gallery-wrapper ug-lightbox"+t+"'>",e+="<div class='ug-lightbox-overlay'></div>",0==se.isCompact&&se.isTopPanelEnabled?(e+="<div class='ug-lightbox-top-panel'>",e+="<div class='ug-lightbox-top-panel-overlay'></div>",ae.lightbox_show_numbers&&(e+="<div class='ug-lightbox-numbers'></div>"),e+="</div>"):ae.lightbox_show_numbers&&(e+="<div class='ug-lightbox-numbers'></div>"),e+="<div class='ug-lightbox-button-close'></div>",e+="<div class='ug-lightbox-arrow-left'></div>",e+="<div class='ug-lightbox-arrow-right'></div>",e+="</div>",V=jQuery(e),jQuery("body").append(V),ne&&ne.setHtml(V),X=V.children(".ug-lightbox-overlay"),0==se.isCompact&&1==se.isTopPanelEnabled&&($=V.children(".ug-lightbox-top-panel"),0==$.length&&($=null)),K=V.find(".ug-lightbox-button-close"),ae.lightbox_show_numbers&&(J=V.find(".ug-lightbox-numbers")),Z=V.children(".ug-lightbox-arrow-left"),q=V.children(".ug-lightbox-arrow-right"),oe&&($?oe.appendHTML($):oe.appendHTML(V))}function n(){if(null!==ae.lightbox_overlay_color&&X.css("background-color",ae.lightbox_overlay_color),null!==ae.lightbox_overlay_opacity&&X.fadeTo(0,ae.lightbox_overlay_opacity),$&&null!==ae.lightbox_top_panel_opacity&&$.children(".ug-lightbox-top-panel-overlay").fadeTo(0,ae.lightbox_top_panel_opacity),J){var e={};null!==ae.lightbox_numbers_size&&(e["font-size"]=ae.lightbox_numbers_size+"px"),ae.lightbox_numbers_color&&(e.color=ae.lightbox_numbers_color),null!==ae.lightbox_numbers_padding_right&&(e["padding-right"]=ae.lightbox_numbers_padding_right+"px"),null!==ae.lightbox_numbers_padding_top&&(e["padding-top"]=ae.lightbox_numbers_padding_top+"px"),J.css(e)}}function r(e){if(!ne)return!0;var t={slider_image_padding_top:e};ne.setOptions(t),ne.refreshSlideItems()}function o(e){if(!$)return!1;if(!oe)return!1;var t=$.height();if(0==t)return!1;if(0==$.is(":visible"))return!1;var i=t,n=oe.getSize(),o=n.height;t!=se.topPanelHeight&&(i=se.topPanelHeight),o>i&&(i=o),t!=i&&($.height(i),ne&&0==ne.isAnimating()&&r(i))}function a(e){var t={},i=ae.lightbox_textpanel_width,n=47,r=40,a=e.width-n-r;i>a?(t.textpanel_padding_left=n,t.textpanel_padding_right=r,t.textpanel_title_text_align="center",t.textpanel_desc_text_align="center"):(t.textpanel_padding_left=Math.floor((e.width-i)/2),t.textpanel_padding_right=t.textpanel_padding_left,t.textpanel_title_text_align="left",t.textpanel_desc_text_align="left",ae.lightbox_textpanel_title_text_align&&(t.textpanel_title_text_align=ae.lightbox_textpanel_desc_text_align),ae.lightbox_textpanel_desc_text_align&&(t.textpanel_desc_text_align=ae.lightbox_textpanel_desc_text_align)),oe.setOptions(t),oe.refresh(!0,!0),o("positionTextPanelWide"),oe.positionPanel()}function s(){return $?void $.hide():!1}function l(){return $?void $.show():!1}function u(e){if(0==se.isOpened)return!1;if(!oe)return!1;if(!ne)return!1;var t=re.getElementSize(V),i=oe.getSize();if(0==i.width||i.height>120)return!1;if(!e)var n=ne.getSlideImage(),e=re.getElementSize(n);if(0==e.height||0==e.width)return!1;var r=e.bottom+i.height;if(r<t.height)return!1;var o=ne.getOptions(),a=i.height;if(a!=o.slider_image_padding_bottom){var s={slider_image_padding_bottom:a};if(0==ne.isAnimating())return ne.setOptions(s),ne.refreshSlideItems(),!0}return!1}function d(e,t){if(!e)var i=ne.getSlideImage(),e=re.getElementSize(i);se.textPanelTop=e.bottom,t===!0&&oe.positionPanel(se.textPanelTop,se.textPanelLeft)}function _(e){var t=(re.getElementSize(V),ne.getSlideImage()),i=re.getElementSize(t);if(0==i.width)return!1;se.textPanelLeft=i.left,se.textPanelTop=i.bottom;var n=i.width;if(J){var r=re.getElementSize(J);n-=r.width;var o=i.right-r.width;re.placeElement(J,o,se.textPanelTop)}oe&&(oe.show(),oe.refresh(!0,!0,n),d(i));var a=u(i);0==a&&(se.positionFrom="handleCompactTextpanelSizes",oe&&(oe.positionPanel(se.textPanelTop,se.textPanelLeft),e===!0&&(e(),j())))}function g(){if(0==ne.isCurrentSlideType("image"))return!0;var e=1==ne.isCurrentImageInPlace();return e}function c(e,t){if(0==se.isArrowsInside)return!1;if(!Z)return!1;var i=g();if(Z.show(),q.show(),se.positionFrom="positionArrowsInside",1==se.isArrowsOnHoverMode&&1==i&&0==y()&&I(!0),0==i)var n=re.getElementRelativePos(Z,"left",ae.lightbox_arrows_offset),r=re.getElementRelativePos(Z,"middle"),o=re.getElementRelativePos(q,"right",ae.lightbox_arrows_offset),a=r;else var s=ne.getSlideImage(),l=re.getElementSize(s),n=(re.getElementSize(ne.getElement()),re.getElementRelativePos(Z,"left",0,s)+l.left+ae.lightbox_arrows_inside_offset),r=re.getElementRelativePos(Z,"middle",0,s)+l.top,o=re.getElementRelativePos(Z,"right",0,s)+l.left-ae.lightbox_arrows_inside_offset,a=r;if(t===!0){var u={left:n,top:r},d={left:o,top:a};Z.stop().animate(u,{duration:se.fadeDuration}),q.stop().animate(d,{duration:se.fadeDuration})}else Z.stop(),q.stop(),re.placeElement(Z,n,r),re.placeElement(q,o,a);1==e&&E(t)}function h(e,t){se.positionFrom=null;var i=g(),n=2,r=re.getElementRelativePos(K,"right",2,V);if(0==i)var o=n,a=r;else{var s=ne.getSlideImage(),l=re.getElementSize(s),u=re.getElementSize(ne.getElement()),d=re.getElementSize(K);u.top==u.height&&(u.top=0);var a=u.left+l.right-d.width/2+ae.lightbox_compact_closebutton_offsetx,o=u.top+l.top-d.height/2-ae.lightbox_compact_closebutton_offsety;n>o&&(o=n),a>r&&(a=r)}if(t===!0){var _={left:a,top:o};K.stop().animate(_,{duration:se.fadeDuration})}else K.stop(),re.placeElement(K,a,o);e===!0&&T(t)}function p(){K&&K.stop().fadeTo(se.fadeDuration,0),v(),b(),se.positionFrom="hideCompactElements",1==se.isArrowsInside&&I()}function f(){K&&K.hide(),Z&&1==se.isArrowsInside&&(Z.hide(),q.hide()),J&&J.hide(),oe&&oe.hide()}function m(){var e=re.getElementSize(V);$&&re.setElementSizeAndPosition($,0,0,e.width,se.topPanelHeight),Z&&0==se.isArrowsInside&&(1==ae.lightbox_hide_arrows_onvideoplay&&(Z.show(),q.show()),re.placeElement(Z,"left","middle",ae.lightbox_arrows_offset),re.placeElement(q,"right","middle",ae.lightbox_arrows_offset)),0==se.isCompact&&re.placeElement(K,"right","top",2,2),oe&&(se.positionFrom="positionElements",0==se.isCompact?a(e):(x(),j()));var t=e.width,i=e.height,n=0,r=0;if(ne){if($){var o=$.height(),s={slider_image_padding_top:o};ne.setOptions(s)}ne.setSize(t,i),ne.setPosition(r,n)}}function v(){oe&&oe.getElement().stop().fadeTo(se.fadeDuration,0)}function b(){J&&J.stop().fadeTo(se.fadeDuration,0)}function y(){if(!se.lastMouseX)return!0;var e={pageX:se.lastMouseX,pageY:se.lastMouseY},t=ne.isMouseInsideSlideImage(e);return t}function I(e,t){return Z?1==se.isArrowsOnHoverMode&&t===!1?(1==y(),!0):void(e===!0?(Z.stop().fadeTo(0,0),q.stop().fadeTo(0,0)):(Z.stop().fadeTo(se.fadeDuration,0),q.stop().fadeTo(se.fadeDuration,0))):!1}function w(){if(!Z)return!0;if(0==Z.is(":visible"))return!0;var e=Z.css("opacity");return 1!=e?!0:!1}function E(e,t){return Z?1==se.isArrowsOnHoverMode&&t!==!0&&1==g()?!0:1==ne.isSwiping()?!0:(e!==!0&&(Z.stop(),q.stop()),Z.fadeTo(se.fadeDuration,1),void q.fadeTo(se.fadeDuration,1)):!1}function T(e){e!==!0&&K.stop(),K.fadeTo(se.fadeDuration,1)}function S(e){if(!oe)return!1;if(!e)var e=ne.getCurrentItem();oe.setTextPlain(e.title,e.description)}function P(e){if(!J)return!1;if(!e)var e=ne.getCurrentItem();var t=ie.getNumItems(),i=e.index+1;J.html(i+" / "+t)}function x(){return oe?void oe.getElement().show().stop().fadeTo(se.fadeDuration,1):!1}function j(){J&&J.stop().fadeTo(se.fadeDuration,1)}function C(){return 0==se.isCompact?!0:void p()}function A(){if(0==se.isCompact)return!0;if(se.positionFrom="onZoomChange",h(!1,!0),c(!1,!0),1==se.isCompact){var e=ne.isCurrentSlideType("image")&&1==ne.isCurrentImageInPlace();0==e?(v(),b()):(se.positionFrom="onZoomChange",x(),j())}}function M(){if(0==se.isCompact)return!0;se.positionFrom="onSliderAfterReturn",h(!0),c(!0);var e=u();0==e&&_(),x(),j()}function O(e,t){return t=jQuery(t),0==se.isCompact?!0:0==ne.isSlideCurrent(t)?!0:(se.positionFrom="onSliderAfterPutImage",h(!0),c(!0),void _())}function z(){var e=ne.getOptions(),t=e.slider_image_padding_top;if($){var i=$.height();i!=t&&r(i)}if(1==se.isCompact){if(S(),P(),se.positionFrom="onSliderTransitionEnd",h(!0),c(!0),0==ne.isSlideActionActive()){var n=u();0==n&&_()}x(),j()}}function L(e,t){0==se.isCompact?(J&&P(t),oe&&(S(t),0==se.isRightNowOpened&&(oe.positionElements(!1),o("onchange"),oe.positionPanel()))):0==ne.isAnimating()&&(oe&&S(t),J&&P(t)),0==se.isSliderChangedOnce&&(se.isSliderChangedOnce=!0,te.trigger(ee.events.LIGHTBOX_INIT))}function H(e,t){var i=ne.getSlideType();if("image"!=i&&0==se.isCompact&&ne.isSlideActionActive())return!0;var n=ne.isPreloading();if(1==n)return ee.close("slider"),!0;if(1==ae.lightbox_close_on_emptyspace){var r=ne.isMouseInsideSlideImage(t);0==r&&ee.close("slider_inside")}}function N(){m()}function k(){$?s():J&&J.hide(),Z&&1==ae.lightbox_hide_arrows_onvideoplay&&(Z.hide(),q.hide())}function R(){$?(l(),o("onStopVideo")):J&&J.show(),Z&&1==ae.lightbox_hide_arrows_onvideoplay&&(Z.show(),q.show())}function G(e,t,i){var n=!1;switch(t){case 27:1==se.isOpened&&ee.close("keypress");break;case 38:case 40:case 33:case 34:n=!0}1==se.isOpened&&1==n&&i.preventDefault()}function D(){1==se.isArrowsOnHoverMode&&E(!1,!0)}function Q(e){se.positionFrom="hideCompactElements",1==se.isArrowsOnHoverMode&&1==g()&&I(!1,!0)}function W(e){se.lastMouseX=e.pageX,se.lastMouseY=e.pageY;var t=w();1==t&&y()&&0==ne.isAnimating()&&(se.positionFrom="onMouseMove",Z&&0==Z.is(":animated")&&E(!1,!0))}function B(e,t,i,n){if(0==se.isOpened)return!0;switch(ae.gallery_mousewheel_role){default:case"zoom":var r=ne.getSlideType();"image"!=r&&e.preventDefault();break;case"none":e.preventDefault();break;case"advance":ie.onGalleryMouseWheel(e,t,i,n)}}function F(){if(X.on("touchstart",function(e){e.preventDefault()}),X.on("touchend",function(e){ee.close("overlay")}),re.addClassOnHover(q,"ug-arrow-hover"),re.addClassOnHover(Z,"ug-arrow-hover"),re.addClassOnHover(K),ie.setNextButton(q),ie.setPrevButton(Z),K.click(function(){ee.close("button")}),U.on(ie.events.ITEM_CHANGE,L),ne){jQuery(ne).on(ne.events.TRANSITION_END,z),jQuery(ne).on(ne.events.CLICK,H);var e=ne.getVideoObject();jQuery(e).on(e.events.PLAY_START,k),jQuery(e).on(e.events.PLAY_STOP,R),jQuery(ne).on(ne.events.START_DRAG,C),jQuery(ne).on(ne.events.TRANSITION_START,C),jQuery(ne).on(ne.events.AFTER_DRAG_CHANGE,M),jQuery(ne).on(ne.events.AFTER_RETURN,M),jQuery(ne).on(ne.events.AFTER_PUT_IMAGE,O),jQuery(ne).on(ne.events.ZOOM_CHANGE,A),jQuery(ne).on(ne.events.IMAGE_MOUSEENTER,D),jQuery(ne).on(ne.events.IMAGE_MOUSELEAVE,Q)}jQuery(window).resize(function(){return 0==se.isOpened?!0:void re.whenContiniousEventOver("lightbox_resize",N,100)}),U.on(ie.events.GALLERY_KEYPRESS,G),1==se.isArrowsOnHoverMode&&jQuery(document).bind("mousemove",W),V.on("mousewheel",B)}function Y(){se.isCompact=!1,t(),se.isArrowsInside=!1,se.isArrowsOnHoverMode=!1,ae=jQuery.extend({},se.originalOptions),ae.lightbox_arrows_position="sides",ne.setOptions(ae)}var U,V,X,Z,q,K,J,$,ee=this,te=jQuery(this),ie=new UniteGalleryMain,ne=new UGSlider,re=new UGFunctions,oe=new UGTextPanel,ae={lightbox_type:"wide",lightbox_show_textpanel:!0,lightbox_textpanel_width:550,lightbox_hide_arrows_onvideoplay:!0,lightbox_arrows_position:"sides",lightbox_arrows_offset:10,lightbox_arrows_inside_offset:10,lightbox_arrows_inside_alwayson:!1,lightbox_overlay_color:null,lightbox_overlay_opacity:1,lightbox_top_panel_opacity:null,lightbox_show_numbers:!0,lightbox_numbers_size:null,lightbox_numbers_color:null,lightbox_numbers_padding_top:null,lightbox_numbers_padding_right:null,lightbox_compact_closebutton_offsetx:1,lightbox_compact_closebutton_offsety:1,lightbox_close_on_emptyspace:!0};this.events={LIGHTBOX_INIT:"lightbox_init"};var se={topPanelHeight:44,initTextPanelHeight:26,isOpened:!1,isRightNowOpened:!1,putSlider:!0,isCompact:!1,fadeDuration:300,positionFrom:null,textPanelTop:null,textPanelLeft:null,isArrowsInside:!1,isArrowsOnHoverMode:!1,lastMouseX:null,lastMouseY:null,originalOptions:null,isSliderChangedOnce:!1,isTopPanelEnabled:!0},le={lightbox_slider_controls_always_on:!0,lightbox_slider_enable_bullets:!1,lightbox_slider_enable_arrows:!1,lightbox_slider_enable_progress_indicator:!1,lightbox_slider_enable_play_button:!1,lightbox_slider_enable_fullscreen_button:!1,lightbox_slider_enable_zoom_panel:!1,lightbox_slider_enable_text_panel:!1,
lightbox_slider_scale_mode_media:"down",lightbox_slider_scale_mode:"down",lightbox_slider_loader_type:3,lightbox_slider_loader_color:"black",lightbox_slider_transition:"fade",lightbox_slider_image_padding_top:se.topPanelHeight,lightbox_slider_image_padding_bottom:0,lightbox_slider_video_padding_top:0,lightbox_slider_video_padding_bottom:0,lightbox_textpanel_align:"middle",lightbox_textpanel_padding_top:5,lightbox_textpanel_padding_bottom:5,slider_video_constantsize:!1,lightbox_slider_image_border:!1,lightbox_textpanel_enable_title:!0,lightbox_textpanel_enable_description:!1,lightbox_textpanel_desc_style_as_title:!0,lightbox_textpanel_enable_bg:!1,video_enable_closebutton:!1,lightbox_slider_video_enable_closebutton:!1,video_youtube_showinfo:!1,lightbox_slider_enable_links:!1},ue={lightbox_overlay_opacity:.6,lightbox_slider_image_border:!0,lightbox_slider_image_shadow:!0,lightbox_slider_image_padding_top:30,lightbox_slider_image_padding_bottom:30,slider_video_constantsize:!0,lightbox_textpanel_align:"bottom",lightbox_textpanel_title_text_align:"left",lightbox_textpanel_desc_text_align:"left",lightbox_textpanel_padding_left:10,lightbox_textpanel_padding_right:10};this.destroy=function(){if(jQuery(document).unbind("mousemove"),X.off("touchstart"),X.off("touchend"),K.off("click"),U.off(ie.events.ITEM_CHANGE),ne){jQuery(ne).off(ne.events.TRANSITION_END),jQuery(ne).off(ne.events.CLICK),jQuery(ne).off(ne.events.START_DRAG),jQuery(ne).off(ne.events.TRANSITION_START),jQuery(ne).off(ne.events.AFTER_DRAG_CHANGE),jQuery(ne).off(ne.events.AFTER_RETURN);var e=ne.getVideoObject();jQuery(e).off(e.events.PLAY_START),jQuery(e).off(e.events.PLAY_STOP),jQuery(ne).on(ne.events.IMAGE_MOUSEENTER,D),jQuery(ne).on(ne.events.IMAGE_MOUSELEAVE,Q),ne.destroy()}jQuery(window).unbind("resize"),U.off(ie.events.GALLERY_KEYPRESS,G),V.off("mousewheel"),V.remove()},this.open=function(e){var t=ie.getItem(e);if(se.isOpened=!0,se.isRightNowOpened=!0,setTimeout(function(){se.isRightNowOpened=!1},100),ne&&ne.setItem(t,"lightbox_open"),oe&&oe.setTextPlain(t.title,t.description),X.stop().fadeTo(0,0),V.show(),V.fadeTo(0,1),X.stop().fadeTo(se.fadeDuration,ae.lightbox_overlay_opacity),m(),1==se.isCompact){var i=ne.isPreloading();1==i?f():1==se.isArrowsInside&&(Z.hide(),q.hide())}ne&&ne.startSlideAction(),U.trigger(ie.events.OPEN_LIGHTBOX,t)},this.close=function(e){se.isOpened=!1,1==se.isCompact&&p(),ne&&ne.stopSlideAction();var t=ne.getSlideType();"image"!=t?V.hide():V.fadeTo(se.fadeDuration,0,function(){V.hide()}),U.trigger(ie.events.CLOSE_LIGHTBOX)},this.init=function(t,i){e(t,i)},this.putHtml=function(){var e=ie.isSmallWindow();e&&1==se.isCompact&&Y(),i()},this.run=function(){n(),ne&&ne.run(),F()}}function UGCarousel(){function e(e,t){g_objects=e.getObjects(),W=e,H=jQuery(e),N=g_objects.g_objWrapper,k=g_objects.g_arrItems,U=jQuery.extend(U,t),F.setFixedMode(),F.setApproveClickFunction(L),F.init(e,U),Y=F.getObjThumbs(),U=F.getOptions(),V.initTileWidth=U.tile_width,V.initTileHeight=U.tile_height,V.tileWidth=U.tile_width}function t(e){if(!e)var e=N;var t="<div class='ug-carousel-wrapper'><div class='ug-carousel-inner'></div></div>";N.append(t),R=N.children(".ug-carousel-wrapper"),G=R.children(".ug-carousel-inner"),F.setHtml(G),Y.getThumbs().fadeTo(0,1)}function i(e,t){if(!t)var t=V.initTileHeight/V.initTileWidth*e;V.tileWidth=e;var i={tile_width:e,tile_height:t};F.setOptions(i),U.tile_width=e,U.tile_height=t,F.resizeAllTiles(e),m(!0)}function n(){if(null===V.carouselMaxWidth)throw new Error("The carousel width not set");if(V.tileWidth<V.initTileWidth){var e=V.carouselMaxWidth-2*U.carousel_padding;e>V.initTileWidth&&(e=V.initTileWidth),i(e);var t=B.getNumItemsInSpace(V.carouselMaxWidth,e,U.carousel_space_between_tiles)}else{var t=B.getNumItemsInSpace(V.carouselMaxWidth,V.tileWidth,U.carousel_space_between_tiles);if(0>=t){t=1;var e=V.carouselMaxWidth-2*U.carousel_padding;i(e)}}var n=B.getSpaceByNumItems(t,V.tileWidth,U.carousel_space_between_tiles);n+=2*U.carousel_padding,R.width(n),1==V.isFirstTimeRun?(z(),F.run(),jQuery.each(k,function(e,t){t.objThumbWrapper.data("index",e),N.trigger(V.eventSizeChange,[t.objThumbWrapper,!0]),t.objTileOriginal=t.objThumbWrapper.clone(!0,!0)}),m(!0),1==U.carousel_autoplay&&D.startAutoplay()):(1==U.carousel_autoplay&&D.pauseAutoplay(),w(0,!1),1==U.carousel_autoplay&&D.startAutoplay()),P(),V.isFirstTimeRun=!1}function r(){return B.getElementSize(G).left}function o(e){return B.getMousePosition(e).pageX}function a(){var e=G.children(".ug-thumb-wrapper");return e}function s(e){var t=B.getNumItemsInSpace(e,V.tileWidth,U.carousel_space_between_tiles);return t}function l(){return a().length}function u(e){v(e);var t=a(),i=jQuery(t[e]);return i}function d(){return G.children(".ug-thumb-wrapper").first()}function _(){return G.children(".ug-thumb-wrapper").last()}function g(e,t,i){var n=e.data("index");if(void 0==n)throw new Error("every tile should have index!");for(var r=[],o=0;t>o;o++){if("prev"==i)var a=W.getPrevItem(n,!0);else var a=W.getNextItem(n,!0);if(!a)throw new Error("the item to add is empty");var s=a.objTileOriginal.clone(!0,!0);n=a.index,s.addClass("cloned"),r.push(s)}return r}function c(){var e=B.getElementSize(R),t=B.getElementSize(G),i=t.width-e.width+t.left,n=V.sideSpace-i;return n}function h(){var e=-r(),t=V.sideSpace-e;return t}function p(){var e=B.getElementSize(R);return e.width}function f(){var e=p(),t=s(e);return t}function m(e){if(!e)var e=!1;var t,i=a(),n=0,r=0;return jQuery.each(i,function(e,o){o=jQuery(o),B.placeElement(o,n,0);var a=B.getElementSize(o);n+=a.width+U.carousel_space_between_tiles,r=Math.max(r,a.height),e==i.length-1&&(t=a.right)}),G.width(t),r+=2*U.carousel_padding,e===!0&&(G.height(r),R.height(r)),w(V.numCurrent,!1),t}function v(e){if(e>a().length-1)throw new Error("Wrogn tile number: "+e)}function b(e,t){if("left"==t)var i=d();else var i=_();var n="left"==t?"prev":"next",r=g(i,e,n);jQuery.each(r,function(e,i){"left"==t?G.prepend(i):G.append(i),N.trigger(V.eventSizeChange,i),F.loadTileImage(i)})}function y(e,t){v(n);for(var i=a(),n=i.length,r=0;e>r;r++)"left"==t?jQuery(i[r]).remove():jQuery(i[n-1-r]).remove()}function I(e){var t={left:e+"px"};G.css(t)}function w(e,t,i){if(void 0===t){var t=!0;if(G.is(":animated"))return!0}var n=u(e),r=B.getElementSize(n),o=-r.left+U.carousel_padding,a={left:o+"px"};if(t===!0){var s=U.carousel_scroll_duration,l=U.carousel_scroll_easing;i===!0&&(s=V.scrollShortDuration,l=V.scrollShortEasing),G.stop(!0).animate(a,{duration:s,easing:l,queue:!1,complete:function(){V.numCurrent=e,S(!0)}})}else V.numCurrent=e,G.css(a)}function E(){var e=-r(),t=s(e),i=B.getElementSize(u(t)).left,n=B.getElementSize(u(t+1)).left;return Math.abs(i-e)<Math.abs(n-e)?t:t+1}function T(){var e=E();w(e,!0,!0)}function S(){var e=h(),t=c(),i=0,n=0,r=0,o=0,a=l();if(e>V.spaceActionSize)i=s(e),b(i,"left"),V.numCurrent+=i;else if(e<-V.spaceActionSize){var r=s(Math.abs(e));y(r,"left"),V.numCurrent-=r}if(t>V.spaceActionSize?(n=s(t),b(n,"right")):t<-V.spaceActionSize&&(o=s(Math.abs(t)),y(o,"right")),o>a)throw new Error("Can't remove more then num tiles");var u=!1;return(i||n||r||o)&&(m(),u=!0),u}function P(e){B.placeElement(G,0,U.carousel_padding),S()}function x(){"left"==U.carousel_autoplay_direction?D.scrollRight(1):D.scrollLeft(1)}function j(e){return 1==V.touchActive?!0:(V.touchActive=!0,D.pauseAutoplay(),V.startTime=jQuery.now(),V.startMousePos=o(e),V.startInnerPos=r(),V.lastTime=V.startTime,V.lastMousePos=V.startMousePos,void B.storeEventData(e,V.storedEventID))}function C(e){if(0==V.touchActive)return!0;B.updateStoredEventData(e,V.storedEventID),e.preventDefault();var t=null;if(1==U.carousel_vertical_scroll_ondrag&&(t=B.handleScrollTop(V.storedEventID)),"vert"===t)return!0;V.lastMousePos=o(e);var i=V.lastMousePos-V.startMousePos,n=V.startInnerPos+i,r=i>0?"prev":"next",a=B.getElementSize(G).width;n>0&&"prev"==r&&(n/=3),-a>n&&"next"==r&&(n=V.startInnerPos+i/3),I(n)}function A(e){return 0==V.touchActive?!0:(V.touchActive=!1,T(),void D.unpauseAutoplay())}function M(e){return 0==U.carousel_autoplay_pause_onhover?!0:void(1==V.isPlayMode&&0==V.isPaused&&D.pauseAutoplay())}function O(e){return 0==U.carousel_autoplay_pause_onhover?!0:void D.unpauseAutoplay()}function z(){F.initEvents(),R.bind("mousedown touchstart",j),jQuery("body").bind("mousemove touchmove",C),jQuery(window).add("body").bind("mouseup touchend",A),R.hover(M,O)}function L(){var e=V.lastTime-V.startTime,t=Math.abs(V.lastMousePos-V.startMousePos);return e>300?!1:t>30?!1:!0}var H,N,k,R,G,D=this,Q=jQuery(this),W=new UniteGalleryMain,B=new UGFunctions,F=new UGTileDesign,Y=new UGThumbsGeneral,U={carousel_padding:8,carousel_space_between_tiles:20,carousel_navigation_numtiles:3,carousel_scroll_duration:500,carousel_scroll_easing:"easeOutCubic",carousel_autoplay:!0,carousel_autoplay_timeout:3e3,carousel_autoplay_direction:"right",carousel_autoplay_pause_onhover:!0,carousel_vertical_scroll_ondrag:!1};this.events={START_PLAY:"carousel_start_play",PAUSE_PLAY:"carousel_pause_play",STOP_PLAY:"carousel_stop_play"};var V={eventSizeChange:"thumb_size_change",isFirstTimeRun:!0,carouselMaxWidth:null,tileWidth:0,initTileWidth:0,initTileHeight:0,sideSpace:1500,spaceActionSize:500,numCurrent:0,touchActive:!1,startInnerPos:0,lastTime:0,startTime:0,startMousePos:0,lastMousePos:0,scrollShortDuration:200,scrollShortEasing:"easeOutQuad",handle:null,isPlayMode:!1,isPaused:!1,storedEventID:"carousel"};this.startAutoplay=function(){V.isPlayMode=!0,V.isPaused=!1,Q.trigger(D.events.START_PLAY),V.handle&&clearInterval(V.handle),V.handle=setInterval(x,U.carousel_autoplay_timeout)},this.unpauseAutoplay=function(){return 0==V.isPlayMode?!0:0==V.isPaused?!0:void D.startAutoplay()},this.pauseAutoplay=function(){return 0==V.isPlayMode?!0:(V.isPaused=!0,V.handle&&clearInterval(V.handle),void Q.trigger(D.events.PAUSE_PLAY))},this.stopAutoplay=function(){return 0==V.isPlayMode?!0:(V.isPaused=!1,V.isPlayMode=!1,V.handle&&clearInterval(V.handle),void Q.trigger(D.events.STOP_PLAY))},this.destroy=function(){V.handle&&clearInterval(V.handle),Q.off(D.events.START_PLAY),Q.off(D.events.STOP_PLAY),R.unbind("mousedown"),R.unbind("touchstart"),jQuery("body").unbind("mousemove"),jQuery("body").unbind("touchmove"),jQuery(window).add("body").unbind("mouseup").unbind("touchend"),R.off("mouseenter").off("mouseleave"),F.destroy()},this.init=function(t,i,n){n&&this.setMaxWidth(n),e(t,i)},this.setMaxWidth=function(e){V.carouselMaxWidth=e},this.setHtml=function(e){t(e)},this.getElement=function(){return R},this.getObjTileDesign=function(){return F},this.getEstimatedHeight=function(){var e=U.tile_height+2*U.carousel_padding;return e},this.run=function(){n()},this.scrollRight=function(e){if(!e||"object"==typeof e)var e=U.carousel_navigation_numtiles;var t=f();e>t&&(e=t);var i=V.numCurrent-e;0>=i&&(i=0),w(i)},this.scrollLeft=function(e){if(!e||"object"==typeof e)var e=U.carousel_navigation_numtiles;var t=f();e>t&&(e=t);var i=l(),n=V.numCurrent+e;n>=i&&(n=i-1),w(n)},this.setScrollLeftButton=function(e){B.setButtonMobileReady(e),B.setButtonOnClick(e,D.scrollLeft)},this.setScrollRightButton=function(e){B.setButtonMobileReady(e),B.setButtonOnClick(e,D.scrollRight)},this.setPlayPauseButton=function(e){B.setButtonMobileReady(e),1==V.isPlayMode&&0==V.isPaused&&e.addClass("ug-pause-icon"),Q.on(D.events.START_PLAY,function(){e.addClass("ug-pause-icon")}),Q.on(D.events.STOP_PLAY,function(){e.removeClass("ug-pause-icon")}),B.setButtonOnClick(e,function(){0==V.isPlayMode||1==V.isPaused?D.startAutoplay():D.stopAutoplay()})}}function UGTabs(){function e(e,t){u=e,a=jQuery(u),d=jQuery.extend(d,t),"select"==d.tabs_type?l=jQuery(d.tabs_container):s=jQuery(d.tabs_container+" .ug-tab")}function t(){o()}function i(e){u.requestNewItems(e)}function n(){var e=d.tabs_class_selected,t=jQuery(this);if(t.hasClass(e))return!0;s.not(t).removeClass(e),t.addClass(e);var n=t.data("catid");return n?void i(n):!0}function r(){var e=jQuery(this),t=e.val();return t?void i(t):!0}function o(){"select"==d.tabs_type?l.change(r):s.click(n)}var a,s,l,u=(jQuery(this),new UniteGalleryMain),d=(new UGFunctions,{tabs_type:"tabs",tabs_container:"#ug_tabs",tabs_class_selected:"ug-tab-selected"});this.events={},this.destroy=function(){l&&l.off("change"),s&&s.off("click")},this.init=function(t,i){e(t,i)},this.run=function(){t()}}function UG_API(e){function t(e){var t={index:e.index,title:e.title,description:e.description,urlImage:e.urlImage,urlThumb:e.urlThumb},i=e.objThumbImage.data();for(var n in i){switch(n){case"image":case"description":continue}t[n]=i[n]}return t}var i,n=this,r=(jQuery(n),new UniteGalleryMain),o=[];r=e,i=jQuery(e),this.events={API_INIT_FUNCTIONS:"api_init",API_ON_EVENT:"api_on_event"},this.on=function(e,a,s){switch(s!==!0&&o.push({event:e,func:a}),e){case"item_change":i.on(r.events.ITEM_CHANGE,function(){var e=r.getSelectedItem(),i=t(e);a(i.index,i)});break;case"resize":i.on(r.events.SIZE_CHANGE,a);break;case"enter_fullscreen":i.on(r.events.ENTER_FULLSCREEN,a);break;case"exit_fullscreen":i.on(r.events.EXIT_FULLSCREEN,a);break;case"play":i.on(r.events.START_PLAY,a);break;case"stop":i.on(r.events.STOP_PLAY,a);break;case"pause":i.on(r.events.PAUSE_PLAYING,a);break;case"continue":i.on(r.events.CONTINUE_PLAYING,a);break;case"open_lightbox":i.on(r.events.OPEN_LIGHTBOX,a);break;case"close_lightbox":i.on(r.events.CLOSE_LIGHTBOX,a);break;default:console&&console.log("wrong api event: "+e)}i.trigger(n.events.API_ON_EVENT,[e,a])},this.play=function(){r.startPlayMode()},this.stop=function(){r.stopPlayMode()},this.togglePlay=function(){r.togglePlayMode()},this.enterFullscreen=function(){r.toFullScreen()},this.exitFullscreen=function(){r.exitFullScreen()},this.toggleFullscreen=function(){r.toggleFullscreen()},this.resetZoom=function(){var e=r.getObjSlider();return e?void e.zoomBack():!1},this.zoomIn=function(){var e=r.getObjSlider();return e?void e.zoomIn():!1},this.zoomOut=function(){var e=r.getObjSlider();return e?void e.zoomOut():!1},this.nextItem=function(){r.nextItem()},this.prevItem=function(){r.prevItem()},this.selectItem=function(e){r.selectItem(e)},this.resize=function(e,t){t?r.resize(e,t):r.resize(e)},this.getItem=function(e){var i=r.getItem(e),n=t(i);return n},this.getNumItems=function(){var e=r.getNumItems();return e},this.reloadGallery=function(e){if(!e)var e={};r.run(null,e),o.map(function(e){n.on(e.event,e.func,!0)})},this.destroy=function(){r.destroy()},i.trigger(n.events.API_INIT_FUNCTIONS,n)}function UGLoadMore(){function e(){return o=jQuery("#"+_.loadmore_container),0==o.length?!1:(a=o.find(".ug-loadmore-button"),0==a.length?!1:(s=o.find(".ug-loadmore-loader"),0==s.length?!1:(l=o.find(".ug-loadmore-error"),0==l.length?!1:void(d.isInited=!0))))}function t(){o.show()}function i(){a.hide(),s.show();var e={numitems:u.getNumItems()};u.ajaxRequest("front_loadmore",e,function(e){s.hide();var t=e.html_items,i=e.show_loadmore;1==i?(a.blur().show(),s.hide()):o.hide(),u.addItems(t)},function(e){e="Ajax Error!"+e,s.hide(),l.show(),l.html(e)})}function n(){u.onEvent("tiles_first_placed",t),a.click(i)}var r,o,a,s,l,u=(jQuery(this),new UniteGalleryMain),d=(new UGFunctions,{isInited:!1}),_={loadmore_container:"ug_loadmore_wrapper"};this.events={},this.destroy=function(){return 0==d.isInited?!1:void 0},this.init=function(t,i){return u=t,r=jQuery(u),_=jQuery.extend(_,i),e(),0==d.isInited?(trace("load more not inited, something is wrong"),!1):void n()}}var g_ugFunctions=new UGFunctions;!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var a=t||window.event,s=l.call(arguments,1),u=0,d=0,_=0,g=0;if(t=e.event.fix(a),t.type="mousewheel","detail"in a&&(_=-1*a.detail),"wheelDelta"in a&&(_=a.wheelDelta),"wheelDeltaY"in a&&(_=a.wheelDeltaY),"wheelDeltaX"in a&&(d=-1*a.wheelDeltaX),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(d=-1*_,_=0),u=0===_?d:_,"deltaY"in a&&(_=-1*a.deltaY,u=_),"deltaX"in a&&(d=a.deltaX,0===_&&(u=-1*d)),0!==_||0!==d){if(1===a.deltaMode){var c=e.data(this,"mousewheel-line-height");u*=c,_*=c,d*=c}else if(2===a.deltaMode){var h=e.data(this,"mousewheel-page-height");u*=h,_*=h,d*=h}return g=Math.max(Math.abs(_),Math.abs(d)),(!o||o>g)&&(o=g,n(a,g)&&(o/=40)),n(a,g)&&(u/=40,d/=40,_/=40),u=Math[u>=1?"floor":"ceil"](u/o),d=Math[d>=1?"floor":"ceil"](d/o),_=Math[_>=1?"floor":"ceil"](_/o),t.deltaX=d,t.deltaY=_,t.deltaFactor=o,t.deltaMode=0,s.unshift(t,u,d,_),r&&clearTimeout(r),r=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,s)}}function i(){o=null}function n(e,t){return d.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120===0}var r,o,a=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],s="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var u=a.length;u;)e.event.fixHooks[a[--u]]=e.event.mouseHooks;var d=e.event.special.mousewheel={version:"3.1.9",setup:function(){if(this.addEventListener)for(var i=s.length;i;)this.addEventListener(s[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",d.getLineHeight(this)),e.data(this,"mousewheel-page-height",d.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=s.length;e;)this.removeEventListener(s[--e],t,!1);else this.onmousewheel=null},getLineHeight:function(t){return parseInt(e(t)["offsetParent"in e.fn?"offsetParent":"parent"]().css("fontSize"),10)},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(e){"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):"object"==typeof module&&"object"==typeof module.exports?exports=e(require("jquery")):e(jQuery)}(function(e){function t(e){var t=7.5625,i=2.75;return 1/i>e?t*e*e:2/i>e?t*(e-=1.5/i)*e+.75:2.5/i>e?t*(e-=2.25/i)*e+.9375:t*(e-=2.625/i)*e+.984375}e.easing.jswing=e.easing.swing;var i=Math.pow,n=Math.sqrt,r=Math.sin,o=Math.cos,a=Math.PI,s=1.70158,l=1.525*s,u=s+1,d=2*a/3,_=2*a/4.5;e.extend(e.easing,{def:"easeOutQuad",swing:function(t){return e.easing[e.easing.def](t)},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return 1-(1-e)*(1-e)},easeInOutQuad:function(e){return.5>e?2*e*e:1-i(-2*e+2,2)/2},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return 1-i(1-e,3)},easeInOutCubic:function(e){return.5>e?4*e*e*e:1-i(-2*e+2,3)/2},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1-i(1-e,4)},easeInOutQuart:function(e){return.5>e?8*e*e*e*e:1-i(-2*e+2,4)/2},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1-i(1-e,5)},easeInOutQuint:function(e){return.5>e?16*e*e*e*e*e:1-i(-2*e+2,5)/2},easeInSine:function(e){return 1-o(e*a/2)},easeOutSine:function(e){return r(e*a/2)},easeInOutSine:function(e){return-(o(a*e)-1)/2},easeInExpo:function(e){return 0===e?0:i(2,10*e-10)},easeOutExpo:function(e){return 1===e?1:1-i(2,-10*e)},easeInOutExpo:function(e){return 0===e?0:1===e?1:.5>e?i(2,20*e-10)/2:(2-i(2,-20*e+10))/2},easeInCirc:function(e){return 1-n(1-i(e,2))},easeOutCirc:function(e){return n(1-i(e-1,2))},easeInOutCirc:function(e){return.5>e?(1-n(1-i(2*e,2)))/2:(n(1-i(-2*e+2,2))+1)/2},easeInElastic:function(e){return 0===e?0:1===e?1:-i(2,10*e-10)*r((10*e-10.75)*d)},easeOutElastic:function(e){return 0===e?0:1===e?1:i(2,-10*e)*r((10*e-.75)*d)+1},easeInOutElastic:function(e){return 0===e?0:1===e?1:.5>e?-(i(2,20*e-10)*r((20*e-11.125)*_))/2:i(2,-20*e+10)*r((20*e-11.125)*_)/2+1},easeInBack:function(e){return u*e*e*e-s*e*e},easeOutBack:function(e){return 1+u*i(e-1,3)+s*i(e-1,2)},easeInOutBack:function(e){return.5>e?i(2*e,2)*(2*(l+1)*e-l)/2:(i(2*e-2,2)*((l+1)*(2*e-2)+l)+2)/2},easeInBounce:function(e){return 1-t(1-e)},easeOutBounce:t,easeInOutBounce:function(e){return.5>e?(1-t(1-2*e))/2:(1+t(2*e-1))/2}})}),!function(e,t){function i(e,t,i){var n=_[t.type]||{};return null==e?i||!t.def?null:t.def:(e=n.floor?~~e:parseFloat(e),isNaN(e)?t.def:n.mod?(e+n.mod)%n.mod:0>e?0:n.max<e?n.max:e)}function n(t){var i=u(),n=i._rgba=[];return t=t.toLowerCase(),h(l,function(e,r){var o,a=r.re.exec(t),s=a&&r.parse(a),l=r.space||"rgba";return s?(o=i[l](s),i[d[l].cache]=o[d[l].cache],n=i._rgba=o._rgba,!1):void 0}),n.length?("0,0,0,0"===n.join()&&e.extend(n,o.transparent),i):o[t]}function r(e,t,i){return i=(i+1)%1,1>6*i?e+(t-e)*i*6:1>2*i?t:2>3*i?e+(t-e)*(2/3-i)*6:e}if("undefined"==typeof e.cssHooks)return!1;var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",s=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],u=e.Color=function(t,i,n,r){return new e.Color.fn.parse(t,i,n,r)},d={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},_={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},g=u.support={},c=e("<p>")[0],h=e.each;c.style.cssText="background-color:rgba(1,1,1,.5)",g.rgba=c.style.backgroundColor.indexOf("rgba")>-1,h(d,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),u.fn=e.extend(u.prototype,{parse:function(r,a,s,l){if(r===t)return this._rgba=[null,null,null,null],this;(r.jquery||r.nodeType)&&(r=e(r).css(a),a=t);var _=this,g=e.type(r),c=this._rgba=[];return a!==t&&(r=[r,a,s,l],g="array"),"string"===g?this.parse(n(r)||o._default):"array"===g?(h(d.rgba.props,function(e,t){c[t.idx]=i(r[t.idx],t)}),this):"object"===g?(r instanceof u?h(d,function(e,t){r[t.cache]&&(_[t.cache]=r[t.cache].slice())}):h(d,function(t,n){var o=n.cache;h(n.props,function(e,t){if(!_[o]&&n.to){if("alpha"===e||null==r[e])return;_[o]=n.to(_._rgba)}_[o][t.idx]=i(r[e],t,!0)}),_[o]&&e.inArray(null,_[o].slice(0,3))<0&&(_[o][3]=1,n.from&&(_._rgba=n.from(_[o])))}),this):void 0},is:function(e){var t=u(e),i=!0,n=this;return h(d,function(e,r){var o,a=t[r.cache];return a&&(o=n[r.cache]||r.to&&r.to(n._rgba)||[],h(r.props,function(e,t){return null!=a[t.idx]?i=a[t.idx]===o[t.idx]:void 0})),i}),i},_space:function(){var e=[],t=this;return h(d,function(i,n){t[n.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var n=u(e),r=n._space(),o=d[r],a=0===this.alpha()?u("transparent"):this,s=a[o.cache]||o.to(a._rgba),l=s.slice();return n=n[o.cache],h(o.props,function(e,r){var o=r.idx,a=s[o],u=n[o],d=_[r.type]||{};null!==u&&(null===a?l[o]=u:(d.mod&&(u-a>d.mod/2?a+=d.mod:a-u>d.mod/2&&(a-=d.mod)),l[o]=i((u-a)*t+a,r)))}),this[r](l)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),n=i.pop(),r=u(t)._rgba;return u(e.map(i,function(e,t){return(1-n)*r[t]+n*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),n=i.pop();return t&&i.push(~~(255*n)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,d.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,n=e[0]/255,r=e[1]/255,o=e[2]/255,a=e[3],s=Math.max(n,r,o),l=Math.min(n,r,o),u=s-l,d=s+l,_=.5*d;return t=l===s?0:n===s?60*(r-o)/u+360:r===s?60*(o-n)/u+120:60*(n-r)/u+240,i=0===u?0:.5>=_?u/d:u/(2-d),[Math.round(t)%360,i,_,null==a?1:a]},d.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],n=e[2],o=e[3],a=.5>=n?n*(1+i):n+i-n*i,s=2*n-a;return[Math.round(255*r(s,a,t+1/3)),Math.round(255*r(s,a,t)),Math.round(255*r(s,a,t-1/3)),o]},h(d,function(n,r){var o=r.props,a=r.cache,l=r.to,d=r.from;u.fn[n]=function(n){if(l&&!this[a]&&(this[a]=l(this._rgba)),n===t)return this[a].slice();var r,s=e.type(n),_="array"===s||"object"===s?n:arguments,g=this[a].slice();return h(o,function(e,t){var n=_["object"===s?e:t.idx];null==n&&(n=g[t.idx]),g[t.idx]=i(n,t)}),d?(r=u(d(g)),r[a]=g,r):u(g)},h(o,function(t,i){u.fn[t]||(u.fn[t]=function(r){var o,a=e.type(r),l="alpha"===t?this._hsla?"hsla":"rgba":n,u=this[l](),d=u[i.idx];return"undefined"===a?d:("function"===a&&(r=r.call(this,d),a=e.type(r)),null==r&&i.empty?this:("string"===a&&(o=s.exec(r),o&&(r=d+parseFloat(o[2])*("+"===o[1]?1:-1))),u[i.idx]=r,this[l](u)))})})}),u.hook=function(t){var i=t.split(" ");h(i,function(t,i){e.cssHooks[i]={set:function(t,r){var o,a,s="";if("transparent"!==r&&("string"!==e.type(r)||(o=n(r)))){if(r=u(o||r),!g.rgba&&1!==r._rgba[3]){for(a="backgroundColor"===i?t.parentNode:t;(""===s||"transparent"===s)&&a&&a.style;)try{s=e.css(a,"backgroundColor"),a=a.parentNode}catch(l){}r=r.blend(s&&"transparent"!==s?s:"_default")}r=r.toRgbaString()}try{t.style[i]=r}catch(l){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=u(t.elem,i),t.end=u(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},u.hook(a),e.cssHooks.borderColor={expand:function(e){var t={};return h(["Top","Right","Bottom","Left"],function(i,n){t["border"+n+"Color"]=e}),t}},o=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),!function(e){function t(){try{var i=this===document?e(this):e(this).contents()}catch(n){return!1}i.mousemove(function(t){e.mlp={x:t.pageX,y:t.pageY}}),i.find("iframe").on("load",t)}e.mlp={x:0,y:0},e(t),e.fn.ismouseover=function(){var t=!1;return this.eq(0).each(function(){var i=e(this).is("iframe")?e(this).contents().find("body"):e(this),n=i.offset();t=n.left<=e.mlp.x&&n.left+i.outerWidth()>e.mlp.x&&n.top<=e.mlp.y&&n.top+i.outerHeight()>e.mlp.y}),t}}(jQuery);var g_ugYoutubeAPI=new UGYoutubeAPI,g_ugVimeoAPI=new UGVimeoAPI,g_ugHtml5MediaAPI=new UGHtml5MediaAPI,g_ugSoundCloudAPI=new UGSoundCloudAPI,g_ugWistiaAPI=new UGWistiaAPI;jQuery.fn.unitegallery=function(e){var t=jQuery(this),i="#"+t.attr("id");if(!e)var e={};var n=new UniteGalleryMain;n.run(i,e);var r=new UG_API(n);return r};
;
if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("tiles");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("tiles")});


/**
 * Grid gallery theme
 */
function UGTheme_tiles(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_tiles = new UGTiles(), g_lightbox = new UGLightbox(), g_objPreloader, g_objTilesWrapper;
	var g_functions = new UGFunctions(), g_objTileDesign = new UGTileDesign();
	
	var g_options = {
			theme_enable_preloader: true,		//enable preloader circle
			theme_preloading_height: 200,		//the height of the preloading div, it show before the gallery
			theme_preloader_vertpos: 100,		//the vertical position of the preloader
			theme_gallery_padding: 0,			//the horizontal padding of the gallery from the sides
			theme_appearance_order: "normal",	//normal, shuffle, keep - the appearance order of the tiles. applying only to columns type
			theme_auto_open:null				//auto open lightbox at start
	};
	
	var g_defaults = {
			gallery_width: "100%"
	};
	
	//temp variables
	var g_temp = {
			showPreloader: false
	};
	
	
	/**
	 * Init the theme
	 */
	function initTheme(gallery, customOptions){
		
		g_gallery = gallery;
		
		//set default options
		g_options = jQuery.extend(g_options, g_defaults);
		
		//set custom options
		g_options = jQuery.extend(g_options, customOptions);
		
		modifyOptions();
		
		//set gallery options
		g_gallery.setOptions(g_options);
		
		g_gallery.setFreestyleMode();
		
		g_objects = gallery.getObjects();
		
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;
		
		//init objects
		g_tiles.init(gallery, g_options);
		g_lightbox.init(gallery, g_options);
		
		g_objTileDesign = g_tiles.getObjTileDesign();

		
	}
	
	
	/**
	 * modift options
	 */
	function modifyOptions(){
		
		if(g_options.theme_enable_preloader == true)
			g_temp.showPreloader = true;
		
		switch(g_options.theme_appearance_order){
			default:
			case "normal":
			break;
			case "shuffle":
				g_gallery.shuffleItems();
			break;
			case "keep":
				g_options.tiles_keep_order = true;
			break;
		}
		
	}

	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-tiles");
		
		g_objWrapper.append("<div class='ug-tiles-wrapper' style='position:relative'></div>");
		
		//add preloader
		if(g_temp.showPreloader == true){
			g_objWrapper.append("<div class='ug-tiles-preloader ug-preloader-trans'></div>");
			g_objPreloader = g_objWrapper.children(".ug-tiles-preloader");
			g_objPreloader.fadeTo(0,0);
		}
		
		g_objTilesWrapper = g_objWrapper.children(".ug-tiles-wrapper");
		
		//set padding
		if(g_options.theme_gallery_padding)
			g_objWrapper.css({
				"padding-left":g_options.theme_gallery_padding+"px",
				"padding-right":g_options.theme_gallery_padding+"px"
			});
		
		g_tiles.setHtml(g_objTilesWrapper);
		g_lightbox.putHtml();
	}
	
	/**
	 * actually run the theme
	 */
	function actualRun(){
		
		//set preloader mode
		if(g_objPreloader){
			g_objPreloader.fadeTo(0,1);
			g_objWrapper.height(g_options.theme_preloading_height);
			g_functions.placeElement(g_objPreloader, "center", g_options.theme_preloader_vertpos);
		}
		
		initEvents();
		
		g_tiles.run();
		g_lightbox.run();
		
	}

	
	/**
	 * run the theme
	 */
	function runTheme(){
		
		setHtml();
		
		actualRun();
		
	}
	
	
	
	/**
	 * init size of the thumbs panel
	 */
	function initThumbsPanel(){
		
		//set size:
		var objGallerySize = g_gallery.getSize();
			
		if(g_temp.isVertical == false)			
			g_objPanel.setWidth(objGallerySize.width);
		else
			g_objPanel.setHeight(objGallerySize.height);
		
		g_objPanel.run();
	}
	
	
	/**
	 * on tile click - open lightbox
	 */
	function onTileClick(data, objTile){
		
		objTile = jQuery(objTile);		
		
		var objItem = g_objTileDesign.getItemByTile(objTile);
		var index = objItem.index;		
		
		g_lightbox.open(index);
	}
	
	
	/**
	 * before items request: hide items, show preloader
	 */
	function onBeforeReqestItems(){
				
		g_objTilesWrapper.hide();
		
		if(g_objPreloader){
			g_objPreloader.show();
		
			var preloaderSize = g_functions.getElementSize(g_objPreloader);
			var galleryHeight = preloaderSize.bottom + 30;
			
			g_objWrapper.height(galleryHeight);
		}
		
	}

	/**
	 * open lightbox at start if needed
	 */
	function onLightboxInit(){

		if(g_options.theme_auto_open !== null){
			g_lightbox.open(g_options.theme_auto_open);
			g_options.theme_auto_open = null;
		}
		
	}
	
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
		
		//remove preloader on tiles first placed
		if(g_objPreloader){
			
			g_gallery.onEvent(g_tiles.events.TILES_FIRST_PLACED, function(){
				
				g_objWrapper.height("auto");
				g_objPreloader.hide();
			});			
		}
		
		jQuery(g_objTileDesign).on(g_objTileDesign.events.TILE_CLICK, onTileClick);
		
		g_objGallery.on(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS, onBeforeReqestItems);

		jQuery(g_lightbox).on(g_lightbox.events.LIGHTBOX_INIT, onLightboxInit);

	}
	
	
	/**
	 * destroy the theme
	 */
	this.destroy = function(){
				
		jQuery(g_objTileDesign).off(g_objTileDesign.events.TILE_CLICK);
		
		g_gallery.destroyEvent(g_tiles.events.TILES_FIRST_PLACED);
				
		g_objGallery.off(g_gallery.events.GALLERY_BEFORE_REQUEST_ITEMS);

		jQuery(g_lightbox).off(g_lightbox.events.LIGHTBOX_INIT);
		
		g_tiles.destroy();
		g_lightbox.destroy();
	}
	
	
	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		runTheme();
	}
	
	
	/**
	 * add items
	 */
	this.addItems = function(){
		
		g_tiles.runNewItems();
	}
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
				
		initTheme(gallery, customOptions);
		
	}
	
	
}

;
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "jkeyboard",
        defaults = {
            layout: "english",
            input: $('#input')
        };


    var function_keys = {
        backspace: {
            text: '&nbsp;',
        },
        return: {
            text: 'Enter'
        },
        shift: {
            text: '&nbsp;'
        },
        space: {
            text: '&nbsp;'
        },
        numeric_switch: {
            text: '123',
            command: function () {
                this.createKeyboard('numeric');
                this.events();
            }
        },
        layout_switch: {
            text: '&nbsp;',
            command: function () {
                var l = this.toggleLayout();
                this.createKeyboard(l);
                this.events();
            }
        },
        character_switch: {
            text: 'ABC',
            command: function () {
                this.createKeyboard(layout);
                this.events();
            }
        },
        symbol_switch: {
            text: '#+=',
            command: function () {
                this.createKeyboard('symbolic');
                this.events();
            }
        }
    };


    var layouts = {
        selectable: ['azeri', 'english', 'russian'],
        azeri: [
            ['q', 'ü', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'ö', 'ğ'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ı', 'ə'],
            ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ç', 'ş', 'backspace'],
            ['numeric_switch', 'layout_switch', 'space', 'return']
        ],
        english: [
			['0','1','2','3','4','5','6','7','8','9'],
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
            ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
            ['numeric_switch', 'space','.','@']
        ],
        russian: [
            ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
            ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
            ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'backspace'],
            ['numeric_switch', 'layout_switch', 'space']
        ],
        numeric: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
            ['symbol_switch', '.', ',', '?', '!', "'", 'backspace'],
            ['character_switch', 'space'],
        ],
        numbers_only: [
            ['1', '2', '3',],
            ['4', '5', '6',],
            ['7', '8', '9',],
            ['0', 'return', 'backspace'],
        ],
        symbolic: [
            ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
            ['_', '\\', '|', '~', '<', '>'],
            ['numeric_switch', '.', ',', '?', '!', "'", 'backspace'],
            ['character_switch', 'layout_switch', 'space', 'return'],

        ]
    }

    var shift = false, capslock = false, layout = 'english', layout_id = 0;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            layout = this.settings.layout;
            this.createKeyboard(layout);
            this.events();
        },

        createKeyboard: function (layout) {
            shift = false;
            capslock = false;

            var keyboard_container = $('<ul/>').addClass('jkeyboard'),
                me = this;

            layouts[layout].forEach(function (line, index) {
                var line_container = $('<li/>').addClass('jline');
                line_container.append(me.createLine(line));
                keyboard_container.append(line_container);
            });

            $(this.element).html('').append(keyboard_container);
        },

        createLine: function (line) {
            var line_container = $('<ul/>');

            line.forEach(function (key, index) {
                var key_container = $('<li/>').addClass('jkey').data('command', key);

                if (function_keys[key]) {
                    key_container.addClass(key).html(function_keys[key].text);
                }
                else {
                    key_container.addClass('letter').html(key);
                }

                line_container.append(key_container);
            })

            return line_container;
        },

        events: function () {
            var letters = $(this.element).find('.letter'),
                shift_key = $(this.element).find('.shift'),
                space_key = $(this.element).find('.space'),
                backspace_key = $(this.element).find('.backspace'),
                return_key = $(this.element).find('.return'),

                me = this,
                fkeys = Object.keys(function_keys).map(function (k) {
                    return '.' + k;
                }).join(',');

            letters.on('click', function () {
                me.type((shift || capslock) ? $(this).text().toUpperCase() : $(this).text());
            });

            space_key.on('click', function () {
                me.type(' ');
            });

            return_key.on('click', function () {
                me.type("\n");
                me.settings.input.parents('form').submit();
            });

            backspace_key.on('click', function () {
                me.backspace();
            });

            shift_key.on('click', function () {
                if (capslock) {
                    me.toggleShiftOff();
                    capslock = false;
                } else {
                    me.toggleShiftOn();
                }
            }).on('dblclick', function () {
                capslock = true;
            });


            $(fkeys).on('click', function () {
                var command = function_keys[$(this).data('command')].command;
                if (!command) return;

                command.call(me);
            });
        },

        type: function (key) {
            var input = this.settings.input,
                val = input.val(),
                input_node = input.get(0),
                start = input_node.selectionStart,
                end = input_node.selectionEnd;

            var max_length = $(input).attr("maxlength");
            if (start == end && end == val.length) {
                if (!max_length || val.length < max_length) {
                    input.val(val + key);
                }
            } else {
                var new_string = this.insertToString(start, end, val, key);
                input.val(new_string);
                start++;
                end = start;
                input_node.setSelectionRange(start, end);
            }

            input.trigger('focus');

            if (shift && !capslock) {
                this.toggleShiftOff();
            }
        },

        backspace: function () {
            var input = this.settings.input,
                val = input.val();

            input.val(val.substr(0, val.length - 1));
        },

        toggleShiftOn: function () {
            var letters = $(this.element).find('.letter'),
                shift_key = $(this.element).find('.shift');

            letters.addClass('uppercase');
            shift_key.addClass('active')
            shift = true;
        },

        toggleShiftOff: function () {
            var letters = $(this.element).find('.letter'),
                shift_key = $(this.element).find('.shift');

            letters.removeClass('uppercase');
            shift_key.removeClass('active');
            shift = false;
        },

        toggleLayout: function () {
            layout_id = layout_id || 0;
            var plain_layouts = layouts.selectable;
            layout_id++;

            var current_id = layout_id % plain_layouts.length;
            return plain_layouts[current_id];
        },

        insertToString: function (start, end, string, insert_string) {
            return string.substring(0, start) + insert_string + string.substring(end, string.length);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

;
//# sourceMappingURL=scripts.bundle.js.map