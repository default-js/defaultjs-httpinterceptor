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

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const URLSPLITTER = /^((([^:\/]*:)?\/\/)?([^:\/]*)(\:([0-9]*))?)(\/.*)?$/;

/* harmony default export */ __webpack_exports__["a"] = ({URLSPLITTER});

/***/ }),

/***/ "./src/Fetch.js":
/*!**********************!*\
  !*** ./src/Fetch.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");



(function(Global){
	if(typeof Global.fetch === "function"){	
		const ORGFETCH = Global.fetch;
		Global.fetch = function(aUrl, aRequest){
			let send = (function(args){
				return ORGFETCH.apply(this, args);
			}).bind(this, arguments);
			let request = aRequest || {};
			let match = _Constants__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].URLSPLITTER.exec(aUrl);
			let data = {
				method : request.method || "GET",
				url : aUrl,
				origin: match[1] || document.location.origin,
				protocol : (function(match){
					if(typeof match[2] === "undefined" || match[3] == "//")
						return document.location.protocol || "http:";
					else return match[3];			
				}).call(null, match),
				hostname: match[4] || document.location.hostname,
				port: match[6],
				query: match[7],
				async : true
			};
			
			return _Manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].doIntercept(data, request)
			.then(function(){
				return send();
			})["catch"](function(error){throw error});
		};
	};
})(window || global || {});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/Manager.js":
/*!************************!*\
  !*** ./src/Manager.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const INTERCEPTORS = [];
const CACHE = {};

const getChain = function(aData, aRequest){
	let chain = CACHE[aData.server];
	if(typeof chain !== "undefined")
		return Promise.resolve(chain);
	
	chain = [];
	let promises = [];
	INTERCEPTORS.forEach(function(aInterceptor){
		promises.push(
			aInterceptor.doAccept(aData)
			.then(function(value){
				if(value)
					chain.push(aInterceptor);
			}));
	});
	
	return Promise.all(promises)
	.then(function(){
		CACHE[aData.origin] = chain;
		return chain;
	})["catch"](function(error){throw error});
};

const isOriginIgnored = function(data, origins){
	for(let i = 0; i < origins.length; i++)
		if(data.origin == origins[i])
			return true;
	
	return false;
};

const Manager = {
	config : {
		ignoreDocumentOrigin : true,
		ignoreOrigins : []		
	},
	interceptors : [],
	doIntercept : function(aData, aRequest){
		if(Manager.config.ignoreDocumentOrigin && aData.origin == document.location.origin)
			return Promise.resolve(aData, aRequest);
		if(typeof Manager.config.ignoreOrigins !== "undefined" && isOriginIgnored(aData, Manager.config.ignoreOrigins))
			return Promise.resolve(aData, aRequest);
		
		return getChain(aData, aRequest)
		.then(function(chain){
			if(typeof chain === "undefined" || chain.length == 0)
				return Promise.resolve();
			
			let handles = [];
			chain.forEach(function(aInterceptor){
				handles.push(aInterceptor.doHandle(aData, aRequest));
			});			
			return Promise.all(handles);
		}).then(function(){
			return Promise.resolve(aData, aRequest);
		})["catch"](function(error){throw error});
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

/***/ "./src/XMLHttpRequest.js":
/*!*******************************!*\
  !*** ./src/XMLHttpRequest.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/Constants.js");




if(typeof XMLHttpRequest !== "undefined"){	
	const ORGOPEN = XMLHttpRequest.prototype.open;
	const ORGSEND = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.open = function(){
		let match = _Constants__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].URLSPLITTER.exec(arguments[1]);
		this.__interceptorRequestData = {
			method : arguments[0],
			url : arguments[1],
			origin: match[1] || document.location.origin,
			protocol : (function(match){
				if(typeof match[2] === "undefined" || match[3] == "//")
					return document.location.protocol || "http:";
				else return match[3];			
			}).call(null, match),
			hostname: match[4] || document.location.hostname,
			port: match[6],
			query: match[7],
			async : typeof arguments[2] === "boolean" ? arguments[2] : true
		};
		return ORGOPEN.apply(this, arguments);	
	};
	
	XMLHttpRequest.prototype.send = function(){        
	    if(this.__interceptorRequestData.async){
	        let send = (function(args){
	            return ORGSEND.apply(this, args);
	        }).bind(this, arguments);
    		_Manager__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].doIntercept(this.__interceptorRequestData, this)
    		.then(function(aData, aRequest){
    			try{
    				return send();
    			}catch (e) {
    				throw e;
    			}
    		})["catch"](console.error);

            return this;
	    }
	    console.warn(new Error("request interceptor don't support syncronized requests"));
	    return ORGSEND.apply(this, arguments);
	};
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _XMLHttpRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XMLHttpRequest */ "./src/XMLHttpRequest.js");
/* harmony import */ var _Fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fetch */ "./src/Fetch.js");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Manager */ "./src/Manager.js");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interceptors */ "./src/interceptors/index.js");






