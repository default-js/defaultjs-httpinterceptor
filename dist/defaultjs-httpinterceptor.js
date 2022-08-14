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
			url : new URL(aUrl, location),
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

/***/ "./src/Interceptor.js":
/*!****************************!*\
  !*** ./src/Interceptor.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Interceptor)
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");


class Interceptor{
    async doAccept(data){}
    async doHandle(data){}
    async unceckedFetch(url, request){
		return (0,_Constants__WEBPACK_IMPORTED_MODULE_0__.ORGFETCH)(url, request);
	}

};

/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* binding */ Manager),
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
	#setup = [];
	#readyCheck;

	constructor() { }

	set ignoreDocumentOrigin(value) {
		this.#ignoreDocumentOrigin = value;
	}

	addOriginToIgnore(origins) {
		if (origins instanceof Array)
			for (let origin of origins)
				this.#ignoredOrigins[origin.toString()] = true;
		else
			this.#ignoredOrigins[origins.toString()] = true;
	}

	addUrlToIgnore(urls) {
		if (urls instanceof Array)
			for (let url of urls)
				this.#ignoredUrls[url.toString()] = true;
		else
			this.#ignoredUrls[urls.toString()] = true;
	}

	setup(setup) {
		if (typeof setup === "function" || setup instanceof Promise)
			this.#setup.push(setup);
	}

	addInterceptor(aInterceptor) {
		if(aInterceptor instanceof Array)
			return aInterceptor.forEach(interceptor => this.addInterceptor(interceptor));
		if (typeof aInterceptor !== "object")
			throw new Error("function required an interceptor");
		if (typeof aInterceptor.doAccept !== "function")
			throw new Error("The interceptor required a \"doAccept\" function!");
		if (typeof aInterceptor.doHandle !== "function")
			throw new Error("The interceptor required a \"doHandle\" function!");

		this.#interceptors.push(aInterceptor);
		this.reset();
	}

	get ready() {
		return (async () => {			
			if (this.#setup.length == 0)
				return true;

			if(this.#readyCheck)
				return this.#readyCheck;

			this.#readyCheck = (async () => {
				while(this.#setup.length != 0){
					const setup = this.#setup[0];
					if (setup){
						const interceptors = setup instanceof Promise ? await setup : await setup();
						if(interceptors)
							interceptors instanceof Array ? interceptors.forEach(interceptor => this.addInterceptor(interceptor)) : this.addInterceptor(interceptors);
					}
					
					this.#setup.shift();
				}
				this.#readyCheck = null;
				return this.ready;
			})();

			return this.#readyCheck;
		})();
	}

	async doIntercept(aData) {
		await this.ready;

		const origin = aData.metadata.origin;

		if (this.#isIgnored(origin, aData.url.toString()))
			return aData;

		const { url, metadata } = aData;
		const chain = await this.#getChain(origin, { url, metadata });
		if (!chain)
			return aData;

		for (let interceptor of chain)
			aData = await interceptor.doHandle(aData);

		return aData;
	}

	reset() {
		this.#cache = {};
	}

	async uncheckedFetch(url, request) {
		return (0,_Constants__WEBPACK_IMPORTED_MODULE_1__.ORGFETCH)(url, request);
	}

	#isIgnored(origin, url) {
		if (this.#ignoredUrls[url])
			return true
		if (this.#ignoreDocumentOrigin && origin == CURRENTORIGIN)
			return true;
		if (this.#ignoredOrigins[origin])
			return true;

		return false
	}

	async #getChain(origin, data) {
		let chain = this.#cache[origin];
		if (!chain) {
			chain = this.#interceptorForOrigin(origin, data);
			this.#cache[origin] = chain;
		}

		return chain;
	}

	async #interceptorForOrigin(origin, data) {
		const result = [];
		for (let interceptor of this.#interceptors) {
			if (await interceptor.doAccept(data))
				result.push(interceptor)
		}

		return result;
	}
};

