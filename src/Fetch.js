import Manager from "./Manager";
import {GLOBAL} from "./Utils";
import {ORGFETCH} from "./Constants";
	
GLOBAL.fetch = async function(aUrl, aRequest){
	const url = new URL(aUrl, GLOBAL.location);
	const data = await Manager.doIntercept({
			url : new URL(aUrl, location),
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
			
	return ORGFETCH(data.url, data.request);
};