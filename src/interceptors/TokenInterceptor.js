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
	
	const defaultRefreshToken = function(){
        new Promise(setup.fetchToken)
        .then(function(aToken){
            token = aToken;
        }); 
    };
    
    const callAppendToken = function(aToken, aData, theAppender){
    	if(theAppender instanceof Array){
			let promise = Promise.resolve(aData);
			theAppender.forEach(function(appender){
				promise.then(function(aData){
					return Promise.resolve(appender(token, aData));
				});
			});
			return promise;
		}
		else
			return Promise.resolve(theAppender(token, aData));
    };
	
	if(setup.refreshInterval > 0){
	    const refreshToken = defaultRefreshToken
	    if(typeof setup.refreshToken === "function"){
	        refreshToken = function(){
	            Promise.resolve(setup.refreshToken())
	            .then(function(aToken){
	                token = aToken;
	            }); 
	        };
	    }
	    setInterval(refreshToken, setup.refreshInterval || (60 * 1000))
	}
	
	
	return {
		doAccept : setup.doAccept || function(aData){			
			let type = typeof setup.condition; 
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
			if(typeof token !== "undefined")
				return callAppendToken(token, aData, setup.appendToken);
			else
				return Promise.resolve(setup.fetchToken())
				.then(function(aToken){
					token = aToken;
					return callAppendToken(token, aData, setup.appendToken);
				})["catch"](function(error){throw error});
		}		
	};
};

export default TokenInterceptor;
