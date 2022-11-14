kLib={
	
	//basic library info
	basicInfo: {
		version: '1.0',
		build: '40',
		stage: 'onWork',
		buildDate: '2013-06-14',
		getFullVersionInfo: function () {
			return kLib.basicInfo.version+'.'+kLib.basicInfo.build+' '+kLib.basicInfo.stage;
		}
	},
	
	//useful regular expressions, mostly for internal use
	regExp: {
		
		//match the whitespaces at the beginning and end of the string
		trimLeft: /^\s\s*/,
		trimRight: /\s\s*$/,
		
		//match simple tags, ids and classes
		simpleTag: /^[a-zA-Z]*$/,
		simpleId: /^#[a-zA-Z0-9\-\_]*$/,
		simpleClass: /^\.[a-zA-Z0-9\-\_]*$/,
		
		//match html creation strings
		simpleTagCreation: /^\<[A-z]+\>$/,
		complexTagCreation: /^\<.*\>$/,
		
		//case word separators
		caseSeparators: /((\s|-|_)+[^(\s|-|_)])/g,
		wordSeparators: /((\s|-|_)+)/g,
		
		//color formats
		hexColor: /^#(\d|[a-f]|[A-F]){6};?$/g,
		rgbColor: /^rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\);?$/g,
		rgbaColor: /^rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\,\s*\d+(\.\d+)?\s*\);?$/g,
		hslColor: /^hsl\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\);?$/g,
		hslaColor: /^hsla\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\,\s*\d+(\.\d+)?\s*\);?$/g,
		digitsAtBeginning: /^\d+/g,
		notDigitsAtBeginning: /^[^\d]+/g
	},
	
	//infos about the UA
	UA: {
		
		//stored info about UA
		name: '',
		short: '',
		version: NaN,
		OS: '',
		browser: '',
		agent: '',
		
		//UA info getter
		getUAInfo: function () {
			kLib.UA.name=(function () {
				if (window.ActiveXObject) {
					return 'Internet Explorer';
				}
				if (window.opera) {
					return 'Opera';
				}
				if (window.chrome) {
					return 'Chrome';
				}
				if (window.WebKitAnimationEvent) {
					return 'Safari';
				}
				if (window.clientInformation) {
					return 'Konqueror';
				}
				if (window.mozRequestAnimationFrame) {
					if (window.navigator.userAgent.indexOf('SeaMonkey')!=-1) {
						return 'SeaMonkey';
					}
					if (window.navigator.userAgent.indexOf('Firefox')!=-1) {
						return 'Firefox';
					}
				}
				if (window.XPCSafeJSObjectWrapper) {
					return 'Camino';
				}
				return 'Unknown';
			})();
			kLib.UA.short=(function () {
				switch (kLib.UA.name) {
					case 'Internet Explorer':
						return 'IE';
					case 'Opera':
						return 'O';
					case 'Chrome':
						return 'CH';
					case 'Safari':
						return 'S';
					case 'Konqueror':
						return 'K';
					case 'SeaMonkey':
						return 'SM';
					case 'Firefox':
						return 'FF';
					case 'Camino':
						return 'C';
					default:
						return 'UK';
				}
			})();
			kLib.UA.version=(function () {
				switch (kLib.UA.name) {
					case 'Internet Explorer':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('MSIE ')+5));
					case 'Opera':
						
						//Opera has 2 types of UA strings
						return (navigator.userAgent.find('Version/')) ?
							parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Version/')+8)) :
							parseFloat(navigator.userAgent.substr(6));
					case 'Chrome':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Chrome/')+7));
					case 'Safari':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Version/')+8));
					case 'Konqueror':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Konqueror/')+10));
					case 'SeaMonkey':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('SeaMonkey/')+10));
					case 'Firefox':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Firefox/')+8));
					case 'Camino':
						return parseFloat(navigator.userAgent.substr(navigator.userAgent.lastIndexOf('Camino/')+7));
					default:
						return NaN;
				}
			})();
			kLib.UA.browser=kLib.UA.name+' '+kLib.UA.version;
			kLib.UA.agent=kLib.UA.short+kLib.UA.version;
		}
	},
	
	//extend the default javascript functionality
	extendDefaultObjectMethods: function () {
		Function.prototype.clone = function() {
			
			//copy the current function so the closure works
			var that=this;
			
			//make a temporary function
			var temp=function () {
				return that.apply(this, arguments);
			};
			
			//return the new function
			return temp;
		};
		
		//if there is no array.indexOf, add one (for IE<=7)
		if (!([].indexOf)) {
			Array.prototype.indexOf=function (element, start) {
				var i, len=this.length;
				
				//if start position is a finite number
				if (isFinite(start) || start===undefined) {
					
					//initialise i
					i=Math.round(start===undefined ? 0 : (start>=0 ? start : len+start));
					for (i; i<len; i++) {
						if (this[i]===element) {
							return i; //try placing break here
						}
					}
					return -1;
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			};
		};
		Array.prototype.remove=function (element, all) {
			var found=false, len=this.length, i;
			
			//remove all the instances
			if (all) {
				
				//start the search at the end of the array, since in most of the cases the element is pushed in the array
				for (i=len-1; i>=0; i--) {
					if (this[i]===element) {
						this.splice(i--, 1);
						found=true;
					}
				}
			}
			
			//remove only one instance
			else {
				for (i=len-1; i>=0; i--) {
					if (this[i]===element) {
						this.splice(i, 1);
						return true;
					}
				}
			}
			return found;
		};
		Array.prototype.find=function (element) {
			return (this.indexOf(element)!==-1);
		};
		Array.prototype.findAny=function () {
			var i, len=arguments.length;
			for (i=0; i<len; i++) {
				if (this.find(arguments[i])) {
					return true;
				}
			}
			return false;
		};
		
		String.prototype.firstChar=function () {
			return this.charAt(0)
		};
		String.prototype.lastChar=function () {
			return this.charAt(this.length-1)
		};
		String.prototype.count=function () {
			var i, j, count=0, len=this.length, aLen=arguments.length, arg;
			for (i=0; i<aLen; i++) {
				arg=arguments[i];
				
				//if argument is letter, count each letter
				if (arg.length===1 && typeof arg==='string') {
					for (j=0; j<len; j++) {
						count+= +(arg===this[j]);
					}
				}
				
				//else count using match or throw error
				else if (typeof arg==='string') {
					count+=this.match(new RegExp(arg, 'g')).length;
				}
				else if (arg instanceof RegExp) {
					count+=this.match(arg).length;
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			}
			return count;
		};
		String.prototype.find=function () {
			var i;
			for (i=0; i<arguments.length; i++) {
				if (this.match(arguments[i])) {
					return true;
				}
			}
			return false;
		};
		String.prototype.trimSpaces=function () {
			return this.replace(kLib.regExp.trimLeft, '').replace(kLib.regExp.trimRight, '');
		};
		String.prototype.toCamelCase=function () {
			return this.replace(kLib.regExp.caseSeparators, function ($1) {return $1.toUpperCase().replace(kLib.regExp.wordSeparators, '')});
		};
		String.prototype.toDashCase=function () {
			return this.replace(kLib.regExp.wordSeparators, '-');
		};
		String.prototype.toUnderscoreCase=function () {
			return this.replace(kLib.regExp.wordSeparators, '_');
		};
		String.prototype.toJSONCase=function () {
			return this.replace(/[^(\w|$)]+/g, '').replace(/\b[0-9]+/, '');
		};
		String.prototype.toDashCaseFromCamelCase=function() {
			return this.replace(/[A-Z]/g, function($1) {return '-'+$1.toLowerCase()});
		};
		
		Number.prototype.leadingZeroes=function (digits) {
			var str=this.toString();
			if (isNaN(digits) || !isFinite(digits) || arguments.length>1) {
				throw new TypeError('Unexpected parameters in function.');
			}
			
			//if number is positive, simply add zeroes, else remove the minus, add zeroes and put the minus back
			if (this>=0) {
				while (str.length<digits) {
					str='0'+str;
				}
			}
			else {
				str=str.substr(1);
				while (str.length<digits-1) {
					str='0'+str;
				}
				str='-'+str;
			}
			return str;
		};
		Number.prototype.isInteger=function () {
			return (+this===+Math.round(this));
		};
		
		//add the dom functions to the collection prototype
		kLib.QuerySelection.prototype=kLib.dom;
	},
	
	//extend the default Element object
	extendDefaultDOM: function () {
		
		//add querySelector and querySelectorAll for IE<=7
		document.querySelectorAll=document.querySelectorAll || function () {
			
			//make the first style sheet
			document.createStyleSheet('', 0);
			
			//return the function
			return function(rule) {
				if (typeof rule!=='string' || arguments.length>1) {
					throw new TypeError('Unexpected parameters in function.');
				}
				
				//split the rule so it works for multiple selectors
				var all=this.all, aLen=all.length, elements=[], sheet=document.styleSheets(0), i,
					rule=rule.split(','), rLen=rule.length;
				
				//add each rule to the sheet
				for (i=0; i<rLen; i++) {
					sheet.addRule(rule[i], 'kLibProperty: value');
				}
				
				//check each element for the property and, if found, add it to the array
				for (i=0; i<aLen; i++) {
					if (all[i].currentStyle.kLibProperty) {
						elements.push(all[i]);
					}
				}
				
				//remove each rule
				for (i=rLen-1; i>=0; i--) {
					sheet.removeRule(i);
				}
				return elements;
			};
		}();
		document.querySelector=document.querySelector || function () {
			
			//make the first style sheet
			document.createStyleSheet('', 0);
			
			//return the function
			return function(rule) {
				if (typeof rule!=='string' || arguments.length>1) {
					throw new TypeError('Unexpected parameters in function.');
				}
				
				//split the rule so it works for multiple selectors
				var all=this.all, aLen=all.length, element, sheet=document.styleSheets(0), i,
					rule=rule.split(','), rLen=rule.length;
				
				//add each rule to the sheet
				for (i=0; i<rLen; i++) {
					sheet.addRule(rule[i], 'kLibProperty: value');
				}
				
				//check each element for the property and, if found, add it to the array
				for (i=0; i<aLen; i++) {
					if (all[i].currentStyle.kLibProperty) {
						element=all[i];
						i=aLen+1;
					}
				}
				
				//remove each rule
				for (i=rLen-1; i>=0; i--) {
					sheet.removeRule(i);
				}
				return element;
			};
		}();
	},
	
	//perform a deep copy normalizing the parameters
	extend: function (destination, source, maxDepth) {
		
		//throw an erros if the destination and source aren't copyable,
		//maxDepth isn't number or undefined, or other arguments present
		if (!(typeof destination==='object' || typeof destination==='function') ||
			(isNaN(maxDepth) && maxDepth!==undefined) || arguments.length>3) {
			throw new TypeError('Unexpected parameters in function.');
		}
		
		//if maxDepth is undefined, make it Infinity
		maxDepth=(maxDepth===undefined ? Infinity : maxDepth);
		
		//after normalizing, perform the copy
		if (maxDepth>=1) {
			kLib._extend(destination, source, kLib.auxVars.extendedArray, 1, maxDepth);
		}
	},
	
	//internal function for extending, no parameter checking is made inside this function, it relies on valid input
	_extend: function (destination, source, appearances, depth, maxDepth) {
		var prop, current;
		
		//if the depth is lower the the maximum, continue
		if (depth<maxDepth) {
			
			//for each property in the source object
			for (prop in source) {
				
				//cahce them
				current=source[prop];
				
				//if the current object hasn't been already added, continue
				//do this to prevent infinite recursion
				if (!appearances.find(current)) {
					
					//if it is a plain object and it is not a DOM element, recurse
					if (typeof current==='object' && current!==null) {
						appearances.push(current);
						destination[prop]={};
						arguments.callee(destination[prop], current, appearances, depth+1, maxDepth);
						appearances.remove(current);
					}
					
					//if it is a function, copy it and recurse
					else if (typeof current==='function') {
						appearances.push(current);
						destination[prop]=current.clone();
						arguments.callee(destination[prop], current, appearances, depth+1, maxDepth);
						appearances.remove(current);
					}
					
					//if it is a primitive, copy it
					else {
						destination[prop]=current;
					}
				}
				
				//if it has been already added, only add it by reference
				else {
					destination[prop]=current;
				}
			}
		}
		
		//else copy everithing from here downwards by reference
		else {
			for (prop in source) {
				destination[prop]=source[prop];
			}
		}
	},
	
	//useful mathematical functions
	math: {
		isFinite: window.isFinite,
		areFinite: function () {
			var i, len=arguments.length, isInteger=kLib.math.isInteger;
			for (i=0; i<len; i++) {
				if (!isFinite(arguments[i])) {
					return false;
				}
			}
			return true;
		},
		isInteger: function (obj) {
			return (isFinite(obj) && obj===Math.round(obj));
		},
		areIntegers: function () {
			var i, len=arguments.length, isInteger=kLib.math.isInteger;
			for (i=0; i<len; i++) {
				if (!isInteger(arguments[i])) {
					return false;
				}
			}
			return true;
		},
		randomInt: function (min, max) {
			
			//the min must be finite and between 0 and 1000000000, the max must be larger
			min=(isFinite(min) && min<1000000000 && min>=0) ? min : 0;
			max=(isFinite(max) && max>min) ? max : 1000000000;
			num=Math.floor(Math.random()*(max-min)+min);
			
			//if the number is equal to the max, subtract 1, since it should be smaller than that
			return (num===max) ? num-1 : num;
		},
		randomBool: function () {
			return !Math.round(Math.random());
		},
		randomSign: function () {
			return (!Math.round(Math.random())) ? 1 : -1;
		},
		randomAlphaNumericalChar: function () {
			
			//define possible characters, then choose one
			var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			return chars[kLib.math.randomInt(0, chars.length)];
		},
		randomAlphaNumericalString: function (length) {
			var i, str='';
			for (i=0; i<length; i++) {
				str+=kLib.math.randomAlphaNumericalChar();
			}
			return str;
		}
	},
	
	//working with colors
	color: {
		
		//color object constructor
		Color: function (red, green, blue, alpha, format) {
			
			//functions and variables (ml is matched lightness)
			var areFinite=kLib.math.areFinite, round=Math.round, abs=Math.abs,
				min, max, hue, saturation, lightness, chroma, x, ml;
			
			//if the format is not specified use the alpha's string for the format
			if (typeof alpha==='string' && format===undefined) {
				format=alpha;
			}
			
			//if alpha is not a finite number or the format isn't supporting opacity, assume it is 1
			if (!areFinite(alpha) || !format.find('a')) {
				alpha=1;
			}
			
			//if it is smaller than 0, use 0, if it is bigger than 1, use 1
			alpha=(alpha>1) ? 1 : alpha;
			alpha=(alpha<0) ? 0 : alpha;
			
			//if no arguments are given, default the color to opaque black
			if (arguments.length===0) {
				this.hue=0;
				this.saturation=0;
				this.lightness=0;
				this.red=0;
				this.green=0;
				this.blue=0;
				this.alpha=1;
			}
			
			//if there is only 1 string as argument, parse that string
			else if (typeof red==='string' && arguments.length===1) {
				return kLib.color.Color.parse(red);
			}
			
			//if the format is not specified, assume it is RGB
			else if ([format].findAny('hex', 'rgb', 'rgba', undefined) && areFinite(red, green, blue)) {
				
				//normalize red, green and blue
				this.red=(red>255 ? 255 : (red<0 ? 0 : round(red)));
				this.green=(green>255 ? 255 : (green<0 ? 0 : round(green)));
				this.blue=(blue>255 ? 255 : (blue<0 ? 0 : round(blue)));
				
				//use the algorigthm available here (en.wikipedia.org/wiki/HSL_and_HSV) to convert between RBG and HSL
				//since it requires the RGB values to be in [0, 1], divide them by 255
				red=this.red/255;
				green=this.green/255;
				blue=this.blue/255;
				
				//get the minimun and maximum value
				min=Math.min(red, green, blue);
				max=Math.max(red, green, blue);
				
				//get the chroma and lightness
				chroma=max-min;
				lightness=(min+max)/2;
				
				//calculate the hue
				this.hue=round(chroma===0 ? 0 : 60*(max===red ? 6+(green-blue)/chroma%6 :
					(max===green ? (blue-red)/chroma+2 : (red-green)/chroma+4)))%360;
				
				//calculate the saturation
				this.saturation=round(chroma===0 ? 0 : chroma/(1-abs(2*lightness-1))*100);
				
				//calculate the lightness
				this.lightness=round(lightness*100);
				this.alpha=alpha;
			}
			else if ([format].findAny('hsl', 'hsla') && areFinite(red, green, blue)) {
				
				//use the algorithm available here (en.wikipedia.org/wiki/HSL_and_HSV) to convert between HSL and RGB
				//since the format is HSL, convert the red argument to hue and divide by 60 so the algorithm will work
				hue=(red>359 ? 359 : (red<0 ? 0 : round(red)))/60;
				
				//convert the green argument to saturation and blue to lightness, and then divide by 100 so they are in [0, 1]
				saturation=(green>100 ? 100 : (green<0 ? 0 : round(green)))/100;
				lightness=(blue>100 ? 100 : (blue<0 ? 0 : round(blue)))/100;
				
				//calculate the chroma and x value
				chroma=(1-abs(2*lightness-1))*saturation;
				x=chroma*(1-abs(hue%2-1));
				
				//calculate the red, green and blue temporary values
				red=(hue>=2 && hue<4 ? 0 : (hue<1 || (hue>=5 && hue<6) ? chroma : x));
				green=(hue>=4 ? 0 : (hue>=1 && hue<3 ? chroma : x));
				blue=(hue<2 ? 0 : (hue>=3 && hue<5 ? chroma : x));
				
				//calculate the matched lightness
				ml=lightness-chroma/2;
				
				//multiply hue by 60 to get back to degrees
				this.hue=round(hue*60);
				
				//multiply saturation and lightness by 100 to get back to percents
				this.saturation=round(saturation*100);
				this.lightness=round(lightness*100);
				
				//calculate the final red, green and blue by adding matched lightness and multipling by 255 to get to RGB
				this.red=round((red+ml)*255);
				this.green=round((green+ml)*255);
				this.blue=round((blue+ml)*255);
				this.alpha=alpha;
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		
		//color functions
		functions: {
			supports: function (format) {
				return kLib.color.support.find(format);
			},
			defaultTo: function (format) {
				if (format==='hsl' || format==='hsla' || format==='rgb' || format==='rgba' || format==='hex') {
					kLib.color.defaultFormat=format;
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			},
			parse: function (string) {
				var r=kLib.regExp, dab=r.digitsAtBeginning, ndab=r.notDigitsAtBeginning,
					red, green, blue, alpha, hue, saturation, lightness;
				if (!string) {
					return new kLib.color.Color();
				}
				if (typeof string==='string') {
					
					//trim the string
					string=string.trimSpaces();
					if (!!string.match(r.hexColor)) {
						
						//since the hex format is a fixed format, simply parse the string for colors
						red=parseInt(string.substr(1, 2), 16);
						green=parseInt(string.substr(3, 2), 16);
						blue=parseInt(string.substr(5, 2), 16);
						return new kLib.color.Color(red, green, blue, 'rgb');
					}
					else if (!!string.match(r.rgbColor)) {
						
						//replace all non-digit characters at the beginning, then get the red value, then replace all digits
						//at the beginnig, then get the blue value, and so on
						string=string.replace(ndab, '');
						red=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						green=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						blue=parseInt(string);
						return new kLib.color.Color(red, green, blue, 'rgb');
					}
					else if (!!string.match(r.rgbaColor)) {
						
						//same as rgb, only this time get the alpha value
						string=string.replace(ndab, '');
						red=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						green=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						blue=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						alpha=parseFloat(string);
						return new kLib.color.Color(red, green, blue, alpha, 'rgba');
					}
					else if (!!string.match(r.hslColor)) {
						
						//same as rgb, only this time get the hue, saturation and lightness
						string=string.replace(ndab, '');
						hue=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						saturation=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						lightness=parseInt(string);
						return new kLib.color.Color(hue, saturation, lightness, 'hsl');
					}
					else if (!!string.match(r.hslaColor)) {
						
						//same as hsl, only this time get the alpha value
						string=string.replace(ndab, '');
						hue=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						saturation=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						lightness=parseInt(string);
						string=string.replace(dab, '');
						string=string.replace(ndab, '');
						alpha=parseFloat(string);
						return new kLib.color.Color(hue, saturation, lightness, alpha, 'hsla');
					}
					else {
						throw new TypeError('Not a valid color format.');
					}
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			}
		},
		
		//supported color formats
		support: [],
		checkForSupport: function () {
			var error, div=document.createElement('div');
			kLib.color.support=[];
			
			//check each format and see if it is supported
			try {
				div.style.color='#ffff00';
				kLib.color.support.push('hex');
			}
			catch (error) {}
			try {
				div.style.color='rgb(0, 0, 0)';
				kLib.color.support.push('rgb');
			}
			catch (error) {}
			try {
				div.style.color='rgba(0, 0, 0, 0.1)';
				kLib.color.support.push('rgba');
			}
			catch (error) {}
			try {
				div.style.color='hsl(0, 0%, 0%)';
				kLib.color.support.push('hsl');
			}
			catch (error) {}
			try {
				div.style.color='hsla(0, 0%, 0%, 0.1)';
				kLib.color.support.push('hsla');
			}
			catch (error) {}
			
			//use defaults in order (hsla, rgba, hsl, rgb, hex)
			kLib.color.Color.defaultTo(kLib.color.Color.supports('hsla') ? 'hsla' : (kLib.color.Color.supports('rgba') ? 'rgba' :
				(kLib.color.Color.supports('hsl') ? 'hsl' : (kLib.color.Color.supports('rgb') ? 'rgb' : 'hex'))));
		},
		
		//color object prototype
		colorPrototype: {
			toString: function () {
				var format=kLib.color.defaultFormat;
				
				//return string in the default format
				if (format==='hsla') {
					return this.toHSLA();
				}
				else if (format==='hsl') {
					return this.toHSL();
				}
				else if (format==='rgba') {
					return this.toRGBA();
				}
				else if (format==='rgb') {
					return this.toRGB();
				}
				else if (format==='hex') {
					return this.toHEX();
				}
			},
			toHEX: function () {
				return '#'+((this.red>15) ? '' : '0')+this.red.toString(16)+((this.green>15) ? '' : '0')+this.green.toString(16)+((this.blue>15) ? '' : '0')+this.blue.toString(16);
			},
			toRGB: function () {
				return 'rgb('+this.red+', '+this.green+', '+this.blue+')';
			},
			toRGBA: function () {
				return 'rgba('+this.red+', '+this.green+', '+this.blue+', '+this.alpha+')';
			},
			toHSL: function () {
				return 'hsl('+this.hue+', '+this.saturation+'%, '+this.lightness+'%)';
			},
			toHSLA: function () {
				return 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
			},
			
			//copy another color object to the current color object
			copy: function (newColor) {
				this.hue=newColor.hue;
				this.saturation=newColor.saturation;
				this.lightness=newColor.lightness;
				this.red=newColor.red;
				this.green=newColor.green;
				this.blue=newColor.blue;
				this.alpha=newColor.alpha;
			},
			change: function (property, value) {
				if (typeof property==='string' && isFinite(value)) {
					
					//change the color according to the changed property
					if (property==='hue' || property==='h') {
						this.copy(new kLib.color.Color(this.hue+value, this.saturation, this.lightness, this.alpha, 'hsl'));
						return this;
					}
					else if (property==='saturation' || property==='s') {
						this.copy(new kLib.color.Color(this.hue, this.saturation+value, this.lightness, this.alpha, 'hsl'));
						return this;
					}
					else if (property==='lightness' || property==='l') {
						this.copy(new kLib.color.Color(this.hue, this.saturation, this.lightness+value, this.alpha, 'hsl'));
						return this;
					}
					else if (property==='red' || property==='r') {
						this.copy(new kLib.color.Color(this.red+value, this.green, this.blue, this.alpha, 'rgb'));
						return this;
					}
					else if (property==='green' || property==='g') {
						this.copy(new kLib.color.Color(this.red, this.green+value, this.blue, this.alpha, 'rgb'));
						return this;
					}
					else if (property==='blue' || property==='b') {
						this.copy(new kLib.color.Color(this.red, this.green, this.blue+value, this.alpha, 'rgb'));
						return this;
					}
					else if (property==='alpha' || property==='a') {
						this.copy(new kLib.color.Color(this.red, this.green, this.blue, this.alpha+value, 'rgb'));
						return this;
					}
					else {
						throw new TypeError('Unexpected parameters in function.');
					}
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			},
			set: function (property, value) {
				if (typeof property==='string' && isFinite(value)) {
					
					//set the color according to the changed property
					if (property==='hue' || property==='h') {
						this.copy(new kLib.color.Color(value, this.saturation, this.lightness, this.alpha, 'hsl'));
						return this;
					}
					else if (property==='saturation' || property==='s') {
						this.copy(new kLib.color.Color(this.hue, value, this.lightness, this.alpha, 'hsl'));
						return this;
					}
					else if (property==='lightness' || property==='l') {
						this.copy(new kLib.color.Color(this.hue, this.saturation, value, this.alpha, 'hsl'));
						return this;
					}
					else if (property==='red' || property==='r') {
						this.copy(new kLib.color.Color(value, this.green, this.blue, this.alpha, 'rgb'));
						return this;
					}
					else if (property==='green' || property==='g') {
						this.copy(new kLib.color.Color(this.red, value, this.blue, this.alpha, 'rgb'));
						return this;
					}
					else if (property==='blue' || property==='b') {
						this.copy(new kLib.color.Color(this.red, this.green, value, this.alpha, 'rgb'));
						return this;
					}
					else if (property==='alpha' || property==='a') {
						this.copy(new kLib.color.Color(this.red, this.green, this.blue, value, 'rgb'));
						return this;
					}
					else {
						throw new TypeError('Unexpected parameters in function.');
					}
				}
				else {
					throw new TypeError('Unexpected parameters in function.');
				}
			},
			invert: function () {
				return new kLib.color.Color(255-this.red, 255-this.green, 255-this.blue);
			}
		},
		
		//default output format
		defaultFormat: 'hex',
		
		//initialize colors
		init: function () {
			var prop;
			
			//set the methods and prototype of Color constructor
			for (prop in kLib.color.functions) {
				kLib.color.Color[prop]=kLib.color.functions[prop];
			}
			for (prop in kLib.color.colorPrototype) {
				kLib.color.Color.prototype[prop]=kLib.color.colorPrototype[prop];
			}
			
			//check for supported formats
			kLib.color.checkForSupport();
		}
	},
	
	//the event interface
	event: {
		
		//the event constructor
		Event: function (name, properties) {
			if (typeof name!=='string' || typeof properties!=='object') {
				throw new TypeError('Unexpected parameters in function.');
			}
			
			//set the original properties to the event container for later retrieval
			this.name=name;
			this.properties=properties;
			
			//if the standard event constructor is present, use it, else use IE method instead
			if (document.createEvent) {
				this.eventObject=document.createEvent('Event');
				this.eventObject.initEvent(name, true, true);				
			}
			else if (document.createEventObject) {
				this.eventObject=document.createEventObject();
				this.eventObject.type='on'+name;
			}
			
			//extend the event object with the properties object
			kLib.extend(this.eventObject, properties);
		},
		trigger: function (element, event, properties) {
			if (!kLib(element).isDOM() || (typeof event==='string' && typeof properties!=='object')
				|| (object instanceof kLib.event.Event && properties!==undefined)) {
				throw new TypeError('Unexpected parameters in function.');
			}
			
			//if the event is not initialised, make one
			if (typeof event==='string' && typeof properties==='object') {
				event=new kLib.event.Event(event, properties);
			}
			
			//use corresponding triggering system
			if (element.dispatchEvent) {
				element.dispatchEvent(event);
			}
			else if (element.fireEvent) {
				element.fireEvent('on'+event.name);
			}
		},
		
		//internal function, faster, but no checking is done
		_trigger: function (element, event, properties) {
			if (element.dispatchEvent) {
				element.dispatchEvent(event);
			}
			else if (element.fireEvent) {
				element.fireEvent('on'+event.name);
			}
		}
	},
	dom: {
		
		//convert a collection to a human readable string
		toString: function () {
			var string, i, len=this.length, digits=(this.length-1).toString().length;
			
			//add the query, the context and the length
			string='query: '+this.query;
			string+='\ncontext: '+((this.context instanceof kLib.QuerySelection) ? '[kLib query]' : this.context);
			string+='\nlength: '+this.length;
			
			//add each element on a new line, checking if the current element is a collection, then outputing accordingly
			for (i=0; i<len; i++) {
				string+='\n'+i.leadingZeroes(digits)+'. '+((this[i] instanceof kLib.QuerySelection) ? '[kLib query]' : this[i]);
			}
			return string;
		},
		
		//add objects to the collection, querying from the DOM when necessary
		concat: function () {
			var i, j=this.length, k, len=arguments.length, arg, aLen;
			
			//remove the context and query since they are no longer valid
			this.context=undefined;
			this.query=undefined;
			for (i=0; i<len; i++) {
				arg=arguments[i];
				
				//if the current argument is an array or a collection, append each of its elements to the new collection
				if (arg instanceof Array || arg instanceof kLib.QuerySelection) {
					aLen=arg.length;
					for (k=0; k<aLen; k++) {
						this[j]=arg[k];
						j++;
					}
				}
				
				//if the current argument is a string, perform a query then add the elements from the returned collection
				else if (typeof arg==='string') {
					arg=kLib(arg);
					aLen=arg.length;
					for (k=0; k<aLen; k++) {
						this[j]=arg[k];
						j++;
					}
				}
				
				//else simply append to the collection
				else {
					this[j]=arg;
					j++;
				}
			}
			this.length=j;
			return this;
		},
		
		//add objects to the collection without querying from the DOM
		join: function () {
			var i, aLen=arguments.length;
			
			//remove the context and query since they are no longer valid
			this.context=undefined;
			this.query=undefined;
			
			//append to the collection
			for (i=0; i<aLen; i++) {
				this[this.length]=arguments[i];
				this.length++;
			}
			return this;
		},
		
		//check if all elements in the collection are DOM elements
		isDOM: function () {
			var i, len=this.length;
			for (i=0; i<len; i++) {
				
				//check using HTMLElement constructor if it is present
				if (typeof HTMLElement!=='undefined') {
					
					//both window and document are considered DOM elements
					if (!(this[i] instanceof HTMLElement || this[i]===document || this[i]===window)) {
						return false;
					}
				}
				else {
					
					//check for the type of the element, the nodeType and the style object
					if (!(((typeof this[i]==="object") && (this[i].nodeType===1) && (typeof this[i].style==="object")) || this[i]===document || this[i]===window)) {
						return false;
					}
				}
			}
			return true;
		},
		
		//return an IE unique id array for the current collection
		getUniqueID: function () {
			var len, i, idArray=[];
			for (i=0, len=this.length; i<len; i++) {
				
				//if the object is the window or document object, complete the array accordingly
				if (this[i]===window) {
					idArray[i]='window';
				}
				else if (this[i]===document) {
					idArray[i]='document';
				}
				else if (this[i].uniqueID) {
					idArray[i]=this[i].uniqueID;
				}
				else {
					idArray[i]=this[i].uniqueID=++kLib.auxVars.lastUniqueId;
				}
			}
			return idArray;
		},
		css: function (obj, val) {
			var camelized, _len, _i, _prop, currentStyle, cachedDisplay, arr='';
			if (typeof obj==='string' && typeof val==='string') {
				camelized=obj.toCamelCase();
				for (_i=0, _len=this.length; _i<_len; _i++) {
					this[_i].style[camelized]=val;
				}
			}
			else if (typeof obj==='object') {
				for (_prop in obj) {
					arr+=_prop+':'+obj[_prop]+';';
				}
				for (_i=0, _len=this.length; _i<_len; _i++) {
					this[_i].setAttribute('style', arr);
				}
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		
		//attach event handlers to objects, inspired by http://blog.stchur.com/2006/10/12/fixing-ies-attachevent-failures/
		on: function (eventName, handler, capture) {
			var len=this.length, i, key, fn, element;
			
			//continue if the event name is string and the handler is function
			if (typeof eventName==='string' && typeof handler==='function') {
				
				//force boolean on element capturing
				capture=!!capture;
				
				//if supported use addEventListener
				if (window.addEventListener) {
					for (i=0; i<len; i++) {
						this[i].addEventListener(eventName, handler, capture);
					}
				}
				
				//else use the attachEvent
				else {
					
					//get an unique id array for the collection
					idArray=this.getUniqueID();
					
					//add 'on' to the event name
					eventName='on'+eventName;
					for (i=0; i<len; i++) {
						
						//generate an unique key
						key='objectId'+idArray[i]+';'+
							'eventName'+eventName+';'+
							'function'+handler+';';
						
						//see if the function already exists, else attach it
						fn=kLib.auxVars.handlers[key];
						if (!fn) {							
							element=this[i];
							
							//use a temporary function to make a closure, called for each this[i]
							fn=function (element) {
								
								//use a dummy function which calls the real one using each element in the collection
								//in order to achieve correct 'this' functionality
								return function (evnt) {
									handler.call(element, evnt);
								};
							}(this[i]);
							
							//add the key to the auxiliary array, then attach the event
							kLib.auxVars.handlers[key]=fn;
							element.attachEvent(eventName, fn);
						}
					}
				}
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		
		//remove event handlers from objects, inspired by http://blog.stchur.com/2006/10/12/fixing-ies-attachevent-failures/
		off: function (eventName, handler, capture) {
			var len=this.length, i;
			
			//continue if the event name is string and the handler is function
			if (typeof eventName==='string' && typeof handler==='function') {
				
				//force boolean on element capturing
				capture=!!capture;
				
				//if supported use removeEventListener
				if (window.removeEventListener) {
					for (i=0, len=this.length; i<len; i++) {
						this[i].removeEventListener(eventName, handler, capture);
					}
				}
				
				//else use the detachEvent
				else {
					
					//get an unique id array for the collection
					idArray=this.getUniqueID();
					
					//add 'on' to the event name
					eventName='on'+eventName;
					for (i=0; i<len; i++) {
						
						//generate an unique key
						key='objectId'+idArray[i]+';'+
							'eventName'+eventName+';'+
							'function'+handler+';';
						
						//see if the function exists and remove it if so
						fn=kLib.auxVars.handlers[key];
						if (fn) {
							
							//detach the function
							this[i].detachEvent(eventName, fn);
							
							//delete the saved reference
							delete kLib.auxVars.handlers[key];
						}
					}
				}
			}
			else {
				throw new TypeError('Unexpected parameters in function.');
			}
			return this;
		},
		
		//trigger an event binded to an element
		trigger: function (event, properties, bubbles, cancelable) {
			var i, len, str, prop;
			if (window.dispatchEvent) {
				if (typeof event==='string') {
					str=event;
					event=document.createEvent('Event');
					bubbles=bubbles ? true : false;
					cancelable=cancelable ? true : false;
					event.initEvent(str, bubbles, cancelable);
				}
				if (typeof properties==='object') {
					for (prop in properties) {
						if (!event[prop]) {
							event[prop]=properties[prop];
						}
					}
				}
				for (i=0, len=this.length; i<len; i++) {
					this[i].dispatchEvent(event);
				}
			}
			else {
				if (typeof event==='object' && event.type) {
					str='on'+event.type;
				}
				else if (typeof event==='string') {
					str='on'+event;
				}
				for (i=0, len=this.length; i<len; i++) {
					if (this[i]!==window) {
						this[i].fireEvent(str);
					}
				}
			}
			return this;
		},
		remove: function () {
			for (_i=0; _i<this.el.length; _i++) {
				this.el[_i].style.display='none';
			}
			return this;
		},
		
		//call a function for each element in the collection, using the 'this' keyword for each of the elements
		forEach: function (code, arr) {
			var i, len;
			if (typeof code==='function' && (arr instanceof Array || typeof arr==='undefined')) {
				
				//if an array of argumens is present, pass them to the function
				if (arr instanceof Array) {
					for (i=0; i<this.length; i++) {
						code.apply(this[i], arr);
					}
				}
				else {
					for (i=0; i<this.length; i++) {
						code.apply(this[i]);
					}
				}
			}
			return this;
		},
		toggle: function (string, obj) {
			if (string==='style' || string==='css') {
				this.toggleCss(obj);
			}
			return this;
		},
		toggleCss: function (obj) {
			for (_i=0; _i<this.el.length; _i++) {
				for (prop in obj) {
					if (obj[prop] instanceof Array) {
						if (this.el[_i].style[prop.toCamelCase()]==obj[prop][0]) {
							this.el[_i].style[prop.toCamelCase()]=obj[prop][1];
						}
						else {
							this.el[_i].style[prop.toCamelCase()]=obj[prop][0];
						}
					}
				}
			}
			return this;
		}
	},
	debug: {
		writeToConsole: function (newText, overWriting) {
			consoleDisplay=document.getElementById('consoleDisplay');
			
			//write if the display is present
			if (consoleDisplay) {
				
				//make it visible
				consoleDisplay.style.visibility='visible';
				consoleDisplay.style.display='block';
				
				//use innerText if possible
				if (typeof consoleDisplay.innerText==='string') {
					
					//overwrite everything if overWriting is truthy, append to the end otherwise
					if (overWriting) {
						consoleDisplay.innerText=newText+'\n';
					}
					else {
						consoleDisplay.innerText+=newText+'\n';
					}
					
					//while there are more than 200 lines of text, delete the first ones
					while (consoleDisplay.innerText.count('\n')>200) {
						consoleDisplay.innerText=consoleDisplay.innerText.replace(/^.*\n/, '');
					}
				}
				
				//use textContent otherwise
				else {
					if (overWriting) {
						consoleDisplay.textContent=newText+'\n';
					}
					else {
						consoleDisplay.textContent+=newText+'\n';
					}
					while (consoleDisplay.textContent.count('\n')>200) {
						consoleDisplay.textContent=consoleDisplay.textContent.replace(/^.*\n/, '');
					}
				}
				
				//scroll to the bottom of the console
				consoleDisplay.scrollTop=10000;
			}
			
			//create the display otherwise
			else {
				consoleDisplay=document.createElement('pre');
				consoleDisplay.id='consoleDisplay';
				consoleDisplay.style.position='fixed';
				consoleDisplay.style.top='auto';
				consoleDisplay.style.left='auto';
				consoleDisplay.style.bottom='0px';
				consoleDisplay.style.right='0px';
				consoleDisplay.style.width='400px';
				consoleDisplay.style.height='150px';
				consoleDisplay.style.backgroundColor=(kLib.UA.short==='IE' && kLib.UA.version<9) ? 'rgb(33,33,33)' : 'rgba(33,33,33,0.9)';
				consoleDisplay.style.color='#ffffff';
				consoleDisplay.style.zIndex='9999';
				consoleDisplay.style.overflowY='auto';
				consoleDisplay.style.wordWrap='break-word';
				consoleDisplay.style.borderRadius='5px';
				consoleDisplay.style.paddingLeft='7px';
				consoleDisplay.style.margin='0px';
				consoleDisplay.ondblclick=cClose;
				document.getElementsByTagName('body')[0].appendChild(consoleDisplay);
				kLib.debug.writeToConsole(newText, overWriting);
			}
		},
		closeConsole: function (clearConsole) {
			if (window.consoleDisplay) {
				consoleDisplay.style.display='none';
				
				//if a truthy argument is given, clear the console
				if (clearConsole) {
					consoleDisplay.innerText='';
				}
			}
		}
	},
	
	//auxiliary internal variables
	auxVars: {
		extendedArray: [],
		handlers: {},
		lastUniqueId: 0
	},
	
	//element selector function
	select: function () {
		var string=arguments[0], obj=arguments[1], element, cont, regExp=kLib.regExp;
		
		//if the first argument is a string and the second is a plane object or undefined
		if (typeof string==='string' && ((obj instanceof Object && !(obj instanceof Array)) || obj===undefined)) {
			
			//if it is a simple tag
			if (regExp.simpleTagCreation.test(string.trimSpaces())) {
				
				//create an element and initialise its attributes with the object giver
				element=document.createElement(string.trimSpaces().substring(1, string.trimSpaces().length-1));
				for (prop in obj) {
					
					//check if property really exists on the object, not on the prototype chain
					if (obj.hasOwnProperty(prop)) {
						element[prop]=obj[prop];
					}
				}
				
				//return it wrapped in a collection
				return kLib(element);
			}
			
			//if it is a more complex tag
			else if (regExp.complexTagCreation.test(string.trimSpaces())) {
				
				//create a container div and put the HTML inside
				cont=document.createElement('div');
				cont.innerHTML=string;
				
				//get only the first child and initialise it
				element=cont.firstChild;
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						element[prop]=obj[prop];
					}
				}
				
				//return it in a collection
				return kLib(element);
			}
		}
		return new kLib.QuerySelection(arguments);
	},
	
	//collection constructor
	QuerySelection: function () {
		
		//since the function is called with an array given as argument, normalize the arguments object
		//and make the string equal to the first argument, and the context to the second
		var aux, len, aLen=arguments[0].length, i, j, trimmedString, cid, arg, id, oldId, current,
			context=arguments[0][1], string=arguments[0][0], arguments=arguments[0], regExp=kLib.regExp;
		
		//function to check if an element is already present in a collection (to be implemented in prototype!)
		var existsAlready=function (collection, element) {
			var i, len=collection.length;
			for (i=0; i<len; i++) {
				if (collection[i]===element) {
					return true;
				}
			}
			return false;
		};
		
		//set the collection length to 0
		this.length=0;
		
		//if the first argument is a string, the second is a valid context or undefined
		//and there are less than 2 arguments given
		if (typeof string==='string' &&	(context===undefined || typeof context==='string' || kLib(context).isDOM()) && aLen<=2) {
			
			//set the query of the collection to the string
			this.query=string;
			
			//if the context is undefined, use the document by default
			if (!context) {
				context=window.document;
			}
			
			//set the context of the collection
			this.context=context;
			
			//wrap the context in a collection
			context=kLib(context);
			
			//if it contains only DOM elements
			if (context.isDOM()) {
				
				//trim the string
				trimmedString=string.trimSpaces();
				
				//for each element in the context
				for (cid=0; cid<context.length; cid++) {
					
					//if the string is an id and the context is the document, use getElementsById
					if (regExp.simpleId.test(trimmedString) && context[cid]===document) {
						aux=document.getElementById(trimmedString.slice(1));
						
						//if there is a non-existing match, put it in the collection and increase the length
						if (aux) {
							if (!existsAlready(this, aux)) {
								this[this.length]=aux;
								this.length++;
							}
						}
					}
					
					//if it is a class name and the getElementsByClassName is supported on the context, use it
					else if (regExp.simpleClass.test(trimmedString) && context[cid].getElementsByClassName) {
						aux=context[cid].getElementsByClassName(trimmedString.slice(1));
						len=aux.length;
						
						//for each element found, put it in the collection
						for (i=0; i<len; i++) {
							if (!existsAlready(this, aux[i])) {
								this[this.length]=aux[i];
								this.length++;
							}
						}
					}
					
					//if it is html tag and getElementsByTagName is present, use it
					else if (regExp.simpleTag.test(trimmedString)) {
						aux=context[cid].getElementsByTagName(string);
						len=aux.length;
						for (i=0; i<len; i++) {
							if (!existsAlready(this, aux[i])) {
								this[this.length]=aux[i];
								this.length++;
							}
						}
					}
					
					//if querySelectorAll is present on the context, use it
					else if (context[cid].querySelectorAll) {
						aux=context[cid].querySelectorAll(string);
						len=aux.length;
						for (i=0; i<len; i++) {
							if (!existsAlready(this, aux[i])) {
								this[this.length]=aux[i];
								this.length++;
							}
						}
					}
					
					//if document.querySelectorAll is present, use it
					else if (document.querySelectorAll) {
						current=context[cid];
						
						//get an unique id
						id=kLib.math.randomAlphaNumericalString();
						while (document.getElementsById(id)) {
							id=kLib.math.randomAlphaNumericalString();
						}
						
						//save the old id
						oldId=current.id;
						current.id=id;
						
						//pass the string to document.querySelectorAll with and aditional id in front
						//so it will only search the elements in the context
						aux=document.querySelectorAll('#'+id+' '+string);
						len=aux.length;
						
						//restore the old id
						current.id=(oldId===undefined) ? '' : oldId;						
						for (i=0; i<len; i++) {
							if (!existsAlready(this, aux[i])) {
								this[this.length]=aux[i];
								this.length++;
							}
						}
					}
					
					//if Sizzle is found, use it
					else if (typeof Sizzle==='function') {
						aux=Sizzle(string, context[cid]);
						for (i=0; i<len; i++) {
							if (!existsAlready(this, aux[i])) {
								this[this.length]=aux[i];
								this.length++;
							}
						}
					}
					
					//else throw an error
					else {
						throw new Error('Sizzle missing, no way to select elements by query.');
					}
				}
			}
		}
		else {
			
			//if it isn't a selection, make a collection from the arguments
			for (i=0; i<aLen; i++) {
				arg=arguments[i];
				
				//if the current argument is an array, a collection or a string, add the elements to the collection
				if (arg instanceof Array || arg instanceof kLib.QuerySelection || typeof arg==='string') {
					
					//if it is a string, assume it is a query and search for elements
					arg=(typeof arg==='string') ? kLib(arg) : arg;
					len=arg.length;
					for (j=0; j<len; j++) {
						this[this.length]=arg[j];
						this.length++;
					}
				}
				
				//else simply add the argument
				else {
					this[this.length]=arg;
					this.length++;
				}
			}
		}
	},
	
	//bind functions to the global namespace
	bindFunctions: function () {
		window.cWrite=kLib.debug.writeToConsole;
		window.cClose=kLib.debug.closeConsole;
		window.Color=kLib.color.Color;
	},
	
	//add kLib and $k to the global namespace
	copyProps: function () {
		var prop;
		
		//make $k the selector function
		window.$k=kLib.select;
		
		//copy the properties from the library
		for (prop in kLib) {
			window.$k[prop]=kLib[prop];
		}
		
		//do the same for kLib
		window.kLib=$k.select;
		for (prop in $k) {
			window.kLib[prop]=$k[prop];
		}
	},
	
	//initialise the library
	directInit: function () {
		kLib.extendDefaultObjectMethods();
		kLib.extendDefaultDOM();
		kLib.UA.getUAInfo();
		kLib.copyProps();
		kLib.bindFunctions();
		kLib.color.init();
		kLib(document).on('DOMContentLoaded', kLib.onloadInit, false);
	},
	onloadInit: function () {
	}
}
kLib.directInit();