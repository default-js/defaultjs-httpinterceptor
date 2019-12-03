import TokenInterceptor from "./TokenInterceptor"


const appendOnFetch = function(aRequest, aToken){
	aRequest.headers = aRequest.header || {};
	aRequest.headers["Authorization"] = "Bearer " + aToken;
};

const appendOnXhr = function(aRequest, aToken){
	aRequest.setRequestHeader("Authorization" , "Bearer " + aToken);	
};

const OAuthInterceptor = function(aSetup){
	let setup = aSetup;
	setup.fetchToken = function(){
		return fetch(setup.login.url, {
			method: (setup.login.method || "get")
		}).then(function(aResponse){
			return aResponse.json();
		}).then(function(aResponse){
			return aResponse[setup.login.response.valueSelector];
		})["catch"](function(error){throw error;});		
	};
	setup.appendOnFetch = appendOnFetch;
	setup.appendOnXhr = appendOnXhr;
	return TokenInterceptor(aSetup);
};

export default OAuthInterceptor;
