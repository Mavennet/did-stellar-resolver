"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scValToIdentity = exports.scvalToString = void 0;
const soroban_client_1 = require("soroban-client");
function scvalToString(value) {
    return value.bytes().toString();
}
exports.scvalToString = scvalToString;
function scValToIdentity(value) {
    const owner = soroban_client_1.Address.fromScVal(value.value()?.[2].val());
    const delegates = new Map();
    const attributes = new Map();
    return {
        owner: owner,
        delegates: delegates,
        attributes: attributes
    };
}
exports.scValToIdentity = scValToIdentity;
//# sourceMappingURL=convert.js.map