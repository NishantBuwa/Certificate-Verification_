"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'tatumdocs/1.1.2 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * <p style="display: none">/v3/ipfs/{id}</p>
     * <h4>1 credit per API call.</h4><br/><p>Gets data from the IPFS.</p>
     *
     * @summary Get file from IPFS
     * @throws FetchError<400, types.GetIpfsDataResponse400> Bad Request
     * @throws FetchError<401, types.GetIpfsDataResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.GetIpfsDataResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.GetIpfsDataResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    SDK.prototype.getIPFSData = function (metadata) {
        return this.core.fetch('/v3/ipfs/{id}', 'get', metadata);
    };
    /**
     * <p style="display: none">/v3/ipfs</p>
     * <h4>2 credits per API call. Only files up to 50MB are available for storing.</h4><br/>
     * <p>Stores file on the IPFS. We are leveraging <a href="https://web3.storage/"
     * target="_blank">web3.storage</a> from <a href="https://protocol.ai/"
     * target="_blank">Protocol Labs</a> for free storage on the IPFS.</p>
     *
     * @summary Store data to IPFS
     * @throws FetchError<400, types.StoreIpfsResponse400> Bad Request
     * @throws FetchError<401, types.StoreIpfsResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.StoreIpfsResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
     * operation due to logical error or invalid permissions.
     * @throws FetchError<500, types.StoreIpfsResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    SDK.prototype.storeIPFS = function (body) {
        return this.core.fetch('/v3/ipfs', 'post', body);
    };
    /**
     * <p style="display: none">/v3/record</p>
     * <p><b>2 credits per API call + additional credits based on the size of the stored data
     * and the type of the blockchain</b></p>
     * <p>Store data on the blockchain.</p>
     * <p>The total cost of a transaction on Ethereum (in credits) depends on the size of the
     * data. The data is stored as a string in the hexadecimal format, and the maximum size of
     * the data is approximately 130 kB on the mainnet and 30 kB on testnet. Every 5 characters
     * cost 1 credit.<br/>
     * Therefore, one API call with 1 kB of data (1024 characters) would cost 205 credits.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Elrond</li>
     * <li>Ethereum (only the mainnet or the Sepolia testnet)</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>XDC</li>
     * </ul>
     *
     * @summary Store a log record
     * @throws FetchError<400, types.StoreLogResponse400> Bad Request
     * @throws FetchError<401, types.StoreLogResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.StoreLogResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.StoreLogResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    SDK.prototype.storeLog = function (body) {
        return this.core.fetch('/v3/record', 'post', body);
    };
    /**
     * <p style="display: none">/v3/record</p>
     * <p><b>1 credit per API call</b></p>
     * <p>Get a log data record from the Ethereum blockchain (only the mainnet or the Sepolia
     * testnet).</p>
     *
     * @summary Get a log record
     * @throws FetchError<400, types.GetLogResponse400> Bad Request
     * @throws FetchError<401, types.GetLogResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
     * @throws FetchError<403, types.GetLogResponse403> Forbidden. The request is authenticated, but it is not possible to perform the required
     * operation due to a logical error or invalid permissions.
     * @throws FetchError<500, types.GetLogResponse500> Internal server error. There was an error on the server during the processing of the
     * request.
     */
    SDK.prototype.getLog = function (metadata) {
        return this.core.fetch('/v3/record', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
