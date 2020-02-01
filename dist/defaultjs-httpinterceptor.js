/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./src/index.js");


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const URLSPLITTER = /^((([^:\/]*:)?\/\/)?([^:\/]*)(\:([0-9]*))?)(\/.*)?$/;

/* harmony default export */ __webpack_exports__["a"] = ({URLSPLITTER});

/***/ }),

/***/ "./src/Fetch.js":
/*!**********************!*\
  !*** ./src/Fetch.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");



(function(Global){
	if(typeof Global.fetch !== "function")
		return;	
	const ORGFETCH = Global.fetch;
	Global.fetch = function(aUrl, aRequest){
		const match = _Constants__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].URLSPLITTER.exec(aUrl);		
		return _Manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].doIntercept({
				url : aUrl,
				request : aRequest || {},
				metadata : {					
					method : typeof aRequest === "undefined" ? "GET" : (aRequest.method || "GET"),
					origin: match[1] || document.location.origin,
					protocol : (function(match){
						if(typeof match[2] === "undefined" || match[3] == "//")
							return document.location.protocol || "http:";
						else return match[3];			
					}).call(null, match),
					hostname: match[4] || document.location.hostname,
					port: match[6],
					query: match[7],
					async : true						
				}
			}).then(function(aData){
				return ORGFETCH(aData.url, aData.request);
			})["catch"](function(error){throw error});
	};
})(window || global || self || undefined || {});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const INTERCEPTORS = [];
const CACHE = {};

const getChain = function(aData, aRequest){
	let chain = CACHE[aData.metadata.origin];
	if(typeof chain !== "undefined")
		return Promise.resolve(chain);
	
	let promises = [];
	INTERCEPTORS.forEach(function(aInterceptor){
		let promise = Promise.resolve(aInterceptor.doAccept(aData))
			.then(function(value){
				if(value)
					return aInterceptor;
			});
		promises.push(promise);
	});
	
	return Promise.all(promises)
	.then(function(chain){
		const interceptors = chain.filter(function(interceptor){
			return typeof interceptor !== "undefined";
		});
		
		CACHE[aData.metadata.origin] = interceptors;
		return interceptors;
	})["catch"](function(error){throw error});
};

const isOriginIgnored = function(data, origins){
	for(let i = 0; i < origins.length; i++)
		if(data.metadata.origin == origins[i])
			return true;
	
	return false;
};

const Manager = {
	config : {
		ignoreDocumentOrigin : true,
		ignoreOrigins : []		
	},
	interceptors : [],
	doIntercept : function(aData){
		if(Manager.config.ignoreDocumentOrigin && aData.metadata.origin == document.location.origin)
			return Promise.resolve(aData);
		if(typeof Manager.config.ignoreOrigins !== "undefined" && isOriginIgnored(aData, Manager.config.ignoreOrigins))
			return Promise.resolve(aData);
		
		return getChain(aData)
		.then(function(chain){
			if(typeof chain === "undefined" || chain.length == 0)
				return Promise.resolve(aData);
			
			let handles = [];
			let promise = Promise.resolve(aData);
			chain.forEach(function(aInterceptor){
				promise = promise.then(aInterceptor.doHandle);
			});			
			return promise;
		})["catch"](function(error){throw error;});
	},
	addInterceptor : function(aInterceptor){		
		if(arguments.length != 1 && typeof aInterceptor !== "object")
			throw new Error("function required an interceptor");
		if(typeof aInterceptor.doAccept !== "function")
			throw new Error("The interceptor required a \"doAccept\" function!");
		if(typeof aInterceptor.doHandle !== "function")
			throw new Error("The interceptor required a \"doHandle\" function!");
		
		INTERCEPTORS.push(aInterceptor);
		return Manager;
	}
};
/* harmony default export */ __webpack_exports__["a"] = (Manager); 




/***/ }),

