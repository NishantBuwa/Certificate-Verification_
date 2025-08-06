declare const GetIpfsData: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly examples: readonly ["QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IPFS CID of the file";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly format: "binary";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly errorCode: {
                    readonly description: "validation.failed";
                    readonly type: "string";
                    readonly examples: readonly ["validation.failed"];
                };
                readonly message: {
                    readonly description: "Request validation failed. Please see data for additional information.";
                    readonly type: "string";
                    readonly examples: readonly ["Request validation failed. Please see data for additional information."];
                };
                readonly statusCode: {
                    readonly description: "400";
                    readonly type: "number";
                    readonly examples: readonly [400];
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["target"];
                        readonly properties: {
                            readonly target: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Request object present in the body of the HTTP request";
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly description: "Value of the target object which validation is wrong. Can be of any data type, example here is using type number.";
                                readonly examples: readonly [12345];
                            };
                            readonly property: {
                                readonly type: "string";
                                readonly description: "Property name of the target object which validation is wrong";
                                readonly examples: readonly ["property1"];
                            };
                            readonly constraints: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Object of failed constraints for the target object. Key is the constraint, value is detailed description of the failed constraint.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["errorCode", "message", "statusCode", "data"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.not.active";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.not.active"];
                    };
                    readonly message: {
                        readonly description: "Subscription not active anymore.";
                        readonly type: "string";
                        readonly examples: readonly ["Subscription not active anymore."];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.invalid";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.invalid"];
                    };
                    readonly message: {
                        readonly description: "Unable to find valid subscription for '${apiKey}'";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to find valid subscription for '${apiKey}'"];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly properties: {
                readonly message: {
                    readonly description: "Forbidden";
                    readonly type: "string";
                    readonly examples: readonly ["Forbidden"];
                };
                readonly statusCode: {
                    readonly description: "403";
                    readonly type: "number";
                    readonly examples: readonly [403];
                };
            };
            readonly required: readonly ["statusCode", "message"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly message: {
                    readonly description: "Internal server error";
                    readonly type: "string";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly statusCode: {
                    readonly description: "500";
                    readonly type: "number";
                    readonly examples: readonly [500];
                };
            };
            readonly required: readonly ["statusCode", "message"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetLog: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly chain: {
                    readonly type: "string";
                    readonly enum: readonly ["ETH"];
                    readonly examples: readonly ["ETH"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The blockchain to get the log record from";
                };
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 100;
                    readonly examples: readonly ["0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The ID of the log record or transaction to get from the blockchain";
                };
            };
            readonly required: readonly ["chain", "id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly type: "string";
                    readonly description: "The data stored in the requested record";
                    readonly examples: readonly ["My example log data"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly errorCode: {
                    readonly description: "validation.failed";
                    readonly type: "string";
                    readonly examples: readonly ["validation.failed"];
                };
                readonly message: {
                    readonly description: "Request validation failed. Please see data for additional information.";
                    readonly type: "string";
                    readonly examples: readonly ["Request validation failed. Please see data for additional information."];
                };
                readonly statusCode: {
                    readonly description: "400";
                    readonly type: "number";
                    readonly examples: readonly [400];
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["target"];
                        readonly properties: {
                            readonly target: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Request object present in the body of the HTTP request";
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly description: "Value of the target object which validation is wrong. Can be of any data type, example here is using type number.";
                                readonly examples: readonly [12345];
                            };
                            readonly property: {
                                readonly type: "string";
                                readonly description: "Property name of the target object which validation is wrong";
                                readonly examples: readonly ["property1"];
                            };
                            readonly constraints: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Object of failed constraints for the target object. Key is the constraint, value is detailed description of the failed constraint.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["errorCode", "message", "statusCode", "data"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.not.active";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.not.active"];
                    };
                    readonly message: {
                        readonly description: "Subscription not active anymore.";
                        readonly type: "string";
                        readonly examples: readonly ["Subscription not active anymore."];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.invalid";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.invalid"];
                    };
                    readonly message: {
                        readonly description: "Unable to find valid subscription for '${apiKey}'";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to find valid subscription for '${apiKey}'"];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "tx.missing";
                        readonly type: "string";
                        readonly examples: readonly ["tx.missing"];
                    };
                    readonly message: {
                        readonly description: "No such tx.";
                        readonly type: "string";
                        readonly examples: readonly ["No such tx."];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly message: {
                    readonly description: "Internal server error";
                    readonly type: "string";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly statusCode: {
                    readonly description: "500";
                    readonly type: "number";
                    readonly examples: readonly [500];
                };
            };
            readonly required: readonly ["statusCode", "message"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const StoreIpfs: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
                readonly description: "Your file to store";
                readonly examples: readonly [127654187631872620];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly ipfsHash: {
                    readonly type: "string";
                    readonly description: "IPFS CID identifier of the stored file.";
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly errorCode: {
                    readonly description: "validation.failed";
                    readonly type: "string";
                    readonly examples: readonly ["validation.failed"];
                };
                readonly message: {
                    readonly description: "Request validation failed. Please see data for additional information.";
                    readonly type: "string";
                    readonly examples: readonly ["Request validation failed. Please see data for additional information."];
                };
                readonly statusCode: {
                    readonly description: "400";
                    readonly type: "number";
                    readonly examples: readonly [400];
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["target"];
                        readonly properties: {
                            readonly target: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Request object present in the body of the HTTP request";
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly description: "Value of the target object which validation is wrong. Can be of any data type, example here is using type number.";
                                readonly examples: readonly [12345];
                            };
                            readonly property: {
                                readonly type: "string";
                                readonly description: "Property name of the target object which validation is wrong";
                                readonly examples: readonly ["property1"];
                            };
                            readonly constraints: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Object of failed constraints for the target object. Key is the constraint, value is detailed description of the failed constraint.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["errorCode", "message", "statusCode", "data"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.not.active";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.not.active"];
                    };
                    readonly message: {
                        readonly description: "Subscription not active anymore.";
                        readonly type: "string";
                        readonly examples: readonly ["Subscription not active anymore."];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.invalid";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.invalid"];
                    };
                    readonly message: {
                        readonly description: "Unable to find valid subscription for '${apiKey}'";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to find valid subscription for '${apiKey}'"];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly properties: {
                readonly message: {
                    readonly description: "Forbidden";
                    readonly type: "string";
                    readonly examples: readonly ["Forbidden"];
                };
                readonly statusCode: {
                    readonly description: "403";
                    readonly type: "number";
                    readonly examples: readonly [403];
                };
            };
            readonly required: readonly ["statusCode", "message"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly message: {
                    readonly description: "Internal server error";
                    readonly type: "string";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly statusCode: {
                    readonly description: "500";
                    readonly type: "number";
                    readonly examples: readonly [500];
                };
            };
            readonly required: readonly ["statusCode", "message"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const StoreLog: {
    readonly body: {
        readonly oneOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 130000;
                    readonly description: "The data to be stored on the blockchain";
                    readonly examples: readonly ["My example log data"];
                };
                readonly chain: {
                    readonly description: "The blockchain to store the data on";
                    readonly enum: readonly ["BSC", "EGLD", "ETH", "KLAY", "MATIC", "ONE", "XDC"];
                    readonly type: "string";
                    readonly examples: readonly ["ETH"];
                };
                readonly fromPrivateKey: {
                    readonly type: "string";
                    readonly maxLength: 66;
                    readonly minLength: 66;
                    readonly description: "The private key of the blockchain address from which the transaction will be made and the transaction fee will be deducted";
                    readonly examples: readonly ["0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2"];
                };
                readonly from: {
                    readonly type: "string";
                    readonly maxLength: 62;
                    readonly minLength: 42;
                    readonly description: "(Elrond only; required) The blockchain address from which the transaction will be made<br/>This is a mandatory parameter for Elrond. Do not use it with any other blockchain.";
                    readonly examples: readonly ["erd17k95m339aqzxzyvjjjfa3lka0yyeqgcsda50tw5z9g73ycfe2caq9e6jq7"];
                };
                readonly to: {
                    readonly description: "The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made.";
                    readonly maxLength: 42;
                    readonly minLength: 42;
                    readonly type: "string";
                    readonly examples: readonly ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85"];
                };
                readonly nonce: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "The nonce to be set to the transaction; if not present, the last known nonce will be used";
                };
                readonly fromShardID: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 4;
                    readonly description: "(Harmony only) The ID of the shard from which the data should be read";
                };
                readonly toShardID: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 4;
                    readonly description: "(Harmony only) The ID of the shard to which the data should be recorded";
                };
                readonly ethFee: {
                    readonly description: "(Ethereum only) The custom defined fee; if not present, will be calculated automatically";
                    readonly type: "object";
                    readonly required: readonly ["gasLimit", "gasPrice"];
                    readonly properties: {
                        readonly gasPrice: {
                            readonly type: "string";
                            readonly description: "The price for one gas unit (in Gwei)";
                            readonly pattern: "^[+]?\\d+$";
                            readonly examples: readonly ["20"];
                        };
                        readonly gasLimit: {
                            readonly type: "string";
                            readonly description: "The maximum number of gas units that you are willing to spend on processing the transaction at the provided gas price";
                            readonly pattern: "^[+]?\\d+$";
                            readonly examples: readonly ["40000"];
                        };
                    };
                };
            };
            readonly required: readonly ["data", "chain", "fromPrivateKey"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 130000;
                    readonly description: "The data to be stored on the blockchain";
                    readonly examples: readonly ["My example log data"];
                };
                readonly chain: {
                    readonly description: "The blockchain to store the data on";
                    readonly enum: readonly ["ETH"];
                    readonly type: "string";
                    readonly examples: readonly ["ETH"];
                };
                readonly signatureId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Identifier of the mnemonic / private key associated in signing application.\nWhen hash identifies mnemonic, index must be present to represent specific account to pay from.\n";
                    readonly examples: readonly ["26d3883e-4e17-48b3-a0ee-09a3e484ac83"];
                };
                readonly index: {
                    readonly description: "Derivation index of sender address.";
                    readonly maximum: 2147483647;
                    readonly type: "integer";
                    readonly examples: readonly [0];
                };
                readonly to: {
                    readonly description: "The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made.";
                    readonly maxLength: 42;
                    readonly minLength: 42;
                    readonly type: "string";
                    readonly examples: readonly ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85"];
                };
                readonly nonce: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "The nonce to be set to the transaction; if not present, the last known nonce will be used";
                };
                readonly fee: {
                    readonly description: "The custom defined fee; if not present, will be calculated automatically";
                    readonly type: "object";
                    readonly required: readonly ["gasLimit", "gasPrice"];
                    readonly properties: {
                        readonly gasPrice: {
                            readonly type: "string";
                            readonly description: "The price for one gas unit (in Gwei)";
                            readonly pattern: "^[+]?\\d+$";
                            readonly examples: readonly ["20"];
                        };
                        readonly gasLimit: {
                            readonly type: "string";
                            readonly description: "The maximum number of gas units that you are willing to spend on processing the transaction at the provided gas price";
                            readonly pattern: "^[+]?\\d+$";
                            readonly examples: readonly ["40000"];
                        };
                    };
                };
            };
            readonly required: readonly ["data", "chain", "signatureId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 130000;
                    readonly description: "The data to be stored on the blockchain";
                    readonly examples: readonly ["My example log data"];
                };
                readonly chain: {
                    readonly description: "The blockchain to store the data on";
                    readonly enum: readonly ["CELO"];
                    readonly type: "string";
                    readonly examples: readonly ["CELO"];
                };
                readonly feeCurrency: {
                    readonly type: "string";
                    readonly description: "The currency in which the transaction fee will be paid";
                    readonly enum: readonly ["CELO", "CUSD", "CEUR"];
                };
                readonly fee: {
                    readonly description: "The custom defined fee; if not present, will be calculated automatically";
                    readonly type: "object";
                    readonly required: readonly ["gasLimit", "gasPrice"];
                    readonly properties: {
                        readonly gasPrice: {
                            readonly type: "string";
                            readonly description: "The price for one gas unit (in Gwei)";
                            readonly pattern: "^[+]?\\d+$";
                            readonly examples: readonly ["20"];
                        };
                        readonly gasLimit: {
                            readonly type: "string";
                            readonly description: "The maximum number of gas units that you are willing to spend on processing the transaction at the provided gas price";
                            readonly pattern: "^[+]?\\d+$";
                            readonly examples: readonly ["40000"];
                        };
                    };
                };
                readonly fromPrivateKey: {
                    readonly type: "string";
                    readonly maxLength: 66;
                    readonly minLength: 66;
                    readonly description: "Private key of account, from which the transaction will be initiated. If not present, transaction fee will be debited from Tatum internal account and additional credits will be charged.";
                    readonly examples: readonly ["0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2"];
                };
                readonly nonce: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly description: "Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.";
                };
                readonly to: {
                    readonly description: "The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made.";
                    readonly maxLength: 42;
                    readonly minLength: 42;
                    readonly type: "string";
                    readonly examples: readonly ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85"];
                };
            };
            readonly required: readonly ["data", "feeCurrency", "chain", "fromPrivateKey"];
        }];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly description: "The custom defined fee; if not present, will be calculated automatically";
            readonly type: "object";
            readonly required: readonly ["gasLimit", "gasPrice"];
            readonly properties: {
                readonly gasPrice: {
                    readonly type: "string";
                    readonly description: "The price for one gas unit (in Gwei)";
                    readonly pattern: "^[+]?\\d+$";
                    readonly examples: readonly ["20"];
                };
                readonly gasLimit: {
                    readonly type: "string";
                    readonly description: "The maximum number of gas units that you are willing to spend on processing the transaction at the provided gas price";
                    readonly pattern: "^[+]?\\d+$";
                    readonly examples: readonly ["40000"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly properties: {
                readonly errorCode: {
                    readonly description: "validation.failed";
                    readonly type: "string";
                    readonly examples: readonly ["validation.failed"];
                };
                readonly message: {
                    readonly description: "Request validation failed. Please see data for additional information.";
                    readonly type: "string";
                    readonly examples: readonly ["Request validation failed. Please see data for additional information."];
                };
                readonly statusCode: {
                    readonly description: "400";
                    readonly type: "number";
                    readonly examples: readonly [400];
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["target"];
                        readonly properties: {
                            readonly target: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Request object present in the body of the HTTP request";
                            };
                            readonly value: {
                                readonly type: "number";
                                readonly description: "Value of the target object which validation is wrong. Can be of any data type, example here is using type number.";
                                readonly examples: readonly [12345];
                            };
                            readonly property: {
                                readonly type: "string";
                                readonly description: "Property name of the target object which validation is wrong";
                                readonly examples: readonly ["property1"];
                            };
                            readonly constraints: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                                readonly description: "Object of failed constraints for the target object. Key is the constraint, value is detailed description of the failed constraint.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["errorCode", "message", "statusCode", "data"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.not.active";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.not.active"];
                    };
                    readonly message: {
                        readonly description: "Subscription not active anymore.";
                        readonly type: "string";
                        readonly examples: readonly ["Subscription not active anymore."];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "subscription.invalid";
                        readonly type: "string";
                        readonly examples: readonly ["subscription.invalid"];
                    };
                    readonly message: {
                        readonly description: "Unable to find valid subscription for '${apiKey}'";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to find valid subscription for '${apiKey}'"];
                    };
                    readonly statusCode: {
                        readonly description: "401";
                        readonly type: "number";
                        readonly examples: readonly [401];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly oneOf: readonly [{
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "ethereum.broadcast.failed";
                        readonly type: "string";
                        readonly examples: readonly ["ethereum.broadcast.failed"];
                    };
                    readonly message: {
                        readonly description: "Unable to broadcast transaction due to ${error}.";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to broadcast transaction due to ${error}."];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "gas.price.failed";
                        readonly type: "string";
                        readonly examples: readonly ["gas.price.failed"];
                    };
                    readonly message: {
                        readonly description: "Unable to obtain current GAS price.";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to obtain current GAS price."];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "ethereum.transaction.body";
                        readonly type: "string";
                        readonly examples: readonly ["ethereum.transaction.body"];
                    };
                    readonly message: {
                        readonly description: "Either currency, or tokenAddress must be defined.";
                        readonly type: "string";
                        readonly examples: readonly ["Either currency, or tokenAddress must be defined."];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "eth.transaction.gas";
                        readonly type: "string";
                        readonly examples: readonly ["eth.transaction.gas"];
                    };
                    readonly message: {
                        readonly description: "Unable to calculate gas limit for transaction. ${error}";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to calculate gas limit for transaction. ${error}"];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "eth.transaction.hash";
                        readonly type: "string";
                        readonly examples: readonly ["eth.transaction.hash"];
                    };
                    readonly message: {
                        readonly description: "Unable to calculate transaction hash. ${error}";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to calculate transaction hash. ${error}"];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }, {
                readonly properties: {
                    readonly errorCode: {
                        readonly description: "eth.transaction.sign";
                        readonly type: "string";
                        readonly examples: readonly ["eth.transaction.sign"];
                    };
                    readonly message: {
                        readonly description: "Unable to sign transaction. ${error}";
                        readonly type: "string";
                        readonly examples: readonly ["Unable to sign transaction. ${error}"];
                    };
                    readonly statusCode: {
                        readonly description: "403";
                        readonly type: "number";
                        readonly examples: readonly [403];
                    };
                };
                readonly required: readonly ["errorCode", "message", "statusCode"];
                readonly type: "object";
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly properties: {
                readonly message: {
                    readonly description: "Internal server error";
                    readonly type: "string";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly statusCode: {
                    readonly description: "500";
                    readonly type: "number";
                    readonly examples: readonly [500];
                };
            };
            readonly required: readonly ["statusCode", "message"];
            readonly type: "object";
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetIpfsData, GetLog, StoreIpfs, StoreLog };
