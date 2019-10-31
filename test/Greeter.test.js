const assert = require("assert");
const { ethers } = require("@nomiclabs/buidler");
const { deployContract, getWallets } = require("ethereum-waffle");
const Greeter = require("../artifacts/Greeter.json");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Greeter contract", function() {
  let wallet;

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
