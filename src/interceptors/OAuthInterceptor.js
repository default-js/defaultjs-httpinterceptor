import TokenInterceptor from "./TokenInterceptor"

const OAuthInterceptor = function(aSetup){
	const setup = aSetup;
	setup.fetchToken = function(){
		return fetch(setup.login.url, {
			method: (setup.login.method || "get")
		}).then(res => res.json())
		.then(res => res[setup.login.response.valueSelector]);		
	};
	setup.appendToken = function(aToken, aData){
		aData.request.headers = aData.request.headers || {};
		aData.request.headers["Authorization"] = "Bearer " + aToken;
		return aData;
	};
	return TokenInterceptor(aSetup);
};

export default OAuthInterceptor;
