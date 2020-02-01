/**
 * aSetup  => 
 * {
 * 	condition : [string | string[] | function(aData}],
 * 	fetchToken : function(),
 *  appendToken : function(aToken, aData),
 *  (optional) refreshInterval,
 *  (optional) refreshToken : function()
 * } 
 * 
 * aData => 
 * {
 * 	url : String,
 * 	request : {
 * 		method : string,
 * 		(optional) headers : {
 * 			[header name : string] : [header value : string],
 * 			... 
 * 		},
 * 		(optional) body : {string | object | FormData | ...] 
 * 	},
 * 	metadata : {
 * 		method : string,
 * 		origin : string,
 * 		hostname : string,
 * 		protocol : string,
 * 		(optional) port : number,
 * 		query : string,
 * 	} 
 * }
 */
const TokenInterceptor = function(aSetup){
	const setup = aSetup;	
	let token = undefined;
    
    const callAppendToken = function(aToken, aData, theAppender){
    	if(theAppender instanceof Array){
			let promise = Promise.resolve(aData);
			theAppender.forEach(function(appender){
				promise = promise.then(function(aData){
					return appender(aToken, aData);
				});
			});
			return promise;
		}
		else
			return Promise.resolve(theAppender(aToken, aData));
    };
    
    const startRefresh = function(){	
		if(setup.refreshInterval > 0){
		    const refreshToken = typeof setup.refreshToken === "function" ? function(){
		            token = Promise.resolve(setup.refreshToken())
		    	} : function(){
		    		token = Promise.resolve(setup.fetchToken());
		    	};
		    
		    setInterval(refreshToken, setup.refreshInterval || (60 * 1000))
		}
    };
	
	
	return {
		doAccept : setup.doAccept || function(aData){			
			const type = typeof setup.condition; 
			if(type === "function")
				return Promise.resolve(setup.condition(aData));
			else if(type === "string")
				return Promise.resolve(setup.condition == aData.metadata.origin);
			else if(setup.condition instanceof Array){
				for(let i = 0; i < setup.condition.length; i++)
					if(setup.condition[i] == aData.metadata.origin)
						return Promise.resolve(true);
			}	
			return Promise.resolve(false);				
		},
		doHandle : function(aData){				
			if(!token)
				token = Promise.resolve(setup.fetchToken())
					.then(function(aToken){
						startRefresh();
						return aToken;
					});			
				
			return token.then(function(aToken){
				return callAppendToken(aToken, aData, setup.appendToken);
			})["catch"](function(error){throw error});
		}		
	};
};

export default TokenInterceptor;
