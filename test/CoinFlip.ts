import { expect } from "chai";

import { ethers } from "hardhat";

describe("CoinFlip", function () {
  it("Should win 10 consecutive flips", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const HackCoinFlip = await ethers.getContractFactory("HackCoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();
    const hackCoinFlip = await HackCoinFlip.deploy(coinFlip.address);
    await hackCoinFlip.deployed();

    let consecutiveWinCount;
    do {
      consecutiveWinCount = await coinFlip.consecutiveWins();
      await hackCoinFlip.tryFlip();
    } while (consecutiveWinCount.toNumber() !== 10);

    expect(consecutiveWinCount.toNumber()).to.equal(10);
  });
});
