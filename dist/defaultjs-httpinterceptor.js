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
/* harmony export */   ORGFETCH: () => (/* binding */ ORGFETCH)
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


/**
 * Interface for classes that represents a request intercepter implementation.
 * 
 * @interface
 */
class Interceptor {
	/**
	 * @param {object} data
	 * @param {(string|URL)} data.url
	 * @param {(object|Request)} data.request
	 * @param {object} data.metadata
	 * @param {string} data.metadata.method
	 * @param {string} data.metadata.origin
	 * @param {string} data.metadata.protocol
	 * @param {string} data.metadata.hostname
	 * @param {number} data.metadata.port
	 * @param {string} data.metadata.path
	 * @param {string} data.metadata.hash
	 * @param {URLSearchParams} data.metadata.query
	 * @param {boolean} data.metadata.async
	 * @returns {boolean}
	 */
	async doAccept(data) {}
	/**
	 * @param {object} data
	 * @param {(string|URL)} data.url
	 * @param {(object|Request)} data.request
	 * @param {object} data.metadata
	 * @param {string} data.metadata.method
	 * @param {string} data.metadata.origin
	 * @param {string} data.metadata.protocol
	 * @param {string} data.metadata.hostname
	 * @param {number} data.metadata.port
	 * @param {string} data.metadata.path
	 * @param {string} data.metadata.hash
	 * @param {URLSearchParams} data.metadata.query
	 * @param {boolean} data.metadata.async
	 * @returns {object} the manipulated data
	 */
	async doHandle(data) {}

	/**
	 *
	 * @param {(string|URL)} url
	 * @param {(object|Request)} request
	 * @returns {Response}
	 */
	async unceckedFetch(url, request) {
		return (0,_Constants__WEBPACK_IMPORTED_MODULE_0__.ORGFETCH)(url, request);
	}
}


