import { expect } from "chai";
import { constants, utils } from "ethers";
import { ethers } from "hardhat";
import { deployInstance } from "../utils/deployment";
import { waitForTx } from "../utils/tx";

describe("GatekeeperV1", () => {
  it("Fuzz to enter", async function () {
    const [deployer, hacker] = await ethers.getSigners();
    const keeper = await deployInstance("Gatekeeper");
    const hackKeeper = await deployInstance("HackGatekeeper", [keeper.address]);

    expect(await keeper.entrant(), "entrant zero ").to.equal(constants.AddressZero);
    await waitForTx(await hackKeeper.hack());
    console.log(await hackKeeper._gateKey());

    expect(await keeper.entrant(), "entrant hacker ").to.equal(deployer.address);
  });
});
