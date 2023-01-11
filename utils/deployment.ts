import { ethers } from "hardhat";

export async function deployInstance(artifactName: string, args?: any[]) {
  const artifact = await ethers.getContractFactory(artifactName);

  const instance = args ? await artifact.deploy(...args) : await artifact.deploy();
  
  await instance.deployed();
  return instance;
}
