const { defaultAccounts } = require("ethereum-waffle");

require("./tasks/accounts");
require("./tasks/deploy");

module.exports = {
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
    }
  }
};
