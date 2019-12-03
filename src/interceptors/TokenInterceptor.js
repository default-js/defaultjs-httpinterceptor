const TokenInterceptor = function(aSetup){
	const setup = aSetup; 
	let token = undefined;
	
	const defaultRefreshToken = function(){
        new Promise(setup.fetchToken)
        .then(function(aToken){
            token = aToken;
        }); 
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
			return new Promise(function(resolve){
				let type = typeof setup.condition; 
				if(type === "function")
					resolve(setup.condition(aData));
				else if(type === "string")
					resolve(setup.condition == aData.origin);
				else if(setup.condition instanceof Array){
					for(let i = 0; i < setup.condition.length; i++)
						if(setup.condition[i] == aData.origin)
							resolve(true);
				}	
				resolve(false);
			});	
		},
		doHandle : function(aData, aRequest){
			let isXMLHttpRequest = aRequest instanceof XMLHttpRequest;	
			let appendOn = isXMLHttpRequest ? setup.appendOnXhr : setup.appendOnFetch;
				
			if(typeof token !== "undefined")
				return Promise.resolve(appendOn(aRequest, token));
			else
				return Promise.resolve(setup.fetchToken(aData))
				.then(function(aToken){
					token = aToken;
					return Promise.resolve(appendOn(aRequest, token));
				})["catch"](function(error){throw error});
		}		
	};
};
export default TokenInterceptor;
