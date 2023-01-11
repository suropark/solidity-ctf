import { expect } from "chai";

import { ethers } from "hardhat";

describe("Telephone", function () {
  it("Get ownership using HackTelephone contract", async function () {
    const [owner, hacker] = await ethers.getSigners();

    const Telephone = await ethers.getContractFactory("Telephone");
    const HackTelephone = await ethers.getContractFactory("HackTelephone");
    const telephone = await Telephone.deploy();
    await telephone.deployed();

    expect(await telephone.owner(), "owner should be deployer").to.equal(owner.address);
    expect(await telephone.owner(), "owner should not be hacker").to.not.equal(hacker.address);

    const hackTelephone = await HackTelephone.connect(hacker).deploy(telephone.address);
    await hackTelephone.deployed();

    expect(await telephone.owner(), "owner should not be deployer").to.not.equal(owner.address);
    expect(await telephone.owner(), "owner should be hacker").to.equal(hacker.address);
  });
});
