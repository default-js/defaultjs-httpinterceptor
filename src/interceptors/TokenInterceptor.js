import Interceptor from "../Interceptor";

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
export default class TokenInterceptor extends Interceptor {

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