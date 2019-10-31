# Development setup with Buidler

Feat.: Buidler + Waffle + Ethers.js + Typescript + Typechain

Based on [this article](https://hackernoon.com/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-706830w0) with a few improvements.

## Requirements

- Node >= `v12.13.0`
- Yarn >= `v1.19.0`


## Usage

### Install dependencies

```
yarn install
```

### Build

```
yarn build
```

### Running tests

```
yarn test [filepath-1 [filepath-2 ...]]
```

### Deploy a contract

If you contract expects arguments in its constructor, you should pass a list of them in the **end** of the command:

```
yarn deploy --contract-name CONTRACT_NAME [constructor-arg-1 [constructor-arg-2 ...]]
```

Otherwise, this is just fine:

```
yarn deploy --contract-name CONTRACT_NAME 
```
