import { ethers } from "hardhat";

export async function deployInstance(artifactName: string, args: any[]) {
  const artifact = await ethers.getContractFactory(artifactName);
  const instance = await artifact.deploy(...args);
  await instance.deployed();
  return instance;
}
