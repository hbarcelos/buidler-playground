import { ethers } from "@nomiclabs/buidler";
import { Wallet } from "ethers";
import { deployContract, getWallets, solidity } from "ethereum-waffle";
import chai from "chai";
import GreeterArtifact from "../artifacts/Greeter.json";

chai.use(solidity);
const { expect } = chai;

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Greeter contract", function() {
  let wallet: Wallet;

  before(async function() {
    [wallet] = await getWallets(ethers.provider);
  });

  describe("Deployment", function() {
    it("Should deploy with the right greeting", async function() {
      const greeter = await deployContract(wallet, GreeterArtifact, [
        "Hello, world!"
      ]);

      const result = await greeter.greet();

      expect(result).to.eq("Hello, world!");
    });
  });
});
