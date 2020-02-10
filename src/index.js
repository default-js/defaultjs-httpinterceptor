import {GLOBAL} from "./Utils";
import "./XMLHttpRequest";
import "./Fetch";
import Manager from "./Manager";
import Interceptors from "./interceptors";

GLOBAL.defaultjs = GLOBAL.defaultjs || {};
GLOBAL.defaultjs.httpinterceptor = GLOBAL.defaultjs.httpinterceptor || {
	VERSION : "${version}",
	Manager : Manager,
	interceptors : Interceptors
};