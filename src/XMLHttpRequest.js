import Manager from "./Manager";
import Constants from "./Constants";


if(typeof XMLHttpRequest !== "undefined"){	
	const ORGOPEN = XMLHttpRequest.prototype.open;
	const ORGSEND = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.open = function(){
		let match = Constants.URLSPLITTER.exec(arguments[1]);
		this.__interceptorRequestData = {
			method : arguments[0],
			url : arguments[1],
			origin: match[1] || document.location.origin,
			protocol : (function(match){
				if(typeof match[2] === "undefined" || match[3] == "//")
					return document.location.protocol || "http:";
				else return match[3];			
			}).call(null, match),
			hostname: match[4] || document.location.hostname,
			port: match[6],
			query: match[7],
			async : typeof arguments[2] === "boolean" ? arguments[2] : true
		};
		return ORGOPEN.apply(this, arguments);	
	};
	
	XMLHttpRequest.prototype.send = function(){        
	    if(this.__interceptorRequestData.async){
	        let send = (function(args){
	            return ORGSEND.apply(this, args);
	        }).bind(this, arguments);
    		Manager.doIntercept(this.__interceptorRequestData, this)
    		.then(function(aData, aRequest){
    			try{
    				return send();
    			}catch (e) {
    				throw e;
    			}
    		})["catch"](console.error);

            return this;
	    }
	    console.warn(new Error("request interceptor don't support syncronized requests"));
	    return ORGSEND.apply(this, arguments);
	};
}