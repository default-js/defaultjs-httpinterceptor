document.querySelector("#send-xhr-request").addEventListener("click", function() {
	console.log("send-xhr-request");
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4)
			console.log("xhr request ready!", JSON.parse(this.response));
	};
	xhttp.open("GET", "http://localhost:8080/response.json?test1=value1&test2=value2#hashtest", true);
	xhttp.send();
});

document.querySelector("#send-fetch-request").addEventListener("click", function() {
	console.log("send-fetch-request");
	fetch("http://localhost:8080/response.json?test1=value1&test2=value2#hashtest", {
		headers : {
			'Content-Type' : 'application/json'
		}
	}).then(function(aResponse){
		return aResponse.json();
	}).then(function(aResponse) {
		console.log("fetch request ready!", aResponse);
	})["catch"](console.error);
});

//defaultjs.httpinterceptor.Manager.addInterceptor(new defaultjs.httpinterceptor.interceptors.OAuthInterceptor({
//    	condition: [ "http://localhost:8080", "http://localhost:8081", "http://localhost:8082" ],
//        login : {
//            url : "http://localhost/jwt.json",
//            method : "GET",
//            response : {
//                type : "authentication-header",
//                headerType : "Bearer",
//                valueType : "content",
//                valueSelector : "jwt"
//            }
//        },
//        refreshInterval : 10 * 60 * 1000
//    })
//);

defaultjs.httpinterceptor.Manager.addInterceptor(new defaultjs.httpinterceptor.interceptors.TokenInterceptor({
	condition : function(aData){
		return Promise.resolve(aData.metadata.origin == "http://localhost:8080");
	},
	fetchToken : function(aData){
		return Promise.resolve("http://localhost/jwt.json")
			.then(function(aUrl){
				return fetch(aUrl);
			}).then(function(aResponse){
				return aResponse.json();
			}).then(function(aResponse){
				return Promise.resolve(aResponse.jwt);
			});
	},
	appendToken : function(aToken, aData){
		aData.request.headers = aData.request.headers || {};
		aData.request.headers["Authorization"] = "Bearer " + aToken
		
		return aData;
	},
    refreshInterval : 5000
}));
