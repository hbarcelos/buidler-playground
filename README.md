# Issue with Node.js >= 12

## Steps to reproduce

Node Version: `v12.13.0`

Using `package.json` declared dependencies works just fine.

```
yarn install
yarn buidler accounts
```

If I move `failing-package.json` to `package.json` and do the same:

```
mv failing-package.json package.json
yarn install
yarn buidler accounts
```

Then I get the following error:

```
$ <path>/node_modules/.bin/buidler accounts
An unexpected error occurred:

Error: Cannot find module 'scrypt'
Require stack:
- <path>/node_modules/ganache-core/node_modules/scrypt.js/node.js
- <path>/node_modules/ganache-core/build/ganache.core.node.js
- <path>/node_modules/ganache-core/index.js
- <path>/node_modules/ethereum-waffle/dist/waffle.js
- <path>/buidler.config.ts
- <path>/node_modules/@nomiclabs/buidler/internal/core/config/config-loading.js
- <path>/node_modules/@nomiclabs/buidler/internal/cli/cli.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:794:15)
    at Function.Module._load (internal/modules/cjs/loader.js:687:27)
    at Module.require (internal/modules/cjs/loader.js:849:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (<path>/node_modules/ganache-core/node_modules/scrypt.js/node.js:1:14)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Module.require (internal/modules/cjs/loader.js:849:19)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
