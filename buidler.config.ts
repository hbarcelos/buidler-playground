import { task, usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";
import { getWallets, defaultAccounts } from "ethereum-waffle";

usePlugin("@nomiclabs/buidler-ethers");

task("accounts", "Prints the list of accounts", async (taskArgs, env) => {
  const accounts = await getWallets(env.ethers.provider);

  for (const { address } of accounts) {
    console.log(address);
  }
});

const config: BuidlerConfig = {
  defaultNetwork: "buidlerevm",
  networks: {
    buidlerevm: {
      accounts: defaultAccounts.map(acc => ({
        balance: acc.balance,
        privateKey: acc.secretKey
      }))
    }
  }
};

export default config;
