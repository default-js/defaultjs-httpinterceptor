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

/***/ "./src/Fetch.js":
/*!**********************!*\
  !*** ./src/Fetch.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");


	
const ORGFETCH = _Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].fetch;
_Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].fetch = function(aUrl, aRequest){
	const url = new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].location.origin);
	return _Manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].doIntercept({
			url : aUrl,
			request : aRequest || {},
			metadata : {
				method : typeof aRequest === "undefined" ? "GET" : (aRequest.method || "GET"),
				origin: url.origin,
				protocol : url.protocol,
				hostname: url.hostname,
				port: url.port,
				path : url.pathname,
				hash : url.hash,
				query: url.search,
				async : true
			}
		}).then(aData =>ORGFETCH(aData.url, aData.request));
};

/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");


const INTERCEPTORS = [];
const CACHE = {};

const getChain = function(aData){
	const chain = CACHE[aData.metadata.origin];
	if(typeof chain !== "undefined")
		return chain;
	
	const promises = INTERCEPTORS.map(interceptor => 
		Promise.resolve(interceptor.doAccept(aData))
		.then(value => (value ? interceptor : undefined)));
	
	CACHE[aData.metadata.origin] = Promise.all(promises)
	.then(interceptors => 
		interceptors.filter(interceptor => typeof interceptor !== "undefined"));
	
	return CACHE[aData.metadata.origin];
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
		if(Manager.config.ignoreDocumentOrigin && aData.metadata.origin == _Utils__WEBPACK_IMPORTED_MODULE_0__[/* GLOBAL */ "a"].location.origin)
			return Promise.resolve(aData);
		if(typeof Manager.config.ignoreOrigins !== "undefined" && isOriginIgnored(aData, Manager.config.ignoreOrigins))
			return Promise.resolve(aData);
		
		return getChain(aData)
		.then( chain => {
			if(typeof chain === "undefined" || chain.length == 0)
				return Promise.resolve(aData);
			
			let promise = Promise.resolve(aData);
			chain.forEach(aInterceptor => {
				promise = promise.then(aInterceptor.doHandle);
			});
			return promise;
		});
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

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/*! exports provided: GLOBAL, default */
/*! exports used: GLOBAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLOBAL; });
const GLOBAL = (() => {
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	return {};
})();


const Utils = {
	GLOBAL : GLOBAL
};

/* unused harmony default export */ var _unused_webpack_default_export = (Utils); 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/XMLHttpRequest.js":
/*!*******************************!*\
  !*** ./src/XMLHttpRequest.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");



if(typeof _Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].XMLHttpRequest !== "undefined"){
	const ORGXHR = _Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].XMLHttpRequest;
	const executeRequest = function(aData){
		ORGXHR.prototype.open.call(this, aData.request.method, aData.url, aData.metadata.async, aData.metadata.username, aData.metadata.password);
		if(typeof aData.request.headers !== "undefined")
			Object.getOwnPropertyNames(aData.request.headers)
			.forEach(aHeader =>{
				ORGXHR.prototype.setRequestHeader.call(this, aHeader, aData.request.headers[aHeader]);
			});
		ORGXHR.prototype.send.call(this, aData.request.body);
	}
	const XHR = function (){
		const xhr = new ORGXHR(arguments);
		let data = undefined;
		
		xhr.setRequestHeader = function(aName, aValue){
			data.request.headers = data.request.headers || {};
			data.request.headers[aName] = aValue;
		};
		
		xhr.open = function(aMethod, aUrl, isAsync, aUsername, aPassword){
			const url = new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].location.origin);
			data = {
				url : aUrl,
				request : {
					method : aMethod
				},
				metadata : {
					method : aMethod,
					origin: url.origin,
					protocol : url.protocol,
					hostname: url.hostname,
					port: url.port,
					path : url.pathname,
					query: url.search,
					hash : url.hash,
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
	
	_Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].XMLHttpRequest = XHR;
	_Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].XMLHttpRequest.prototype = ORGXHR.prototype;
	_Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].XMLHttpRequest.prototype.constructor = XHR;
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");
/* harmony import */ var _XMLHttpRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XMLHttpRequest */ "./src/XMLHttpRequest.js");
/* harmony import */ var _Fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fetch */ "./src/Fetch.js");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors/index.js");






