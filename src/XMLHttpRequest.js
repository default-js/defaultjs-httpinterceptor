import Manager from "./Manager";
import {GLOBAL} from "./Utils";

if(typeof GLOBAL.XMLHttpRequest !== "undefined"){
	const ORGXHR = GLOBAL.XMLHttpRequest;
	const OPEN = ORGXHR.prototype.open;
	const SETREQUESTHEADER = ORGXHR.prototype.setRequestHeader;
	const SEND = ORGXHR.prototype.send;

	const executeRequest = (aXHR, { url, 
		request: {method, headers, body}, 
		metadata:{async, username, password}}) => {
		url = typeof url === "string" ? url : url.toString();
		OPEN.call(aXHR, method, url, async, username, password);
		if(typeof headers !== "undefined")
			Object.getOwnPropertyNames(headers)
			.forEach(header =>{
				SETREQUESTHEADER.call(aXHR, header, headers[header]);
			});
		SEND.call(aXHR, body);
	};

	const XHR = function (){
		const xhr = new ORGXHR(arguments);
		let data = undefined;
		
		xhr.setRequestHeader = function(aName, aValue){
			data.request.headers = data.request.headers || {};
			data.request.headers[aName] = aValue;
		};
		
		xhr.open = function(aMethod, aUrl, isAsync, aUsername, aPassword){
			const url = new URL(aUrl, GLOBAL.location.origin);
			data = {
				url : new URL(aUrl, location),
				request : {
					method : aMethod
				},
				metadata : {
					method : aMethod,
					origin: url.origin,
					protocol : url.protocol,
					hostname: url.hostname,
					port: url.port,
					path : url.pathname,
					query: url.search,
					hash : url.hash,
					async : typeof isAsync === "boolean" ? isAsync : true,
					username : aUsername,
					password : aPassword
				}
			};
		};
		
		xhr.send = function(aBody){
			data.request.body = aBody; 
			Manager.doIntercept(data)
			.then((data) => executeRequest(xhr, data))
			["catch"](console.error);
		};
		
		return xhr;
	};
	
	GLOBAL.XMLHttpRequest = XHR;
}