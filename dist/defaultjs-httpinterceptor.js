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
	const url = new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__[/* GLOBAL */ "a"].location);
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
	VERSION : "1.1.2",
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
const TokenInterceptor = function (aSetup) {
	const setup = aSetup;
	let token = undefined;

	const callAppendToken = function (aToken, aData, theAppender) {
		if (theAppender instanceof Array) {
			let promise = Promise.resolve(aData);
			theAppender.forEach((appender) => {
				promise = promise.then((aData) => appender(aToken, aData));
			});
			return promise;
		} else return Promise.resolve(theAppender(aToken, aData));
	};

	const startRefresh = function () {
		if (setup.refreshInterval > 0) {
			const refreshToken =
				typeof setup.refreshToken === "function"
					? function () {
							token = Promise.resolve(setup.refreshToken());
					  }
					: function () {
							token = Promise.resolve(setup.fetchToken());
					  };

			setInterval(refreshToken, setup.refreshInterval || 60 * 1000);
		}
	};

	return {
		doAccept:
			setup.doAccept ||
			function (aData) {
				const type = typeof setup.condition;
				if (type === "function") return Promise.resolve(setup.condition(aData));
				else if (type === "string") return Promise.resolve(setup.condition == aData.metadata.origin);
				else if (setup.condition instanceof Array) {
					for (let i = 0; i < setup.condition.length; i++) if (setup.condition[i] == aData.metadata.origin) return Promise.resolve(true);
				}
				return Promise.resolve(false);
			},
		doHandle: function (aData) {
			if (!token){
				const {url, metadata} = aData;
				token = Promise.resolve(setup.fetchToken({url, metadata})).then((aToken) => {
					startRefresh();
					return aToken;
				});
			}

			return token.then((aToken) => callAppendToken(aToken, aData, setup.appendToken));
		},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9YTUxIdHRwUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9PQXV0aEludGVyY2VwdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmNlcHRvcnMvVG9rZW5JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJI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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVlLHlFQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7OztBQ3RGaEM7QUFBQTtBQUFrRDtBQUNBOzs7QUFHbEQ7QUFDQSxvQkFBb0IsaUVBQWdCO0FBQ3BDLG9CQUFvQixpRUFBZ0I7QUFDcEM7O0FBRWUsNkRBQUksRSIsImZpbGUiOiJkZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHRcclxuY29uc3QgT1JHRkVUQ0ggPSBHTE9CQUwuZmV0Y2g7XHJcbkdMT0JBTC5mZXRjaCA9IGZ1bmN0aW9uKGFVcmwsIGFSZXF1ZXN0KXtcclxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbik7XHJcblx0cmV0dXJuIE1hbmFnZXIuZG9JbnRlcmNlcHQoe1xyXG5cdFx0XHR1cmwgOiBhVXJsLFxyXG5cdFx0XHRyZXF1ZXN0IDogYVJlcXVlc3QgfHwge30sXHJcblx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdG1ldGhvZCA6IHR5cGVvZiBhUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiR0VUXCIgOiAoYVJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCIpLFxyXG5cdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRwcm90b2NvbCA6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG5cdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdHBhdGggOiB1cmwucGF0aG5hbWUsXHJcblx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdGFzeW5jIDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KS50aGVuKGFEYXRhID0+T1JHRkVUQ0goYURhdGEudXJsLCBhRGF0YS5yZXF1ZXN0KSk7XHJcbn07IiwiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5jb25zdCBJTlRFUkNFUFRPUlMgPSBbXTtcclxubGV0IENBQ0hFID0ge307XHJcblxyXG5jb25zdCBnZXRDaGFpbiA9IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRjb25zdCBjaGFpbiA9IENBQ0hFW2FEYXRhLm1ldGFkYXRhLm9yaWdpbl07XHJcblx0aWYodHlwZW9mIGNoYWluICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0cmV0dXJuIGNoYWluO1xyXG5cdFxyXG5cdGNvbnN0IHByb21pc2VzID0gSU5URVJDRVBUT1JTLm1hcChpbnRlcmNlcHRvciA9PiBcclxuXHRcdFByb21pc2UucmVzb2x2ZShpbnRlcmNlcHRvci5kb0FjY2VwdChhRGF0YSkpXHJcblx0XHQudGhlbih2YWx1ZSA9PiAodmFsdWUgPyBpbnRlcmNlcHRvciA6IHVuZGVmaW5lZCkpKTtcclxuXHRcclxuXHRDQUNIRVthRGF0YS5tZXRhZGF0YS5vcmlnaW5dID0gUHJvbWlzZS5hbGwocHJvbWlzZXMpXHJcblx0LnRoZW4oaW50ZXJjZXB0b3JzID0+IFxyXG5cdFx0aW50ZXJjZXB0b3JzLmZpbHRlcihpbnRlcmNlcHRvciA9PiB0eXBlb2YgaW50ZXJjZXB0b3IgIT09IFwidW5kZWZpbmVkXCIpKTtcclxuXHRcclxuXHRyZXR1cm4gQ0FDSEVbYURhdGEubWV0YWRhdGEub3JpZ2luXTtcclxufTtcclxuXHJcbmNvbnN0IGlzT3JpZ2luSWdub3JlZCA9IGZ1bmN0aW9uKGRhdGEsIG9yaWdpbnMpe1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBvcmlnaW5zLmxlbmd0aDsgaSsrKVxyXG5cdFx0aWYoZGF0YS5tZXRhZGF0YS5vcmlnaW4gPT0gb3JpZ2luc1tpXSlcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuY29uc3QgTWFuYWdlciA9IHtcclxuXHRjb25maWcgOiB7XHJcblx0XHRpZ25vcmVEb2N1bWVudE9yaWdpbiA6IHRydWUsXHJcblx0XHRpZ25vcmVPcmlnaW5zIDogW11cclxuXHR9LFxyXG5cdGludGVyY2VwdG9ycyA6IFtdLFxyXG5cdGRvSW50ZXJjZXB0IDogZnVuY3Rpb24oYURhdGEpe1xyXG5cdFx0aWYoTWFuYWdlci5jb25maWcuaWdub3JlRG9jdW1lbnRPcmlnaW4gJiYgYURhdGEubWV0YWRhdGEub3JpZ2luID09IEdMT0JBTC5sb2NhdGlvbi5vcmlnaW4pXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYURhdGEpO1xyXG5cdFx0aWYodHlwZW9mIE1hbmFnZXIuY29uZmlnLmlnbm9yZU9yaWdpbnMgIT09IFwidW5kZWZpbmVkXCIgJiYgaXNPcmlnaW5JZ25vcmVkKGFEYXRhLCBNYW5hZ2VyLmNvbmZpZy5pZ25vcmVPcmlnaW5zKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhRGF0YSk7XHJcblx0XHRcclxuXHRcdHJldHVybiBnZXRDaGFpbihhRGF0YSlcclxuXHRcdC50aGVuKCBjaGFpbiA9PiB7XHJcblx0XHRcdGlmKHR5cGVvZiBjaGFpbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjaGFpbi5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFx0Y2hhaW4uZm9yRWFjaChhSW50ZXJjZXB0b3IgPT4ge1xyXG5cdFx0XHRcdHByb21pc2UgPSBwcm9taXNlLnRoZW4oYUludGVyY2VwdG9yLmRvSGFuZGxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRhZGRJbnRlcmNlcHRvciA6IGZ1bmN0aW9uKGFJbnRlcmNlcHRvcil7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoICE9IDEgJiYgdHlwZW9mIGFJbnRlcmNlcHRvciAhPT0gXCJvYmplY3RcIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZnVuY3Rpb24gcmVxdWlyZWQgYW4gaW50ZXJjZXB0b3JcIik7XHJcblx0XHRpZih0eXBlb2YgYUludGVyY2VwdG9yLmRvQWNjZXB0ICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0FjY2VwdFxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cdFx0aWYodHlwZW9mIGFJbnRlcmNlcHRvci5kb0hhbmRsZSAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9IYW5kbGVcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdFxyXG5cdFx0SU5URVJDRVBUT1JTLnB1c2goYUludGVyY2VwdG9yKTtcdFx0XHJcblx0XHRyZXR1cm4gTWFuYWdlcjtcclxuXHR9LFxyXG5cdHJlc2V0OiAoKT0+e1xyXG5cdFx0Q0FDSEUgPSB7fTtcclxuXHR9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IFxyXG5cclxuXHJcbiIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XG5cdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHNlbGY7IH1cblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiB3aW5kb3c7IH1cblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBnbG9iYWw7IH1cblx0cmV0dXJuIHt9O1xufSkoKTtcblxuZXhwb3J0IHtHTE9CQUx9O1xuY29uc3QgVXRpbHMgPSB7XG5cdEdMT0JBTCA6IEdMT0JBTFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7ICIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5pZih0eXBlb2YgR0xPQkFMLlhNTEh0dHBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiKXtcclxuXHRjb25zdCBPUkdYSFIgPSBHTE9CQUwuWE1MSHR0cFJlcXVlc3Q7XHJcblx0Y29uc3QgZXhlY3V0ZVJlcXVlc3QgPSBmdW5jdGlvbihhRGF0YSl7XHJcblx0XHRPUkdYSFIucHJvdG90eXBlLm9wZW4uY2FsbCh0aGlzLCBhRGF0YS5yZXF1ZXN0Lm1ldGhvZCwgYURhdGEudXJsLCBhRGF0YS5tZXRhZGF0YS5hc3luYywgYURhdGEubWV0YWRhdGEudXNlcm5hbWUsIGFEYXRhLm1ldGFkYXRhLnBhc3N3b3JkKTtcclxuXHRcdGlmKHR5cGVvZiBhRGF0YS5yZXF1ZXN0LmhlYWRlcnMgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFEYXRhLnJlcXVlc3QuaGVhZGVycylcclxuXHRcdFx0LmZvckVhY2goYUhlYWRlciA9PntcclxuXHRcdFx0XHRPUkdYSFIucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXIuY2FsbCh0aGlzLCBhSGVhZGVyLCBhRGF0YS5yZXF1ZXN0LmhlYWRlcnNbYUhlYWRlcl0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdE9SR1hIUi5wcm90b3R5cGUuc2VuZC5jYWxsKHRoaXMsIGFEYXRhLnJlcXVlc3QuYm9keSk7XHJcblx0fVxyXG5cdGNvbnN0IFhIUiA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0Y29uc3QgeGhyID0gbmV3IE9SR1hIUihhcmd1bWVudHMpO1xyXG5cdFx0bGV0IGRhdGEgPSB1bmRlZmluZWQ7XHJcblx0XHRcclxuXHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyID0gZnVuY3Rpb24oYU5hbWUsIGFWYWx1ZSl7XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzW2FOYW1lXSA9IGFWYWx1ZTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHhoci5vcGVuID0gZnVuY3Rpb24oYU1ldGhvZCwgYVVybCwgaXNBc3luYywgYVVzZXJuYW1lLCBhUGFzc3dvcmQpe1xyXG5cdFx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbi5vcmlnaW4pO1xyXG5cdFx0XHRkYXRhID0ge1xyXG5cdFx0XHRcdHVybCA6IGFVcmwsXHJcblx0XHRcdFx0cmVxdWVzdCA6IHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGFNZXRob2RcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdFx0bWV0aG9kIDogYU1ldGhvZCxcclxuXHRcdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdFx0YXN5bmMgOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lIDogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQgOiBhUGFzc3dvcmRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR4aHIuc2VuZCA9IGZ1bmN0aW9uKGFCb2R5KXtcclxuXHRcdFx0aWYoZGF0YS5tZXRhZGF0YS5hc3luYyl7XHJcblx0XHRcdFx0ZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTsgXHJcblx0ICAgIFx0XHRNYW5hZ2VyLmRvSW50ZXJjZXB0KGRhdGEpXHJcblx0ICAgIFx0XHQudGhlbihleGVjdXRlUmVxdWVzdC5iaW5kKHhocikpXHJcblx0ICAgIFx0XHRbXCJjYXRjaFwiXShjb25zb2xlLmVycm9yKTtcclxuXHRcdCAgICB9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRleGVjdXRlUmVxdWVzdC5jYWxsKHhociwgZGF0YSk7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHRyZXR1cm4geGhyO1xyXG5cdH07XHJcblx0XHJcblx0R0xPQkFMLlhNTEh0dHBSZXF1ZXN0ID0gWEhSO1xyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUgPSBPUkdYSFIucHJvdG90eXBlO1xyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBYSFI7XHJcbn0iLCJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IEludGVyY2VwdG9ycyBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcclxuXHJcbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xyXG5HTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciA9IEdMT0JBTC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0TWFuYWdlciA6IE1hbmFnZXIsXHJcblx0aW50ZXJjZXB0b3JzIDogSW50ZXJjZXB0b3JzXHJcbn07IiwiaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiXHJcblxyXG5jb25zdCBPQXV0aEludGVyY2VwdG9yID0gZnVuY3Rpb24oYVNldHVwKXtcclxuXHRjb25zdCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG5cdFx0LnRoZW4ocmVzID0+IHJlc1tzZXR1cC5sb2dpbi5yZXNwb25zZS52YWx1ZVNlbGVjdG9yXSk7XHRcdFxyXG5cdH07XHJcblx0c2V0dXAuYXBwZW5kVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFEYXRhKXtcclxuXHRcdGFEYXRhLnJlcXVlc3QuaGVhZGVycyA9IGFEYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdGFEYXRhLnJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIGFUb2tlbjtcclxuXHRcdHJldHVybiBhRGF0YTtcclxuXHR9O1xyXG5cdHJldHVybiBUb2tlbkludGVyY2VwdG9yKGFTZXR1cCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPQXV0aEludGVyY2VwdG9yO1xyXG4iLCIvKipcclxuICogYVNldHVwICA9PlxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9XHJcbiAqXHJcbiAqIGFEYXRhID0+XHJcbiAqIHtcclxuICogXHR1cmwgOiBTdHJpbmcsXHJcbiAqIFx0cmVxdWVzdCA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdChvcHRpb25hbCkgaGVhZGVycyA6IHtcclxuICogXHRcdFx0W2hlYWRlciBuYW1lIDogc3RyaW5nXSA6IFtoZWFkZXIgdmFsdWUgOiBzdHJpbmddLFxyXG4gKiBcdFx0XHQuLi5cclxuICogXHRcdH0sXHJcbiAqIFx0XHQob3B0aW9uYWwpIGJvZHkgOiB7c3RyaW5nIHwgb2JqZWN0IHwgRm9ybURhdGEgfCAuLi5dXHJcbiAqIFx0fSxcclxuICogXHRtZXRhZGF0YSA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdG9yaWdpbiA6IHN0cmluZyxcclxuICogXHRcdGhvc3RuYW1lIDogc3RyaW5nLFxyXG4gKiBcdFx0cHJvdG9jb2wgOiBzdHJpbmcsXHJcbiAqIFx0XHQob3B0aW9uYWwpIHBvcnQgOiBudW1iZXIsXHJcbiAqIFx0XHRxdWVyeSA6IHN0cmluZyxcclxuICogXHR9XHJcbiAqIH1cclxuICovXHJcbmNvbnN0IFRva2VuSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoYVNldHVwKSB7XHJcblx0Y29uc3Qgc2V0dXAgPSBhU2V0dXA7XHJcblx0bGV0IHRva2VuID0gdW5kZWZpbmVkO1xyXG5cclxuXHRjb25zdCBjYWxsQXBwZW5kVG9rZW4gPSBmdW5jdGlvbiAoYVRva2VuLCBhRGF0YSwgdGhlQXBwZW5kZXIpIHtcclxuXHRcdGlmICh0aGVBcHBlbmRlciBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRcdGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGFEYXRhKTtcclxuXHRcdFx0dGhlQXBwZW5kZXIuZm9yRWFjaCgoYXBwZW5kZXIpID0+IHtcclxuXHRcdFx0XHRwcm9taXNlID0gcHJvbWlzZS50aGVuKChhRGF0YSkgPT4gYXBwZW5kZXIoYVRva2VuLCBhRGF0YSkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9IGVsc2UgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGVBcHBlbmRlcihhVG9rZW4sIGFEYXRhKSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc3RhcnRSZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHNldHVwLnJlZnJlc2hJbnRlcnZhbCA+IDApIHtcclxuXHRcdFx0Y29uc3QgcmVmcmVzaFRva2VuID1cclxuXHRcdFx0XHR0eXBlb2Ygc2V0dXAucmVmcmVzaFRva2VuID09PSBcImZ1bmN0aW9uXCJcclxuXHRcdFx0XHRcdD8gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHRva2VuID0gUHJvbWlzZS5yZXNvbHZlKHNldHVwLnJlZnJlc2hUb2tlbigpKTtcclxuXHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0dG9rZW4gPSBQcm9taXNlLnJlc29sdmUoc2V0dXAuZmV0Y2hUb2tlbigpKTtcclxuXHRcdFx0XHRcdCAgfTtcclxuXHJcblx0XHRcdHNldEludGVydmFsKHJlZnJlc2hUb2tlbiwgc2V0dXAucmVmcmVzaEludGVydmFsIHx8IDYwICogMTAwMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGRvQWNjZXB0OlxyXG5cdFx0XHRzZXR1cC5kb0FjY2VwdCB8fFxyXG5cdFx0XHRmdW5jdGlvbiAoYURhdGEpIHtcclxuXHRcdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHNldHVwLmNvbmRpdGlvbjtcclxuXHRcdFx0XHRpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmNvbmRpdGlvbihhRGF0YSkpO1xyXG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2V0dXAuY29uZGl0aW9uID09IGFEYXRhLm1ldGFkYXRhLm9yaWdpbik7XHJcblx0XHRcdFx0ZWxzZSBpZiAoc2V0dXAuY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2V0dXAuY29uZGl0aW9uLmxlbmd0aDsgaSsrKSBpZiAoc2V0dXAuY29uZGl0aW9uW2ldID09IGFEYXRhLm1ldGFkYXRhLm9yaWdpbikgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHJcblx0XHRcdH0sXHJcblx0XHRkb0hhbmRsZTogZnVuY3Rpb24gKGFEYXRhKSB7XHJcblx0XHRcdGlmICghdG9rZW4pe1xyXG5cdFx0XHRcdGNvbnN0IHt1cmwsIG1ldGFkYXRhfSA9IGFEYXRhO1xyXG5cdFx0XHRcdHRva2VuID0gUHJvbWlzZS5yZXNvbHZlKHNldHVwLmZldGNoVG9rZW4oe3VybCwgbWV0YWRhdGF9KSkudGhlbigoYVRva2VuKSA9PiB7XHJcblx0XHRcdFx0XHRzdGFydFJlZnJlc2goKTtcclxuXHRcdFx0XHRcdHJldHVybiBhVG9rZW47XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0b2tlbi50aGVuKChhVG9rZW4pID0+IGNhbGxBcHBlbmRUb2tlbihhVG9rZW4sIGFEYXRhLCBzZXR1cC5hcHBlbmRUb2tlbikpO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9rZW5JbnRlcmNlcHRvcjtcclxuIiwiaW1wb3J0IE9BdXRoSW50ZXJjZXB0b3IgZnJvbSBcIi4vT0F1dGhJbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQgVG9rZW5JbnRlcmNlcHRvciBmcm9tIFwiLi9Ub2tlbkludGVyY2VwdG9yXCI7XHJcblxyXG5cclxuY29uc3QgRGF0YSA9IHtcclxuXHRPQXV0aEludGVyY2VwdG9yIDogT0F1dGhJbnRlcmNlcHRvcixcclxuXHRUb2tlbkludGVyY2VwdG9yIDogVG9rZW5JbnRlcmNlcHRvclxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGF0YTsiXSwic291cmNlUm9vdCI6IiJ9