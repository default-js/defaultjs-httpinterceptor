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
					const setup = this.#setup[0];
					const interceptors = await (setup instanceof Promise ? setup : setup());
					if (interceptors)
						if (interceptors instanceof Array)
							for (let interceptor of interceptors)
								this.addInterceptor(interceptor);
						else if (interceptors instanceof _Interceptor_js__WEBPACK_IMPORTED_MODULE_2__["default"]) 
							this.addInterceptor(interceptors);
						else 
							this.addInterceptor(interceptors);

					this.#setup.shift();
				}
				this.#readyCheck = null;
				return await this.ready;
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
					const { url, request, metadata } = data;
					const { method, headers, body } = request;
					const { async, username, password } = metadata;
					const target = typeof url === "string" ? url : url.toString();
					super.open(method, target, async, username, password);

					if (typeof headers !== "undefined" && headers != null){
						if(headers instanceof Headers)
							headers.forEach((value, name) => super.setRequestHeader(name, value));
						else
							Object.getOwnPropertyNames(headers).forEach((header) => super.setRequestHeader(header, headers[header]));
					}
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


const HEADER__AUTHORIZATION = "Authorization";

const defaultTokenAppender = async (token, data) => {
	const headers = data.request.headers = data.request.headers || {};
	if(headers instanceof Headers)
		headers.set(HEADER__AUTHORIZATION)
	else
		headers[HEADER__AUTHORIZATION] = `Bearer ${token}`;
	
	return data;
}



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHa0Q7QUFDQTtBQUNsRDtBQUNBO0FBQ0EsaUVBQWdCO0FBQ2hCLGlCQUFpQjtBQUNqQixpQkFBaUI7QUFDakIsQ0FBQzs7Ozs7O1VDUEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL0ZldGNoLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9NYW5hZ2VyLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvVHlwZURlZnMuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9VdGlscy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL1hNTEh0dHBSZXF1ZXN0LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci8uL3NyYy9pbnRlcmNlcHRvcnMvT0F1dGhJbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vc3JjL2ludGVyY2VwdG9ycy9Ub2tlbkludGVyY2VwdG9yLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3IvLi9zcmMvaW50ZXJjZXB0b3JzL2luZGV4LmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWh0dHBpbnRlcmNlcHRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1odHRwaW50ZXJjZXB0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHTE9CQUx9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmV4cG9ydCBjb25zdCBPUkdGRVRDSCA9IEdMT0JBTC5mZXRjaDsiLCJpbXBvcnQgTWFuYWdlciBmcm9tIFwiLi9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7R0xPQkFMfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQge09SR0ZFVENIfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuXHRcclxuR0xPQkFMLmZldGNoID0gYXN5bmMgZnVuY3Rpb24oYVVybCwgYVJlcXVlc3Qpe1xyXG5cdGNvbnN0IHVybCA9IGFVcmwgaW5zdGFuY2VvZiBVUkwgPyBhVXJsIDogbmV3IFVSTChhVXJsLCBHTE9CQUwubG9jYXRpb24pO1xyXG5cdGNvbnN0IGRhdGEgPSBhd2FpdCBNYW5hZ2VyLmRvSW50ZXJjZXB0KHtcclxuXHRcdFx0dXJsLFxyXG5cdFx0XHRyZXF1ZXN0IDogYVJlcXVlc3QgfHwge30sXHJcblx0XHRcdG1ldGFkYXRhIDoge1xyXG5cdFx0XHRcdG1ldGhvZCA6IHR5cGVvZiBhUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiR0VUXCIgOiAoYVJlcXVlc3QubWV0aG9kIHx8IFwiR0VUXCIpLFxyXG5cdFx0XHRcdG9yaWdpbjogdXJsLm9yaWdpbixcclxuXHRcdFx0XHRwcm90b2NvbCA6IHVybC5wcm90b2NvbCxcclxuXHRcdFx0XHRob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG5cdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdHBhdGggOiB1cmwucGF0aG5hbWUsXHJcblx0XHRcdFx0aGFzaCA6IHVybC5oYXNoLFxyXG5cdFx0XHRcdHF1ZXJ5OiB1cmwuc2VhcmNoLFxyXG5cdFx0XHRcdGFzeW5jIDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdFx0XHJcblx0cmV0dXJuIE9SR0ZFVENIKGRhdGEudXJsLCBkYXRhLnJlcXVlc3QpO1xyXG59OyIsImltcG9ydCB7IE9SR0ZFVENIIH0gZnJvbSBcIi4vQ29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBcIi4vVHlwZURlZnMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGNsYXNzZXMgdGhhdCByZXByZXNlbnRzIGEgcmVxdWVzdCBpbnRlcmNlcHRlciBpbXBsZW1lbnRhdGlvbi5cclxuICogXHJcbiAqIEBpbnRlcmZhY2VcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyY2VwdG9yIHtcclxuXHQvKipcclxuXHQgKiBAYXN5bmNcclxuXHQgKiBAcGFyYW0ge0ludGVyY2VwdG9yRGF0YX0gZGF0YSBcclxuXHQgKi9cclxuXHRhc3luYyBkb0FjY2VwdChkYXRhKSB7fVxyXG5cdC8qKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7SW50ZXJjZXB0b3JEYXRhfSBkYXRhIFxyXG5cdCAqIEByZXR1cm5zIHtJbnRlcmNlcHRvckRhdGEgfCB1bmRlZmluZWQgfVxyXG5cdCAqL1xyXG5cdGFzeW5jIGRvSGFuZGxlKGRhdGEpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBhc3luY1xyXG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xVUkwpfSB1cmxcclxuXHQgKiBAcGFyYW0geyhvYmplY3R8UmVxdWVzdCl9IHJlcXVlc3RcclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59XHJcblx0ICovXHJcblx0YXN5bmMgdW5jZWNrZWRGZXRjaCh1cmwsIHJlcXVlc3QpIHtcclxuXHRcdHJldHVybiBPUkdGRVRDSCh1cmwsIHJlcXVlc3QpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBHTE9CQUwgfSBmcm9tIFwiLi9VdGlscy5qc1wiO1xyXG5pbXBvcnQgeyBPUkdGRVRDSCB9IGZyb20gXCIuL0NvbnN0YW50cy5qc1wiO1xyXG5pbXBvcnQgSW50ZXJjZXB0b3IgZnJvbSBcIi4vSW50ZXJjZXB0b3IuanNcIjtcclxuY29uc3QgQ1VSUkVOVE9SSUdJTiA9IEdMT0JBTC5sb2NhdGlvbi5vcmlnaW47XHJcblxyXG5jbGFzcyBNYW5hZ2VyIHtcclxuXHQjY2FjaGUgPSBuZXcgTWFwKCk7XHJcblx0I2lnbm9yZWRVcmxzID0gbmV3IFNldCgpO1xyXG5cdCNpZ25vcmVkT3JpZ2lucyA9IG5ldyBTZXQoKTtcclxuXHQjaWdub3JlRG9jdW1lbnRPcmlnaW4gPSBmYWxzZTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBAdHlwZSB7QXJyYXk8SW50ZXJjZXB0b3I+fVxyXG5cdCAqL1xyXG5cdCNpbnRlcmNlcHRvcnMgPSBbXTtcclxuXHQvKipcclxuXHQgKiBAdHlwZSB7QXJyYXk8RnVuY3Rpb258UHJvbWlzZTxBcnJheTxJbnRlcmNlcHRvcj4+fFByb21pc2U8SW50ZXJjZXB0b3I+fVxyXG5cdCAqL1xyXG5cdCNzZXR1cCA9IFtdO1xyXG5cdCNyZWFkeUNoZWNrID0gbnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcclxuXHQvKipcclxuXHQgKiBpZ25vcmVzIGludGVyY2VwdG9ycyBmb3IgdGhlIGN1cnJlbnQgZG9jdW1lbnQgb3JpZ2luXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzZXQgaWdub3JlRG9jdW1lbnRPcmlnaW4odmFsdWUpIHtcclxuXHRcdHRoaXMuI2lnbm9yZURvY3VtZW50T3JpZ2luID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBhZGQgb3JpZ2lucyB0byBiZSBpZ25vcmVkXHJcblx0ICogQHBhcmFtIHtzdHJpbmd8VVJMfEFycmF5PHN0cmluZz58QXJyYXk8VVJMPn0gb3JpZ2luc1xyXG5cdCAqL1xyXG5cdGFkZE9yaWdpblRvSWdub3JlKG9yaWdpbnMpIHtcclxuXHRcdGlmIChvcmlnaW5zIGluc3RhbmNlb2YgQXJyYXkpIGZvciAobGV0IG9yaWdpbiBvZiBvcmlnaW5zKSB0aGlzLiNpZ25vcmVkT3JpZ2lucy5hZGQob3JpZ2luLnRvU3RyaW5nKCkpO1xyXG5cdFx0ZWxzZSB0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5zLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGFkZCB1cmxzIHRvIGJlIGlnbm9yZWRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xVUkx8QXJyYXk8c3RyaW5nPnxBcnJheTxVUkw+fSB1cmxzXHJcblx0ICovXHJcblx0YWRkVXJsVG9JZ25vcmUodXJscykge1xyXG5cdFx0aWYgKHVybHMgaW5zdGFuY2VvZiBBcnJheSkgZm9yIChsZXQgdXJsIG9mIHVybHMpIHRoaXMuI2lnbm9yZWRVcmxzLmFkZCh1cmwudG9TdHJpbmcoKSk7XHJcblx0XHRlbHNlIHRoaXMuI2lnbm9yZWRVcmxzLmFkZCh1cmxzLnRvU3RyaW5nKCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbnxQcm9taXNlPEFycmF5PEludGVyY2VwdG9yPj58UHJvbWlzZTxJbnRlcmNlcHRvcj59IGFTZXR1cFxyXG5cdCAqL1xyXG5cdHNldHVwKGFTZXR1cCkge1xyXG5cdFx0aWYgKHR5cGVvZiBhU2V0dXAgPT09IFwiZnVuY3Rpb25cIiB8fCBhU2V0dXAgaW5zdGFuY2VvZiBQcm9taXNlKSBcclxuXHRcdFx0dGhpcy4jc2V0dXAucHVzaChhU2V0dXApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtJbnRlcmNlcHRvcnxBcnJheTxJbnRlcmNlcHRvcj58b2JqZWN0fSBhSW50ZXJjZXB0b3IgXHJcblx0ICogQHJldHVybnMgXHJcblx0ICovXHJcblx0YWRkSW50ZXJjZXB0b3IoYUludGVyY2VwdG9yKSB7XHJcblx0XHRpZiAoYUludGVyY2VwdG9yIGluc3RhbmNlb2YgQXJyYXkpXHJcblx0XHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIGFJbnRlcmNlcHRvcilcclxuXHRcdFx0XHR0aGlzLmFkZEludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJmdW5jdGlvbiByZXF1aXJlZCBhbiBpbnRlcmNlcHRvclwiKTtcclxuXHRcdGlmICh0eXBlb2YgYUludGVyY2VwdG9yLmRvQWNjZXB0ICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcignVGhlIGludGVyY2VwdG9yIHJlcXVpcmVkIGEgXCJkb0FjY2VwdFwiIGZ1bmN0aW9uIScpO1xyXG5cdFx0aWYgKHR5cGVvZiBhSW50ZXJjZXB0b3IuZG9IYW5kbGUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKCdUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcImRvSGFuZGxlXCIgZnVuY3Rpb24hJyk7XHJcblxyXG5cdFx0dGhpcy4jaW50ZXJjZXB0b3JzLnB1c2goYUludGVyY2VwdG9yKTtcclxuXHRcdHRoaXMucmVzZXQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqIEB0eXBlIHtQcm9taXNlPD59XHJcblx0ICovXHJcblx0Z2V0IHJlYWR5KCkge1xyXG5cdFx0cmV0dXJuICgoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLiNzZXR1cC5sZW5ndGggPT0gMCkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHRpZiAodGhpcy4jcmVhZHlDaGVjaykgcmV0dXJuIHRoaXMuI3JlYWR5Q2hlY2s7XHJcblxyXG5cdFx0XHR0aGlzLiNyZWFkeUNoZWNrID0gKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHR3aGlsZSAodGhpcy4jc2V0dXAubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdGNvbnN0IHNldHVwID0gdGhpcy4jc2V0dXBbMF07XHJcblx0XHRcdFx0XHRjb25zdCBpbnRlcmNlcHRvcnMgPSBhd2FpdCAoc2V0dXAgaW5zdGFuY2VvZiBQcm9taXNlID8gc2V0dXAgOiBzZXR1cCgpKTtcclxuXHRcdFx0XHRcdGlmIChpbnRlcmNlcHRvcnMpXHJcblx0XHRcdFx0XHRcdGlmIChpbnRlcmNlcHRvcnMgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpbnRlcmNlcHRvciBvZiBpbnRlcmNlcHRvcnMpXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmFkZEludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAoaW50ZXJjZXB0b3JzIGluc3RhbmNlb2YgSW50ZXJjZXB0b3IpIFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYWRkSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3JzKTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFkZEludGVyY2VwdG9yKGludGVyY2VwdG9ycyk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4jc2V0dXAuc2hpZnQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4jcmVhZHlDaGVjayA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMucmVhZHk7XHJcblx0XHRcdH0pKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy4jcmVhZHlDaGVjaztcclxuXHRcdH0pKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXHJcblx0ICogQHBhcmFtIHsoc3RyaW5nfFVSTCl9IGRhdGEudXJsXHJcblx0ICogQHBhcmFtIHsob2JqZWN0fFJlcXVlc3QpfSBkYXRhLnJlcXVlc3RcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YS5tZXRhZGF0YVxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLm1ldGhvZFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLm9yaWdpblxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLnByb3RvY29sXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEuaG9zdG5hbWVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGF0YS5tZXRhZGF0YS5wb3J0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGEubWV0YWRhdGEucGF0aFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLm1ldGFkYXRhLmhhc2hcclxuXHQgKiBAcGFyYW0ge1VSTFNlYXJjaFBhcmFtc30gZGF0YS5tZXRhZGF0YS5xdWVyeVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZGF0YS5tZXRhZGF0YS5hc3luY1xyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IHRoZSBtYW5pcHVsYXRlZCBkYXRhXHJcblx0ICovXHJcblx0YXN5bmMgZG9JbnRlcmNlcHQoZGF0YSkge1xyXG5cdFx0YXdhaXQgdGhpcy5yZWFkeTtcclxuXHJcblx0XHRjb25zdCB7XHR1cmwsIG1ldGFkYXRhIH0gPSBkYXRhO1xyXG5cdFx0Y29uc3QgeyBvcmlnaW4gfSA9IG1ldGFkYXRhO1xyXG5cdFx0aWYgKHRoaXMuI2lzSWdub3JlZChvcmlnaW4sIGRhdGEudXJsLnRvU3RyaW5nKCkpKSByZXR1cm4gZGF0YTtcclxuXHJcblx0XHRjb25zdCBjaGFpbiA9IGF3YWl0IHRoaXMuI2dldENoYWluKG9yaWdpbiwgeyB1cmwsIG1ldGFkYXRhIH0pO1xyXG5cdFx0aWYgKCFjaGFpbikgcmV0dXJuIGRhdGE7XHJcblxyXG5cdFx0Zm9yIChsZXQgaW50ZXJjZXB0b3Igb2YgY2hhaW4pIGRhdGEgPSAoYXdhaXQgaW50ZXJjZXB0b3IuZG9IYW5kbGUoZGF0YSkpIHx8IGRhdGE7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuI2NhY2hlID0gbmV3IE1hcCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogbWFrZSBhIGNsYXNzaWMgZmV0Y2ggY2FsbCB3aXRob3V0IGludGVyY2VwdGlvblxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfFVSTH0gdXJsIFxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fFJlcXVlc3R9IHJlcXVlc3QgXHJcblx0ICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fVxyXG5cdCAqL1xyXG5cdGFzeW5jIHVuY2hlY2tlZEZldGNoKHVybCwgcmVxdWVzdCkge1xyXG5cdFx0cmV0dXJuIE9SR0ZFVENIKHVybCwgcmVxdWVzdCk7XHJcblx0fVxyXG5cclxuXHQjaXNJZ25vcmVkKG9yaWdpbiwgdXJsKSB7XHJcblx0XHRpZiAodGhpcy4jaWdub3JlZFVybHMuaGFzKHVybCkpIHJldHVybiB0cnVlO1xyXG5cdFx0aWYgKHRoaXMuI2lnbm9yZURvY3VtZW50T3JpZ2luICYmIG9yaWdpbiA9PSBDVVJSRU5UT1JJR0lOKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGlmICh0aGlzLiNpZ25vcmVkT3JpZ2luc1tvcmlnaW5dKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRhc3luYyAjZ2V0Q2hhaW4ob3JpZ2luLCBkYXRhKSB7XHJcblx0XHRsZXQgY2hhaW4gPSB0aGlzLiNjYWNoZS5nZXQob3JpZ2luKTtcclxuXHRcdGlmICghY2hhaW4pIHtcclxuXHRcdFx0Y2hhaW4gPSBhd2FpdCB0aGlzLiNpbnRlcmNlcHRvckZvck9yaWdpbihkYXRhKTtcclxuXHRcdFx0dGhpcy4jY2FjaGUuc2V0KG9yaWdpbiwgY2hhaW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGFpbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jICNpbnRlcmNlcHRvckZvck9yaWdpbihkYXRhKSB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHRcdGZvciAobGV0IGludGVyY2VwdG9yIG9mIHRoaXMuI2ludGVyY2VwdG9ycykge1xyXG5cdFx0XHRpZiAoYXdhaXQgaW50ZXJjZXB0b3IuZG9BY2NlcHQoZGF0YSkpIHJlc3VsdC5wdXNoKGludGVyY2VwdG9yKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgSU5TVEFOQ0UgPSBuZXcgTWFuYWdlcigpO1xyXG5zZXRUaW1lb3V0KCgpID0+IElOU1RBTkNFLnJlYWR5LCAxMDApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSU5TVEFOQ0U7XHJcbmV4cG9ydCB7IE1hbmFnZXIgfTtcclxuIiwiXHJcbi8qKiBcclxuICogQHR5cGVkZWYge29iamVjdH0gTWV0YWRhdGFcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ldGhvZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3JpZ2luXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwcm90b2NvbFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaG9zdG5hbWVcclxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfSBwb3J0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRoXHJcbiAqIEBwcm9wZXJ0eSB7VVJMU2VhcmNoUGFyYW1zfSBxdWVyeVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaGFzaFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGFzeW5jXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1c2VybmFtZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGFzc3dvcmRcclxuICovXHJcblxyXG4vKiogXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEludGVyY2VwdG9yRGF0YVxyXG4gKiBAcHJvcGVydHkge1VSTH0gdXJsXHJcbiAqIEBwcm9wZXJ0eSB7UmVxdWVzdH0gcmVxdWVzdFxyXG4gKiBAcHJvcGVydHkge01ldGFkYXRhfSBtZXRhZGF0YVxyXG4qLyIsImNvbnN0IEdMT0JBTCA9ICgoKSA9PiB7XG5cdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHNlbGY7IH1cblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiB3aW5kb3c7IH1cblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBnbG9iYWw7IH1cblx0cmV0dXJuIHt9O1xufSkoKTtcblxuZXhwb3J0IHtHTE9CQUx9O1xuY29uc3QgVXRpbHMgPSB7XG5cdEdMT0JBTCA6IEdMT0JBTFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7ICIsImltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR0xPQkFMIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9UeXBlRGVmcy5qc1wiO1xyXG5cclxuKChYTUxIdHRwUmVxdWVzdCkgPT4ge1xyXG5cdGNsYXNzIEV4dFhNTEh0dHBSZXF1ZXN0IGV4dGVuZHMgWE1MSHR0cFJlcXVlc3Qge1xyXG5cdFx0LyoqXHJcblx0XHQgKiBAdHlwZSB7SW50ZXJjZXB0b3JEYXRhfVxyXG5cdFx0ICovXHJcblx0XHQjZGF0YTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFJlcXVlc3RIZWFkZXIoYU5hbWUsIGFWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLiNkYXRhLnJlcXVlc3QuaGVhZGVycyA9IHRoaXMuI2RhdGEucmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xyXG5cdFx0XHR0aGlzLiNkYXRhLnJlcXVlc3QuaGVhZGVyc1thTmFtZV0gPSBhVmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0b3BlbihhTWV0aG9kLCBhVXJsLCBpc0FzeW5jLCBhVXNlcm5hbWUsIGFQYXNzd29yZCkge1xyXG5cdFx0XHRjb25zdCB1cmwgPSBhVXJsIGluc3RhbmNlb2YgVVJMID8gYVVybCA6IG5ldyBVUkwoYVVybCwgR0xPQkFMLmxvY2F0aW9uKTtcclxuXHJcblx0XHRcdHRoaXMuI2RhdGEgPSB7XHJcblx0XHRcdFx0dXJsLFxyXG5cdFx0XHRcdHJlcXVlc3Q6IHtcclxuXHRcdFx0XHRcdG1ldGhvZDogYU1ldGhvZCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1ldGFkYXRhOiB7XHJcblx0XHRcdFx0XHRtZXRob2Q6IGFNZXRob2QsXHJcblx0XHRcdFx0XHRvcmlnaW46IHVybC5vcmlnaW4sXHJcblx0XHRcdFx0XHRwcm90b2NvbDogdXJsLnByb3RvY29sLFxyXG5cdFx0XHRcdFx0aG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcclxuXHRcdFx0XHRcdHBvcnQ6IHVybC5wb3J0LFxyXG5cdFx0XHRcdFx0cGF0aDogdXJsLnBhdGhuYW1lLFxyXG5cdFx0XHRcdFx0cXVlcnk6IHVybC5zZWFyY2gsXHJcblx0XHRcdFx0XHRoYXNoOiB1cmwuaGFzaCxcclxuXHRcdFx0XHRcdGFzeW5jOiB0eXBlb2YgaXNBc3luYyA9PT0gXCJib29sZWFuXCIgPyBpc0FzeW5jIDogdHJ1ZSxcclxuXHRcdFx0XHRcdHVzZXJuYW1lOiBhVXNlcm5hbWUsXHJcblx0XHRcdFx0XHRwYXNzd29yZDogYVBhc3N3b3JkLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0c2VuZChhQm9keSkge1xyXG5cdFx0XHR0aGlzLiNkYXRhLnJlcXVlc3QuYm9keSA9IGFCb2R5O1xyXG5cdFx0XHRNYW5hZ2VyLmRvSW50ZXJjZXB0KHRoaXMuI2RhdGEpXHJcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHsgdXJsLCByZXF1ZXN0LCBtZXRhZGF0YSB9ID0gZGF0YTtcclxuXHRcdFx0XHRcdGNvbnN0IHsgbWV0aG9kLCBoZWFkZXJzLCBib2R5IH0gPSByZXF1ZXN0O1xyXG5cdFx0XHRcdFx0Y29uc3QgeyBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBtZXRhZGF0YTtcclxuXHRcdFx0XHRcdGNvbnN0IHRhcmdldCA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyB1cmwgOiB1cmwudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdHN1cGVyLm9wZW4obWV0aG9kLCB0YXJnZXQsIGFzeW5jLCB1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgaGVhZGVycyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBoZWFkZXJzICE9IG51bGwpe1xyXG5cdFx0XHRcdFx0XHRpZihoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycylcclxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiBzdXBlci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKSk7XHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKChoZWFkZXIpID0+IHN1cGVyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN1cGVyLnNlbmQoYm9keSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRbXCJjYXRjaFwiXShjb25zb2xlLmVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEdMT0JBTC5YTUxIdHRwUmVxdWVzdCA9IEV4dFhNTEh0dHBSZXF1ZXN0O1xyXG59KShHTE9CQUwuWE1MSHR0cFJlcXVlc3QpO1xyXG4iLCJpbXBvcnQge0dMT0JBTH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IEludGVyY2VwdG9yIGZyb20gXCIuL0ludGVyY2VwdG9yXCI7XHJcbmltcG9ydCBpbnRlcmNlcHRvcnMgZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5HTE9CQUwuZGVmYXVsdGpzID0gR0xPQkFMLmRlZmF1bHRqcyB8fCB7fTtcclxuR0xPQkFMLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgPSBHTE9CQUwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciB8fCB7XHJcblx0VkVSU0lPTiA6IFwiJHt2ZXJzaW9ufVwiLFxyXG5cdE1hbmFnZXIsXHJcblx0SW50ZXJjZXB0b3IsXHJcblx0aW50ZXJjZXB0b3JzXHJcbn07IiwiaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiXHJcblxyXG5jb25zdCBPQXV0aEludGVyY2VwdG9yID0gZnVuY3Rpb24oYVNldHVwKXtcclxuXHRjb25zdCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KTtcclxuXHRcdHJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdO1xyXG5cdH07XHJcblx0cmV0dXJuIFRva2VuSW50ZXJjZXB0b3IoYVNldHVwKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9BdXRoSW50ZXJjZXB0b3I7XHJcbiIsImltcG9ydCBJbnRlcmNlcHRvciBmcm9tIFwiLi4vSW50ZXJjZXB0b3JcIjtcclxuXHJcbmNvbnN0IEhFQURFUl9fQVVUSE9SSVpBVElPTiA9IFwiQXV0aG9yaXphdGlvblwiO1xyXG5cclxuY29uc3QgZGVmYXVsdFRva2VuQXBwZW5kZXIgPSBhc3luYyAodG9rZW4sIGRhdGEpID0+IHtcclxuXHRjb25zdCBoZWFkZXJzID0gZGF0YS5yZXF1ZXN0LmhlYWRlcnMgPSBkYXRhLnJlcXVlc3QuaGVhZGVycyB8fCB7fTtcclxuXHRpZihoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycylcclxuXHRcdGhlYWRlcnMuc2V0KEhFQURFUl9fQVVUSE9SSVpBVElPTilcclxuXHRlbHNlXHJcblx0XHRoZWFkZXJzW0hFQURFUl9fQVVUSE9SSVpBVElPTl0gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuXHRcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogYVNldHVwICA9PlxyXG4gKiB7XHJcbiAqIFx0Y29uZGl0aW9uIDogW3N0cmluZyB8IHN0cmluZ1tdIHwgZnVuY3Rpb24oYURhdGF9XSxcclxuICogXHRmZXRjaFRva2VuIDogZnVuY3Rpb24oKSxcclxuICogIGFwcGVuZFRva2VuIDogZnVuY3Rpb24oYVRva2VuLCBhRGF0YSksXHJcbiAqICAob3B0aW9uYWwpIHJlZnJlc2hJbnRlcnZhbCxcclxuICogIChvcHRpb25hbCkgcmVmcmVzaFRva2VuIDogZnVuY3Rpb24oKVxyXG4gKiB9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2tlbkludGVyY2VwdG9yIGV4dGVuZHMgSW50ZXJjZXB0b3Ige1xyXG5cclxuXHQjdG9rZW4gPSBudWxsO1xyXG5cdCNsYXN0RGF0YSA9IHt9O1xyXG5cdCNjb25kaXRpb247XHJcblx0I2ZldGNoVG9rZW47XHJcblx0I2FwcGVuZFRva2VuO1xyXG5cdCNyZWZyZXNoSW50ZXJ2YWw7XHJcblx0I3JlZnJlc2hUb2tlbjtcclxuXHJcblx0Y29uc3RydWN0b3IoeyBjb25kaXRpb24sIGZldGNoVG9rZW4sIGFwcGVuZFRva2VuLCByZWZyZXNoSW50ZXJ2YWwgPSA2MCAqIDEwMDAsIHJlZnJlc2hUb2tlbiB9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0aWYodHlwZW9mIGNvbmRpdGlvbiAhPT0gXCJzdHJpbmdcIiAmJiAhKGNvbmRpdGlvbiBpbnN0YW5jZW9mIEFycmF5KSAmJiB0eXBlb2YgY29uZGl0aW9uICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiY29uZGl0aW9uXCIgbXVzdCBiZSBhIFwic3RyaW5nXCIsIFwiYXJyYXlcIiBvciBcImZ1bmN0aW9uXCIhYCk7XHJcblx0XHR0aGlzLiNjb25kaXRpb24gPSBjb25kaXRpb247XHJcblx0XHRcclxuXHRcdGlmKHR5cGVvZiBmZXRjaFRva2VuICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiZmV0Y2hUb2tlblwiIG11c3QgYmUgYSBcImZ1bmN0aW9uXCIhYCk7XHJcblx0XHR0aGlzLiNmZXRjaFRva2VuID0gZmV0Y2hUb2tlbjtcclxuXHJcblx0XHRpZihhcHBlbmRUb2tlbiAmJiB0eXBlb2YgYXBwZW5kVG9rZW4gIT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCJhcHBlbmRUb2tlblwiIG11c3QgYmUgYSBcImZ1bmN0aW9uXCIhYCk7XHJcblx0XHR0aGlzLiNhcHBlbmRUb2tlbiA9IGFwcGVuZFRva2VuIHx8IGRlZmF1bHRUb2tlbkFwcGVuZGVyO1xyXG5cclxuXHRcdHRoaXMuI3JlZnJlc2hJbnRlcnZhbCA9IHJlZnJlc2hJbnRlcnZhbDtcclxuXHRcdHRoaXMuI3JlZnJlc2hUb2tlbiA9IHJlZnJlc2hUb2tlbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRvQWNjZXB0KGRhdGEpIHtcclxuXHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgdGhpcy4jY29uZGl0aW9uO1xyXG5cdFx0Y29uc3QgY29uZGl0aW9uID0gdGhpcy4jY29uZGl0aW9uO1xyXG5cdFx0Y29uc3Qgb3JpZ2luID0gZGF0YS5tZXRhZGF0YS5vcmlnaW47XHJcblx0XHRpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYXdhaXQgY29uZGl0aW9uKGRhdGEpO1xyXG5cdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGNvbmRpdGlvbiA9PSBvcmlnaW47XHJcblx0XHRlbHNlIGlmIChjb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0cmV0dXJuIGNvbmRpdGlvbi5pbmNsdWRlcyhvcmlnaW4pO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRvSGFuZGxlKGRhdGEpIHtcclxuXHRcdGlmICghdGhpcy4jdG9rZW4pIHtcclxuXHRcdFx0Y29uc3QgeyB1cmwsIG1ldGFkYXRhIH0gPSBkYXRhO1xyXG5cdFx0XHR0aGlzLiNsYXN0RGF0YSA9IHsgdXJsLCBtZXRhZGF0YSB9O1xyXG5cdFx0XHR0aGlzLiN0b2tlbiA9IHRoaXMuI2ZldGNoVG9rZW4oeyB1cmwsIG1ldGFkYXRhIH0pO1xyXG5cdFx0XHR0aGlzLiNzdGFydFJlZnJlc2goKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy4jY2FsbEFwcGVuZFRva2VuKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgI2NhbGxBcHBlbmRUb2tlbihkYXRhKSB7XHJcblx0XHRjb25zdCBhcHBlbmRlciA9IHRoaXMuI2FwcGVuZFRva2VuO1xyXG5cdFx0Y29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLiN0b2tlbjtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFwcGVuZGVyKHRva2VuLCBkYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0ID8gcmVzdWx0IDogZGF0YTtcclxuXHR9XHJcblxyXG5cdCNzdGFydFJlZnJlc2goKSB7XHJcblx0XHRpZiAodGhpcy4jcmVmcmVzaEludGVydmFsID4gMCkge1xyXG5cdFx0XHRjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLiNyZWZyZXNoVG9rZW4gfHwgKCgpID0+IHRoaXMuI2ZldGNoVG9rZW4odGhpcy4jbGFzdERhdGEpKTtcclxuXHRcdFx0Y29uc3QgdGltZW91dCA9IGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy4jcmVmcmVzaFRva2VuKVxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy4jcmVmcmVzaFRva2VuKHRoaXMuI2xhc3REYXRhKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLiNmZXRjaFRva2VuKHRoaXMuI2xhc3REYXRhKTtcclxuXHJcblx0XHRcdFx0c2V0VGltZW91dCh0aW1lb3V0LHRoaXMuI3JlZnJlc2hJbnRlcnZhbCApO1xyXG5cdFx0XHR9O1xyXG5cclxuXHJcblx0XHRcdHNldFRpbWVvdXQodGltZW91dCAsIHRoaXMuI3JlZnJlc2hJbnRlcnZhbCk7XHJcblx0XHR9XHJcblx0fVxyXG59OyIsImltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gXCIuL09BdXRoSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICB7XHJcblx0T0F1dGhJbnRlcmNlcHRvcixcclxuXHRUb2tlbkludGVyY2VwdG9yXHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zcmMvaW5kZXhcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=