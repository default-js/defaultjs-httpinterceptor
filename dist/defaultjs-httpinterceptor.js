/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Interceptor)
/* harmony export */ });
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants.js */ "./src/Constants.js");
/* harmony import */ var _TypeDefs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TypeDefs.js */ "./src/TypeDefs.js");
/* harmony import */ var _TypeDefs_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TypeDefs_js__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Interface for classes that represents a request intercepter implementation.
 * 
 * @interface
 */
class Interceptor {
	/**
	 * @async
	 * @param {InterceptorData} data 
	 */
	async doAccept(data) {}
	/**
	 * @async
	 * @param {InterceptorData} data 
	 * @returns {InterceptorData | undefined }
	 */
	async doHandle(data) {}

	/**
	 * @async
	 * @param {(string|URL)} url
	 * @param {(object|Request)} request
	 * @returns {Promise<Response>}
	 */
	async unceckedFetch(url, request) {
		return (0,_Constants_js__WEBPACK_IMPORTED_MODULE_0__.ORGFETCH)(url, request);
	}
}


/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/TypeDefs.js":
/*!*************************!*\
  !*** ./src/TypeDefs.js ***!
  \*************************/
/***/ (() => {


/** 
 * @typedef {object} Metadata
 * @property {string} method
 * @property {string} origin
 * @property {string} protocol
 * @property {string} hostname
 * @property {string|number} port
 * @property {string} path
 * @property {URLSearchParams} query
 * @property {string} hash
 * @property {boolean} async
 * @property {string} username
 * @property {string} password
 */

/** 
 * @typedef {object} InterceptorData
 * @property {URL} url
 * @property {Request} request
 * @property {Metadata} metadata
*/

/***/ }),

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.js");
/* harmony import */ var _TypeDefs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TypeDefs.js */ "./src/TypeDefs.js");
/* harmony import */ var _TypeDefs_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_TypeDefs_js__WEBPACK_IMPORTED_MODULE_2__);




