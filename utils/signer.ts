import { ethers } from "hardhat";

export const getSigners = async () => {
  return await ethers.getSigners();
};
export const getFirstSigner = async () => {
  return (await getSigners())[0];
};
export const getSecondSigner = async () => {
  return (await getSigners())[1];
};
