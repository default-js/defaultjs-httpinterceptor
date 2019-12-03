import Manager from "./Manager";
import Constants from "./Constants";

(function(Global){
	if(typeof Global.fetch === "function"){	
		const ORGFETCH = Global.fetch;
		Global.fetch = function(aUrl, aRequest){
			let send = (function(args){
				return ORGFETCH.apply(this, args);
			}).bind(this, arguments);
			let request = aRequest || {};
			let match = Constants.URLSPLITTER.exec(aUrl);
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
			
			return Manager.doIntercept(data, request)
			.then(function(){
				return send();
			})["catch"](function(error){throw error});
		};
	};
})(window || global || {});