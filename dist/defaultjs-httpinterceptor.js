/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ORGFETCH": () => (/* binding */ ORGFETCH)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");

const ORGFETCH = _Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.fetch;

/***/ }),

/***/ "./src/Fetch.js":
/*!**********************!*\
  !*** ./src/Fetch.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");



	
_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.fetch = async function(aUrl, aRequest){
	const url = new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.location);
	const data = await _Manager__WEBPACK_IMPORTED_MODULE_0__["default"].doIntercept({
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
		});
			
	return (0,_Constants__WEBPACK_IMPORTED_MODULE_2__.ORGFETCH)(data.url, data.request);
};

/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");


const CURRENTORIGIN = _Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.location.origin;

class Manager {
	#cache = {};
	#ignoredUrls = {};
	#ignoredOrigins = {};
	#ignoreDocumentOrigin = false;
	#interceptors = [];

	constructor() { }

	ignoreDocumentOrigin(value) {
		this.#ignoreDocumentOrigin = value;
	}

	addOriginToIgnore(origins) {
		if (origins instanceof Array)
			for (let origin of origins)
				this.#ignoredOrigins[origins] = true;
		else
			this.#ignoredOrigins[origins] = true;
	}

	addUrlToIgnore(urls) {
		if (urls instanceof Array)
			for (let url of urls)
				this.#ignoredUrls[url] = true;
		else
			this.#ignoredUrls[urls] = true;
	}

	addInterceptor(aInterceptor) {
		if (typeof aInterceptor !== "object")
			throw new Error("function required an interceptor");
		if (typeof aInterceptor.doAccept !== "function")
			throw new Error("The interceptor required a \"doAccept\" function!");
		if (typeof aInterceptor.doHandle !== "function")
			throw new Error("The interceptor required a \"doHandle\" function!");

		this.#interceptors.push(aInterceptor);
		this.reset();
	}

	async doIntercept(aData) {
		const origin = aData.metadata.origin;

		if (this.#isIgnored(origin, aData.url.toString()))
			return aData;

		const {url, metadata} = aData;
		const chain = await this.#getChain(origin, {url, metadata});
		if (!chain)
			return aData;

		for (let interceptor of chain)
			aData = await interceptor.doHandle(aData);

		return aData;
	}

	reset() {
		this.#cache = {};
	}

	async uncheckedFetch(url, request){
		return (0,_Constants__WEBPACK_IMPORTED_MODULE_1__.ORGFETCH)(url, request);
	}

	#isIgnored (origin, url) {
		if (this.#ignoredUrls[url])
			return true	
		if (this.#ignoreDocumentOrigin && origin == CURRENTORIGIN)
			return true;
		if(this.#ignoredOrigins[origin])
			return true;

		return false
	}

	async #getChain (origin, data){
		let chain = this.#cache[origin];
		if (!chain) {
			chain = this.#interceptorForOrigin(origin, data);
			this.#cache[origin] = chain;
		}
	
		return chain;
	}
	
	async #interceptorForOrigin(origin, data){
		const result = [];
		for (let interceptor of this.#interceptors) {
			if (await interceptor.doAccept(data))
				result.push(interceptor)
		}
	
		return result;
	}
};

const INSTANCE = new Manager();


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (INSTANCE);




/***/ }),

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GLOBAL": () => (/* binding */ GLOBAL),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const GLOBAL = (() => {
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }
	return {};
})();


const Utils = {
	GLOBAL : GLOBAL
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utils); 

/***/ }),

/***/ "./src/XMLHttpRequest.js":
/*!*******************************!*\
  !*** ./src/XMLHttpRequest.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");



if(typeof _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest !== "undefined"){
	const ORGXHR = _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest;
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
			const url = new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.location.origin);
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
	    		_Manager__WEBPACK_IMPORTED_MODULE_0__["default"].doIntercept(data)
	    		.then(executeRequest.bind(xhr))
	    		["catch"](console.error);
		    }
			else
				executeRequest.call(xhr, data);
		};
		
		return xhr;
	};
	
	_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest = XHR;
	_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest.prototype = ORGXHR.prototype;
	_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest.prototype.constructor = XHR;
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");
/* harmony import */ var _XMLHttpRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XMLHttpRequest */ "./src/XMLHttpRequest.js");
/* harmony import */ var _Fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fetch */ "./src/Fetch.js");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors/index.js");