(function(Global){	
	Global.de = Global.defaultjs || {};
	Global.defaultjs = Global.defaultjs || {};
	Global.defaultjs.httpinterceptor = Global.defaultjs.httpinterceptor || {
		VERSION : "1.0.0-beta.1",
		Manager : _Manager__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
		interceptors : _interceptors__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
	};
})(window|| global || self || undefined || {});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

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



const appendOnFetch = function(aRequest, aToken){
	aRequest.headers = aRequest.header || {};
	aRequest.headers["Authorization"] = "Bearer " + aToken;
};

const appendOnXhr = function(aRequest, aToken){
	aRequest.setRequestHeader("Authorization" , "Bearer " + aToken);	
};

const OAuthInterceptor = function(aSetup){
	let setup = aSetup;
	setup.fetchToken = function(){
		return fetch(setup.login.url, {
			method: (setup.login.method || "get")
		}).then(function(aResponse){
			return aResponse.json();
		}).then(function(aResponse){
			return aResponse[setup.login.response.valueSelector];
		})["catch"](function(error){throw error;});		
	};
	setup.appendOnFetch = appendOnFetch;
	setup.appendOnXhr = appendOnXhr;
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
const TokenInterceptor = function(aSetup){
	const setup = aSetup; 
	let token = undefined;
	
	const defaultRefreshToken = function(){
        new Promise(setup.fetchToken)
        .then(function(aToken){
            token = aToken;
        }); 
    };
	
	if(setup.refreshInterval > 0){
	    const refreshToken = defaultRefreshToken
	    if(typeof setup.refreshToken === "function"){
	        refreshToken = function(){
	            Promise.resolve(setup.refreshToken())
	            .then(function(aToken){
	                token = aToken;
	            }); 
	        };
	    }
	    setInterval(refreshToken, setup.refreshInterval || (60 * 1000))
	}
	
	
	return {
		doAccept : setup.doAccept || function(aData){
			return new Promise(function(resolve){
				let type = typeof setup.condition; 
				if(type === "function")
					resolve(setup.condition(aData));
				else if(type === "string")
					resolve(setup.condition == aData.origin);
				else if(setup.condition instanceof Array){
					for(let i = 0; i < setup.condition.length; i++)
						if(setup.condition[i] == aData.origin)
							resolve(true);
				}	
				resolve(false);
			});	
		},
		doHandle : function(aData, aRequest){
			let isXMLHttpRequest = aRequest instanceof XMLHttpRequest;	
			let appendOn = isXMLHttpRequest ? setup.appendOnXhr : setup.appendOnFetch;
				
			if(typeof token !== "undefined")
				return Promise.resolve(appendOn(aRequest, token));
			else
				return Promise.resolve(setup.fetchToken(aData))
				.then(function(aToken){
					token = aToken;
					return Promise.resolve(appendOn(aRequest, token));
				})["catch"](function(error){throw error});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9GZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvWE1MSHR0cFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmNlcHRvcnMvT0F1dGhJbnRlcmNlcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJjZXB0b3JzL1Rva2VuSW50ZXJjZXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyY2VwdG9ycy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztR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LEU7QUFDSixHQUFHO0FBQ0g7QUFDQSw2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSywyQkFBMkIsWUFBWTtBQUM1QyxHO0FBQ0E7QUFDQTtBQUNlLHlFQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7OztBQ3hEaEM7QUFBQTtBQUFrRDtBQUNBOzs7QUFHbEQ7QUFDQSxvQkFBb0IsaUVBQWdCO0FBQ3BDLG9CQUFvQixpRUFBZ0I7QUFDcEM7O0FBRWUsNkRBQUksRSIsImZpbGUiOiJkZWZhdWx0anMtaHR0cGludGVyY2VwdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBcIi4vc3JjL2luZGV4XCI7IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiY29uc3QgVVJMU1BMSVRURVIgPSAvXigoKFteOlxcL10qOik/XFwvXFwvKT8oW146XFwvXSopKFxcOihbMC05XSopKT8pKFxcLy4qKT8kLztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtVUkxTUExJVFRFUn07IiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cclxuKGZ1bmN0aW9uKEdsb2JhbCl7XHJcblx0aWYodHlwZW9mIEdsb2JhbC5mZXRjaCA9PT0gXCJmdW5jdGlvblwiKXtcdFxyXG5cdFx0Y29uc3QgT1JHRkVUQ0ggPSBHbG9iYWwuZmV0Y2g7XHJcblx0XHRHbG9iYWwuZmV0Y2ggPSBmdW5jdGlvbihhVXJsLCBhUmVxdWVzdCl7XHJcblx0XHRcdGxldCBzZW5kID0gKGZ1bmN0aW9uKGFyZ3Mpe1xyXG5cdFx0XHRcdHJldHVybiBPUkdGRVRDSC5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fSkuYmluZCh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRsZXQgcmVxdWVzdCA9IGFSZXF1ZXN0IHx8IHt9O1xyXG5cdFx0XHRsZXQgbWF0Y2ggPSBDb25zdGFudHMuVVJMU1BMSVRURVIuZXhlYyhhVXJsKTtcclxuXHRcdFx0bGV0IGRhdGEgPSB7XHJcblx0XHRcdFx0bWV0aG9kIDogcmVxdWVzdC5tZXRob2QgfHwgXCJHRVRcIixcclxuXHRcdFx0XHR1cmwgOiBhVXJsLFxyXG5cdFx0XHRcdG9yaWdpbjogbWF0Y2hbMV0gfHwgZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luLFxyXG5cdFx0XHRcdHByb3RvY29sIDogKGZ1bmN0aW9uKG1hdGNoKXtcclxuXHRcdFx0XHRcdGlmKHR5cGVvZiBtYXRjaFsyXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBtYXRjaFszXSA9PSBcIi8vXCIpXHJcblx0XHRcdFx0XHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCB8fCBcImh0dHA6XCI7XHJcblx0XHRcdFx0XHRlbHNlIHJldHVybiBtYXRjaFszXTtcdFx0XHRcclxuXHRcdFx0XHR9KS5jYWxsKG51bGwsIG1hdGNoKSxcclxuXHRcdFx0XHRob3N0bmFtZTogbWF0Y2hbNF0gfHwgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXHJcblx0XHRcdFx0cG9ydDogbWF0Y2hbNl0sXHJcblx0XHRcdFx0cXVlcnk6IG1hdGNoWzddLFxyXG5cdFx0XHRcdGFzeW5jIDogdHJ1ZVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIE1hbmFnZXIuZG9JbnRlcmNlcHQoZGF0YSwgcmVxdWVzdClcclxuXHRcdFx0LnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VuZCgpO1xyXG5cdFx0XHR9KVtcImNhdGNoXCJdKGZ1bmN0aW9uKGVycm9yKXt0aHJvdyBlcnJvcn0pO1xyXG5cdFx0fTtcclxuXHR9O1xyXG59KSh3aW5kb3cgfHwgZ2xvYmFsIHx8IHt9KTsiLCJjb25zdCBJTlRFUkNFUFRPUlMgPSBbXTtcclxuY29uc3QgQ0FDSEUgPSB7fTtcclxuXHJcbmNvbnN0IGdldENoYWluID0gZnVuY3Rpb24oYURhdGEsIGFSZXF1ZXN0KXtcclxuXHRsZXQgY2hhaW4gPSBDQUNIRVthRGF0YS5zZXJ2ZXJdO1xyXG5cdGlmKHR5cGVvZiBjaGFpbiAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoY2hhaW4pO1xyXG5cdFxyXG5cdGNoYWluID0gW107XHJcblx0bGV0IHByb21pc2VzID0gW107XHJcblx0SU5URVJDRVBUT1JTLmZvckVhY2goZnVuY3Rpb24oYUludGVyY2VwdG9yKXtcclxuXHRcdHByb21pc2VzLnB1c2goXHJcblx0XHRcdGFJbnRlcmNlcHRvci5kb0FjY2VwdChhRGF0YSlcclxuXHRcdFx0LnRoZW4oZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0XHRcdGlmKHZhbHVlKVxyXG5cdFx0XHRcdFx0Y2hhaW4ucHVzaChhSW50ZXJjZXB0b3IpO1xyXG5cdFx0XHR9KSk7XHJcblx0fSk7XHJcblx0XHJcblx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxyXG5cdC50aGVuKGZ1bmN0aW9uKCl7XHJcblx0XHRDQUNIRVthRGF0YS5vcmlnaW5dID0gY2hhaW47XHJcblx0XHRyZXR1cm4gY2hhaW47XHJcblx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3J9KTtcclxufTtcclxuXHJcbmNvbnN0IGlzT3JpZ2luSWdub3JlZCA9IGZ1bmN0aW9uKGRhdGEsIG9yaWdpbnMpe1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBvcmlnaW5zLmxlbmd0aDsgaSsrKVxyXG5cdFx0aWYoZGF0YS5vcmlnaW4gPT0gb3JpZ2luc1tpXSlcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuY29uc3QgTWFuYWdlciA9IHtcclxuXHRjb25maWcgOiB7XHJcblx0XHRpZ25vcmVEb2N1bWVudE9yaWdpbiA6IHRydWUsXHJcblx0XHRpZ25vcmVPcmlnaW5zIDogW11cdFx0XHJcblx0fSxcclxuXHRpbnRlcmNlcHRvcnMgOiBbXSxcclxuXHRkb0ludGVyY2VwdCA6IGZ1bmN0aW9uKGFEYXRhLCBhUmVxdWVzdCl7XHJcblx0XHRpZihNYW5hZ2VyLmNvbmZpZy5pZ25vcmVEb2N1bWVudE9yaWdpbiAmJiBhRGF0YS5vcmlnaW4gPT0gZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhLCBhUmVxdWVzdCk7XHJcblx0XHRpZih0eXBlb2YgTWFuYWdlci5jb25maWcuaWdub3JlT3JpZ2lucyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpc09yaWdpbklnbm9yZWQoYURhdGEsIE1hbmFnZXIuY29uZmlnLmlnbm9yZU9yaWdpbnMpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFEYXRhLCBhUmVxdWVzdCk7XHJcblx0XHRcclxuXHRcdHJldHVybiBnZXRDaGFpbihhRGF0YSwgYVJlcXVlc3QpXHJcblx0XHQudGhlbihmdW5jdGlvbihjaGFpbil7XHJcblx0XHRcdGlmKHR5cGVvZiBjaGFpbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjaGFpbi5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgaGFuZGxlcyA9IFtdO1xyXG5cdFx0XHRjaGFpbi5mb3JFYWNoKGZ1bmN0aW9uKGFJbnRlcmNlcHRvcil7XHJcblx0XHRcdFx0aGFuZGxlcy5wdXNoKGFJbnRlcmNlcHRvci5kb0hhbmRsZShhRGF0YSwgYVJlcXVlc3QpKTtcclxuXHRcdFx0fSk7XHRcdFx0XHJcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChoYW5kbGVzKTtcclxuXHRcdH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhRGF0YSwgYVJlcXVlc3QpO1xyXG5cdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3J9KTtcclxuXHR9LFxyXG5cdGFkZEludGVyY2VwdG9yIDogZnVuY3Rpb24oYUludGVyY2VwdG9yKXtcdFx0XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoICE9IDEgJiYgdHlwZW9mIGFJbnRlcmNlcHRvciAhPT0gXCJvYmplY3RcIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiZnVuY3Rpb24gcmVxdWlyZWQgYW4gaW50ZXJjZXB0b3JcIik7XHJcblx0XHRpZih0eXBlb2YgYUludGVyY2VwdG9yLmRvQWNjZXB0ICE9PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnRlcmNlcHRvciByZXF1aXJlZCBhIFxcXCJkb0FjY2VwdFxcXCIgZnVuY3Rpb24hXCIpO1xyXG5cdFx0aWYodHlwZW9mIGFJbnRlcmNlcHRvci5kb0hhbmRsZSAhPT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW50ZXJjZXB0b3IgcmVxdWlyZWQgYSBcXFwiZG9IYW5kbGVcXFwiIGZ1bmN0aW9uIVwiKTtcclxuXHRcdFxyXG5cdFx0SU5URVJDRVBUT1JTLnB1c2goYUludGVyY2VwdG9yKTtcclxuXHRcdHJldHVybiBNYW5hZ2VyO1xyXG5cdH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjsgXHJcblxyXG5cclxuIiwiaW1wb3J0IE1hbmFnZXIgZnJvbSBcIi4vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmlmKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIil7XHRcclxuXHRjb25zdCBPUkdPUEVOID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XHJcblx0Y29uc3QgT1JHU0VORCA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kO1xyXG5cdFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKXtcclxuXHRcdGxldCBtYXRjaCA9IENvbnN0YW50cy5VUkxTUExJVFRFUi5leGVjKGFyZ3VtZW50c1sxXSk7XHJcblx0XHR0aGlzLl9faW50ZXJjZXB0b3JSZXF1ZXN0RGF0YSA9IHtcclxuXHRcdFx0bWV0aG9kIDogYXJndW1lbnRzWzBdLFxyXG5cdFx0XHR1cmwgOiBhcmd1bWVudHNbMV0sXHJcblx0XHRcdG9yaWdpbjogbWF0Y2hbMV0gfHwgZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luLFxyXG5cdFx0XHRwcm90b2NvbCA6IChmdW5jdGlvbihtYXRjaCl7XHJcblx0XHRcdFx0aWYodHlwZW9mIG1hdGNoWzJdID09PSBcInVuZGVmaW5lZFwiIHx8IG1hdGNoWzNdID09IFwiLy9cIilcclxuXHRcdFx0XHRcdHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCB8fCBcImh0dHA6XCI7XHJcblx0XHRcdFx0ZWxzZSByZXR1cm4gbWF0Y2hbM107XHRcdFx0XHJcblx0XHRcdH0pLmNhbGwobnVsbCwgbWF0Y2gpLFxyXG5cdFx0XHRob3N0bmFtZTogbWF0Y2hbNF0gfHwgZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXHJcblx0XHRcdHBvcnQ6IG1hdGNoWzZdLFxyXG5cdFx0XHRxdWVyeTogbWF0Y2hbN10sXHJcblx0XHRcdGFzeW5jIDogdHlwZW9mIGFyZ3VtZW50c1syXSA9PT0gXCJib29sZWFuXCIgPyBhcmd1bWVudHNbMl0gOiB0cnVlXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIE9SR09QRU4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcdFxyXG5cdH07XHJcblx0XHJcblx0WE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbigpeyAgICAgICAgXHJcblx0ICAgIGlmKHRoaXMuX19pbnRlcmNlcHRvclJlcXVlc3REYXRhLmFzeW5jKXtcclxuXHQgICAgICAgIGxldCBzZW5kID0gKGZ1bmN0aW9uKGFyZ3Mpe1xyXG5cdCAgICAgICAgICAgIHJldHVybiBPUkdTRU5ELmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdCAgICAgICAgfSkuYmluZCh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgXHRcdE1hbmFnZXIuZG9JbnRlcmNlcHQodGhpcy5fX2ludGVyY2VwdG9yUmVxdWVzdERhdGEsIHRoaXMpXHJcbiAgICBcdFx0LnRoZW4oZnVuY3Rpb24oYURhdGEsIGFSZXF1ZXN0KXtcclxuICAgIFx0XHRcdHRyeXtcclxuICAgIFx0XHRcdFx0cmV0dXJuIHNlbmQoKTtcclxuICAgIFx0XHRcdH1jYXRjaCAoZSkge1xyXG4gICAgXHRcdFx0XHR0aHJvdyBlO1xyXG4gICAgXHRcdFx0fVxyXG4gICAgXHRcdH0pW1wiY2F0Y2hcIl0oY29uc29sZS5lcnJvcik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHQgICAgfVxyXG5cdCAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKFwicmVxdWVzdCBpbnRlcmNlcHRvciBkb24ndCBzdXBwb3J0IHN5bmNyb25pemVkIHJlcXVlc3RzXCIpKTtcclxuXHQgICAgcmV0dXJuIE9SR1NFTkQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHR9O1xyXG59IiwiaW1wb3J0IFwiLi9YTUxIdHRwUmVxdWVzdFwiO1xyXG5pbXBvcnQgXCIuL0ZldGNoXCI7XHJcbmltcG9ydCBNYW5hZ2VyIGZyb20gXCIuL01hbmFnZXJcIjtcclxuaW1wb3J0IEludGVyY2VwdG9ycyBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcclxuXHJcblxyXG4oZnVuY3Rpb24oR2xvYmFsKXtcdFxyXG5cdEdsb2JhbC5kZSA9IEdsb2JhbC5kZWZhdWx0anMgfHwge307XHJcblx0R2xvYmFsLmRlZmF1bHRqcyA9IEdsb2JhbC5kZWZhdWx0anMgfHwge307XHJcblx0R2xvYmFsLmRlZmF1bHRqcy5odHRwaW50ZXJjZXB0b3IgPSBHbG9iYWwuZGVmYXVsdGpzLmh0dHBpbnRlcmNlcHRvciB8fCB7XHJcblx0XHRWRVJTSU9OIDogXCIke3ZlcnNpb259XCIsXHJcblx0XHRNYW5hZ2VyIDogTWFuYWdlcixcclxuXHRcdGludGVyY2VwdG9ycyA6IEludGVyY2VwdG9yc1xyXG5cdH07XHJcbn0pKHdpbmRvd3x8IGdsb2JhbCB8fCBzZWxmIHx8IHRoaXMgfHwge30pOyIsImltcG9ydCBUb2tlbkludGVyY2VwdG9yIGZyb20gXCIuL1Rva2VuSW50ZXJjZXB0b3JcIlxyXG5cclxuXHJcbmNvbnN0IGFwcGVuZE9uRmV0Y2ggPSBmdW5jdGlvbihhUmVxdWVzdCwgYVRva2VuKXtcclxuXHRhUmVxdWVzdC5oZWFkZXJzID0gYVJlcXVlc3QuaGVhZGVyIHx8IHt9O1xyXG5cdGFSZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gXCJCZWFyZXIgXCIgKyBhVG9rZW47XHJcbn07XHJcblxyXG5jb25zdCBhcHBlbmRPblhociA9IGZ1bmN0aW9uKGFSZXF1ZXN0LCBhVG9rZW4pe1xyXG5cdGFSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIgLCBcIkJlYXJlciBcIiArIGFUb2tlbik7XHRcclxufTtcclxuXHJcbmNvbnN0IE9BdXRoSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihhU2V0dXApe1xyXG5cdGxldCBzZXR1cCA9IGFTZXR1cDtcclxuXHRzZXR1cC5mZXRjaFRva2VuID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmZXRjaChzZXR1cC5sb2dpbi51cmwsIHtcclxuXHRcdFx0bWV0aG9kOiAoc2V0dXAubG9naW4ubWV0aG9kIHx8IFwiZ2V0XCIpXHJcblx0XHR9KS50aGVuKGZ1bmN0aW9uKGFSZXNwb25zZSl7XHJcblx0XHRcdHJldHVybiBhUmVzcG9uc2UuanNvbigpO1xyXG5cdFx0fSkudGhlbihmdW5jdGlvbihhUmVzcG9uc2Upe1xyXG5cdFx0XHRyZXR1cm4gYVJlc3BvbnNlW3NldHVwLmxvZ2luLnJlc3BvbnNlLnZhbHVlU2VsZWN0b3JdO1xyXG5cdFx0fSlbXCJjYXRjaFwiXShmdW5jdGlvbihlcnJvcil7dGhyb3cgZXJyb3I7fSk7XHRcdFxyXG5cdH07XHJcblx0c2V0dXAuYXBwZW5kT25GZXRjaCA9IGFwcGVuZE9uRmV0Y2g7XHJcblx0c2V0dXAuYXBwZW5kT25YaHIgPSBhcHBlbmRPblhocjtcclxuXHRyZXR1cm4gVG9rZW5JbnRlcmNlcHRvcihhU2V0dXApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT0F1dGhJbnRlcmNlcHRvcjtcclxuIiwiY29uc3QgVG9rZW5JbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGFTZXR1cCl7XHJcblx0Y29uc3Qgc2V0dXAgPSBhU2V0dXA7IFxyXG5cdGxldCB0b2tlbiA9IHVuZGVmaW5lZDtcclxuXHRcclxuXHRjb25zdCBkZWZhdWx0UmVmcmVzaFRva2VuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBuZXcgUHJvbWlzZShzZXR1cC5mZXRjaFRva2VuKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGFUb2tlbil7XHJcbiAgICAgICAgICAgIHRva2VuID0gYVRva2VuO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH07XHJcblx0XHJcblx0aWYoc2V0dXAucmVmcmVzaEludGVydmFsID4gMCl7XHJcblx0ICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGRlZmF1bHRSZWZyZXNoVG9rZW5cclxuXHQgICAgaWYodHlwZW9mIHNldHVwLnJlZnJlc2hUb2tlbiA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHQgICAgICAgIHJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKCl7XHJcblx0ICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHNldHVwLnJlZnJlc2hUb2tlbigpKVxyXG5cdCAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFUb2tlbil7XHJcblx0ICAgICAgICAgICAgICAgIHRva2VuID0gYVRva2VuO1xyXG5cdCAgICAgICAgICAgIH0pOyBcclxuXHQgICAgICAgIH07XHJcblx0ICAgIH1cclxuXHQgICAgc2V0SW50ZXJ2YWwocmVmcmVzaFRva2VuLCBzZXR1cC5yZWZyZXNoSW50ZXJ2YWwgfHwgKDYwICogMTAwMCkpXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdHJldHVybiB7XHJcblx0XHRkb0FjY2VwdCA6IHNldHVwLmRvQWNjZXB0IHx8IGZ1bmN0aW9uKGFEYXRhKXtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG5cdFx0XHRcdGxldCB0eXBlID0gdHlwZW9mIHNldHVwLmNvbmRpdGlvbjsgXHJcblx0XHRcdFx0aWYodHlwZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShzZXR1cC5jb25kaXRpb24oYURhdGEpKTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGUgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0XHRyZXNvbHZlKHNldHVwLmNvbmRpdGlvbiA9PSBhRGF0YS5vcmlnaW4pO1xyXG5cdFx0XHRcdGVsc2UgaWYoc2V0dXAuY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHNldHVwLmNvbmRpdGlvbi5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdFx0aWYoc2V0dXAuY29uZGl0aW9uW2ldID09IGFEYXRhLm9yaWdpbilcclxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xyXG5cdFx0XHRcdH1cdFxyXG5cdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xyXG5cdFx0XHR9KTtcdFxyXG5cdFx0fSxcclxuXHRcdGRvSGFuZGxlIDogZnVuY3Rpb24oYURhdGEsIGFSZXF1ZXN0KXtcclxuXHRcdFx0bGV0IGlzWE1MSHR0cFJlcXVlc3QgPSBhUmVxdWVzdCBpbnN0YW5jZW9mIFhNTEh0dHBSZXF1ZXN0O1x0XHJcblx0XHRcdGxldCBhcHBlbmRPbiA9IGlzWE1MSHR0cFJlcXVlc3QgPyBzZXR1cC5hcHBlbmRPblhociA6IHNldHVwLmFwcGVuZE9uRmV0Y2g7XHJcblx0XHRcdFx0XHJcblx0XHRcdGlmKHR5cGVvZiB0b2tlbiAhPT0gXCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFwcGVuZE9uKGFSZXF1ZXN0LCB0b2tlbikpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShzZXR1cC5mZXRjaFRva2VuKGFEYXRhKSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihhVG9rZW4pe1xyXG5cdFx0XHRcdFx0dG9rZW4gPSBhVG9rZW47XHJcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGFwcGVuZE9uKGFSZXF1ZXN0LCB0b2tlbikpO1xyXG5cdFx0XHRcdH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24oZXJyb3Ipe3Rocm93IGVycm9yfSk7XHJcblx0XHR9XHRcdFxyXG5cdH07XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRva2VuSW50ZXJjZXB0b3I7XHJcbiIsImltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gXCIuL09BdXRoSW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0IFRva2VuSW50ZXJjZXB0b3IgZnJvbSBcIi4vVG9rZW5JbnRlcmNlcHRvclwiO1xyXG5cclxuXHJcbmNvbnN0IERhdGEgPSB7XHJcblx0T0F1dGhJbnRlcmNlcHRvciA6IE9BdXRoSW50ZXJjZXB0b3IsXHJcblx0VG9rZW5JbnRlcmNlcHRvciA6IFRva2VuSW50ZXJjZXB0b3JcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7Il0sInNvdXJjZVJvb3QiOiIifQ==