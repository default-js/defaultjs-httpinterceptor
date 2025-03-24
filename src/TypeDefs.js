
/** 
 * @typedef {object} Metadata
 * @property {string} method
 * @property {string} origin
 * @property {string} protocol
 * @property {string} hostname
 * @property {string|number} port
 * @property {string} path
 * @property {URLSearchParams} query
 * @property {string} hash
 * @property {boolean} async
 * @property {string} username
 * @property {string} password
 */

/** 
 * @typedef {object} InterceptorData
 * @property {URL} url
 * @property {Request} request
 * @property {Metadata} metadata
*/