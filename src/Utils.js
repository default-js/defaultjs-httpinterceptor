const GLOBAL = (() => {
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	return {};
})();

export {GLOBAL};
const Utils = {
	GLOBAL : GLOBAL
};

export default Utils; 