import { ORGFETCH } from "./Constants.js";
import "./TypeDefs.js";

/**
 * Interface for classes that represents a request intercepter implementation.
 * 
 * @interface
 */
export default class Interceptor {
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
		return ORGFETCH(url, request);
	}
}
