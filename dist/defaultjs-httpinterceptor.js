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
	const url = aUrl instanceof URL ? aUrl : new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.location);
	const data = await _Manager__WEBPACK_IMPORTED_MODULE_0__["default"].doIntercept({
			url,
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
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils.js */ "./src/Utils.js");
/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants.js */ "./src/Constants.js");
/* harmony import */ var _Interceptor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interceptor.js */ "./src/Interceptor.js");



const CURRENTORIGIN = _Utils_js__WEBPACK_IMPORTED_MODULE_0__.GLOBAL.location.origin;

class Manager {
	#cache = new Map();
	#ignoredUrls = new Set();
	#ignoredOrigins = new Set();
	#ignoreDocumentOrigin = false;
	
	/**
	 * @type {Array<Interceptor>}
	 */
	#interceptors = [];
	/**
	 * @type {Array<Function|Promise<Array<Interceptor>>|Promise<Interceptor>}
	 */
	#setup = [];
	#readyCheck = null;

	constructor() {}

	
	/**
	 * ignores interceptors for the current document origin
	 *
	 * @type {boolean}
	 */
	set ignoreDocumentOrigin(value) {
		this.#ignoreDocumentOrigin = value;
	}

	/**
	 * add origins to be ignored
	 * @param {string|URL|Array<string>|Array<URL>} origins
	 */
	addOriginToIgnore(origins) {
		if (origins instanceof Array) for (let origin of origins) this.#ignoredOrigins.add(origin.toString());
		else this.#ignoredOrigins[origins.toString()] = true;
	}

	/**
	 * add urls to be ignored
	 * @param {string|URL|Array<string>|Array<URL>} urls
	 */
	addUrlToIgnore(urls) {
		if (urls instanceof Array) for (let url of urls) this.#ignoredUrls.add(url.toString());
		else this.#ignoredUrls.add(urls.toString());
	}

	/**
	 * 
	 * @param {Function|Promise<Array<Interceptor>>|Promise<Interceptor>} aSetup
	 */
	setup(aSetup) {
		if (typeof aSetup === "function" || aSetup instanceof Promise) 
			this.#setup.push(aSetup);
	}

	/**
	 * 
	 * @param {Interceptor|Array<Interceptor>|object} aInterceptor 
	 * @returns 
	 */
	addInterceptor(aInterceptor) {
		if (aInterceptor instanceof Array)
			for (interceptor of aInterceptor)
				this.addInterceptor(interceptor);
		if (typeof aInterceptor !== "object") throw new Error("function required an interceptor");
		if (typeof aInterceptor.doAccept !== "function") throw new Error('The interceptor required a "doAccept" function!');
		if (typeof aInterceptor.doHandle !== "function") throw new Error('The interceptor required a "doHandle" function!');

		this.#interceptors.push(aInterceptor);
		this.reset();
	}