/***/ "./src/XMLHttpRequest.js":
/*!*******************************!*\
  !*** ./src/XMLHttpRequest.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");



(function(Global){
	if(typeof Global.XMLHttpRequest === "undefined")
		return;

	const ORGXHR = Global.XMLHttpRequest;
	const executeRequest = function(aData){
		ORGXHR.prototype.open.call(this, aData.request.method, aData.url, aData.metadata.async, aData.metadata.username, aData.metadata.password);
		if(typeof aData.request.headers !== "undefined")
			Object.getOwnPropertyNames(aData.request.headers)
			.forEach((function(aHeader){
				ORGXHR.prototype.setRequestHeader.call(this, aHeader, aData.request.headers[aHeader]);
			}).bind(this));
		ORGXHR.prototype.send.call(this, aData.request.body);
	}
	let XHR = function (){
		const xhr = new ORGXHR(arguments);
		let data = undefined;		
		
		xhr.setRequestHeader = function(aName, aValue){
			data.request.headers = data.request.headers || {};			
			data.request.headers[aName] = aValue;
		};
		
		xhr.open = function(aMethod, aUrl, isAsync, aUsername, aPassword){		
			const match = _Constants__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].URLSPLITTER.exec(aUrl);
			data = {
				url : aUrl,
				request : {
					method : aMethod
				},
				metadata : {
					method : aMethod,
					origin: match[1] || document.location.origin,
					protocol : (function(match){
						if(typeof match[2] === "undefined" || match[3] == "//")
							return document.location.protocol || "http:";
						else return match[3];			
					}).call(null, match),
					hostname: match[4] || document.location.hostname,
					port: match[6],
					query: match[7],
					async : typeof isAsync === "boolean" ? isAsync : true,
					username : aUsername,
					password : aPassword
				}
			};
		};
		
		xhr.send = function(aBody){
			if(data.metadata.async){
				data.request.body = aBody; 
	    		_Manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].doIntercept(data)
	    		.then(executeRequest.bind(xhr))
	    		["catch"](console.error);
		    }
			else
				executeRequest.call(xhr, data);
		};
		
		return xhr;
	};
	
	Global.XMLHttpRequest = XHR;
	Global.XMLHttpRequest.prototype = ORGXHR.prototype;
	Global.XMLHttpRequest.prototype.constructor = XHR;
	
	
})(window || global || self, undefined, {});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _XMLHttpRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XMLHttpRequest */ "./src/XMLHttpRequest.js");
/* harmony import */ var _Fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fetch */ "./src/Fetch.js");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors/index.js");






(function(Global){	
	Global.defaultjs = Global.defaultjs || {};
	Global.defaultjs.httpinterceptor = Global.defaultjs.httpinterceptor || {
		VERSION : "1.0.0-beta.4",
		Manager : _Manager__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
		interceptors : _interceptors__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
	};
})(window|| global || {});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/interceptors/OAuthInterceptor.js":
/*!**********************************************!*\
  !*** ./src/interceptors/OAuthInterceptor.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _TokenInterceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TokenInterceptor */ "./src/interceptors/TokenInterceptor.js");


const OAuthInterceptor = function(aSetup){
	let setup = aSetup;
	setup.fetchToken = function(){
		return fetch(setup.login.url, {
			method: (setup.login.method || "get")
		}).then(function(aResponse){
			return aResponse.json();
		}).then(function(aResponse){
			return aResponse[setup.login.response.valueSelector];
		})["catch"](function(error){throw error;});		
	};
	setup.appendToken = function(aToken, aData){
		aData.request.headers = aData.request.headers || {};
		aData.request.headers["Authorization"] = "Bearer " + aToken;
		return aData;
	};
	return Object(_TokenInterceptor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(aSetup);
};

/* harmony default export */ __webpack_exports__["a"] = (OAuthInterceptor);


/***/ }),

/***/ "./src/interceptors/TokenInterceptor.js":
/*!**********************************************!*\
  !*** ./src/interceptors/TokenInterceptor.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * aSetup  => 
 * {
 * 	condition : [string | string[] | function(aData}],
 * 	fetchToken : function(),
 *  appendToken : function(aToken, aData),
 *  (optional) refreshInterval,
 *  (optional) refreshToken : function()
 * } 
 * 
 * aData => 
 * {
 * 	url : String,
 * 	request : {
 * 		method : string,
 * 		(optional) headers : {
 * 			[header name : string] : [header value : string],
 * 			... 
 * 		},
 * 		(optional) body : {string | object | FormData | ...] 
 * 	},
 * 	metadata : {
 * 		method : string,
 * 		origin : string,
 * 		hostname : string,
 * 		protocol : string,
 * 		(optional) port : number,
 * 		query : string,
 * 	} 
 * }
 */
