import { ethers } from "@nomiclabs/buidler";
import { deployContract, getWallets, solidity } from "ethereum-waffle";
import { Wallet } from "ethers";
import BigNumber from "bignumber.js";
import chai from "chai";
import CounterArtifact from "../artifacts/Counter.json";
import { Counter } from "../typechain/Counter";

chai.use(solidity);
const { expect } = chai;

type CounterConstructorArgs = { initial: number | BigNumber };

async function createCounter(
  wallet: Wallet,
  { initial = 0 }: Partial<CounterConstructorArgs> = {}
): Promise<Counter> {
  return (await deployContract(wallet, CounterArtifact, [
    initial.toFixed()
  ])) as Counter;
}

describe("Counter", async () => {
  const provider = ethers.provider;
  const [wallet] = getWallets(provider);

  it("Should count up", async () => {
    const counter = await createCounter(wallet, { initial: 0 });
    await counter.countUp();

    const currentCount = (await counter.getCount()).toNumber();
    expect(currentCount).to.eq(1);
  });

  it("Should count down", async () => {
    const counter = await createCounter(wallet, { initial: 10 });
    const previousCount = (await counter.getCount()).toNumber();

    await counter.countDown();

    const currentCount = (await counter.getCount()).toNumber();
    expect(currentCount).to.eq(9);
  });

  it("Should revert on count down when count is 0", async () => {
    const counter = await createCounter(wallet, { initial: 0 });

    await expect(counter.countDown()).to.revertedWith("counter underflow");
  });

  it("Should revert on count up when count is the maximum unsigned 256-bit integer", async () => {
    const MAX_256_BIT_UNSIGNED_INT = new BigNumber(2).pow(256).minus(1);
    const counter = await createCounter(wallet, {
      initial: MAX_256_BIT_UNSIGNED_INT
    });

    await expect(counter.countUp()).to.revertedWith("counter overflow");
  });

  it("Should emit the CountedTo event when the count changes", async () => {
    const counter = await createCounter(wallet, { initial: 10 });

    await expect(counter.countUp())
      .to.emit(counter, "CountedTo")
      .withArgs(11);
    await expect(counter.countDown())
      .to.emit(counter, "CountedTo")
      .withArgs(10);
  });
});
