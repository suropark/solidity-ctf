import { expect } from "chai";
import { ethers } from "hardhat";
import { deployInstance } from "../utils/deployment";
import { waitForTx } from "../utils/tx";

describe("Vault", () => {
  it("Unlock password using storage slot", async () => {
    // deployment
    const vault = await deployInstance("Vault", [ethers.utils.formatBytes32String("0x1234")]);

    expect(await vault.locked(), "vault should be locked").to.be.true;
    // get password
    const password = await ethers.provider.getStorageAt(vault.address, 1);

    // unlock vault
    await waitForTx(await vault.unlock(password));

    expect(await vault.locked(), "vault should be unlocked").to.be.false;
  });
});