const TokenInterceptor = function(aSetup){
	const setup = aSetup;	
	let token = undefined;
    
    const callAppendToken = function(aToken, aData, theAppender){
    	if(theAppender instanceof Array){
			let promise = Promise.resolve(aData);
			theAppender.forEach(function(appender){
				promise = promise.then(function(aData){
					return appender(aToken, aData);
				});
			});
			return promise;
		}
		else
			return Promise.resolve(theAppender(aToken, aData));
    };
    
    const startRefresh = function(){	
		if(setup.refreshInterval > 0){
		    const refreshToken = typeof setup.refreshToken === "function" ? function(){
		            token = Promise.resolve(setup.refreshToken())
		    	} : function(){
		    		token = Promise.resolve(setup.fetchToken());
		    	};
		    
		    setInterval(refreshToken, setup.refreshInterval || (60 * 1000))
		}
    };
	
	
	return {
		doAccept : setup.doAccept || function(aData){			
			const type = typeof setup.condition; 
			if(type === "function")
				return Promise.resolve(setup.condition(aData));
			else if(type === "string")
				return Promise.resolve(setup.condition == aData.metadata.origin);
			else if(setup.condition instanceof Array){
				for(let i = 0; i < setup.condition.length; i++)
					if(setup.condition[i] == aData.metadata.origin)
						return Promise.resolve(true);
			}	
			return Promise.resolve(false);				
		},
		doHandle : function(aData){				
			if(!token)
				token = Promise.resolve(setup.fetchToken())
					.then(function(aToken){
						startRefresh();
						return aToken;
					});			
				
			return token.then(function(aToken){
				return callAppendToken(aToken, aData, setup.appendToken);
			})["catch"](function(error){throw error});
		}		
	};
};

/* harmony default export */ __webpack_exports__["a"] = (TokenInterceptor);


/***/ }),

/***/ "./src/interceptors/index.js":
/*!***********************************!*\
  !*** ./src/interceptors/index.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _OAuthInterceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OAuthInterceptor */ "./src/interceptors/OAuthInterceptor.js");
/* harmony import */ var _TokenInterceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TokenInterceptor */ "./src/interceptors/TokenInterceptor.js");




const Data = {
	OAuthInterceptor : _OAuthInterceptor__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
	TokenInterceptor : _TokenInterceptor__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
};

