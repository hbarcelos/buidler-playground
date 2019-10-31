import { task, usePlugin } from "@nomiclabs/buidler/config";
import { getWallets } from "ethereum-waffle";
import { Wallet } from "ethers";

usePlugin("@nomiclabs/buidler-ethers");

function showInformation(
  label: String,
  format: (wallet: Wallet) => string,
  accounts: Wallet[]
) {
  const formattedAccounts = accounts.map(format);

  console.log(`${label}:\n`);
  for (const item of formattedAccounts) {
    console.log(item);
  }
  console.log("\n--------------------------------\n");
}

task(
  "accounts",
  "Prints the list of accounts",
  async ({ showAddressesOnly, showPrivateKeysOnly, show }, { ethers }) => {
    const accounts = await getWallets(ethers.provider);

    if (show || showAddressesOnly) {
      showInformation("Addresses", ({ address }) => address, accounts);
    }

    if (show || showPrivateKeysOnly) {
      showInformation("Private Keys", ({ privateKey }) => privateKey, accounts);
    }

    return accounts;
  }
)
  .addFlag("show", "Show accounts information")
  .addFlag("showAddressesOnly", "Show only accounts addresses")
  .addFlag("showPrivateKeysOnly", "Show only accounts private keys");