_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs = _Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs || {};
_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.httpinterceptor = _Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.httpinterceptor || {
	VERSION : "${version}",
	Manager: _Manager__WEBPACK_IMPORTED_MODULE_3__["default"],
	interceptors: _interceptors__WEBPACK_IMPORTED_MODULE_4__["default"]
};

/***/ }),

/***/ "./src/interceptors/Interceptor.js":
/*!*****************************************!*\
  !*** ./src/interceptors/Interceptor.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Interceptor)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");


class Interceptor{
    async doAccept(data){}
    async doHandle(data){}
    async unceckedFetch(url, request){
		return (0,_Constants__WEBPACK_IMPORTED_MODULE_0__.ORGFETCH)(url, request);
	}

};

/***/ }),

/***/ "./src/interceptors/OAuthInterceptor.js":
/*!**********************************************!*\
  !*** ./src/interceptors/OAuthInterceptor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TokenInterceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TokenInterceptor */ "./src/interceptors/TokenInterceptor.js");


const OAuthInterceptor = function(aSetup){
	const setup = aSetup;
	setup.fetchToken = async () => {
		const response = await fetch(setup.login.url, {
			method: (setup.login.method || "get")
		});
		response = await response.json();
		return response[setup.login.response.valueSelector];
	};
	setup.appendToken = function(aToken, aData){
		aData.request.headers = aData.request.headers || {};
		aData.request.headers["Authorization"] = "Bearer " + aToken;
		return aData;
	};
	return (0,_TokenInterceptor__WEBPACK_IMPORTED_MODULE_0__["default"])(aSetup);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OAuthInterceptor);


/***/ }),

/***/ "./src/interceptors/TokenInterceptor.js":
/*!**********************************************!*\
  !*** ./src/interceptors/TokenInterceptor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TokenInterceptor)
/* harmony export */ });
/* harmony import */ var _Interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interceptor */ "./src/interceptors/Interceptor.js");
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


class TokenInterceptor extends _Interceptor__WEBPACK_IMPORTED_MODULE_0__["default"] {

	#token = null;
	#lastData = {};
	#condition;
	#fetchToken;
	#appendToken;
	#refreshInterval;
	#refreshToken;

	constructor({ condition, fetchToken, appendToken, refreshInterval = 60 * 1000, refreshToken }) {
		super();
		if(typeof condition !== "string" && !(condition instanceof Array) && typeof condition !== "function")
			throw new Error(`Parameter "condition" must be a "string", "array" or "function"!`);
		this.#condition = condition;
		
		if(typeof fetchToken !== "function")
			throw new Error(`Parameter "fetchToken" must be a "function"!`);
		this.#fetchToken = fetchToken;

		if(typeof appendToken !== "function")
			throw new Error(`Parameter "appendToken" must be a "function"!`);
		this.#appendToken = appendToken;

		this.#refreshInterval = refreshInterval;
		this.#refreshToken = refreshToken;
	}

	async doAccept(data) {
		const type = typeof this.#condition;
		const condition = this.#condition;
		const origin = data.metadata.origin;
		if (type === "function") return await condition(data);
		else if (type === "string") return condition == origin;
		else if (condition instanceof Array)
			return condition.includes(origin);

		return false;
	}

	async doHandle(data) {
		if (!this.#token) {
			const { url, metadata } = data;
			this.#lastData = { url, metadata };
			this.#token = this.#fetchToken({ url, metadata });
			this.#startRefresh();
		}

		return this.#callAppendToken(data);
	}

	async #callAppendToken(data) {
		const appender = this.#appendToken;
		const token = await this.#token;
		const result = await appender(token, data);

		return result ? result : data;
	}

	#startRefresh() {
		if (this.#refreshInterval > 0) {
			const refreshToken = this.#refreshToken || (() => this.#fetchToken(this.#lastData));
			setInterval(() => {
				if (this.#refreshToken)
					this.#refreshToken(this.#lastData);
				else
					this.#fetchToken(this.#lastData);
			}, this.#refreshInterval);
		}
	}
};