/* harmony default export */ __webpack_exports__["a"] = (Data);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9GZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvWE1MSHR0cFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmNlcHRvcnMvT0F1dGhJbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL1Rva2VuSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztR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QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLCtDO0FBQ0EsdUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDRCQUE0QjtBQUM5QztBQUNBO0FBQ0EsSTtBQUNBLGlDO0FBQ0EsR0FBRztBQUNILDZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRTs7QUFFTjtBQUNBO0FBQ0EsSUFBSSwyQkFBMkIsWUFBWTtBQUMzQyxHO0FBQ0E7QUFDQTs7QUFFZSx5RUFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUMzRmhDO0FBQUE7QUFBa0Q7QUFDQTs7O0FBR2xEO0FBQ0Esb0JBQW9CLGlFQUFnQjtBQUNwQyxvQkFBb0IsaUVBQWdCO0FBQ3BDOztBQUVlLDZEQUFJLEUiLCJmaWxlIjoiZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgXCIuL3NyYy9pbmRleFwiOyIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImNvbnN0IFVSTFNQTElUVEVSID0gL14oKChbXjpcXC9dKjopP1xcL1xcLyk/KFteOlxcL10qKShcXDooWzAtOV0qKSk/KShcXC8uKik/JC87XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7VVJMU1BMSVRURVJ9OyIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHJcbihmdW5jdGlvbihHbG9iYWwpe1xyXG5cdGlmKHR5cGVvZiBHbG9iYWwuZmV0Y2ggIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdHJldHVybjtcdFxyXG5cdGNvbnN0IE9SR0ZFVENIID0gR2xvYmFsLmZldGNoO1xyXG5cdEdsb2JhbC5mZXRjaCA9IGZ1bmN0aW9uKGFVcmwsIGFSZXF1ZXN0KXtcclxuXHRcdGNvbnN0IG1hdGNoID0gQ29uc3RhbnRzLlVSTFNQTElUVEVSLmV4ZWMoYVVybCk7XHRcdFxyXG5cdFx0cmV0dXJuIE1hbmFnZXIuZG9JbnRlcmNlcHQoe1xyXG5cdFx0XHRcdHVybCA6IGFVcmwsXHJcblx0XHRcdFx0cmVxdWVzdCA6IGFSZXF1ZXN0IHx8IHt9LFxyXG5cdFx0XHRcdG1ldGFkYXRhIDoge1x0XHRcdFx0XHRcclxuXHRcdFx0XHRcdG1ldGhvZCA6IHR5cGVvZiBhUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiR0VUXCIgOiAoYVJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCIpLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiBtYXRjaFsxXSB8fCBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4sXHJcblx0XHRcdFx0XHRwcm90b2NvbCA6IChmdW5jdGlvbihtYXRjaCl7XHJcblx0XHRcdFx0XHRcdGlmKHR5cGVvZiBtYXRjaFsyXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBtYXRjaFszXSA9PSBcIi8vXCIpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sIHx8IFwiaHR0cDpcIjtcclxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4gbWF0Y2hbM107XHRcdFx0XHJcblx0XHRcdFx0XHR9KS5jYWxsKG51bGwsIG1hdGNoKSxcclxuXHRcdFx0XHRcdGhvc3RuYW1lOiBtYXRjaFs0XSB8fCBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IG1hdGNoWzZdLFxyXG5cdFx0XHRcdFx0cXVlcnk6IG1hdGNoWzddLFxyXG5cdFx0XHRcdFx0YXN5bmMgOiB0cnVlXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS50aGVuKGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdFx0XHRyZXR1cm4gT1JHRkVUQ0goYURhdGEudXJsLCBhRGF0YS5yZXF1ZXN0KTtcclxuXHRcdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3J9KTtcclxuXHR9O1xyXG59KSh3aW5kb3cgfHwgZ2xvYmFsIHx8IHNlbGYgfHwgdGhpcyB8fCB7fSk7IiwiY29uc3QgSU5URVJDRVBUT1JTID0gW107XHJcbmNvbnN0IENBQ0hFID0ge307XHJcblxyXG5jb25zdCBnZXRDaGFpbiA9IGZ1bmN0aW9uKGFEYXRhLCBhUmVxdWVzdCl7XHJcblx0bGV0IGNoYWluID0gQ0FDSEVbYURhdGEubWV0YWRhdGEub3JpZ2luXTtcclxuXHRpZih0eXBlb2YgY2hhaW4gIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoYWluKTtcclxuXHRcclxuXHRsZXQgcHJvbWlzZXMgPSBbXTtcclxuXHRJTlRFUkNFUFRPUlMuZm9yRWFjaChmdW5jdGlvbihhSW50ZXJjZXB0b3Ipe1xyXG5cdFx0bGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYUludGVyY2VwdG9yLmRvQWNjZXB0KGFEYXRhKSlcclxuXHRcdFx0LnRoZW4oZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0XHRcdGlmKHZhbHVlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGFJbnRlcmNlcHRvcjtcclxuXHRcdFx0fSk7XHJcblx0XHRwcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcclxuXHQudGhlbihmdW5jdGlvbihjaGFpbil7XHJcblx0XHRjb25zdCBpbnRlcmNlcHRvcnMgPSBjaGFpbi5maWx0ZXIoZnVuY3Rpb24oaW50ZXJjZXB0b3Ipe1xyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIGludGVyY2VwdG9yICE9PSBcInVuZGVmaW5lZFwiO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdENBQ0hFW2FEYXRhLm1ldGFkYXRhLm9yaWdpbl0gPSBpbnRlcmNlcHRvcnM7XHJcblx0XHRyZXR1cm4gaW50ZXJjZXB0b3JzO1xyXG5cdH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24oZXJyb3Ipe3Rocm93IGVycm9yfSk7XHJcbn07XHJcblxyXG5jb25zdCBpc09yaWdpbklnbm9yZWQgPSBmdW5jdGlvbihkYXRhLCBvcmlnaW5zKXtcclxuXHRmb3IobGV0IGkgPSAwOyBpIDwgb3JpZ2lucy5sZW5ndGg7IGkrKylcclxuXHRcdGlmKGRhdGEubWV0YWRhdGEub3JpZ2luID09IG9yaWdpbnNbaV0pXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSB7XHJcblx0Y29uZmlnIDoge1xyXG5cdFx0aWdub3JlRG9jdW1lbnRPcmlnaW4gOiB0cnVlLFxyXG5cdFx0aWdub3JlT3JpZ2lucyA6IFtdXHRcdFxyXG5cdH0sXHJcblx0aW50ZXJjZXB0b3JzIDogW10sXHJcblx0ZG9JbnRlcmNlcHQgOiBmdW5jdGlvbihhRGF0YSl7XHJcblx0XHRpZihNYW5hZ2VyLmNvbmZpZy5pZ25vcmVEb2N1bWVudE9yaWdpbiAmJiBhRGF0YS5tZXRhZGF0YS5vcmlnaW4gPT0gZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdGlmKHR5cGVvZiBNYW5hZ2VyLmNvbmZpZy5pZ25vcmVPcmlnaW5zICE9PSBcInVuZGVmaW5lZFwiICYmIGlzT3JpZ2luSWdub3JlZChhRGF0YSwgTWFuYWdlci5jb25maWcuaWdub3JlT3JpZ2lucykpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZ2V0Q2hhaW4oYURhdGEpXHJcblx0XHQudGhlbihmdW5jdGlvbihjaGFpbil7XHJcblx0XHRcdGlmKHR5cGVvZiBjaGFpbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjaGFpbi5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBoYW5kbGVzID0gW107XHJcblx0XHRcdGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFx0Y2hhaW4uZm9yRWFjaChmdW5jdGlvbihhSW50ZXJjZXB0b3Ipe1xyXG5cdFx0XHRcdHByb21pc2UgPSBwcm9taXNlLnRoZW4oYUludGVyY2VwdG9yLmRvSGFuZGxlKTtcclxuXHRcdFx0fSk7XHRcdFx0XHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3I7fSk7XHJcblx0fSxcclxuXHRhZGRJbnRlcmNlcHRvciA6IGZ1bmN0aW9uKGFJbnRlcmNlcHRvcil7XHRcdFxyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCAhPSAxICYmIHR5cGVvZiBhSW50ZXJjZXB0b3IgIT09IFwib2JqZWN0XCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImZ1bmN0aW9uIHJlcXVpcmVkIGFuIGludGVyY2VwdG9yXCIpO1xyXG5cdFx0aWYodHlwZW9mIGFJbnRlcmNlcHRvci5kb0FjY2VwdCAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9BY2NlcHRcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdGlmKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9IYW5kbGUgIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXFxcImRvSGFuZGxlXFxcIiBmdW5jdGlvbiFcIik7XHJcblx0XHRcclxuXHRcdElOVEVSQ0VQVE9SUy5wdXNoKGFJbnRlcmNlcHRvcik7XHJcblx0XHRyZXR1cm4gTWFuYWdlcjtcclxuXHR9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IFxyXG5cclxuXHJcbiIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHJcbihmdW5jdGlvbihHbG9iYWwpe1xyXG5cdGlmKHR5cGVvZiBHbG9iYWwuWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdGNvbnN0IE9SR1hIUiA9IEdsb2JhbC5YTUxIdHRwUmVxdWVzdDtcclxuXHRjb25zdCBleGVjdXRlUmVxdWVzdCA9IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdE9SR1hIUi5wcm90b3R5cGUub3Blbi5jYWxsKHRoaXMsIGFEYXRhLnJlcXVlc3QubWV0aG9kLCBhRGF0YS51cmwsIGFEYXRhLm1ldGFkYXRhLmFzeW5jLCBhRGF0YS5tZXRhZGF0YS51c2VybmFtZSwgYURhdGEubWV0YWRhdGEucGFzc3dvcmQpO1xyXG5cdFx0aWYodHlwZW9mIGFEYXRhLnJlcXVlc3QuaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYURhdGEucmVxdWVzdC5oZWFkZXJzKVxyXG5cdFx0XHQuZm9yRWFjaCgoZnVuY3Rpb24oYUhlYWRlcil7XHJcblx0XHRcdFx0T1JHWEhSLnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyLmNhbGwodGhpcywgYUhlYWRlciwgYURhdGEucmVxdWVzdC5oZWFkZXJzW2FIZWFkZXJdKTtcclxuXHRcdFx0fSkuYmluZCh0aGlzKSk7XHJcblx0XHRPUkdYSFIucHJvdG90eXBlLnNlbmQuY2FsbCh0aGlzLCBhRGF0YS5yZXF1ZXN0LmJvZHkpO1xyXG5cdH1cclxuXHRsZXQgWEhSID0gZnVuY3Rpb24gKCl7XHJcblx0XHRjb25zdCB4aHIgPSBuZXcgT1JHWEhSKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZGF0YSA9IHVuZGVmaW5lZDtcdFx0XHJcblx0XHRcclxuXHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyID0gZnVuY3Rpb24oYU5hbWUsIGFWYWx1ZSl7XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHRcdFx0XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzW2FOYW1lXSA9IGFWYWx1ZTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHhoci5vcGVuID0gZnVuY3Rpb24oYU1ldGhvZCwgYVVybCwgaXNBc3luYywgYVVzZXJuYW1lLCBhUGFzc3dvcmQpe1x0XHRcclxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBDb25zdGFudHMuVVJMU1BMSVRURVIuZXhlYyhhVXJsKTtcclxuXHRcdFx0ZGF0YSA9IHtcclxuXHRcdFx0XHR1cmwgOiBhVXJsLFxyXG5cdFx0XHRcdHJlcXVlc3QgOiB7XHJcblx0XHRcdFx0XHRtZXRob2QgOiBhTWV0aG9kXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRhZGF0YSA6IHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGFNZXRob2QsXHJcblx0XHRcdFx0XHRvcmlnaW46IG1hdGNoWzFdIHx8IGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbixcclxuXHRcdFx0XHRcdHByb3RvY29sIDogKGZ1bmN0aW9uKG1hdGNoKXtcclxuXHRcdFx0XHRcdFx0aWYodHlwZW9mIG1hdGNoWzJdID09PSBcInVuZGVmaW5lZFwiIHx8IG1hdGNoWzNdID09IFwiLy9cIilcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgfHwgXCJodHRwOlwiO1xyXG5cdFx0XHRcdFx0XHRlbHNlIHJldHVybiBtYXRjaFszXTtcdFx0XHRcclxuXHRcdFx0XHRcdH0pLmNhbGwobnVsbCwgbWF0Y2gpLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IG1hdGNoWzRdIHx8IGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLFxyXG5cdFx0XHRcdFx0cG9ydDogbWF0Y2hbNl0sXHJcblx0XHRcdFx0XHRxdWVyeTogbWF0Y2hbN10sXHJcblx0XHRcdFx0XHRhc3luYyA6IHR5cGVvZiBpc0FzeW5jID09PSBcImJvb2xlYW5cIiA/IGlzQXN5bmMgOiB0cnVlLFxyXG5cdFx0XHRcdFx0dXNlcm5hbWUgOiBhVXNlcm5hbWUsXHJcblx0XHRcdFx0XHRwYXNzd29yZCA6IGFQYXNzd29yZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHhoci5zZW5kID0gZnVuY3Rpb24oYUJvZHkpe1xyXG5cdFx0XHRpZihkYXRhLm1ldGFkYXRhLmFzeW5jKXtcclxuXHRcdFx0XHRkYXRhLnJlcXVlc3QuYm9keSA9IGFCb2R5OyBcclxuXHQgICAgXHRcdE1hbmFnZXIuZG9JbnRlcmNlcHQoZGF0YSlcclxuXHQgICAgXHRcdC50aGVuKGV4ZWN1dGVSZXF1ZXN0LmJpbmQoeGhyKSlcclxuXHQgICAgXHRcdFtcImNhdGNoXCJdKGNvbnNvbGUuZXJyb3IpO1xyXG5cdFx0ICAgIH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGV4ZWN1dGVSZXF1ZXN0LmNhbGwoeGhyLCBkYXRhKTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHJldHVybiB4aHI7XHJcblx0fTtcclxuXHRcclxuXHRHbG9iYWwuWE1MSHR0cFJlcXVlc3QgPSBYSFI7XHJcblx0R2xvYmFsLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSA9IE9SR1hIUi5wcm90b3R5cGU7XHJcblx0R2xvYmFsLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFhIUjtcclxuXHRcclxuXHRcclxufSkod2luZG93IHx8IGdsb2JhbCB8fCBzZWxmLCB0aGlzLCB7fSk7IiwiaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IEludGVyY2VwdG9ycyBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcclxuXHJcblxyXG4oZnVuY3Rpb24oR2xvYmFsKXtcdFxyXG5cdEdsb2JhbC5kZWZhdWx0anMgPSBHbG9iYWwuZGVmYXVsdGpzIHx8IHt9O1xyXG5cdEdsb2JhbC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yID0gR2xvYmFsLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgfHwge1xyXG5cdFx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdFx0TWFuYWdlciA6IE1hbmFnZXIsXHJcblx0XHRpbnRlcmNlcHRvcnMgOiBJbnRlcmNlcHRvcnNcclxuXHR9O1xyXG59KSh3aW5kb3d8fCBnbG9iYWwgfHwge30pOyIsImltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIlxyXG5cclxuY29uc3QgT0F1dGhJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGFTZXR1cCl7XHJcblx0bGV0IHNldHVwID0gYVNldHVwO1xyXG5cdHNldHVwLmZldGNoVG9rZW4gPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIGZldGNoKHNldHVwLmxvZ2luLnVybCwge1xyXG5cdFx0XHRtZXRob2Q6IChzZXR1cC5sb2dpbi5tZXRob2QgfHwgXCJnZXRcIilcclxuXHRcdH0pLnRoZW4oZnVuY3Rpb24oYVJlc3BvbnNlKXtcclxuXHRcdFx0cmV0dXJuIGFSZXNwb25zZS5qc29uKCk7XHJcblx0XHR9KS50aGVuKGZ1bmN0aW9uKGFSZXNwb25zZSl7XHJcblx0XHRcdHJldHVybiBhUmVzcG9uc2Vbc2V0dXAubG9naW4ucmVzcG9uc2UudmFsdWVTZWxlY3Rvcl07XHJcblx0XHR9KVtcImNhdGNoXCJdKGZ1bmN0aW9uKGVycm9yKXt0aHJvdyBlcnJvcjt9KTtcdFx0XHJcblx0fTtcclxuXHRzZXR1cC5hcHBlbmRUb2tlbiA9IGZ1bmN0aW9uKGFUb2tlbiwgYURhdGEpe1xyXG5cdFx0YURhdGEucmVxdWVzdC5oZWFkZXJzID0gYURhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdFx0YURhdGEucmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgYVRva2VuO1xyXG5cdFx0cmV0dXJuIGFEYXRhO1xyXG5cdH07XHJcblx0cmV0dXJuIFRva2VuSW50ZXJjZXB0b3IoYVNldHVwKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9BdXRoSW50ZXJjZXB0b3I7XHJcbiIsIi8qKlxyXG4gKiBhU2V0dXAgID0+IFxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9IFxyXG4gKiBcclxuICogYURhdGEgPT4gXHJcbiAqIHtcclxuICogXHR1cmwgOiBTdHJpbmcsXHJcbiAqIFx0cmVxdWVzdCA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdChvcHRpb25hbCkgaGVhZGVycyA6IHtcclxuICogXHRcdFx0W2hlYWRlciBuYW1lIDogc3RyaW5nXSA6IFtoZWFkZXIgdmFsdWUgOiBzdHJpbmddLFxyXG4gKiBcdFx0XHQuLi4gXHJcbiAqIFx0XHR9LFxyXG4gKiBcdFx0KG9wdGlvbmFsKSBib2R5IDoge3N0cmluZyB8IG9iamVjdCB8IEZvcm1EYXRhIHwgLi4uXSBcclxuICogXHR9LFxyXG4gKiBcdG1ldGFkYXRhIDoge1xyXG4gKiBcdFx0bWV0aG9kIDogc3RyaW5nLFxyXG4gKiBcdFx0b3JpZ2luIDogc3RyaW5nLFxyXG4gKiBcdFx0aG9zdG5hbWUgOiBzdHJpbmcsXHJcbiAqIFx0XHRwcm90b2NvbCA6IHN0cmluZyxcclxuICogXHRcdChvcHRpb25hbCkgcG9ydCA6IG51bWJlcixcclxuICogXHRcdHF1ZXJ5IDogc3RyaW5nLFxyXG4gKiBcdH0gXHJcbiAqIH1cclxuICovXHJcbmNvbnN0IFRva2VuSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihhU2V0dXApe1xyXG5cdGNvbnN0IHNldHVwID0gYVNldHVwO1x0XHJcblx0bGV0IHRva2VuID0gdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBjb25zdCBjYWxsQXBwZW5kVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFEYXRhLCB0aGVBcHBlbmRlcil7XHJcbiAgICBcdGlmKHRoZUFwcGVuZGVyIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRcdHRoZUFwcGVuZGVyLmZvckVhY2goZnVuY3Rpb24oYXBwZW5kZXIpe1xyXG5cdFx0XHRcdHByb21pc2UgPSBwcm9taXNlLnRoZW4oZnVuY3Rpb24oYURhdGEpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFwcGVuZGVyKGFUb2tlbiwgYURhdGEpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhlQXBwZW5kZXIoYVRva2VuLCBhRGF0YSkpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3Qgc3RhcnRSZWZyZXNoID0gZnVuY3Rpb24oKXtcdFxyXG5cdFx0aWYoc2V0dXAucmVmcmVzaEludGVydmFsID4gMCl7XHJcblx0XHQgICAgY29uc3QgcmVmcmVzaFRva2VuID0gdHlwZW9mIHNldHVwLnJlZnJlc2hUb2tlbiA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24oKXtcclxuXHRcdCAgICAgICAgICAgIHRva2VuID0gUHJvbWlzZS5yZXNvbHZlKHNldHVwLnJlZnJlc2hUb2tlbigpKVxyXG5cdFx0ICAgIFx0fSA6IGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgXHRcdHRva2VuID0gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmZldGNoVG9rZW4oKSk7XHJcblx0XHQgICAgXHR9O1xyXG5cdFx0ICAgIFxyXG5cdFx0ICAgIHNldEludGVydmFsKHJlZnJlc2hUb2tlbiwgc2V0dXAucmVmcmVzaEludGVydmFsIHx8ICg2MCAqIDEwMDApKVxyXG5cdFx0fVxyXG4gICAgfTtcclxuXHRcclxuXHRcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZG9BY2NlcHQgOiBzZXR1cC5kb0FjY2VwdCB8fCBmdW5jdGlvbihhRGF0YSl7XHRcdFx0XHJcblx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2Ygc2V0dXAuY29uZGl0aW9uOyBcclxuXHRcdFx0aWYodHlwZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoc2V0dXAuY29uZGl0aW9uKGFEYXRhKSk7XHJcblx0XHRcdGVsc2UgaWYodHlwZSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmNvbmRpdGlvbiA9PSBhRGF0YS5tZXRhZGF0YS5vcmlnaW4pO1xyXG5cdFx0XHRlbHNlIGlmKHNldHVwLmNvbmRpdGlvbiBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgc2V0dXAuY29uZGl0aW9uLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0aWYoc2V0dXAuY29uZGl0aW9uW2ldID09IGFEYXRhLm1ldGFkYXRhLm9yaWdpbilcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuXHRcdFx0fVx0XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1x0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0ZG9IYW5kbGUgOiBmdW5jdGlvbihhRGF0YSl7XHRcdFx0XHRcclxuXHRcdFx0aWYoIXRva2VuKVxyXG5cdFx0XHRcdHRva2VuID0gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmZldGNoVG9rZW4oKSlcclxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGFUb2tlbil7XHJcblx0XHRcdFx0XHRcdHN0YXJ0UmVmcmVzaCgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYVRva2VuO1xyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiB0b2tlbi50aGVuKGZ1bmN0aW9uKGFUb2tlbil7XHJcblx0XHRcdFx0cmV0dXJuIGNhbGxBcHBlbmRUb2tlbihhVG9rZW4sIGFEYXRhLCBzZXR1cC5hcHBlbmRUb2tlbik7XHJcblx0XHRcdH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24oZXJyb3Ipe3Rocm93IGVycm9yfSk7XHJcblx0XHR9XHRcdFxyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2tlbkludGVyY2VwdG9yO1xyXG4iLCJpbXBvcnQgT0F1dGhJbnRlcmNlcHRvciBmcm9tIFwiLi9PQXV0aEludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIjtcclxuXHJcblxyXG5jb25zdCBEYXRhID0ge1xyXG5cdE9BdXRoSW50ZXJjZXB0b3IgOiBPQXV0aEludGVyY2VwdG9yLFxyXG5cdFRva2VuSW50ZXJjZXB0b3IgOiBUb2tlbkludGVyY2VwdG9yXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRhOyJdLCJzb3VyY2VSb290IjoiIn0=