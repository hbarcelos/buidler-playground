const path = require("path");
const { task, usePlugin, types } = require("@nomiclabs/buidler/config");
const { deployContract, getWallets } = require("ethereum-waffle");

task(
  "deploy",
  "Deploy a contract",
  async (taskArgs, { run, provider, config }) => {
    const { contract, force, constructorArgs, showAddress } = taskArgs;
    const { artifacts } = config.paths;

    const artifactsDirectory = path.resolve(path.dirname(__dirname), artifacts);

    const [account] = await run("accounts");

    await run("compile", { force });

    const contractDefinition = require(path.join(artifactsDirectory, contract));

    const contractInstance = await deployContract(
      account,
      contractDefinition,
      constructorArgs
    );

    if (showAddress) {
      console.log(`\nContract ${contract} address:\n`);
      console.log(contractInstance.address);
      console.log("\n-------------------------------\n");
    }

    return contractInstance;
  }
)
  .addFlag("force", "Forces re-deploying the contract")
  .addFlag("showAddress", "Show deployed contract address")
  .addParam("contract", "Contract name to be deployed")
  .addOptionalVariadicPositionalParam(
    "constructorArgs",
    "Contract constructor arguments",
    []
  );
