"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scValToIdentity = exports.scvalToString = void 0;
const stellar_sdk_1 = require("stellar-sdk");
function scvalToString(value) {
    return value.bytes().toString();
}
exports.scvalToString = scvalToString;
function scValToIdentity(value) {
    const owner = stellar_sdk_1.Address.fromScVal(value.value()?.[2].val());
    const delegates = new Map();
    const attributes = new Map();
    return {
        owner,
        delegates,
        attributes
    };
}
exports.scValToIdentity = scValToIdentity;
//# sourceMappingURL=convert.js.map