	/**
	 * @readonly
	 * @type {Promise<>}
	 */
	get ready() {
		return (() => {
			if (this.#setup.length == 0) return true;

			if (this.#readyCheck) return this.#readyCheck;

			this.#readyCheck = (async () => {
				while (this.#setup.length != 0) {
					const setup = this.#setup.shift();
					const interceptors = await (setup instanceof Promise ? setup : setup());
					if (interceptors)
						if (interceptors instanceof Array)
							for (interceptor of interceptors)
								this.addInterceptor(interceptor);
						else if (interceptors instanceof _Interceptor_js__WEBPACK_IMPORTED_MODULE_2__["default"]) 
							this.addInterceptor(interceptors);
						else 
							this.addInterceptor(interceptors);
						
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

		const {	url, metadata } = data;
		const { origin } = metadata;
		if (this.#isIgnored(origin, data.url.toString())) return data;

		const chain = await this.#getChain(origin, { url, metadata });
		if (!chain) return data;

		for (let interceptor of chain) data = (await interceptor.doHandle(data)) || data;

		return data;
	}

	reset() {
		this.#cache = new Map();
	}

	/**
	 * make a classic fetch call without interception
	 * 
	 * @param {string|URL} url 
	 * @param {object|Request} request 
	 * @returns {Promise<Response>}
	 */
	async uncheckedFetch(url, request) {
		return (0,_Constants_js__WEBPACK_IMPORTED_MODULE_1__.ORGFETCH)(url, request);
	}

	#isIgnored(origin, url) {
		if (this.#ignoredUrls.has(url)) return true;
		if (this.#ignoreDocumentOrigin && origin == CURRENTORIGIN) return true;
		if (this.#ignoredOrigins[origin]) return true;

		return false;
	}

	async #getChain(origin, data) {
		let chain = this.#cache.get(origin);
		if (!chain) {
			chain = this.#interceptorForOrigin(data);
			this.#cache.set(origin, chain);
		}

		return chain;
	}

	async #interceptorForOrigin(data) {
		const result = [];
		for (let interceptor of this.#interceptors) {
			if (await interceptor.doAccept(data)) result.push(interceptor);
		}

		return result;
	}
}

const INSTANCE = new Manager();
setTimeout(() => INSTANCE.ready, 100);

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
			const url = aUrl instanceof URL ? aUrl : new URL(aUrl, _Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.location);

			this.#data = {
				url,
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
					super.open(method, target, async, username, password);

					if (typeof headers !== "undefined") Object.getOwnPropertyNames(headers).forEach((header) => super.setRequestHeader(header, headers[header]));
					super.send(body);
				})
				["catch"](console.error);
		}
	}

	_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest = ExtXMLHttpRequest;
})(_Utils__WEBPACK_IMPORTED_MODULE_1__.GLOBAL.XMLHttpRequest);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0ZrRDtBQUNBO0FBQ2xEO0FBQ0E7QUFDQSxpRUFBZ0I7QUFDaEIsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixDQUFDOzs7Ozs7VUNQRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9UeXBlRGVmcy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvWE1MSHR0cFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9PQXV0aEludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL1Rva2VuSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuZXhwb3J0IGNvbnN0IE9SR0ZFVENIID0gR0xPQkFMLmZldGNoOyIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7T1JHRkVUQ0h9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cdFxyXG5HTE9CQUwuZmV0Y2ggPSBhc3luYyBmdW5jdGlvbihhVXJsLCBhUmVxdWVzdCl7XHJcblx0Y29uc3QgdXJsID0gYVVybCBpbnN0YW5jZW9mIFVSTCA/IGFVcmwgOiBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbik7XHJcblx0Y29uc3QgZGF0YSA9IGF3YWl0IE1hbmFnZXIuZG9JbnRlcmNlcHQoe1xyXG5cdFx0XHR1cmwsXHJcblx0XHRcdHJlcXVlc3QgOiBhUmVxdWVzdCB8fCB7fSxcclxuXHRcdFx0bWV0YWRhdGEgOiB7XHJcblx0XHRcdFx0bWV0aG9kIDogdHlwZW9mIGFSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJHRVRcIiA6IChhUmVxdWVzdC5tZXRob2QgfHwgXCJHRVRcIiksXHJcblx0XHRcdFx0b3JpZ2luOiB1cmwub3JpZ2luLFxyXG5cdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcblx0XHRcdFx0cG9ydDogdXJsLnBvcnQsXHJcblx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRoYXNoIDogdXJsLmhhc2gsXHJcblx0XHRcdFx0cXVlcnk6IHVybC5zZWFyY2gsXHJcblx0XHRcdFx0YXN5bmMgOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0XHRcclxuXHRyZXR1cm4gT1JHRkVUQ0goZGF0YS51cmwsIGRhdGEucmVxdWVzdCk7XHJcbn07IiwiaW1wb3J0IHsgT1JHRkVUQ0ggfSBmcm9tIFwiLi9Db25zdGFudHMuanNcIjtcclxuaW1wb3J0IFwiLi9UeXBlRGVmcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY2xhc3NlcyB0aGF0IHJlcHJlc2VudHMgYSByZXF1ZXN0IGludGVyY2VwdGVyIGltcGxlbWVudGF0aW9uLlxyXG4gKiBcclxuICogQGludGVyZmFjZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJjZXB0b3Ige1xyXG5cdC8qKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7SW50ZXJjZXB0b3JEYXRhfSBkYXRhIFxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvQWNjZXB0KGRhdGEpIHt9XHJcblx0LyoqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtJbnRlcmNlcHRvckRhdGF9IGRhdGEgXHJcblx0ICogQHJldHVybnMge0ludGVyY2VwdG9yRGF0YSB8IHVuZGVmaW5lZCB9XHJcblx0ICovXHJcblx0YXN5bmMgZG9IYW5kbGUoZGF0YSkge31cclxuXHJcblx0LyoqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsoc3RyaW5nfFVSTCl9IHVybFxyXG5cdCAqIEBwYXJhbSB7KG9iamVjdHxSZXF1ZXN0KX0gcmVxdWVzdFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cclxuXHQgKi9cclxuXHRhc3luYyB1bmNlY2tlZEZldGNoKHVybCwgcmVxdWVzdCkge1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEdMT0JBTCB9IGZyb20gXCIuL1V0aWxzLmpzXCI7XHJcbmltcG9ydCB7IE9SR0ZFVENIIH0gZnJvbSBcIi4vQ29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi9JbnRlcmNlcHRvci5qc1wiO1xyXG5jb25zdCBDVVJSRU5UT1JJR0lOID0gR0xPQkFMLmxvY2F0aW9uLm9yaWdpbjtcclxuXHJcbmNsYXNzIE1hbmFnZXIge1xyXG5cdCNjYWNoZSA9IG5ldyBNYXAoKTtcclxuXHQjaWdub3JlZFVybHMgPSBuZXcgU2V0KCk7XHJcblx0I2lnbm9yZWRPcmlnaW5zID0gbmV3IFNldCgpO1xyXG5cdCNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IGZhbHNlO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtBcnJheTxJbnRlcmNlcHRvcj59XHJcblx0ICovXHJcblx0I2ludGVyY2VwdG9ycyA9IFtdO1xyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtBcnJheTxGdW5jdGlvbnxQcm9taXNlPEFycmF5PEludGVyY2VwdG9yPj58UHJvbWlzZTxJbnRlcmNlcHRvcj59XHJcblx0ICovXHJcblx0I3NldHVwID0gW107XHJcblx0I3JlYWR5Q2hlY2sgPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIGlnbm9yZXMgaW50ZXJjZXB0b3JzIGZvciB0aGUgY3VycmVudCBkb2N1bWVudCBvcmlnaW5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHNldCBpZ25vcmVEb2N1bWVudE9yaWdpbih2YWx1ZSkge1xyXG5cdFx0dGhpcy4jaWdub3JlRG9jdW1lbnRPcmlnaW4gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGFkZCBvcmlnaW5zIHRvIGJlIGlnbm9yZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xVUkx8QXJyYXk8c3RyaW5nPnxBcnJheTxVUkw+fSBvcmlnaW5zXHJcblx0ICovXHJcblx0YWRkT3JpZ2luVG9JZ25vcmUob3JpZ2lucykge1xyXG5cdFx0aWYgKG9yaWdpbnMgaW5zdGFuY2VvZiBBcnJheSkgZm9yIChsZXQgb3JpZ2luIG9mIG9yaWdpbnMpIHRoaXMuI2lnbm9yZWRPcmlnaW5zLmFkZChvcmlnaW4udG9TdHJpbmcoKSk7XHJcblx0XHRlbHNlIHRoaXMuI2lnbm9yZWRPcmlnaW5zW29yaWdpbnMudG9TdHJpbmcoKV0gPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogYWRkIHVybHMgdG8gYmUgaWdub3JlZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfFVSTHxBcnJheTxzdHJpbmc+fEFycmF5PFVSTD59IHVybHNcclxuXHQgKi9cclxuXHRhZGRVcmxUb0lnbm9yZSh1cmxzKSB7XHJcblx0XHRpZiAodXJscyBpbnN0YW5jZW9mIEFycmF5KSBmb3IgKGxldCB1cmwgb2YgdXJscykgdGhpcy4jaWdub3JlZFVybHMuYWRkKHVybC50b1N0cmluZygpKTtcclxuXHRcdGVsc2UgdGhpcy4jaWdub3JlZFVybHMuYWRkKHVybHMudG9TdHJpbmcoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufFByb21pc2U8QXJyYXk8SW50ZXJjZXB0b3I+PnxQcm9taXNlPEludGVyY2VwdG9yPn0gYVNldHVwXHJcblx0ICovXHJcblx0c2V0dXAoYVNldHVwKSB7XHJcblx0XHRpZiAodHlwZW9mIGFTZXR1cCA9PT0gXCJmdW5jdGlvblwiIHx8IGFTZXR1cCBpbnN0YW5jZW9mIFByb21pc2UpIFxyXG5cdFx0XHR0aGlzLiNzZXR1cC5wdXNoKGFTZXR1cCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0ludGVyY2VwdG9yfEFycmF5PEludGVyY2VwdG9yPnxvYmplY3R9IGFJbnRlcmNlcHRvciBcclxuXHQgKiBAcmV0dXJucyBcclxuXHQgKi9cclxuXHRhZGRJbnRlcmNlcHRvcihhSW50ZXJjZXB0b3IpIHtcclxuXHRcdGlmIChhSW50ZXJjZXB0b3IgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0Zm9yIChpbnRlcmNlcHRvciBvZiBhSW50ZXJjZXB0b3IpXHJcblx0XHRcdFx0dGhpcy5hZGRJbnRlcmNlcHRvcihpbnRlcmNlcHRvcik7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvciAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiZnVuY3Rpb24gcmVxdWlyZWQgYW4gaW50ZXJjZXB0b3JcIik7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvci5kb0FjY2VwdCAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFwiZG9BY2NlcHRcIiBmdW5jdGlvbiEnKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yLmRvSGFuZGxlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcignVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXCJkb0hhbmRsZVwiIGZ1bmN0aW9uIScpO1xyXG5cclxuXHRcdHRoaXMuI2ludGVyY2VwdG9ycy5wdXNoKGFJbnRlcmNlcHRvcik7XHJcblx0XHR0aGlzLnJlc2V0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBAdHlwZSB7UHJvbWlzZTw+fVxyXG5cdCAqL1xyXG5cdGdldCByZWFkeSgpIHtcclxuXHRcdHJldHVybiAoKCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy4jc2V0dXAubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuI3JlYWR5Q2hlY2spIHJldHVybiB0aGlzLiNyZWFkeUNoZWNrO1xyXG5cclxuXHRcdFx0dGhpcy4jcmVhZHlDaGVjayA9IChhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0d2hpbGUgKHRoaXMuI3NldHVwLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdFx0XHRjb25zdCBzZXR1cCA9IHRoaXMuI3NldHVwLnNoaWZ0KCk7XHJcblx0XHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvcnMgPSBhd2FpdCAoc2V0dXAgaW5zdGFuY2VvZiBQcm9taXNlID8gc2V0dXAgOiBzZXR1cCgpKTtcclxuXHRcdFx0XHRcdGlmIChpbnRlcmNlcHRvcnMpXHJcblx0XHRcdFx0XHRcdGlmIChpbnRlcmNlcHRvcnMgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHRcdFx0XHRmb3IgKGludGVyY2VwdG9yIG9mIGludGVyY2VwdG9ycylcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xyXG5cdFx0XHRcdFx0XHRlbHNlIGlmIChpbnRlcmNlcHRvcnMgaW5zdGFuY2VvZiBJbnRlcmNlcHRvcikgXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hZGRJbnRlcmNlcHRvcihpbnRlcmNlcHRvcnMpO1xyXG5cdFx0XHRcdFx0XHRlbHNlIFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3JzKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuI3JlYWR5Q2hlY2sgPSBudWxsO1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnJlYWR5O1xyXG5cdFx0XHR9KSgpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuI3JlYWR5Q2hlY2s7XHJcblx0XHR9KSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xVUkwpfSBkYXRhLnVybFxyXG5cdCAqIEBwYXJhbSB7KG9iamVjdHxSZXF1ZXN0KX0gZGF0YS5yZXF1ZXN0XHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGEubWV0YWRhdGFcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5tZXRob2RcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5vcmlnaW5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5wcm90b2NvbFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLmhvc3RuYW1lXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRhdGEubWV0YWRhdGEucG9ydFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLnBhdGhcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS5tZXRhZGF0YS5oYXNoXHJcblx0ICogQHBhcmFtIHtVUkxTZWFyY2hQYXJhbXN9IGRhdGEubWV0YWRhdGEucXVlcnlcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRhdGEubWV0YWRhdGEuYXN5bmNcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSB0aGUgbWFuaXB1bGF0ZWQgZGF0YVxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvSW50ZXJjZXB0KGRhdGEpIHtcclxuXHRcdGF3YWl0IHRoaXMucmVhZHk7XHJcblxyXG5cdFx0Y29uc3Qge1x0dXJsLCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdGNvbnN0IHsgb3JpZ2luIH0gPSBtZXRhZGF0YTtcclxuXHRcdGlmICh0aGlzLiNpc0lnbm9yZWQob3JpZ2luLCBkYXRhLnVybC50b1N0cmluZygpKSkgcmV0dXJuIGRhdGE7XHJcblxyXG5cdFx0Y29uc3QgY2hhaW4gPSBhd2FpdCB0aGlzLiNnZXRDaGFpbihvcmlnaW4sIHsgdXJsLCBtZXRhZGF0YSB9KTtcclxuXHRcdGlmICghY2hhaW4pIHJldHVybiBkYXRhO1xyXG5cclxuXHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIGNoYWluKSBkYXRhID0gKGF3YWl0IGludGVyY2VwdG9yLmRvSGFuZGxlKGRhdGEpKSB8fCBkYXRhO1xyXG5cclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblx0cmVzZXQoKSB7XHJcblx0XHR0aGlzLiNjYWNoZSA9IG5ldyBNYXAoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIG1ha2UgYSBjbGFzc2ljIGZldGNoIGNhbGwgd2l0aG91dCBpbnRlcmNlcHRpb25cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xVUkx9IHVybCBcclxuXHQgKiBAcGFyYW0ge29iamVjdHxSZXF1ZXN0fSByZXF1ZXN0IFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cclxuXHQgKi9cclxuXHRhc3luYyB1bmNoZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3QpIHtcclxuXHRcdHJldHVybiBPUkdGRVRDSCh1cmwsIHJlcXVlc3QpO1xyXG5cdH1cclxuXHJcblx0I2lzSWdub3JlZChvcmlnaW4sIHVybCkge1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZWRVcmxzLmhhcyh1cmwpKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGlmICh0aGlzLiNpZ25vcmVEb2N1bWVudE9yaWdpbiAmJiBvcmlnaW4gPT0gQ1VSUkVOVE9SSUdJTikgcmV0dXJuIHRydWU7XHJcblx0XHRpZiAodGhpcy4jaWdub3JlZE9yaWdpbnNbb3JpZ2luXSkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgI2dldENoYWluKG9yaWdpbiwgZGF0YSkge1xyXG5cdFx0bGV0IGNoYWluID0gdGhpcy4jY2FjaGUuZ2V0KG9yaWdpbik7XHJcblx0XHRpZiAoIWNoYWluKSB7XHJcblx0XHRcdGNoYWluID0gdGhpcy4jaW50ZXJjZXB0b3JGb3JPcmlnaW4oZGF0YSk7XHJcblx0XHRcdHRoaXMuI2NhY2hlLnNldChvcmlnaW4sIGNoYWluKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2hhaW47XHJcblx0fVxyXG5cclxuXHRhc3luYyAjaW50ZXJjZXB0b3JGb3JPcmlnaW4oZGF0YSkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKGxldCBpbnRlcmNlcHRvciBvZiB0aGlzLiNpbnRlcmNlcHRvcnMpIHtcclxuXHRcdFx0aWYgKGF3YWl0IGludGVyY2VwdG9yLmRvQWNjZXB0KGRhdGEpKSByZXN1bHQucHVzaChpbnRlcmNlcHRvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IElOU1RBTkNFID0gbmV3IE1hbmFnZXIoKTtcclxuc2V0VGltZW91dCgoKSA9PiBJTlNUQU5DRS5yZWFkeSwgMTAwKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElOU1RBTkNFO1xyXG5leHBvcnQgeyBNYW5hZ2VyIH07XHJcbiIsIlxyXG4vKiogXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IE1ldGFkYXRhXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXRob2RcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG9yaWdpblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcHJvdG9jb2xcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGhvc3RuYW1lXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bWJlcn0gcG9ydFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0aFxyXG4gKiBAcHJvcGVydHkge1VSTFNlYXJjaFBhcmFtc30gcXVlcnlcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGhhc2hcclxuICogQHByb3BlcnR5IHtib29sZWFufSBhc3luY1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXNlcm5hbWVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhc3N3b3JkXHJcbiAqL1xyXG5cclxuLyoqIFxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBJbnRlcmNlcHRvckRhdGFcclxuICogQHByb3BlcnR5IHtVUkx9IHVybFxyXG4gKiBAcHJvcGVydHkge1JlcXVlc3R9IHJlcXVlc3RcclxuICogQHByb3BlcnR5IHtNZXRhZGF0YX0gbWV0YWRhdGFcclxuKi8iLCJjb25zdCBHTE9CQUwgPSAoKCkgPT4ge1xuXHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBzZWxmOyB9XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gd2luZG93OyB9XG5cdGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZ2xvYmFsOyB9XG5cdHJldHVybiB7fTtcbn0pKCk7XG5cbmV4cG9ydCB7R0xPQkFMfTtcbmNvbnN0IFV0aWxzID0ge1xuXHRHTE9CQUwgOiBHTE9CQUxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyAiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdMT0JBTCB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBcIi4vVHlwZURlZnMuanNcIjtcclxuXHJcbigoWE1MSHR0cFJlcXVlc3QpID0+IHtcclxuXHRjbGFzcyBFeHRYTUxIdHRwUmVxdWVzdCBleHRlbmRzIFhNTEh0dHBSZXF1ZXN0IHtcclxuXHRcdC8qKlxyXG5cdFx0ICogQHR5cGUge0ludGVyY2VwdG9yRGF0YX1cclxuXHRcdCAqL1xyXG5cdFx0I2RhdGE7XHJcblxyXG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRSZXF1ZXN0SGVhZGVyKGFOYW1lLCBhVmFsdWUpIHtcclxuXHRcdFx0dGhpcy4jZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSB0aGlzLiNkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRcdFx0dGhpcy4jZGF0YS5yZXF1ZXN0LmhlYWRlcnNbYU5hbWVdID0gYVZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wZW4oYU1ldGhvZCwgYVVybCwgaXNBc3luYywgYVVzZXJuYW1lLCBhUGFzc3dvcmQpIHtcclxuXHRcdFx0Y29uc3QgdXJsID0gYVVybCBpbnN0YW5jZW9mIFVSTCA/IGFVcmwgOiBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbik7XHJcblxyXG5cdFx0XHR0aGlzLiNkYXRhID0ge1xyXG5cdFx0XHRcdHVybCxcclxuXHRcdFx0XHRyZXF1ZXN0OiB7XHJcblx0XHRcdFx0XHRtZXRob2Q6IGFNZXRob2QsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRtZXRhZGF0YToge1xyXG5cdFx0XHRcdFx0bWV0aG9kOiBhTWV0aG9kLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiB1cmwub3JpZ2luLFxyXG5cdFx0XHRcdFx0cHJvdG9jb2w6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRcdGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcblx0XHRcdFx0XHRwb3J0OiB1cmwucG9ydCxcclxuXHRcdFx0XHRcdHBhdGg6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdFx0aGFzaDogdXJsLmhhc2gsXHJcblx0XHRcdFx0XHRhc3luYzogdHlwZW9mIGlzQXN5bmMgPT09IFwiYm9vbGVhblwiID8gaXNBc3luYyA6IHRydWUsXHJcblx0XHRcdFx0XHR1c2VybmFtZTogYVVzZXJuYW1lLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQ6IGFQYXNzd29yZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbmQoYUJvZHkpIHtcclxuXHRcdFx0dGhpcy4jZGF0YS5yZXF1ZXN0LmJvZHkgPSBhQm9keTtcclxuXHRcdFx0TWFuYWdlci5kb0ludGVyY2VwdCh0aGlzLiNkYXRhKVxyXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnN0IHsgdXJsLCByZXF1ZXN0LCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdFx0XHRcdGNvbnN0IHsgbWV0aG9kLCBoZWFkZXJzLCBib2R5IH0gPSByZXF1ZXN0O1xyXG5cdFx0XHRcdFx0Y29uc3QgeyBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBtZXRhZGF0YTtcclxuXHRcdFx0XHRcdGNvbnN0IHRhcmdldCA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyB1cmwgOiB1cmwudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdHN1cGVyLm9wZW4obWV0aG9kLCB0YXJnZXQsIGFzeW5jLCB1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIikgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaCgoaGVhZGVyKSA9PiBzdXBlci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKSk7XHJcblx0XHRcdFx0XHRzdXBlci5zZW5kKGJvZHkpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0W1wiY2F0Y2hcIl0oY29uc29sZS5lcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRHTE9CQUwuWE1MSHR0cFJlcXVlc3QgPSBFeHRYTUxIdHRwUmVxdWVzdDtcclxufSkoR0xPQkFMLlhNTEh0dHBSZXF1ZXN0KTtcclxuIiwiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBcIi4vWE1MSHR0cFJlcXVlc3RcIjtcclxuaW1wb3J0IFwiLi9GZXRjaFwiO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi9JbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQgaW50ZXJjZXB0b3JzIGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xyXG5cclxuR0xPQkFMLmRlZmF1bHRqcyA9IEdMT0JBTC5kZWZhdWx0anMgfHwge307XHJcbkdMT0JBTC5kZWZhdWx0anMuaHR0cGludGVyY2VwdG9yID0gR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgfHwge1xyXG5cdFZFUlNJT04gOiBcIiR7dmVyc2lvbn1cIixcclxuXHRNYW5hZ2VyLFxyXG5cdEludGVyY2VwdG9yLFxyXG5cdGludGVyY2VwdG9yc1xyXG59OyIsImltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIlxyXG5cclxuY29uc3QgT0F1dGhJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGFTZXR1cCl7XHJcblx0Y29uc3Qgc2V0dXAgPSBhU2V0dXA7XHJcblx0c2V0dXAuZmV0Y2hUb2tlbiA9IGFzeW5jICgpID0+IHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc2V0dXAubG9naW4udXJsLCB7XHJcblx0XHRcdG1ldGhvZDogKHNldHVwLmxvZ2luLm1ldGhvZCB8fCBcImdldFwiKVxyXG5cdFx0fSk7XHJcblx0XHRyZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJldHVybiByZXNwb25zZVtzZXR1cC5sb2dpbi5yZXNwb25zZS52YWx1ZVNlbGVjdG9yXTtcclxuXHR9O1xyXG5cdHJldHVybiBUb2tlbkludGVyY2VwdG9yKGFTZXR1cCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPQXV0aEludGVyY2VwdG9yO1xyXG4iLCIvKipcclxuICogYVNldHVwICA9PlxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9XHJcbiAqL1xyXG5cclxuY29uc3QgZGVmYXVsdFRva2VuQXBwZW5kZXIgPSBhc3luYyAodG9rZW4sIGRhdGEpID0+IHtcclxuXHRkYXRhLnJlcXVlc3QuaGVhZGVycyA9IGRhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdGRhdGEucmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5pbXBvcnQgSW50ZXJjZXB0b3IgZnJvbSBcIi4uL0ludGVyY2VwdG9yXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuSW50ZXJjZXB0b3IgZXh0ZW5kcyBJbnRlcmNlcHRvciB7XHJcblxyXG5cdCN0b2tlbiA9IG51bGw7XHJcblx0I2xhc3REYXRhID0ge307XHJcblx0I2NvbmRpdGlvbjtcclxuXHQjZmV0Y2hUb2tlbjtcclxuXHQjYXBwZW5kVG9rZW47XHJcblx0I3JlZnJlc2hJbnRlcnZhbDtcclxuXHQjcmVmcmVzaFRva2VuO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih7IGNvbmRpdGlvbiwgZmV0Y2hUb2tlbiwgYXBwZW5kVG9rZW4sIHJlZnJlc2hJbnRlcnZhbCA9IDYwICogMTAwMCwgcmVmcmVzaFRva2VuIH0pIHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHRpZih0eXBlb2YgY29uZGl0aW9uICE9PSBcInN0cmluZ1wiICYmICEoY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpICYmIHR5cGVvZiBjb25kaXRpb24gIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJjb25kaXRpb25cIiBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgXCJhcnJheVwiIG9yIFwiZnVuY3Rpb25cIiFgKTtcclxuXHRcdHRoaXMuI2NvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuXHRcdFxyXG5cdFx0aWYodHlwZW9mIGZldGNoVG9rZW4gIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJmZXRjaFRva2VuXCIgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIiFgKTtcclxuXHRcdHRoaXMuI2ZldGNoVG9rZW4gPSBmZXRjaFRva2VuO1xyXG5cclxuXHRcdGlmKGFwcGVuZFRva2VuICYmIHR5cGVvZiBhcHBlbmRUb2tlbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImFwcGVuZFRva2VuXCIgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIiFgKTtcclxuXHRcdHRoaXMuI2FwcGVuZFRva2VuID0gYXBwZW5kVG9rZW4gfHwgZGVmYXVsdFRva2VuQXBwZW5kZXI7XHJcblxyXG5cdFx0dGhpcy4jcmVmcmVzaEludGVydmFsID0gcmVmcmVzaEludGVydmFsO1xyXG5cdFx0dGhpcy4jcmVmcmVzaFRva2VuID0gcmVmcmVzaFRva2VuO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZG9BY2NlcHQoZGF0YSkge1xyXG5cdFx0Y29uc3QgdHlwZSA9IHR5cGVvZiB0aGlzLiNjb25kaXRpb247XHJcblx0XHRjb25zdCBjb25kaXRpb24gPSB0aGlzLiNjb25kaXRpb247XHJcblx0XHRjb25zdCBvcmlnaW4gPSBkYXRhLm1ldGFkYXRhLm9yaWdpbjtcclxuXHRcdGlmICh0eXBlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBhd2FpdCBjb25kaXRpb24oZGF0YSk7XHJcblx0XHRlbHNlIGlmICh0eXBlID09PSBcInN0cmluZ1wiKSByZXR1cm4gY29uZGl0aW9uID09IG9yaWdpbjtcclxuXHRcdGVsc2UgaWYgKGNvbmRpdGlvbiBpbnN0YW5jZW9mIEFycmF5KVxyXG5cdFx0XHRyZXR1cm4gY29uZGl0aW9uLmluY2x1ZGVzKG9yaWdpbik7XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZG9IYW5kbGUoZGF0YSkge1xyXG5cdFx0aWYgKCF0aGlzLiN0b2tlbikge1xyXG5cdFx0XHRjb25zdCB7IHVybCwgbWV0YWRhdGEgfSA9IGRhdGE7XHJcblx0XHRcdHRoaXMuI2xhc3REYXRhID0geyB1cmwsIG1ldGFkYXRhIH07XHJcblx0XHRcdHRoaXMuI3Rva2VuID0gdGhpcy4jZmV0Y2hUb2tlbih7IHVybCwgbWV0YWRhdGEgfSk7XHJcblx0XHRcdHRoaXMuI3N0YXJ0UmVmcmVzaCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLiNjYWxsQXBwZW5kVG9rZW4oZGF0YSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyAjY2FsbEFwcGVuZFRva2VuKGRhdGEpIHtcclxuXHRcdGNvbnN0IGFwcGVuZGVyID0gdGhpcy4jYXBwZW5kVG9rZW47XHJcblx0XHRjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuI3Rva2VuO1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgYXBwZW5kZXIodG9rZW4sIGRhdGEpO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQgPyByZXN1bHQgOiBkYXRhO1xyXG5cdH1cclxuXHJcblx0I3N0YXJ0UmVmcmVzaCgpIHtcclxuXHRcdGlmICh0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgPiAwKSB7XHJcblx0XHRcdGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuI3JlZnJlc2hUb2tlbiB8fCAoKCkgPT4gdGhpcy4jZmV0Y2hUb2tlbih0aGlzLiNsYXN0RGF0YSkpO1xyXG5cdFx0XHRjb25zdCB0aW1lb3V0ID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLiNyZWZyZXNoVG9rZW4pXHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLiNyZWZyZXNoVG9rZW4odGhpcy4jbGFzdERhdGEpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuI2ZldGNoVG9rZW4odGhpcy4jbGFzdERhdGEpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KHRpbWVvdXQsdGhpcy4jcmVmcmVzaEludGVydmFsICk7XHJcblx0XHRcdH07XHJcblxyXG5cclxuXHRcdFx0c2V0VGltZW91dCh0aW1lb3V0ICwgdGhpcy4jcmVmcmVzaEludGVydmFsKTtcclxuXHRcdH1cclxuXHR9XHJcbn07IiwiaW1wb3J0IE9BdXRoSW50ZXJjZXB0b3IgZnJvbSBcIi4vT0F1dGhJbnRlcmNlcHRvclwiO1xyXG5pbXBvcnQgVG9rZW5JbnRlcmNlcHRvciBmcm9tIFwiLi9Ub2tlbkludGVyY2VwdG9yXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgIHtcclxuXHRPQXV0aEludGVyY2VwdG9yLFxyXG5cdFRva2VuSW50ZXJjZXB0b3JcclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3NyYy9pbmRleFwiOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==