const INSTANCE = new Manager();
setTimeout(() => INSTANCE.ready, 10);


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
				url : new URL(aUrl, location),
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
/* harmony import */ var _Interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Interceptor */ "./src/Interceptor.js");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors/index.js");







_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs = _Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs || {};
_Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.httpinterceptor = _Utils__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.defaultjs.httpinterceptor || {
	VERSION : "${version}",
	Manager: _Manager__WEBPACK_IMPORTED_MODULE_3__["default"],
	Interceptor: _Interceptor__WEBPACK_IMPORTED_MODULE_4__["default"],
	interceptors: _interceptors__WEBPACK_IMPORTED_MODULE_5__["default"]
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
/* harmony import */ var _Interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Interceptor */ "./src/Interceptor.js");
/**
 * aSetup  =>
 * {
 * 	condition : [string | string[] | function(aData}],
 * 	fetchToken : function(),
 *  appendToken : function(aToken, aData),
 *  (optional) refreshInterval,
 *  (optional) refreshToken : function()
 * }
 */

const defaultTokenAppender = async (token, data) => {
	data.request.headers = data.request.headers || {};
	data.request.headers["Authorization"] = `Bearer ${token}`;
	return data;
}

;
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

		if(appendToken && typeof appendToken !== "function")
			throw new Error(`Parameter "appendToken" must be a "function"!`);
		this.#appendToken = appendToken || defaultTokenAppender;

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
			const timeout = async () => {
				if (this.#refreshToken)
					await this.#refreshToken(this.#lastData);
				else
					await this.#fetchToken(this.#lastData);

				setTimeout(timeout,this.#refreshInterval );
			};


			setTimeout(timeout , this.#refreshInterval);
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
/* harmony import */ var _OAuthInterceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OAuthInterceptor */ "./src/interceptors/OAuthInterceptor.js");
/* harmony import */ var _TokenInterceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TokenInterceptor */ "./src/interceptors/TokenInterceptor.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	OAuthInterceptor: _OAuthInterceptor__WEBPACK_IMPORTED_MODULE_0__["default"],
	TokenInterceptor: _TokenInterceptor__WEBPACK_IMPORTED_MODULE_1__["default"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2pCLGlCQUFpQjtBQUNqQixDQUFDOzs7Ozs7VUNQRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9VdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL1hNTEh0dHBSZXF1ZXN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvT0F1dGhJbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9Ub2tlbkludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5leHBvcnQgY29uc3QgT1JHRkVUQ0ggPSBHTE9CQUwuZmV0Y2g7IiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHtPUkdGRVRDSH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblx0XHJcbkdMT0JBTC5mZXRjaCA9IGFzeW5jIGZ1bmN0aW9uKGFVcmwsIGFSZXF1ZXN0KXtcclxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbik7XHJcblx0Y29uc3QgZGF0YSA9IGF3YWl0IE1hbmFnZXIuZG9JbnRlcmNlcHQoe1xyXG5cdFx0XHR1cmwgOiBuZXcgVVJMKGFVcmwsIGxvY2F0aW9uKSxcclxuXHRcdFx0cmVxdWVzdCA6IGFSZXF1ZXN0IHx8IHt9LFxyXG5cdFx0XHRtZXRhZGF0YSA6IHtcclxuXHRcdFx0XHRtZXRob2QgOiB0eXBlb2YgYVJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIgPyBcIkdFVFwiIDogKGFSZXF1ZXN0Lm1ldGhvZCB8fCBcIkdFVFwiKSxcclxuXHRcdFx0XHRvcmlnaW46IHVybC5vcmlnaW4sXHJcblx0XHRcdFx0cHJvdG9jb2wgOiB1cmwucHJvdG9jb2wsXHJcblx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRwb3J0OiB1cmwucG9ydCxcclxuXHRcdFx0XHRwYXRoIDogdXJsLnBhdGhuYW1lLFxyXG5cdFx0XHRcdGhhc2ggOiB1cmwuaGFzaCxcclxuXHRcdFx0XHRxdWVyeTogdXJsLnNlYXJjaCxcclxuXHRcdFx0XHRhc3luYyA6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRcdFxyXG5cdHJldHVybiBPUkdGRVRDSChkYXRhLnVybCwgZGF0YS5yZXF1ZXN0KTtcclxufTsiLCJpbXBvcnQge09SR0ZFVENIfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyY2VwdG9ye1xyXG4gICAgYXN5bmMgZG9BY2NlcHQoZGF0YSl7fVxyXG4gICAgYXN5bmMgZG9IYW5kbGUoZGF0YSl7fVxyXG4gICAgYXN5bmMgdW5jZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3Qpe1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG5cclxufTsiLCJpbXBvcnQgeyBHTE9CQUwgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBPUkdGRVRDSCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5jb25zdCBDVVJSRU5UT1JJR0lOID0gR0xPQkFMLmxvY2F0aW9uLm9yaWdpbjtcclxuXHJcbmNsYXNzIE1hbmFnZXIge1xyXG5cdCNjYWNoZSA9IHt9O1xyXG5cdCNpZ25vcmVkVXJscyA9IHt9O1xyXG5cdCNpZ25vcmVkT3JpZ2lucyA9IHt9O1xyXG5cdCNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IGZhbHNlO1xyXG5cdCNpbnRlcmNlcHRvcnMgPSBbXTtcclxuXHQjc2V0dXAgPSBbXTtcclxuXHQjcmVhZHlDaGVjaztcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0c2V0IGlnbm9yZURvY3VtZW50T3JpZ2luKHZhbHVlKSB7XHJcblx0XHR0aGlzLiNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YWRkT3JpZ2luVG9JZ25vcmUob3JpZ2lucykge1xyXG5cdFx0aWYgKG9yaWdpbnMgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0Zm9yIChsZXQgb3JpZ2luIG9mIG9yaWdpbnMpXHJcblx0XHRcdFx0dGhpcy4jaWdub3JlZE9yaWdpbnNbb3JpZ2luLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy4jaWdub3JlZE9yaWdpbnNbb3JpZ2lucy50b1N0cmluZygpXSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRhZGRVcmxUb0lnbm9yZSh1cmxzKSB7XHJcblx0XHRpZiAodXJscyBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRmb3IgKGxldCB1cmwgb2YgdXJscylcclxuXHRcdFx0XHR0aGlzLiNpZ25vcmVkVXJsc1t1cmwudG9TdHJpbmcoKV0gPSB0cnVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLiNpZ25vcmVkVXJsc1t1cmxzLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHVwKSB7XHJcblx0XHRpZiAodHlwZW9mIHNldHVwID09PSBcImZ1bmN0aW9uXCIgfHwgc2V0dXAgaW5zdGFuY2VvZiBQcm9taXNlKVxyXG5cdFx0XHR0aGlzLiNzZXR1cC5wdXNoKHNldHVwKTtcclxuXHR9XHJcblxyXG5cdGFkZEludGVyY2VwdG9yKGFJbnRlcmNlcHRvcikge1xyXG5cdFx0aWYoYUludGVyY2VwdG9yIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdHJldHVybiBhSW50ZXJjZXB0b3IuZm9yRWFjaChpbnRlcmNlcHRvciA9PiB0aGlzLmFkZEludGVyY2VwdG9yKGludGVyY2VwdG9yKSk7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvciAhPT0gXCJvYmplY3RcIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZnVuY3Rpb24gcmVxdWlyZWQgYW4gaW50ZXJjZXB0b3JcIik7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvci5kb0FjY2VwdCAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9BY2NlcHRcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yLmRvSGFuZGxlICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0hhbmRsZVxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cclxuXHRcdHRoaXMuI2ludGVyY2VwdG9ycy5wdXNoKGFJbnRlcmNlcHRvcik7XHJcblx0XHR0aGlzLnJlc2V0KCk7XHJcblx0fVxyXG5cclxuXHRnZXQgcmVhZHkoKSB7XHJcblx0XHRyZXR1cm4gKGFzeW5jICgpID0+IHtcdFx0XHRcclxuXHRcdFx0aWYgKHRoaXMuI3NldHVwLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0aWYodGhpcy4jcmVhZHlDaGVjaylcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHJcblx0XHRcdHRoaXMuI3JlYWR5Q2hlY2sgPSAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdHdoaWxlKHRoaXMuI3NldHVwLmxlbmd0aCAhPSAwKXtcclxuXHRcdFx0XHRcdGNvbnN0IHNldHVwID0gdGhpcy4jc2V0dXBbMF07XHJcblx0XHRcdFx0XHRpZiAoc2V0dXApe1xyXG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvcnMgPSBzZXR1cCBpbnN0YW5jZW9mIFByb21pc2UgPyBhd2FpdCBzZXR1cCA6IGF3YWl0IHNldHVwKCk7XHJcblx0XHRcdFx0XHRcdGlmKGludGVyY2VwdG9ycylcclxuXHRcdFx0XHRcdFx0XHRpbnRlcmNlcHRvcnMgaW5zdGFuY2VvZiBBcnJheSA/IGludGVyY2VwdG9ycy5mb3JFYWNoKGludGVyY2VwdG9yID0+IHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpKSA6IHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3JzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy4jc2V0dXAuc2hpZnQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4jcmVhZHlDaGVjayA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVhZHk7XHJcblx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHRcdH0pKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0ludGVyY2VwdChhRGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHJcblx0XHRjb25zdCBvcmlnaW4gPSBhRGF0YS5tZXRhZGF0YS5vcmlnaW47XHJcblxyXG5cdFx0aWYgKHRoaXMuI2lzSWdub3JlZChvcmlnaW4sIGFEYXRhLnVybC50b1N0cmluZygpKSlcclxuXHRcdFx0cmV0dXJuIGFEYXRhO1xyXG5cclxuXHRcdGNvbnN0IHsgdXJsLCBtZXRhZGF0YSB9ID0gYURhdGE7XHJcblx0XHRjb25zdCBjaGFpbiA9IGF3YWl0IHRoaXMuI2dldENoYWluKG9yaWdpbiwgeyB1cmwsIG1ldGFkYXRhIH0pO1xyXG5cdFx0aWYgKCFjaGFpbilcclxuXHRcdFx0cmV0dXJuIGFEYXRhO1xyXG5cclxuXHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIGNoYWluKVxyXG5cdFx0XHRhRGF0YSA9IGF3YWl0IGludGVyY2VwdG9yLmRvSGFuZGxlKGFEYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gYURhdGE7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuI2NhY2hlID0ge307XHJcblx0fVxyXG5cclxuXHRhc3luYyB1bmNoZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3QpIHtcclxuXHRcdHJldHVybiBPUkdGRVRDSCh1cmwsIHJlcXVlc3QpO1xyXG5cdH1cclxuXHJcblx0I2lzSWdub3JlZChvcmlnaW4sIHVybCkge1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZWRVcmxzW3VybF0pXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRpZiAodGhpcy4jaWdub3JlRG9jdW1lbnRPcmlnaW4gJiYgb3JpZ2luID09IENVUlJFTlRPUklHSU4pXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZWRPcmlnaW5zW29yaWdpbl0pXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0YXN5bmMgI2dldENoYWluKG9yaWdpbiwgZGF0YSkge1xyXG5cdFx0bGV0IGNoYWluID0gdGhpcy4jY2FjaGVbb3JpZ2luXTtcclxuXHRcdGlmICghY2hhaW4pIHtcclxuXHRcdFx0Y2hhaW4gPSB0aGlzLiNpbnRlcmNlcHRvckZvck9yaWdpbihvcmlnaW4sIGRhdGEpO1xyXG5cdFx0XHR0aGlzLiNjYWNoZVtvcmlnaW5dID0gY2hhaW47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNoYWluO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgI2ludGVyY2VwdG9yRm9yT3JpZ2luKG9yaWdpbiwgZGF0YSkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKGxldCBpbnRlcmNlcHRvciBvZiB0aGlzLiNpbnRlcmNlcHRvcnMpIHtcclxuXHRcdFx0aWYgKGF3YWl0IGludGVyY2VwdG9yLmRvQWNjZXB0KGRhdGEpKVxyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGludGVyY2VwdG9yKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgSU5TVEFOQ0UgPSBuZXcgTWFuYWdlcigpO1xyXG5zZXRUaW1lb3V0KCgpID0+IElOU1RBTkNFLnJlYWR5LCAxMCk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSU5TVEFOQ0U7XHJcbmV4cG9ydCB7TWFuYWdlcn07IiwiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcblx0aWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfVxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfVxuXHRyZXR1cm4ge307XG59KSgpO1xuXG5leHBvcnQge0dMT0JBTH07XG5jb25zdCBVdGlscyA9IHtcblx0R0xPQkFMIDogR0xPQkFMXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsgIiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmlmKHR5cGVvZiBHTE9CQUwuWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdGNvbnN0IE9SR1hIUiA9IEdMT0JBTC5YTUxIdHRwUmVxdWVzdDtcclxuXHRjb25zdCBleGVjdXRlUmVxdWVzdCA9IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdE9SR1hIUi5wcm90b3R5cGUub3Blbi5jYWxsKHRoaXMsIGFEYXRhLnJlcXVlc3QubWV0aG9kLCBhRGF0YS51cmwsIGFEYXRhLm1ldGFkYXRhLmFzeW5jLCBhRGF0YS5tZXRhZGF0YS51c2VybmFtZSwgYURhdGEubWV0YWRhdGEucGFzc3dvcmQpO1xyXG5cdFx0aWYodHlwZW9mIGFEYXRhLnJlcXVlc3QuaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYURhdGEucmVxdWVzdC5oZWFkZXJzKVxyXG5cdFx0XHQuZm9yRWFjaChhSGVhZGVyID0+e1xyXG5cdFx0XHRcdE9SR1hIUi5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlci5jYWxsKHRoaXMsIGFIZWFkZXIsIGFEYXRhLnJlcXVlc3QuaGVhZGVyc1thSGVhZGVyXSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0T1JHWEhSLnByb3RvdHlwZS5zZW5kLmNhbGwodGhpcywgYURhdGEucmVxdWVzdC5ib2R5KTtcclxuXHR9XHJcblx0Y29uc3QgWEhSID0gZnVuY3Rpb24gKCl7XHJcblx0XHRjb25zdCB4aHIgPSBuZXcgT1JHWEhSKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZGF0YSA9IHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbihhTmFtZSwgYVZhbHVlKXtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSBkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnNbYU5hbWVdID0gYVZhbHVlO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0eGhyLm9wZW4gPSBmdW5jdGlvbihhTWV0aG9kLCBhVXJsLCBpc0FzeW5jLCBhVXNlcm5hbWUsIGFQYXNzd29yZCl7XHJcblx0XHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uLm9yaWdpbik7XHJcblx0XHRcdGRhdGEgPSB7XHJcblx0XHRcdFx0dXJsIDogbmV3IFVSTChhVXJsLCBsb2NhdGlvbiksXHJcblx0XHRcdFx0cmVxdWVzdCA6IHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGFNZXRob2RcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdFx0bWV0aG9kIDogYU1ldGhvZCxcclxuXHRcdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdFx0YXN5bmMgOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lIDogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQgOiBhUGFzc3dvcmRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR4aHIuc2VuZCA9IGZ1bmN0aW9uKGFCb2R5KXtcclxuXHRcdFx0aWYoZGF0YS5tZXRhZGF0YS5hc3luYyl7XHJcblx0XHRcdFx0ZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTsgXHJcblx0ICAgIFx0XHRNYW5hZ2VyLmRvSW50ZXJjZXB0KGRhdGEpXHJcblx0ICAgIFx0XHQudGhlbihleGVjdXRlUmVxdWVzdC5iaW5kKHhocikpXHJcblx0ICAgIFx0XHRbXCJjYXRjaFwiXShjb25zb2xlLmVycm9yKTtcclxuXHRcdCAgICB9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRleGVjdXRlUmVxdWVzdC5jYWxsKHhociwgZGF0YSk7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHRyZXR1cm4geGhyO1xyXG5cdH07XHJcblx0XHJcblx0R0xPQkFMLlhNTEh0dHBSZXF1ZXN0ID0gWEhSO1xyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUgPSBPUkdYSFIucHJvdG90eXBlO1xyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBYSFI7XHJcbn0iLCJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuL0ludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBpbnRlcmNlcHRvcnMgZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcclxuR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgPSBHTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdE1hbmFnZXIsXHJcblx0SW50ZXJjZXB0b3IsXHJcblx0aW50ZXJjZXB0b3JzXHJcbn07IiwiaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiXHJcblxyXG5jb25zdCBPQXV0aEludGVyY2VwdG9yID0gZnVuY3Rpb24oYVNldHVwKXtcclxuXHRjb25zdCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KTtcclxuXHRcdHJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdO1xyXG5cdH07XHJcblx0cmV0dXJuIFRva2VuSW50ZXJjZXB0b3IoYVNldHVwKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9BdXRoSW50ZXJjZXB0b3I7XHJcbiIsIi8qKlxyXG4gKiBhU2V0dXAgID0+XHJcbiAqIHtcclxuICogXHRjb25kaXRpb24gOiBbc3RyaW5nIHwgc3RyaW5nW10gfCBmdW5jdGlvbihhRGF0YX1dLFxyXG4gKiBcdGZldGNoVG9rZW4gOiBmdW5jdGlvbigpLFxyXG4gKiAgYXBwZW5kVG9rZW4gOiBmdW5jdGlvbihhVG9rZW4sIGFEYXRhKSxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaEludGVydmFsLFxyXG4gKiAgKG9wdGlvbmFsKSByZWZyZXNoVG9rZW4gOiBmdW5jdGlvbigpXHJcbiAqIH1cclxuICovXHJcblxyXG5jb25zdCBkZWZhdWx0VG9rZW5BcHBlbmRlciA9IGFzeW5jICh0b2tlbiwgZGF0YSkgPT4ge1xyXG5cdGRhdGEucmVxdWVzdC5oZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHJcblx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke3Rva2VufWA7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi4vSW50ZXJjZXB0b3JcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5JbnRlcmNlcHRvciBleHRlbmRzIEludGVyY2VwdG9yIHtcclxuXHJcblx0I3Rva2VuID0gbnVsbDtcclxuXHQjbGFzdERhdGEgPSB7fTtcclxuXHQjY29uZGl0aW9uO1xyXG5cdCNmZXRjaFRva2VuO1xyXG5cdCNhcHBlbmRUb2tlbjtcclxuXHQjcmVmcmVzaEludGVydmFsO1xyXG5cdCNyZWZyZXNoVG9rZW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHsgY29uZGl0aW9uLCBmZXRjaFRva2VuLCBhcHBlbmRUb2tlbiwgcmVmcmVzaEludGVydmFsID0gNjAgKiAxMDAwLCByZWZyZXNoVG9rZW4gfSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGlmKHR5cGVvZiBjb25kaXRpb24gIT09IFwic3RyaW5nXCIgJiYgIShjb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSkgJiYgdHlwZW9mIGNvbmRpdGlvbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImNvbmRpdGlvblwiIG11c3QgYmUgYSBcInN0cmluZ1wiLCBcImFycmF5XCIgb3IgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YgZmV0Y2hUb2tlbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImZldGNoVG9rZW5cIiBtdXN0IGJlIGEgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jZmV0Y2hUb2tlbiA9IGZldGNoVG9rZW47XHJcblxyXG5cdFx0aWYoYXBwZW5kVG9rZW4gJiYgdHlwZW9mIGFwcGVuZFRva2VuICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiYXBwZW5kVG9rZW5cIiBtdXN0IGJlIGEgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jYXBwZW5kVG9rZW4gPSBhcHBlbmRUb2tlbiB8fCBkZWZhdWx0VG9rZW5BcHBlbmRlcjtcclxuXHJcblx0XHR0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgPSByZWZyZXNoSW50ZXJ2YWw7XHJcblx0XHR0aGlzLiNyZWZyZXNoVG9rZW4gPSByZWZyZXNoVG9rZW47XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0FjY2VwdChkYXRhKSB7XHJcblx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHRoaXMuI2NvbmRpdGlvbjtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuI2NvbmRpdGlvbjtcclxuXHRcdGNvbnN0IG9yaWdpbiA9IGRhdGEubWV0YWRhdGEub3JpZ2luO1xyXG5cdFx0aWYgKHR5cGUgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGF3YWl0IGNvbmRpdGlvbihkYXRhKTtcclxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHJldHVybiBjb25kaXRpb24gPT0gb3JpZ2luO1xyXG5cdFx0ZWxzZSBpZiAoY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdHJldHVybiBjb25kaXRpb24uaW5jbHVkZXMob3JpZ2luKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0hhbmRsZShkYXRhKSB7XHJcblx0XHRpZiAoIXRoaXMuI3Rva2VuKSB7XHJcblx0XHRcdGNvbnN0IHsgdXJsLCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdFx0dGhpcy4jbGFzdERhdGEgPSB7IHVybCwgbWV0YWRhdGEgfTtcclxuXHRcdFx0dGhpcy4jdG9rZW4gPSB0aGlzLiNmZXRjaFRva2VuKHsgdXJsLCBtZXRhZGF0YSB9KTtcclxuXHRcdFx0dGhpcy4jc3RhcnRSZWZyZXNoKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2NhbGxBcHBlbmRUb2tlbihkYXRhKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jICNjYWxsQXBwZW5kVG9rZW4oZGF0YSkge1xyXG5cdFx0Y29uc3QgYXBwZW5kZXIgPSB0aGlzLiNhcHBlbmRUb2tlbjtcclxuXHRcdGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy4jdG9rZW47XHJcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBhcHBlbmRlcih0b2tlbiwgZGF0YSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdCA/IHJlc3VsdCA6IGRhdGE7XHJcblx0fVxyXG5cclxuXHQjc3RhcnRSZWZyZXNoKCkge1xyXG5cdFx0aWYgKHRoaXMuI3JlZnJlc2hJbnRlcnZhbCA+IDApIHtcclxuXHRcdFx0Y29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy4jcmVmcmVzaFRva2VuIHx8ICgoKSA9PiB0aGlzLiNmZXRjaFRva2VuKHRoaXMuI2xhc3REYXRhKSk7XHJcblx0XHRcdGNvbnN0IHRpbWVvdXQgPSBhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuI3JlZnJlc2hUb2tlbilcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuI3JlZnJlc2hUb2tlbih0aGlzLiNsYXN0RGF0YSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy4jZmV0Y2hUb2tlbih0aGlzLiNsYXN0RGF0YSk7XHJcblxyXG5cdFx0XHRcdHNldFRpbWVvdXQodGltZW91dCx0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgKTtcclxuXHRcdFx0fTtcclxuXHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KHRpbWVvdXQgLCB0aGlzLiNyZWZyZXNoSW50ZXJ2YWwpO1xyXG5cdFx0fVxyXG5cdH1cclxufTsiLCJpbXBvcnQgT0F1dGhJbnRlcmNlcHRvciBmcm9tIFwiLi9PQXV0aEludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAge1xyXG5cdE9BdXRoSW50ZXJjZXB0b3IsXHJcblx0VG9rZW5JbnRlcmNlcHRvclxyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3NyYy9pbmRleFwiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==