((XMLHttpRequest) => {
	class ExtXMLHttpRequest extends XMLHttpRequest {
		/**
		 * @type {InterceptorData}
		 */
		#data;

		constructor(options) {
			super(options);
		}

		setRequestHeader(aName, aValue) {
			this.#data.request.headers = this.#data.request.headers || {};
			this.#data.request.headers[aName] = aValue;
		}

		open(aMethod, aUrl, isAsync, aUsername, aPassword) {
			const url = new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.location.origin);

			this.#data = {
				url: new URL(aUrl, location),
				request: {
					method: aMethod,
				},
				metadata: {
					method: aMethod,
					origin: url.origin,
					protocol: url.protocol,
					hostname: url.hostname,
					port: url.port,
					path: url.pathname,
					query: url.search,
					hash: url.hash,
					async: typeof isAsync === "boolean" ? isAsync : true,
					username: aUsername,
					password: aPassword,
				},
			};
		}

		send(aBody) {
			this.#data.request.body = aBody;
			_Manager__WEBPACK_IMPORTED_MODULE_0__["default"].doIntercept(this.#data)
				.then((data) => {
					console.log(data);
					const { url, request, metadata } = data;
					const { method, headers, body } = request;
					const { async, username, password } = metadata;
					const target = typeof url === "string" ? url : url.toString();
					super.open(method, target, async, username, username);

					if (typeof headers !== "undefined") Object.getOwnPropertyNames(headers).forEach((header) => super.setRequestHeader(header, headers[header]));
					super.send(body);
				})
				["catch"](console.error);
		}
	}

	window.XMLHttpRequest = ExtXMLHttpRequest;
})(window.XMLHttpRequest);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index */ "./src/index.js");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL0ZldGNoLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9NYW5hZ2VyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvVHlwZURlZnMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9VdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL1hNTEh0dHBSZXF1ZXN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvT0F1dGhJbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9Ub2tlbkludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmV4cG9ydCBjb25zdCBPUkdGRVRDSCA9IEdMT0JBTC5mZXRjaDsiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQge09SR0ZFVENIfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHRcclxuR0xPQkFMLmZldGNoID0gYXN5bmMgZnVuY3Rpb24oYVVybCwgYVJlcXVlc3Qpe1xyXG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uKTtcclxuXHRjb25zdCBkYXRhID0gYXdhaXQgTWFuYWdlci5kb0ludGVyY2VwdCh7XHJcblx0XHRcdHVybCA6IG5ldyBVUkwoYVVybCwgbG9jYXRpb24pLFxyXG5cdFx0XHRyZXF1ZXN0IDogYVJlcXVlc3QgfHwge30sXHJcblx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdG1ldGhvZCA6IHR5cGVvZiBhUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiR0VUXCIgOiAoYVJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCIpLFxyXG5cdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRwcm90b2NvbCA6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG5cdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdHBhdGggOiB1cmwucGF0aG5hbWUsXHJcblx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdGFzeW5jIDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdFx0XHJcblx0cmV0dXJuIE9SR0ZFVENIKGRhdGEudXJsLCBkYXRhLnJlcXVlc3QpO1xyXG59OyIsImltcG9ydCB7IE9SR0ZFVENIIH0gZnJvbSBcIi4vQ29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBcIi4vVHlwZURlZnMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGNsYXNzZXMgdGhhdCByZXByZXNlbnRzIGEgcmVxdWVzdCBpbnRlcmNlcHRlciBpbXBsZW1lbnRhdGlvbi5cclxuICogXHJcbiAqIEBpbnRlcmZhY2VcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyY2VwdG9yIHtcclxuXHQvKipcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge0ludGVyY2VwdG9yRGF0YX0gZGF0YSBcclxuXHQgKi9cclxuXHRhc3luYyBkb0FjY2VwdChkYXRhKSB7fVxyXG5cdC8qKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7SW50ZXJjZXB0b3JEYXRhfSBkYXRhIFxyXG5cdCAqIEByZXR1cm5zIHtJbnRlcmNlcHRvckRhdGEgfCB1bmRlZmluZWQgfVxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvSGFuZGxlKGRhdGEpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xVUkwpfSB1cmxcclxuXHQgKiBAcGFyYW0geyhvYmplY3R8UmVxdWVzdCl9IHJlcXVlc3RcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XHJcblx0ICovXHJcblx0YXN5bmMgdW5jZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3QpIHtcclxuXHRcdHJldHVybiBPUkdGRVRDSCh1cmwsIHJlcXVlc3QpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBHTE9CQUwgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBPUkdGRVRDSCB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5jb25zdCBDVVJSRU5UT1JJR0lOID0gR0xPQkFMLmxvY2F0aW9uLm9yaWdpbjtcclxuXHJcbmNsYXNzIE1hbmFnZXIge1xyXG5cdCNjYWNoZSA9IHt9O1xyXG5cdCNpZ25vcmVkVXJscyA9IHt9O1xyXG5cdCNpZ25vcmVkT3JpZ2lucyA9IHt9O1xyXG5cdCNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IGZhbHNlO1xyXG5cdCNpbnRlcmNlcHRvcnMgPSBbXTtcclxuXHQjc2V0dXAgPSBbXTtcclxuXHQjcmVhZHlDaGVjaztcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0c2V0IGlnbm9yZURvY3VtZW50T3JpZ2luKHZhbHVlKSB7XHJcblx0XHR0aGlzLiNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0YWRkT3JpZ2luVG9JZ25vcmUob3JpZ2lucykge1xyXG5cdFx0aWYgKG9yaWdpbnMgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0Zm9yIChsZXQgb3JpZ2luIG9mIG9yaWdpbnMpXHJcblx0XHRcdFx0dGhpcy4jaWdub3JlZE9yaWdpbnNbb3JpZ2luLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy4jaWdub3JlZE9yaWdpbnNbb3JpZ2lucy50b1N0cmluZygpXSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRhZGRVcmxUb0lnbm9yZSh1cmxzKSB7XHJcblx0XHRpZiAodXJscyBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRmb3IgKGxldCB1cmwgb2YgdXJscylcclxuXHRcdFx0XHR0aGlzLiNpZ25vcmVkVXJsc1t1cmwudG9TdHJpbmcoKV0gPSB0cnVlO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLiNpZ25vcmVkVXJsc1t1cmxzLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHNldHVwKHNldHVwKSB7XHJcblx0XHRpZiAodHlwZW9mIHNldHVwID09PSBcImZ1bmN0aW9uXCIgfHwgc2V0dXAgaW5zdGFuY2VvZiBQcm9taXNlKVxyXG5cdFx0XHR0aGlzLiNzZXR1cC5wdXNoKHNldHVwKTtcclxuXHR9XHJcblxyXG5cdGFkZEludGVyY2VwdG9yKGFJbnRlcmNlcHRvcikge1xyXG5cdFx0aWYoYUludGVyY2VwdG9yIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdHJldHVybiBhSW50ZXJjZXB0b3IuZm9yRWFjaChpbnRlcmNlcHRvciA9PiB0aGlzLmFkZEludGVyY2VwdG9yKGludGVyY2VwdG9yKSk7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvciAhPT0gXCJvYmplY3RcIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZnVuY3Rpb24gcmVxdWlyZWQgYW4gaW50ZXJjZXB0b3JcIik7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvci5kb0FjY2VwdCAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9BY2NlcHRcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yLmRvSGFuZGxlICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0hhbmRsZVxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cclxuXHRcdHRoaXMuI2ludGVyY2VwdG9ycy5wdXNoKGFJbnRlcmNlcHRvcik7XHJcblx0XHR0aGlzLnJlc2V0KCk7XHJcblx0fVxyXG5cclxuXHRnZXQgcmVhZHkoKSB7XHJcblx0XHRyZXR1cm4gKGFzeW5jICgpID0+IHtcdFx0XHRcclxuXHRcdFx0aWYgKHRoaXMuI3NldHVwLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0aWYodGhpcy4jcmVhZHlDaGVjaylcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHJcblx0XHRcdHRoaXMuI3JlYWR5Q2hlY2sgPSAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdHdoaWxlKHRoaXMuI3NldHVwLmxlbmd0aCAhPSAwKXtcclxuXHRcdFx0XHRcdGNvbnN0IHNldHVwID0gdGhpcy4jc2V0dXBbMF07XHJcblx0XHRcdFx0XHRpZiAoc2V0dXApe1xyXG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvcnMgPSBzZXR1cCBpbnN0YW5jZW9mIFByb21pc2UgPyBhd2FpdCBzZXR1cCA6IGF3YWl0IHNldHVwKCk7XHJcblx0XHRcdFx0XHRcdGlmKGludGVyY2VwdG9ycylcclxuXHRcdFx0XHRcdFx0XHRpbnRlcmNlcHRvcnMgaW5zdGFuY2VvZiBBcnJheSA/IGludGVyY2VwdG9ycy5mb3JFYWNoKGludGVyY2VwdG9yID0+IHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpKSA6IHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3JzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy4jc2V0dXAuc2hpZnQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4jcmVhZHlDaGVjayA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVhZHk7XHJcblx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHRcdH0pKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBcclxuXHQgKiBAcGFyYW0geyhzdHJpbmd8VVJMKX0gZGF0YS51cmxcclxuXHQgKiBAcGFyYW0geyhvYmplY3R8UmVxdWVzdCl9IGRhdGEucmVxdWVzdFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhLm1ldGFkYXRhXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEubWV0aG9kXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEub3JpZ2luXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEucHJvdG9jb2xcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5ob3N0bmFtZVxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhLm1ldGFkYXRhLnBvcnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5wYXRoXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEuaGFzaFxyXG5cdCAqIEBwYXJhbSB7VVJMU2VhcmNoUGFyYW1zfSBkYXRhLm1ldGFkYXRhLnF1ZXJ5XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBkYXRhLm1ldGFkYXRhLmFzeW5jXHJcblx0ICogQHJldHVybnMge29iamVjdH0gdGhlIG1hbmlwdWxhdGVkIGRhdGFcclxuXHQgKi9cclxuXHRhc3luYyBkb0ludGVyY2VwdChkYXRhKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlYWR5O1xyXG5cdFx0XHJcblx0XHRjb25zdCBvcmlnaW4gPSBkYXRhLm1ldGFkYXRhLm9yaWdpbjtcclxuXHJcblx0XHRpZiAodGhpcy4jaXNJZ25vcmVkKG9yaWdpbiwgZGF0YS51cmwudG9TdHJpbmcoKSkpXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cclxuXHRcdGNvbnN0IHsgdXJsLCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdGNvbnN0IGNoYWluID0gYXdhaXQgdGhpcy4jZ2V0Q2hhaW4ob3JpZ2luLCB7IHVybCwgbWV0YWRhdGEgfSk7XHJcblx0XHRpZiAoIWNoYWluKVxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHJcblx0XHRmb3IgKGxldCBpbnRlcmNlcHRvciBvZiBjaGFpbilcclxuXHRcdFx0ZGF0YSA9IGF3YWl0IGludGVyY2VwdG9yLmRvSGFuZGxlKGRhdGEpO1xyXG5cclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblx0cmVzZXQoKSB7XHJcblx0XHR0aGlzLiNjYWNoZSA9IHt9O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdW5jaGVja2VkRmV0Y2godXJsLCByZXF1ZXN0KSB7XHJcblx0XHRyZXR1cm4gT1JHRkVUQ0godXJsLCByZXF1ZXN0KTtcclxuXHR9XHJcblxyXG5cdCNpc0lnbm9yZWQob3JpZ2luLCB1cmwpIHtcclxuXHRcdGlmICh0aGlzLiNpZ25vcmVkVXJsc1t1cmxdKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZURvY3VtZW50T3JpZ2luICYmIG9yaWdpbiA9PSBDVVJSRU5UT1JJR0lOKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdGlmICh0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5dKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdGFzeW5jICNnZXRDaGFpbihvcmlnaW4sIGRhdGEpIHtcclxuXHRcdGxldCBjaGFpbiA9IHRoaXMuI2NhY2hlW29yaWdpbl07XHJcblx0XHRpZiAoIWNoYWluKSB7XHJcblx0XHRcdGNoYWluID0gdGhpcy4jaW50ZXJjZXB0b3JGb3JPcmlnaW4ob3JpZ2luLCBkYXRhKTtcclxuXHRcdFx0dGhpcy4jY2FjaGVbb3JpZ2luXSA9IGNoYWluO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGFpbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jICNpbnRlcmNlcHRvckZvck9yaWdpbihvcmlnaW4sIGRhdGEpIHtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgaW50ZXJjZXB0b3Igb2YgdGhpcy4jaW50ZXJjZXB0b3JzKSB7XHJcblx0XHRcdGlmIChhd2FpdCBpbnRlcmNlcHRvci5kb0FjY2VwdChkYXRhKSlcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpbnRlcmNlcHRvcilcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IElOU1RBTkNFID0gbmV3IE1hbmFnZXIoKTtcclxuc2V0VGltZW91dCgoKSA9PiBJTlNUQU5DRS5yZWFkeSwgMTApO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElOU1RBTkNFO1xyXG5leHBvcnQge01hbmFnZXJ9OyIsIlxyXG4vKiogXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IE1ldGFkYXRhXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2RcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG9yaWdpblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcHJvdG9jb2xcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGhvc3RuYW1lXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bWJlcn0gcG9ydFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0aFxyXG4gKiBAcHJvcGVydHkge1VSTFNlYXJjaFBhcmFtc30gcXVlcnlcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGhhc2hcclxuICogQHByb3BlcnR5IHtib29sZWFufSBhc3luY1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXNlcm5hbWVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhc3N3b3JkXHJcbiAqL1xyXG5cclxuLyoqIFxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBJbnRlcmNlcHRvckRhdGFcclxuICogQHByb3BlcnR5IHtVUkx9IHVybFxyXG4gKiBAcHJvcGVydHkge1JlcXVlc3R9IHJlcXVlc3RcclxuICogQHByb3BlcnR5IHtNZXRhZGF0YX0gbWV0YWRhdGFcclxuKi8iLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xuXHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBzZWxmOyB9XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gd2luZG93OyB9XG5cdGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZ2xvYmFsOyB9XG5cdHJldHVybiB7fTtcbn0pKCk7XG5cbmV4cG9ydCB7R0xPQkFMfTtcbmNvbnN0IFV0aWxzID0ge1xuXHRHTE9CQUwgOiBHTE9CQUxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyAiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdMT0JBTCB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBcIi4vVHlwZURlZnMuanNcIjtcclxuXHJcbigoWE1MSHR0cFJlcXVlc3QpID0+IHtcclxuXHRjbGFzcyBFeHRYTUxIdHRwUmVxdWVzdCBleHRlbmRzIFhNTEh0dHBSZXF1ZXN0IHtcclxuXHRcdC8qKlxyXG5cdFx0ICogQHR5cGUge0ludGVyY2VwdG9yRGF0YX1cclxuXHRcdCAqL1xyXG5cdFx0I2RhdGE7XHJcblxyXG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRSZXF1ZXN0SGVhZGVyKGFOYW1lLCBhVmFsdWUpIHtcclxuXHRcdFx0dGhpcy4jZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSB0aGlzLiNkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdFx0dGhpcy4jZGF0YS5yZXF1ZXN0LmhlYWRlcnNbYU5hbWVdID0gYVZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wZW4oYU1ldGhvZCwgYVVybCwgaXNBc3luYywgYVVzZXJuYW1lLCBhUGFzc3dvcmQpIHtcclxuXHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTChhVXJsLCBHTE9CQUwubG9jYXRpb24ub3JpZ2luKTtcclxuXHJcblx0XHRcdHRoaXMuI2RhdGEgPSB7XHJcblx0XHRcdFx0dXJsOiBuZXcgVVJMKGFVcmwsIGxvY2F0aW9uKSxcclxuXHRcdFx0XHRyZXF1ZXN0OiB7XHJcblx0XHRcdFx0XHRtZXRob2Q6IGFNZXRob2QsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRhZGF0YToge1xyXG5cdFx0XHRcdFx0bWV0aG9kOiBhTWV0aG9kLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiB1cmwub3JpZ2luLFxyXG5cdFx0XHRcdFx0cHJvdG9jb2w6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRcdGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcblx0XHRcdFx0XHRwb3J0OiB1cmwucG9ydCxcclxuXHRcdFx0XHRcdHBhdGg6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdFx0aGFzaDogdXJsLmhhc2gsXHJcblx0XHRcdFx0XHRhc3luYzogdHlwZW9mIGlzQXN5bmMgPT09IFwiYm9vbGVhblwiID8gaXNBc3luYyA6IHRydWUsXHJcblx0XHRcdFx0XHR1c2VybmFtZTogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQ6IGFQYXNzd29yZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbmQoYUJvZHkpIHtcclxuXHRcdFx0dGhpcy4jZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTtcclxuXHRcdFx0TWFuYWdlci5kb0ludGVyY2VwdCh0aGlzLiNkYXRhKVxyXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnN0IHsgdXJsLCByZXF1ZXN0LCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdFx0XHRcdGNvbnN0IHsgbWV0aG9kLCBoZWFkZXJzLCBib2R5IH0gPSByZXF1ZXN0O1xyXG5cdFx0XHRcdFx0Y29uc3QgeyBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBtZXRhZGF0YTtcclxuXHRcdFx0XHRcdGNvbnN0IHRhcmdldCA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyB1cmwgOiB1cmwudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdHN1cGVyLm9wZW4obWV0aG9kLCB0YXJnZXQsIGFzeW5jLCB1c2VybmFtZSwgdXNlcm5hbWUpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIikgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaCgoaGVhZGVyKSA9PiBzdXBlci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKSk7XHJcblx0XHRcdFx0XHRzdXBlci5zZW5kKGJvZHkpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0W1wiY2F0Y2hcIl0oY29uc29sZS5lcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBFeHRYTUxIdHRwUmVxdWVzdDtcclxufSkod2luZG93LlhNTEh0dHBSZXF1ZXN0KTtcclxuIiwiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBcIi4vWE1MSHR0cFJlcXVlc3RcIjtcclxuaW1wb3J0IFwiLi9GZXRjaFwiO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi9JbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQgaW50ZXJjZXB0b3JzIGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xyXG5cclxuR0xPQkFMLmRlZmF1bHRqcyA9IEdMT0JBTC5kZWZhdWx0anMgfHwge307XHJcbkdMT0JBTC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yID0gR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRNYW5hZ2VyLFxyXG5cdEludGVyY2VwdG9yLFxyXG5cdGludGVyY2VwdG9yc1xyXG59OyIsImltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIlxyXG5cclxuY29uc3QgT0F1dGhJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGFTZXR1cCl7XHJcblx0Y29uc3Qgc2V0dXAgPSBhU2V0dXA7XHJcblx0c2V0dXAuZmV0Y2hUb2tlbiA9IGFzeW5jICgpID0+IHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc2V0dXAubG9naW4udXJsLCB7XHJcblx0XHRcdG1ldGhvZDogKHNldHVwLmxvZ2luLm1ldGhvZCB8fCBcImdldFwiKVxyXG5cdFx0fSk7XHJcblx0XHRyZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJldHVybiByZXNwb25zZVtzZXR1cC5sb2dpbi5yZXNwb25zZS52YWx1ZVNlbGVjdG9yXTtcclxuXHR9O1xyXG5cdHJldHVybiBUb2tlbkludGVyY2VwdG9yKGFTZXR1cCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPQXV0aEludGVyY2VwdG9yO1xyXG4iLCIvKipcclxuICogYVNldHVwICA9PlxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9XHJcbiAqL1xyXG5cclxuY29uc3QgZGVmYXVsdFRva2VuQXBwZW5kZXIgPSBhc3luYyAodG9rZW4sIGRhdGEpID0+IHtcclxuXHRkYXRhLnJlcXVlc3QuaGVhZGVycyA9IGRhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdGRhdGEucmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5pbXBvcnQgSW50ZXJjZXB0b3IgZnJvbSBcIi4uL0ludGVyY2VwdG9yXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuSW50ZXJjZXB0b3IgZXh0ZW5kcyBJbnRlcmNlcHRvciB7XHJcblxyXG5cdCN0b2tlbiA9IG51bGw7XHJcblx0I2xhc3REYXRhID0ge307XHJcblx0I2NvbmRpdGlvbjtcclxuXHQjZmV0Y2hUb2tlbjtcclxuXHQjYXBwZW5kVG9rZW47XHJcblx0I3JlZnJlc2hJbnRlcnZhbDtcclxuXHQjcmVmcmVzaFRva2VuO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih7IGNvbmRpdGlvbiwgZmV0Y2hUb2tlbiwgYXBwZW5kVG9rZW4sIHJlZnJlc2hJbnRlcnZhbCA9IDYwICogMTAwMCwgcmVmcmVzaFRva2VuIH0pIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRpZih0eXBlb2YgY29uZGl0aW9uICE9PSBcInN0cmluZ1wiICYmICEoY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpICYmIHR5cGVvZiBjb25kaXRpb24gIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJjb25kaXRpb25cIiBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgXCJhcnJheVwiIG9yIFwiZnVuY3Rpb25cIiFgKTtcclxuXHRcdHRoaXMuI2NvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mIGZldGNoVG9rZW4gIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJmZXRjaFRva2VuXCIgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIiFgKTtcclxuXHRcdHRoaXMuI2ZldGNoVG9rZW4gPSBmZXRjaFRva2VuO1xyXG5cclxuXHRcdGlmKGFwcGVuZFRva2VuICYmIHR5cGVvZiBhcHBlbmRUb2tlbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImFwcGVuZFRva2VuXCIgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIiFgKTtcclxuXHRcdHRoaXMuI2FwcGVuZFRva2VuID0gYXBwZW5kVG9rZW4gfHwgZGVmYXVsdFRva2VuQXBwZW5kZXI7XHJcblxyXG5cdFx0dGhpcy4jcmVmcmVzaEludGVydmFsID0gcmVmcmVzaEludGVydmFsO1xyXG5cdFx0dGhpcy4jcmVmcmVzaFRva2VuID0gcmVmcmVzaFRva2VuO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZG9BY2NlcHQoZGF0YSkge1xyXG5cdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB0aGlzLiNjb25kaXRpb247XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLiNjb25kaXRpb247XHJcblx0XHRjb25zdCBvcmlnaW4gPSBkYXRhLm1ldGFkYXRhLm9yaWdpbjtcclxuXHRcdGlmICh0eXBlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBhd2FpdCBjb25kaXRpb24oZGF0YSk7XHJcblx0XHRlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKSByZXR1cm4gY29uZGl0aW9uID09IG9yaWdpbjtcclxuXHRcdGVsc2UgaWYgKGNvbmRpdGlvbiBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRyZXR1cm4gY29uZGl0aW9uLmluY2x1ZGVzKG9yaWdpbik7XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZG9IYW5kbGUoZGF0YSkge1xyXG5cdFx0aWYgKCF0aGlzLiN0b2tlbikge1xyXG5cdFx0XHRjb25zdCB7IHVybCwgbWV0YWRhdGEgfSA9IGRhdGE7XHJcblx0XHRcdHRoaXMuI2xhc3REYXRhID0geyB1cmwsIG1ldGFkYXRhIH07XHJcblx0XHRcdHRoaXMuI3Rva2VuID0gdGhpcy4jZmV0Y2hUb2tlbih7IHVybCwgbWV0YWRhdGEgfSk7XHJcblx0XHRcdHRoaXMuI3N0YXJ0UmVmcmVzaCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLiNjYWxsQXBwZW5kVG9rZW4oZGF0YSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyAjY2FsbEFwcGVuZFRva2VuKGRhdGEpIHtcclxuXHRcdGNvbnN0IGFwcGVuZGVyID0gdGhpcy4jYXBwZW5kVG9rZW47XHJcblx0XHRjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuI3Rva2VuO1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgYXBwZW5kZXIodG9rZW4sIGRhdGEpO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQgPyByZXN1bHQgOiBkYXRhO1xyXG5cdH1cclxuXHJcblx0I3N0YXJ0UmVmcmVzaCgpIHtcclxuXHRcdGlmICh0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgPiAwKSB7XHJcblx0XHRcdGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuI3JlZnJlc2hUb2tlbiB8fCAoKCkgPT4gdGhpcy4jZmV0Y2hUb2tlbih0aGlzLiNsYXN0RGF0YSkpO1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0ID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLiNyZWZyZXNoVG9rZW4pXHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLiNyZWZyZXNoVG9rZW4odGhpcy4jbGFzdERhdGEpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuI2ZldGNoVG9rZW4odGhpcy4jbGFzdERhdGEpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KHRpbWVvdXQsdGhpcy4jcmVmcmVzaEludGVydmFsICk7XHJcblx0XHRcdH07XHJcblxyXG5cclxuXHRcdFx0c2V0VGltZW91dCh0aW1lb3V0ICwgdGhpcy4jcmVmcmVzaEludGVydmFsKTtcclxuXHRcdH1cclxuXHR9XHJcbn07IiwiaW1wb3J0IE9BdXRoSW50ZXJjZXB0b3IgZnJvbSBcIi4vT0F1dGhJbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQgVG9rZW5JbnRlcmNlcHRvciBmcm9tIFwiLi9Ub2tlbkludGVyY2VwdG9yXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgIHtcclxuXHRPQXV0aEludGVyY2VwdG9yLFxyXG5cdFRva2VuSW50ZXJjZXB0b3JcclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3NyYy9pbmRleFwiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==