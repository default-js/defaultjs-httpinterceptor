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
let CACHE = {};

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
	},
	reset: ()=>{
		CACHE = {};
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
	VERSION : "1.1.0",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9YTUxIdHRwUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9PQXV0aEludGVyY2VwdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmNlcHRvcnMvVG9rZW5JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJI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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsdUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDRCQUE0QjtBQUM5QztBQUNBO0FBQ0EsSTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxHO0FBQ0E7QUFDQTs7QUFFZSx5RUFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUN2RmhDO0FBQUE7QUFBa0Q7QUFDQTs7O0FBR2xEO0FBQ0Esb0JBQW9CLGlFQUFnQjtBQUNwQyxvQkFBb0IsaUVBQWdCO0FBQ3BDOztBQUVlLDZEQUFJLEUiLCJmaWxlIjoiZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJpbXBvcnQgXCIuL3NyYy9pbmRleFwiOyIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcblx0XHJcbmNvbnN0IE9SR0ZFVENIID0gR0xPQkFMLmZldGNoO1xyXG5HTE9CQUwuZmV0Y2ggPSBmdW5jdGlvbihhVXJsLCBhUmVxdWVzdCl7XHJcblx0Y29uc3QgdXJsID0gbmV3IFVSTChhVXJsLCBHTE9CQUwubG9jYXRpb24ub3JpZ2luKTtcclxuXHRyZXR1cm4gTWFuYWdlci5kb0ludGVyY2VwdCh7XHJcblx0XHRcdHVybCA6IGFVcmwsXHJcblx0XHRcdHJlcXVlc3QgOiBhUmVxdWVzdCB8fCB7fSxcclxuXHRcdFx0bWV0YWRhdGEgOiB7XHJcblx0XHRcdFx0bWV0aG9kIDogdHlwZW9mIGFSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJHRVRcIiA6IChhUmVxdWVzdC5tZXRob2QgfHwgXCJHRVRcIiksXHJcblx0XHRcdFx0b3JpZ2luOiB1cmwub3JpZ2luLFxyXG5cdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcblx0XHRcdFx0cG9ydDogdXJsLnBvcnQsXHJcblx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRoYXNoIDogdXJsLmhhc2gsXHJcblx0XHRcdFx0cXVlcnk6IHVybC5zZWFyY2gsXHJcblx0XHRcdFx0YXN5bmMgOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0pLnRoZW4oYURhdGEgPT5PUkdGRVRDSChhRGF0YS51cmwsIGFEYXRhLnJlcXVlc3QpKTtcclxufTsiLCJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmNvbnN0IElOVEVSQ0VQVE9SUyA9IFtdO1xyXG5sZXQgQ0FDSEUgPSB7fTtcclxuXHJcbmNvbnN0IGdldENoYWluID0gZnVuY3Rpb24oYURhdGEpe1xyXG5cdGNvbnN0IGNoYWluID0gQ0FDSEVbYURhdGEubWV0YWRhdGEub3JpZ2luXTtcclxuXHRpZih0eXBlb2YgY2hhaW4gIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRyZXR1cm4gY2hhaW47XHJcblx0XHJcblx0Y29uc3QgcHJvbWlzZXMgPSBJTlRFUkNFUFRPUlMubWFwKGludGVyY2VwdG9yID0+IFxyXG5cdFx0UHJvbWlzZS5yZXNvbHZlKGludGVyY2VwdG9yLmRvQWNjZXB0KGFEYXRhKSlcclxuXHRcdC50aGVuKHZhbHVlID0+ICh2YWx1ZSA/IGludGVyY2VwdG9yIDogdW5kZWZpbmVkKSkpO1xyXG5cdFxyXG5cdENBQ0hFW2FEYXRhLm1ldGFkYXRhLm9yaWdpbl0gPSBQcm9taXNlLmFsbChwcm9taXNlcylcclxuXHQudGhlbihpbnRlcmNlcHRvcnMgPT4gXHJcblx0XHRpbnRlcmNlcHRvcnMuZmlsdGVyKGludGVyY2VwdG9yID0+IHR5cGVvZiBpbnRlcmNlcHRvciAhPT0gXCJ1bmRlZmluZWRcIikpO1xyXG5cdFxyXG5cdHJldHVybiBDQUNIRVthRGF0YS5tZXRhZGF0YS5vcmlnaW5dO1xyXG59O1xyXG5cclxuY29uc3QgaXNPcmlnaW5JZ25vcmVkID0gZnVuY3Rpb24oZGF0YSwgb3JpZ2lucyl7XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IG9yaWdpbnMubGVuZ3RoOyBpKyspXHJcblx0XHRpZihkYXRhLm1ldGFkYXRhLm9yaWdpbiA9PSBvcmlnaW5zW2ldKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5jb25zdCBNYW5hZ2VyID0ge1xyXG5cdGNvbmZpZyA6IHtcclxuXHRcdGlnbm9yZURvY3VtZW50T3JpZ2luIDogdHJ1ZSxcclxuXHRcdGlnbm9yZU9yaWdpbnMgOiBbXVxyXG5cdH0sXHJcblx0aW50ZXJjZXB0b3JzIDogW10sXHJcblx0ZG9JbnRlcmNlcHQgOiBmdW5jdGlvbihhRGF0YSl7XHJcblx0XHRpZihNYW5hZ2VyLmNvbmZpZy5pZ25vcmVEb2N1bWVudE9yaWdpbiAmJiBhRGF0YS5tZXRhZGF0YS5vcmlnaW4gPT0gR0xPQkFMLmxvY2F0aW9uLm9yaWdpbilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRpZih0eXBlb2YgTWFuYWdlci5jb25maWcuaWdub3JlT3JpZ2lucyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpc09yaWdpbklnbm9yZWQoYURhdGEsIE1hbmFnZXIuY29uZmlnLmlnbm9yZU9yaWdpbnMpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGdldENoYWluKGFEYXRhKVxyXG5cdFx0LnRoZW4oIGNoYWluID0+IHtcclxuXHRcdFx0aWYodHlwZW9mIGNoYWluID09PSBcInVuZGVmaW5lZFwiIHx8IGNoYWluLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHRjaGFpbi5mb3JFYWNoKGFJbnRlcmNlcHRvciA9PiB7XHJcblx0XHRcdFx0cHJvbWlzZSA9IHByb21pc2UudGhlbihhSW50ZXJjZXB0b3IuZG9IYW5kbGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGFkZEludGVyY2VwdG9yIDogZnVuY3Rpb24oYUludGVyY2VwdG9yKXtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggIT0gMSAmJiB0eXBlb2YgYUludGVyY2VwdG9yICE9PSBcIm9iamVjdFwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJmdW5jdGlvbiByZXF1aXJlZCBhbiBpbnRlcmNlcHRvclwiKTtcclxuXHRcdGlmKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9BY2NlcHQgIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXFxcImRvQWNjZXB0XFxcIiBmdW5jdGlvbiFcIik7XHJcblx0XHRpZih0eXBlb2YgYUludGVyY2VwdG9yLmRvSGFuZGxlICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0hhbmRsZVxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cdFx0XHJcblx0XHRJTlRFUkNFUFRPUlMucHVzaChhSW50ZXJjZXB0b3IpO1x0XHRcclxuXHRcdHJldHVybiBNYW5hZ2VyO1xyXG5cdH0sXHJcblx0cmVzZXQ6ICgpPT57XHJcblx0XHRDQUNIRSA9IHt9O1xyXG5cdH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjsgXHJcblxyXG5cclxuIiwiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcblx0aWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfVxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfVxuXHRyZXR1cm4ge307XG59KSgpO1xuXG5leHBvcnQge0dMT0JBTH07XG5jb25zdCBVdGlscyA9IHtcblx0R0xPQkFMIDogR0xPQkFMXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsgIiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmlmKHR5cGVvZiBHTE9CQUwuWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdGNvbnN0IE9SR1hIUiA9IEdMT0JBTC5YTUxIdHRwUmVxdWVzdDtcclxuXHRjb25zdCBleGVjdXRlUmVxdWVzdCA9IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdE9SR1hIUi5wcm90b3R5cGUub3Blbi5jYWxsKHRoaXMsIGFEYXRhLnJlcXVlc3QubWV0aG9kLCBhRGF0YS51cmwsIGFEYXRhLm1ldGFkYXRhLmFzeW5jLCBhRGF0YS5tZXRhZGF0YS51c2VybmFtZSwgYURhdGEubWV0YWRhdGEucGFzc3dvcmQpO1xyXG5cdFx0aWYodHlwZW9mIGFEYXRhLnJlcXVlc3QuaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYURhdGEucmVxdWVzdC5oZWFkZXJzKVxyXG5cdFx0XHQuZm9yRWFjaChhSGVhZGVyID0+e1xyXG5cdFx0XHRcdE9SR1hIUi5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlci5jYWxsKHRoaXMsIGFIZWFkZXIsIGFEYXRhLnJlcXVlc3QuaGVhZGVyc1thSGVhZGVyXSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0T1JHWEhSLnByb3RvdHlwZS5zZW5kLmNhbGwodGhpcywgYURhdGEucmVxdWVzdC5ib2R5KTtcclxuXHR9XHJcblx0Y29uc3QgWEhSID0gZnVuY3Rpb24gKCl7XHJcblx0XHRjb25zdCB4aHIgPSBuZXcgT1JHWEhSKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZGF0YSA9IHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbihhTmFtZSwgYVZhbHVlKXtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSBkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnNbYU5hbWVdID0gYVZhbHVlO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0eGhyLm9wZW4gPSBmdW5jdGlvbihhTWV0aG9kLCBhVXJsLCBpc0FzeW5jLCBhVXNlcm5hbWUsIGFQYXNzd29yZCl7XHJcblx0XHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uLm9yaWdpbik7XHJcblx0XHRcdGRhdGEgPSB7XHJcblx0XHRcdFx0dXJsIDogYVVybCxcclxuXHRcdFx0XHRyZXF1ZXN0IDoge1xyXG5cdFx0XHRcdFx0bWV0aG9kIDogYU1ldGhvZFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWV0YWRhdGEgOiB7XHJcblx0XHRcdFx0XHRtZXRob2QgOiBhTWV0aG9kLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiB1cmwub3JpZ2luLFxyXG5cdFx0XHRcdFx0cHJvdG9jb2wgOiB1cmwucHJvdG9jb2wsXHJcblx0XHRcdFx0XHRob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG5cdFx0XHRcdFx0cG9ydDogdXJsLnBvcnQsXHJcblx0XHRcdFx0XHRwYXRoIDogdXJsLnBhdGhuYW1lLFxyXG5cdFx0XHRcdFx0cXVlcnk6IHVybC5zZWFyY2gsXHJcblx0XHRcdFx0XHRoYXNoIDogdXJsLmhhc2gsXHJcblx0XHRcdFx0XHRhc3luYyA6IHR5cGVvZiBpc0FzeW5jID09PSBcImJvb2xlYW5cIiA/IGlzQXN5bmMgOiB0cnVlLFxyXG5cdFx0XHRcdFx0dXNlcm5hbWUgOiBhVXNlcm5hbWUsXHJcblx0XHRcdFx0XHRwYXNzd29yZCA6IGFQYXNzd29yZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHhoci5zZW5kID0gZnVuY3Rpb24oYUJvZHkpe1xyXG5cdFx0XHRpZihkYXRhLm1ldGFkYXRhLmFzeW5jKXtcclxuXHRcdFx0XHRkYXRhLnJlcXVlc3QuYm9keSA9IGFCb2R5OyBcclxuXHQgICAgXHRcdE1hbmFnZXIuZG9JbnRlcmNlcHQoZGF0YSlcclxuXHQgICAgXHRcdC50aGVuKGV4ZWN1dGVSZXF1ZXN0LmJpbmQoeGhyKSlcclxuXHQgICAgXHRcdFtcImNhdGNoXCJdKGNvbnNvbGUuZXJyb3IpO1xyXG5cdFx0ICAgIH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGV4ZWN1dGVSZXF1ZXN0LmNhbGwoeGhyLCBkYXRhKTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHJldHVybiB4aHI7XHJcblx0fTtcclxuXHRcclxuXHRHTE9CQUwuWE1MSHR0cFJlcXVlc3QgPSBYSFI7XHJcblx0R0xPQkFMLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSA9IE9SR1hIUi5wcm90b3R5cGU7XHJcblx0R0xPQkFMLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFhIUjtcclxufSIsImltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgXCIuL1hNTEh0dHBSZXF1ZXN0XCI7XHJcbmltcG9ydCBcIi4vRmV0Y2hcIjtcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQgSW50ZXJjZXB0b3JzIGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xyXG5cclxuR0xPQkFMLmRlZmF1bHRqcyA9IEdMT0JBTC5kZWZhdWx0anMgfHwge307XHJcbkdMT0JBTC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yID0gR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRNYW5hZ2VyIDogTWFuYWdlcixcclxuXHRpbnRlcmNlcHRvcnMgOiBJbnRlcmNlcHRvcnNcclxufTsiLCJpbXBvcnQgVG9rZW5JbnRlcmNlcHRvciBmcm9tIFwiLi9Ub2tlbkludGVyY2VwdG9yXCJcclxuXHJcbmNvbnN0IE9BdXRoSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihhU2V0dXApe1xyXG5cdGNvbnN0IHNldHVwID0gYVNldHVwO1xyXG5cdHNldHVwLmZldGNoVG9rZW4gPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIGZldGNoKHNldHVwLmxvZ2luLnVybCwge1xyXG5cdFx0XHRtZXRob2Q6IChzZXR1cC5sb2dpbi5tZXRob2QgfHwgXCJnZXRcIilcclxuXHRcdH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcblx0XHQudGhlbihyZXMgPT4gcmVzW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdKTtcdFx0XHJcblx0fTtcclxuXHRzZXR1cC5hcHBlbmRUb2tlbiA9IGZ1bmN0aW9uKGFUb2tlbiwgYURhdGEpe1xyXG5cdFx0YURhdGEucmVxdWVzdC5oZWFkZXJzID0gYURhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdFx0YURhdGEucmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgYVRva2VuO1xyXG5cdFx0cmV0dXJuIGFEYXRhO1xyXG5cdH07XHJcblx0cmV0dXJuIFRva2VuSW50ZXJjZXB0b3IoYVNldHVwKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9BdXRoSW50ZXJjZXB0b3I7XHJcbiIsIi8qKlxyXG4gKiBhU2V0dXAgID0+IFxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9IFxyXG4gKiBcclxuICogYURhdGEgPT4gXHJcbiAqIHtcclxuICogXHR1cmwgOiBTdHJpbmcsXHJcbiAqIFx0cmVxdWVzdCA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdChvcHRpb25hbCkgaGVhZGVycyA6IHtcclxuICogXHRcdFx0W2hlYWRlciBuYW1lIDogc3RyaW5nXSA6IFtoZWFkZXIgdmFsdWUgOiBzdHJpbmddLFxyXG4gKiBcdFx0XHQuLi4gXHJcbiAqIFx0XHR9LFxyXG4gKiBcdFx0KG9wdGlvbmFsKSBib2R5IDoge3N0cmluZyB8IG9iamVjdCB8IEZvcm1EYXRhIHwgLi4uXSBcclxuICogXHR9LFxyXG4gKiBcdG1ldGFkYXRhIDoge1xyXG4gKiBcdFx0bWV0aG9kIDogc3RyaW5nLFxyXG4gKiBcdFx0b3JpZ2luIDogc3RyaW5nLFxyXG4gKiBcdFx0aG9zdG5hbWUgOiBzdHJpbmcsXHJcbiAqIFx0XHRwcm90b2NvbCA6IHN0cmluZyxcclxuICogXHRcdChvcHRpb25hbCkgcG9ydCA6IG51bWJlcixcclxuICogXHRcdHF1ZXJ5IDogc3RyaW5nLFxyXG4gKiBcdH0gXHJcbiAqIH1cclxuICovXHJcbmNvbnN0IFRva2VuSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihhU2V0dXApe1xyXG5cdGNvbnN0IHNldHVwID0gYVNldHVwO1xyXG5cdGxldCB0b2tlbiA9IHVuZGVmaW5lZDtcclxuICAgIFxyXG4gICAgY29uc3QgY2FsbEFwcGVuZFRva2VuID0gZnVuY3Rpb24oYVRva2VuLCBhRGF0YSwgdGhlQXBwZW5kZXIpe1xyXG4gICAgXHRpZih0aGVBcHBlbmRlciBpbnN0YW5jZW9mIEFycmF5KXtcclxuXHRcdFx0bGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0XHR0aGVBcHBlbmRlci5mb3JFYWNoKCBhcHBlbmRlciA9PiB7XHJcblx0XHRcdFx0cHJvbWlzZSA9IHByb21pc2UudGhlbihhRGF0YSA9PiBhcHBlbmRlcihhVG9rZW4sIGFEYXRhKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGVBcHBlbmRlcihhVG9rZW4sIGFEYXRhKSk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBzdGFydFJlZnJlc2ggPSBmdW5jdGlvbigpe1x0XHJcblx0XHRpZihzZXR1cC5yZWZyZXNoSW50ZXJ2YWwgPiAwKXtcclxuXHRcdCAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0eXBlb2Ygc2V0dXAucmVmcmVzaFRva2VuID09PSBcImZ1bmN0aW9uXCIgPyBmdW5jdGlvbigpe1xyXG5cdFx0ICAgICAgICAgICAgdG9rZW4gPSBQcm9taXNlLnJlc29sdmUoc2V0dXAucmVmcmVzaFRva2VuKCkpXHJcblx0XHQgICAgXHR9IDogZnVuY3Rpb24oKXtcclxuXHRcdCAgICBcdFx0dG9rZW4gPSBQcm9taXNlLnJlc29sdmUoc2V0dXAuZmV0Y2hUb2tlbigpKTtcclxuXHRcdCAgICBcdH07XHJcblx0XHQgICAgXHJcblx0XHQgICAgc2V0SW50ZXJ2YWwocmVmcmVzaFRva2VuLCBzZXR1cC5yZWZyZXNoSW50ZXJ2YWwgfHwgKDYwICogMTAwMCkpXHJcblx0XHR9XHJcbiAgICB9O1xyXG5cdFxyXG5cdFxyXG5cdHJldHVybiB7XHJcblx0XHRkb0FjY2VwdCA6IHNldHVwLmRvQWNjZXB0IHx8IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiBzZXR1cC5jb25kaXRpb247IFxyXG5cdFx0XHRpZih0eXBlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShzZXR1cC5jb25kaXRpb24oYURhdGEpKTtcclxuXHRcdFx0ZWxzZSBpZih0eXBlID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoc2V0dXAuY29uZGl0aW9uID09IGFEYXRhLm1ldGFkYXRhLm9yaWdpbik7XHJcblx0XHRcdGVsc2UgaWYoc2V0dXAuY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBzZXR1cC5jb25kaXRpb24ubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHRpZihzZXR1cC5jb25kaXRpb25baV0gPT0gYURhdGEubWV0YWRhdGEub3JpZ2luKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG5cdFx0XHR9XHRcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHJcblx0XHR9LFxyXG5cdFx0ZG9IYW5kbGUgOiBmdW5jdGlvbihhRGF0YSl7XHJcblx0XHRcdGlmKCF0b2tlbilcclxuXHRcdFx0XHR0b2tlbiA9IFByb21pc2UucmVzb2x2ZShzZXR1cC5mZXRjaFRva2VuKCkpXHJcblx0XHRcdFx0XHQudGhlbihhVG9rZW4gPT4ge1xyXG5cdFx0XHRcdFx0XHRzdGFydFJlZnJlc2goKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFUb2tlbjtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdG9rZW4udGhlbihhVG9rZW4gPT4gY2FsbEFwcGVuZFRva2VuKGFUb2tlbiwgYURhdGEsIHNldHVwLmFwcGVuZFRva2VuKSk7XHJcblx0XHR9XHRcdFxyXG5cdH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2tlbkludGVyY2VwdG9yO1xyXG4iLCJpbXBvcnQgT0F1dGhJbnRlcmNlcHRvciBmcm9tIFwiLi9PQXV0aEludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIjtcclxuXHJcblxyXG5jb25zdCBEYXRhID0ge1xyXG5cdE9BdXRoSW50ZXJjZXB0b3IgOiBPQXV0aEludGVyY2VwdG9yLFxyXG5cdFRva2VuSW50ZXJjZXB0b3IgOiBUb2tlbkludGVyY2VwdG9yXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXRhOyJdLCJzb3VyY2VSb290IjoiIn0=