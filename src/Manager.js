import {GLOBAL} from "./Utils";

const INTERCEPTORS = [];
let CACHE = {};

const getChain = function(aData){
	const chain = CACHE[aData.metadata.origin];
	if(typeof chain !== "undefined")
		return chain;
	
	const promises = INTERCEPTORS.map(interceptor => 
		Promise.resolve(interceptor.doAccept(aData))
		.then(value => (value ? interceptor : undefined)));
	
	CACHE[aData.metadata.origin] = Promise.all(promises)
	.then(interceptors => 
		interceptors.filter(interceptor => typeof interceptor !== "undefined"));
	
	return CACHE[aData.metadata.origin];
};

const isOriginIgnored = function(data, origins){
	for(let i = 0; i < origins.length; i++)
		if(data.metadata.origin == origins[i])
			return true;
	
	return false;
};

const Manager = {
	config : {
		ignoreDocumentOrigin : true,
		ignoreOrigins : []
	},
	interceptors : [],
	doIntercept : function(aData){
		if(Manager.config.ignoreDocumentOrigin && aData.metadata.origin == GLOBAL.location.origin)
			return Promise.resolve(aData);
		if(typeof Manager.config.ignoreOrigins !== "undefined" && isOriginIgnored(aData, Manager.config.ignoreOrigins))
			return Promise.resolve(aData);
		
		return getChain(aData)
		.then( chain => {
			if(typeof chain === "undefined" || chain.length == 0)
				return Promise.resolve(aData);
			
			let promise = Promise.resolve(aData);
			chain.forEach(aInterceptor => {
				promise = promise.then(aInterceptor.doHandle);
			});
			return promise;
		});
	},
	addInterceptor : function(aInterceptor){
		if(arguments.length != 1 && typeof aInterceptor !== "object")
			throw new Error("function required an interceptor");
		if(typeof aInterceptor.doAccept !== "function")
			throw new Error("The interceptor required a \"doAccept\" function!");
		if(typeof aInterceptor.doHandle !== "function")
			throw new Error("The interceptor required a \"doHandle\" function!");
		
		INTERCEPTORS.push(aInterceptor);		
		return Manager;
	},
	reset: ()=>{
		CACHE = {};
	}
};
export default Manager; 


