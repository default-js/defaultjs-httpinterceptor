const INTERCEPTORS = [];
const CACHE = {};

const getChain = function(aData, aRequest){
	let chain = CACHE[aData.server];
	if(typeof chain !== "undefined")
		return Promise.resolve(chain);
	
	chain = [];
	let promises = [];
	INTERCEPTORS.forEach(function(aInterceptor){
		promises.push(
			aInterceptor.doAccept(aData)
			.then(function(value){
				if(value)
					chain.push(aInterceptor);
			}));
	});
	
	return Promise.all(promises)
	.then(function(){
		CACHE[aData.origin] = chain;
		return chain;
	})["catch"](function(error){throw error});
};

const isOriginIgnored = function(data, origins){
	for(let i = 0; i < origins.length; i++)
		if(data.origin == origins[i])
			return true;
	
	return false;
};

const Manager = {
	config : {
		ignoreDocumentOrigin : true,
		ignoreOrigins : []		
	},
	interceptors : [],
	doIntercept : function(aData, aRequest){
		if(Manager.config.ignoreDocumentOrigin && aData.origin == document.location.origin)
			return Promise.resolve(aData, aRequest);
		if(typeof Manager.config.ignoreOrigins !== "undefined" && isOriginIgnored(aData, Manager.config.ignoreOrigins))
			return Promise.resolve(aData, aRequest);
		
		return getChain(aData, aRequest)
		.then(function(chain){
			if(typeof chain === "undefined" || chain.length == 0)
				return Promise.resolve();
			
			let handles = [];
			chain.forEach(function(aInterceptor){
				handles.push(aInterceptor.doHandle(aData, aRequest));
			});			
			return Promise.all(handles);
		}).then(function(){
			return Promise.resolve(aData, aRequest);
		})["catch"](function(error){throw error});
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


