import {ORGFETCH} from "./Constants";

export default class Interceptor{
    async doAccept(data){}
    async doHandle(data){}
    async unceckedFetch(url, request){
		return ORGFETCH(url, request);
	}

};