_Utils__WEBPACK_IMPORTED_MODULE_0__[/* GLOBAL */ "a"].defaultjs = _Utils__WEBPACK_IMPORTED_MODULE_0__[/* GLOBAL */ "a"].defaultjs || {};
_Utils__WEBPACK_IMPORTED_MODULE_0__[/* GLOBAL */ "a"].defaultjs.httpinterceptor = _Utils__WEBPACK_IMPORTED_MODULE_0__[/* GLOBAL */ "a"].defaultjs.httpinterceptor || {
	VERSION : "1.0.0-beta.5",
	Manager : _Manager__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],
	interceptors : _interceptors__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
};

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
	const setup = aSetup;
	setup.fetchToken = function(){
		return fetch(setup.login.url, {
			method: (setup.login.method || "get")
		}).then(res => res.json())
		.then(res => res[setup.login.response.valueSelector]);		
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
			theAppender.forEach( appender => {
				promise = promise.then(aData => appender(aToken, aData));
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
					.then(aToken => {
						startRefresh();
						return aToken;
					});
				
			return token.then(aToken => callAppendToken(aToken, aData, setup.appendToken));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9YTUxIdHRwUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9PQXV0aEludGVyY2VwdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmNlcHRvcnMvVG9rZW5JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJI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QTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw0QkFBNEI7QUFDOUM7QUFDQTtBQUNBLEk7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0EsRztBQUNBO0FBQ0E7O0FBRWUseUVBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7O0FDdkZoQztBQUFBO0FBQWtEO0FBQ0E7OztBQUdsRDtBQUNBLG9CQUFvQixpRUFBZ0I7QUFDcEMsb0JBQW9CLGlFQUFnQjtBQUNwQzs7QUFFZSw2REFBSSxFIiwiZmlsZSI6ImRlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFwiLi9zcmMvaW5kZXhcIjsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cdFxyXG5jb25zdCBPUkdGRVRDSCA9IEdMT0JBTC5mZXRjaDtcclxuR0xPQkFMLmZldGNoID0gZnVuY3Rpb24oYVVybCwgYVJlcXVlc3Qpe1xyXG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uLm9yaWdpbik7XHJcblx0cmV0dXJuIE1hbmFnZXIuZG9JbnRlcmNlcHQoe1xyXG5cdFx0XHR1cmwgOiBhVXJsLFxyXG5cdFx0XHRyZXF1ZXN0IDogYVJlcXVlc3QgfHwge30sXHJcblx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdG1ldGhvZCA6IHR5cGVvZiBhUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiR0VUXCIgOiAoYVJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCIpLFxyXG5cdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRwcm90b2NvbCA6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG5cdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdHBhdGggOiB1cmwucGF0aG5hbWUsXHJcblx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdGFzeW5jIDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KS50aGVuKGFEYXRhID0+T1JHRkVUQ0goYURhdGEudXJsLCBhRGF0YS5yZXF1ZXN0KSk7XHJcbn07IiwiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCBJTlRFUkNFUFRPUlMgPSBbXTtcclxuY29uc3QgQ0FDSEUgPSB7fTtcclxuXHJcbmNvbnN0IGdldENoYWluID0gZnVuY3Rpb24oYURhdGEpe1xyXG5cdGNvbnN0IGNoYWluID0gQ0FDSEVbYURhdGEubWV0YWRhdGEub3JpZ2luXTtcclxuXHRpZih0eXBlb2YgY2hhaW4gIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gY2hhaW47XHJcblx0XHJcblx0Y29uc3QgcHJvbWlzZXMgPSBJTlRFUkNFUFRPUlMubWFwKGludGVyY2VwdG9yID0+IFxyXG5cdFx0UHJvbWlzZS5yZXNvbHZlKGludGVyY2VwdG9yLmRvQWNjZXB0KGFEYXRhKSlcclxuXHRcdC50aGVuKHZhbHVlID0+ICh2YWx1ZSA/IGludGVyY2VwdG9yIDogdW5kZWZpbmVkKSkpO1xyXG5cdFxyXG5cdENBQ0hFW2FEYXRhLm1ldGFkYXRhLm9yaWdpbl0gPSBQcm9taXNlLmFsbChwcm9taXNlcylcclxuXHQudGhlbihpbnRlcmNlcHRvcnMgPT4gXHJcblx0XHRpbnRlcmNlcHRvcnMuZmlsdGVyKGludGVyY2VwdG9yID0+IHR5cGVvZiBpbnRlcmNlcHRvciAhPT0gXCJ1bmRlZmluZWRcIikpO1xyXG5cdFxyXG5cdHJldHVybiBDQUNIRVthRGF0YS5tZXRhZGF0YS5vcmlnaW5dO1xyXG59O1xyXG5cclxuY29uc3QgaXNPcmlnaW5JZ25vcmVkID0gZnVuY3Rpb24oZGF0YSwgb3JpZ2lucyl7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IG9yaWdpbnMubGVuZ3RoOyBpKyspXHJcblx0XHRpZihkYXRhLm1ldGFkYXRhLm9yaWdpbiA9PSBvcmlnaW5zW2ldKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5jb25zdCBNYW5hZ2VyID0ge1xyXG5cdGNvbmZpZyA6IHtcclxuXHRcdGlnbm9yZURvY3VtZW50T3JpZ2luIDogdHJ1ZSxcclxuXHRcdGlnbm9yZU9yaWdpbnMgOiBbXVxyXG5cdH0sXHJcblx0aW50ZXJjZXB0b3JzIDogW10sXHJcblx0ZG9JbnRlcmNlcHQgOiBmdW5jdGlvbihhRGF0YSl7XHJcblx0XHRpZihNYW5hZ2VyLmNvbmZpZy5pZ25vcmVEb2N1bWVudE9yaWdpbiAmJiBhRGF0YS5tZXRhZGF0YS5vcmlnaW4gPT0gR0xPQkFMLmxvY2F0aW9uLm9yaWdpbilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRpZih0eXBlb2YgTWFuYWdlci5jb25maWcuaWdub3JlT3JpZ2lucyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpc09yaWdpbklnbm9yZWQoYURhdGEsIE1hbmFnZXIuY29uZmlnLmlnbm9yZU9yaWdpbnMpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGdldENoYWluKGFEYXRhKVxyXG5cdFx0LnRoZW4oIGNoYWluID0+IHtcclxuXHRcdFx0aWYodHlwZW9mIGNoYWluID09PSBcInVuZGVmaW5lZFwiIHx8IGNoYWluLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHRjaGFpbi5mb3JFYWNoKGFJbnRlcmNlcHRvciA9PiB7XHJcblx0XHRcdFx0cHJvbWlzZSA9IHByb21pc2UudGhlbihhSW50ZXJjZXB0b3IuZG9IYW5kbGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGFkZEludGVyY2VwdG9yIDogZnVuY3Rpb24oYUludGVyY2VwdG9yKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggIT0gMSAmJiB0eXBlb2YgYUludGVyY2VwdG9yICE9PSBcIm9iamVjdFwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJmdW5jdGlvbiByZXF1aXJlZCBhbiBpbnRlcmNlcHRvclwiKTtcclxuXHRcdGlmKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9BY2NlcHQgIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXFxcImRvQWNjZXB0XFxcIiBmdW5jdGlvbiFcIik7XHJcblx0XHRpZih0eXBlb2YgYUludGVyY2VwdG9yLmRvSGFuZGxlICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0hhbmRsZVxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cdFx0XHJcblx0XHRJTlRFUkNFUFRPUlMucHVzaChhSW50ZXJjZXB0b3IpO1xyXG5cdFx0cmV0dXJuIE1hbmFnZXI7XHJcblx0fVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyOyBcclxuXHJcblxyXG4iLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xuXHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBzZWxmOyB9XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gd2luZG93OyB9XG5cdGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZ2xvYmFsOyB9XG5cdHJldHVybiB7fTtcbn0pKCk7XG5cbmV4cG9ydCB7R0xPQkFMfTtcbmNvbnN0IFV0aWxzID0ge1xuXHRHTE9CQUwgOiBHTE9CQUxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyAiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuaWYodHlwZW9mIEdMT0JBTC5YTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIil7XHJcblx0Y29uc3QgT1JHWEhSID0gR0xPQkFMLlhNTEh0dHBSZXF1ZXN0O1xyXG5cdGNvbnN0IGV4ZWN1dGVSZXF1ZXN0ID0gZnVuY3Rpb24oYURhdGEpe1xyXG5cdFx0T1JHWEhSLnByb3RvdHlwZS5vcGVuLmNhbGwodGhpcywgYURhdGEucmVxdWVzdC5tZXRob2QsIGFEYXRhLnVybCwgYURhdGEubWV0YWRhdGEuYXN5bmMsIGFEYXRhLm1ldGFkYXRhLnVzZXJuYW1lLCBhRGF0YS5tZXRhZGF0YS5wYXNzd29yZCk7XHJcblx0XHRpZih0eXBlb2YgYURhdGEucmVxdWVzdC5oZWFkZXJzICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhRGF0YS5yZXF1ZXN0LmhlYWRlcnMpXHJcblx0XHRcdC5mb3JFYWNoKGFIZWFkZXIgPT57XHJcblx0XHRcdFx0T1JHWEhSLnByb3RvdHlwZS5zZXRSZXF1ZXN0SGVhZGVyLmNhbGwodGhpcywgYUhlYWRlciwgYURhdGEucmVxdWVzdC5oZWFkZXJzW2FIZWFkZXJdKTtcclxuXHRcdFx0fSk7XHJcblx0XHRPUkdYSFIucHJvdG90eXBlLnNlbmQuY2FsbCh0aGlzLCBhRGF0YS5yZXF1ZXN0LmJvZHkpO1xyXG5cdH1cclxuXHRjb25zdCBYSFIgPSBmdW5jdGlvbiAoKXtcclxuXHRcdGNvbnN0IHhociA9IG5ldyBPUkdYSFIoYXJndW1lbnRzKTtcclxuXHRcdGxldCBkYXRhID0gdW5kZWZpbmVkO1xyXG5cdFx0XHJcblx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uKGFOYW1lLCBhVmFsdWUpe1xyXG5cdFx0XHRkYXRhLnJlcXVlc3QuaGVhZGVycyA9IGRhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdFx0XHRkYXRhLnJlcXVlc3QuaGVhZGVyc1thTmFtZV0gPSBhVmFsdWU7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR4aHIub3BlbiA9IGZ1bmN0aW9uKGFNZXRob2QsIGFVcmwsIGlzQXN5bmMsIGFVc2VybmFtZSwgYVBhc3N3b3JkKXtcclxuXHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTChhVXJsLCBHTE9CQUwubG9jYXRpb24ub3JpZ2luKTtcclxuXHRcdFx0ZGF0YSA9IHtcclxuXHRcdFx0XHR1cmwgOiBhVXJsLFxyXG5cdFx0XHRcdHJlcXVlc3QgOiB7XHJcblx0XHRcdFx0XHRtZXRob2QgOiBhTWV0aG9kXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRhZGF0YSA6IHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGFNZXRob2QsXHJcblx0XHRcdFx0XHRvcmlnaW46IHVybC5vcmlnaW4sXHJcblx0XHRcdFx0XHRwcm90b2NvbCA6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRcdGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcblx0XHRcdFx0XHRwb3J0OiB1cmwucG9ydCxcclxuXHRcdFx0XHRcdHBhdGggOiB1cmwucGF0aG5hbWUsXHJcblx0XHRcdFx0XHRxdWVyeTogdXJsLnNlYXJjaCxcclxuXHRcdFx0XHRcdGhhc2ggOiB1cmwuaGFzaCxcclxuXHRcdFx0XHRcdGFzeW5jIDogdHlwZW9mIGlzQXN5bmMgPT09IFwiYm9vbGVhblwiID8gaXNBc3luYyA6IHRydWUsXHJcblx0XHRcdFx0XHR1c2VybmFtZSA6IGFVc2VybmFtZSxcclxuXHRcdFx0XHRcdHBhc3N3b3JkIDogYVBhc3N3b3JkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0eGhyLnNlbmQgPSBmdW5jdGlvbihhQm9keSl7XHJcblx0XHRcdGlmKGRhdGEubWV0YWRhdGEuYXN5bmMpe1xyXG5cdFx0XHRcdGRhdGEucmVxdWVzdC5ib2R5ID0gYUJvZHk7IFxyXG5cdCAgICBcdFx0TWFuYWdlci5kb0ludGVyY2VwdChkYXRhKVxyXG5cdCAgICBcdFx0LnRoZW4oZXhlY3V0ZVJlcXVlc3QuYmluZCh4aHIpKVxyXG5cdCAgICBcdFx0W1wiY2F0Y2hcIl0oY29uc29sZS5lcnJvcik7XHJcblx0XHQgICAgfVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0ZXhlY3V0ZVJlcXVlc3QuY2FsbCh4aHIsIGRhdGEpO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHhocjtcclxuXHR9O1xyXG5cdFxyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdCA9IFhIUjtcclxuXHRHTE9CQUwuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlID0gT1JHWEhSLnByb3RvdHlwZTtcclxuXHRHTE9CQUwuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gWEhSO1xyXG59IiwiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBcIi4vWE1MSHR0cFJlcXVlc3RcIjtcclxuaW1wb3J0IFwiLi9GZXRjaFwiO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBJbnRlcmNlcHRvcnMgZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcclxuR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgPSBHTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdE1hbmFnZXIgOiBNYW5hZ2VyLFxyXG5cdGludGVyY2VwdG9ycyA6IEludGVyY2VwdG9yc1xyXG59OyIsImltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIlxyXG5cclxuY29uc3QgT0F1dGhJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGFTZXR1cCl7XHJcblx0Y29uc3Qgc2V0dXAgPSBhU2V0dXA7XHJcblx0c2V0dXAuZmV0Y2hUb2tlbiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gZmV0Y2goc2V0dXAubG9naW4udXJsLCB7XHJcblx0XHRcdG1ldGhvZDogKHNldHVwLmxvZ2luLm1ldGhvZCB8fCBcImdldFwiKVxyXG5cdFx0fSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuXHRcdC50aGVuKHJlcyA9PiByZXNbc2V0dXAubG9naW4ucmVzcG9uc2UudmFsdWVTZWxlY3Rvcl0pO1x0XHRcclxuXHR9O1xyXG5cdHNldHVwLmFwcGVuZFRva2VuID0gZnVuY3Rpb24oYVRva2VuLCBhRGF0YSl7XHJcblx0XHRhRGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSBhRGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHJcblx0XHRhRGF0YS5yZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gXCJCZWFyZXIgXCIgKyBhVG9rZW47XHJcblx0XHRyZXR1cm4gYURhdGE7XHJcblx0fTtcclxuXHRyZXR1cm4gVG9rZW5JbnRlcmNlcHRvcihhU2V0dXApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT0F1dGhJbnRlcmNlcHRvcjtcclxuIiwiLyoqXHJcbiAqIGFTZXR1cCAgPT4gXHJcbiAqIHtcclxuICogXHRjb25kaXRpb24gOiBbc3RyaW5nIHwgc3RyaW5nW10gfCBmdW5jdGlvbihhRGF0YX1dLFxyXG4gKiBcdGZldGNoVG9rZW4gOiBmdW5jdGlvbigpLFxyXG4gKiAgYXBwZW5kVG9rZW4gOiBmdW5jdGlvbihhVG9rZW4sIGFEYXRhKSxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaEludGVydmFsLFxyXG4gKiAgKG9wdGlvbmFsKSByZWZyZXNoVG9rZW4gOiBmdW5jdGlvbigpXHJcbiAqIH0gXHJcbiAqIFxyXG4gKiBhRGF0YSA9PiBcclxuICoge1xyXG4gKiBcdHVybCA6IFN0cmluZyxcclxuICogXHRyZXF1ZXN0IDoge1xyXG4gKiBcdFx0bWV0aG9kIDogc3RyaW5nLFxyXG4gKiBcdFx0KG9wdGlvbmFsKSBoZWFkZXJzIDoge1xyXG4gKiBcdFx0XHRbaGVhZGVyIG5hbWUgOiBzdHJpbmddIDogW2hlYWRlciB2YWx1ZSA6IHN0cmluZ10sXHJcbiAqIFx0XHRcdC4uLiBcclxuICogXHRcdH0sXHJcbiAqIFx0XHQob3B0aW9uYWwpIGJvZHkgOiB7c3RyaW5nIHwgb2JqZWN0IHwgRm9ybURhdGEgfCAuLi5dIFxyXG4gKiBcdH0sXHJcbiAqIFx0bWV0YWRhdGEgOiB7XHJcbiAqIFx0XHRtZXRob2QgOiBzdHJpbmcsXHJcbiAqIFx0XHRvcmlnaW4gOiBzdHJpbmcsXHJcbiAqIFx0XHRob3N0bmFtZSA6IHN0cmluZyxcclxuICogXHRcdHByb3RvY29sIDogc3RyaW5nLFxyXG4gKiBcdFx0KG9wdGlvbmFsKSBwb3J0IDogbnVtYmVyLFxyXG4gKiBcdFx0cXVlcnkgOiBzdHJpbmcsXHJcbiAqIFx0fSBcclxuICogfVxyXG4gKi9cclxuY29uc3QgVG9rZW5JbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGFTZXR1cCl7XHJcblx0Y29uc3Qgc2V0dXAgPSBhU2V0dXA7XHJcblx0bGV0IHRva2VuID0gdW5kZWZpbmVkO1xyXG4gICAgXHJcbiAgICBjb25zdCBjYWxsQXBwZW5kVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFEYXRhLCB0aGVBcHBlbmRlcil7XHJcbiAgICBcdGlmKHRoZUFwcGVuZGVyIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRcdHRoZUFwcGVuZGVyLmZvckVhY2goIGFwcGVuZGVyID0+IHtcclxuXHRcdFx0XHRwcm9taXNlID0gcHJvbWlzZS50aGVuKGFEYXRhID0+IGFwcGVuZGVyKGFUb2tlbiwgYURhdGEpKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoZUFwcGVuZGVyKGFUb2tlbiwgYURhdGEpKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IHN0YXJ0UmVmcmVzaCA9IGZ1bmN0aW9uKCl7XHRcclxuXHRcdGlmKHNldHVwLnJlZnJlc2hJbnRlcnZhbCA+IDApe1xyXG5cdFx0ICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHR5cGVvZiBzZXR1cC5yZWZyZXNoVG9rZW4gPT09IFwiZnVuY3Rpb25cIiA/IGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgICAgICAgICB0b2tlbiA9IFByb21pc2UucmVzb2x2ZShzZXR1cC5yZWZyZXNoVG9rZW4oKSlcclxuXHRcdCAgICBcdH0gOiBmdW5jdGlvbigpe1xyXG5cdFx0ICAgIFx0XHR0b2tlbiA9IFByb21pc2UucmVzb2x2ZShzZXR1cC5mZXRjaFRva2VuKCkpO1xyXG5cdFx0ICAgIFx0fTtcclxuXHRcdCAgICBcclxuXHRcdCAgICBzZXRJbnRlcnZhbChyZWZyZXNoVG9rZW4sIHNldHVwLnJlZnJlc2hJbnRlcnZhbCB8fCAoNjAgKiAxMDAwKSlcclxuXHRcdH1cclxuICAgIH07XHJcblx0XHJcblx0XHJcblx0cmV0dXJuIHtcclxuXHRcdGRvQWNjZXB0IDogc2V0dXAuZG9BY2NlcHQgfHwgZnVuY3Rpb24oYURhdGEpe1xyXG5cdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHNldHVwLmNvbmRpdGlvbjsgXHJcblx0XHRcdGlmKHR5cGUgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmNvbmRpdGlvbihhRGF0YSkpO1xyXG5cdFx0XHRlbHNlIGlmKHR5cGUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShzZXR1cC5jb25kaXRpb24gPT0gYURhdGEubWV0YWRhdGEub3JpZ2luKTtcclxuXHRcdFx0ZWxzZSBpZihzZXR1cC5jb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSl7XHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHNldHVwLmNvbmRpdGlvbi5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdGlmKHNldHVwLmNvbmRpdGlvbltpXSA9PSBhRGF0YS5tZXRhZGF0YS5vcmlnaW4pXHJcblx0XHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcblx0XHRcdH1cdFxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcclxuXHRcdH0sXHJcblx0XHRkb0hhbmRsZSA6IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdFx0aWYoIXRva2VuKVxyXG5cdFx0XHRcdHRva2VuID0gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmZldGNoVG9rZW4oKSlcclxuXHRcdFx0XHRcdC50aGVuKGFUb2tlbiA9PiB7XHJcblx0XHRcdFx0XHRcdHN0YXJ0UmVmcmVzaCgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYVRva2VuO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiB0b2tlbi50aGVuKGFUb2tlbiA9PiBjYWxsQXBwZW5kVG9rZW4oYVRva2VuLCBhRGF0YSwgc2V0dXAuYXBwZW5kVG9rZW4pKTtcclxuXHRcdH1cdFx0XHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRva2VuSW50ZXJjZXB0b3I7XHJcbiIsImltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gXCIuL09BdXRoSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiO1xyXG5cclxuXHJcbmNvbnN0IERhdGEgPSB7XHJcblx0T0F1dGhJbnRlcmNlcHRvciA6IE9BdXRoSW50ZXJjZXB0b3IsXHJcblx0VG9rZW5JbnRlcmNlcHRvciA6IFRva2VuSW50ZXJjZXB0b3JcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7Il0sInNvdXJjZVJvb3QiOiIifQ==