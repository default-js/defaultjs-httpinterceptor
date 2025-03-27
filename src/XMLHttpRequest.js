import Manager from "./Manager";
import { GLOBAL } from "./Utils";
import "./TypeDefs.js";

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
			const url = aUrl instanceof URL ? aUrl : new URL(aUrl, GLOBAL.location);

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
			Manager.doIntercept(this.#data)
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

	GLOBAL.XMLHttpRequest = ExtXMLHttpRequest;
})(GLOBAL.XMLHttpRequest);
