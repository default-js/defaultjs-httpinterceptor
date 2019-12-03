import Manager from "./Manager";
import Constants from "./Constants";

(function(Global){
	if(typeof Global.XMLHttpRequest === "undefined")
		return;

	const ORGXHR = Global.XMLHttpRequest;
	const executeRequest = function(aData){
		ORGXHR.prototype.open.call(this, aData.request.method, aData.url, aData.metadata.async, aData.metadata.username, aData.metadata.password);
		if(typeof aData.request.headers !== "undefined")
			Object.getOwnPropertyNames(aData.request.headers)
			.forEach((function(aHeader){
				ORGXHR.prototype.setRequestHeader.call(this, aHeader, aData.request.headers[aHeader]);
			}).bind(this));
		ORGXHR.prototype.send.call(this, aData.request.body);
	}
	let XHR = function (){
		const xhr = new ORGXHR(arguments);
		let data = undefined;		
		
		xhr.setRequestHeader = function(aName, aValue){
			data.request.headers = data.request.headers || {};			
			data.request.headers[aName] = aValue;
		};
		
		xhr.open = function(aMethod, aUrl, isAsync, aUsername, aPassword){		
			let match = Constants.URLSPLITTER.exec(aUrl);
			data = {
				url : aUrl,
				request : {
					method : aMethod
				},
				metadata : {
					method : aMethod,
					origin: match[1] || document.location.origin,
					protocol : (function(match){
						if(typeof match[2] === "undefined" || match[3] == "//")
							return document.location.protocol || "http:";
						else return match[3];			
					}).call(null, match),
					hostname: match[4] || document.location.hostname,
					port: match[6],
					query: match[7],
					async : typeof isAsync === "boolean" ? isAsync : true,
					username : aUsername,
					password : aPassword
				}
			};
		};
		
		xhr.send = function(aBody){
			if(data.metadata.async){
				data.request.body = aBody; 
	    		Manager.doIntercept(data)
	    		.then(executeRequest.bind(xhr))
	    		["catch"](console.error);
		    }
			else
				executeRequest.call(xhr, data);
		};
		
		return xhr;
	};
	
	Global.XMLHttpRequest = XHR;
	Global.XMLHttpRequest.prototype = ORGXHR.prototype;
	Global.XMLHttpRequest.prototype.constructor = XHR;
	
	
})(window || global || self, this, {});