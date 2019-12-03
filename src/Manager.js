const INTERCEPTORS = [];
const CACHE = {};

const getChain = function(aData, aRequest){
	let chain = CACHE[aData.metadata.origin];
	if(typeof chain !== "undefined")
		return Promise.resolve(chain);
	
	let promises = [];
	INTERCEPTORS.forEach(function(aInterceptor){
		let promise = Promise.resolve(aInterceptor.doAccept(aData))
			.then(function(value){
				if(value)
					return aInterceptor;
			});
		promises.push(promise);
	});
	
	return Promise.all(promises)
	.then(function(chain){
		const interceptors = chain.filter(function(interceptor){
			return typeof interceptor !== "undefined";
		});
		
		CACHE[aData.metadata.origin] = interceptors;
		return interceptors;
	})["catch"](function(error){throw error});
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
		if(Manager.config.ignoreDocumentOrigin && aData.metadata.origin == document.location.origin)
			return Promise.resolve(aData);
		if(typeof Manager.config.ignoreOrigins !== "undefined" && isOriginIgnored(aData, Manager.config.ignoreOrigins))
			return Promise.resolve(aData);
		
		return getChain(aData)
		.then(function(chain){
			if(typeof chain === "undefined" || chain.length == 0)
				return Promise.resolve(aData);
			
			let handles = [];
			let promise = Promise.resolve(aData);
			chain.forEach(function(aInterceptor){
				promise.then(aInterceptor.doHandle);
			});			
			return promise;
		})["catch"](function(error){throw error;});
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
	}
};
export default Manager; 