/***/ }),

/***/ "./src/interceptors/index.js":
/*!***********************************!*\
  !*** ./src/interceptors/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interceptor */ "./src/interceptors/Interceptor.js");
/* harmony import */ var _OAuthInterceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OAuthInterceptor */ "./src/interceptors/OAuthInterceptor.js");
/* harmony import */ var _TokenInterceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TokenInterceptor */ "./src/interceptors/TokenInterceptor.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	Interceptor: _Interceptor__WEBPACK_IMPORTED_MODULE_0__["default"],
	OAuthInterceptor: _OAuthInterceptor__WEBPACK_IMPORTED_MODULE_1__["default"],
	TokenInterceptor: _TokenInterceptor__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./src/index.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9NYW5hZ2VyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9YTUxIdHRwUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL0ludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL09BdXRoSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvVG9rZW5JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuZXhwb3J0IGNvbnN0IE9SR0ZFVENIID0gR0xPQkFMLmZldGNoOyIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7T1JHRkVUQ0h9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cdFxyXG5HTE9CQUwuZmV0Y2ggPSBhc3luYyBmdW5jdGlvbihhVXJsLCBhUmVxdWVzdCl7XHJcblx0Y29uc3QgdXJsID0gbmV3IFVSTChhVXJsLCBHTE9CQUwubG9jYXRpb24pO1xyXG5cdGNvbnN0IGRhdGEgPSBhd2FpdCBNYW5hZ2VyLmRvSW50ZXJjZXB0KHtcclxuXHRcdFx0dXJsIDogYVVybCxcclxuXHRcdFx0cmVxdWVzdCA6IGFSZXF1ZXN0IHx8IHt9LFxyXG5cdFx0XHRtZXRhZGF0YSA6IHtcclxuXHRcdFx0XHRtZXRob2QgOiB0eXBlb2YgYVJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIgPyBcIkdFVFwiIDogKGFSZXF1ZXN0Lm1ldGhvZCB8fCBcIkdFVFwiKSxcclxuXHRcdFx0XHRvcmlnaW46IHVybC5vcmlnaW4sXHJcblx0XHRcdFx0cHJvdG9jb2wgOiB1cmwucHJvdG9jb2wsXHJcblx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRwb3J0OiB1cmwucG9ydCxcclxuXHRcdFx0XHRwYXRoIDogdXJsLnBhdGhuYW1lLFxyXG5cdFx0XHRcdGhhc2ggOiB1cmwuaGFzaCxcclxuXHRcdFx0XHRxdWVyeTogdXJsLnNlYXJjaCxcclxuXHRcdFx0XHRhc3luYyA6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRcdFxyXG5cdHJldHVybiBPUkdGRVRDSChkYXRhLnVybCwgZGF0YS5yZXF1ZXN0KTtcclxufTsiLCJpbXBvcnQgeyBHTE9CQUwgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQge09SR0ZFVENIfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuY29uc3QgQ1VSUkVOVE9SSUdJTiA9IEdMT0JBTC5sb2NhdGlvbi5vcmlnaW47XHJcblxyXG5jbGFzcyBNYW5hZ2VyIHtcclxuXHQjY2FjaGUgPSB7fTtcclxuXHQjaWdub3JlZFVybHMgPSB7fTtcclxuXHQjaWdub3JlZE9yaWdpbnMgPSB7fTtcclxuXHQjaWdub3JlRG9jdW1lbnRPcmlnaW4gPSBmYWxzZTtcclxuXHQjaW50ZXJjZXB0b3JzID0gW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdGlnbm9yZURvY3VtZW50T3JpZ2luKHZhbHVlKSB7XHJcblx0XHR0aGlzLiNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YWRkT3JpZ2luVG9JZ25vcmUob3JpZ2lucykge1xyXG5cdFx0aWYgKG9yaWdpbnMgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0Zm9yIChsZXQgb3JpZ2luIG9mIG9yaWdpbnMpXHJcblx0XHRcdFx0dGhpcy4jaWdub3JlZE9yaWdpbnNbb3JpZ2luc10gPSB0cnVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5zXSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRhZGRVcmxUb0lnbm9yZSh1cmxzKSB7XHJcblx0XHRpZiAodXJscyBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRmb3IgKGxldCB1cmwgb2YgdXJscylcclxuXHRcdFx0XHR0aGlzLiNpZ25vcmVkVXJsc1t1cmxdID0gdHJ1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy4jaWdub3JlZFVybHNbdXJsc10gPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0YWRkSW50ZXJjZXB0b3IoYUludGVyY2VwdG9yKSB7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvciAhPT0gXCJvYmplY3RcIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZnVuY3Rpb24gcmVxdWlyZWQgYW4gaW50ZXJjZXB0b3JcIik7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvci5kb0FjY2VwdCAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9BY2NlcHRcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yLmRvSGFuZGxlICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0hhbmRsZVxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cclxuXHRcdHRoaXMuI2ludGVyY2VwdG9ycy5wdXNoKGFJbnRlcmNlcHRvcik7XHJcblx0XHR0aGlzLnJlc2V0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0ludGVyY2VwdChhRGF0YSkge1xyXG5cdFx0Y29uc3Qgb3JpZ2luID0gYURhdGEubWV0YWRhdGEub3JpZ2luO1xyXG5cclxuXHRcdGlmICh0aGlzLiNpc0lnbm9yZWQob3JpZ2luLCBhRGF0YS51cmwudG9TdHJpbmcoKSkpXHJcblx0XHRcdHJldHVybiBhRGF0YTtcclxuXHJcblx0XHRjb25zdCB7dXJsLCBtZXRhZGF0YX0gPSBhRGF0YTtcclxuXHRcdGNvbnN0IGNoYWluID0gYXdhaXQgdGhpcy4jZ2V0Q2hhaW4ob3JpZ2luLCB7dXJsLCBtZXRhZGF0YX0pO1xyXG5cdFx0aWYgKCFjaGFpbilcclxuXHRcdFx0cmV0dXJuIGFEYXRhO1xyXG5cclxuXHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIGNoYWluKVxyXG5cdFx0XHRhRGF0YSA9IGF3YWl0IGludGVyY2VwdG9yLmRvSGFuZGxlKGFEYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gYURhdGE7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuI2NhY2hlID0ge307XHJcblx0fVxyXG5cclxuXHRhc3luYyB1bmNoZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3Qpe1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG5cclxuXHQjaXNJZ25vcmVkIChvcmlnaW4sIHVybCkge1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZWRVcmxzW3VybF0pXHJcblx0XHRcdHJldHVybiB0cnVlXHRcclxuXHRcdGlmICh0aGlzLiNpZ25vcmVEb2N1bWVudE9yaWdpbiAmJiBvcmlnaW4gPT0gQ1VSUkVOVE9SSUdJTilcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRpZih0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5dKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdGFzeW5jICNnZXRDaGFpbiAob3JpZ2luLCBkYXRhKXtcclxuXHRcdGxldCBjaGFpbiA9IHRoaXMuI2NhY2hlW29yaWdpbl07XHJcblx0XHRpZiAoIWNoYWluKSB7XHJcblx0XHRcdGNoYWluID0gdGhpcy4jaW50ZXJjZXB0b3JGb3JPcmlnaW4ob3JpZ2luLCBkYXRhKTtcclxuXHRcdFx0dGhpcy4jY2FjaGVbb3JpZ2luXSA9IGNoYWluO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIGNoYWluO1xyXG5cdH1cclxuXHRcclxuXHRhc3luYyAjaW50ZXJjZXB0b3JGb3JPcmlnaW4ob3JpZ2luLCBkYXRhKXtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgaW50ZXJjZXB0b3Igb2YgdGhpcy4jaW50ZXJjZXB0b3JzKSB7XHJcblx0XHRcdGlmIChhd2FpdCBpbnRlcmNlcHRvci5kb0FjY2VwdChkYXRhKSlcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpbnRlcmNlcHRvcilcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgSU5TVEFOQ0UgPSBuZXcgTWFuYWdlcigpO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElOU1RBTkNFO1xyXG5cclxuXHJcbiIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XG5cdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHNlbGY7IH1cblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiB3aW5kb3c7IH1cblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBnbG9iYWw7IH1cblx0cmV0dXJuIHt9O1xufSkoKTtcblxuZXhwb3J0IHtHTE9CQUx9O1xuY29uc3QgVXRpbHMgPSB7XG5cdEdMT0JBTCA6IEdMT0JBTFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7ICIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcblxyXG5pZih0eXBlb2YgR0xPQkFMLlhNTEh0dHBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiKXtcclxuXHRjb25zdCBPUkdYSFIgPSBHTE9CQUwuWE1MSHR0cFJlcXVlc3Q7XHJcblx0Y29uc3QgZXhlY3V0ZVJlcXVlc3QgPSBmdW5jdGlvbihhRGF0YSl7XHJcblx0XHRPUkdYSFIucHJvdG90eXBlLm9wZW4uY2FsbCh0aGlzLCBhRGF0YS5yZXF1ZXN0Lm1ldGhvZCwgYURhdGEudXJsLCBhRGF0YS5tZXRhZGF0YS5hc3luYywgYURhdGEubWV0YWRhdGEudXNlcm5hbWUsIGFEYXRhLm1ldGFkYXRhLnBhc3N3b3JkKTtcclxuXHRcdGlmKHR5cGVvZiBhRGF0YS5yZXF1ZXN0LmhlYWRlcnMgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFEYXRhLnJlcXVlc3QuaGVhZGVycylcclxuXHRcdFx0LmZvckVhY2goYUhlYWRlciA9PntcclxuXHRcdFx0XHRPUkdYSFIucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXIuY2FsbCh0aGlzLCBhSGVhZGVyLCBhRGF0YS5yZXF1ZXN0LmhlYWRlcnNbYUhlYWRlcl0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdE9SR1hIUi5wcm90b3R5cGUuc2VuZC5jYWxsKHRoaXMsIGFEYXRhLnJlcXVlc3QuYm9keSk7XHJcblx0fVxyXG5cdGNvbnN0IFhIUiA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0Y29uc3QgeGhyID0gbmV3IE9SR1hIUihhcmd1bWVudHMpO1xyXG5cdFx0bGV0IGRhdGEgPSB1bmRlZmluZWQ7XHJcblx0XHRcclxuXHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyID0gZnVuY3Rpb24oYU5hbWUsIGFWYWx1ZSl7XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHJcblx0XHRcdGRhdGEucmVxdWVzdC5oZWFkZXJzW2FOYW1lXSA9IGFWYWx1ZTtcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHhoci5vcGVuID0gZnVuY3Rpb24oYU1ldGhvZCwgYVVybCwgaXNBc3luYywgYVVzZXJuYW1lLCBhUGFzc3dvcmQpe1xyXG5cdFx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbi5vcmlnaW4pO1xyXG5cdFx0XHRkYXRhID0ge1xyXG5cdFx0XHRcdHVybCA6IGFVcmwsXHJcblx0XHRcdFx0cmVxdWVzdCA6IHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGFNZXRob2RcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdFx0bWV0aG9kIDogYU1ldGhvZCxcclxuXHRcdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdFx0YXN5bmMgOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lIDogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQgOiBhUGFzc3dvcmRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR4aHIuc2VuZCA9IGZ1bmN0aW9uKGFCb2R5KXtcclxuXHRcdFx0aWYoZGF0YS5tZXRhZGF0YS5hc3luYyl7XHJcblx0XHRcdFx0ZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTsgXHJcblx0ICAgIFx0XHRNYW5hZ2VyLmRvSW50ZXJjZXB0KGRhdGEpXHJcblx0ICAgIFx0XHQudGhlbihleGVjdXRlUmVxdWVzdC5iaW5kKHhocikpXHJcblx0ICAgIFx0XHRbXCJjYXRjaFwiXShjb25zb2xlLmVycm9yKTtcclxuXHRcdCAgICB9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRleGVjdXRlUmVxdWVzdC5jYWxsKHhociwgZGF0YSk7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHRyZXR1cm4geGhyO1xyXG5cdH07XHJcblx0XHJcblx0R0xPQkFMLlhNTEh0dHBSZXF1ZXN0ID0gWEhSO1xyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUgPSBPUkdYSFIucHJvdG90eXBlO1xyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBYSFI7XHJcbn0iLCJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IGludGVyY2VwdG9ycyBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcclxuXHJcbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xyXG5HTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciA9IEdMT0JBTC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0TWFuYWdlcixcclxuXHRpbnRlcmNlcHRvcnNcclxufTsiLCJpbXBvcnQge09SR0ZFVENIfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmNlcHRvcntcclxuICAgIGFzeW5jIGRvQWNjZXB0KGRhdGEpe31cclxuICAgIGFzeW5jIGRvSGFuZGxlKGRhdGEpe31cclxuICAgIGFzeW5jIHVuY2Vja2VkRmV0Y2godXJsLCByZXF1ZXN0KXtcclxuXHRcdHJldHVybiBPUkdGRVRDSCh1cmwsIHJlcXVlc3QpO1xyXG5cdH1cclxuXHJcbn07IiwiaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiXHJcblxyXG5jb25zdCBPQXV0aEludGVyY2VwdG9yID0gZnVuY3Rpb24oYVNldHVwKXtcclxuXHRjb25zdCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KTtcclxuXHRcdHJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdO1xyXG5cdH07XHJcblx0c2V0dXAuYXBwZW5kVG9rZW4gPSBmdW5jdGlvbihhVG9rZW4sIGFEYXRhKXtcclxuXHRcdGFEYXRhLnJlcXVlc3QuaGVhZGVycyA9IGFEYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdGFEYXRhLnJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIGFUb2tlbjtcclxuXHRcdHJldHVybiBhRGF0YTtcclxuXHR9O1xyXG5cdHJldHVybiBUb2tlbkludGVyY2VwdG9yKGFTZXR1cCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPQXV0aEludGVyY2VwdG9yO1xyXG4iLCIvKipcclxuICogYVNldHVwICA9PlxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9XHJcbiAqXHJcbiAqIGFEYXRhID0+XHJcbiAqIHtcclxuICogXHR1cmwgOiBTdHJpbmcsXHJcbiAqIFx0cmVxdWVzdCA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdChvcHRpb25hbCkgaGVhZGVycyA6IHtcclxuICogXHRcdFx0W2hlYWRlciBuYW1lIDogc3RyaW5nXSA6IFtoZWFkZXIgdmFsdWUgOiBzdHJpbmddLFxyXG4gKiBcdFx0XHQuLi5cclxuICogXHRcdH0sXHJcbiAqIFx0XHQob3B0aW9uYWwpIGJvZHkgOiB7c3RyaW5nIHwgb2JqZWN0IHwgRm9ybURhdGEgfCAuLi5dXHJcbiAqIFx0fSxcclxuICogXHRtZXRhZGF0YSA6IHtcclxuICogXHRcdG1ldGhvZCA6IHN0cmluZyxcclxuICogXHRcdG9yaWdpbiA6IHN0cmluZyxcclxuICogXHRcdGhvc3RuYW1lIDogc3RyaW5nLFxyXG4gKiBcdFx0cHJvdG9jb2wgOiBzdHJpbmcsXHJcbiAqIFx0XHQob3B0aW9uYWwpIHBvcnQgOiBudW1iZXIsXHJcbiAqIFx0XHRxdWVyeSA6IHN0cmluZyxcclxuICogXHR9XHJcbiAqIH1cclxuICovXHJcblxyXG5pbXBvcnQgSW50ZXJjZXB0b3IgZnJvbSBcIi4vSW50ZXJjZXB0b3JcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5JbnRlcmNlcHRvciBleHRlbmRzIEludGVyY2VwdG9yIHtcclxuXHJcblx0I3Rva2VuID0gbnVsbDtcclxuXHQjbGFzdERhdGEgPSB7fTtcclxuXHQjY29uZGl0aW9uO1xyXG5cdCNmZXRjaFRva2VuO1xyXG5cdCNhcHBlbmRUb2tlbjtcclxuXHQjcmVmcmVzaEludGVydmFsO1xyXG5cdCNyZWZyZXNoVG9rZW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHsgY29uZGl0aW9uLCBmZXRjaFRva2VuLCBhcHBlbmRUb2tlbiwgcmVmcmVzaEludGVydmFsID0gNjAgKiAxMDAwLCByZWZyZXNoVG9rZW4gfSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGlmKHR5cGVvZiBjb25kaXRpb24gIT09IFwic3RyaW5nXCIgJiYgIShjb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSkgJiYgdHlwZW9mIGNvbmRpdGlvbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImNvbmRpdGlvblwiIG11c3QgYmUgYSBcInN0cmluZ1wiLCBcImFycmF5XCIgb3IgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YgZmV0Y2hUb2tlbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImZldGNoVG9rZW5cIiBtdXN0IGJlIGEgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jZmV0Y2hUb2tlbiA9IGZldGNoVG9rZW47XHJcblxyXG5cdFx0aWYodHlwZW9mIGFwcGVuZFRva2VuICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiYXBwZW5kVG9rZW5cIiBtdXN0IGJlIGEgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jYXBwZW5kVG9rZW4gPSBhcHBlbmRUb2tlbjtcclxuXHJcblx0XHR0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgPSByZWZyZXNoSW50ZXJ2YWw7XHJcblx0XHR0aGlzLiNyZWZyZXNoVG9rZW4gPSByZWZyZXNoVG9rZW47XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0FjY2VwdChkYXRhKSB7XHJcblx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHRoaXMuI2NvbmRpdGlvbjtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuI2NvbmRpdGlvbjtcclxuXHRcdGNvbnN0IG9yaWdpbiA9IGRhdGEubWV0YWRhdGEub3JpZ2luO1xyXG5cdFx0aWYgKHR5cGUgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGF3YWl0IGNvbmRpdGlvbihkYXRhKTtcclxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHJldHVybiBjb25kaXRpb24gPT0gb3JpZ2luO1xyXG5cdFx0ZWxzZSBpZiAoY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdHJldHVybiBjb25kaXRpb24uaW5jbHVkZXMob3JpZ2luKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0hhbmRsZShkYXRhKSB7XHJcblx0XHRpZiAoIXRoaXMuI3Rva2VuKSB7XHJcblx0XHRcdGNvbnN0IHsgdXJsLCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdFx0dGhpcy4jbGFzdERhdGEgPSB7IHVybCwgbWV0YWRhdGEgfTtcclxuXHRcdFx0dGhpcy4jdG9rZW4gPSB0aGlzLiNmZXRjaFRva2VuKHsgdXJsLCBtZXRhZGF0YSB9KTtcclxuXHRcdFx0dGhpcy4jc3RhcnRSZWZyZXNoKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2NhbGxBcHBlbmRUb2tlbihkYXRhKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jICNjYWxsQXBwZW5kVG9rZW4oZGF0YSkge1xyXG5cdFx0Y29uc3QgYXBwZW5kZXIgPSB0aGlzLiNhcHBlbmRUb2tlbjtcclxuXHRcdGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy4jdG9rZW47XHJcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBhcHBlbmRlcih0b2tlbiwgZGF0YSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdCA/IHJlc3VsdCA6IGRhdGE7XHJcblx0fVxyXG5cclxuXHQjc3RhcnRSZWZyZXNoKCkge1xyXG5cdFx0aWYgKHRoaXMuI3JlZnJlc2hJbnRlcnZhbCA+IDApIHtcclxuXHRcdFx0Y29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy4jcmVmcmVzaFRva2VuIHx8ICgoKSA9PiB0aGlzLiNmZXRjaFRva2VuKHRoaXMuI2xhc3REYXRhKSk7XHJcblx0XHRcdHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy4jcmVmcmVzaFRva2VuKVxyXG5cdFx0XHRcdFx0dGhpcy4jcmVmcmVzaFRva2VuKHRoaXMuI2xhc3REYXRhKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0aGlzLiNmZXRjaFRva2VuKHRoaXMuI2xhc3REYXRhKTtcclxuXHRcdFx0fSwgdGhpcy4jcmVmcmVzaEludGVydmFsKTtcclxuXHRcdH1cclxuXHR9XHJcbn07IiwiaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuL0ludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gXCIuL09BdXRoSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICB7XHJcblx0SW50ZXJjZXB0b3IsXHJcblx0T0F1dGhJbnRlcmNlcHRvcixcclxuXHRUb2tlbkludGVyY2VwdG9yXHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9