/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Manager: () => (/* binding */ Manager),
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

	/**
	 * 
	 * @param {object} data 
	 * @param {(string|URL)} data.url
	 * @param {(object|Request)} data.request
	 * @param {object} data.metadata
	 * @param {string} data.metadata.method
	 * @param {string} data.metadata.origin
	 * @param {string} data.metadata.protocol
	 * @param {string} data.metadata.hostname
	 * @param {number} data.metadata.port
	 * @param {string} data.metadata.path
	 * @param {string} data.metadata.hash
	 * @param {URLSearchParams} data.metadata.query
	 * @param {boolean} data.metadata.async
	 * @returns {object} the manipulated data
	 */
	async doIntercept(data) {
		await this.ready;
		
		const origin = data.metadata.origin;

		if (this.#isIgnored(origin, data.url.toString()))
			return data;

		const { url, metadata } = data;
		const chain = await this.#getChain(origin, { url, metadata });
		if (!chain)
			return data;

		for (let interceptor of chain)
			data = await interceptor.doHandle(data);

		return data;
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
/* harmony export */   GLOBAL: () => (/* binding */ GLOBAL),
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
	const OPEN = ORGXHR.prototype.open;
	const SETREQUESTHEADER = ORGXHR.prototype.setRequestHeader;
	const SEND = ORGXHR.prototype.send;

	const executeRequest = (aXHR, { url, 
		request: {method, headers, body}, 
		metadata:{async, username, password}}) => {
		url = typeof url === "string" ? url : url.toString();
		OPEN.call(aXHR, method, url, async, username, password);
		if(typeof headers !== "undefined")
			Object.getOwnPropertyNames(headers)
			.forEach(header =>{
				SETREQUESTHEADER.call(aXHR, header, headers[header]);
			});
		SEND.call(aXHR, body);
	};

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
			data.request.body = aBody; 
			_Manager__WEBPACK_IMPORTED_MODULE_0__["default"].doIntercept(data)
			.then((data) => executeRequest(xhr, data))
			["catch"](console.error);
		};
		
		return xhr;
	};
	
	_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest = XHR;
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./src/index.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9Db25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9GZXRjaC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL0ludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvWE1MSHR0cFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9PQXV0aEludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL1Rva2VuSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmV4cG9ydCBjb25zdCBPUkdGRVRDSCA9IEdMT0JBTC5mZXRjaDsiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQge09SR0ZFVENIfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHRcclxuR0xPQkFMLmZldGNoID0gYXN5bmMgZnVuY3Rpb24oYVVybCwgYVJlcXVlc3Qpe1xyXG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uKTtcclxuXHRjb25zdCBkYXRhID0gYXdhaXQgTWFuYWdlci5kb0ludGVyY2VwdCh7XHJcblx0XHRcdHVybCA6IG5ldyBVUkwoYVVybCwgbG9jYXRpb24pLFxyXG5cdFx0XHRyZXF1ZXN0IDogYVJlcXVlc3QgfHwge30sXHJcblx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdG1ldGhvZCA6IHR5cGVvZiBhUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiR0VUXCIgOiAoYVJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCIpLFxyXG5cdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRwcm90b2NvbCA6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG5cdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdHBhdGggOiB1cmwucGF0aG5hbWUsXHJcblx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdGFzeW5jIDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdFx0XHJcblx0cmV0dXJuIE9SR0ZFVENIKGRhdGEudXJsLCBkYXRhLnJlcXVlc3QpO1xyXG59OyIsImltcG9ydCB7IE9SR0ZFVENIIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBjbGFzc2VzIHRoYXQgcmVwcmVzZW50cyBhIHJlcXVlc3QgaW50ZXJjZXB0ZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqIFxyXG4gKiBAaW50ZXJmYWNlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmNlcHRvciB7XHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGFcclxuXHQgKiBAcGFyYW0geyhzdHJpbmd8VVJMKX0gZGF0YS51cmxcclxuXHQgKiBAcGFyYW0geyhvYmplY3R8UmVxdWVzdCl9IGRhdGEucmVxdWVzdFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhLm1ldGFkYXRhXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEubWV0aG9kXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEub3JpZ2luXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEucHJvdG9jb2xcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5ob3N0bmFtZVxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhLm1ldGFkYXRhLnBvcnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5wYXRoXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEuaGFzaFxyXG5cdCAqIEBwYXJhbSB7VVJMU2VhcmNoUGFyYW1zfSBkYXRhLm1ldGFkYXRhLnF1ZXJ5XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBkYXRhLm1ldGFkYXRhLmFzeW5jXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0YXN5bmMgZG9BY2NlcHQoZGF0YSkge31cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xVUkwpfSBkYXRhLnVybFxyXG5cdCAqIEBwYXJhbSB7KG9iamVjdHxSZXF1ZXN0KX0gZGF0YS5yZXF1ZXN0XHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGEubWV0YWRhdGFcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5tZXRob2RcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5vcmlnaW5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5wcm90b2NvbFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLmhvc3RuYW1lXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRhdGEubWV0YWRhdGEucG9ydFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLnBhdGhcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5oYXNoXHJcblx0ICogQHBhcmFtIHtVUkxTZWFyY2hQYXJhbXN9IGRhdGEubWV0YWRhdGEucXVlcnlcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRhdGEubWV0YWRhdGEuYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSB0aGUgbWFuaXB1bGF0ZWQgZGF0YVxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvSGFuZGxlKGRhdGEpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHsoc3RyaW5nfFVSTCl9IHVybFxyXG5cdCAqIEBwYXJhbSB7KG9iamVjdHxSZXF1ZXN0KX0gcmVxdWVzdFxyXG5cdCAqIEByZXR1cm5zIHtSZXNwb25zZX1cclxuXHQgKi9cclxuXHRhc3luYyB1bmNlY2tlZEZldGNoKHVybCwgcmVxdWVzdCkge1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEdMT0JBTCB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IE9SR0ZFVENIIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcbmNvbnN0IENVUlJFTlRPUklHSU4gPSBHTE9CQUwubG9jYXRpb24ub3JpZ2luO1xyXG5cclxuY2xhc3MgTWFuYWdlciB7XHJcblx0I2NhY2hlID0ge307XHJcblx0I2lnbm9yZWRVcmxzID0ge307XHJcblx0I2lnbm9yZWRPcmlnaW5zID0ge307XHJcblx0I2lnbm9yZURvY3VtZW50T3JpZ2luID0gZmFsc2U7XHJcblx0I2ludGVyY2VwdG9ycyA9IFtdO1xyXG5cdCNzZXR1cCA9IFtdO1xyXG5cdCNyZWFkeUNoZWNrO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHRzZXQgaWdub3JlRG9jdW1lbnRPcmlnaW4odmFsdWUpIHtcclxuXHRcdHRoaXMuI2lnbm9yZURvY3VtZW50T3JpZ2luID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRhZGRPcmlnaW5Ub0lnbm9yZShvcmlnaW5zKSB7XHJcblx0XHRpZiAob3JpZ2lucyBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRmb3IgKGxldCBvcmlnaW4gb2Ygb3JpZ2lucylcclxuXHRcdFx0XHR0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW4udG9TdHJpbmcoKV0gPSB0cnVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5zLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGFkZFVybFRvSWdub3JlKHVybHMpIHtcclxuXHRcdGlmICh1cmxzIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdGZvciAobGV0IHVybCBvZiB1cmxzKVxyXG5cdFx0XHRcdHRoaXMuI2lnbm9yZWRVcmxzW3VybC50b1N0cmluZygpXSA9IHRydWU7XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuI2lnbm9yZWRVcmxzW3VybHMudG9TdHJpbmcoKV0gPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0c2V0dXAoc2V0dXApIHtcclxuXHRcdGlmICh0eXBlb2Ygc2V0dXAgPT09IFwiZnVuY3Rpb25cIiB8fCBzZXR1cCBpbnN0YW5jZW9mIFByb21pc2UpXHJcblx0XHRcdHRoaXMuI3NldHVwLnB1c2goc2V0dXApO1xyXG5cdH1cclxuXHJcblx0YWRkSW50ZXJjZXB0b3IoYUludGVyY2VwdG9yKSB7XHJcblx0XHRpZihhSW50ZXJjZXB0b3IgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0cmV0dXJuIGFJbnRlcmNlcHRvci5mb3JFYWNoKGludGVyY2VwdG9yID0+IHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yICE9PSBcIm9iamVjdFwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJmdW5jdGlvbiByZXF1aXJlZCBhbiBpbnRlcmNlcHRvclwiKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yLmRvQWNjZXB0ICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0FjY2VwdFxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cdFx0aWYgKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9IYW5kbGUgIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXFxcImRvSGFuZGxlXFxcIiBmdW5jdGlvbiFcIik7XHJcblxyXG5cdFx0dGhpcy4jaW50ZXJjZXB0b3JzLnB1c2goYUludGVyY2VwdG9yKTtcclxuXHRcdHRoaXMucmVzZXQoKTtcclxuXHR9XHJcblxyXG5cdGdldCByZWFkeSgpIHtcclxuXHRcdHJldHVybiAoYXN5bmMgKCkgPT4ge1x0XHRcdFxyXG5cdFx0XHRpZiAodGhpcy4jc2V0dXAubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHRpZih0aGlzLiNyZWFkeUNoZWNrKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLiNyZWFkeUNoZWNrO1xyXG5cclxuXHRcdFx0dGhpcy4jcmVhZHlDaGVjayA9IChhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0d2hpbGUodGhpcy4jc2V0dXAubGVuZ3RoICE9IDApe1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2V0dXAgPSB0aGlzLiNzZXR1cFswXTtcclxuXHRcdFx0XHRcdGlmIChzZXR1cCl7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGludGVyY2VwdG9ycyA9IHNldHVwIGluc3RhbmNlb2YgUHJvbWlzZSA/IGF3YWl0IHNldHVwIDogYXdhaXQgc2V0dXAoKTtcclxuXHRcdFx0XHRcdFx0aWYoaW50ZXJjZXB0b3JzKVxyXG5cdFx0XHRcdFx0XHRcdGludGVyY2VwdG9ycyBpbnN0YW5jZW9mIEFycmF5ID8gaW50ZXJjZXB0b3JzLmZvckVhY2goaW50ZXJjZXB0b3IgPT4gdGhpcy5hZGRJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikpIDogdGhpcy5hZGRJbnRlcmNlcHRvcihpbnRlcmNlcHRvcnMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR0aGlzLiNzZXR1cC5zaGlmdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLiNyZWFkeUNoZWNrID0gbnVsbDtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZWFkeTtcclxuXHRcdFx0fSkoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLiNyZWFkeUNoZWNrO1xyXG5cdFx0fSkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFxyXG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xVUkwpfSBkYXRhLnVybFxyXG5cdCAqIEBwYXJhbSB7KG9iamVjdHxSZXF1ZXN0KX0gZGF0YS5yZXF1ZXN0XHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGEubWV0YWRhdGFcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5tZXRob2RcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5vcmlnaW5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5wcm90b2NvbFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLmhvc3RuYW1lXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRhdGEubWV0YWRhdGEucG9ydFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLnBhdGhcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5oYXNoXHJcblx0ICogQHBhcmFtIHtVUkxTZWFyY2hQYXJhbXN9IGRhdGEubWV0YWRhdGEucXVlcnlcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRhdGEubWV0YWRhdGEuYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSB0aGUgbWFuaXB1bGF0ZWQgZGF0YVxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvSW50ZXJjZXB0KGRhdGEpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRcclxuXHRcdGNvbnN0IG9yaWdpbiA9IGRhdGEubWV0YWRhdGEub3JpZ2luO1xyXG5cclxuXHRcdGlmICh0aGlzLiNpc0lnbm9yZWQob3JpZ2luLCBkYXRhLnVybC50b1N0cmluZygpKSlcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblxyXG5cdFx0Y29uc3QgeyB1cmwsIG1ldGFkYXRhIH0gPSBkYXRhO1xyXG5cdFx0Y29uc3QgY2hhaW4gPSBhd2FpdCB0aGlzLiNnZXRDaGFpbihvcmlnaW4sIHsgdXJsLCBtZXRhZGF0YSB9KTtcclxuXHRcdGlmICghY2hhaW4pXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cclxuXHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIGNoYWluKVxyXG5cdFx0XHRkYXRhID0gYXdhaXQgaW50ZXJjZXB0b3IuZG9IYW5kbGUoZGF0YSk7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuI2NhY2hlID0ge307XHJcblx0fVxyXG5cclxuXHRhc3luYyB1bmNoZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3QpIHtcclxuXHRcdHJldHVybiBPUkdGRVRDSCh1cmwsIHJlcXVlc3QpO1xyXG5cdH1cclxuXHJcblx0I2lzSWdub3JlZChvcmlnaW4sIHVybCkge1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZWRVcmxzW3VybF0pXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRpZiAodGhpcy4jaWdub3JlRG9jdW1lbnRPcmlnaW4gJiYgb3JpZ2luID09IENVUlJFTlRPUklHSU4pXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZWRPcmlnaW5zW29yaWdpbl0pXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0YXN5bmMgI2dldENoYWluKG9yaWdpbiwgZGF0YSkge1xyXG5cdFx0bGV0IGNoYWluID0gdGhpcy4jY2FjaGVbb3JpZ2luXTtcclxuXHRcdGlmICghY2hhaW4pIHtcclxuXHRcdFx0Y2hhaW4gPSB0aGlzLiNpbnRlcmNlcHRvckZvck9yaWdpbihvcmlnaW4sIGRhdGEpO1xyXG5cdFx0XHR0aGlzLiNjYWNoZVtvcmlnaW5dID0gY2hhaW47XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNoYWluO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgI2ludGVyY2VwdG9yRm9yT3JpZ2luKG9yaWdpbiwgZGF0YSkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKGxldCBpbnRlcmNlcHRvciBvZiB0aGlzLiNpbnRlcmNlcHRvcnMpIHtcclxuXHRcdFx0aWYgKGF3YWl0IGludGVyY2VwdG9yLmRvQWNjZXB0KGRhdGEpKVxyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGludGVyY2VwdG9yKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgSU5TVEFOQ0UgPSBuZXcgTWFuYWdlcigpO1xyXG5zZXRUaW1lb3V0KCgpID0+IElOU1RBTkNFLnJlYWR5LCAxMCk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSU5TVEFOQ0U7XHJcbmV4cG9ydCB7TWFuYWdlcn07IiwiY29uc3QgR0xPQkFMID0gKCgpID0+IHtcblx0aWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfVxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfVxuXHRyZXR1cm4ge307XG59KSgpO1xuXG5leHBvcnQge0dMT0JBTH07XG5jb25zdCBVdGlscyA9IHtcblx0R0xPQkFMIDogR0xPQkFMXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsgIiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuXHJcbmlmKHR5cGVvZiBHTE9CQUwuWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdGNvbnN0IE9SR1hIUiA9IEdMT0JBTC5YTUxIdHRwUmVxdWVzdDtcclxuXHRjb25zdCBPUEVOID0gT1JHWEhSLnByb3RvdHlwZS5vcGVuO1xyXG5cdGNvbnN0IFNFVFJFUVVFU1RIRUFERVIgPSBPUkdYSFIucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI7XHJcblx0Y29uc3QgU0VORCA9IE9SR1hIUi5wcm90b3R5cGUuc2VuZDtcclxuXHJcblx0Y29uc3QgZXhlY3V0ZVJlcXVlc3QgPSAoYVhIUiwgeyB1cmwsIFxyXG5cdFx0cmVxdWVzdDoge21ldGhvZCwgaGVhZGVycywgYm9keX0sIFxyXG5cdFx0bWV0YWRhdGE6e2FzeW5jLCB1c2VybmFtZSwgcGFzc3dvcmR9fSkgPT4ge1xyXG5cdFx0dXJsID0gdHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIiA/IHVybCA6IHVybC50b1N0cmluZygpO1xyXG5cdFx0T1BFTi5jYWxsKGFYSFIsIG1ldGhvZCwgdXJsLCBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkKTtcclxuXHRcdGlmKHR5cGVvZiBoZWFkZXJzICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKVxyXG5cdFx0XHQuZm9yRWFjaChoZWFkZXIgPT57XHJcblx0XHRcdFx0U0VUUkVRVUVTVEhFQURFUi5jYWxsKGFYSFIsIGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuXHRcdFx0fSk7XHJcblx0XHRTRU5ELmNhbGwoYVhIUiwgYm9keSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgWEhSID0gZnVuY3Rpb24gKCl7XHJcblx0XHRjb25zdCB4aHIgPSBuZXcgT1JHWEhSKGFyZ3VtZW50cyk7XHJcblx0XHRsZXQgZGF0YSA9IHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbihhTmFtZSwgYVZhbHVlKXtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSBkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnNbYU5hbWVdID0gYVZhbHVlO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0eGhyLm9wZW4gPSBmdW5jdGlvbihhTWV0aG9kLCBhVXJsLCBpc0FzeW5jLCBhVXNlcm5hbWUsIGFQYXNzd29yZCl7XHJcblx0XHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uLm9yaWdpbik7XHJcblx0XHRcdGRhdGEgPSB7XHJcblx0XHRcdFx0dXJsIDogbmV3IFVSTChhVXJsLCBsb2NhdGlvbiksXHJcblx0XHRcdFx0cmVxdWVzdCA6IHtcclxuXHRcdFx0XHRcdG1ldGhvZCA6IGFNZXRob2RcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdFx0bWV0aG9kIDogYU1ldGhvZCxcclxuXHRcdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdFx0YXN5bmMgOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lIDogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQgOiBhUGFzc3dvcmRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR4aHIuc2VuZCA9IGZ1bmN0aW9uKGFCb2R5KXtcclxuXHRcdFx0ZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTsgXHJcblx0XHRcdE1hbmFnZXIuZG9JbnRlcmNlcHQoZGF0YSlcclxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IGV4ZWN1dGVSZXF1ZXN0KHhociwgZGF0YSkpXHJcblx0XHRcdFtcImNhdGNoXCJdKGNvbnNvbGUuZXJyb3IpO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHhocjtcclxuXHR9O1xyXG5cdFxyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdCA9IFhIUjtcclxufSIsImltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgXCIuL1hNTEh0dHBSZXF1ZXN0XCI7XHJcbmltcG9ydCBcIi4vRmV0Y2hcIjtcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQgSW50ZXJjZXB0b3IgZnJvbSBcIi4vSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IGludGVyY2VwdG9ycyBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcclxuXHJcbkdMT0JBTC5kZWZhdWx0anMgPSBHTE9CQUwuZGVmYXVsdGpzIHx8IHt9O1xyXG5HTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciA9IEdMT0JBTC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yIHx8IHtcclxuXHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0TWFuYWdlcixcclxuXHRJbnRlcmNlcHRvcixcclxuXHRpbnRlcmNlcHRvcnNcclxufTsiLCJpbXBvcnQgVG9rZW5JbnRlcmNlcHRvciBmcm9tIFwiLi9Ub2tlbkludGVyY2VwdG9yXCJcclxuXHJcbmNvbnN0IE9BdXRoSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihhU2V0dXApe1xyXG5cdGNvbnN0IHNldHVwID0gYVNldHVwO1xyXG5cdHNldHVwLmZldGNoVG9rZW4gPSBhc3luYyAoKSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHNldHVwLmxvZ2luLnVybCwge1xyXG5cdFx0XHRtZXRob2Q6IChzZXR1cC5sb2dpbi5tZXRob2QgfHwgXCJnZXRcIilcclxuXHRcdH0pO1xyXG5cdFx0cmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRyZXR1cm4gcmVzcG9uc2Vbc2V0dXAubG9naW4ucmVzcG9uc2UudmFsdWVTZWxlY3Rvcl07XHJcblx0fTtcclxuXHRyZXR1cm4gVG9rZW5JbnRlcmNlcHRvcihhU2V0dXApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT0F1dGhJbnRlcmNlcHRvcjtcclxuIiwiLyoqXHJcbiAqIGFTZXR1cCAgPT5cclxuICoge1xyXG4gKiBcdGNvbmRpdGlvbiA6IFtzdHJpbmcgfCBzdHJpbmdbXSB8IGZ1bmN0aW9uKGFEYXRhfV0sXHJcbiAqIFx0ZmV0Y2hUb2tlbiA6IGZ1bmN0aW9uKCksXHJcbiAqICBhcHBlbmRUb2tlbiA6IGZ1bmN0aW9uKGFUb2tlbiwgYURhdGEpLFxyXG4gKiAgKG9wdGlvbmFsKSByZWZyZXNoSW50ZXJ2YWwsXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hUb2tlbiA6IGZ1bmN0aW9uKClcclxuICogfVxyXG4gKi9cclxuXHJcbmNvbnN0IGRlZmF1bHRUb2tlbkFwcGVuZGVyID0gYXN5bmMgKHRva2VuLCBkYXRhKSA9PiB7XHJcblx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSBkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRkYXRhLnJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuLi9JbnRlcmNlcHRvclwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2tlbkludGVyY2VwdG9yIGV4dGVuZHMgSW50ZXJjZXB0b3Ige1xyXG5cclxuXHQjdG9rZW4gPSBudWxsO1xyXG5cdCNsYXN0RGF0YSA9IHt9O1xyXG5cdCNjb25kaXRpb247XHJcblx0I2ZldGNoVG9rZW47XHJcblx0I2FwcGVuZFRva2VuO1xyXG5cdCNyZWZyZXNoSW50ZXJ2YWw7XHJcblx0I3JlZnJlc2hUb2tlbjtcclxuXHJcblx0Y29uc3RydWN0b3IoeyBjb25kaXRpb24sIGZldGNoVG9rZW4sIGFwcGVuZFRva2VuLCByZWZyZXNoSW50ZXJ2YWwgPSA2MCAqIDEwMDAsIHJlZnJlc2hUb2tlbiB9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0aWYodHlwZW9mIGNvbmRpdGlvbiAhPT0gXCJzdHJpbmdcIiAmJiAhKGNvbmRpdGlvbiBpbnN0YW5jZW9mIEFycmF5KSAmJiB0eXBlb2YgY29uZGl0aW9uICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiY29uZGl0aW9uXCIgbXVzdCBiZSBhIFwic3RyaW5nXCIsIFwiYXJyYXlcIiBvciBcImZ1bmN0aW9uXCIhYCk7XHJcblx0XHR0aGlzLiNjb25kaXRpb24gPSBjb25kaXRpb247XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZiBmZXRjaFRva2VuICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiZmV0Y2hUb2tlblwiIG11c3QgYmUgYSBcImZ1bmN0aW9uXCIhYCk7XHJcblx0XHR0aGlzLiNmZXRjaFRva2VuID0gZmV0Y2hUb2tlbjtcclxuXHJcblx0XHRpZihhcHBlbmRUb2tlbiAmJiB0eXBlb2YgYXBwZW5kVG9rZW4gIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJhcHBlbmRUb2tlblwiIG11c3QgYmUgYSBcImZ1bmN0aW9uXCIhYCk7XHJcblx0XHR0aGlzLiNhcHBlbmRUb2tlbiA9IGFwcGVuZFRva2VuIHx8IGRlZmF1bHRUb2tlbkFwcGVuZGVyO1xyXG5cclxuXHRcdHRoaXMuI3JlZnJlc2hJbnRlcnZhbCA9IHJlZnJlc2hJbnRlcnZhbDtcclxuXHRcdHRoaXMuI3JlZnJlc2hUb2tlbiA9IHJlZnJlc2hUb2tlbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRvQWNjZXB0KGRhdGEpIHtcclxuXHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdGhpcy4jY29uZGl0aW9uO1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy4jY29uZGl0aW9uO1xyXG5cdFx0Y29uc3Qgb3JpZ2luID0gZGF0YS5tZXRhZGF0YS5vcmlnaW47XHJcblx0XHRpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYXdhaXQgY29uZGl0aW9uKGRhdGEpO1xyXG5cdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGNvbmRpdGlvbiA9PSBvcmlnaW47XHJcblx0XHRlbHNlIGlmIChjb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0cmV0dXJuIGNvbmRpdGlvbi5pbmNsdWRlcyhvcmlnaW4pO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRvSGFuZGxlKGRhdGEpIHtcclxuXHRcdGlmICghdGhpcy4jdG9rZW4pIHtcclxuXHRcdFx0Y29uc3QgeyB1cmwsIG1ldGFkYXRhIH0gPSBkYXRhO1xyXG5cdFx0XHR0aGlzLiNsYXN0RGF0YSA9IHsgdXJsLCBtZXRhZGF0YSB9O1xyXG5cdFx0XHR0aGlzLiN0b2tlbiA9IHRoaXMuI2ZldGNoVG9rZW4oeyB1cmwsIG1ldGFkYXRhIH0pO1xyXG5cdFx0XHR0aGlzLiNzdGFydFJlZnJlc2goKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jY2FsbEFwcGVuZFRva2VuKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgI2NhbGxBcHBlbmRUb2tlbihkYXRhKSB7XHJcblx0XHRjb25zdCBhcHBlbmRlciA9IHRoaXMuI2FwcGVuZFRva2VuO1xyXG5cdFx0Y29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLiN0b2tlbjtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFwcGVuZGVyKHRva2VuLCBkYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0ID8gcmVzdWx0IDogZGF0YTtcclxuXHR9XHJcblxyXG5cdCNzdGFydFJlZnJlc2goKSB7XHJcblx0XHRpZiAodGhpcy4jcmVmcmVzaEludGVydmFsID4gMCkge1xyXG5cdFx0XHRjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLiNyZWZyZXNoVG9rZW4gfHwgKCgpID0+IHRoaXMuI2ZldGNoVG9rZW4odGhpcy4jbGFzdERhdGEpKTtcclxuXHRcdFx0Y29uc3QgdGltZW91dCA9IGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy4jcmVmcmVzaFRva2VuKVxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy4jcmVmcmVzaFRva2VuKHRoaXMuI2xhc3REYXRhKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLiNmZXRjaFRva2VuKHRoaXMuI2xhc3REYXRhKTtcclxuXHJcblx0XHRcdFx0c2V0VGltZW91dCh0aW1lb3V0LHRoaXMuI3JlZnJlc2hJbnRlcnZhbCApO1xyXG5cdFx0XHR9O1xyXG5cclxuXHJcblx0XHRcdHNldFRpbWVvdXQodGltZW91dCAsIHRoaXMuI3JlZnJlc2hJbnRlcnZhbCk7XHJcblx0XHR9XHJcblx0fVxyXG59OyIsImltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gXCIuL09BdXRoSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICB7XHJcblx0T0F1dGhJbnRlcmNlcHRvcixcclxuXHRUb2tlbkludGVyY2VwdG9yXHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9