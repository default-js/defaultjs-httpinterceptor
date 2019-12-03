import "./XMLHttpRequest";
import "./Fetch";
import Manager from "./Manager";
import Interceptors from "./interceptors";


(function(Global){	
	Global.de = Global.defaultjs || {};
	Global.defaultjs.httpinterceptor = Global.defaultjs.httpinterceptor || {
		VERSION : "${version}",
		Manager : Manager,
		interceptors : Interceptors
	};
})(window|| global || {});