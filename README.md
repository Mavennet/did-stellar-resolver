# DID Stellar resolver

This library is intended to be used in conjunction with the [did-stellar-registry](https://github.com/Mavennet/did-stellar-registry) smart contract, to resolve stllr DIDs into a DID Document.

It supports the [Decentralized Identifiers Specification](https://w3c.github.io/did-core/).

The full did method specification is outlined in [docs/did-method-spec.md](docs/did-method-spec.md)

## Status of the library

This library is currently in development and is not yet ready for production use.

The library relies on the [did-resolver](https://github.com/decentralized-identity/did-resolver) library.

## DID Method

To encode a DID for a Stellar account, the following format is used:

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

Stellar currently only supports Ed25519 keypairs, so the DID Document will use JsonWebKey2020 that will always be an Ed25519 keypair.

## Resolving the DID Document

Section TBD
