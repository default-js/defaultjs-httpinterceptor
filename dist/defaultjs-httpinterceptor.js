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
		let match = _Constants__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].URLSPLITTER.exec(aUrl);
		let data = {
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
		};
		
		return _Manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].doIntercept(data)
		.then(function(data){
			return ORGFETCH(data.url, data.request);
		})["catch"](function(error){throw error});
	};
})(window || global || self, undefined, {});
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
				promise.then(aInterceptor.doHandle);
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
			let match = _Constants__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].URLSPLITTER.exec(aUrl);
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
		VERSION : "1.0.0-beta.1",
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
	
	const defaultRefreshToken = function(){
        new Promise(setup.fetchToken)
        .then(function(aToken){
            token = aToken;
        }); 
    };
    
    const callAppendToken = function(aToken, aData, theAppender){
    	if(theAppender instanceof Array){
			let promise = Promise.resolve(aData);
			theAppender.forEach(function(appender){
				promise.then(function(aData){
					return Promise.resolve(appender(token, aData));
				});
			});
			return promise;
		}
		else
			return Promise.resolve(theAppender(token, aData));
    };
	
	if(setup.refreshInterval > 0){
	    const refreshToken = defaultRefreshToken
	    if(typeof setup.refreshToken === "function"){
	        refreshToken = function(){
	            Promise.resolve(setup.refreshToken())
	            .then(function(aToken){
	                token = aToken;
	            }); 
	        };
	    }
	    setInterval(refreshToken, setup.refreshInterval || (60 * 1000))
	}
	
	
	return {
		doAccept : setup.doAccept || function(aData){			
			let type = typeof setup.condition; 
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
			if(typeof token !== "undefined")
				return callAppendToken(token, aData, setup.appendToken);
			else
				return Promise.resolve(setup.fetchToken())
				.then(function(aToken){
					token = aToken;
					return callAppendToken(token, aData, setup.appendToken);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9GZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvWE1MSHR0cFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmNlcHRvcnMvT0F1dGhJbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL1Rva2VuSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztR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Q3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxFO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxFO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsK0M7QUFDQSxxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNEJBQTRCO0FBQzlDO0FBQ0E7QUFDQSxJO0FBQ0EsaUM7QUFDQSxHQUFHO0FBQ0gsNkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssMkJBQTJCLFlBQVk7QUFDNUMsRztBQUNBO0FBQ0E7O0FBRWUseUVBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7O0FDakdoQztBQUFBO0FBQWtEO0FBQ0E7OztBQUdsRDtBQUNBLG9CQUFvQixpRUFBZ0I7QUFDcEMsb0JBQW9CLGlFQUFnQjtBQUNwQzs7QUFFZSw2REFBSSxFIiwiZmlsZSI6ImRlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFwiLi9zcmMvaW5kZXhcIjsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJjb25zdCBVUkxTUExJVFRFUiA9IC9eKCgoW146XFwvXSo6KT9cXC9cXC8pPyhbXjpcXC9dKikoXFw6KFswLTldKikpPykoXFwvLiopPyQvO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1VSTFNQTElUVEVSfTsiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25zdGFudHMgZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblxyXG4oZnVuY3Rpb24oR2xvYmFsKXtcclxuXHRpZih0eXBlb2YgR2xvYmFsLmZldGNoICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRyZXR1cm47XHRcclxuXHRjb25zdCBPUkdGRVRDSCA9IEdsb2JhbC5mZXRjaDtcclxuXHRHbG9iYWwuZmV0Y2ggPSBmdW5jdGlvbihhVXJsLCBhUmVxdWVzdCl7XHJcblx0XHRsZXQgbWF0Y2ggPSBDb25zdGFudHMuVVJMU1BMSVRURVIuZXhlYyhhVXJsKTtcclxuXHRcdGxldCBkYXRhID0ge1xyXG5cdFx0XHR1cmwgOiBhVXJsLFxyXG5cdFx0XHRyZXF1ZXN0IDogYVJlcXVlc3QgfHwge30sXHJcblx0XHRcdG1ldGFkYXRhIDoge1x0XHRcdFx0XHRcclxuXHRcdFx0XHRtZXRob2QgOiB0eXBlb2YgYVJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIgPyBcIkdFVFwiIDogKGFSZXF1ZXN0Lm1ldGhvZCB8fCBcIkdFVFwiKSxcclxuXHRcdFx0XHRvcmlnaW46IG1hdGNoWzFdIHx8IGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbixcclxuXHRcdFx0XHRwcm90b2NvbCA6IChmdW5jdGlvbihtYXRjaCl7XHJcblx0XHRcdFx0XHRpZih0eXBlb2YgbWF0Y2hbMl0gPT09IFwidW5kZWZpbmVkXCIgfHwgbWF0Y2hbM10gPT0gXCIvL1wiKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgfHwgXCJodHRwOlwiO1xyXG5cdFx0XHRcdFx0ZWxzZSByZXR1cm4gbWF0Y2hbM107XHRcdFx0XHJcblx0XHRcdFx0fSkuY2FsbChudWxsLCBtYXRjaCksXHJcblx0XHRcdFx0aG9zdG5hbWU6IG1hdGNoWzRdIHx8IGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLFxyXG5cdFx0XHRcdHBvcnQ6IG1hdGNoWzZdLFxyXG5cdFx0XHRcdHF1ZXJ5OiBtYXRjaFs3XSxcclxuXHRcdFx0XHRhc3luYyA6IHRydWVcdFx0XHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIE1hbmFnZXIuZG9JbnRlcmNlcHQoZGF0YSlcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRyZXR1cm4gT1JHRkVUQ0goZGF0YS51cmwsIGRhdGEucmVxdWVzdCk7XHJcblx0XHR9KVtcImNhdGNoXCJdKGZ1bmN0aW9uKGVycm9yKXt0aHJvdyBlcnJvcn0pO1xyXG5cdH07XHJcbn0pKHdpbmRvdyB8fCBnbG9iYWwgfHwgc2VsZiwgdGhpcywge30pOyIsImNvbnN0IElOVEVSQ0VQVE9SUyA9IFtdO1xyXG5jb25zdCBDQUNIRSA9IHt9O1xyXG5cclxuY29uc3QgZ2V0Q2hhaW4gPSBmdW5jdGlvbihhRGF0YSwgYVJlcXVlc3Qpe1xyXG5cdGxldCBjaGFpbiA9IENBQ0hFW2FEYXRhLm1ldGFkYXRhLm9yaWdpbl07XHJcblx0aWYodHlwZW9mIGNoYWluICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGFpbik7XHJcblx0XHJcblx0bGV0IHByb21pc2VzID0gW107XHJcblx0SU5URVJDRVBUT1JTLmZvckVhY2goZnVuY3Rpb24oYUludGVyY2VwdG9yKXtcclxuXHRcdGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGFJbnRlcmNlcHRvci5kb0FjY2VwdChhRGF0YSkpXHJcblx0XHRcdC50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdFx0XHRpZih2YWx1ZSlcclxuXHRcdFx0XHRcdHJldHVybiBhSW50ZXJjZXB0b3I7XHJcblx0XHRcdH0pO1xyXG5cdFx0cHJvbWlzZXMucHVzaChwcm9taXNlKTtcclxuXHR9KTtcclxuXHRcclxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXHJcblx0LnRoZW4oZnVuY3Rpb24oY2hhaW4pe1xyXG5cdFx0Y29uc3QgaW50ZXJjZXB0b3JzID0gY2hhaW4uZmlsdGVyKGZ1bmN0aW9uKGludGVyY2VwdG9yKXtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiBpbnRlcmNlcHRvciAhPT0gXCJ1bmRlZmluZWRcIjtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRDQUNIRVthRGF0YS5tZXRhZGF0YS5vcmlnaW5dID0gaW50ZXJjZXB0b3JzO1xyXG5cdFx0cmV0dXJuIGludGVyY2VwdG9ycztcclxuXHR9KVtcImNhdGNoXCJdKGZ1bmN0aW9uKGVycm9yKXt0aHJvdyBlcnJvcn0pO1xyXG59O1xyXG5cclxuY29uc3QgaXNPcmlnaW5JZ25vcmVkID0gZnVuY3Rpb24oZGF0YSwgb3JpZ2lucyl7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IG9yaWdpbnMubGVuZ3RoOyBpKyspXHJcblx0XHRpZihkYXRhLm1ldGFkYXRhLm9yaWdpbiA9PSBvcmlnaW5zW2ldKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5jb25zdCBNYW5hZ2VyID0ge1xyXG5cdGNvbmZpZyA6IHtcclxuXHRcdGlnbm9yZURvY3VtZW50T3JpZ2luIDogdHJ1ZSxcclxuXHRcdGlnbm9yZU9yaWdpbnMgOiBbXVx0XHRcclxuXHR9LFxyXG5cdGludGVyY2VwdG9ycyA6IFtdLFxyXG5cdGRvSW50ZXJjZXB0IDogZnVuY3Rpb24oYURhdGEpe1xyXG5cdFx0aWYoTWFuYWdlci5jb25maWcuaWdub3JlRG9jdW1lbnRPcmlnaW4gJiYgYURhdGEubWV0YWRhdGEub3JpZ2luID09IGRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRpZih0eXBlb2YgTWFuYWdlci5jb25maWcuaWdub3JlT3JpZ2lucyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpc09yaWdpbklnbm9yZWQoYURhdGEsIE1hbmFnZXIuY29uZmlnLmlnbm9yZU9yaWdpbnMpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGdldENoYWluKGFEYXRhKVxyXG5cdFx0LnRoZW4oZnVuY3Rpb24oY2hhaW4pe1xyXG5cdFx0XHRpZih0eXBlb2YgY2hhaW4gPT09IFwidW5kZWZpbmVkXCIgfHwgY2hhaW4ubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaGFuZGxlcyA9IFtdO1xyXG5cdFx0XHRsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRcdGNoYWluLmZvckVhY2goZnVuY3Rpb24oYUludGVyY2VwdG9yKXtcclxuXHRcdFx0XHRwcm9taXNlLnRoZW4oYUludGVyY2VwdG9yLmRvSGFuZGxlKTtcclxuXHRcdFx0fSk7XHRcdFx0XHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3I7fSk7XHJcblx0fSxcclxuXHRhZGRJbnRlcmNlcHRvciA6IGZ1bmN0aW9uKGFJbnRlcmNlcHRvcil7XHRcdFxyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCAhPSAxICYmIHR5cGVvZiBhSW50ZXJjZXB0b3IgIT09IFwib2JqZWN0XCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImZ1bmN0aW9uIHJlcXVpcmVkIGFuIGludGVyY2VwdG9yXCIpO1xyXG5cdFx0aWYodHlwZW9mIGFJbnRlcmNlcHRvci5kb0FjY2VwdCAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9BY2NlcHRcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdGlmKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9IYW5kbGUgIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXFxcImRvSGFuZGxlXFxcIiBmdW5jdGlvbiFcIik7XHJcblx0XHRcclxuXHRcdElOVEVSQ0VQVE9SUy5wdXNoKGFJbnRlcmNlcHRvcik7XHJcblx0XHRyZXR1cm4gTWFuYWdlcjtcclxuXHR9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IFxyXG5cclxuXHJcbiIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHJcbihmdW5jdGlvbihHbG9iYWwpe1xyXG5cdGlmKHR5cGVvZiBHbG9iYWwuWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdGNvbnN0IE9SR1hIUiA9IEdsb2JhbC5YTUxIdHRwUmVxdWVzdDtcclxuXHRjb25zdCBleGVjdXRlUmVxdWVzdCA9IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdE9SR1hIUi5wcm90b3R5cGUub3Blbi5jYWxsKHRoaXMsIGFEYXRhLnJlcXVlc3QubWV0aG9kLCBhRGF0YS51cmwsIGFEYXRhLm1ldGFkYXRhLmFzeW5jLCBhRGF0YS5tZXRhZGF0YS51c2VybmFtZSwgYURhdGEubWV0YWRhdGEucGFzc3dvcmQpO1xyXG5cdFx0aWYodHlwZW9mIGFEYXRhLnJlcXVlc3QuaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYURhdGEucmVxdWVzdC5oZWFkZXJzKVxyXG5cdFx0XHQuZm9yRWFjaCgoZnVuY3Rpb24oYUhlYWRlcil7XHJcblx0XHRcdFx0T1JHWEhSLnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyLmNhbGwodGhpcywgYUhlYWRlciwgYURhdGEucmVxdWVzdC5oZWFkZXJzW2FIZWFkZXJdKTtcclxuXHRcdFx0fSkuYmluZCh0aGlzKSk7XHJcblx0XHRPUkdYSFIucHJvdG90eXBlLnNlbmQuY2FsbCh0aGlzLCBhRGF0YS5yZXF1ZXN0LmJvZHkpO1xyXG5cdH1cclxuXHRsZXQgWEhSID0gZnVuY3Rpb24gKCl7XHJcblx0XHRjb25zdCB4aHIgPSBuZXcgT1JHWEhSKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZGF0YSA9IHVuZGVmaW5lZDtcdFx0XHJcblx0XHRcclxuXHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyID0gZnVuY3Rpb24oYU5hbWUsIGFWYWx1ZSl7XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHRcdFx0XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzW2FOYW1lXSA9IGFWYWx1ZTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHhoci5vcGVuID0gZnVuY3Rpb24oYU1ldGhvZCwgYVVybCwgaXNBc3luYywgYVVzZXJuYW1lLCBhUGFzc3dvcmQpe1x0XHRcclxuXHRcdFx0bGV0IG1hdGNoID0gQ29uc3RhbnRzLlVSTFNQTElUVEVSLmV4ZWMoYVVybCk7XHJcblx0XHRcdGRhdGEgPSB7XHJcblx0XHRcdFx0dXJsIDogYVVybCxcclxuXHRcdFx0XHRyZXF1ZXN0IDoge1xyXG5cdFx0XHRcdFx0bWV0aG9kIDogYU1ldGhvZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWV0YWRhdGEgOiB7XHJcblx0XHRcdFx0XHRtZXRob2QgOiBhTWV0aG9kLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiBtYXRjaFsxXSB8fCBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4sXHJcblx0XHRcdFx0XHRwcm90b2NvbCA6IChmdW5jdGlvbihtYXRjaCl7XHJcblx0XHRcdFx0XHRcdGlmKHR5cGVvZiBtYXRjaFsyXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBtYXRjaFszXSA9PSBcIi8vXCIpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sIHx8IFwiaHR0cDpcIjtcclxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4gbWF0Y2hbM107XHRcdFx0XHJcblx0XHRcdFx0XHR9KS5jYWxsKG51bGwsIG1hdGNoKSxcclxuXHRcdFx0XHRcdGhvc3RuYW1lOiBtYXRjaFs0XSB8fCBkb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IG1hdGNoWzZdLFxyXG5cdFx0XHRcdFx0cXVlcnk6IG1hdGNoWzddLFxyXG5cdFx0XHRcdFx0YXN5bmMgOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lIDogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQgOiBhUGFzc3dvcmRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR4aHIuc2VuZCA9IGZ1bmN0aW9uKGFCb2R5KXtcclxuXHRcdFx0aWYoZGF0YS5tZXRhZGF0YS5hc3luYyl7XHJcblx0XHRcdFx0ZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTsgXHJcblx0ICAgIFx0XHRNYW5hZ2VyLmRvSW50ZXJjZXB0KGRhdGEpXHJcblx0ICAgIFx0XHQudGhlbihleGVjdXRlUmVxdWVzdC5iaW5kKHhocikpXHJcblx0ICAgIFx0XHRbXCJjYXRjaFwiXShjb25zb2xlLmVycm9yKTtcclxuXHRcdCAgICB9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRleGVjdXRlUmVxdWVzdC5jYWxsKHhociwgZGF0YSk7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHRyZXR1cm4geGhyO1xyXG5cdH07XHJcblx0XHJcblx0R2xvYmFsLlhNTEh0dHBSZXF1ZXN0ID0gWEhSO1xyXG5cdEdsb2JhbC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUgPSBPUkdYSFIucHJvdG90eXBlO1xyXG5cdEdsb2JhbC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBYSFI7XHJcblx0XHJcblx0XHJcbn0pKHdpbmRvdyB8fCBnbG9iYWwgfHwgc2VsZiwgdGhpcywge30pOyIsImltcG9ydCBcIi4vWE1MSHR0cFJlcXVlc3RcIjtcclxuaW1wb3J0IFwiLi9GZXRjaFwiO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBJbnRlcmNlcHRvcnMgZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5cclxuKGZ1bmN0aW9uKEdsb2JhbCl7XHRcclxuXHRHbG9iYWwuZGVmYXVsdGpzID0gR2xvYmFsLmRlZmF1bHRqcyB8fCB7fTtcclxuXHRHbG9iYWwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciA9IEdsb2JhbC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yIHx8IHtcclxuXHRcdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRcdE1hbmFnZXIgOiBNYW5hZ2VyLFxyXG5cdFx0aW50ZXJjZXB0b3JzIDogSW50ZXJjZXB0b3JzXHJcblx0fTtcclxufSkod2luZG93fHwgZ2xvYmFsIHx8IHt9KTsiLCJpbXBvcnQgVG9rZW5JbnRlcmNlcHRvciBmcm9tIFwiLi9Ub2tlbkludGVyY2VwdG9yXCJcclxuXHJcbmNvbnN0IE9BdXRoSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihhU2V0dXApe1xyXG5cdGxldCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KS50aGVuKGZ1bmN0aW9uKGFSZXNwb25zZSl7XHJcblx0XHRcdHJldHVybiBhUmVzcG9uc2UuanNvbigpO1xyXG5cdFx0fSkudGhlbihmdW5jdGlvbihhUmVzcG9uc2Upe1xyXG5cdFx0XHRyZXR1cm4gYVJlc3BvbnNlW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdO1xyXG5cdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3I7fSk7XHRcdFxyXG5cdH07XHJcblx0c2V0dXAuYXBwZW5kVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFEYXRhKXtcclxuXHRcdGFEYXRhLnJlcXVlc3QuaGVhZGVycyA9IGFEYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdGFEYXRhLnJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIGFUb2tlbjtcclxuXHRcdHJldHVybiBhRGF0YTtcclxuXHR9O1xyXG5cdHJldHVybiBUb2tlbkludGVyY2VwdG9yKGFTZXR1cCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPQXV0aEludGVyY2VwdG9yO1xyXG4iLCIvKipcclxuICogYVNldHVwICA9PiBcclxuICoge1xyXG4gKiBcdGNvbmRpdGlvbiA6IFtzdHJpbmcgfCBzdHJpbmdbXSB8IGZ1bmN0aW9uKGFEYXRhfV0sXHJcbiAqIFx0ZmV0Y2hUb2tlbiA6IGZ1bmN0aW9uKCksXHJcbiAqICBhcHBlbmRUb2tlbiA6IGZ1bmN0aW9uKGFUb2tlbiwgYURhdGEpLFxyXG4gKiAgKG9wdGlvbmFsKSByZWZyZXNoSW50ZXJ2YWwsXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hUb2tlbiA6IGZ1bmN0aW9uKClcclxuICogfSBcclxuICogXHJcbiAqIGFEYXRhID0+IFxyXG4gKiB7XHJcbiAqIFx0dXJsIDogU3RyaW5nLFxyXG4gKiBcdHJlcXVlc3QgOiB7XHJcbiAqIFx0XHRtZXRob2QgOiBzdHJpbmcsXHJcbiAqIFx0XHQob3B0aW9uYWwpIGhlYWRlcnMgOiB7XHJcbiAqIFx0XHRcdFtoZWFkZXIgbmFtZSA6IHN0cmluZ10gOiBbaGVhZGVyIHZhbHVlIDogc3RyaW5nXSxcclxuICogXHRcdFx0Li4uIFxyXG4gKiBcdFx0fSxcclxuICogXHRcdChvcHRpb25hbCkgYm9keSA6IHtzdHJpbmcgfCBvYmplY3QgfCBGb3JtRGF0YSB8IC4uLl0gXHJcbiAqIFx0fSxcclxuICogXHRtZXRhZGF0YSA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdG9yaWdpbiA6IHN0cmluZyxcclxuICogXHRcdGhvc3RuYW1lIDogc3RyaW5nLFxyXG4gKiBcdFx0cHJvdG9jb2wgOiBzdHJpbmcsXHJcbiAqIFx0XHQob3B0aW9uYWwpIHBvcnQgOiBudW1iZXIsXHJcbiAqIFx0XHRxdWVyeSA6IHN0cmluZyxcclxuICogXHR9IFxyXG4gKiB9XHJcbiAqL1xyXG5jb25zdCBUb2tlbkludGVyY2VwdG9yID0gZnVuY3Rpb24oYVNldHVwKXtcclxuXHRjb25zdCBzZXR1cCA9IGFTZXR1cDsgXHJcblx0bGV0IHRva2VuID0gdW5kZWZpbmVkO1xyXG5cdFxyXG5cdGNvbnN0IGRlZmF1bHRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIG5ldyBQcm9taXNlKHNldHVwLmZldGNoVG9rZW4pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oYVRva2VuKXtcclxuICAgICAgICAgICAgdG9rZW4gPSBhVG9rZW47XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgY2FsbEFwcGVuZFRva2VuID0gZnVuY3Rpb24oYVRva2VuLCBhRGF0YSwgdGhlQXBwZW5kZXIpe1xyXG4gICAgXHRpZih0aGVBcHBlbmRlciBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0bGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHR0aGVBcHBlbmRlci5mb3JFYWNoKGZ1bmN0aW9uKGFwcGVuZGVyKXtcclxuXHRcdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24oYURhdGEpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhcHBlbmRlcih0b2tlbiwgYURhdGEpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoZUFwcGVuZGVyKHRva2VuLCBhRGF0YSkpO1xyXG4gICAgfTtcclxuXHRcclxuXHRpZihzZXR1cC5yZWZyZXNoSW50ZXJ2YWwgPiAwKXtcclxuXHQgICAgY29uc3QgcmVmcmVzaFRva2VuID0gZGVmYXVsdFJlZnJlc2hUb2tlblxyXG5cdCAgICBpZih0eXBlb2Ygc2V0dXAucmVmcmVzaFRva2VuID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdCAgICAgICAgcmVmcmVzaFRva2VuID0gZnVuY3Rpb24oKXtcclxuXHQgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoc2V0dXAucmVmcmVzaFRva2VuKCkpXHJcblx0ICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYVRva2VuKXtcclxuXHQgICAgICAgICAgICAgICAgdG9rZW4gPSBhVG9rZW47XHJcblx0ICAgICAgICAgICAgfSk7IFxyXG5cdCAgICAgICAgfTtcclxuXHQgICAgfVxyXG5cdCAgICBzZXRJbnRlcnZhbChyZWZyZXNoVG9rZW4sIHNldHVwLnJlZnJlc2hJbnRlcnZhbCB8fCAoNjAgKiAxMDAwKSlcclxuXHR9XHJcblx0XHJcblx0XHJcblx0cmV0dXJuIHtcclxuXHRcdGRvQWNjZXB0IDogc2V0dXAuZG9BY2NlcHQgfHwgZnVuY3Rpb24oYURhdGEpe1x0XHRcdFxyXG5cdFx0XHRsZXQgdHlwZSA9IHR5cGVvZiBzZXR1cC5jb25kaXRpb247IFxyXG5cdFx0XHRpZih0eXBlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShzZXR1cC5jb25kaXRpb24oYURhdGEpKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoc2V0dXAuY29uZGl0aW9uID09IGFEYXRhLm1ldGFkYXRhLm9yaWdpbik7XHJcblx0XHRcdGVsc2UgaWYoc2V0dXAuY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBzZXR1cC5jb25kaXRpb24ubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHRpZihzZXR1cC5jb25kaXRpb25baV0gPT0gYURhdGEubWV0YWRhdGEub3JpZ2luKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG5cdFx0XHR9XHRcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRkb0hhbmRsZSA6IGZ1bmN0aW9uKGFEYXRhKXtcdFx0XHRcdFxyXG5cdFx0XHRpZih0eXBlb2YgdG9rZW4gIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cmV0dXJuIGNhbGxBcHBlbmRUb2tlbih0b2tlbiwgYURhdGEsIHNldHVwLmFwcGVuZFRva2VuKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoc2V0dXAuZmV0Y2hUb2tlbigpKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGFUb2tlbil7XHJcblx0XHRcdFx0XHR0b2tlbiA9IGFUb2tlbjtcclxuXHRcdFx0XHRcdHJldHVybiBjYWxsQXBwZW5kVG9rZW4odG9rZW4sIGFEYXRhLCBzZXR1cC5hcHBlbmRUb2tlbik7XHJcblx0XHRcdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3J9KTtcclxuXHRcdH1cdFx0XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRva2VuSW50ZXJjZXB0b3I7XHJcbiIsImltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gXCIuL09BdXRoSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiO1xyXG5cclxuXHJcbmNvbnN0IERhdGEgPSB7XHJcblx0T0F1dGhJbnRlcmNlcHRvciA6IE9BdXRoSW50ZXJjZXB0b3IsXHJcblx0VG9rZW5JbnRlcmNlcHRvciA6IFRva2VuSW50ZXJjZXB0b3JcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7Il0sInNvdXJjZVJvb3QiOiIifQ==