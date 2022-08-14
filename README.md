# defaultjs-httpinterceptor

- [defaultjs-httpinterceptor](#defaultjs-httpinterceptor)
	- [Intro](#intro)
	- [Install](#install)
		- [npm](#npm)
		- [browser](#browser)
	- [Javascript API](#javascript-api)
		- [`Manager`](#manager)
			- [`Manager.setup(setup)`](#managersetupsetup)
			- [`Manager.addInterceptor(interceptor)`](#manageraddinterceptorinterceptor)
			- [`Manager.ready`](#managerready)
			- [`Manager.ignoreDocumentOrigin`](#managerignoredocumentorigin)
			- [`Manager.addOriginToIgnore(origin)`](#manageraddorigintoignoreorigin)
			- [`Manager.addUrlToIgnore(urls = [array of strings | array of URL | string | URL])`](#manageraddurltoignoreurls--array-of-strings--array-of-url--string--url)
			- [`Manager.uncheckedFetch(url, request)`](#manageruncheckedfetchurl-request)
			- [`Manager.doIntercept(data)`](#managerdointerceptdata)
			- [`Manager.reset()`](#managerreset)
		- [`Interceptor`](#interceptor)
			- [`Interceptor.doAccept({url, metadata})`](#interceptordoaccepturl-metadata)
			- [`Interceptor.doHandle({url, metadata, request})`](#interceptordohandleurl-metadata-request)
			- [`Interceptor.uncheckedFetch`](#interceptoruncheckedfetch)
		- [`TokenInterceptor`](#tokeninterceptor)
		- [Object `Metadata`](#object-metadata)
		- [How to implemente a custom Interceptor](#how-to-implemente-a-custom-interceptor)

## Intro

This default-js modul provide functionality to intercept browser request and manipulate them. It's useful web pages with multi backend services on different domains or auhorization to provide the authorization to all requests.

The httpinterceptor works with XMLHttpRequest and fetch, but its supporting async requests only!

## Install

### npm

```console
npm install @default-js/defaultjs-httpinterceptor
```

```javascript
import {Manager} from "@default-js/defaultjs-httpinterceptor";
Manager.setup(async () => {
//setup your interceptor(s)
});
```

### browser

```html
<script type="application/javascript" src="/dist/defaultjs-httpinterceptor.min.js"></script>
<script type="application/javascript">

defaultjs.httpinterceptorManager.setup(async () => {
//setup your interceptor(s) -> see Javascript api
});
</script>
```

Include the javascript file and your setup script at head or as first script tags on your body!

## Javascript API

### `Manager`

This manager provides the main logic and optimized the request handling by caching the used interceptors by origin.

#### `Manager.setup(setup)`

Add your setup logic to the Manager instance and blocks all requests until all setup finished!

Param       | Required | Default | Description
------------|----------|---------|--------
`setup`     | X        |         | `function` or `Promise` object

The result of the `setup` can be a single object of `Interceptor`, an array of `Interceptor` objects or nothing, but then you must be add your `Interceptor` object(s) by calling `Manager.addInterceptor` manualy.

```javascript
import {Manager} from "@default-js/defaultjs-httpinterceptor";
Manager.setup(async () => {
//setup your interceptor(s)
});
```

#### `Manager.addInterceptor(interceptor)`

Add a `Interceptor` object.

Param         | Required | Default | Description
--------------|----------|---------|--------
`interceptor` | X        |         | `Interceptor` or `Array of Interceptor`

```javascript
Manager.addInterceptor(new MyInterceptor());
Manager.addInterceptor([new InterceptorA(), new InterceptorB(), new InterceptorC()]);
```

Every `interceptor` must be a instance of type `Interceptor` or an object with a function `doAccept(data)` and `doHandle(data)`;

#### `Manager.ready`

This property is a Promise, that represented the current setup state.

#### `Manager.ignoreDocumentOrigin`

This property is tells the `Manager` to ignore all requests with the same origin as the current page.

#### `Manager.addOriginToIgnore(origin)`

Add origin to be ignored by `Manager`.

Param    | Required | Default | Description
---------|----------|---------|--------
`origin` | X        |         | `string`, `URL`, `Array`

#### `Manager.addUrlToIgnore(urls = [array of strings | array of URL | string | URL])`

Add url to be ignored by `Manager`.

Param    | Required | Default | Description
---------|----------|---------|--------
`url` | X        |         | `string`, `URL`, `Array`

#### `Manager.uncheckedFetch(url, request)`

This function make a unchecked fetch request. See default browser fetch api.

Param     | Required | Default | Description
----------|----------|---------|--------
`url`     | X        |         | `string` or `URL`
`request` | X        |         | `object` or `Request` object

#### `Manager.doIntercept(data)`

This function would be called automaticly by `fetch` and `XMLHttpRequest` to intercept the requests.

Param  | Required | Default | Description
-------|----------|---------|--------
`data` | X        |         | `object`

#### `Manager.reset()`

This function reset the interceptor-origin cache.

### `Interceptor`

Basic class to extends by your own interceptor implementation.

#### `Interceptor.doAccept({url, metadata})`

This functions must be return `true`, if the interceptor apply to all requests by same origin.

Param      | Default | Description
-----------|---------|------------
`url`      |         | `URL`
`metadata` |         | `Metadata`

**@return:** `true` or `false`

#### `Interceptor.doHandle({url, metadata, request})`

This function would be called to maipulate the request.

Param      | Default | Description
-----------|---------|------------
`url`      |         | `URL`
`metadata` |         | `Metadata`
`request`  |         | `Object` like fetch `Request` object

**@return:** a object of `{url, metadata, request}`

#### `Interceptor.uncheckedFetch`

This function make a unchecked fetch request. See default browser fetch api.

Param     | Required | Default | Description
----------|----------|---------|--------
`url`     | X        |         | `string` or `URL`
`request` | X        |         | `object` or `Request` object

### `TokenInterceptor`

The `TokenInterceptor` extends `Interceptor` and provide logic to cache a auth token and make periodicly a refesh of auth token.

```javascript
import TokenInterceptor from "@default-js/defaultjs-httpinterceptor/src/interceptors/TokenInterceptor";
new TokenInterceptor(setup)
```

**Structur of `setup`**

Property          | Requiered | Description
------------------|-----------|------------
`condition`       | X         | `string`, `Array` of `string`, `function({url, metadata})`
`fetchToken`      | X         | `function({url, metadata})`
`appendToken`     |           | `function({url, metadata, request})`; default: add token as header `Authorization=Bearer ${token}`
`refreshInterval` |           | `number` for milliseconds. A `number` zero or below -> disable automatic token refesh; default: 6000
`refreshToken`    |           | `function({url, metadata})`

### Object `Metadata`

This object provide some meta infomation of request.

Property   | Required | Description
-----------|----------|--------
`method`   | X        | `string` -> http verbs
`origin`   | X        | origin of request
`hostname` | X        | hostname of request
`protocol` | X        | protocol of request
`port`     |          | 
`query`    | X        | query string of request

### How to implemente a custom Interceptor

Create a new class and extend the class by `Interceptor` class. Impement the function `doAccept(data)` and `doHandle(data)`.

```javascript
import Manager from "@default-js/defaultjs-httpinterceptor";
import Interceptor from "@default-js/defaultjs-httpinterceptor";

class MyInterceptor extends Interceptor {
	#origin;

	constructor(origin){
		super();
		this.#origin = origin;
	}

	async doAccept({url, metadata}){
		return url.origin == this.#origin;
	}

	async doHandle({url, metadata, request}){
		const token = await this.uncheckedFetch("/url/to/token");
		request.headers["Authorization"] = `Bearer ${await token.text()}`;

		return {url, metadata, request};
	}
}

Manager.setup(async () => {
	const response = await Manager.uncheckedFetch("/request/for/all/origins.json");
	const origins = await response.json(); // response: ["example-a.com", "example-b.com", "example-c.com"]
	const interceptors = origins.map((origin) => new MyInterceptor(origin));

	return origins
});

await fetch("example-a.com");
```