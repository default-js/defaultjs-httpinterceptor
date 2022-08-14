(() => {
	const Manager = defaultjs.httpinterceptor.Manager;
	const TokenInterceptor = defaultjs.httpinterceptor.interceptors.TokenInterceptor;

	document.querySelector("#send-xhr-request").addEventListener("click", () => {
		console.log("send-xhr-request");
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4)
				console.log("xhr request ready!", JSON.parse(this.response));
		};
		xhttp.open("GET", "http://localhost:8080/response.json?test1=value1&test2=value2#hashtest");
		xhttp.send();
	});

	document.querySelector("#send-fetch-request").addEventListener("click", async () => {
		console.log("send-fetch-request");
		let response = await fetch("http://localhost:8080/response.json?test1=value1&test2=value2#hashtest", {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		response = await response.json();
		console.log("fetch request ready!", response);
	});

	Manager.setup((async () => {
		console.log("setup");
		return new Promise((r) => {
			setTimeout(() => {
				r(new TokenInterceptor({
					condition: async (aData) => {
						return true;
					},
					fetchToken: async (aData) => {
						let response = await Manager.uncheckedFetch("/jwt.json");
						response = await response.json();
						return response.jwt;
					},
					appendToken: async (aToken, aData) => {
						aData.request.headers = aData.request.headers || {};
						aData.request.headers["Authorization"] = "Bearer " + aToken
						return aData;
					},
					refreshInterval: 5000
				}));
				console.log("setup finished");
			}, 5000);
		});
	}));

	for (let i = 0; i < 10; i++) {
		Manager.setup(new Promise((r) => {
			const nr = i;
			setTimeout(() => {
				r();
				console.log(`${nr}: setup finished`);
			}, 1000 * i);
		})
		);
	}
})();