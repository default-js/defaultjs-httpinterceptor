import Manager from "./Manager";
import Constants from "./Constants";

(function(Global){
	if(typeof Global.fetch !== "function")
		return;	
	const ORGFETCH = Global.fetch;
	Global.fetch = function(aUrl, aRequest){
		let match = Constants.URLSPLITTER.exec(aUrl);
		let data = {
			url : aUrl,
			request : aRequest || {},
			metadata : {					
				method : typeof aRequest === "undefined" ? "GET" : (aRequest.method || "GET"),
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
			}
		};
		
		return Manager.doIntercept(data)
		.then(function(data){
			return ORGFETCH(data.url, data.request);
		})["catch"](function(error){throw error});
	};
})(window || global || self, this, {});