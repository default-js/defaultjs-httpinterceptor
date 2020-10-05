# defaultjs-httpinterceptor

This default-js modul provide functionality to intercept browser request and manipulate them. It's useful web pages with multi backend services on different domains or auhorization handles. You are able to change header, url or request content.

The httpinterceptor works with XMLHttpRequest and fetch - and is complete customisable.

# de.titus.request.interceptor

This lib provide an function to intercept requests and change the orginal request in html sites. The main use case is to make sso authentications in enterprise environment with microservices.

The web site from service A with url https://service-a.com want to call an ajax request from service B with url https://service-b.com. The main challenge for the developer is, how to authenticate the user at service B. If you calling only some different services and you know all the services, you solve the problem with custom code to make the authentication to the services.

BUT, if you don't know all the services, because you have an web portal or something else, or you have an high number of services to include, then you can do the authentication with this libs, very easily.
    
# How to include
### at HTML page

### With NPM


# Sample for JWT
```javascript
RequestInterceptManager.addInterceptor("[service-b","service-b", "service-...", new de.titus.request.interceptor.interceptors.JWTInterceptor({
	login : {
		url : "url to get json web token",
		method: "GET", //"POST", ...
		body : "[optional]",
		response : { // how to change the interceped request
			type: "authentication-header",
			headerType: "Bearer",
			valueType : "content",
			valueSelector: "jwt"
		}			
	},	
	refresh : {
		interval: 10000 // default refresh interval time in ms to refresh the token
		//interval: "always" // this tells, that refresh the jwt at every request 
	} 
}));
```


# Custom Interceptor
### as simple function
```javascript
RequestInterceptManager.addInterceptor("[service-b","service-b", "service-...", function(aData, aRequest, aCallback){
	// You need to check, if it is a XMLHttpRequest, because XMLHttpRequest an fetch working differently
	let isXHR = aRequest instanceof XMLHttpRequest; 

	if(isXHR)
		aRequest.setRequestHeader("myHeader" , "my value");
	else{
		aRequest.headers = aRequest.headers || {}
		aRequest.headers["myHeader"] = "my value";
	} 
});
```

### as simple as object 
```javascript

let MyInterceptor = function(){
	this.lastCall;
}; 

MyInterceptor.prototype.onHandle = function(aData, aRequest, aCallback){
	// You need to check, if it is a XMLHttpRequest, because XMLHttpRequest an fetch working differently
	let isXHR = aRequest instanceof XMLHttpRequest; 

	if(isXHR)
		aRequest.setRequestHeader("myHeader" , "my value");
	else{
		aRequest.headers = aRequest.headers || {}
		aRequest.headers["myHeader"] = "my value";
	} 
	
	this.lastCall = Date.now();
};

RequestInterceptManager.addInterceptor("[service-b","service-b", "service-...", new MyInterceptor());
```