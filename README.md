# DID Stellar resolver

This library is intended to be used in conjunction with the [did-stellar-registry](https://github.com/Mavennet/did-stellar-registry) smart contract, to resolve stllr DIDs into a DID Document.

It supports the [Decentralized Identifiers Specification](https://w3c.github.io/did-core/).

The full did method specification is outlined in [docs/did-method-spec.md](docs/did-method-spec.md)

## Status of the library

This library is currently in development and is not yet ready for production use.

The library relies on the [did-resolver](https://github.com/decentralized-identity/did-resolver) library.

Since soroban is currently not on mainnet, the resolver will only work on futurenet.

TODO:

1. Translate the stellar address into a verification method, currently we are returning the stellar pub key as the verification method, but this is not correct.
1. Add did document resolution metadata
1. include delegation information
1. add tests
1. This assumes you are using the default soroban url, we should allow for a custom url to be passed in.

## DID Method

To encode a DID for a Stellar account, the following format is used, since the app is currently only on the futurenet network, if the network identifier is not included it defaults to futurenet.

```bash
did:stllr:<stellar_address>
```

for example:

```bash
did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV
```

Multiple networks are also supported by adding the network identifier after the `stllr` method name:

```bash
did:stllr:03:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV
```

uses the futurenet network.

## Structure of the DID Document

Stellar currently only uses Ed25519 Keys, so the verification method is always of type `JsonWebKey2020` and the `publicKeyJwk` field is always present, with a type of `OKP` and a curve of `Ed25519`.

```javascript
    {
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
      id: did,
      verificationMethod: [
        {
          id: `${did}`,
          type: 'JsonWebKey2020',
          controller: `did:stllr:${owner.toString()}`,
          publicKeyJwk: {
            kty: 'OKP',
            crv: 'Ed25519',
            x: '9GXjPGGvmRq9F6Ng5dQQ_s31mfhxrcNZxRGONrmH30k' // example while trying to get owner's JWK
          }
        }
      ]
    }
```

## Resolving the DID Document

To use this library you can pass it to the did-resolver library:

```javascript

import { Resolver } from "did-resolver";
import { getResolver } from "stllr-did-resolver";

const config = {
  network: "standalone",
};

const stllrDidResolver = getResolver(config);

const didResolver = new Resolver(stllrDidResolver);

didResolver
  .resolve("did:stllr:GAICHJM4OUNAVKALCO2ANSXVSOD7Z2UTXE55R5RY3RX352LSJC6SYZXV")
  .then((doc) => console.log(doc));

```
