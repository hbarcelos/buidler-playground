import * as path from "path";
import { task, usePlugin, types } from "@nomiclabs/buidler/config";
import { deployContract, getWallets } from "ethereum-waffle";

usePlugin("@nomiclabs/buidler-ethers");

task(
  "deploy",
  "Deploy a contract",
  async (
    { contractName, force, constructorArgs, silent },
    { run, config, ethers }
  ) => {
    // const { artifacts } = config.paths;

    // const artifactsDirectory = path.resolve(path.dirname(__dirname), artifacts);
    const factory = await ethers.getContract(contractName);

    const [account] = await run("accounts");

    await run("compile", { force });

    if (!silent) {
      console.log(`\nDeploying contract ${contractName}... Please wait.`);
    }

    const contractInstance = await factory.deploy(...constructorArgs);

    if (!silent) {
      console.log(`\nContract ${contractName} address:\n`);
      console.log(contractInstance.address);
      console.log("\n-------------------------------\n");

      console.log(`\nTransaction hash:\n`);
      console.log(contractInstance.deployTransaction.hash);
      console.log("\n-------------------------------\n");
    }

    return contractInstance.deployed();
  }
)
  .addFlag("force", "Forces re-deploying the contract")
  .addFlag("silent", "Do not display deployed contract info")
  .addParam("contractName", "Name of the contract to be deployed")
  .addOptionalVariadicPositionalParam(
    "constructorArgs",
    "Contract constructor arguments",
    []
  );
