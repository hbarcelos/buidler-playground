import assert from "assert";
import { ethers } from "@nomiclabs/buidler";
import { Wallet } from "ethers";
import { deployContract, getWallets } from "ethereum-waffle";
import Greeter from "../artifacts/Greeter.json";

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Greeter contract", function() {
  let wallet: Wallet;

  before(async function() {
    [wallet] = await getWallets(ethers.provider);
  });

  describe("Deployment", function() {
    it("Should deploy with the right greeting", async function() {
      const greeter = await deployContract(wallet, Greeter, ["Hello, world!"]);
      assert.equal(await greeter.greet(), "Hello, world!");
    });
  });
});
