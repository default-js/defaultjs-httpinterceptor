import Manager from "./Manager";
import {GLOBAL} from "./Utils";
	
const ORGFETCH = GLOBAL.fetch;
GLOBAL.fetch = function(aUrl, aRequest){
	const url = new URL(aUrl, GLOBAL.location);
	return Manager.doIntercept({
			url : aUrl,
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
		}).then(aData =>ORGFETCH(aData.url, aData.request));
};