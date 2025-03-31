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
			for (let interceptor of aInterceptor)
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
							for (let interceptor of interceptors)
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
			chain = await this.#interceptorForOrigin(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0ZrRDtBQUNBO0FBQ2xEO0FBQ0E7QUFDQSxpRUFBZ0I7QUFDaEIsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixDQUFDOzs7Ozs7VUNQRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvRmV0Y2guanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9JbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9UeXBlRGVmcy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL1V0aWxzLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvWE1MSHR0cFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9PQXV0aEludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL1Rva2VuSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuZXhwb3J0IGNvbnN0IE9SR0ZFVENIID0gR0xPQkFMLmZldGNoOyIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7T1JHRkVUQ0h9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cdFxyXG5HTE9CQUwuZmV0Y2ggPSBhc3luYyBmdW5jdGlvbihhVXJsLCBhUmVxdWVzdCl7XHJcblx0Y29uc3QgdXJsID0gYVVybCBpbnN0YW5jZW9mIFVSTCA/IGFVcmwgOiBuZXcgVVJMKGFVcmwsIEdMT0JBTC5sb2NhdGlvbik7XHJcblx0Y29uc3QgZGF0YSA9IGF3YWl0IE1hbmFnZXIuZG9JbnRlcmNlcHQoe1xyXG5cdFx0XHR1cmwsXHJcblx0XHRcdHJlcXVlc3QgOiBhUmVxdWVzdCB8fCB7fSxcclxuXHRcdFx0bWV0YWRhdGEgOiB7XHJcblx0XHRcdFx0bWV0aG9kIDogdHlwZW9mIGFSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJHRVRcIiA6IChhUmVxdWVzdC5tZXRob2QgfHwgXCJHRVRcIiksXHJcblx0XHRcdFx0b3JpZ2luOiB1cmwub3JpZ2luLFxyXG5cdFx0XHRcdHByb3RvY29sIDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcblx0XHRcdFx0cG9ydDogdXJsLnBvcnQsXHJcblx0XHRcdFx0cGF0aCA6IHVybC5wYXRobmFtZSxcclxuXHRcdFx0XHRoYXNoIDogdXJsLmhhc2gsXHJcblx0XHRcdFx0cXVlcnk6IHVybC5zZWFyY2gsXHJcblx0XHRcdFx0YXN5bmMgOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0XHRcclxuXHRyZXR1cm4gT1JHRkVUQ0goZGF0YS51cmwsIGRhdGEucmVxdWVzdCk7XHJcbn07IiwiaW1wb3J0IHsgT1JHRkVUQ0ggfSBmcm9tIFwiLi9Db25zdGFudHMuanNcIjtcclxuaW1wb3J0IFwiLi9UeXBlRGVmcy5qc1wiO1xyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgY2xhc3NlcyB0aGF0IHJlcHJlc2VudHMgYSByZXF1ZXN0IGludGVyY2VwdGVyIGltcGxlbWVudGF0aW9uLlxyXG4gKiBcclxuICogQGludGVyZmFjZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJjZXB0b3Ige1xyXG5cdC8qKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7SW50ZXJjZXB0b3JEYXRhfSBkYXRhIFxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvQWNjZXB0KGRhdGEpIHt9XHJcblx0LyoqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHtJbnRlcmNlcHRvckRhdGF9IGRhdGEgXHJcblx0ICogQHJldHVybnMge0ludGVyY2VwdG9yRGF0YSB8IHVuZGVmaW5lZCB9XHJcblx0ICovXHJcblx0YXN5bmMgZG9IYW5kbGUoZGF0YSkge31cclxuXHJcblx0LyoqXHJcblx0ICogQGFzeW5jXHJcblx0ICogQHBhcmFtIHsoc3RyaW5nfFVSTCl9IHVybFxyXG5cdCAqIEBwYXJhbSB7KG9iamVjdHxSZXF1ZXN0KX0gcmVxdWVzdFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn1cclxuXHQgKi9cclxuXHRhc3luYyB1bmNlY2tlZEZldGNoKHVybCwgcmVxdWVzdCkge1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEdMT0JBTCB9IGZyb20gXCIuL1V0aWxzLmpzXCI7XHJcbmltcG9ydCB7IE9SR0ZFVENIIH0gZnJvbSBcIi4vQ29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi9JbnRlcmNlcHRvci5qc1wiO1xyXG5jb25zdCBDVVJSRU5UT1JJR0lOID0gR0xPQkFMLmxvY2F0aW9uLm9yaWdpbjtcclxuXHJcbmNsYXNzIE1hbmFnZXIge1xyXG5cdCNjYWNoZSA9IG5ldyBNYXAoKTtcclxuXHQjaWdub3JlZFVybHMgPSBuZXcgU2V0KCk7XHJcblx0I2lnbm9yZWRPcmlnaW5zID0gbmV3IFNldCgpO1xyXG5cdCNpZ25vcmVEb2N1bWVudE9yaWdpbiA9IGZhbHNlO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtBcnJheTxJbnRlcmNlcHRvcj59XHJcblx0ICovXHJcblx0I2ludGVyY2VwdG9ycyA9IFtdO1xyXG5cdC8qKlxyXG5cdCAqIEB0eXBlIHtBcnJheTxGdW5jdGlvbnxQcm9taXNlPEFycmF5PEludGVyY2VwdG9yPj58UHJvbWlzZTxJbnRlcmNlcHRvcj59XHJcblx0ICovXHJcblx0I3NldHVwID0gW107XHJcblx0I3JlYWR5Q2hlY2sgPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIGlnbm9yZXMgaW50ZXJjZXB0b3JzIGZvciB0aGUgY3VycmVudCBkb2N1bWVudCBvcmlnaW5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHNldCBpZ25vcmVEb2N1bWVudE9yaWdpbih2YWx1ZSkge1xyXG5cdFx0dGhpcy4jaWdub3JlRG9jdW1lbnRPcmlnaW4gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGFkZCBvcmlnaW5zIHRvIGJlIGlnbm9yZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xVUkx8QXJyYXk8c3RyaW5nPnxBcnJheTxVUkw+fSBvcmlnaW5zXHJcblx0ICovXHJcblx0YWRkT3JpZ2luVG9JZ25vcmUob3JpZ2lucykge1xyXG5cdFx0aWYgKG9yaWdpbnMgaW5zdGFuY2VvZiBBcnJheSkgZm9yIChsZXQgb3JpZ2luIG9mIG9yaWdpbnMpIHRoaXMuI2lnbm9yZWRPcmlnaW5zLmFkZChvcmlnaW4udG9TdHJpbmcoKSk7XHJcblx0XHRlbHNlIHRoaXMuI2lnbm9yZWRPcmlnaW5zW29yaWdpbnMudG9TdHJpbmcoKV0gPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogYWRkIHVybHMgdG8gYmUgaWdub3JlZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfFVSTHxBcnJheTxzdHJpbmc+fEFycmF5PFVSTD59IHVybHNcclxuXHQgKi9cclxuXHRhZGRVcmxUb0lnbm9yZSh1cmxzKSB7XHJcblx0XHRpZiAodXJscyBpbnN0YW5jZW9mIEFycmF5KSBmb3IgKGxldCB1cmwgb2YgdXJscykgdGhpcy4jaWdub3JlZFVybHMuYWRkKHVybC50b1N0cmluZygpKTtcclxuXHRcdGVsc2UgdGhpcy4jaWdub3JlZFVybHMuYWRkKHVybHMudG9TdHJpbmcoKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufFByb21pc2U8QXJyYXk8SW50ZXJjZXB0b3I+PnxQcm9taXNlPEludGVyY2VwdG9yPn0gYVNldHVwXHJcblx0ICovXHJcblx0c2V0dXAoYVNldHVwKSB7XHJcblx0XHRpZiAodHlwZW9mIGFTZXR1cCA9PT0gXCJmdW5jdGlvblwiIHx8IGFTZXR1cCBpbnN0YW5jZW9mIFByb21pc2UpIFxyXG5cdFx0XHR0aGlzLiNzZXR1cC5wdXNoKGFTZXR1cCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge0ludGVyY2VwdG9yfEFycmF5PEludGVyY2VwdG9yPnxvYmplY3R9IGFJbnRlcmNlcHRvciBcclxuXHQgKiBAcmV0dXJucyBcclxuXHQgKi9cclxuXHRhZGRJbnRlcmNlcHRvcihhSW50ZXJjZXB0b3IpIHtcclxuXHRcdGlmIChhSW50ZXJjZXB0b3IgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0Zm9yIChsZXQgaW50ZXJjZXB0b3Igb2YgYUludGVyY2VwdG9yKVxyXG5cdFx0XHRcdHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xyXG5cdFx0aWYgKHR5cGVvZiBhSW50ZXJjZXB0b3IgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcImZ1bmN0aW9uIHJlcXVpcmVkIGFuIGludGVyY2VwdG9yXCIpO1xyXG5cdFx0aWYgKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9BY2NlcHQgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcImRvQWNjZXB0XCIgZnVuY3Rpb24hJyk7XHJcblx0XHRpZiAodHlwZW9mIGFJbnRlcmNlcHRvci5kb0hhbmRsZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFwiZG9IYW5kbGVcIiBmdW5jdGlvbiEnKTtcclxuXHJcblx0XHR0aGlzLiNpbnRlcmNlcHRvcnMucHVzaChhSW50ZXJjZXB0b3IpO1xyXG5cdFx0dGhpcy5yZXNldCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHJlYWRvbmx5XHJcblx0ICogQHR5cGUge1Byb21pc2U8Pn1cclxuXHQgKi9cclxuXHRnZXQgcmVhZHkoKSB7XHJcblx0XHRyZXR1cm4gKCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuI3NldHVwLmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRcdGlmICh0aGlzLiNyZWFkeUNoZWNrKSByZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHJcblx0XHRcdHRoaXMuI3JlYWR5Q2hlY2sgPSAoYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdHdoaWxlICh0aGlzLiNzZXR1cC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2V0dXAgPSB0aGlzLiNzZXR1cC5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0Y29uc3QgaW50ZXJjZXB0b3JzID0gYXdhaXQgKHNldHVwIGluc3RhbmNlb2YgUHJvbWlzZSA/IHNldHVwIDogc2V0dXAoKSk7XHJcblx0XHRcdFx0XHRpZiAoaW50ZXJjZXB0b3JzKVxyXG5cdFx0XHRcdFx0XHRpZiAoaW50ZXJjZXB0b3JzIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaW50ZXJjZXB0b3Igb2YgaW50ZXJjZXB0b3JzKVxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hZGRJbnRlcmNlcHRvcihpbnRlcmNlcHRvcik7XHJcblx0XHRcdFx0XHRcdGVsc2UgaWYgKGludGVyY2VwdG9ycyBpbnN0YW5jZW9mIEludGVyY2VwdG9yKSBcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFkZEludGVyY2VwdG9yKGludGVyY2VwdG9ycyk7XHJcblx0XHRcdFx0XHRcdGVsc2UgXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hZGRJbnRlcmNlcHRvcihpbnRlcmNlcHRvcnMpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4jcmVhZHlDaGVjayA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVhZHk7XHJcblx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHRcdH0pKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXHJcblx0ICogQHBhcmFtIHsoc3RyaW5nfFVSTCl9IGRhdGEudXJsXHJcblx0ICogQHBhcmFtIHsob2JqZWN0fFJlcXVlc3QpfSBkYXRhLnJlcXVlc3RcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YS5tZXRhZGF0YVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLm1ldGhvZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLm9yaWdpblxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLnByb3RvY29sXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEuaG9zdG5hbWVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGF0YS5tZXRhZGF0YS5wb3J0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEucGF0aFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLmhhc2hcclxuXHQgKiBAcGFyYW0ge1VSTFNlYXJjaFBhcmFtc30gZGF0YS5tZXRhZGF0YS5xdWVyeVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZGF0YS5tZXRhZGF0YS5hc3luY1xyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IHRoZSBtYW5pcHVsYXRlZCBkYXRhXHJcblx0ICovXHJcblx0YXN5bmMgZG9JbnRlcmNlcHQoZGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHJcblx0XHRjb25zdCB7XHR1cmwsIG1ldGFkYXRhIH0gPSBkYXRhO1xyXG5cdFx0Y29uc3QgeyBvcmlnaW4gfSA9IG1ldGFkYXRhO1xyXG5cdFx0aWYgKHRoaXMuI2lzSWdub3JlZChvcmlnaW4sIGRhdGEudXJsLnRvU3RyaW5nKCkpKSByZXR1cm4gZGF0YTtcclxuXHJcblx0XHRjb25zdCBjaGFpbiA9IGF3YWl0IHRoaXMuI2dldENoYWluKG9yaWdpbiwgeyB1cmwsIG1ldGFkYXRhIH0pO1xyXG5cdFx0aWYgKCFjaGFpbikgcmV0dXJuIGRhdGE7XHJcblxyXG5cdFx0Zm9yIChsZXQgaW50ZXJjZXB0b3Igb2YgY2hhaW4pIGRhdGEgPSAoYXdhaXQgaW50ZXJjZXB0b3IuZG9IYW5kbGUoZGF0YSkpIHx8IGRhdGE7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuI2NhY2hlID0gbmV3IE1hcCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogbWFrZSBhIGNsYXNzaWMgZmV0Y2ggY2FsbCB3aXRob3V0IGludGVyY2VwdGlvblxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gdXJsIFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fFJlcXVlc3R9IHJlcXVlc3QgXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHVuY2hlY2tlZEZldGNoKHVybCwgcmVxdWVzdCkge1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG5cclxuXHQjaXNJZ25vcmVkKG9yaWdpbiwgdXJsKSB7XHJcblx0XHRpZiAodGhpcy4jaWdub3JlZFVybHMuaGFzKHVybCkpIHJldHVybiB0cnVlO1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZURvY3VtZW50T3JpZ2luICYmIG9yaWdpbiA9PSBDVVJSRU5UT1JJR0lOKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGlmICh0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5dKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyAjZ2V0Q2hhaW4ob3JpZ2luLCBkYXRhKSB7XHJcblx0XHRsZXQgY2hhaW4gPSB0aGlzLiNjYWNoZS5nZXQob3JpZ2luKTtcclxuXHRcdGlmICghY2hhaW4pIHtcclxuXHRcdFx0Y2hhaW4gPSBhd2FpdCB0aGlzLiNpbnRlcmNlcHRvckZvck9yaWdpbihkYXRhKTtcclxuXHRcdFx0dGhpcy4jY2FjaGUuc2V0KG9yaWdpbiwgY2hhaW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGFpbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jICNpbnRlcmNlcHRvckZvck9yaWdpbihkYXRhKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIHRoaXMuI2ludGVyY2VwdG9ycykge1xyXG5cdFx0XHRpZiAoYXdhaXQgaW50ZXJjZXB0b3IuZG9BY2NlcHQoZGF0YSkpIHJlc3VsdC5wdXNoKGludGVyY2VwdG9yKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgSU5TVEFOQ0UgPSBuZXcgTWFuYWdlcigpO1xyXG5zZXRUaW1lb3V0KCgpID0+IElOU1RBTkNFLnJlYWR5LCAxMDApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSU5TVEFOQ0U7XHJcbmV4cG9ydCB7IE1hbmFnZXIgfTtcclxuIiwiXHJcbi8qKiBcclxuICogQHR5cGVkZWYge29iamVjdH0gTWV0YWRhdGFcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3JpZ2luXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwcm90b2NvbFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaG9zdG5hbWVcclxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfSBwb3J0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRoXHJcbiAqIEBwcm9wZXJ0eSB7VVJMU2VhcmNoUGFyYW1zfSBxdWVyeVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaGFzaFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGFzeW5jXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1c2VybmFtZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGFzc3dvcmRcclxuICovXHJcblxyXG4vKiogXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEludGVyY2VwdG9yRGF0YVxyXG4gKiBAcHJvcGVydHkge1VSTH0gdXJsXHJcbiAqIEBwcm9wZXJ0eSB7UmVxdWVzdH0gcmVxdWVzdFxyXG4gKiBAcHJvcGVydHkge01ldGFkYXRhfSBtZXRhZGF0YVxyXG4qLyIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XG5cdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHNlbGY7IH1cblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiB3aW5kb3c7IH1cblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBnbG9iYWw7IH1cblx0cmV0dXJuIHt9O1xufSkoKTtcblxuZXhwb3J0IHtHTE9CQUx9O1xuY29uc3QgVXRpbHMgPSB7XG5cdEdMT0JBTCA6IEdMT0JBTFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7ICIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR0xPQkFMIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9UeXBlRGVmcy5qc1wiO1xyXG5cclxuKChYTUxIdHRwUmVxdWVzdCkgPT4ge1xyXG5cdGNsYXNzIEV4dFhNTEh0dHBSZXF1ZXN0IGV4dGVuZHMgWE1MSHR0cFJlcXVlc3Qge1xyXG5cdFx0LyoqXHJcblx0XHQgKiBAdHlwZSB7SW50ZXJjZXB0b3JEYXRhfVxyXG5cdFx0ICovXHJcblx0XHQjZGF0YTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFJlcXVlc3RIZWFkZXIoYU5hbWUsIGFWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLiNkYXRhLnJlcXVlc3QuaGVhZGVycyA9IHRoaXMuI2RhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdFx0XHR0aGlzLiNkYXRhLnJlcXVlc3QuaGVhZGVyc1thTmFtZV0gPSBhVmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0b3BlbihhTWV0aG9kLCBhVXJsLCBpc0FzeW5jLCBhVXNlcm5hbWUsIGFQYXNzd29yZCkge1xyXG5cdFx0XHRjb25zdCB1cmwgPSBhVXJsIGluc3RhbmNlb2YgVVJMID8gYVVybCA6IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uKTtcclxuXHJcblx0XHRcdHRoaXMuI2RhdGEgPSB7XHJcblx0XHRcdFx0dXJsLFxyXG5cdFx0XHRcdHJlcXVlc3Q6IHtcclxuXHRcdFx0XHRcdG1ldGhvZDogYU1ldGhvZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGFkYXRhOiB7XHJcblx0XHRcdFx0XHRtZXRob2Q6IGFNZXRob2QsXHJcblx0XHRcdFx0XHRvcmlnaW46IHVybC5vcmlnaW4sXHJcblx0XHRcdFx0XHRwcm90b2NvbDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdFx0cGF0aDogdXJsLnBhdGhuYW1lLFxyXG5cdFx0XHRcdFx0cXVlcnk6IHVybC5zZWFyY2gsXHJcblx0XHRcdFx0XHRoYXNoOiB1cmwuaGFzaCxcclxuXHRcdFx0XHRcdGFzeW5jOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lOiBhVXNlcm5hbWUsXHJcblx0XHRcdFx0XHRwYXNzd29yZDogYVBhc3N3b3JkLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2VuZChhQm9keSkge1xyXG5cdFx0XHR0aGlzLiNkYXRhLnJlcXVlc3QuYm9keSA9IGFCb2R5O1xyXG5cdFx0XHRNYW5hZ2VyLmRvSW50ZXJjZXB0KHRoaXMuI2RhdGEpXHJcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgeyB1cmwsIHJlcXVlc3QsIG1ldGFkYXRhIH0gPSBkYXRhO1xyXG5cdFx0XHRcdFx0Y29uc3QgeyBtZXRob2QsIGhlYWRlcnMsIGJvZHkgfSA9IHJlcXVlc3Q7XHJcblx0XHRcdFx0XHRjb25zdCB7IGFzeW5jLCB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IG1ldGFkYXRhO1xyXG5cdFx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gdHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIiA/IHVybCA6IHVybC50b1N0cmluZygpO1xyXG5cdFx0XHRcdFx0c3VwZXIub3BlbihtZXRob2QsIHRhcmdldCwgYXN5bmMsIHVzZXJuYW1lLCBwYXNzd29yZCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBoZWFkZXJzICE9PSBcInVuZGVmaW5lZFwiKSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKChoZWFkZXIpID0+IHN1cGVyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pKTtcclxuXHRcdFx0XHRcdHN1cGVyLnNlbmQoYm9keSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRbXCJjYXRjaFwiXShjb25zb2xlLmVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdCA9IEV4dFhNTEh0dHBSZXF1ZXN0O1xyXG59KShHTE9CQUwuWE1MSHR0cFJlcXVlc3QpO1xyXG4iLCJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuL0ludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBpbnRlcmNlcHRvcnMgZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcclxuR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgPSBHTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdE1hbmFnZXIsXHJcblx0SW50ZXJjZXB0b3IsXHJcblx0aW50ZXJjZXB0b3JzXHJcbn07IiwiaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiXHJcblxyXG5jb25zdCBPQXV0aEludGVyY2VwdG9yID0gZnVuY3Rpb24oYVNldHVwKXtcclxuXHRjb25zdCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KTtcclxuXHRcdHJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdO1xyXG5cdH07XHJcblx0cmV0dXJuIFRva2VuSW50ZXJjZXB0b3IoYVNldHVwKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9BdXRoSW50ZXJjZXB0b3I7XHJcbiIsIi8qKlxyXG4gKiBhU2V0dXAgID0+XHJcbiAqIHtcclxuICogXHRjb25kaXRpb24gOiBbc3RyaW5nIHwgc3RyaW5nW10gfCBmdW5jdGlvbihhRGF0YX1dLFxyXG4gKiBcdGZldGNoVG9rZW4gOiBmdW5jdGlvbigpLFxyXG4gKiAgYXBwZW5kVG9rZW4gOiBmdW5jdGlvbihhVG9rZW4sIGFEYXRhKSxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaEludGVydmFsLFxyXG4gKiAgKG9wdGlvbmFsKSByZWZyZXNoVG9rZW4gOiBmdW5jdGlvbigpXHJcbiAqIH1cclxuICovXHJcblxyXG5jb25zdCBkZWZhdWx0VG9rZW5BcHBlbmRlciA9IGFzeW5jICh0b2tlbiwgZGF0YSkgPT4ge1xyXG5cdGRhdGEucmVxdWVzdC5oZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgfHwge307XHJcblx0ZGF0YS5yZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke3Rva2VufWA7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi4vSW50ZXJjZXB0b3JcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5JbnRlcmNlcHRvciBleHRlbmRzIEludGVyY2VwdG9yIHtcclxuXHJcblx0I3Rva2VuID0gbnVsbDtcclxuXHQjbGFzdERhdGEgPSB7fTtcclxuXHQjY29uZGl0aW9uO1xyXG5cdCNmZXRjaFRva2VuO1xyXG5cdCNhcHBlbmRUb2tlbjtcclxuXHQjcmVmcmVzaEludGVydmFsO1xyXG5cdCNyZWZyZXNoVG9rZW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHsgY29uZGl0aW9uLCBmZXRjaFRva2VuLCBhcHBlbmRUb2tlbiwgcmVmcmVzaEludGVydmFsID0gNjAgKiAxMDAwLCByZWZyZXNoVG9rZW4gfSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGlmKHR5cGVvZiBjb25kaXRpb24gIT09IFwic3RyaW5nXCIgJiYgIShjb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSkgJiYgdHlwZW9mIGNvbmRpdGlvbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImNvbmRpdGlvblwiIG11c3QgYmUgYSBcInN0cmluZ1wiLCBcImFycmF5XCIgb3IgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YgZmV0Y2hUb2tlbiAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcImZldGNoVG9rZW5cIiBtdXN0IGJlIGEgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jZmV0Y2hUb2tlbiA9IGZldGNoVG9rZW47XHJcblxyXG5cdFx0aWYoYXBwZW5kVG9rZW4gJiYgdHlwZW9mIGFwcGVuZFRva2VuICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiYXBwZW5kVG9rZW5cIiBtdXN0IGJlIGEgXCJmdW5jdGlvblwiIWApO1xyXG5cdFx0dGhpcy4jYXBwZW5kVG9rZW4gPSBhcHBlbmRUb2tlbiB8fCBkZWZhdWx0VG9rZW5BcHBlbmRlcjtcclxuXHJcblx0XHR0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgPSByZWZyZXNoSW50ZXJ2YWw7XHJcblx0XHR0aGlzLiNyZWZyZXNoVG9rZW4gPSByZWZyZXNoVG9rZW47XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0FjY2VwdChkYXRhKSB7XHJcblx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHRoaXMuI2NvbmRpdGlvbjtcclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IHRoaXMuI2NvbmRpdGlvbjtcclxuXHRcdGNvbnN0IG9yaWdpbiA9IGRhdGEubWV0YWRhdGEub3JpZ2luO1xyXG5cdFx0aWYgKHR5cGUgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGF3YWl0IGNvbmRpdGlvbihkYXRhKTtcclxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHJldHVybiBjb25kaXRpb24gPT0gb3JpZ2luO1xyXG5cdFx0ZWxzZSBpZiAoY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdHJldHVybiBjb25kaXRpb24uaW5jbHVkZXMob3JpZ2luKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkb0hhbmRsZShkYXRhKSB7XHJcblx0XHRpZiAoIXRoaXMuI3Rva2VuKSB7XHJcblx0XHRcdGNvbnN0IHsgdXJsLCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdFx0dGhpcy4jbGFzdERhdGEgPSB7IHVybCwgbWV0YWRhdGEgfTtcclxuXHRcdFx0dGhpcy4jdG9rZW4gPSB0aGlzLiNmZXRjaFRva2VuKHsgdXJsLCBtZXRhZGF0YSB9KTtcclxuXHRcdFx0dGhpcy4jc3RhcnRSZWZyZXNoKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuI2NhbGxBcHBlbmRUb2tlbihkYXRhKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jICNjYWxsQXBwZW5kVG9rZW4oZGF0YSkge1xyXG5cdFx0Y29uc3QgYXBwZW5kZXIgPSB0aGlzLiNhcHBlbmRUb2tlbjtcclxuXHRcdGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy4jdG9rZW47XHJcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBhcHBlbmRlcih0b2tlbiwgZGF0YSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdCA/IHJlc3VsdCA6IGRhdGE7XHJcblx0fVxyXG5cclxuXHQjc3RhcnRSZWZyZXNoKCkge1xyXG5cdFx0aWYgKHRoaXMuI3JlZnJlc2hJbnRlcnZhbCA+IDApIHtcclxuXHRcdFx0Y29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy4jcmVmcmVzaFRva2VuIHx8ICgoKSA9PiB0aGlzLiNmZXRjaFRva2VuKHRoaXMuI2xhc3REYXRhKSk7XHJcblx0XHRcdGNvbnN0IHRpbWVvdXQgPSBhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuI3JlZnJlc2hUb2tlbilcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuI3JlZnJlc2hUb2tlbih0aGlzLiNsYXN0RGF0YSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy4jZmV0Y2hUb2tlbih0aGlzLiNsYXN0RGF0YSk7XHJcblxyXG5cdFx0XHRcdHNldFRpbWVvdXQodGltZW91dCx0aGlzLiNyZWZyZXNoSW50ZXJ2YWwgKTtcclxuXHRcdFx0fTtcclxuXHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KHRpbWVvdXQgLCB0aGlzLiNyZWZyZXNoSW50ZXJ2YWwpO1xyXG5cdFx0fVxyXG5cdH1cclxufTsiLCJpbXBvcnQgT0F1dGhJbnRlcmNlcHRvciBmcm9tIFwiLi9PQXV0aEludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAge1xyXG5cdE9BdXRoSW50ZXJjZXB0b3IsXHJcblx0VG9rZW5JbnRlcmNlcHRvclxyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9