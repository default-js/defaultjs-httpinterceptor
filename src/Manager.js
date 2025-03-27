import { GLOBAL } from "./Utils.js";
import { ORGFETCH } from "./Constants.js";
import Interceptor from "./Interceptor.js";
const CURRENTORIGIN = GLOBAL.location.origin;

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
	 * @param {string|URL|Iterable<string>|Iterable<URL>} origins
	 */
	addOriginToIgnore(origins) {
		if (Symbol.iterator in origins) for (let origin of origins) this.#ignoredOrigins.add(origin.toString());
		else this.#ignoredOrigins[origins.toString()] = true;
	}

	/**
	 * add urls to be ignored
	 * @param {string|URL|Iterable<string>|Iterable<URL>} urls
	 */
	addUrlToIgnore(urls) {
		if (Symbol.iterator in urls) for (let url of urls) this.#ignoredUrls.add(url.toString());
		else this.#ignoredUrls.add(urls.toString());
	}

	/**
	 * 
	 * @param {Function|Promise<Iterable<Interceptor>>|Promise<Interceptor>} aSetup
	 */
	setup(aSetup) {
		if (typeof aSetup === "function" || aSetup instanceof Promise) 
			this.#setup.push(aSetup);
	}

	/**
	 * 
	 * @param {Interceptor|Iterable<Interceptor>|object} aInterceptor 
	 * @returns 
	 */
	addInterceptor(aInterceptor) {
		if (Symbol.iterator in aInterceptor)
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
						if (Symbol.iterator in interceptors)
							for (interceptor of interceptors)
								this.addInterceptor(interceptor);
						else if (interceptors instanceof Interceptor) 
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
		return ORGFETCH(url, request);
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

export default INSTANCE;
export { Manager };
