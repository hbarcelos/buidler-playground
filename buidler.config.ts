import "dotenv-safe/config";
import process from "process";
import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";
import { defaultAccounts } from "ethereum-waffle";

usePlugin("@nomiclabs/buidler-etherscan");

import "./tasks/accounts";
import "./tasks/deploy";

const {
  INFURA_API_KEY = "",
  RINKEBY_PRIVATE_KEY = "",
  ETHERSCAN_API_KEY = ""
} = process.env;

const config: BuidlerConfig = {
  solc: {
    version: "0.5.12"
  },
  defaultNetwork: "buidlerevm",
  networks: {
    locahost: {
      url: "http://localhost:8545"
    },
    buidlerevm: {
      accounts: defaultAccounts.map(acc => ({
        balance: acc.balance,
        privateKey: acc.secretKey
      }))
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY]
    }
  },
  etherscan: {
    url: "https://api-rinkeby.etherscan.io/api",
    apiKey: ETHERSCAN_API_KEY
  }
};

export default config;
