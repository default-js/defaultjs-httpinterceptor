import { GLOBAL } from "./Utils";
import {ORGFETCH} from "./Constants";
const CURRENTORIGIN = GLOBAL.location.origin;

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
		return ORGFETCH(url, request);
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


export default INSTANCE;


