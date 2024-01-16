import { GLOBAL } from "./Utils";
import { ORGFETCH } from "./Constants";
const CURRENTORIGIN = GLOBAL.location.origin;

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
		return ORGFETCH(url, request);
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


export default INSTANCE;
export {Manager};