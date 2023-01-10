import { ethers } from "hardhat";
import { getSecondSigner } from "../../../utils/signer";
async function main() {
  const coinFlip = await ethers.getContractFactory("CoinFlip");
  const hackCoinFlip = await ethers.getContractFactory("HackCoinFlip");

  const dep1 = await coinFlip.deploy();
  await dep1.deployed();
  const dep2 = await hackCoinFlip.deploy(dep1.address);
  await dep2.deployed();

  let consecutiveWinCount;
  do {
    consecutiveWinCount = await dep1.consecutiveWins();
    await dep2.tryFlip();
  } while (consecutiveWinCount.toNumber() < 10);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
